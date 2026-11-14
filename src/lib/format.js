import { CONFIG } from '../config.js';

const dateTime = new Intl.DateTimeFormat('en-PH', {
  timeZone: CONFIG.timezone,
  dateStyle: 'medium',
  timeStyle: 'short'
});

export const fmtDateTime = (iso) => dateTime.format(new Date(iso));

export function timeAgo(iso) {
  const s = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 1000));
  if (s < 60) return 'just now';
  const m = Math.floor(s / 60);
  if (m < 60) return `${m} min ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} hr${h > 1 ? 's' : ''} ago`;
  const d = Math.floor(h / 24);
  if (d < 30) return `${d} day${d > 1 ? 's' : ''} ago`;
  return fmtDateTime(iso).split(',').slice(0, 2).join(',');
}

export const initials = (name = '') =>
  name.trim().split(/\s+/).slice(0, 2).map((w) => (w[0] || '').toUpperCase()).join('') || '?';

const AVATARS = [
  'bg-sky text-ink',
  'bg-sun text-ink',
  'bg-mist text-ocean',
  'bg-champagne text-ink',
  'bg-baby text-ink'
];
export function avatarClass(name = '') {
  let h = 0;
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return AVATARS[h % AVATARS.length];
}

const csvCell = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;

export function downloadCsv(rows, filename = 'rsvps.csv') {
  const head = ['Name', 'Attending', 'Guests', 'Message', 'Submitted (Philippine time)'];
  const lines = rows.map((r) =>
    [r.name, r.attending ? 'Yes' : 'No', r.guests, r.message || '', fmtDateTime(r.created_at)]
      .map(csvCell)
      .join(',')
  );
  // \uFEFF makes Excel read the file as UTF-8.
  const blob = new Blob(['\uFEFF' + [head.map(csvCell).join(','), ...lines].join('\r\n')], {
    type: 'text/csv;charset=utf-8'
  });
  const url = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement('a'), { href: url, download: filename });
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
