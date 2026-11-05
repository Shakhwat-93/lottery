import { getSupabaseClient, isSupabaseConfigured } from './supabase';

const STORAGE_KEY = 'lottery-vip-code-settings-v1';
const SETTINGS_COLUMNS = 'id, first_date, second_date, vip_code, updated_at';

export const DEFAULT_VIP_CODE_SETTINGS = Object.freeze({
  firstDate: '2026-11-01',
  secondDate: '2026-11-16',
  code: '17248'
});

function isValidDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}

function isValidSettings(value) {
  return value &&
    isValidDate(value.firstDate) &&
    isValidDate(value.secondDate) &&
    /^\d{5}$/.test(value.code);
}

export function readVipCodeSettings() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || 'null');
    return isValidSettings(saved)
      ? { ...DEFAULT_VIP_CODE_SETTINGS, ...saved }
      : DEFAULT_VIP_CODE_SETTINGS;
  } catch {
    return DEFAULT_VIP_CODE_SETTINGS;
  }
}

function mapDatabaseSettings(row) {
  return {
    firstDate: row.first_date,
    secondDate: row.second_date,
    code: row.vip_code
  };
}

export async function loadVipCodeSettings() {
  if (!isSupabaseConfigured) return readVipCodeSettings();

  const client = await getSupabaseClient();
  const { data, error } = await client
    .from('vip_code_settings')
    .select(SETTINGS_COLUMNS)
    .eq('id', 'main')
    .single();

  if (error) throw new Error(`Supabase থেকে সেটিংস লোড হয়নি: ${error.message}`);
  return mapDatabaseSettings(data);
}

export async function saveVipCodeSettings(settings) {
  if (!isValidSettings(settings)) {
    throw new Error('তারিখ এবং ৫ ডিজিটের কোডটি যাচাই করুন।');
  }

  if (isSupabaseConfigured) {
    const client = await getSupabaseClient();
    const { data, error } = await client
      .from('vip_code_settings')
      .update({
        first_date: settings.firstDate,
        second_date: settings.secondDate,
        vip_code: settings.code,
        updated_at: new Date().toISOString()
      })
      .eq('id', 'main')
      .select(SETTINGS_COLUMNS)
      .single();

    if (error) throw new Error(`Supabase-এ সেভ হয়নি: ${error.message}`);
    const savedSettings = mapDatabaseSettings(data);
    window.dispatchEvent(new CustomEvent('vip-code-settings-updated', { detail: savedSettings }));
    return savedSettings;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  window.dispatchEvent(new CustomEvent('vip-code-settings-updated', { detail: settings }));
  return settings;
}

export function formatVipDate(date) {
  const [year, month, day] = date.split('-');
  return `${day}-${month}-${year}`;
}
