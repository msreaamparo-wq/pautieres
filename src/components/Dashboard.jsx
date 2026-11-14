import { useCallback, useEffect, useMemo, useState } from 'react';
import { Inbox, Loader2, MessageCircle, Users } from 'lucide-react';
import Header from './Header.jsx';
import Stats from './Stats.jsx';
import Filters, { DEFAULT_FILTERS } from './Filters.jsx';
import RsvpTable from './RsvpTable.jsx';
import RsvpCards from './RsvpCards.jsx';
import Wishes from './Wishes.jsx';
import Pagination from './Pagination.jsx';
import DetailModal from './DetailModal.jsx';
import Toast from './Toast.jsx';
import Locked from './Locked.jsx';
import { useRsvps } from '../hooks/useRsvps.js';
import { applyFilters } from '../lib/filter.js';
import { downloadCsv } from '../lib/format.js';

export default function Dashboard({ accessKey }) {
  const [toast, setToast] = useState('');
  const clearToast = useCallback(() => setToast(''), []);
  const { rows, loading, error, badKey, updatedAt, refresh, remove } = useRsvps(accessKey, (row, count) =>
    setToast(count > 1 ? `${count} new RSVPs, latest from ${row.name}` : `New RSVP from ${row.name}`)
  );

  const [tab, setTab] = useState('responses');
  const [view, setView] = useState('table');
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedId, setSelectedId] = useState(null);

  const filtered = useMemo(() => applyFilters(rows, filters), [rows, filters]);
  const wishes = useMemo(() => filtered.filter((r) => r.message && r.message.trim()), [filtered]);
  const list = tab === 'wishes' ? wishes : filtered;

  const activeCount =
    (filters.q.trim() ? 1 : 0) + (filters.status !== 'all' ? 1 : 0) + (filters.withMessage ? 1 : 0) +
    (filters.guests !== 'any' ? 1 : 0) + (filters.range !== 'any' ? 1 : 0);
  const guestsShown = filtered.reduce((n, r) => n + (r.attending ? r.guests : 0), 0);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  useEffect(() => { setPage(1); }, [filters, pageSize, tab]);
  const safePage = Math.min(page, pages);
  const pageRows = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  const selected = rows.find((r) => r.id === selectedId) || null;

  if (badKey) return <Locked />;

  const tabBtn = (id, Icon, text, count) => (
    <button
      onClick={() => setTab(id)}
      aria-pressed={tab === id}
      className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${tab === id ? 'bg-ink text-white shadow-card' : 'text-ink/65 hover:bg-mist'}`}
    >
      <Icon size={16} /> {text} <span className={`rounded-full px-2 py-0.5 text-xs ${tab === id ? 'bg-white/20' : 'bg-mist'}`}>{count}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-mist/70 via-cream to-cream">
      <Header
        updatedAt={updatedAt}
        loading={loading}
        onRefresh={refresh}
        onExport={() => downloadCsv(filtered, `shaun-rsvps-${new Date().toISOString().slice(0, 10)}.csv`)}
        exportCount={filtered.length}
      />

      <main className="mx-auto grid max-w-6xl gap-6 px-5 py-8">
        <Stats rows={rows} />

        <div className="flex flex-wrap gap-2">
          {tabBtn('responses', Users, 'Responses', filtered.length)}
          {tabBtn('wishes', MessageCircle, 'Wishes', wishes.length)}
        </div>

        <Filters
          filters={filters}
          setFilters={setFilters}
          view={view}
          setView={setView}
          showView={tab === 'responses'}
          activeCount={activeCount}
          onClear={() => setFilters(DEFAULT_FILTERS)}
          shown={list.length}
          total={rows.length}
          guestsShown={guestsShown}
        />

        {error && <p role="alert" className="rounded-2xl bg-sun/40 px-5 py-4 text-sm font-semibold">Could not load RSVPs: {error}</p>}

        {loading && !rows.length ? (
          <div className="grid place-items-center py-20 text-ink/50"><Loader2 className="animate-spin" size={28} /></div>
        ) : list.length === 0 ? (
          <div className="grid place-items-center gap-3 rounded-2xl border border-dashed border-baby bg-ivory/70 py-16 text-center">
            <Inbox size={34} className="text-baby" />
            <p className="font-serif text-xl font-bold">{rows.length ? 'No matches found' : 'No RSVPs yet'}</p>
            <p className="max-w-xs text-sm text-ink/60">
              {rows.length ? 'Try a different search or clear the filters.' : 'New replies will appear here automatically.'}
            </p>
          </div>
        ) : tab === 'wishes' ? (
          <Wishes rows={wishes} query={filters.q} onOpen={(r) => setSelectedId(r.id)} />
        ) : (
          <>
            {view === 'table'
              ? <RsvpTable rows={pageRows} query={filters.q} onOpen={(r) => setSelectedId(r.id)} />
              : <RsvpCards rows={pageRows} query={filters.q} onOpen={(r) => setSelectedId(r.id)} />}
            <Pagination page={safePage} pages={pages} pageSize={pageSize} setPage={setPage} setPageSize={setPageSize} total={filtered.length} />
          </>
        )}
      </main>

      {selected && <DetailModal row={selected} onClose={() => setSelectedId(null)} onDelete={remove} />}
      <Toast message={toast} onDone={clearToast} />
    </div>
  );
}
