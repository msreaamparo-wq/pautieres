import { CheckCircle2, XCircle } from 'lucide-react';
import Highlight from './Highlight.jsx';
import { avatarClass, fmtDateTime, initials, timeAgo } from '../lib/format.js';

export function StatusBadge({ attending }) {
  return attending ? (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
      <CheckCircle2 size={13} /> Attending
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-600">
      <XCircle size={13} /> Can’t make it
    </span>
  );
}

export function Avatar({ name, size = 'h-10 w-10 text-sm' }) {
  return <span className={`grid shrink-0 place-items-center rounded-full font-bold ${size} ${avatarClass(name)}`}>{initials(name)}</span>;
}

export default function RsvpTable({ rows, query, onOpen }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-champagne/60 bg-ivory shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-mist/70 text-[11px] font-bold uppercase tracking-[0.14em] text-ink/55">
            <tr>
              <th className="px-5 py-3.5">Name</th>
              <th className="px-3 py-3.5">Status</th>
              <th className="px-3 py-3.5 text-center">Guests</th>
              <th className="px-3 py-3.5">Message</th>
              <th className="px-5 py-3.5">Submitted</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-champagne/40">
            {rows.map((r) => (
              <tr key={r.id} onClick={() => onOpen(r)} onKeyDown={(e) => e.key === 'Enter' && onOpen(r)} tabIndex={0} className="cursor-pointer transition hover:bg-mist/50">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <Avatar name={r.name} />
                    <span className="font-semibold"><Highlight text={r.name} query={query} /></span>
                  </div>
                </td>
                <td className="px-3 py-3.5"><StatusBadge attending={r.attending} /></td>
                <td className="px-3 py-3.5 text-center font-serif text-lg font-bold tabular-nums">{r.attending ? r.guests : '–'}</td>
                <td className="max-w-[18rem] px-3 py-3.5 text-ink/70">
                  {r.message ? <span className="line-clamp-2"><Highlight text={r.message} query={query} /></span> : <span className="text-ink/30">—</span>}
                </td>
                <td className="whitespace-nowrap px-5 py-3.5 text-ink/65" title={fmtDateTime(r.created_at)}>
                  <div className="font-semibold text-ink/80">{timeAgo(r.created_at)}</div>
                  <div className="text-xs">{fmtDateTime(r.created_at)}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
