import React, { useState, useEffect } from 'react';

export default function AppIntroSplash({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [statusMessage, setStatusMessage] = useState('অফিসিয়াল সার্ভার কানেক্ট হচ্ছে...');

  useEffect(() => {
    // Total duration of motion graphics intro in ms
    const duration = 2400;
    const startTime = performance.now();

    const updateProgress = (now) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 35) {
        setStatusMessage('অফিসিয়াল সার্ভার কানেক্ট হচ্ছে...');
      } else if (pct < 70) {
        setStatusMessage('ভিআইপি সিকিউরিটি ও লাইসেন্স ভেরিফিকেশন...');
      } else if (pct < 95) {
        setStatusMessage('সরাসরি গেম পোর্টাল প্রস্তুত হচ্ছে...');
      } else {
        setStatusMessage('স্বাগতম! সফলভাবে সংযুক্ত ✓');
      }

      if (elapsed < duration) {
        requestAnimationFrame(updateProgress);
      } else {
        triggerExit();
      }
    };

    const animId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animId);
  }, []);

  const triggerExit = () => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 450);
  };

  if (!isVisible) return null;

  const coronaRays = 24;

  return (
    <div
      className={`app-intro-backdrop ${isExiting ? 'is-exiting' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Thailand Official Lottery App Intro"
      onClick={triggerExit}
    >
      {/* Layer 1: Ambient Mesh & Star Dust Particle System */}
      <div className="app-intro-mesh-bg" aria-hidden="true">
        <div className="intro-nebula-orb orb-1" />
        <div className="intro-nebula-orb orb-2" />
        <div className="intro-nebula-orb orb-3" />
        <div className="intro-stars-layer" />
      </div>

      {/* Layer 2: Fast Direct Skip Button */}
      <button
        type="button"
        className="app-intro-skip-btn"
        onClick={(e) => {
          e.stopPropagation();
          triggerExit();
        }}
        aria-label="Skip intro animation"
      >
        <span>সরাসরি প্রবেশ</span>
        <span className="skip-arrow">➔</span>
      </button>

      {/* Layer 3: Central Motion Graphics Scene */}
      <div className={`app-intro-scene ${isExiting ? 'scene-exit' : ''}`}>
        
        {/* Sacred Geometry: Dual Counter-Rotating Rings */}
        <div className="intro-sacred-rings" aria-hidden="true">
          <div className="sacred-ring outer-ring">
            {Array.from({ length: 12 }).map((_, i) => (
              <span
                key={i}
                className="ring-tick"
                style={{ transform: `rotate(${i * 30}deg) translateY(-145px)` }}
              />
            ))}
          </div>
          <div className="sacred-ring inner-ring" />
          <div className="sacred-ring pulsing-ring" />
        </div>

        {/* Volumetric Corona Light Rays */}
        <div className="intro-corona-rays" aria-hidden="true">
          {Array.from({ length: coronaRays }).map((_, i) => (
            <div
              key={i}
              className="corona-ray"
              style={{
                transform: `translateX(-50%) rotate(${(360 / coronaRays) * i}deg) translateY(85px)`,
                animationDelay: `${(i % 4) * 0.15}s`
              }}
            />
          ))}
        </div>

        {/* The Official Thailand Lottery Logo Emblem */}
        <div className="intro-logo-container">
          {/* Pulsing Gold Halo Aura */}
          <div className="intro-logo-halo" aria-hidden="true" />
          
          <div className="intro-logo-card">
            {/* Holographic Laser Scan Line */}
            <div className="intro-hologram-scanner" aria-hidden="true" />
            
            <img
              src="/assets/logo.png"
              alt="Thailand Lottery Official Logo"
              className="intro-logo-image"
              width="130"
              height="130"
            />

            {/* Specular Diagonal Shimmer Light Sweep */}
            <div className="intro-shimmer-sweep" aria-hidden="true" />
          </div>
        </div>

        {/* Staggered Motion Graphics Typography */}
        <div className="intro-text-group">
          {/* Official Royal Seal Badge */}
          <div className="intro-royal-badge">
            <span className="badge-crown-icon" aria-hidden="true">👑</span>
            <span className="badge-text">สำนักงานสลากกินแบ่งรัฐบาล • GLO BANGKOK</span>
          </div>

          {/* Main Title with Metallic Liquid Gold Gradient */}
          <h1 className="intro-main-title">
            <span className="title-letter-shine">THAILAND OFFICIAL LOTTERY</span>
          </h1>

          {/* Bengali Subtitle with Soft Glow */}
          <p className="intro-bengali-sub">
            থাইল্যান্ড সরকারি অফিসিয়াল লটারি পোর্টাল ২০২৬
          </p>

          {/* Verified Security Tag */}
          <div className="intro-verified-pill">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="#1D9BF0" aria-hidden="true">
              <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.21.34-1.41-.09-2.92-1.15-3.98s-2.57-1.49-3.98-1.15C14.39 2.35 13.15 1.47 11.72 1.47s-2.67.88-3.21 2.19c-1.41-.34-2.92.09-3.98 1.15s-1.49 2.57-1.15 3.98C2.07 9.33 1.19 10.57 1.19 12s.88 2.67 2.19 3.21c-.34 1.41.09 2.92 1.15 3.98s2.57 1.49 3.98 1.15c.54 1.31 1.78 2.19 3.21 2.19s2.67-.88 3.21-2.19c1.41.34 2.92-.09 3.98-1.15s1.49-2.57 1.15-3.98c1.31-.54 2.19-1.78 2.19-3.21z" />
              <path fill="#ffffff" d="M10.2 16.2 6.5 12.5l1.42-1.42 2.28 2.29 6.58-6.58 1.42 1.42-8 8z" />
            </svg>
            <span>100% GOVERNMENT VERIFIED GATEWAY</span>
          </div>

          {/* Progress Bar & Real-Time Percentage */}
          <div className="intro-progress-wrapper">
            <div className="intro-progress-track">
              <div
                className="intro-progress-fill"
                style={{ width: `${progress}%` }}
              >
                <span className="intro-progress-head-glow" />
              </div>
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

        {/* Quick Tap to Enter Prompt */}
        <p className="intro-tap-hint">
          <span>স্ক্রিনে ট্যাপ করে যেকোনো সময় প্রবেশ করুন</span>
        </p>
      </div>

      {/* Layer 4: Cinematic Vignette & Grain */}
      <div className="app-intro-vignette" aria-hidden="true" />
    </div>
  );
}
