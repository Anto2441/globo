export type ContinentKey =
  | 'africa'
  | 'europe'
  | 'northam'
  | 'southam'
  | 'asia'
  | 'oceania'
  | 'antarctica'

export const COUNTRY_CONTINENTS: Record<string, ContinentKey> = {
  // ── Africa ──────────────────────────────────────────────────────────────
  BF: 'africa', // Burkina Faso
  BI: 'africa', // Burundi
  BJ: 'africa', // Benin
  BW: 'africa', // Botswana
  CD: 'africa', // DR Congo
  CF: 'africa', // Central African Republic
  CG: 'africa', // Republic of Congo
  CI: 'africa', // Côte d'Ivoire
  CM: 'africa', // Cameroon
  DJ: 'africa', // Djibouti
  DZ: 'africa', // Algeria
  EG: 'africa', // Egypt
  EH: 'africa', // Western Sahara
  ER: 'africa', // Eritrea
  ET: 'africa', // Ethiopia
  GA: 'africa', // Gabon
  GH: 'africa', // Ghana
  GM: 'africa', // Gambia
  GN: 'africa', // Guinea
  GQ: 'africa', // Equatorial Guinea
  GW: 'africa', // Guinea-Bissau
  KE: 'africa', // Kenya
  LR: 'africa', // Liberia
  LS: 'africa', // Lesotho
  LY: 'africa', // Libya
  MA: 'africa', // Morocco
  MG: 'africa', // Madagascar
  ML: 'africa', // Mali
  MR: 'africa', // Mauritania
  MW: 'africa', // Malawi
  MZ: 'africa', // Mozambique
  NA: 'africa', // Namibia
  NE: 'africa', // Niger
  NG: 'africa', // Nigeria
  RW: 'africa', // Rwanda
  SD: 'africa', // Sudan
  SL: 'africa', // Sierra Leone
  SN: 'africa', // Senegal
  SO: 'africa', // Somalia
  SS: 'africa', // South Sudan
  SZ: 'africa', // Eswatini
  TD: 'africa', // Chad
  TG: 'africa', // Togo
  TN: 'africa', // Tunisia
  TZ: 'africa', // Tanzania
  UG: 'africa', // Uganda
  YT: 'africa', // Mayotte (French territory, Indian Ocean, off Mozambique)
  ZA: 'africa', // South Africa
  ZM: 'africa', // Zambia
  ZW: 'africa', // Zimbabwe
  // class-only
  Angola: 'africa',               // exclave Cabinda
  'Cape Verde': 'africa',
  Comoros: 'africa',
  'São Tomé and Principe': 'africa',
  Seychelles: 'africa',
  Mauritius: 'africa',

  // ── Europe ──────────────────────────────────────────────────────────────
  AL: 'europe', // Albania
  AM: 'europe', // Armenia (geopolitically Europe)
  AT: 'europe', // Austria
  BA: 'europe', // Bosnia and Herzegovina
  BE: 'europe', // Belgium
  BG: 'europe', // Bulgaria
  BY: 'europe', // Belarus
  CH: 'europe', // Switzerland
  CZ: 'europe', // Czechia
  DE: 'europe', // Germany
  EE: 'europe', // Estonia
  ES: 'europe', // Spain
  FI: 'europe', // Finland
  GE: 'europe', // Georgia (geopolitically Europe)
  HR: 'europe', // Croatia
  HU: 'europe', // Hungary
  IE: 'europe', // Ireland
  IS: 'europe', // Iceland
  LT: 'europe', // Lithuania
  LU: 'europe', // Luxembourg
  LV: 'europe', // Latvia
  MD: 'europe', // Moldova
  ME: 'europe', // Montenegro
  MK: 'europe', // North Macedonia
  NL: 'europe', // Netherlands
  PL: 'europe', // Poland
  PS: 'asia', // Palestine (Middle East)
  PT: 'europe', // Portugal
  RO: 'europe', // Romania
  RS: 'europe', // Serbia
  SE: 'europe', // Sweden
  SI: 'europe', // Slovenia
  SK: 'europe', // Slovakia
  UA: 'europe', // Ukraine
  XK: 'europe', // Kosovo
  // class-only
  'Canary Islands (Spain)': 'europe',
  Cyprus: 'europe',
  Denmark: 'europe',
  'Faeroe Islands': 'europe',
  France: 'europe',
  Greece: 'europe',
  Italy: 'europe',
  Malta: 'europe',
  Norway: 'europe',
  'Russian Federation': 'europe',
  'United Kingdom': 'europe',

  // ── North America ────────────────────────────────────────────────────────
  AI: 'northam', // Anguilla
  AW: 'northam', // Aruba
  BB: 'northam', // Barbados
  BL: 'northam', // Saint Barthélemy
  BM: 'northam', // Bermuda
  BQBO: 'northam', // Bonaire
  BQSA: 'northam', // Saba
  BQSE: 'northam', // Sint Eustatius
  BZ: 'northam', // Belize
  CR: 'northam', // Costa Rica
  CU: 'northam', // Cuba
  CW: 'northam', // Curaçao
  DM: 'northam', // Dominica
  DO: 'northam', // Dominican Republic
  GD: 'northam', // Grenada
  GF: 'northam', // French Guiana
  GL: 'northam', // Greenland
  GT: 'northam', // Guatemala
  GU: 'northam', // Guam
  HN: 'northam', // Honduras
  HT: 'northam', // Haiti
  JM: 'northam', // Jamaica
  LC: 'northam', // Saint Lucia
  MF: 'northam', // Saint Martin
  MQ: 'northam', // Martinique
  MS: 'northam', // Montserrat
  MX: 'northam', // Mexico
  NI: 'northam', // Nicaragua
  PA: 'northam', // Panama
  RE: 'africa', // Réunion (French island off Madagascar)
  SV: 'northam', // El Salvador
  SX: 'northam', // Sint Maarten
  VC: 'northam', // Saint Vincent and the Grenadines
  VG: 'northam', // British Virgin Islands
  // class-only
  Bahamas: 'northam',
  Canada: 'northam',
  'Cayman Islands': 'northam',
  Guadeloupe: 'northam',
  'Puerto Rico': 'northam',
  'Saint Kitts and Nevis': 'northam',
  'Trinidad and Tobago': 'northam',
  'Turks and Caicos Islands': 'northam',
  'United States': 'northam',
  'United States Virgin Islands': 'northam',
  'Northern Mariana Islands': 'northam',

  // ── South America ────────────────────────────────────────────────────────
  BO: 'southam', // Bolivia
  BR: 'southam', // Brazil
  CO: 'southam', // Colombia
  EC: 'southam', // Ecuador
  GY: 'southam', // Guyana
  PE: 'southam', // Peru
  PY: 'southam', // Paraguay
  SR: 'southam', // Suriname
  UY: 'southam', // Uruguay
  VE: 'southam', // Venezuela
  // class-only
  Argentina: 'southam',
  Chile: 'southam',
  'Falkland Islands': 'southam',

  // ── Asia ────────────────────────────────────────────────────────────────
  AE: 'asia', // United Arab Emirates
  AF: 'asia', // Afghanistan
  BD: 'asia', // Bangladesh
  BH: 'asia', // Bahrain
  BN: 'asia', // Brunei
  BT: 'asia', // Bhutan
  IL: 'asia', // Israel
  IN: 'asia', // India
  IQ: 'asia', // Iraq
  IR: 'asia', // Iran
  JO: 'asia', // Jordan
  KG: 'asia', // Kyrgyzstan
  KH: 'asia', // Cambodia
  KP: 'asia', // North Korea
  KR: 'asia', // South Korea
  KW: 'asia', // Kuwait
  KZ: 'asia', // Kazakhstan
  LA: 'asia', // Laos
  LB: 'asia', // Lebanon
  LK: 'asia', // Sri Lanka
  MM: 'asia', // Myanmar
  MN: 'asia', // Mongolia
  MV: 'asia', // Maldives (Indian Ocean, closer to Asia)
  NP: 'asia', // Nepal
  PK: 'asia', // Pakistan
  QA: 'asia', // Qatar
  SA: 'asia', // Saudi Arabia
  SY: 'asia', // Syria
  TH: 'asia', // Thailand
  TJ: 'asia', // Tajikistan
  TL: 'asia', // Timor-Leste
  TM: 'asia', // Turkmenistan
  TW: 'asia', // Taiwan
  UZ: 'asia', // Uzbekistan
  VN: 'asia', // Vietnam
  YE: 'asia', // Yemen
  // class-only
  Azerbaijan: 'asia',
  China: 'asia',
  Indonesia: 'asia',
  Japan: 'asia',
  Malaysia: 'asia',
  Oman: 'asia',
  Philippines: 'asia',
  Turkey: 'asia',

  // ── Oceania ──────────────────────────────────────────────────────────────
  MH: 'oceania', // Marshall Islands
  NR: 'oceania', // Nauru
  PW: 'oceania', // Palau
  TV: 'oceania', // Tuvalu
  // class-only
  'American Samoa': 'oceania',
  'Antigua and Barbuda': 'northam', // Caribbean → northam
  Australia: 'oceania',
  'Federated States of Micronesia': 'oceania',
  Fiji: 'oceania',
  'French Polynesia': 'oceania',
  'New Caledonia': 'oceania',
  'New Zealand': 'oceania',
  'Papua New Guinea': 'oceania',
  Samoa: 'oceania',
  'Solomon Islands': 'oceania',
  Tonga: 'oceania',
  Vanuatu: 'oceania',

  // ── Antarctica ───────────────────────────────────────────────────────────
  // No id-based paths — Antarctica is rendered via class-only or not present
}
