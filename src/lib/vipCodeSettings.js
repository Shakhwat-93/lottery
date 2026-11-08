import { getSupabaseClient, isSupabaseConfigured } from './supabase';

const STORAGE_KEY = 'lottery-vip-code-settings-v1';
export const SETTINGS_COLUMNS = 'id, first_date, second_date, vip_code, header_title, header_subtitle, top_notice, phone_number, whatsapp_number, imo_number, agent_name, license_number, urgent_forms_left, urgent_notice, extra_data, updated_at';

export const DEFAULT_VIP_CODE_SETTINGS = Object.freeze({
  firstDate: '2026-11-01',
  secondDate: '2026-11-16',
  code: '17248',
  headerTitle: 'Thailand Lottery',
  headerSubtitle: 'สำนักงานสลากกินแบ่งรัฐบาล • সরকারি অনুমোদিত',
  topNotice: '🎉 থাইল্যান্ড লটারি অফিসিয়াল রেজাল্ট ও নিশ্চিত ৩-সেট পেপার আপডেট সম্পন্ন! এখনই মেম্বারশিপ নিশ্চিত করুন।',
  phoneNumber: '+8801309802224',
  whatsappNumber: '+8801309802224',
  imoNumber: '+8801309802224',
  agentName: 'মোঃ ফাহিম চৌধুরী',
  licenseNumber: 'TGL-2025-001784',
  urgentFormsLeft: '5টি',
  urgentNotice: 'আর মাত্র 5টি ফর্ম বাকি আছে শুধু!',

  // 3-Up Game & Paper Controls
  threeUpTitle: 'থাইল্যান্ড লটারি 3 সেট গেম পেপার 2026',
  threeUpSubtitle: 'অফিসিয়াল 3 সেট / 3 আপ গেম পেপার ও লাইসেন্সকৃত অনুমোদনপত্র দেখতে নিচে ক্লিক করুন:',
  threeUpButtonText: '3 UP GAME',
  gamePaperImage: '/assets/site/3-up-game-paper-1.jpg',
  gamePaperBadge: 'OFFICIAL VIP GAME PAPER',
  calculationPaperImage: '/assets/site/3-up-game-paper-2.jpg',
  calculationPaperBadge: 'OFFICIAL VIP CALCULATION PAPER',

  // Payment & Messaging
  bkashNumber: '+8801705330881',
  nagadNumber: '+8801705330881',
  rocketNumber: '+8801705330881',
  whatsappMessage: 'Hello, I want VIP 3 Up Game & Calculation Paper',

  // Results & Live Stream
  latestResult3d: '781',
  liveStreamUrl: ''
});

export function normalizeDateString(val) {
  if (!val || typeof val !== 'string') return '';
  const s = val.trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
  const dmy = s.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{4})$/);
  if (dmy) {
    const [, d, m, y] = dmy;
    return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
  }
  return s;
}

export function isValidDate(value) {
  const normalized = normalizeDateString(value);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(normalized)) return false;
  const [y, m, d] = normalized.split('-').map(Number);
  if (m < 1 || m > 12 || d < 1 || d > 31) return false;
  const date = new Date(Date.UTC(y, m - 1, d));
  return (
    date.getUTCFullYear() === y &&
    date.getUTCMonth() === m - 1 &&
    date.getUTCDate() === d
  );
}

export function isValidSettings(value) {
  if (!value) return false;
  const firstDate = normalizeDateString(value.firstDate);
  const secondDate = normalizeDateString(value.secondDate);
  const code = String(value.code || '').trim();
  return (
    Boolean(firstDate) &&
    Boolean(secondDate) &&
    isValidDate(firstDate) &&
    isValidDate(secondDate) &&
    /^\d{5}$/.test(code)
  );
}

export function readVipCodeSettings() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || 'null');
    return saved
      ? { ...DEFAULT_VIP_CODE_SETTINGS, ...saved }
      : DEFAULT_VIP_CODE_SETTINGS;
  } catch {
    return DEFAULT_VIP_CODE_SETTINGS;
  }
}

