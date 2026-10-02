// Shared "paper & wax" look used by the entry pages (lock, soundtrack, years)
// and the 2026 envelopes.
export const PAPER_BG = '#f6f0e7';
export const LETTER = '#fffdf8';
export const INK = '#3b3450';
export const MUTED = '#8a7f96';
export const MUTED_2 = '#9b91a6';
export const MUTED_3 = '#6b6178';
export const EYEBROW = '#8a8299';
export const MICRO = '#a397b0';
export const DASHED = '#b2a6c2';
export const WAX_ROSE = 'oklch(0.64 0.15 15)';
export const DAYS_ROSE = 'oklch(0.6 0.15 15)';
export const HINT_BLUE = 'oklch(0.55 0.12 250)';

export const PAPERS = ['#fcf3ea', '#f7f1fc', '#eff4fb', '#f0f6f0'];
export const FLAPS = ['#f4e2d4', '#ebdff6', '#dee8f5', '#e0eee2'];
export const SEALS = ['oklch(0.7 0.13 10)', 'oklch(0.7 0.13 300)', 'oklch(0.7 0.13 235)', 'oklch(0.7 0.13 150)'];

export const CARD_SHADOW = '0 22px 40px -26px rgba(70,50,90,.55), 0 0 0 1px rgba(80,60,100,.05)';
export const EASE = 'cubic-bezier(.2,.8,.2,1)';
export const EASE_ARRAY = [0.2, 0.8, 0.2, 1];

export const SERIF = "'Instrument Serif', Georgia, serif";
export const SANS = "'DM Sans', system-ui, sans-serif";
export const MONO = "'DM Mono', ui-monospace, monospace";

// Fade + rise + slight scale, used for staggered entrances
export const enter = (delay = 0, duration = 0.5) => ({
  initial: { opacity: 0, y: 14, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration, delay, ease: EASE_ARRAY },
});

// Vinyl grooves
export const RECORD_BG = 'repeating-radial-gradient(circle,#2a2530 0 1px,#36303d 1px 3px)';

// Perforated stamp edge: holes of radius `hole` every `tooth` px
export const perforated = (tooth, hole) => ({
  padding: tooth / 2,
  background: `radial-gradient(circle at ${tooth / 2}px ${tooth / 2}px,transparent ${hole}px,#fff ${hole + 0.5}px) -${tooth / 2}px -${tooth / 2}px/${tooth}px ${tooth}px`,
});
