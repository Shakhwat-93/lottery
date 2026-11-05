const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabasePublishableKey);

let clientPromise;

export function getSupabaseClient() {
  if (!isSupabaseConfigured) return Promise.resolve(null);
  if (!clientPromise) {
    clientPromise = import('./supabaseClient').then(({ createSupabaseClient }) =>
      createSupabaseClient(supabaseUrl, supabasePublishableKey)
    );
  }
  return clientPromise;
}
