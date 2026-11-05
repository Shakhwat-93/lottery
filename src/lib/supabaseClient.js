import { createClient } from '@supabase/supabase-js';

let client;

export function createSupabaseClient(url, publishableKey) {
  if (!client) client = createClient(url, publishableKey);
  return client;
}
