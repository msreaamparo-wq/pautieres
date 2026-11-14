import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ page, pages, pageSize, setPage, setPageSize, total }) {
  const btn = 'grid h-9 w-9 place-items-center rounded-full border border-champagne/70 bg-white transition hover:bg-mist disabled:opacity-40';
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-ink/65">
      <label className="flex items-center gap-2">
        Rows
        <select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))} className="rounded-lg border border-sky bg-white px-2 py-1.5 text-ink">
          {[10, 25, 50, 100].map((n) => <option key={n} value={n}>{n}</option>)}
        </select>
      </label>
      <div className="flex items-center gap-2">
        <button className={btn} onClick={() => setPage(page - 1)} disabled={page <= 1} aria-label="Previous page"><ChevronLeft size={17} /></button>
        <span className="min-w-[6.5rem] text-center">Page {page} of {pages} · {total}</span>
        <button className={btn} onClick={() => setPage(page + 1)} disabled={page >= pages} aria-label="Next page"><ChevronRight size={17} /></button>
      </div>
    </div>
  );
}
