import { toast } from 'sonner';
import { MONTH_NAMES, isMonthLocked } from '@/components/memoryYears';

import {
  PAPERS, FLAPS, SEALS,
} from '@/components/paperTheme';

export {
  PAPER_BG, INK, MUTED, MUTED_2, MUTED_3, EYEBROW, LETTER, EASE, SERIF, SANS, MONO,
} from '@/components/paperTheme';

export const LOCKED_PAPER = '#efe9e0';
export const LOCKED_FLAP = '#e8e1d6';
export const LOCKED_BORDER = '#d3cabd';
export const TOAST_BG = '#2c2638';

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
