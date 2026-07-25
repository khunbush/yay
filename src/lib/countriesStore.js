// Sync layer for the map page's visited-country list.
//
// localStorage is the offline cache and always answers first, so the page
// paints instantly and still works with no network. /api/countries is the
// shared copy — when it is configured, it wins and both of us see one list.

import { SEED, STORE } from '@/components/worldData';

const API = '/api/countries';
const META = `${STORE}.meta`;
const SYNC_TOKEN = import.meta.env.VITE_OURS_SYNC_TOKEN || '';

const headers = () => (SYNC_TOKEN ? { 'x-ours-key': SYNC_TOKEN } : {});

export function readCache() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORE));
    // An empty array is a real answer — it means we cleared the list on purpose.
    if (Array.isArray(stored)) return stored;
  } catch (e) {
    console.error('Failed to read cached countries', e);
  }
  return SEED;
}

export function readMeta() {
  try {
    const meta = JSON.parse(localStorage.getItem(META));
    if (meta && typeof meta === 'object') return { updatedAt: 0, dirty: false, ...meta };
  } catch (e) {
    console.error('Failed to read sync metadata', e);
  }
  return { updatedAt: 0, dirty: false };
}

export function writeCache(countries, meta) {
  try {
    localStorage.setItem(STORE, JSON.stringify(countries));
    localStorage.setItem(META, JSON.stringify({ updatedAt: 0, dirty: false, ...meta }));
  } catch (e) {
    console.error('Failed to cache countries', e);
  }
}

/**
 * @returns {Promise<{status:'ok',countries:string[]|null,updatedAt:number|null}
 *                 | {status:'unconfigured'|'error'}>}
 */
export async function fetchShared() {
  try {
    const res = await fetch(API, { headers: headers(), cache: 'no-store' });
    if (res.status === 503) return { status: 'unconfigured' };
    if (!res.ok) return { status: 'error' };
    const body = await res.json();
    return { status: 'ok', countries: body.countries, updatedAt: body.updatedAt };
  } catch {
    return { status: 'error' };
  }
}

/**
 * @returns {Promise<{status:'ok',updatedAt:number}|{status:'unconfigured'|'error'}>}
 */
export async function pushShared(countries) {
  try {
    const res = await fetch(API, {
      method: 'PUT',
      headers: { ...headers(), 'Content-Type': 'application/json' },
      body: JSON.stringify({ countries }),
    });
    if (res.status === 503) return { status: 'unconfigured' };
    if (!res.ok) return { status: 'error' };
    const body = await res.json();
    return { status: 'ok', updatedAt: body.updatedAt };
  } catch {
    return { status: 'error' };
  }
}
