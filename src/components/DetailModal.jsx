import { useEffect, useState } from 'react';
import { Loader2, Trash2, X } from 'lucide-react';
import { Avatar, StatusBadge } from './RsvpTable.jsx';
import { fmtDateTime } from '../lib/format.js';

export default function DetailModal({ row, onClose, onDelete }) {
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const doDelete = async () => {
    setBusy(true);
    setError('');
    try {
      await onDelete(row.id);
      onClose();
    } catch (e) {
      setError(e.message || 'Could not delete.');
      setBusy(false);
    }
  };

  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-ink/50 p-4 backdrop-blur-sm" onClick={onClose} role="dialog" aria-modal="true" aria-label={`RSVP from ${row.name}`}>
      <div className="pop-in w-full max-w-md overflow-hidden rounded-[1.75rem] border border-champagne/70 bg-ivory shadow-soft" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-3 bg-gradient-to-br from-mist via-sky/40 to-sun/30 p-6">
          <div className="flex items-center gap-3">
            <Avatar name={row.name} size="h-14 w-14 text-lg" />
            <div>
              <h2 className="font-serif text-xl font-bold">{row.name}</h2>
              <div className="mt-1.5"><StatusBadge attending={row.attending} /></div>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close" className="rounded-full bg-white/80 p-2 hover:bg-white"><X size={18} /></button>
        </div>

        <dl className="grid gap-4 p-6 text-sm">
          <div className="grid grid-cols-2 gap-4">
            <div><dt className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink/50">Guests</dt><dd className="mt-1 font-serif text-2xl font-bold">{row.attending ? row.guests : '–'}</dd></div>
            <div><dt className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink/50">Submitted</dt><dd className="mt-1 font-semibold">{fmtDateTime(row.created_at)}</dd></div>
          </div>
          <div>
            <dt className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink/50">Message</dt>
            <dd className="mt-1.5 whitespace-pre-wrap rounded-xl bg-mist/60 p-4 leading-relaxed text-ink/80">{row.message || <span className="text-ink/40">No message</span>}</dd>
          </div>
        </dl>

        <div className="border-t border-champagne/50 p-5">
          {error && <p role="alert" className="mb-3 rounded-xl bg-sun/40 px-4 py-2.5 text-sm font-semibold">{error}</p>}
          {!confirming ? (
            <button onClick={() => setConfirming(true)} className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50">
              <Trash2 size={16} /> Delete this RSVP
            </button>
          ) : (
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-semibold">Delete permanently?</span>
              <button onClick={doDelete} disabled={busy} className="inline-flex items-center gap-2 rounded-full bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700 disabled:opacity-70">
                {busy && <Loader2 size={15} className="animate-spin" />} Yes, delete
              </button>
              <button onClick={() => setConfirming(false)} disabled={busy} className="rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold hover:bg-mist">Cancel</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
