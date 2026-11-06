import { createAdminSession, credentialsMatch } from '../../server/adminAuth.js';

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, private');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });

  const { email, password } = req.body || {};
  if (!credentialsMatch(email, password)) {
    return res.status(401).json({ error: 'Email অথবা password সঠিক নয়।' });
  }

  try {
    res.setHeader('Set-Cookie', createAdminSession(String(email).trim().toLowerCase()));
    return res.status(200).json({ user: { email: String(email).trim().toLowerCase() } });
  } catch (error) {
    return res.status(503).json({ error: error.message });
  }
}
