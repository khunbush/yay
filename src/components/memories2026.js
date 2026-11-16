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
  0: [ // January
    {
      text: `yayyyyyy rerm new year u gor mar pty loeyyyy. this time mar laew dai pai doo ur favourite thing at the moment which is chang noiy 555555 laew pai job t ronin muen koeyy yark hai u mar pty boiy2 jung 🥹`,
      photos: ["/photos2026/jan1.jpg", "/photos2026/jan2.jpg", "/photos2026/jan3.jpg", "/photos2026/jan4.jpg"]
    },
    {
      text: `ur new house is almost doneeeee suay makk tae gor aeb sao pror ja mai dai yuu in that legendary living room laew 555555 hopefully u ja dai move in next time we are back naaa`,
      photos: ["/photos2026/jan5.jpg", "/photos2026/jan6.jpg"]
    },
    {
      text: `glub eek laewwwww and this time aow kanom pai yur MAKKKK but you mai dai yark glub this time loeyy but i yark mak2 pror ja dai yuu gub u talord vela even tho tong pai tum ngarn yur makkk :(`,
      photos: ["/photos2026/jan7.jpg"]
    },
    {
      text: `our annual trip to a Liverpool stadium and this time mang kode hiaaaa. tung train delay and rao tong lor narn and change stop yur makk222. i am very grateful t u pai pen puen i talord loey naa even if mun ja nhuey mak2 gor tarm`,
      photos: ["/photos2026/jan8.jpg", "/photos2026/jan9.jpg"]
    },
    {
      text: `OMG suay makkkk. thank you for using ur Picasso ability to help me 5555555`,
      photos: ["/photos2026/jan10.jpg"]
    },
    {
      text: `nee rao mar nee dai ngai niaa 555555. so random but another trip with you is always very nice :)`,
      photos: ["/photos2026/jan11.jpg", "/photos2026/jan12.jpg"]
    }
  ],
  1: [ // February
    {
      text: `Happy valentines na kubb babeeeee. Our 3rd one and to so many moreeeeee! i ruk you t sood nai loke loeyyy i love you very much and thank you for always being by my sideeeeee hopefully u enjoyed this meal ahhahahha chaiy dai loey naaaa`,
      photos: ["/photos2026/feb1.jpg", "/photos2026/feb2.jpg", "/photos2026/feb3.jpg", "/photos2026/feb4.jpg"]
    },
    {
      text: `month nee mai koi dai tum arai loeyy tae rao gor dai pai concert nai rorb narn yuuuu and also pai tum this acrylic thing t i tum mai work loeyy :((((`,
      photos: ["/photos2026/feb5.jpg", "/photos2026/feb6.jpg", "/photos2026/feb7.jpg"]
    }
  ],
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
