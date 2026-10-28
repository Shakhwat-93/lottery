import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import LogoPageTransition from '../components/LogoPageTransition';

export default function GamePaperPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dateParam = searchParams.get('date') || '2/12/2069';
  const [showLogoTransition, setShowLogoTransition] = useState(true);

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
  const paperSrc = dateParam === '20/21/2069'
    ? '/assets/site/3-set-game.jpg'
    : '/assets/site/game-paper-2-12-2069.jpg';

  return (
    <>
      {/* 1. Cinematic Logo Motion Graphic Transition */}
      {showLogoTransition && (
        <LogoPageTransition
          badgeText="👑 OFFICIAL VIP PAPER 2026"
          title="THAILAND OFFICIAL LOTTERY"
          subtitle={`OFFICIAL DRAW PAPER • ${dateParam}`}
          statusText="DECRYPTING OFFICIAL GLO PAPER..."
          duration={1600}
          onComplete={handleLogoComplete}
        />
      )}

      {/* 2. Pure Fullscreen Paper View — Just the paper, nothing else */}
      <main
        className="game-paper-fullscreen-view"
        aria-label="Official Thailand Lottery Paper Fullscreen"
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

        {/* Top Minimal Navigation Bar */}
        <header className="jackpot-top-controls">
          <div className="jackpot-top-badge">
            <span className="live-pulse-dot" />
            <span>GLO OFFICIAL DRAW PAPER • {dateParam}</span>
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

        {/* Center Stage: Just the paper, nothing else */}
        <div className="game-paper-stage">
          <img
            src={paperSrc}
            alt={`Thailand Lottery Official Paper - Draw Date ${dateParam}`}
            className="game-paper-fullscreen-img"
          />
        </div>

        {/* Edge Vignette Overlay */}
        <div className="jackpot-vignette-overlay" aria-hidden="true" />
      </main>
    </>
  );
}
