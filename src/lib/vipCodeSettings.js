const STORAGE_KEY = 'lottery-vip-code-settings-v1';

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

export function saveVipCodeSettings(settings) {
  if (!isValidSettings(settings)) {
    throw new Error('তারিখ এবং ৫ ডিজিটের কোডটি যাচাই করুন।');
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  window.dispatchEvent(new Event('vip-code-settings-updated'));
}

export function formatVipDate(date) {
  const [year, month, day] = date.split('-');
  return `${day}-${month}-${year}`;
}
