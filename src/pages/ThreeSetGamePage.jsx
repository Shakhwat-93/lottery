import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import LogoPageTransition from '../components/LogoPageTransition';
import { useVipCodeSettings } from '../hooks/useVipCodeSettings';
import { formatVipDate } from '../lib/vipCodeSettings';

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
  const settings = useVipCodeSettings();
  const date1 = formatVipDate(settings.firstDate);
  const date2 = formatVipDate(settings.secondDate);
  const [showLogoTransition, setShowLogoTransition] = useState(true);
  const [activeDate, setActiveDate] = useState(date1);
  const [activeType, setActiveType] = useState(1);
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
    setActiveType(type);
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
          </div>

          {/* THE 2 GLOWING DATE BUTTONS — STRICTLY VERTICAL STACKED (ONE ON TOP, ONE UNDERNEATH), CENTER ALIGNED */}
          <div className="three-set-vertical-dates-container" aria-label="3 Set Game VIP Draw Dates">
            {/* Date Button 1: date1 (Top) -> Image 2 */}
            <button
              type="button"
              className={`button primary vip-agency-date-btn three-set-date-pill ${activeDate === date1 ? 'is-active' : ''}`}
              onClick={() => handleDateClick(date1, 1)}
              aria-label={`VIP Draw Date ${date1}`}
            >
              <span>{date1}</span>
              <span className="vip-btn-arrow" aria-hidden="true">↗</span>
            </button>

            {/* Date Button 2: date2 (Underneath) -> Image 3 */}
            <button
              type="button"
              className={`button primary vip-agency-date-btn three-set-date-pill ${activeDate === date2 ? 'is-active' : ''}`}
              onClick={() => handleDateClick(date2, 2)}
              aria-label={`Special Draw Date ${date2}`}
            >
              <span>{date2}</span>
              <span className="vip-btn-arrow" aria-hidden="true">↗</span>
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

      {/* Lightbox Modal for 3 Set / 3 Up Game Paper */}
      {modalOpen && (
        <div
          className="three-up-clean-fullscreen"
          onClick={() => setModalOpen(false)}
          role="dialog"
          aria-modal="true"
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
                  <strong className="three-up-brand-title">Thailand Lottery</strong>
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
                <span className="three-up-brand-sub">สำนักงานสลากกินแบ่งรัฐบาล • OFFICIAL PAPER ({activeDate})</span>
              </div>
            </div>

            <div className="three-up-top-actions">
              <button
                type="button"
                className="three-up-switch-pill"
                onClick={() => handleDateClick(activeType === 1 ? date2 : date1, activeType === 1 ? 2 : 1)}
                title="অন্য পেপার দেখুন"
              >
                <span>{activeType === 1 ? `পেপার ২ (${date2}) ➔` : `← পেপার ১ (${date1})`}</span>
              </button>

              <button
                type="button"
                className="three-up-close-btn"
                onClick={() => setModalOpen(false)}
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
              src={activeType === 1 ? '/assets/site/3-up-game-paper-1.jpg' : '/assets/site/3-up-game-paper-2.jpg'}
              alt={activeType === 1 ? `Thailand Official 3D Game Paper - ${activeDate}` : `1 Year 24 Set Calculation Paper - ${activeDate}`}
              className="three-up-paper-hero-img"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </>
  );
}
