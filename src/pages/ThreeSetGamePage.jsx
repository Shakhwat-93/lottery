import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import LogoPageTransition from '../components/LogoPageTransition';

// Web Audio API Synthesizer
class ThreeSetAudioController {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  playChime(type = 1) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const freq = type === 1 ? 783.99 : 880.00; // G5 or A5
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.45);

      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 1.5, now);
      gain2.gain.setValueAtTime(0.06, now);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now);
      osc2.stop(now + 0.2);
    } catch (_) {}
  }
}

const audioCtrl = new ThreeSetAudioController();

export default function ThreeSetGamePage() {
  const navigate = useNavigate();
  const [showLogoTransition, setShowLogoTransition] = useState(true);
  const [activeDate, setActiveDate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Fullscreen body lock & Escape key
  useEffect(() => {
    document.body.classList.add('jackpot-page-active');
    window.scrollTo(0, 0);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (modalOpen) {
          setModalOpen(false);
        } else {
          navigate('/');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('jackpot-page-active');
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate, modalOpen]);

  const toggleMute = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    audioCtrl.muted = nextState;
  };

  const handleLogoComplete = () => {
    setShowLogoTransition(false);
  };

  const handleDateClick = (date, type) => {
    setActiveDate(date);
    audioCtrl.playChime(type);
    setModalOpen(true);
  };

  return (
    <>
      {/* 1. Cinematic Logo Motion Graphic Transition */}
      {showLogoTransition && (
        <LogoPageTransition
          badgeText="👑 VIP 3 SET GAME 2026"
          title="THAILAND OFFICIAL LOTTERY"
          subtitle="GOVERNMENT LOTTERY OFFICE • 3 SET VIP PORTAL"
          statusText="VERIFYING 3 SET GAME VIP DATES..."
          duration={1700}
          onComplete={handleLogoComplete}
        />
      )}

      {/* 2. Fullscreen 3 Set Game 2-Date Chamber */}
      <main
        className="jackpot-fullscreen-chamber three-set-chamber"
        aria-label="3 Set Game VIP Draw Dates Fullscreen Screen"
      >
        {/* Ambient Animated Gold Glow Mesh & Radial Corona Rays */}
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
          <div className="jackpot-shimmer-aurora" />
          <div className="jackpot-floating-sparkles">
            {Array.from({ length: 18 }).map((_, i) => (
              <span key={i} className={`sparkle-dot sparkle-${(i % 5) + 1}`} />
            ))}
          </div>
        </div>

        {/* Top Minimal Navigation Bar */}
        <header className="jackpot-top-controls">
          <button
            type="button"
            className="jackpot-ctrl-btn jackpot-audio-btn"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
            title={isMuted ? 'সাউন্ড চালু করুন' : 'সাউন্ড বন্ধ করুন'}
          >
            <span>{isMuted ? '🔇' : '🔊'}</span>
          </button>

          <div className="jackpot-top-badge">
            <span className="live-pulse-dot" />
            <span>3 SET GAME VIP DRAW DATES</span>
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

        {/* Center Stage: The 2 Glowing Dates */}
        <div className="jackpot-center-stage three-set-dates-stage">
          {/* Header Crown Eyebrow */}
          <div className="jackpot-eyebrow-wrap">
            <div className="jackpot-crown-pill">
              <span className="crown-emoji">👑</span>
              <span className="crown-text">3 SET VIP GAME 2026</span>
            </div>
            <h1 className="jackpot-stage-title">
              ★ OFFICIAL VIP DRAW DATES ★
            </h1>
            <p className="three-set-date-hint">
              অফিসিয়াল ৩ সেট গেম পেপার দেখতে নিচের ড্র তারিখে ক্লিক করুন:
            </p>
          </div>

          {/* THE 2 GLOWING DATE BUTTONS */}
          <div className="review-glow-buttons-row three-set-glow-row" aria-label="3 Set Game VIP Draw Dates">
            {/* Date Button 1: 2/12/2069 */}
            <button
              type="button"
              className={`review-super-glow-btn btn-date-1 ${activeDate === '2/12/2069' ? 'is-active' : ''}`}
              onClick={() => handleDateClick('2/12/2069', 1)}
              aria-label="VIP Draw Date 2/12/2069"
            >
              <span className="shimmer-sweep" aria-hidden="true" />
              <div className="btn-content-inner">
                <span className="btn-badge-label">
                  <span className="btn-live-dot" /> VIP DRAW
                </span>
                <strong className="btn-main-date">2/12/2069</strong>
                <span className="btn-action-hint">ক্লিক করে ৩ সেট পেপার দেখুন ➔</span>
              </div>
            </button>

            {/* Date Button 2: 20/21/2069 */}
            <button
              type="button"
              className={`review-super-glow-btn btn-date-2 ${activeDate === '20/21/2069' ? 'is-active' : ''}`}
              onClick={() => handleDateClick('20/21/2069', 2)}
              aria-label="Special Draw Date 20/21/2069"
            >
              <span className="shimmer-sweep" aria-hidden="true" />
              <div className="btn-content-inner">
                <span className="btn-badge-label">
                  <span className="btn-live-dot" /> SPECIAL DRAW
                </span>
                <strong className="btn-main-date">20/21/2069</strong>
                <span className="btn-action-hint">ক্লিক করে ৩ সেট পেপার দেখুন ➔</span>
              </div>
            </button>
          </div>

          {/* Minimal Bottom Actions */}
          <div className="jackpot-bottom-links" style={{ marginTop: '32px' }}>
            <Link to="/form" className="jackpot-subtle-link">
              <span>মেম্বারশিপ ফর্ম ✍️</span>
            </Link>
            <span className="link-divider">•</span>
            <Link to="/vip-agency-code" className="jackpot-subtle-link">
              <span>ভিআইপি এজেন্সি কোড 👑</span>
            </Link>
            <span className="link-divider">•</span>
            <Link to="/" className="jackpot-subtle-link">
              <span>হোমপেজ 🏠</span>
            </Link>
          </div>
        </div>

        {/* Film Texture & Edge Vignette */}
        <div className="jackpot-vignette-overlay" aria-hidden="true" />
      </main>

      {/* Lightbox Modal for 3 Set Game Paper */}
      {modalOpen && (
        <div
          className="modal-backdrop"
          onClick={() => setModalOpen(false)}
          role="dialog"
          aria-modal="true"
          style={{ zIndex: 9999999 }}
        >
          <div
            className="modal-content three-set-modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '780px' }}
          >
            <div className="modal-header">
              <h3>Thailand Official 3 Set Game • VIP Draw ({activeDate})</h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setModalOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div
              className="modal-body three-set-modal-body"
              style={{ textAlign: 'center', background: '#071739', padding: '1rem' }}
            >
              <img
                src="/assets/site/3-set-game.jpg"
                alt={`Thailand Official 3 Set Game - Draw Date ${activeDate}`}
                className="three-set-modal-img"
                style={{ maxHeight: '80vh', width: 'auto', maxWidth: '100%', objectFit: 'contain', borderRadius: '8px' }}
              />
            </div>
            <div
              style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                padding: '1rem',
                background: '#05112B',
                flexWrap: 'wrap'
              }}
            >
              <Link to="/form" className="button primary" onClick={() => setModalOpen(false)}>
                মেম্বারশিপ ফর্ম পূরণ করুন ✍️
              </Link>
              <a
                href="/assets/site/3-set-game.jpg"
                target="_blank"
                rel="noopener noreferrer"
                className="button secondary"
              >
                ফুল ভিউ ↗
              </a>
              <button
                type="button"
                className="button secondary"
                onClick={() => setModalOpen(false)}
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
