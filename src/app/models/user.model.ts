export interface User {
  email: string;
  uid: string;
  rank: string;
  firstName: string;
  lastName: string;
  middleInitial: string;
  nickname: string;
  hometownCity: string;
  hometownState: string;
  school: string;
  section: string;
  homePhone?: string;
  cellPhone?: string;
  streetAddress?: string;
  currentCity?: string;
  currentState?: string;
  currentZip?: string;
  significantOther?: string;
  myLife?: string;
  profilePhotoLocation?: string;
  emailPrivate: boolean;
  registered: boolean;
  pinVerified: boolean;
  display: boolean;
}

export interface UserId extends User {
  id: string;
}

export const ranks = {
  Lt: 'Lieutenant',
  Capt: 'Captain',
  Maj: 'Major',
  'Lt Co': 'Lieutenant Colonel',
  Col: 'Colonel'
};

export const states = {
  AL: 'Alabama',
  AK: 'Alaska',
  AS: 'American Samoa',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  DC: 'District Of Columbia',
  FM: 'Federated States Of Micronesia',
  FL: 'Florida',
  GA: 'Georgia',
  GU: 'Guam',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MH: 'Marshall Islands',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  MP: 'Northern Mariana Islands',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PW: 'Palau',
  PA: 'Pennsylvania',
  PR: 'Puerto Rico',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VI: 'Virgin Islands',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming'
};
