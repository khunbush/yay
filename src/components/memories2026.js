// 2026 memories — one entry per month (0 = January ... 11 = December).
//
// To add a memory, put a { text, photos } block inside that month's array.
// Photos live in /public/photos2026 and are referenced as "/photos2026/<file>".
// A month with an empty array shows as locked ("coming soon") until it has
// at least one memory.
//
// Same locked-content rule as memories.jsx: once a memory is added it must
// never be modified, reordered, or removed — adding is append-only.
//
// Example:
//   0: [
//     {
//       text: `new year memory here...`,
//       photos: ["/photos2026/jan1.jpg", "/photos2026/jan2.jpg"]
//     }
//   ],

export const memories2026 = {
  0: [], // January
  1: [], // February
  2: [], // March
  3: [], // April
  4: [], // May
  5: [], // June
  6: [], // July
  7: [], // August
  8: [], // September
  9: [], // October
  10: [], // November
  11: [], // December
};
