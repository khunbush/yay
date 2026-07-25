// Lookup tables from the Claude Design "Ours — countries we've been" project,
// transcribed as-is. The world-atlas 110m topology ships Natural Earth's
// abbreviated names, so ALIAS maps those onto the names we actually display.

export const TOTAL_WORLD = 195;
export const STORE = 'ours.visited.v1';

// Served from our own origin instead of a CDN so the map still works offline.
export const ATLAS_URL = '/world/countries-110m.json';

export const SEED = [
  'Thailand', 'United Kingdom', 'France', 'Spain', 'Italy',
  'Turkey', 'Denmark', 'Macau', 'Singapore', 'Japan',
];

// atlas name -> display name we use
export const ALIAS = {
  'Türkiye': 'Turkey',
  'Republic of Korea': 'South Korea',
  'Czechia': 'Czech Republic',
  'United States of America': 'United States',
  'Macao': 'Macau',
  'Bosnia and Herz.': 'Bosnia and Herzegovina',
  'Central African Rep.': 'Central African Republic',
  'Dem. Rep. Congo': 'DR Congo',
  'Dominican Rep.': 'Dominican Republic',
  'Eq. Guinea': 'Equatorial Guinea',
  'S. Sudan': 'South Sudan',
  'W. Sahara': 'Western Sahara',
  'N. Cyprus': 'Northern Cyprus',
  'eSwatini': 'Eswatini',
  'Solomon Is.': 'Solomon Islands',
  'Falkland Is.': 'Falkland Islands',
  'Fr. S. Antarctic Lands': 'French Southern Territories',
  'Br. Indian Ocean Ter.': 'British Indian Ocean Territory',
  'Cayman Is.': 'Cayman Islands',
  'Faeroe Is.': 'Faroe Islands',
  'Marshall Is.': 'Marshall Islands',
  'Turks and Caicos Is.': 'Turks and Caicos Islands',
  'U.S. Virgin Is.': 'U.S. Virgin Islands',
  'British Virgin Is.': 'British Virgin Islands',
  'Cook Is.': 'Cook Islands',
  'Åland': 'Åland Islands',
  "Côte d'Ivoire": 'Ivory Coast',
  'Antigua and Barb.': 'Antigua and Barbuda',
  'St. Vin. and Gren.': 'Saint Vincent and the Grenadines',
  'Saint Helena': 'St Helena',
  'São Tomé and Principe': 'São Tomé and Príncipe',
  'St-Martin': 'Saint Martin',
  'Sint Maarten': 'Sint Maarten',
  'Wallis and Futuna Is.': 'Wallis and Futuna',
  'Heard I. and McDonald Is.': 'Heard and McDonald Islands',
  'S. Geo. and the Is.': 'South Georgia',
  'Pitcairn Is.': 'Pitcairn Islands',
  'N. Mariana Is.': 'Northern Mariana Islands',
  'Fr. Polynesia': 'French Polynesia',
  'Norfolk Island': 'Norfolk Island',
};

// places too small to exist in the 110m atlas — pinned by coordinate
export const MICRO = {
  'Singapore': [103.82, 1.35],
  'Macau': [113.55, 22.16],
  'Hong Kong': [114.17, 22.32],
  'Malta': [14.40, 35.90],
  'Bahrain': [50.55, 26.07],
  'Maldives': [73.50, 3.20],
  'Monaco': [7.42, 43.74],
  'Andorra': [1.52, 42.51],
  'Liechtenstein': [9.55, 47.16],
  'San Marino': [12.46, 43.94],
  'Vatican City': [12.45, 41.90],
  'Mauritius': [57.55, -20.28],
  'Seychelles': [55.49, -4.68],
  'Barbados': [-59.54, 13.19],
  'Saint Lucia': [-60.98, 13.91],
  'Grenada': [-61.68, 12.11],
  'Antigua and Barbuda': [-61.80, 17.06],
  'Bermuda': [-64.75, 32.31],
  'Cape Verde': [-23.60, 15.12],
  'Comoros': [43.32, -11.65],
  'Tonga': [-175.20, -21.14],
  'Samoa': [-172.10, -13.76],
  'Bahamas': [-77.40, 25.03],
  'Brunei': [114.72, 4.54],
};

// The rectangle the Mercator projection is fitted to — clips the poles so the
// map fills the card without Antarctica or a stretched Arctic.
export const MAP_FRAME = {
  type: 'Polygon',
  coordinates: [[
    [-180, -56], [-90, -56], [0, -56], [90, -56], [180, -56],
    [180, 79], [90, 79], [0, 79], [-90, 79], [-180, 79], [-180, -56],
  ]],
};
