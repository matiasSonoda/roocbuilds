export const BUILD_FORM_DEFAULT_VALUES = {
  title: '',
  author: '',
  jobClass: '',
  buildType: '',
  content: '',
};

export const JOB_CLASSES = [
  'Lord Knight',
  'Paladin',
  'Minstrel',
  'Gypsy',
  'Assasin Cross',
  'Stalker',
  'High Priest',
  'Champion',
  'High Wizzard',
  'Professor',
  'Mastersmith',
  'Biochemist',
];

export const BUILD_TYPES = [
  { value: 'PVE', label: 'PvE (MVP)' },
  { value: 'PVP', label: 'PvP (Player vs Player)' },
  { value: 'WOE', label: 'Woe (War of Emperium)' },
];

export const SANITIZE_BUILD_CONTENT_OPTIONS = {
  ALLOWED_TAGS: [
    'p',
    'h1',
    'h2',
    'h3',
    'h4',
    'strong',
    'em',
    'u',
    's',
    'mark',
    'ul',
    'ol',
    'li',
    'img',
    'iframe',
  ],
  ALLOWED_ATTR: [
    'src',
    'alt',
    'class',
    'width',
    'height',
    'allow',
    'allowfullscreen',
    'frameborder',
    'referrerpolicy',
    'title',
  ],
};
