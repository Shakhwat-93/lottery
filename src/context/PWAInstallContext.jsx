import React, { createContext, useContext, useState, useEffect } from 'react';

const PWAInstallContext = createContext({
  isStandalone: false,
  isIOS: false,
  showIOSModal: false,
  setShowIOSModal: () => {},
  bannerDismissed: false,
  setBannerDismissed: () => {},
  installSuccess: false,
  triggerInstall: () => {},
  canInstall: true
});

export function PWAInstallProvider({ children }) {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);

  useEffect(() => {
    // Check if running in standalone mode (already installed & running as app)
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

    // Check for iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent) && !window.MSStream;
    setIsIOS(isIosDevice);

    // Listen for beforeinstallprompt event (Android, Chrome, Edge, Brave, Opera)
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      console.log('[PWA] Native install prompt intercepted and ready');
    };

    // Listen for app installed event
    const handleAppInstalled = () => {
      console.log('[PWA] Application successfully installed');
      setDeferredPrompt(null);
      setIsStandalone(true);
      setInstallSuccess(true);
      setBannerDismissed(true);
      setTimeout(() => setInstallSuccess(false), 5000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const triggerInstall = async () => {
    if (isStandalone) {
      alert('অফিসিয়াল অ্যাপটি ইতোমধ্যে ইনস্টল করা আছে এবং অ্যাপ মোডে চলছে।');
      return;
    }

    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        console.log('[PWA] User response to install prompt:', outcome);
        if (outcome === 'accepted') {
          setDeferredPrompt(null);
          setBannerDismissed(true);
        }
      } catch (err) {
        console.warn('[PWA] Error launching install prompt:', err);
        setShowIOSModal(true);
      }
    } else {
      // iOS or browser without direct deferredPrompt
      setShowIOSModal(true);
    }
  };

  return (
    <PWAInstallContext.Provider
      value={{
        isStandalone,
        isIOS,
        showIOSModal,
        setShowIOSModal,
        bannerDismissed,
        setBannerDismissed,
        installSuccess,
        triggerInstall,
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
