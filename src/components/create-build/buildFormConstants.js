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
  { value: 'pve', label: 'PvE (MVP)' },
  { value: 'pvp', label: 'PvP (Player vs Player)' },
  { value: 'woe', label: 'Woe (War of Emperium)' },
];

export const IMAGE_UPLOAD_ENDPOINT = 'http://localhost:8080/api/v1/images';

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
