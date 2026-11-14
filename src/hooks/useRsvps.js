import { useCallback, useEffect, useRef, useState } from 'react';
import { supabase } from '../supabase.js';

const isBadKey = (err) => /invalid_key/i.test(err?.message || '') || err?.code === '28000';

export function useRsvps(accessKey, onNew) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [badKey, setBadKey] = useState(false);
  const [updatedAt, setUpdatedAt] = useState(null);
  const onNewRef = useRef(onNew);
  onNewRef.current = onNew;
  const seen = useRef(null); // ids we already know, to announce new RSVPs

  const load = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    const { data, error: err } = await supabase.rpc('rsvp_dashboard_list', { p_key: accessKey });
    if (err) {
      if (isBadKey(err)) setBadKey(true);
      else setError(err.message || 'Could not load RSVPs.');
    } else {
      const list = data || [];
      if (seen.current) {
        const fresh = list.filter((r) => !seen.current.has(r.id));
        if (fresh.length && onNewRef.current) onNewRef.current(fresh[0], fresh.length);
      }
      seen.current = new Set(list.map((r) => r.id));
      setRows(list);
      setError('');
      setUpdatedAt(new Date());
    }
    setLoading(false);
  }, [accessKey]);

  useEffect(() => {
    load();
    const timer = setInterval(() => load(true), 15000); // checks for new RSVPs every 15 seconds
    return () => clearInterval(timer);
  }, [load]);

  const remove = useCallback(async (id) => {
    const { data, error: err } = await supabase.rpc('rsvp_dashboard_delete', { p_key: accessKey, p_id: id });
    if (err) throw err;
    if (!data) throw new Error('Nothing was deleted.');
    seen.current?.delete(id);
    setRows((current) => current.filter((r) => r.id !== id));
  }, [accessKey]);

  return { rows, loading, error, badKey, updatedAt, refresh: () => load(false), remove };
}
