import { createHmac, timingSafeEqual } from 'node:crypto';

const COOKIE_NAME = 'vip_admin_session';
const SESSION_TTL_SECONDS = 2 * 60 * 60;

function sign(value, secret) {
  return createHmac('sha256', secret).update(value).digest('base64url');
}

function safeEqual(left, right) {
  const leftBuffer = Buffer.from(String(left));
  const rightBuffer = Buffer.from(String(right));
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

export function getCookie(req, name = COOKIE_NAME) {
  const header = req.headers.cookie || '';
  const entry = header.split(';').map((part) => part.trim()).find((part) => part.startsWith(`${name}=`));
  return entry ? decodeURIComponent(entry.slice(name.length + 1)) : null;
}

export function createAdminSession(email) {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) throw new Error('ADMIN_SESSION_SECRET must contain at least 32 characters.');
  const payload = Buffer.from(JSON.stringify({ email, exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS })).toString('base64url');
  const token = `${payload}.${sign(payload, secret)}`;
  return `${COOKIE_NAME}=${encodeURIComponent(token)}; HttpOnly; Secure; SameSite=Strict; Path=/api/admin; Max-Age=${SESSION_TTL_SECONDS}`;
}

export function clearAdminSession() {
  return `${COOKIE_NAME}=; HttpOnly; Secure; SameSite=Strict; Path=/api/admin; Max-Age=0`;
}

export function verifyAdminSession(req) {
  const token = getCookie(req);
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!token || !secret || secret.length < 32) return null;
  const [payload, providedSignature] = token.split('.');
  if (!payload || !providedSignature || !safeEqual(sign(payload, secret), providedSignature)) return null;

  try {
    const session = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (!session.email || !Number.isInteger(session.exp) || session.exp <= Math.floor(Date.now() / 1000)) return null;
    return session;
  } catch {
    return null;
  }
}

export function credentialsMatch(email, password) {
  const configuredEmail = process.env.ADMIN_EMAIL;
  const configuredPassword = process.env.ADMIN_PASSWORD;
  if (!configuredEmail || !configuredPassword) return false;
  return safeEqual(String(email || '').trim().toLowerCase(), configuredEmail.trim().toLowerCase()) &&
    safeEqual(String(password || ''), configuredPassword);
}
