import React, { useState, useEffect, useRef } from 'react';

/**
 * HyperFrames-powered Cinematic Submission & Verification Animation
 * Features:
 * - 60fps requestAnimationFrame progress with expo.out easing
 * - Official GLO Bangkok Logo with holographic shimmer and corona rays
 * - Live cybernetic telemetry & security handshake stages
 * - Smooth camera punch-in and match-cut transition to receipt
 */
export default function FormSubmitAnimation({
  registrationId = 'GLO-TL-784291',
  applicantName = 'Applicant',
  plan = '3 Month',
  onComplete,
  duration = 2400
}) {
  const [progress, setProgress] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const hasCompleted = useRef(false);

  const phases = [
    {
      step: '01 / 04',
      badge: 'SECURE HANDSHAKE',
      en: 'Connecting to GLO Bangkok Official Gateway...',
      bn: 'সরকারি লটারি অফিস (GLO) ডাটাবেজে সংযোগ হচ্ছে...',
      color: '#38BDF8'
    },
    {
      step: '02 / 04',
      badge: 'DOCUMENT VALIDATION',
      en: 'Encrypting & Verifying Applicant Information...',
      bn: 'আবেদনকারীর তথ্য ও পরিচয়পত্র এনক্রিপ্ট করা হচ্ছে...',
      color: '#FBBF24'
    },
    {
      step: '03 / 04',
      badge: 'VIP ID ASSIGNMENT',
      en: `Generating Official VIP ID: ${registrationId}...`,
      bn: 'সিনিয়র এজেন্ট ফাহিম চৌধুরীর অধীনে আইডি বরাদ্দ হচ্ছে...',
      color: '#A855F7'
    },
    {
      step: '04 / 04',
      badge: 'OFFICIAL APPROVAL',
      en: 'Registration Verified & Successfully Recorded!',
      bn: 'আবেদন সফলভাবে গৃহীত হয়েছে • রসিদ প্রস্তুত হচ্ছে...',
      color: '#10B981'
    }
  ];

  useEffect(() => {
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const rawPct = Math.min(1, elapsed / duration);
      // HyperFrames expo.out ease: 1 - Math.pow(2, -10 * rawPct)
      const easedPct = rawPct === 1 ? 1 : 1 - Math.pow(2, -10 * rawPct);
      const currentProgress = Math.min(100, Math.round(easedPct * 100));

      setProgress(currentProgress);

      if (currentProgress < 30) {
        setPhaseIndex(0);
      } else if (currentProgress < 65) {
        setPhaseIndex(1);
      } else if (currentProgress < 92) {
        setPhaseIndex(2);
      } else {
        setPhaseIndex(3);
      }

      if (rawPct < 1) {
        requestAnimationFrame(animate);
      } else {
        if (!hasCompleted.current) {
          hasCompleted.current = true;
          setIsExiting(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 320);
        }
      }
    };

    const animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [duration, onComplete, registrationId]);

  const handleSkip = () => {
    if (isExiting || hasCompleted.current) return;
    hasCompleted.current = true;
    setIsExiting(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 180);
  };

  const currentPhase = phases[phaseIndex];
  const rays = 16;

  return (
    <div
      className={`hf-submit-backdrop ${isExiting ? 'is-exiting' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Processing Official Lottery Membership Submission"
    >
      {/* Layer 1: Ambient Mesh Background with Royal Atmosphere */}
      <div className="hf-bg-mesh" aria-hidden="true">
        <div className="hf-mesh-orb hf-orb-gold" />
        <div className="hf-mesh-orb hf-orb-blue" />
        <div className="hf-mesh-orb hf-orb-emerald" />
        <div className="hf-grid-reticle" />
        <div className="hf-particles-stars" />
      </div>

      {/* Skip Button */}
      <button
        type="button"
        className="hf-skip-btn"
        onClick={handleSkip}
        title="সরাসরি রসিদ দেখুন (Skip animation)"
        aria-label="Skip animation and show receipt"
      >
        <span>সরাসরি রসিদ</span>
        <span aria-hidden="true">✕</span>
      </button>

      {/* Layer 2: Central Motion Graphics Stage */}
      <div className={`hf-motion-stage ${isExiting ? 'stage-exit' : ''}`}>
        {/* Rotating Corona Light Rays */}
        <div className="hf-corona-container" aria-hidden="true">
          {Array.from({ length: rays }).map((_, i) => (
            <div
              key={i}
              className="hf-corona-ray"
              style={{
                transform: `translateX(-50%) rotate(${(360 / rays) * i}deg) translateY(125px)`,
                animationDelay: `${0.04 * i}s`
              }}
            />
          ))}
        </div>

        {/* Circular Radar Scan Ring */}
        <div className="hf-radar-ring" aria-hidden="true">
          <svg className="hf-radar-svg" viewBox="0 0 220 220">
            <circle
              className="hf-radar-circle-bg"
              cx="110"
              cy="110"
              r="100"
              fill="none"
              stroke="rgba(212, 175, 55, 0.2)"
              strokeWidth="2"
            />
            <circle
              className="hf-radar-circle-progress"
              cx="110"
              cy="110"
              r="100"
              fill="none"
              stroke="url(#hfGoldEmeraldGradient)"
              strokeWidth="4"
              strokeDasharray="628.3"
              strokeDashoffset={628.3 - (628.3 * progress) / 100}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="hfGoldEmeraldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="50%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#00E5FF" />
              </linearGradient>
            </defs>
          </svg>
          <div className="hf-radar-scanner-beam" />
        </div>

        {/* Hero Logo Emblem */}
        <div className="hf-hero-logo-box">
          <div className="hf-logo-glow-aura" aria-hidden="true" />
          <div className="hf-logo-card">
            <img
              src="/assets/logo.png?v=4"
              alt="Thailand Lottery Official Logo"
              className="hf-logo-img"
              width="104"
              height="104"
            />
            <div className="hf-logo-shimmer" aria-hidden="true" />
          </div>
        </div>

        {/* Telemetry Typography & Progress Block */}
        <div className="hf-telemetry-block">
          <div className="hf-top-brand-tag">
            <span className="hf-tag-crown">👑</span>
            <span className="hf-tag-text">GOVERNMENT LOTTERY OFFICE (GLO) BANGKOK</span>
          </div>

          <h2 className="hf-stage-title">
            MEMBERSHIP SUBMISSION
          </h2>

          {/* Dynamic Live Telemetry Status */}
          <div className="hf-status-card">
            <div className="hf-status-pill-row">
              <span className="hf-status-step">{currentPhase.step}</span>
              <span
                className="hf-status-badge"
                style={{
                  color: currentPhase.color,
                  borderColor: currentPhase.color,
                  backgroundColor: `${currentPhase.color}15`
                }}
              >
                <span
                  className="hf-status-dot"
                  style={{ backgroundColor: currentPhase.color }}
                />
                {currentPhase.badge}
              </span>
            </div>

            <p className="hf-phase-text-en">{currentPhase.en}</p>
            <p className="hf-phase-text-bn">{currentPhase.bn}</p>
          </div>

          {/* Progress Bar & Percentage Meter */}
          <div className="hf-progress-container">
            <div className="hf-progress-meta">
              <span className="hf-progress-label">
                <span className="hf-live-indicator" />
                OFFICIAL RECORDING
              </span>
              <span className="hf-progress-pct">{progress}%</span>
            </div>

            <div className="hf-progress-track">
              <div
                className="hf-progress-bar"
                style={{ width: `${progress}%` }}
              >
                <span className="hf-progress-glow-head" />
              </div>
            </div>
          </div>

          {/* Footer Security Seal */}
          <div className="hf-security-seal-row">
            <span>🔒 256-Bit Encrypted</span>
            <span>•</span>
            <span>Regulated Treasury Portal</span>
            <span>•</span>
            <span>Agent: Md Fahim Chowdhury</span>
          </div>
        </div>
      </div>

      {/* Layer 3: Vignette Atmosphere */}
      <div className="hf-vignette-overlay" aria-hidden="true" />
    </div>
  );
}
