import React, { useState, useEffect } from 'react';
import { useVipCodeSettings } from '../hooks/useVipCodeSettings';
import { formatVipDate } from '../lib/vipCodeSettings';

export default function ThreeUpGameBox() {
  const settings = useVipCodeSettings();
  const [showDates, setShowDates] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(null);

  const date1 = formatVipDate(settings.firstDate);
  const date2 = formatVipDate(settings.secondDate);
  const brandTitle = settings.headerTitle || 'Thailand Lottery';

  // Close fullscreen on ESC key and prevent body scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setFullscreenImage(null);
    };
    if (fullscreenImage) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [fullscreenImage]);

  const openImage = (itemNumber) => {
    if (itemNumber === 1) {
      setFullscreenImage({
        src: '/assets/site/3-up-game-paper-1.jpg',
        title: 'Thailand Lottery Official Paper • 1 Set 3D Game',
        date: date1,
        number: 1
      });
    } else {
      setFullscreenImage({
        src: '/assets/site/3-up-game-paper-2.jpg',
        title: '1 Year 24 Set Calculation Paper 2026',
        date: date2,
        number: 2
      });
    }
  };

  return (
    <>
      <section className="section three-set-home-strip reveal-on-scroll" id="three-set-game-section">
        <div className="three-set-home-card">
          <div className="three-set-glow-ring" aria-hidden="true" />
          
          <div className="three-set-home-text">
            <span className="three-set-badge-tag">✦ VIP OFFICIAL DOCUMENT ✦</span>
            <h3>থাইল্যান্ড লটারি 3 সেট গেম পেপার 2026</h3>
            <p>অফিসিয়াল 3 সেট / 3 আপ গেম পেপার ও লাইসেন্সকৃত অনুমোদনপত্র দেখতে নিচে ক্লিক করুন:</p>
          </div>

          <div className="three-up-interactive-action-area">
            {!showDates ? (
              <button
                type="button"
                className="three-set-glowing-btn"
                onClick={() => setShowDates(true)}
                aria-label="Open 3 Up Game dates"
              >
                <span className="three-set-shimmer" aria-hidden="true" />
                <span className="three-set-icon" aria-hidden="true">👑</span>
                <span className="three-set-text">3 UP GAME</span>
                <span className="three-set-arrow" aria-hidden="true">➔</span>
              </button>
            ) : (
              <div className="three-up-date-buttons-chamber" role="region" aria-label="3 Up Game Draw Dates">
                <div className="three-up-chamber-header">
                  <span className="three-up-chamber-title">ড্র-এর তারিখ নির্বাচন করুন:</span>
                  <button
                    type="button"
                    className="three-up-collapse-btn"
                    onClick={() => setShowDates(false)}
                    title="সংকুচিত করুন"
                    aria-label="Collapse dates"
                  >
                    ✕
                  </button>
                </div>

                <div className="game-panel-buttons-stack three-up-dates-stack">
                  <button
                    type="button"
                    className="button primary vip-agency-date-btn three-up-date-btn"
                    onClick={() => openImage(1)}
                    aria-label={`Show official 3D game paper for ${date1}`}
                  >
                    <span>{date1}</span>
                    <span className="vip-btn-arrow" aria-hidden="true">↗</span>
                  </button>

                  <button
                    type="button"
                    className="button primary vip-agency-date-btn three-up-date-btn"
                    onClick={() => openImage(2)}
                    aria-label={`Show 24 set calculation paper for ${date2}`}
                  >
                    <span>{date2}</span>
                    <span className="vip-btn-arrow" aria-hidden="true">↗</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* True Fullscreen Viewport — Clean, unblocked paper display with main verified logo */}
      {fullscreenImage && (
        <div
          className="three-up-clean-fullscreen"
          onClick={() => setFullscreenImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label={fullscreenImage.title}
        >
          {/* Top Clean Bar: Main Verified Logo & Close Button */}
          <div className="three-up-top-bar" onClick={(e) => e.stopPropagation()}>
            <div className="three-up-brand-group">
              <img
                src="/assets/logo.png?v=4"
                alt="Thailand Lottery Official Logo"
                className="three-up-main-logo"
                width="44"
                height="44"
              />
              <div className="three-up-brand-text">
                <div className="three-up-title-row">
                  <strong className="three-up-brand-title">{brandTitle}</strong>
                  {/* Verified Check Badge */}
                  <svg
                    className="three-up-verified-badge"
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    aria-label="Official Verified"
                    role="img"
                  >
                    <path
                      fill="#1D9BF0"
                      d="M22.25 12c0-1.43-.88-2.67-2.19-3.21.34-1.41-.09-2.92-1.15-3.98s-2.57-1.49-3.98-1.15C14.39 2.35 13.15 1.47 11.72 1.47s-2.67.88-3.21 2.19c-1.41-.34-2.92.09-3.98 1.15s-1.49 2.57-1.15 3.98C2.07 9.33 1.19 10.57 1.19 12s.88 2.67 2.19 3.21c-.34 1.41.09 2.92 1.15 3.98s2.57 1.49 3.98 1.15c.54 1.31 1.78 2.19 3.21 2.19s2.67-.88 3.21-2.19c1.41.34 2.92-.09 3.98-1.15s1.49-2.57 1.15-3.98c1.31-.54 2.19-1.78 2.19-3.21z"
                    />
                    <path
                      fill="#ffffff"
                      d="M10.2 16.2 6.5 12.5l1.42-1.42 2.28 2.29 6.58-6.58 1.42 1.42-8 8z"
                    />
                  </svg>
                </div>
                <span className="three-up-brand-sub">สำนักงานสลากกินแบ่งรัฐบาล • OFFICIAL PAPER ({fullscreenImage.date})</span>
              </div>
            </div>

            <div className="three-up-top-actions">
              {/* Quick Switch between 1st and 2nd paper */}
              <button
                type="button"
                className="three-up-switch-pill"
                onClick={() => openImage(fullscreenImage.number === 1 ? 2 : 1)}
                title="অন্য পেপার দেখুন"
              >
                <span>{fullscreenImage.number === 1 ? `পেপার ২ (${date2}) ➔` : `← পেপার ১ (${date1})`}</span>
              </button>

              {/* Close Button */}
              <button
                type="button"
                className="three-up-close-btn"
                onClick={() => setFullscreenImage(null)}
                aria-label="Close fullscreen"
                title="বন্ধ করুন (Esc)"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Full Screen Image Showcase — 100% visible, sharp, zero obstruction */}
          <div className="three-up-image-viewport">
            <img
              src={fullscreenImage.src}
              alt={fullscreenImage.title}
              className="three-up-paper-hero-img"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
}
