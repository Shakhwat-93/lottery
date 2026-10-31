import React from 'react';
import { usePWAInstall } from '../context/PWAInstallContext';

export default function InstallAppBanner() {
  const {
    isStandalone,
    isIOS,
    isAndroid,
    isInAppBrowser,
    isInstalling,
    swActive,
    hasPrompt,
    showInstallModal,
    setShowInstallModal,
    bannerDismissed,
    setBannerDismissed,
    installSuccess,
    triggerInstall,
    openInChrome,
    canInstall
  } = usePWAInstall();

  // If already running inside installed standalone app, hide install prompts
  if (isStandalone) {
    return null;
  }

  return (
    <>
      {/* 1. TOP FLOATING INSTANT APP INSTALL BANNER */}
      {!bannerDismissed && canInstall && (
        <aside className="pwa-install-top-banner" aria-label="Official Web App Install">
          <div className="pwa-banner-inner">
            {/* App Logo with Radar Ring */}
            <div className="pwa-banner-logo-wrap">
              <div className="pwa-logo-ring" aria-hidden="true" />
              <img
                src="/assets/logo.png"
                alt="Thailand Lottery Official App"
                className="pwa-banner-logo"
                width="44"
                height="44"
              />
            </div>

            {/* App Copy */}
            <div className="pwa-banner-text">
              <div className="pwa-title-row">
                <strong className="pwa-app-title">Thailand Lottery Official</strong>
                <span className="pwa-verified-badge" title="Official Verified App">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="#1D9BF0" aria-hidden="true">
                    <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.21.34-1.41-.09-2.92-1.15-3.98s-2.57-1.49-3.98-1.15C14.39 2.35 13.15 1.47 11.72 1.47s-2.67.88-3.21 2.19c-1.41-.34-2.92.09-3.98 1.15s-1.49 2.57-1.15 3.98C2.07 9.33 1.19 10.57 1.19 12s.88 2.67 2.19 3.21c-.34 1.41.09 2.92 1.15 3.98s2.57 1.49 3.98 1.15c.54 1.31 1.78 2.19 3.21 2.19s2.67-.88 3.21-2.19c1.41.34 2.92-.09 3.98-1.15s1.49-2.57 1.15-3.98c1.31-.54 2.19-1.78 2.19-3.21z" />
                    <path fill="#ffffff" d="M10.2 16.2 6.5 12.5l1.42-1.42 2.28 2.29 6.58-6.58 1.42 1.42-8 8z" />
                  </svg>
                  <span>OFFICIAL APP</span>
                </span>
              </div>
              <p className="pwa-app-sub">
                অফিসিয়াল অ্যাপ সরাসরি ফোনে ইনস্টল করুন • ১ ক্লিকে ওপেন ও রেজাল্ট
              </p>
            </div>

            {/* CTAs */}
            <div className="pwa-banner-actions">
              <button
                type="button"
                className="pwa-install-btn primary-glow"
                onClick={triggerInstall}
                disabled={isInstalling}
                aria-label="Install official app"
              >
                <span className="pwa-btn-shimmer" aria-hidden="true" />
                <span className="pwa-btn-icon">{isInstalling ? '⏳' : '📲'}</span>
                <span className="pwa-btn-text">
                  {isInstalling ? 'ইনস্টলার শুরু হচ্ছে...' : 'সরাসরি ইনস্টল'}
                </span>
              </button>

              <button
                type="button"
                className="pwa-dismiss-btn"
                onClick={() => setBannerDismissed(true)}
                aria-label="Dismiss install banner"
              >
                ✕
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* 2. PERSISTENT FLOATING QUICK INSTALL PILL */}
      {bannerDismissed && canInstall && (
        <button
          type="button"
          className="pwa-floating-install-pill"
          onClick={triggerInstall}
          aria-label="Install App"
        >
          <img
            src="/assets/logo.png"
            alt="Logo"
            className="pwa-pill-logo"
            width="22"
            height="22"
          />
          <span className="pwa-pill-text">📲 সরাসরি ইনস্টল</span>
          <span className="pwa-pill-glow" aria-hidden="true" />
        </button>
      )}

      {/* 3. SUCCESS TOAST */}
      {installSuccess && (
        <div className="pwa-install-success-toast" role="alert">
          <span className="toast-icon">🎉</span>
          <span>থাইল্যান্ড অফিসিয়াল অ্যাপ সফলভাবে ইনস্টল হয়েছে!</span>
        </div>
      )}

      {/* 4. SMART DIRECT ACTION SHEET & DIAGNOSTIC MODAL */}
      {showInstallModal && (
        <div className="pwa-modal-backdrop" onClick={() => setShowInstallModal(false)}>
          <div
            className="pwa-modal-card"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="pwa-modal-title"
          >
            <button
              type="button"
              className="pwa-modal-close"
              onClick={() => setShowInstallModal(false)}
              aria-label="Close"
            >
              ✕
            </button>

            <div className="pwa-modal-header">
              <img
                src="/assets/logo.png"
                alt="Thailand Lottery Official"
                className="pwa-modal-logo"
                width="64"
                height="64"
              />
              <div className="pwa-modal-title-wrap">
                <h3 id="pwa-modal-title">Thailand Official Lottery App</h3>
                <span className="pwa-modal-tag">สำนักงานสลากกินแบ่งรัฐบาล • সরকারি অনুমোদিত PWA</span>
              </div>
            </div>

            {/* Diagnostic Status Pill */}
            <div className="pwa-diagnostic-bar">
              <span className="diag-item">
                <span className="diag-dot green" />
                <span>সার্ভিস ইঞ্জিন: {swActive ? 'সক্রিয় (Active)' : 'প্রস্তুত'}</span>
              </span>
              <span className="diag-item">
                <span className="diag-dot blue" />
                <span>ব্রাউজার: {isIOS ? 'Apple Safari' : isAndroid ? 'Android Chrome' : 'Chrome/Edge'}</span>
              </span>
            </div>

            <div className="pwa-modal-body">
              {/* CASE 1: IN-APP BROWSER (WhatsApp, Facebook, Messenger) */}
              {isInAppBrowser ? (
                <div className="in-app-browser-card">
                  <div className="in-app-badge">⚠️ ব্রাউজার নোটিশ</div>
                  <p className="in-app-text">
                    আপনি <strong>হোয়াটসঅ্যাপ / ফেসবুক</strong> অ্যাপের ভেতরে আছেন, যেখানে গুগল ইনস্টল ব্লক রাখে। সরাসরি ফোনে ইনস্টল করতে নিচের বাটনে চাপ দিন:
                  </p>
                  <button
                    type="button"
                    className="open-chrome-btn"
                    onClick={openInChrome}
                  >
                    <span className="chrome-icon">🌐</span>
                    <span>সরাসরি Chrome ব্রাউজারে খুলুন ➔</span>
                  </button>
                </div>
              ) : isIOS ? (
                /* CASE 2: APPLE IPHONE / IPAD */
                <>
                  <p className="pwa-modal-intro">
                    আইফোনে অফিসিয়াল অ্যাপটি সরাসরি যুক্ত করতে নিচের ২টি সহজ কাজ করুন:
                  </p>
                  <ol className="pwa-steps-list">
                    <li>
                      <span className="step-num">১</span>
                      <div className="step-content">
                        <strong>সাফারি ব্রাউজারের নিচে শেয়ার বাটনে চাপুন</strong>
                        <p>স্ক্রিনের নিচে মাঝখানে থাকা <strong>Share [⎋]</strong> আইকনে চাপুন।</p>
                      </div>
                    </li>
                    <li>
                      <span className="step-num">২</span>
                      <div className="step-content">
                        <strong>'Add to Home Screen' চাপুন</strong>
                        <p>একটু নিচে স্ক্রল করে <strong>[➕ Add to Home Screen]</strong> অপশনে ট্যাপ করলেই হোম স্ক্রিনে অ্যাপ যুক্ত হবে।</p>
                      </div>
                    </li>
                  </ol>
                </>
              ) : (
                /* CASE 3: ANDROID CHROME OR DESKTOP */
                <div className="android-direct-install-box">
                  <p className="pwa-modal-intro">
                    আপনার গুগল ক্রোম ব্রাউজারে সরাসরি অ্যাপ ইনস্টল অপশন:
                  </p>
                  
                  <div className="chrome-menu-visual-card">
                    <div className="visual-step-row">
                      <span className="visual-badge">১</span>
                      <div className="visual-text">
                        <strong>ব্রাউজারের ৩টি ডটে (⋮) চাপ দিন</strong>
                        <p>স্ক্রিনের একদম উপরে ডান কোণায় থাকা ক্রোম মেনু বাটনে ট্যাপ করুন।</p>
                      </div>
                    </div>

                    <div className="visual-step-divider" />

                    <div className="visual-step-row">
                      <span className="visual-badge gold">২</span>
                      <div className="visual-text">
                        <strong>'Install App' বা 'Add to Home screen' চাপুন</strong>
                        <p>মেনু থেকে ইনস্টল অপশনটিতে চাপলেই সরাসরি আপনার ফোনের হোম স্ক্রিনে অ্যাপটি ডাউনলোড ও ইনস্টল হয়ে যাবে!</p>
                      </div>
                    </div>
                  </div>

                  {/* Retry Native Prompt Button */}
                  <button
                    type="button"
                    className="retry-native-prompt-btn"
                    onClick={triggerInstall}
                  >
                    <span>🔄 পুনরায় সরাসরি ইনস্টল চেষ্টা করুন</span>
                  </button>
                </div>
              )}
            </div>

            <div className="pwa-modal-footer">
              <button
                type="button"
                className="pwa-modal-confirm-btn"
                onClick={() => setShowInstallModal(false)}
              >
                বুঝেছি / ঠিক আছে ✓
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
