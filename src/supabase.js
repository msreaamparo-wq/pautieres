import { createClient } from '@supabase/supabase-js';
import { CONFIG } from './config.js';

// No login: the dashboard talks to Supabase through two private functions
// that only work with the secret access key from your private link.
export const supabase = createClient(CONFIG.supabase.url, CONFIG.supabase.anonKey, {
  auth: { persistSession: false, autoRefreshToken: false }
});
