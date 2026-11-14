import { useEffect } from 'react';
import { PartyPopper } from 'lucide-react';

export default function Toast({ message, onDone }) {
  useEffect(() => {
    if (!message) return undefined;
    const t = setTimeout(onDone, 5000);
    return () => clearTimeout(t);
  }, [message, onDone]);

  if (!message) return null;
  return (
    <div
      role="status"
      className="pop-in fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white shadow-soft"
    >
      <PartyPopper size={18} className="text-sun" />
      {message}
    </div>
  );
}