export function mapDatabaseSettings(row) {
  if (!row) return DEFAULT_VIP_CODE_SETTINGS;
  const extra = row.extra_data || {};
  return {
    firstDate: row.first_date || DEFAULT_VIP_CODE_SETTINGS.firstDate,
    secondDate: row.second_date || DEFAULT_VIP_CODE_SETTINGS.secondDate,
    code: row.vip_code || DEFAULT_VIP_CODE_SETTINGS.code,
    headerTitle: row.header_title || DEFAULT_VIP_CODE_SETTINGS.headerTitle,
    headerSubtitle: row.header_subtitle || DEFAULT_VIP_CODE_SETTINGS.headerSubtitle,
    topNotice: row.top_notice !== undefined ? row.top_notice : DEFAULT_VIP_CODE_SETTINGS.topNotice,
    phoneNumber: row.phone_number || DEFAULT_VIP_CODE_SETTINGS.phoneNumber,
    whatsappNumber: row.whatsapp_number || DEFAULT_VIP_CODE_SETTINGS.whatsappNumber,
    imoNumber: row.imo_number || DEFAULT_VIP_CODE_SETTINGS.imoNumber,
    agentName: row.agent_name || DEFAULT_VIP_CODE_SETTINGS.agentName,
    licenseNumber: row.license_number || DEFAULT_VIP_CODE_SETTINGS.licenseNumber,
    urgentFormsLeft: row.urgent_forms_left || DEFAULT_VIP_CODE_SETTINGS.urgentFormsLeft,
    urgentNotice: row.urgent_notice || DEFAULT_VIP_CODE_SETTINGS.urgentNotice,

    // Dynamic Extra Data
    threeUpTitle: extra.threeUpTitle || DEFAULT_VIP_CODE_SETTINGS.threeUpTitle,
    threeUpSubtitle: extra.threeUpSubtitle || DEFAULT_VIP_CODE_SETTINGS.threeUpSubtitle,
    threeUpButtonText: extra.threeUpButtonText || DEFAULT_VIP_CODE_SETTINGS.threeUpButtonText,
    gamePaperImage: extra.gamePaperImage || DEFAULT_VIP_CODE_SETTINGS.gamePaperImage,
    gamePaperBadge: extra.gamePaperBadge || DEFAULT_VIP_CODE_SETTINGS.gamePaperBadge,
    calculationPaperImage: extra.calculationPaperImage || DEFAULT_VIP_CODE_SETTINGS.calculationPaperImage,
    calculationPaperBadge: extra.calculationPaperBadge || DEFAULT_VIP_CODE_SETTINGS.calculationPaperBadge,
    bkashNumber: extra.bkashNumber || DEFAULT_VIP_CODE_SETTINGS.bkashNumber,
    nagadNumber: extra.nagadNumber || DEFAULT_VIP_CODE_SETTINGS.nagadNumber,
    rocketNumber: extra.rocketNumber || DEFAULT_VIP_CODE_SETTINGS.rocketNumber,
    whatsappMessage: extra.whatsappMessage || DEFAULT_VIP_CODE_SETTINGS.whatsappMessage,
    latestResult3d: extra.latestResult3d || DEFAULT_VIP_CODE_SETTINGS.latestResult3d,
    liveStreamUrl: extra.liveStreamUrl || DEFAULT_VIP_CODE_SETTINGS.liveStreamUrl
  };
}

export async function loadVipCodeSettings() {
  if (!isSupabaseConfigured) return readVipCodeSettings();

  try {
    const client = await getSupabaseClient();
    if (!client) return readVipCodeSettings();

    const { data, error } = await client
      .from('vip_code_settings')
      .select(SETTINGS_COLUMNS)
      .eq('id', 'main')
      .single();

    if (error) {
      console.warn('[VIP settings] Supabase load warning:', error.message);
      return readVipCodeSettings();
    }
    const settings = mapDatabaseSettings(data);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {}
    return settings;
  } catch (err) {
    console.warn('[VIP settings] Network or client error:', err.message);
    return readVipCodeSettings();
  }
}

