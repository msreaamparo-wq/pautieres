import Highlight from './Highlight.jsx';
import { Avatar, StatusBadge } from './RsvpTable.jsx';
import { fmtDateTime, timeAgo } from '../lib/format.js';

export default function RsvpCards({ rows, query, onOpen }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {rows.map((r) => (
        <button key={r.id} onClick={() => onOpen(r)} className="pop-in rounded-2xl border border-champagne/60 bg-ivory p-5 text-left shadow-card transition hover:-translate-y-0.5 hover:shadow-soft">
          <div className="flex items-start gap-3">
            <Avatar name={r.name} size="h-11 w-11 text-sm" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold"><Highlight text={r.name} query={query} /></p>
              <p className="text-xs text-ink/55" title={fmtDateTime(r.created_at)}>{timeAgo(r.created_at)}</p>
            </div>
            {r.attending && (
              <span className="rounded-full bg-sun/50 px-2.5 py-1 text-xs font-bold text-ink">{r.guests} {r.guests === 1 ? 'guest' : 'guests'}</span>
            )}
          </div>
          <div className="mt-3"><StatusBadge attending={r.attending} /></div>
          {r.message && <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink/70"><Highlight text={r.message} query={query} /></p>}
        </button>
      ))}
    </div>
  );
}
