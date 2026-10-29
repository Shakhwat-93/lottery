import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import LogoPageTransition from '../components/LogoPageTransition';

export default function GamePaperPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dateParam = searchParams.get('date') || '2/12/2069';
  const [showLogoTransition, setShowLogoTransition] = useState(true);

  const isLockedDate = dateParam === '20/21/2069';
  const whatsappUrl = `https://wa.me/8801309802224?text=${encodeURIComponent('আসসালামু আলাইকুম, আমি থাইল্যান্ড লটারি ২০/২১/২০৬৯ গেম আনলক করতে এবং মেম্বারশিপ নিতে যোগাযোগ করছি।')}`;

  // Fullscreen body lock & Escape key listener
  useEffect(() => {
    document.body.classList.add('jackpot-page-active');
    window.scrollTo(0, 0);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        navigate('/');
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('jackpot-page-active');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);

  const handleLogoComplete = () => {
    setShowLogoTransition(false);
  };

  // Determine paper source based on date
  const paperSrc = isLockedDate
    ? '/assets/site/game-paper-20-21-2069.jpg'
    : '/assets/site/game-paper-2-12-2069.jpg';

  return (
    <>
      {/* 1. Cinematic Logo Motion Graphic Transition */}
      {showLogoTransition && (
        <LogoPageTransition
          badgeText={isLockedDate ? "🔒 1 YEAR 24 SET VIP PAPER" : "👑 100% CONFIRM • NO GAME MISS"}
          title="THAILAND OFFICIAL LOTTERY"
          subtitle={`VERIFIED GLO DRAW PAPER • ${dateParam}`}
          statusText={isLockedDate ? "LOADING 1 YEAR 24 SET VIP CALCULATION PAPER..." : "DECRYPTING VERIFIED OFFICIAL PAPER..."}
          duration={1600}
          onComplete={handleLogoComplete}
        />
      )}

      {/* 2. Fullscreen Royal Sapphire Paper Chamber */}
      <main
        className="game-paper-fullscreen-view"
        aria-label="Official Thailand Lottery Verified Paper Fullscreen"
      >
        {/* Ambient Background Gold Glow & Corona Rays */}
        <div className="jackpot-ambient-layer" aria-hidden="true">
          <div className="jackpot-radial-burst" />
          <div className="jackpot-corona-rays">
            {Array.from({ length: 24 }).map((_, i) => (
              <span
                key={i}
                className="jackpot-ray"
                style={{ transform: `rotate(${i * 15}deg)` }}
              />
            ))}
          </div>
          <div className="jackpot-floating-sparkles">
            {Array.from({ length: 18 }).map((_, i) => (
              <span key={i} className={`sparkle-dot sparkle-${(i % 5) + 1}`} />
            ))}
          </div>
        </div>

        {/* Top Official Verified Header */}
        <header className="paper-reveal-top-bar">
          <div className="paper-brand-verified">
            <img
              src="/assets/logo-verified.png"
              alt="GLO Verified Official Seal"
              className="paper-verified-logo-img"
            />
            <div className="paper-brand-text">
              <div className="paper-brand-title">
                <span>THAILAND OFFICIAL LOTTERY</span>
                <span className="paper-badge-check" title="Verified Government Seal">✓</span>
              </div>
              <span className="paper-brand-sub">
                สำนักงานสลากกินแบ่งรัฐบาล • GLO BANGKOK 2026
              </span>
            </div>
          </div>

          <button
            type="button"
            className="jackpot-ctrl-btn jackpot-close-btn"
            onClick={() => navigate('/')}
            aria-label="Close and return to homepage"
            title="হোমপেজে ফিরে যান (Esc)"
          >
            <span>✕</span>
          </button>
        </header>

        {/* Center Stage: Trust Chips + The Verified Paper */}
        <div className="game-paper-stage">
          {/* 3 High-Impact Trust Chips */}
          <div className="paper-trust-chips-row" aria-label="Official Trust Guarantee Badges">
            <span className="paper-trust-pill pill-confirm">
              <span className="pill-icon">★</span>
              <strong>100% CONFIRM</strong>
            </span>

            <span className="paper-trust-pill pill-nomiss">
              <span className="pill-dot-pulse" />
              <strong>NO GAME MISS</strong>
            </span>

            <span className="paper-trust-pill pill-verified">
              <span className="pill-check-icon">✓</span>
              <strong>GOVERNMENT VERIFIED</strong>
            </span>
          </div>

          {/* The High-Resolution Official Paper */}
          <div className={`paper-img-frame-wrap ${isLockedDate ? 'is-calc-paper-wrap' : ''}`}>
            <img
              src={paperSrc}
              alt={`Thailand Lottery 100% Confirm Official Paper - Draw Date ${dateParam}`}
              className={`game-paper-fullscreen-img ${isLockedDate ? 'is-calc-paper-img' : ''}`}
            />
          </div>

          {/* Bottom Trust Guarantee Footnote / Unlock Prompt Card */}
          {isLockedDate ? (
            <div className="game-unlock-prompt-card">
              <div className="game-unlock-header">
                <span className="unlock-crown-badge">👑</span>
                <h3 className="game-unlock-heading">গেম আনলক করতে মেম্বারশিপ নিতে হবে</h3>
              </div>
              <p className="game-unlock-subtext">
                পরবর্তী ড্র-এর ১০০% নিশ্চিত ৩ সেট উইনিং পেপার ও ফুল সেট আনলক করতে এখনই আমাদের সাথে যোগাযোগ করুন।
              </p>
              <div className="game-unlock-actions-row">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button primary game-unlock-whatsapp-btn"
                  aria-label="হোয়াটসঅ্যাপে যোগাযোগ করুন"
                >
                  <span className="unlock-btn-icon">💬</span>
                  <span>এখনই যোগাযোগ করুন</span>
                  <span className="vip-btn-arrow" aria-hidden="true">↗</span>
                </a>
                <Link
                  to="/form"
                  className="button secondary game-unlock-form-btn"
                  aria-label="মেম্বারশিপ ফর্ম পূরণ করুন"
                >
                  <span className="unlock-btn-icon">✍️</span>
                  <span>মেম্বারশিপ ফর্ম</span>
                </Link>
              </div>
              <div className="game-unlock-security-note">
                <span>🛡️ ১০০% বিশ্বস্ত ও শতভাগ নিশ্চিত উইনিং গ্যারান্টি • GLO BANGKOK 2026</span>
              </div>
            </div>
          ) : (
            <div className="paper-bottom-guarantee">
              <span className="guarantee-shield">🛡️</span>
              <span>১০০% নিশ্চিত উইনিং পেপার • 100% SURE GUARANTEED • OFFICIAL VIP DRAW ({dateParam})</span>
            </div>
          )}
        </div>

        {/* Edge Vignette Overlay */}
        <div className="jackpot-vignette-overlay" aria-hidden="true" />
      </main>
    </>
  );
}