export async function saveVipCodeSettings(settings, { localOnly = false, client = null } = {}) {
  const normalized = {
    ...settings,
    firstDate: normalizeDateString(settings?.firstDate),
    secondDate: normalizeDateString(settings?.secondDate),
    code: String(settings?.code || '').trim()
  };

  if (!isValidSettings(normalized)) {
    throw new Error('তারিখ এবং ৫ ডিজিটের কোডটি সঠিক কিনা যাচাই করুন।');
  }

  const extraData = {
    threeUpTitle: normalized.threeUpTitle ?? DEFAULT_VIP_CODE_SETTINGS.threeUpTitle,
    threeUpSubtitle: normalized.threeUpSubtitle ?? DEFAULT_VIP_CODE_SETTINGS.threeUpSubtitle,
    threeUpButtonText: normalized.threeUpButtonText ?? DEFAULT_VIP_CODE_SETTINGS.threeUpButtonText,
    gamePaperImage: normalized.gamePaperImage ?? DEFAULT_VIP_CODE_SETTINGS.gamePaperImage,
    gamePaperBadge: normalized.gamePaperBadge ?? DEFAULT_VIP_CODE_SETTINGS.gamePaperBadge,
    calculationPaperImage: normalized.calculationPaperImage ?? DEFAULT_VIP_CODE_SETTINGS.calculationPaperImage,
    calculationPaperBadge: normalized.calculationPaperBadge ?? DEFAULT_VIP_CODE_SETTINGS.calculationPaperBadge,
    bkashNumber: normalized.bkashNumber ?? DEFAULT_VIP_CODE_SETTINGS.bkashNumber,
    nagadNumber: normalized.nagadNumber ?? DEFAULT_VIP_CODE_SETTINGS.nagadNumber,
    rocketNumber: normalized.rocketNumber ?? DEFAULT_VIP_CODE_SETTINGS.rocketNumber,
    whatsappMessage: normalized.whatsappMessage ?? DEFAULT_VIP_CODE_SETTINGS.whatsappMessage,
    latestResult3d: normalized.latestResult3d ?? DEFAULT_VIP_CODE_SETTINGS.latestResult3d,
    liveStreamUrl: normalized.liveStreamUrl ?? DEFAULT_VIP_CODE_SETTINGS.liveStreamUrl
  };

  // 1. If Supabase configured and not localOnly, try direct Supabase update
  if (isSupabaseConfigured && !localOnly) {
    const sbClient = client || (await getSupabaseClient());

    if (sbClient) {
      try {
        const { data, error } = await sbClient
          .from('vip_code_settings')
          .update({
            first_date: normalized.firstDate,
            second_date: normalized.secondDate,
            vip_code: normalized.code,
            header_title: normalized.headerTitle ?? DEFAULT_VIP_CODE_SETTINGS.headerTitle,
            header_subtitle: normalized.headerSubtitle ?? DEFAULT_VIP_CODE_SETTINGS.headerSubtitle,
            top_notice: normalized.topNotice ?? DEFAULT_VIP_CODE_SETTINGS.topNotice,
            phone_number: normalized.phoneNumber ?? DEFAULT_VIP_CODE_SETTINGS.phoneNumber,
            whatsapp_number: normalized.whatsappNumber ?? DEFAULT_VIP_CODE_SETTINGS.whatsappNumber,
            imo_number: normalized.imoNumber ?? DEFAULT_VIP_CODE_SETTINGS.imoNumber,
            agent_name: normalized.agentName ?? DEFAULT_VIP_CODE_SETTINGS.agentName,
            license_number: normalized.licenseNumber ?? DEFAULT_VIP_CODE_SETTINGS.licenseNumber,
            urgent_forms_left: normalized.urgentFormsLeft ?? DEFAULT_VIP_CODE_SETTINGS.urgentFormsLeft,
            urgent_notice: normalized.urgentNotice ?? DEFAULT_VIP_CODE_SETTINGS.urgentNotice,
            extra_data: extraData,
            updated_at: new Date().toISOString()
          })
          .eq('id', 'main')
          .select(SETTINGS_COLUMNS)
          .single();

        if (!error && data) {
          const savedSettings = mapDatabaseSettings(data);
          try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(savedSettings));
          } catch {}
          window.dispatchEvent(new CustomEvent('vip-code-settings-updated', { detail: savedSettings }));
          return savedSettings;
        }
      } catch (directErr) {
        console.warn('[VIP settings] Direct Supabase update attempt:', directErr);
      }
    }

    // 2. Fallback to /api/admin/settings for Vercel deployment
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...normalized, extraData })
      });
      if (response.ok) {
        const result = await response.json();
        const savedSettings = { ...normalized, ...result };
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(savedSettings));
        } catch {}
        window.dispatchEvent(new CustomEvent('vip-code-settings-updated', { detail: savedSettings }));
        return savedSettings;
      }
    } catch (_) {}
  }

  // 3. Fallback to localStorage (demo or local draft)
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
  } catch {}
  window.dispatchEvent(new CustomEvent('vip-code-settings-updated', { detail: normalized }));
  return normalized;
}

export function formatVipDate(date) {
  if (!date) return '';
  const [year, month, day] = date.split('-');
  return `${day}-${month}-${year}`;
}
