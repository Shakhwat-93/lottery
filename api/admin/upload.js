import { createClient } from '@supabase/supabase-js';
import { verifyAdminSession } from '../../server/adminAuth.js';

let supabase;
function getAdminClient() {
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be configured.');
  }
  if (!supabase) {
    supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false }
    });
  }
  return supabase;
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, private');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });

  const session = verifyAdminSession(req);
  if (!session && process.env.NODE_ENV === 'production' && !req.headers.authorization) {
    return res.status(401).json({ error: 'Admin sign-in প্রয়োজন।' });
  }

  const { fileData, fileName = 'paper.jpg' } = req.body || {};
  if (!fileData) {
    return res.status(400).json({ error: 'কোনো ইমেজ ফাইল পাঠানো হয়নি।' });
  }

  try {
    const adminClient = getAdminClient();

    // Ensure bucket exists
    try {
      await adminClient.storage.createBucket('lottery-papers', {
        public: true,
        fileSizeLimit: 10485760
      });
    } catch (_) {}

    // Match base64 Data URL or raw base64
    const matches = fileData.match(/^data:([A-Za-z0-9-+/]+);base64,(.+)$/);
    let buffer;
    let contentType = 'image/jpeg';

    if (matches && matches.length === 3) {
      contentType = matches[1];
      buffer = Buffer.from(matches[2], 'base64');
    } else {
      buffer = Buffer.from(fileData, 'base64');
    }

    const ext = contentType.includes('png') ? 'png' : contentType.includes('webp') ? 'webp' : 'jpg';
    const cleanFileName = `paper-${Date.now()}-${Math.random().toString(36).slice(2, 7)}.${ext}`;

    const { error: uploadError } = await adminClient.storage
      .from('lottery-papers')
      .upload(cleanFileName, buffer, {
        contentType,
        upsert: true
      });

    if (uploadError) {
      return res.status(502).json({ error: uploadError.message });
    }

    const { data: { publicUrl } } = adminClient.storage
      .from('lottery-papers')
      .getPublicUrl(cleanFileName);

    return res.status(200).json({ publicUrl, fileName: cleanFileName });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
