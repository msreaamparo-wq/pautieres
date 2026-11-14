// Wraps the searched text in a yellow highlight.
export default function Highlight({ text, query }) {
  const q = (query || '').trim();
  if (!q || !text) return <>{text}</>;
  const safe = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = String(text).split(new RegExp(`(${safe})`, 'gi'));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === q.toLowerCase() ? (
          <mark key={i} className="rounded bg-sun px-0.5 text-ink">{part}</mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}
