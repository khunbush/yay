import { toast } from 'sonner';
import { MONTH_NAMES, isMonthLocked } from '@/components/memoryYears';

// 2026 "Envelopes" palette
export const PAPER_BG = '#f6f0e7';
export const INK = '#3b3450';
export const MUTED = '#8a7f96';
export const MUTED_2 = '#9b91a6';
export const MUTED_3 = '#6b6178';
export const EYEBROW = '#8a8299';
export const LETTER = '#fffdf8';
export const LOCKED_PAPER = '#efe9e0';
export const LOCKED_FLAP = '#e8e1d6';
export const LOCKED_BORDER = '#d3cabd';
export const TOAST_BG = '#2c2638';

export const EASE = 'cubic-bezier(.2,.8,.2,1)';

export const SERIF = "'Instrument Serif', Georgia, serif";
export const SANS = "'DM Sans', system-ui, sans-serif";
export const MONO = "'DM Mono', ui-monospace, monospace";

const PAPERS = ['#fcf3ea', '#f7f1fc', '#eff4fb', '#f0f6f0'];
const FLAPS = ['#f4e2d4', '#ebdff6', '#dee8f5', '#e0eee2'];
const SEALS = ['oklch(0.7 0.13 10)', 'oklch(0.7 0.13 300)', 'oklch(0.7 0.13 235)', 'oklch(0.7 0.13 150)'];

// Envelope colours cycle by month
export const envelopeColors = (monthIndex) => ({
  paper: PAPERS[monthIndex % 4],
  flap: FLAPS[monthIndex % 4],
  seal: SEALS[monthIndex % 4],
});

export const SEAL_SHADOW = 'inset 0 0 0 3px rgba(255,255,255,.22), 0 3px 6px rgba(80,40,60,.3)';

export const pad2 = (n) => String(n).padStart(2, '0');

export const memoryCountLabel = (n) => `${n} memor${n === 1 ? 'y' : 'ies'}`;

// Nearest open month in a direction (only the adjacent month counts)
export const openNeighbor = (yearData, monthIndex, dir) => {
  const j = monthIndex + dir;
  return j >= 0 && j < 12 && !isMonthLocked(yearData, j) ? j : null;
};

export const monthName = (i) => MONTH_NAMES[i];

export const pillToast2026 = (message) => toast(message, {
  position: 'bottom-center',
  style: {
    background: TOAST_BG,
    color: '#fff',
    borderRadius: '99px',
    textAlign: 'center',
    fontFamily: SANS,
    fontWeight: 500,
  },
});
