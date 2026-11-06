import { clearAdminSession, verifyAdminSession } from '../../server/adminAuth.js';

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, private');
  if (req.method === 'DELETE') {
    res.setHeader('Set-Cookie', clearAdminSession());
    return res.status(200).json({ authenticated: false });
  }

  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed.' });
  const session = verifyAdminSession(req);
  if (!session) return res.status(401).json({ authenticated: false });
  return res.status(200).json({ authenticated: true, user: { email: session.email } });
}
