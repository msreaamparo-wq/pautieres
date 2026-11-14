import { Download, Loader2, RefreshCw } from 'lucide-react';
import { CONFIG } from '../config.js';
import { timeAgo } from '../lib/format.js';

export default function Header({ updatedAt, loading, onRefresh, onExport, exportCount }) {
  const btn = 'inline-flex items-center gap-2 rounded-full border border-champagne/70 bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:bg-mist disabled:opacity-60';
  return (
    <header className="border-b border-champagne/60 bg-ivory/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-mist text-2xl shadow-card">🎂</span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-gold">RSVP Dashboard</p>
            <h1 className="font-serif text-lg font-bold leading-tight sm:text-xl">{CONFIG.eventName}</h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="hidden items-center gap-2 text-xs text-ink/55 md:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> Live
            {updatedAt && <span>· updated {timeAgo(updatedAt.toISOString())}</span>}
          </span>
          <button onClick={onRefresh} className={btn} disabled={loading}>
            {loading ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />} Refresh
          </button>
          <button onClick={onExport} className={btn} disabled={!exportCount} title="Download the rows currently shown">
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>
    </header>
  );
}
