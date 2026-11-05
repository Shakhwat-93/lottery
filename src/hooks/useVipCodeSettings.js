import { useEffect, useState } from 'react';
import { loadVipCodeSettings, readVipCodeSettings } from '../lib/vipCodeSettings';

export function useVipCodeSettings() {
  const [settings, setSettings] = useState(readVipCodeSettings);

  useEffect(() => {
    let active = true;
    const loadSettings = () => {
      loadVipCodeSettings()
        .then((nextSettings) => {
          if (active) setSettings(nextSettings);
        })
        .catch((error) => console.error('[VIP settings] Could not load settings:', error.message));
    };
    const handleUpdate = (event) => {
      if (event.detail) setSettings(event.detail);
      else loadSettings();
    };

    loadSettings();
    window.addEventListener('vip-code-settings-updated', handleUpdate);
    window.addEventListener('storage', loadSettings);
    return () => {
      active = false;
      window.removeEventListener('vip-code-settings-updated', handleUpdate);
      window.removeEventListener('storage', loadSettings);
    };
  }, []);

  return settings;
}
