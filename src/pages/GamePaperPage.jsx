import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import LogoPageTransition from '../components/LogoPageTransition';

export default function GamePaperPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dateParam = searchParams.get('date') || '2/12/2069';
  const paperType = searchParams.get('type') || '';
  const [showLogoTransition, setShowLogoTransition] = useState(true);

  const isCalc = paperType === 'calc' || dateParam === '20/21/2069';

  // Escape key listener & Body styling
  useEffect(() => {
    document.body.classList.add('game-paper-body');
    window.scrollTo(0, 0);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        navigate('/');
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('game-paper-body');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);

  const handleLogoComplete = () => {
    setShowLogoTransition(false);
  };

  // Determine paper source based on date
  const paperSrc = isCalc
    ? '/assets/site/game-paper-20-21-2069.jpg'
    : '/assets/site/game-paper-2-12-2069.jpg';

  return (
    <>
      {/* 1. Cinematic Logo Motion Graphic Transition */}
      {showLogoTransition && (
        <LogoPageTransition
          badgeText={isCalc ? "🔒 1 YEAR 24 SET CALCULATION PAPER" : "👑 100% CONFIRM • NO GAME MISS"}
          title="THAILAND OFFICIAL LOTTERY"
          subtitle={isCalc ? `OFFICIAL CALCULATION PAPER • ${dateParam}` : `VERIFIED GLO DRAW PAPER • ${dateParam}`}
          statusText={isCalc ? "LOADING 1 YEAR 24 SET CALCULATION PAPER..." : "DECRYPTING VERIFIED OFFICIAL PAPER..."}
          duration={1600}
          onComplete={handleLogoComplete}
        />
      )}

      {/* 2. Fullscreen Official Paper View */}
      <main
        className="game-paper-fullscreen-view"
        aria-label="Official Thailand Lottery Verified Paper Fullscreen"
      >
        {/* Sticky Top Official Verified Header */}
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
                {isCalc
                  ? '1 YEAR 24 SET CALCULATION PAPER • GLO BANGKOK 2026'
                  : 'สำนักงานสลากกินแบ่งรัฐบาล • GLO BANGKOK 2026'}
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
          <div className="paper-img-frame-wrap">
            <img
              src={paperSrc}
              alt={`Thailand Lottery 100% Confirm Official Paper - Draw Date ${dateParam}`}
              className="game-paper-fullscreen-img"
            />
          </div>

          {/* Bottom Trust Guarantee Footnote */}
          <div className="paper-bottom-guarantee">
            <span className="guarantee-shield">🛡️</span>
            <span>
              {isCalc
                ? `১০০% নিশ্চিত ১ বছরের ২৪ সেট ক্যালকুলেশন পেপার • 100% SURE GUARANTEED (${dateParam})`
                : `১০০% নিশ্চিত উইনিং পেপার • 100% SURE GUARANTEED • OFFICIAL VIP DRAW (${dateParam})`}
            </span>
          </div>
        </div>
      </main>
    </>
  );
}
