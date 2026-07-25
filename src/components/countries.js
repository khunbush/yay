// Country reference data for the Passport page.
// Only the ISO 3166-1 alpha-2 code and name are stored — flags are derived
// from the code so there are no image assets to load.

export const flagFor = (code) =>
  code
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));

export const CONTINENTS = [
  "Europe",
  "Asia",
  "Africa",
  "North America",
  "South America",
  "Oceania",
];

const BY_CONTINENT = {
  Europe: [
    ["AL", "Albania"], ["AD", "Andorra"], ["AT", "Austria"], ["BY", "Belarus"],
    ["BE", "Belgium"], ["BA", "Bosnia & Herzegovina"], ["BG", "Bulgaria"],
    ["HR", "Croatia"], ["CZ", "Czechia"], ["DK", "Denmark"], ["EE", "Estonia"],
    ["FO", "Faroe Islands"], ["FI", "Finland"], ["FR", "France"], ["DE", "Germany"],
    ["GI", "Gibraltar"], ["GR", "Greece"], ["GG", "Guernsey"], ["HU", "Hungary"],
    ["IS", "Iceland"], ["IE", "Ireland"], ["IM", "Isle of Man"], ["IT", "Italy"],
    ["JE", "Jersey"], ["XK", "Kosovo"], ["LV", "Latvia"], ["LI", "Liechtenstein"],
    ["LT", "Lithuania"], ["LU", "Luxembourg"], ["MT", "Malta"], ["MD", "Moldova"],
    ["MC", "Monaco"], ["ME", "Montenegro"], ["NL", "Netherlands"],
    ["MK", "North Macedonia"], ["NO", "Norway"], ["PL", "Poland"], ["PT", "Portugal"],
    ["RO", "Romania"], ["RU", "Russia"], ["SM", "San Marino"], ["RS", "Serbia"],
    ["SK", "Slovakia"], ["SI", "Slovenia"], ["ES", "Spain"], ["SE", "Sweden"],
    ["CH", "Switzerland"], ["UA", "Ukraine"], ["GB", "United Kingdom"],
    ["VA", "Vatican City"],
  ],
  Asia: [
    ["AF", "Afghanistan"], ["AM", "Armenia"], ["AZ", "Azerbaijan"], ["BH", "Bahrain"],
    ["BD", "Bangladesh"], ["BT", "Bhutan"], ["BN", "Brunei"], ["KH", "Cambodia"],
    ["CN", "China"], ["CY", "Cyprus"], ["GE", "Georgia"], ["HK", "Hong Kong"],
    ["IN", "India"], ["ID", "Indonesia"], ["IR", "Iran"], ["IQ", "Iraq"],
    ["IL", "Israel"], ["JP", "Japan"], ["JO", "Jordan"], ["KZ", "Kazakhstan"],
    ["KW", "Kuwait"], ["KG", "Kyrgyzstan"], ["LA", "Laos"], ["LB", "Lebanon"],
    ["MO", "Macao"], ["MY", "Malaysia"], ["MV", "Maldives"], ["MN", "Mongolia"],
    ["MM", "Myanmar"], ["NP", "Nepal"], ["KP", "North Korea"], ["OM", "Oman"],
    ["PK", "Pakistan"], ["PS", "Palestine"], ["PH", "Philippines"], ["QA", "Qatar"],
    ["SA", "Saudi Arabia"], ["SG", "Singapore"], ["KR", "South Korea"],
    ["LK", "Sri Lanka"], ["SY", "Syria"], ["TW", "Taiwan"], ["TJ", "Tajikistan"],
    ["TH", "Thailand"], ["TL", "Timor-Leste"], ["TR", "Türkiye"], ["TM", "Turkmenistan"],
    ["AE", "United Arab Emirates"], ["UZ", "Uzbekistan"], ["VN", "Vietnam"],
    ["YE", "Yemen"],
  ],
  Africa: [
    ["DZ", "Algeria"], ["AO", "Angola"], ["BJ", "Benin"], ["BW", "Botswana"],
    ["BF", "Burkina Faso"], ["BI", "Burundi"], ["CV", "Cabo Verde"], ["CM", "Cameroon"],
    ["CF", "Central African Republic"], ["TD", "Chad"], ["KM", "Comoros"],
    ["CG", "Congo"], ["CD", "DR Congo"], ["CI", "Côte d'Ivoire"], ["DJ", "Djibouti"],
    ["EG", "Egypt"], ["GQ", "Equatorial Guinea"], ["ER", "Eritrea"], ["SZ", "Eswatini"],
    ["ET", "Ethiopia"], ["GA", "Gabon"], ["GM", "Gambia"], ["GH", "Ghana"],
    ["GN", "Guinea"], ["GW", "Guinea-Bissau"], ["KE", "Kenya"], ["LS", "Lesotho"],
    ["LR", "Liberia"], ["LY", "Libya"], ["MG", "Madagascar"], ["MW", "Malawi"],
    ["ML", "Mali"], ["MR", "Mauritania"], ["MU", "Mauritius"], ["MA", "Morocco"],
    ["MZ", "Mozambique"], ["NA", "Namibia"], ["NE", "Niger"], ["NG", "Nigeria"],
    ["RW", "Rwanda"], ["ST", "São Tomé & Príncipe"], ["SN", "Senegal"],
    ["SC", "Seychelles"], ["SL", "Sierra Leone"], ["SO", "Somalia"],
    ["ZA", "South Africa"], ["SS", "South Sudan"], ["SD", "Sudan"], ["TZ", "Tanzania"],
    ["TG", "Togo"], ["TN", "Tunisia"], ["UG", "Uganda"], ["ZM", "Zambia"],
    ["ZW", "Zimbabwe"],
  ],
  "North America": [
    ["AG", "Antigua & Barbuda"], ["AW", "Aruba"], ["BS", "Bahamas"], ["BB", "Barbados"],
    ["BZ", "Belize"], ["BM", "Bermuda"], ["VG", "British Virgin Islands"],
    ["CA", "Canada"], ["KY", "Cayman Islands"], ["CR", "Costa Rica"], ["CU", "Cuba"],
    ["CW", "Curaçao"], ["DM", "Dominica"], ["DO", "Dominican Republic"],
    ["SV", "El Salvador"], ["GL", "Greenland"], ["GD", "Grenada"],
    ["GP", "Guadeloupe"], ["GT", "Guatemala"], ["HT", "Haiti"], ["HN", "Honduras"],
    ["JM", "Jamaica"], ["MQ", "Martinique"], ["MX", "Mexico"], ["NI", "Nicaragua"],
    ["PA", "Panama"], ["PR", "Puerto Rico"], ["KN", "St. Kitts & Nevis"],
    ["LC", "St. Lucia"], ["VC", "St. Vincent & Grenadines"], ["TT", "Trinidad & Tobago"],
    ["TC", "Turks & Caicos"], ["US", "United States"], ["VI", "U.S. Virgin Islands"],
  ],
  "South America": [
    ["AR", "Argentina"], ["BO", "Bolivia"], ["BR", "Brazil"], ["CL", "Chile"],
    ["CO", "Colombia"], ["EC", "Ecuador"], ["FK", "Falkland Islands"],
    ["GF", "French Guiana"], ["GY", "Guyana"], ["PY", "Paraguay"], ["PE", "Peru"],
    ["SR", "Suriname"], ["UY", "Uruguay"], ["VE", "Venezuela"],
  ],
  Oceania: [
    ["AS", "American Samoa"], ["AU", "Australia"], ["CK", "Cook Islands"],
    ["FJ", "Fiji"], ["PF", "French Polynesia"], ["GU", "Guam"], ["KI", "Kiribati"],
    ["MH", "Marshall Islands"], ["FM", "Micronesia"], ["NR", "Nauru"],
    ["NC", "New Caledonia"], ["NZ", "New Zealand"], ["NU", "Niue"], ["PW", "Palau"],
    ["PG", "Papua New Guinea"], ["WS", "Samoa"], ["SB", "Solomon Islands"],
    ["TO", "Tonga"], ["TV", "Tuvalu"], ["VU", "Vanuatu"],
  ],
};

export const COUNTRIES = CONTINENTS.flatMap((continent) =>
  BY_CONTINENT[continent].map(([code, name]) => ({
    code,
    name,
    continent,
    flag: flagFor(code),
  }))
).sort((a, b) => a.name.localeCompare(b.name));

const COUNTRY_INDEX = Object.fromEntries(COUNTRIES.map((c) => [c.code, c]));

export const countryFor = (code) => COUNTRY_INDEX[code];

export const CONTINENT_TOTALS = Object.fromEntries(
  CONTINENTS.map((continent) => [continent, BY_CONTINENT[continent].length])
);

// Strips accents so "cote"/"turkiye" match "Côte d'Ivoire"/"Türkiye".
const normalize = (value) =>
  value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

export const searchCountries = (query) => {
  const needle = normalize(query);
  if (!needle) return COUNTRIES;
  return COUNTRIES.filter(
    (c) => normalize(c.name).includes(needle) || c.code.toLowerCase() === needle
  );
};
