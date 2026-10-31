import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const PWAInstallContext = createContext({
  isStandalone: false,
  isIOS: false,
  isAndroid: false,
  isInAppBrowser: false,
  hasPrompt: false,
  isInstalling: false,
  swActive: false,
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
  const [isInstalling, setIsInstalling] = useState(false);
  const [swActive, setSwActive] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);

  useEffect(() => {
    // 1. Standalone / installed detection
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

    // 2. Platform & In-app Webview detection
    const userAgent = (window.navigator.userAgent || '').toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent) && !window.MSStream;
    const isAndroidDevice = /android/.test(userAgent);
    const inApp = /fban|fbav|instagram|whatsapp|line|snapchat|micromessenger|tiktok|threads/i.test(userAgent);

    setIsIOS(isIosDevice);
    setIsAndroid(isAndroidDevice);
    setIsInAppBrowser(inApp);

    // 3. Service worker status check
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(() => {
        setSwActive(true);
        console.log('[PWA] Service Worker active and ready');
      }).catch(() => {
        setSwActive(false);
      });
    }

    // 4. Hook early captured prompt
    if (window.deferredPWAInstallPrompt) {
      setDeferredPrompt(window.deferredPWAInstallPrompt);
      console.log('[PWA] Found early captured prompt on mount');
    }

    // 5. Event listeners for install prompt
    const handleEarlyReady = (e) => {
      const promptObj = (e && e.detail) || window.deferredPWAInstallPrompt;
      if (promptObj) {
        setDeferredPrompt(promptObj);
        console.log('[PWA] Hooked pwa-prompt-ready custom event');
      }
    };

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      window.deferredPWAInstallPrompt = e;
      setDeferredPrompt(e);
      console.log('[PWA] Captured beforeinstallprompt event');
    };

    const handleAppInstalled = () => {
      console.log('[PWA] Application successfully installed');
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

  // Open in real Google Chrome for Android in-app browsers
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
      alert('অফিসিয়াল অ্যাপটি ইতোমধ্যে ইনস্টল করা আছে এবং অ্যাপ মোডে চলছে!');
      return;
    }

    setIsInstalling(true);

    // Step 1: Request Notification permission
    if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'default') {
      try {
        await Notification.requestPermission();
      } catch (err) {
        console.warn('[PWA] Notification permission prompt:', err);
      }
    }

    // Step 2: Check if prompt is already captured
    let promptEvent = deferredPrompt || (typeof window !== 'undefined' && window.deferredPWAInstallPrompt);

    // If not captured yet, give browser up to 1.5 seconds to dispatch it
    if (!promptEvent && !isIOS && !isInAppBrowser) {
      console.log('[PWA] Prompt not ready yet, waiting 1.5s for browser check...');
      promptEvent = await new Promise((resolve) => {
        let timer = null;
        const checkHandler = (e) => {
          clearTimeout(timer);
          window.removeEventListener('beforeinstallprompt', checkHandler);
          window.removeEventListener('pwa-prompt-ready', checkHandler);
          resolve((e && e.detail) || window.deferredPWAInstallPrompt);
        };
        window.addEventListener('beforeinstallprompt', checkHandler);
        window.addEventListener('pwa-prompt-ready', checkHandler);

        timer = setTimeout(() => {
          window.removeEventListener('beforeinstallprompt', checkHandler);
          window.removeEventListener('pwa-prompt-ready', checkHandler);
          resolve(window.deferredPWAInstallPrompt || null);
        }, 1500);
      });
    }

    setIsInstalling(false);

    // Step 3: Trigger native prompt if available
    if (promptEvent) {
      try {
        console.log('[PWA] Directly launching native install prompt dialog...');
        await promptEvent.prompt();
        const { outcome } = await promptEvent.userChoice;
        console.log('[PWA] User choice outcome:', outcome);
        if (outcome === 'accepted') {
          setDeferredPrompt(null);
          window.deferredPWAInstallPrompt = null;
          setInstallSuccess(true);
          setBannerDismissed(true);
          setShowInstallModal(false);
          return;
        }
      } catch (err) {
        console.warn('[PWA] Native prompt trigger error:', err);
      }
    }

    // Step 4: If native prompt wasn't triggered, show the Action Sheet with exact device diagnostic
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
        isInstalling,
        swActive,
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
