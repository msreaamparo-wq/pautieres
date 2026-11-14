// Filtering + sorting for the RSVP list.
export function applyFilters(rows, f) {
  const q = f.q.trim().toLowerCase();
  const now = Date.now();
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const since = { today: startOfToday.getTime(), '7d': now - 7 * 864e5, '30d': now - 30 * 864e5 }[f.range];

  const list = rows.filter((r) => {
    if (q && !`${r.name} ${r.message || ''}`.toLowerCase().includes(q)) return false;
    if (f.status === 'yes' && !r.attending) return false;
    if (f.status === 'no' && r.attending) return false;
    if (f.withMessage && !(r.message && r.message.trim())) return false;
    if (since && new Date(r.created_at).getTime() < since) return false;
    if (f.guests !== 'any') {
      if (!r.attending) return false;
      if (f.guests === '4plus' ? r.guests < 4 : r.guests !== Number(f.guests)) return false;
    }
    return true;
  });

  const by = {
    newest: (a, b) => new Date(b.created_at) - new Date(a.created_at),
    oldest: (a, b) => new Date(a.created_at) - new Date(b.created_at),
    name_asc: (a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }),
    name_desc: (a, b) => b.name.localeCompare(a.name, undefined, { sensitivity: 'base' }),
    guests_desc: (a, b) => (b.attending ? b.guests : 0) - (a.attending ? a.guests : 0)
  }[f.sort];

  return by ? [...list].sort(by) : list;
}
