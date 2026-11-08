import { createClient } from '@supabase/supabase-js';
import { verifyAdminSession } from '../../server/adminAuth.js';

const columns = 'id, first_date, second_date, vip_code, header_title, header_subtitle, top_notice, phone_number, whatsapp_number, imo_number, agent_name, license_number, urgent_forms_left, urgent_notice, extra_data, updated_at';
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

function normalizeDateString(val) {
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

function isValidDate(value) {
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

function isValidSettings(value) {
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

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, private');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' });
  const session = verifyAdminSession(req);
  if (!session) return res.status(401).json({ error: 'Admin sign-in প্রয়োজন।' });

  const raw = req.body || {};
  const settings = {
    ...raw,
    firstDate: normalizeDateString(raw.firstDate),
    secondDate: normalizeDateString(raw.secondDate),
    code: String(raw.code || '').trim()
  };

  if (!isValidSettings(settings) || settings.firstDate === settings.secondDate) {
    return res.status(400).json({ error: 'দুটি আলাদা তারিখ এবং ৫ সংখ্যার code দিন।' });
  }

  const extraData = raw.extraData || {
    showTopNotice: raw.showTopNotice !== undefined ? Boolean(raw.showTopNotice) : true,
    activeYear: raw.activeYear || '2026',
    threeUpTitle: raw.threeUpTitle || 'থাইল্যান্ড লটারি 3 Up গেম পেপার 2026',
    threeUpSubtitle: raw.threeUpSubtitle || 'অফিসিয়াল 3 আপ গেম পেপার ও লাইসেন্সকৃত অনুমোদনপত্র দেখতে নিচে ক্লিক করুন:',
    threeUpButtonText: raw.threeUpButtonText || '3 UP GAME',
    gamePaperImage: raw.gamePaperImage || '/assets/site/3-up-game-paper-1.jpg',
    gamePaperImageDate2: raw.gamePaperImageDate2 || '',
    gamePaperBadge: raw.gamePaperBadge || 'OFFICIAL VIP GAME PAPER',
    calculationPaperImage: raw.calculationPaperImage || '/assets/site/3-up-game-paper-2.jpg',
    calculationPaperImageDate2: raw.calculationPaperImageDate2 || '',
    calculationPaperBadge: raw.calculationPaperBadge || 'OFFICIAL VIP CALCULATION PAPER',
    bkashNumber: raw.bkashNumber || '+8801705330881',
    nagadNumber: raw.nagadNumber || '+8801705330881',
    rocketNumber: raw.rocketNumber || '+8801705330881',
    whatsappMessage: raw.whatsappMessage || 'Hello, I want VIP 3 Up Game & Calculation Paper',
    latestResult3d: raw.latestResult3d || '781',
    liveStreamUrl: raw.liveStreamUrl || '',
    timerShow: raw.timerShow !== undefined ? Boolean(raw.timerShow) : true,
    timerMode: raw.timerMode || 'duration',
    timerHours: raw.timerHours !== undefined ? String(raw.timerHours) : '12',
    timerMinutes: raw.timerMinutes !== undefined ? String(raw.timerMinutes) : '00',
    timerTargetDate: raw.timerTargetDate || '',
    timerUpdatedAt: raw.timerUpdatedAt || ''
  };

  try {
    const { data, error } = await getAdminClient()
      .from('vip_code_settings')
      .update({
        first_date: settings.firstDate,
        second_date: settings.secondDate,
        vip_code: settings.code,
        header_title: settings.headerTitle || 'Thailand Lottery',
        header_subtitle: settings.headerSubtitle || 'สำนักงานสลากกินแบ่งรัฐบาล • সরকারি অনুমোদিত',
        top_notice: settings.topNotice !== undefined ? settings.topNotice : '',
        phone_number: settings.phoneNumber || '+8801309802224',
        whatsapp_number: settings.whatsappNumber || '+8801309802224',
        imo_number: settings.imoNumber || '+8801309802224',
        agent_name: settings.agentName || 'মোঃ ফাহিম চৌধুরী',
        license_number: settings.licenseNumber || 'TGL-2025-001784',
        urgent_forms_left: settings.urgentFormsLeft || '5টি',
        urgent_notice: settings.urgentNotice || 'আর মাত্র 5টি ফর্ম বাকি আছে শুধু!',
        extra_data: extraData,
        updated_at: new Date().toISOString()
      })
      .eq('id', 'main')
      .select(columns)
      .single();

    if (error) return res.status(502).json({ error: error.message });
    const extra = data.extra_data || {};
    return res.status(200).json({
      firstDate: data.first_date,
      secondDate: data.second_date,
      code: data.vip_code,
      headerTitle: data.header_title,
      headerSubtitle: data.header_subtitle,
      topNotice: data.top_notice,
      phoneNumber: data.phone_number,
      whatsappNumber: data.whatsapp_number,
      imoNumber: data.imo_number,
      agentName: data.agent_name,
      licenseNumber: data.license_number,
      urgentFormsLeft: data.urgent_forms_left,
      urgentNotice: data.urgent_notice,
      showTopNotice: extra.showTopNotice !== undefined ? Boolean(extra.showTopNotice) : true,
      activeYear: extra.activeYear || '2026',
      threeUpTitle: extra.threeUpTitle,
      threeUpSubtitle: extra.threeUpSubtitle,
      threeUpButtonText: extra.threeUpButtonText,
      gamePaperImage: extra.gamePaperImage,
      gamePaperImageDate2: extra.gamePaperImageDate2,
      gamePaperBadge: extra.gamePaperBadge,
      calculationPaperImage: extra.calculationPaperImage,
      calculationPaperImageDate2: extra.calculationPaperImageDate2,
      calculationPaperBadge: extra.calculationPaperBadge,
      bkashNumber: extra.bkashNumber,
      nagadNumber: extra.nagadNumber,
      rocketNumber: extra.rocketNumber,
      whatsappMessage: extra.whatsappMessage,
      latestResult3d: extra.latestResult3d,
      liveStreamUrl: extra.liveStreamUrl
    });
  } catch (error) {
    return res.status(503).json({ error: error.message });
  }
}
