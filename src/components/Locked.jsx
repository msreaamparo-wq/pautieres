import { KeyRound } from 'lucide-react';
import { CONFIG } from '../config.js';

export default function Locked() {
  return (
    <main className="grid min-h-screen place-items-center bg-gradient-to-b from-sky/60 via-mist to-cream px-5">
      <div className="pop-in w-full max-w-md rounded-[2rem] border border-champagne/70 bg-ivory p-8 text-center shadow-soft">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-sun/50 text-gold"><KeyRound size={26} /></span>
        <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.26em] text-gold">RSVP Dashboard</p>
        <h1 className="mt-2 font-serif text-2xl font-bold">{CONFIG.eventName}</h1>
        <p className="mt-4 text-sm leading-relaxed text-ink/65">
          These RSVPs cannot be opened right now. The access key was changed in Supabase, so please update `accessKey` in src/config.js and deploy again.
        </p>
      </div>
    </main>
  );
}
