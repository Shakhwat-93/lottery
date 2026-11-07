import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useVipCodeSettings } from '../hooks/useVipCodeSettings';
import { formatVipDate } from '../lib/vipCodeSettings';

export default function ThreeSetGamePage() {
  const settings = useVipCodeSettings();
  const date1 = formatVipDate(settings.firstDate);
  const date2 = formatVipDate(settings.secondDate);
  const brandTitle = settings.headerTitle || 'Thailand Lottery';

  const [fullscreenImage, setFullscreenImage] = useState(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Escape key listener & prevent body scroll when modal is open
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

  const openPaper = (paperType, selectedDate) => {
    if (paperType === 1) {
      // 1 Set 3D Game Paper (Image 2)
      setFullscreenImage({
        src: '/assets/site/3-up-game-paper-1.jpg',
        title: 'Thailand Lottery Official Paper • 1 Set 3D Game',
        date: selectedDate,
        paperType: 1
      });
    } else {
      // 1 Year 24 Set Calculation Paper (Image 3)
      setFullscreenImage({
        src: '/assets/site/3-up-game-paper-2.jpg',
        title: '1 Year 24 Set Calculation Paper 2026',
        date: selectedDate,
        paperType: 2
      });
    }
  };

  return (
    <>
      <Header page="3-set-game" />

      <main className="three-set-page" id="top">
        <div className="three-set-main">
          {/* Page Hero Header */}
          <div className="three-set-page-header" style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <span className="three-set-badge-tag">✦ VIP OFFICIAL 3 UP & CALCULATION PORTAL ✦</span>
            <h1 style={{
              fontFamily: 'var(--font-royal)',
              fontSize: 'clamp(1.75rem, 3.8vw, 2.6rem)',
              color: 'var(--text-navy, #071739)',
              margin: '0.6rem 0 0.4rem',
              fontWeight: 900
            }}>
              থাইল্যান্ড লটারি 3 UP ও ক্যালকুলেশন পেপার 2026
            </h1>
            <p style={{
              color: 'var(--text-secondary, #4A5568)',
              fontSize: '1rem',
              maxWidth: '38rem',
              margin: '0 auto'
            }}>
              নিচের অপশনগুলো থেকে আপনার প্রয়োজনীয় ৩-আপ গেম পেপার বা ১ বছরের ২৪ সেট ক্যালকুলেশন পেপারের ড্র তারিখ নির্বাচন করুন:
            </p>
          </div>

          {/* BOX 1: Game Panel (Agency Code Style) */}
          <section className="game-panel reveal-on-scroll" id="game-strip-section">
            <div>
              <p className="eyebrow">VIP ACCESS</p>
              <h2>Game</h2>
              <p>
                <strong className="clarity-digit">100%</strong> নিশ্চিত অফিসিয়াল ৩-আপ গেম পেপার ও ভিআইপি ড্র রেজাল্ট দেখতে তারিখ নির্বাচন করুন।
              </p>
            </div>

            <div className="game-panel-buttons-stack" aria-label="Game Draw Dates">
              <button
                type="button"
                className="button primary vip-agency-date-btn"
                onClick={() => openPaper(1, date1)}
                aria-label={`Game Draw Date ${date1}`}
              >
                <span>{date1}</span>
                <span className="vip-btn-arrow" aria-hidden="true">↗</span>
              </button>

              <button
                type="button"
                className="button primary vip-agency-date-btn"
                onClick={() => openPaper(1, date2)}
                aria-label={`Game Special Draw Date ${date2}`}
              >
                <span>{date2}</span>
                <span className="vip-btn-arrow" aria-hidden="true">↗</span>
              </button>
            </div>
          </section>

          {/* BOX 2: Calculation Paper Panel (Agency Code Style, Underneath) */}
          <section className="game-panel reveal-on-scroll" id="calculation-paper-section">
            <div>
              <p className="eyebrow">VIP ACCESS</p>
              <h2>Calculation Paper</h2>
              <p>
                <strong className="clarity-digit">100%</strong> নিশ্চিত ১ বছরের ২৪ সেট অফিসিয়াল ক্যালকুলেশন পেপার দেখতে তারিখ নির্বাচন করুন।
              </p>
            </div>

            <div className="game-panel-buttons-stack" aria-label="Calculation Paper Draw Dates">
              <button
                type="button"
                className="button primary vip-agency-date-btn"
                onClick={() => openPaper(2, date1)}
                aria-label={`Calculation Paper Draw Date ${date1}`}
              >
                <span>{date1}</span>
                <span className="vip-btn-arrow" aria-hidden="true">↗</span>
              </button>

              <button
                type="button"
                className="button primary vip-agency-date-btn"
                onClick={() => openPaper(2, date2)}
                aria-label={`Calculation Paper Special Draw Date ${date2}`}
              >
                <span>{date2}</span>
                <span className="vip-btn-arrow" aria-hidden="true">↗</span>
              </button>
            </div>
          </section>

          {/* Navigation CTA */}
          <div style={{ textAlign: 'center', marginTop: '2.5rem', marginBottom: '1.5rem' }}>
            <Link to="/" className="button secondary" style={{ minHeight: '44px', padding: '0.65rem 1.6rem' }}>
              ← হোমে ফিরে যান
            </Link>
          </div>
        </div>
      </main>

      {/* Clean Fullscreen Paper Lightbox Viewport with Verified Main Logo */}
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
                width="40"
                height="40"
              />
              <div className="three-up-brand-text">
                <div className="three-up-title-row">
                  <strong className="three-up-brand-title">{brandTitle}</strong>
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
                <span className="three-up-brand-sub">
                  สำนักงานสลากกินแบ่งรัฐบาล • {fullscreenImage.paperType === 1 ? 'OFFICIAL 3D GAME' : '1 YEAR 24 SET CALCULATION'} ({fullscreenImage.date})
                </span>
              </div>
            </div>

            <div className="three-up-top-actions">
              {/* Quick switch between Game Paper and Calculation Paper */}
              <button
                type="button"
                className="three-up-switch-pill"
                onClick={() => openPaper(fullscreenImage.paperType === 1 ? 2 : 1, fullscreenImage.date)}
                title="অন্য পেপার দেখুন"
              >
                <span>{fullscreenImage.paperType === 1 ? 'ক্যালকুলেশন পেপার ➔' : '← গেম পেপার'}</span>
              </button>

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

      <Footer page="3-set-game" />
    </>
  );
}
