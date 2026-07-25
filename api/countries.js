// Shared storage for the map page's visited-country list, so both of us see
// the same list instead of a private copy per browser.
//
// Backed by a Redis-compatible REST store (Upstash, or Vercel's KV
// integration — both expose the same REST shape). Configure in Vercel:
//
//   KV_REST_API_URL      or  UPSTASH_REDIS_REST_URL
//   KV_REST_API_TOKEN    or  UPSTASH_REDIS_REST_TOKEN
//   OURS_SYNC_TOKEN      (optional, see below)
//
// Without those the endpoint answers 503 and the page quietly stays on
// per-device localStorage, exactly as it behaved before.

const KEY = 'ours:countries:v1';
const MAX_COUNTRIES = 400;
const MAX_NAME_LEN = 80;

const restUrl = () => process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '';
const restToken = () => process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '';

const authHeaders = () => ({ Authorization: `Bearer ${restToken()}` });

async function redisGet() {
  const res = await fetch(`${restUrl()}/get/${encodeURIComponent(KEY)}`, { headers: authHeaders() });
  if (!res.ok) throw new Error(`store read failed (${res.status})`);
  const body = await res.json();
  if (body.result == null) return null;
  try {
    return JSON.parse(body.result);
  } catch {
    return null;
  }
}

async function redisSet(value) {
  const res = await fetch(`${restUrl()}/set/${encodeURIComponent(KEY)}`, {
    method: 'POST',
    headers: { ...authHeaders(), 'Content-Type': 'text/plain' },
    body: JSON.stringify(value),
  });
  if (!res.ok) throw new Error(`store write failed (${res.status})`);
}

async function readBody(req) {
  if (req.body !== undefined && req.body !== null && req.body !== '') {
    return typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  }
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  if (!chunks.length) return {};
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

// Anything that reaches the store has to look like a country list — this is
// what stops a stray request from parking megabytes in the key.
function clean(input) {
  if (!Array.isArray(input)) return null;
  const names = input
    .filter((n) => typeof n === 'string')
    .map((n) => n.trim())
    .filter((n) => n.length > 0 && n.length <= MAX_NAME_LEN);
  if (names.length !== input.length) return null;
  return [...new Set(names)].slice(0, MAX_COUNTRIES);
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'GET, PUT, OPTIONS');
    return res.status(204).end();
  }

  if (req.method !== 'GET' && req.method !== 'PUT') {
    res.setHeader('Allow', 'GET, PUT, OPTIONS');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  // Keeps drive-by traffic out. The page is a public URL and this token ships
  // in the client bundle, so it is a lock on the door, not a vault.
  const expected = process.env.OURS_SYNC_TOKEN;
  if (expected && req.headers['x-ours-key'] !== expected) {
    return res.status(401).json({ error: 'unauthorized' });
  }

  if (!restUrl() || !restToken()) {
    return res.status(503).json({ error: 'not_configured' });
  }

  try {
    if (req.method === 'GET') {
      const stored = await redisGet();
      return res.status(200).json({
        countries: stored?.countries ?? null,
        updatedAt: stored?.updatedAt ?? null,
      });
    }

    const body = await readBody(req);
    const countries = clean(body?.countries);
    if (!countries) return res.status(400).json({ error: 'invalid_payload' });

    const record = { countries, updatedAt: Date.now() };
    await redisSet(record);
    return res.status(200).json(record);
  } catch (err) {
    console.error('countries sync failed', err);
    return res.status(502).json({ error: 'store_unavailable' });
  }
}
