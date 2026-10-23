import React, { useState, useEffect } from 'react';

export default function LogoPageTransition({ onComplete, duration = 1600 }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const startTime = performance.now();

    const updateProgress = (now) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (elapsed < duration) {
        requestAnimationFrame(updateProgress);
      } else {
        // Trigger exit animation
        setIsExiting(true);
        setTimeout(() => {
          setIsVisible(false);
          if (onComplete) onComplete();
        }, 340);
      }
    };

    const animId = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(animId);
  }, [duration, onComplete]);

  const handleSkip = () => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 200);
  };

  if (!isVisible) return null;

  const rays = 16;

  return (
    <div
      className={`logo-transition-backdrop ${isExiting ? 'is-exiting' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Official Form Portal"
    >
      {/* Layer 1: Background Mesh with Dynamic Radial Orbs */}
      <div className="logo-transition-bg-mesh" aria-hidden="true">
        <div className="logo-mesh-orb orb-gold" />
        <div className="logo-mesh-orb orb-red" />
        <div className="logo-mesh-stars" />
      </div>

      {/* Skip Button */}
      <button
        type="button"
        className="logo-transition-skip-btn"
        onClick={handleSkip}
        aria-label="Skip animation and go directly to form"
        title="সরাসরি ফর্ম ওপেন করুন"
      >
        <span>সরাসরি ফর্ম</span>
        <span aria-hidden="true">✕</span>
      </button>

      {/* Central Motion Graphics Scene */}
      <div className={`logo-transition-scene ${isExiting ? 'scene-exit' : ''}`}>
        {/* Layer 2: Radial Corona Rays */}
        <div className="logo-transition-corona" aria-hidden="true">
          {Array.from({ length: rays }).map((_, i) => (
            <div
              key={i}
              className="corona-ray-item"
              style={{
                transform: `translateX(-50%) rotate(${(360 / rays) * i}deg) translateY(120px)`,
                animationDelay: `${0.04 * i}s`,
              }}
            />
          ))}
        </div>

        {/* Layer 3: Central Animated Logo with Shimmer */}
        <div className="logo-transition-hero-wrap">
          <div className="logo-glow-halo" aria-hidden="true" />
          <div className="logo-image-card">
            <img
              src="/assets/logo.png"
              alt="Thailand Lottery Official Logo"
              className="logo-transition-img"
            />
            {/* Shimmer Sweep Light Beam */}
            <div className="logo-shimmer-sweep" aria-hidden="true" />
          </div>
        </div>

        {/* Layer 4: Typography & Progress */}
        <div className="logo-transition-text-wrap">
          <div className="logo-transition-crown-badge">
            <span className="crown-icon" aria-hidden="true">👑</span>
            <span>OFFICIAL GLO PORTAL</span>
          </div>

          <h1 className="logo-transition-title">
            THAILAND OFFICIAL LOTTERY
          </h1>

          <div className="logo-transition-subtitle">
            GOVERNMENT LOTTERY OFFICE BANGKOK • 2026
          </div>

          {/* Progress Bar & Percentage */}
          <div className="logo-transition-progress-block">
            <div className="logo-progress-track">
              <div
                className="logo-progress-bar"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="logo-progress-meta">
              <span className="logo-progress-status">
                <span className="logo-status-pulse" aria-hidden="true" />
                VERIFYING SECURE GLO GATEWAY...
              </span>
              <span className="logo-progress-counter">{progress}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Layer 5: Film Grain & Vignette */}
      <div className="logo-transition-grain" aria-hidden="true" />
      <div className="logo-transition-vignette" aria-hidden="true" />
    </div>
  );
}
