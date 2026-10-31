import React from 'react';
import { usePWAInstall } from '../context/PWAInstallContext';

export default function InstallAppBanner() {
  const {
    isStandalone,
    isIOS,
    showIOSModal,
    setShowIOSModal,
    bannerDismissed,
    setBannerDismissed,
    installSuccess,
    triggerInstall,
    canInstall
  } = usePWAInstall();

  // If already running inside installed standalone app, hide install prompts
  if (isStandalone) {
    return null;
  }

  return (
    <>
      {/* 1. TOP FLOATING INSTANT APP INSTALL BANNER ("web a dhukar sathe sathe") */}
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
                অফিসিয়াল অ্যাপ ইনস্টল করুন • নোটিফিকেশন ও ১ ক্লিকে দ্রুত ওপেন
              </p>
            </div>

            {/* CTAs */}
            <div className="pwa-banner-actions">
              <button
                type="button"
                className="pwa-install-btn primary-glow"
                onClick={triggerInstall}
                aria-label="Install official app"
              >
                <span className="pwa-btn-shimmer" aria-hidden="true" />
                <span className="pwa-btn-icon">📲</span>
                <span className="pwa-btn-text">ইনস্টল করুন</span>
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

      {/* 2. PERSISTENT FLOATING QUICK INSTALL PILL (Visible if banner dismissed) */}
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
          <span className="pwa-pill-text">📲 অ্যাপ ইনস্টল</span>
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

      {/* 4. MODAL FOR IOS & GENERAL INSTALL INSTRUCTIONS */}
      {showIOSModal && (
        <div className="pwa-modal-backdrop" onClick={() => setShowIOSModal(false)}>
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
              onClick={() => setShowIOSModal(false)}
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
                <span className="pwa-modal-tag">สำนักงานสลากกินแบ่งรัฐบาล • সরকারি অনুমোদিত</span>
              </div>
            </div>

            <div className="pwa-modal-body">
              {isIOS ? (
                <>
                  <p className="pwa-modal-intro">
                    আইফোন বা আইপ্যাডে অফিসিয়াল অ্যাপ ইনস্টল করতে নিচের সহজ ধাপগুলো অনুসরণ করুন:
                  </p>
                  <ol className="pwa-steps-list">
                    <li>
                      <span className="step-num">১</span>
                      <div className="step-content">
                        <strong>সাফারি ব্রাউজারের শেয়ার বাটনে চাপুন</strong>
                        <p>স্ক্রিনের নিচে মাঝখানে থাকা <strong>Share [⎋]</strong> আইকনে ট্যাপ করুন।</p>
                      </div>
                    </li>
                    <li>
                      <span className="step-num">২</span>
                      <div className="step-content">
                        <strong>'Add to Home Screen' সিলেক্ট করুন</strong>
                        <p>একটু নিচে স্ক্রল করে <strong>[➕ Add to Home Screen]</strong> অপশনে চাপুন।</p>
                      </div>
                    </li>
                    <li>
                      <span className="step-num">৩</span>
                      <div className="step-content">
                        <strong>'Add' বাটনে ক্লিক করুন</strong>
                        <p>উপরে ডান কোণায় থাকা <strong>'Add'</strong> বাটনে চাপলেই আপনার হোম স্ক্রিনে অফিসিয়াল অ্যাপ আইকন চলে আসবে!</p>
                      </div>
                    </li>
                  </ol>
                </>
              ) : (
                <>
                  <p className="pwa-modal-intro">
                    আপনার ফোনে বা কম্পিউটারে অফিসিয়াল অ্যাপটি সরাসরি ইনস্টল করতে:
                  </p>
                  <ol className="pwa-steps-list">
                    <li>
                      <span className="step-num">১</span>
                      <div className="step-content">
                        <strong>ব্রাউজার মেনু খুলুন</strong>
                        <p>উপরে ডানপাশে থাকা <strong>৩টি ডট (⋮)</strong> বাটনে চাপুন।</p>
                      </div>
                    </li>
                    <li>
                      <span className="step-num">২</span>
                      <div className="step-content">
                        <strong>'Install app' অথবা 'Add to Home screen' চাপুন</strong>
                        <p>মেনু থেকে <strong>Install Thailand Lottery</strong> সিলেক্ট করুন।</p>
                      </div>
                    </li>
                    <li>
                      <span className="step-num">৩</span>
                      <div className="step-content">
                        <strong>ইনস্টল কনফার্ম করুন</strong>
                        <p>কনফার্ম করলেই ফোনের হোম স্ক্রিনে অ্যাপ আইকন চলে আসবে এবং দ্রুত ব্যবহার করা যাবে।</p>
                      </div>
                    </li>
                  </ol>
                </>
              )}
            </div>

            <div className="pwa-modal-footer">
              <button
                type="button"
                className="pwa-modal-confirm-btn"
                onClick={() => setShowIOSModal(false)}
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
