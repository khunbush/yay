import { useCallback, useEffect, useMemo, useState } from 'react';
import { CONTINENTS, CONTINENT_TOTALS, COUNTRIES, countryFor } from '@/components/countries';

const STORAGE_KEY = 'bushy_meme_passport';

// Every country carries one status. "wishlist" is the only one that doesn't
// count as visited — the other three all mean somebody's feet touched the ground.
export const STATUSES = [
  {
    id: 'together',
    label: 'Together',
    short: 'us',
    emoji: '💙',
    visited: true,
    card: 'bg-gradient-to-br from-rose-100/80 to-pink-100/70 border-rose-200/50',
    chip: 'bg-rose-100 text-rose-500 border-rose-200/70',
    dot: 'bg-rose-300',
  },
  {
    id: 'bushy',
    label: 'Bushy solo',
    short: 'bushy',
    emoji: '🧭',
    visited: true,
    card: 'bg-gradient-to-br from-sky-100/80 to-blue-100/70 border-sky-200/50',
    chip: 'bg-sky-100 text-sky-500 border-sky-200/70',
    dot: 'bg-sky-300',
  },
  {
    id: 'meme',
    label: 'Meme solo',
    short: 'meme',
    emoji: '🎒',
    visited: true,
    card: 'bg-gradient-to-br from-purple-100/80 to-violet-100/70 border-purple-200/50',
    chip: 'bg-purple-100 text-purple-500 border-purple-200/70',
    dot: 'bg-purple-300',
  },
  {
    id: 'wishlist',
    label: 'Someday',
    short: 'someday',
    emoji: '✨',
    visited: false,
    card: 'bg-gradient-to-br from-amber-50/90 to-orange-50/70 border-amber-200/50',
    chip: 'bg-amber-100 text-amber-600 border-amber-200/70',
    dot: 'bg-amber-300',
  },
];

const STATUS_INDEX = Object.fromEntries(STATUSES.map((s) => [s.id, s]));

export const statusFor = (id) => STATUS_INDEX[id] ?? STATUSES[0];

const isValidEntry = (entry) =>
  entry && typeof entry.code === 'string' && countryFor(entry.code) && STATUS_INDEX[entry.status];

const read = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    const entries = parsed?.entries ?? {};
    // Drop anything a schema change (or a hand-edited localStorage) left behind.
    return Object.fromEntries(
      Object.entries(entries).filter(([code, entry]) => code === entry?.code && isValidEntry(entry))
    );
  } catch (e) {
    console.error('Failed to read passport', e);
    return {};
  }
};

const write = (entries) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, entries }));
  } catch (e) {
    console.error('Failed to save passport', e);
  }
};

export function usePassport() {
  const [entries, setEntries] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setEntries(read());
    setIsLoaded(true);
  }, []);

  const save = useCallback((entry) => {
    setEntries((prev) => {
      const next = {
        ...prev,
        [entry.code]: { ...prev[entry.code], ...entry, addedAt: prev[entry.code]?.addedAt ?? Date.now() },
      };
      write(next);
      return next;
    });
  }, []);

  const remove = useCallback((code) => {
    setEntries((prev) => {
      const next = { ...prev };
      delete next[code];
      write(next);
      return next;
    });
  }, []);

  const stats = useMemo(() => {
    const list = Object.values(entries);
    const visited = list.filter((entry) => statusFor(entry.status).visited);
    const byStatus = Object.fromEntries(
      STATUSES.map((s) => [s.id, list.filter((entry) => entry.status === s.id).length])
    );

    const continents = CONTINENTS.map((continent) => {
      const count = visited.filter((entry) => countryFor(entry.code).continent === continent).length;
      return { continent, count, total: CONTINENT_TOTALS[continent] };
    });

    return {
      visited: visited.length,
      world: COUNTRIES.length,
      percent: (visited.length / COUNTRIES.length) * 100,
      byStatus,
      continents,
      continentsTouched: continents.filter((c) => c.count > 0).length,
    };
  }, [entries]);

  return { entries, isLoaded, save, remove, stats };
}
