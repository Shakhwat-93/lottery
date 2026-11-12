import React, { useState, useEffect, useRef, useCallback } from 'react';

export default function AppIntroSplash({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // 'loading' | 'pre-zoom' | 'zoom-exit'
  const [isVisible, setIsVisible] = useState(true);
  const [statusMessage, setStatusMessage] = useState('অফিসিয়াল পোর্টাল প্রস্তুত হচ্ছে...');

  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const animIdRef = useRef(null);
  const timersRef = useRef([]);
  const hasExitedRef = useRef(false);

  const triggerExit = useCallback(() => {
    if (hasExitedRef.current) return;
    hasExitedRef.current = true;

    if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];

    // Phase 1: Dissolve surrounding UI, spotlighting only the central logo (160ms)
    setPhase('pre-zoom');

    // Phase 2: Logo zooms outward into fullscreen & fades smoothly out into the app (650ms)
    const zoomTimer = setTimeout(() => {
      setPhase('zoom-exit');
    }, 150);

    const doneTimer = setTimeout(() => {
      setIsVisible(false);
      if (onCompleteRef.current) onCompleteRef.current();
    }, 820);

    timersRef.current.push(zoomTimer, doneTimer);
  }, []);

  useEffect(() => {
    const duration = 1250;
    const startTime = performance.now();

    const updateProgress = (now) => {
      if (hasExitedRef.current) return;
      const elapsed = now - startTime;
      const rawPct = Math.min(1, elapsed / duration);
      // Smooth ease-out curve for crisp visual charge feel
      const easedPct = 1 - Math.pow(1 - rawPct, 2);
      const pct = Math.min(100, Math.round(easedPct * 100));
      setProgress(pct);

      if (pct < 45) {
        setStatusMessage('অফিসিয়াল সার্ভার সংযুক্ত হচ্ছে...');
      } else if (pct < 85) {
        setStatusMessage('লাইসেন্স ও লাইভ ডেটা ভেরিফিকেশন...');
      } else {
        setStatusMessage('স্বাগতম! পোর্টাল উন্মুক্ত হচ্ছে ✓');
      }

      if (elapsed < duration) {
        animIdRef.current = requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        triggerExit();
      }
    };

    animIdRef.current = requestAnimationFrame(updateProgress);
    return () => {
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
      timersRef.current.forEach((t) => clearTimeout(t));
    };
  }, [triggerExit]);

  if (!isVisible) return null;

  const isPreZoom = phase === 'pre-zoom';
  const isZoomExit = phase === 'zoom-exit';
  const isExitingAny = isPreZoom || isZoomExit;

  return (
    <div
      className={`app-intro-backdrop ${isPreZoom ? 'is-pre-zoom' : ''} ${isZoomExit ? 'is-zoom-exiting' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Thailand Official Lottery App Intro"
      onClick={triggerExit}
    >
      {/* Minimal Luxury Ambient Radial Glow Backdrop */}
      <div className="app-intro-mesh-bg" aria-hidden="true">
        <div className="intro-nebula-orb orb-1" />
      </div>

      {/* Sleek Skip Button */}
      <button
        type="button"
        className={`app-intro-skip-btn ${isExitingAny ? 'is-ui-hidden' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          triggerExit();
        }}
        aria-label="Skip intro animation"
      >
        <span>সরাসরি প্রবেশ</span>
        <span className="skip-arrow">➔</span>
      </button>

      {/* Central Portal Stage */}
      <div className="app-intro-scene">
        {/* Minimal Luxury Ring Behind Logo (fades before logo expands) */}
        <div className={`intro-sacred-rings ${isExitingAny ? 'is-ui-hidden' : ''}`} aria-hidden="true">
          <div className="sacred-ring inner-ring" />
          <div className="sacred-ring pulsing-ring" />
        </div>

        {/* Centerpiece Official Logo: Expands to Fullscreen & Fades Into App */}
        <div className={`intro-logo-container ${isZoomExit ? 'is-portal-expanding' : ''}`}>
          <div className="intro-logo-halo" aria-hidden="true" />
          <div className="intro-logo-card">
            <img
              src="/assets/logo.png"
              alt="Thailand Lottery Official Logo"
              className="intro-logo-image"
              width="124"
              height="124"
            />
            <div className="intro-shimmer-sweep" aria-hidden="true" />
          </div>
        </div>

        {/* Clean Restrained Brand Typography & Progress */}
        <div className={`intro-text-group ${isExitingAny ? 'is-ui-hidden' : ''}`}>
          <div className="intro-royal-badge">
            <span className="badge-crown-icon" aria-hidden="true">👑</span>
            <span className="badge-text">GLO BANGKOK • OFFICIAL PORTAL</span>
          </div>

          <h1 className="intro-main-title">
            THAILAND OFFICIAL LOTTERY
          </h1>

          <p className="intro-bengali-sub">
            থাইল্যান্ড সরকারি অফিসিয়াল লটারি পোর্টাল ২০২৬
          </p>

          {/* GPU-Accelerated Thin Gold Progress Line */}
          <div className="intro-progress-wrapper">
            <div className="intro-progress-track">
              <div
                className="intro-progress-fill"
                style={{ transform: `scaleX(${progress / 100})` }}
              />
            </div>

            <div className="intro-progress-meta">
              <div className="intro-status-indicator">
                <span className="indicator-live-dot" />
                <span className="indicator-status-text">{statusMessage}</span>
              </div>
              <strong className="intro-counter-number">{progress}%</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Soft Radial Vignette */}
      <div className="app-intro-vignette" aria-hidden="true" />
    </div>
  );
}
