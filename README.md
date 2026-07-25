# Bushy & Meme 2025 💙

A standalone clone of the Base44 app **"Bushy & Meme 2025"** — a password-protected
memory book of monthly moments through 2025, cloned from
[Base44](https://base44.com) into a fully self-contained React app.

## What's inside

- **React 18 + Vite + Tailwind CSS + shadcn/ui** (the same stack Base44 generates)
- **Pages**: lock screen (`Index`), year overview (`Overview`), per-month memories (`Month`), and a secret FAQ (`SecretFAQ`)
- **All memory text** lives in `src/components/memories.jsx`
- **All 77 photos** are stored locally in `public/photos/` — no dependency on Base44's storage

## Run it

```bash
npm install
npm run dev      # local dev server
npm run build    # production build to ./dist
```

## The map page (`/Countries`)

A world map of the countries we've been to, from the "Ours" Claude Design
project. Tap a country or search for it to toggle it on.

### Making the list shared

Out of the box the list lives in `localStorage`, which means **one list per
browser** — a second device starts from the seed list in
`src/components/worldData.js`. To make both of us edit one shared list, give
`api/countries.js` a Redis-compatible REST store and redeploy:

1. In the Vercel dashboard, add an **Upstash Redis** store to the project
   (Storage → Create → Upstash Redis, free tier is plenty — the whole list is
   a few hundred bytes).
2. Vercel injects `KV_REST_API_URL` and `KV_REST_API_TOKEN` automatically.
   `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` work too.
3. Redeploy.

The header tells you which mode you're in: **shared list** (teal dot) means
both devices are reading the same copy, **this device only** means the store
isn't configured, **offline · saved here** means it's configured but
unreachable right now and edits are cached until it comes back.

Optionally set `OURS_SYNC_TOKEN` (server) and `VITE_OURS_SYNC_TOKEN` (build) to
the same value to keep casual traffic off the endpoint. Note the client copy
ships in the JS bundle, so it deters crawlers — it is not real authentication.

Concurrency is last-write-wins on the whole list. With two people that only
matters if you both edit within the same few seconds; the page re-reads the
shared copy whenever you return to the tab.

## Notes

- The Base44 platform SDK has been removed; auth scaffolding was replaced with
  no-op equivalents (the app never used platform login — the lock screen has its
  own passphrase).
- Deploy the `dist/` output to any static host (Vercel, Netlify, GitHub Pages…).
  The map page's shared list additionally needs a host that runs `api/` as
  serverless functions (Vercel does); anywhere else it degrades to per-device
  storage.
