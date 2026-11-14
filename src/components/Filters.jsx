import { LayoutGrid, List, Search, X } from 'lucide-react';

export const DEFAULT_FILTERS = { q: '', status: 'all', withMessage: false, guests: 'any', range: 'any', sort: 'newest' };

const select = 'rounded-xl border border-sky bg-white px-3 py-2.5 text-sm text-ink transition focus:border-ocean focus:outline-none focus:ring-4 focus:ring-sky/60';

export default function Filters({ filters, setFilters, view, setView, showView, activeCount, onClear, shown, total, guestsShown }) {
  const set = (patch) => setFilters((f) => ({ ...f, ...patch }));

  return (
    <section aria-label="Search and filters" className="grid gap-3 rounded-2xl border border-champagne/60 bg-ivory p-4 shadow-card sm:p-5">
      {/* Search */}
      <div className="relative">
        <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/40" />
        <input
          type="search"
          value={filters.q}
          onChange={(e) => set({ q: e.target.value })}
          placeholder="Search by name or message..."
          aria-label="Search RSVPs"
          className="w-full rounded-xl border border-sky bg-white py-3 pl-11 pr-11 text-ink placeholder:text-ink/35 transition focus:border-ocean focus:outline-none focus:ring-4 focus:ring-sky/60 [&::-webkit-search-cancel-button]:hidden"
        />
        {filters.q && (
          <button onClick={() => set({ q: '' })} aria-label="Clear search" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-ink/50 hover:bg-mist">
            <X size={16} />
          </button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Status */}
        <div role="group" aria-label="Attendance" className="flex rounded-full border border-sky bg-white p-1">
          {[['all', 'All'], ['yes', 'Attending'], ['no', 'Can’t make it']].map(([value, text]) => (
            <button
              key={value}
              onClick={() => set({ status: value, guests: value === 'no' ? 'any' : filters.guests })}
              aria-pressed={filters.status === value}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${filters.status === value ? 'bg-ink text-white' : 'text-ink/65 hover:bg-mist'}`}
            >
              {text}
            </button>
          ))}
        </div>

        <select aria-label="Number of guests" className={select} value={filters.guests} onChange={(e) => set({ guests: e.target.value, status: e.target.value === 'any' ? filters.status : 'yes' })}>
          <option value="any">Any guests</option>
          <option value="1">1 guest</option>
          <option value="2">2 guests</option>
          <option value="3">3 guests</option>
          <option value="4plus">4+ guests</option>
        </select>

        <select aria-label="Submitted" className={select} value={filters.range} onChange={(e) => set({ range: e.target.value })}>
          <option value="any">Any time</option>
          <option value="today">Today</option>
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
        </select>

        <select aria-label="Sort by" className={select} value={filters.sort} onChange={(e) => set({ sort: e.target.value })}>
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="name_asc">Name A–Z</option>
          <option value="name_desc">Name Z–A</option>
          <option value="guests_desc">Most guests</option>
        </select>

        <label className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-ink/75">
          <input type="checkbox" checked={filters.withMessage} onChange={(e) => set({ withMessage: e.target.checked })} className="h-4 w-4 rounded border-sky accent-[#4f8fd0]" />
          With message
        </label>

        {showView && (
          <div role="group" aria-label="View" className="ml-auto flex rounded-full border border-sky bg-white p-1">
            {[['table', List, 'Table view'], ['cards', LayoutGrid, 'Card view']].map(([value, Icon, label]) => (
              <button key={value} onClick={() => setView(value)} aria-pressed={view === value} aria-label={label} title={label}
                className={`grid h-8 w-9 place-items-center rounded-full transition ${view === value ? 'bg-ink text-white' : 'text-ink/60 hover:bg-mist'}`}>
                <Icon size={16} />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-ink/60">
        <p>
          Showing <strong className="text-ink">{shown}</strong> of <strong className="text-ink">{total}</strong>
          {guestsShown > 0 && <> · <strong className="text-ink">{guestsShown}</strong> guests coming</>}
        </p>
        {activeCount > 0 && (
          <button onClick={onClear} className="inline-flex items-center gap-1.5 rounded-full bg-sun/50 px-3 py-1 font-semibold text-ink hover:bg-sun">
            <X size={14} /> Clear {activeCount} filter{activeCount > 1 ? 's' : ''}
          </button>
        )}
      </div>
    </section>
  );
}
