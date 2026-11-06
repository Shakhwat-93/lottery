import { createClient } from '@supabase/supabase-js';
import { verifyAdminSession } from '../../server/adminAuth.js';

const columns = 'id, first_date, second_date, vip_code, updated_at';
let supabase;

function getAdminClient() {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be configured in Vercel.');
  }
  if (!supabase) {
    supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false }
    });
  }
  return supabase;
}

function isValidSettings(value) {
  const validDate = (date) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
    const parsed = new Date(`${date}T00:00:00.000Z`);
    return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === date;
  };
  return value && validDate(value.firstDate) && validDate(value.secondDate) && /^\d{5}$/.test(value.code);
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, private');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });
  const session = verifyAdminSession(req);
  if (!session) return res.status(401).json({ error: 'Admin sign-in প্রয়োজন।' });

  const settings = req.body || {};
  if (!isValidSettings(settings) || settings.firstDate === settings.secondDate) {
    return res.status(400).json({ error: 'দুটি আলাদা তারিখ এবং ৫ সংখ্যার code দিন।' });
  }

  try {
    const { data, error } = await getAdminClient()
      .from('vip_code_settings')
      .update({
        first_date: settings.firstDate,
        second_date: settings.secondDate,
        vip_code: settings.code,
        updated_at: new Date().toISOString()
      })
      .eq('id', 'main')
      .select(columns)
      .single();

    if (error) return res.status(502).json({ error: error.message });
    return res.status(200).json({
      firstDate: data.first_date,
      secondDate: data.second_date,
      code: data.vip_code
    });
  } catch (error) {
    return res.status(503).json({ error: error.message });
  }
}
