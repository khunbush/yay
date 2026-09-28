import { memories2025 } from './memories';
import { memories2026 } from './memories2026';

export const MONTH_NAMES = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December"
];

const toMonths = (byMonth) =>
  MONTH_NAMES.map((monthName, monthIndex) => ({
    monthIndex,
    monthName,
    memories: byMonth[monthIndex] ?? [],
  }));

// 2025 keeps its original behaviour: every month is open and opening all 12
// unlocks meme's faq. 2026 has no secret — a month opens once it has memories.
export const memoryYears = {
  2025: { months: memories2025, lockEmptyMonths: false, secret: true },
  2026: { months: toMonths(memories2026), lockEmptyMonths: true, secret: false },
};

export const DEFAULT_YEAR = 2025;

export const getMemoryYear = (year) => {
  const key = memoryYears[year] ? Number(year) : DEFAULT_YEAR;
  return { year: key, ...memoryYears[key] };
};

export const isMonthLocked = (yearData, monthIndex) =>
  yearData.lockEmptyMonths && !(yearData.months[monthIndex]?.memories.length > 0);

// Overview/Month URLs; 2025 keeps its original links without ?year=
export const yearQuery = (year) => (Number(year) === DEFAULT_YEAR ? '' : `year=${year}`);
