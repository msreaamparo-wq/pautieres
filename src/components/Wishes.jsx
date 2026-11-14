import { Heart } from 'lucide-react';
import Highlight from './Highlight.jsx';
import { Avatar } from './RsvpTable.jsx';
import { fmtDateTime } from '../lib/format.js';

export default function Wishes({ rows, query, onOpen }) {
  return (
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
      {rows.map((r) => (
        <button key={r.id} onClick={() => onOpen(r)} className="pop-in mb-4 block w-full break-inside-avoid rounded-2xl border border-champagne/60 bg-gradient-to-br from-ivory to-mist/60 p-5 text-left shadow-card transition hover:-translate-y-0.5 hover:shadow-soft">
          <Heart size={18} className="text-gold" fill="currentColor" />
          <p className="mt-3 font-serif text-[17px] leading-relaxed text-ink">
            “<Highlight text={r.message} query={query} />”
          </p>
          <div className="mt-4 flex items-center gap-2.5 border-t border-champagne/50 pt-3">
            <Avatar name={r.name} size="h-8 w-8 text-xs" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold"><Highlight text={r.name} query={query} /></p>
              <p className="text-[11px] text-ink/50">{fmtDateTime(r.created_at)}</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
