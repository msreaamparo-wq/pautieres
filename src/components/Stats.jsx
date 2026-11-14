import { CheckCircle2, MessageCircle, PartyPopper, Users, XCircle } from 'lucide-react';

function Card({ icon: Icon, label, value, hint, tone }) {
  return (
    <div className="rounded-2xl border border-champagne/60 bg-ivory p-5 shadow-card">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink/55">{label}</p>
        <span className={`grid h-9 w-9 place-items-center rounded-full ${tone}`}><Icon size={17} /></span>
      </div>
      <p className="mt-3 font-serif text-4xl font-extrabold tabular-nums">{value}</p>
      {hint && <p className="mt-1 text-xs text-ink/55">{hint}</p>}
    </div>
  );
}

export default function Stats({ rows }) {
  const total = rows.length;
  const yes = rows.filter((r) => r.attending);
  const no = total - yes.length;
  const guests = yes.reduce((sum, r) => sum + (r.guests || 0), 0);
  const wishes = rows.filter((r) => r.message && r.message.trim()).length;
  const pct = total ? Math.round((yes.length / total) * 100) : 0;

  return (
    <section aria-label="Summary" className="grid gap-4">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        <Card icon={Users} label="Responses" value={total} hint="families replied" tone="bg-mist text-ocean" />
        <Card icon={CheckCircle2} label="Attending" value={yes.length} hint={`${pct}% of replies`} tone="bg-emerald-50 text-emerald-600" />
        <Card icon={XCircle} label="Can’t make it" value={no} hint={`${total ? 100 - pct : 0}% of replies`} tone="bg-rose-50 text-rose-500" />
        <Card icon={PartyPopper} label="Expected guests" value={guests} hint="total people coming" tone="bg-sun/50 text-gold" />
        <Card icon={MessageCircle} label="Wishes" value={wishes} hint="birthday messages" tone="bg-sky/60 text-ocean" />
      </div>

      {total > 0 && (
        <div className="rounded-2xl border border-champagne/60 bg-ivory p-5 shadow-card">
          <div className="mb-2 flex justify-between text-xs font-semibold text-ink/60">
            <span>Attending {yes.length}</span>
            <span>Can’t make it {no}</span>
          </div>
          <div className="flex h-3 overflow-hidden rounded-full bg-rose-100" role="img" aria-label={`${pct}% attending`}>
            <div className="bg-gradient-to-r from-baby to-ocean transition-all duration-500" style={{ width: `${pct}%` }} />
          </div>
        </div>
      )}
    </section>
  );
}
