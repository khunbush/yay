// Single source of truth for the app's "game" state: the passphrase unlock
// and the 12-month viewing progress that gates meme's FAQ.
// Storage access is wrapped so private-mode browsers can't crash the app.

export const UNLOCK_KEY = 'bushy_meme_unlocked';
export const VIEWED_KEY = 'bushy_meme_viewed_months';
export const TOTAL_MONTHS = 12;

export const isUnlocked = () => {
  try {
    return sessionStorage.getItem(UNLOCK_KEY) === 'true';
  } catch {
    return false;
  }
};

export const setUnlocked = () => {
  try {
    sessionStorage.setItem(UNLOCK_KEY, 'true');
  } catch {
    // storage unavailable — the in-page unlock flow still navigates forward
  }
};

export const getViewedMonths = () => {
  try {
    const raw = JSON.parse(localStorage.getItem(VIEWED_KEY) || '[]');
    if (!Array.isArray(raw)) return [];
    return [...new Set(raw.filter(i => Number.isInteger(i) && i >= 0 && i < TOTAL_MONTHS))];
  } catch {
    return [];
  }
};

export const getViewedCount = () => getViewedMonths().length;

export const isFaqUnlocked = () => getViewedCount() >= TOTAL_MONTHS;

// Records a month as viewed. Returns { added, count } so callers can react
// only to genuinely new progress (toasts, confetti at 12/12).
export const markMonthViewed = (monthIndex) => {
  if (!Number.isInteger(monthIndex) || monthIndex < 0 || monthIndex >= TOTAL_MONTHS) {
    return { added: false, count: getViewedCount() };
  }
  const viewed = getViewedMonths();
  if (viewed.includes(monthIndex)) {
    return { added: false, count: viewed.length };
  }
  const next = [...viewed, monthIndex];
  try {
    localStorage.setItem(VIEWED_KEY, JSON.stringify(next));
  } catch {
    // storage unavailable — progress just won't persist
  }
  return { added: true, count: next.length };
};
