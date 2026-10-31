import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const PWAInstallContext = createContext({
  isStandalone: false,
  isIOS: false,
  isAndroid: false,
  isInAppBrowser: false,
  hasPrompt: false,
  showInstallModal: false,
  setShowInstallModal: () => {},
  bannerDismissed: false,
  setBannerDismissed: () => {},
  installSuccess: false,
  triggerInstall: () => {},
  openInChrome: () => {},
  canInstall: true
});

export function PWAInstallProvider({ children }) {
  const [deferredPrompt, setDeferredPrompt] = useState(() => {
    return (typeof window !== 'undefined' && window.deferredPWAInstallPrompt) || null;
  });
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isInAppBrowser, setIsInAppBrowser] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);

  useEffect(() => {
    // 1. Check if already installed and running in standalone app mode
    const checkStandalone = () => {
      const isStandaloneMode =
        window.matchMedia('(display-mode: standalone)').matches ||
        window.matchMedia('(display-mode: fullscreen)').matches ||
        window.navigator.standalone === true ||
        document.referrer.includes('android-app://') ||
        window.location.search.includes('source=pwa');
      setIsStandalone(Boolean(isStandaloneMode));
    };

    checkStandalone();

    // 2. Platform & In-app Browser detection
    const userAgent = (window.navigator.userAgent || '').toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent) && !window.MSStream;
    const isAndroidDevice = /android/.test(userAgent);
    const inApp = /fban|fbav|instagram|whatsapp|line|snapchat|micromessenger|tiktok|threads/i.test(userAgent);

    setIsIOS(isIosDevice);
    setIsAndroid(isAndroidDevice);
    setIsInAppBrowser(inApp);

    // 3. Check if early captured prompt exists
    if (window.deferredPWAInstallPrompt) {
      setDeferredPrompt(window.deferredPWAInstallPrompt);
      console.log('[PWA] Hooked early captured prompt');
    }

    // 4. Listen for prompt events
    const handleEarlyReady = (e) => {
      const promptObj = e.detail || window.deferredPWAInstallPrompt;
      if (promptObj) {
        setDeferredPrompt(promptObj);
        console.log('[PWA] Hooked pwa-prompt-ready event');
      }
    };

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      window.deferredPWAInstallPrompt = e;
      setDeferredPrompt(e);
      console.log('[PWA] Native beforeinstallprompt captured directly in React');
    };

    const handleAppInstalled = () => {
      console.log('[PWA] App installed successfully');
      setDeferredPrompt(null);
      window.deferredPWAInstallPrompt = null;
      setIsStandalone(true);
      setInstallSuccess(true);
      setBannerDismissed(true);
      setShowInstallModal(false);
      setTimeout(() => setInstallSuccess(false), 5000);
    };

    window.addEventListener('pwa-prompt-ready', handleEarlyReady);
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('pwa-prompt-ready', handleEarlyReady);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // 1-Tap Open in Real Chrome for Android In-App Browsers (WhatsApp, Facebook, etc.)
  const openInChrome = useCallback(() => {
    const currentUrl = window.location.href;
    if (isAndroid) {
      const intentUrl = `intent://${window.location.host}${window.location.pathname}${window.location.search}#Intent;scheme=https;package=com.android.chrome;end;`;
      window.location.href = intentUrl;
    } else {
      window.open(currentUrl, '_system');
    }
  }, [isAndroid]);

  // Main Direct Install Trigger
  const triggerInstall = async () => {
    if (isStandalone) {
      alert('অফিসিয়াল অ্যাপটি ইতোমধ্যে ইনস্টল করা আছে!');
      return;
    }

    // Request Notification permission if requested
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'default') {
      try {
        await Notification.requestPermission();
      } catch (err) {
        console.warn('[PWA] Notification permission prompt:', err);
      }
    }

    // Check prompt availability
    const promptEvent = deferredPrompt || window.deferredPWAInstallPrompt;

    if (promptEvent) {
      try {
        console.log('[PWA] Triggering native prompt dialog...');
        await promptEvent.prompt();
        const { outcome } = await promptEvent.userChoice;
        console.log('[PWA] Install prompt outcome:', outcome);
        if (outcome === 'accepted') {
          setDeferredPrompt(null);
          window.deferredPWAInstallPrompt = null;
          setInstallSuccess(true);
          setBannerDismissed(true);
          setShowInstallModal(false);
        }
        return;
      } catch (err) {
        console.warn('[PWA] Error launching native install prompt:', err);
      }
    }

    // If native prompt not directly available: show smart platform action sheet
    setShowInstallModal(true);
  };

  return (
    <PWAInstallContext.Provider
      value={{
        isStandalone,
        isIOS,
        isAndroid,
        isInAppBrowser,
        hasPrompt: Boolean(deferredPrompt || (typeof window !== 'undefined' && window.deferredPWAInstallPrompt)),
        showInstallModal,
        setShowInstallModal,
        bannerDismissed,
        setBannerDismissed,
        installSuccess,
        triggerInstall,
        openInChrome,
        canInstall: !isStandalone
      }}
    >
      {children}
    </PWAInstallContext.Provider>
  );
}

export function usePWAInstall() {
  return useContext(PWAInstallContext);
}
