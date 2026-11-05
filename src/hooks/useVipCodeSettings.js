import { useEffect, useState } from 'react';
import { readVipCodeSettings } from '../lib/vipCodeSettings';

export function useVipCodeSettings() {
  const [settings, setSettings] = useState(readVipCodeSettings);

  useEffect(() => {
    const syncSettings = () => setSettings(readVipCodeSettings());
    window.addEventListener('vip-code-settings-updated', syncSettings);
    window.addEventListener('storage', syncSettings);
    return () => {
      window.removeEventListener('vip-code-settings-updated', syncSettings);
      window.removeEventListener('storage', syncSettings);
    };
  }, []);

  return settings;
}
