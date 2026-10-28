import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import LogoPageTransition from '../components/LogoPageTransition';

// Web Audio API Synthesizer (zero network requests, instantaneous tactile jackpot audio)
class JackpotAudioController {
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

  playTick() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(650, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.025);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.025);
    } catch (_) {}
  }

  playLock(index = 0) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const now = this.ctx.currentTime;
      const freqs = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
      const freq = freqs[index % freqs.length];

      // Bell chime fundamental
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.35);

      // Shimmering overtone
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2, now);
      gain2.gain.setValueAtTime(0.06, now);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now);
      osc2.stop(now + 0.16);
    } catch (_) {}
  }

  playJackpotWin() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;
    try {
      const notes = [
        { f: 523.25, t: 0.00, d: 0.4 }, // C5
        { f: 659.25, t: 0.09, d: 0.4 }, // E5
        { f: 783.99, t: 0.18, d: 0.4 }, // G5
        { f: 1046.50, t: 0.28, d: 0.6 }, // C6
        { f: 1318.51, t: 0.40, d: 0.8 }, // E6
        { f: 1567.98, t: 0.54, d: 1.4 }  // G6
      ];

      const start = this.ctx.currentTime;
      notes.forEach(({ f, t, d }) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, start + t);
        gain.gain.setValueAtTime(0.2, start + t);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + t + d);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(start + t);
        osc.stop(start + t + d);
      });
    } catch (_) {}
  }
}

const audioCtrl = new JackpotAudioController();

export default function VipAgencyCodePage() {
  const navigate = useNavigate();
  const [showLogoTransition, setShowLogoTransition] = useState(true);
  const [targetDigits] = useState(['1', '6', '8', '1', '6']);
  const [displayedDigits, setDisplayedDigits] = useState(['0', '0', '0', '0', '0']);
  const [lockedStates, setLockedStates] = useState([false, false, false, false, false]);
  const [isJackpotWon, setIsJackpotWon] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const spinIntervalsRef = useRef([]);

  // Fullscreen body lock
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
      spinIntervalsRef.current.forEach((id) => clearInterval(id));
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [navigate]);

  // Handle Mute toggle
  const toggleMute = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    audioCtrl.muted = nextState;
  };

  // Launch the Slot Reel Jackpot Spin Animation
  const startJackpotSpin = useCallback(() => {
    setIsJackpotWon(false);
    setLockedStates([false, false, false, false, false]);
    setDisplayedDigits(['0', '0', '0', '0', '0']);

    // Clear any previous intervals
    spinIntervalsRef.current.forEach((id) => clearInterval(id));
    spinIntervalsRef.current = [];

    // Spinning random numbers interval for each reel
    targetDigits.forEach((_, i) => {
      const intervalId = setInterval(() => {
        setDisplayedDigits((prev) => {
          const next = [...prev];
          next[i] = Math.floor(Math.random() * 10).toString();
          return next;
        });
        if (i === 0) {
          audioCtrl.playTick();
        }
      }, 55);
      spinIntervalsRef.current[i] = intervalId;
    });

    // Sequential locks (Reels 0 -> 4)
    const lockDelays = [450, 850, 1250, 1650, 2050];

    lockDelays.forEach((delay, idx) => {
      setTimeout(() => {
        clearInterval(spinIntervalsRef.current[idx]);
        setDisplayedDigits((prev) => {
          const next = [...prev];
          next[idx] = targetDigits[idx];
          return next;
        });
        setLockedStates((prev) => {
          const next = [...prev];
          next[idx] = true;
          return next;
        });
        audioCtrl.playLock(idx);

        // When the final digit locks in
        if (idx === targetDigits.length - 1) {
          setTimeout(() => {
            setIsJackpotWon(true);
            audioCtrl.playJackpotWin();
            launchConfetti();
          }, 120);
        }
      }, delay);
    });
  }, [targetDigits]);

  // When Logo transition finishes, immediately trigger the jackpot sequence
  const handleLogoComplete = () => {
    setShowLogoTransition(false);
    setTimeout(() => {
      startJackpotSpin();
    }, 150);
  };

  // Copy code to clipboard
  const handleCopyCode = () => {
    const fullCode = targetDigits.join('');
    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullCode).then(() => {
        setCopied(true);
        audioCtrl.playLock(4);
        setTimeout(() => setCopied(false), 2400);
      });
    }
  };

  // HTML5 High-Performance Gold Sparkles & Confetti Canvas
  const launchConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    const colors = ['#FFD700', '#FFE600', '#FFA500', '#FFF5B8', '#FFFFFF', '#D4AF37'];
    const particles = [];
    const particleCount = Math.min(100, Math.floor(width / 12));

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: width / 2 + (Math.random() - 0.5) * 80,
        y: height / 2 + (Math.random() - 0.5) * 50,
        vx: (Math.random() - 0.5) * 16,
        vy: -Math.random() * 14 - 4,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        opacity: 1,
        gravity: 0.38,
        shape: Math.random() > 0.5 ? 'rect' : 'circle'
      });
    }

    let startTime = performance.now();

    const render = (now) => {
      const elapsed = now - startTime;
      ctx.clearRect(0, 0, width, height);

      let activeCount = 0;
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.985;
        p.rotation += p.rotationSpeed;
        p.opacity = Math.max(0, 1 - elapsed / 3600);

        if (p.opacity > 0 && p.y < height + 40) {
          activeCount++;
          ctx.save();
          ctx.globalAlpha = p.opacity;
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.shadowColor = '#FFD700';
          ctx.shadowBlur = 8;

          if (p.shape === 'rect') {
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
          } else {
            ctx.beginPath();
            ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
            ctx.fill();
          }
          ctx.restore();
        }
      });

      if (activeCount > 0 && elapsed < 3800) {
        animationFrameRef.current = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, width, height);
      }
    };

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(render);
  };

  return (
    <>
      {/* 1. Cinematic Logo Motion Graphic Transition */}
      {showLogoTransition && (
        <LogoPageTransition
          badgeText="👑 VIP AGENCY CODE 2026"
          title="THAILAND OFFICIAL LOTTERY"
          subtitle="GOVERNMENT LOTTERY OFFICE • VIP ACCESS"
          statusText="DECRYPTING VIP 5-DIGIT AGENCY CODE..."
          duration={1700}
          onComplete={handleLogoComplete}
        />
      )}

      {/* 2. Fullscreen Jackpot 5-Digit Chamber */}
      <main
        className={`jackpot-fullscreen-chamber ${isJackpotWon ? 'jackpot-won' : ''}`}
        aria-label="VIP Agency Code 5 Digit Reveal Screen"
      >
        {/* Canvas for High-End Gold Confetti */}
        <canvas ref={canvasRef} className="jackpot-confetti-canvas" />

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
            <span>GLO VIP AGENCY CODE</span>
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

        {/* Center Stage: Pure 5-Digit Jackpot Reveal */}
        <div className="jackpot-center-stage">
          {/* Header Crown Eyebrow */}
          <div className="jackpot-eyebrow-wrap">
            <div className="jackpot-crown-pill">
              <span className="crown-emoji">👑</span>
              <span className="crown-text">VIP AGENCY CODE</span>
            </div>
            <h1 className="jackpot-stage-title">
              {isJackpotWon ? '★ VIP AGENCY CODE REVEALED ★' : 'DECRYPTING VIP AGENCY CODE...'}
            </h1>
          </div>

          {/* THE 5 DIGITS CONTAINER */}
          <div
            className={`jackpot-digits-row ${isJackpotWon ? 'is-jackpot-revealed' : ''}`}
            onClick={handleCopyCode}
            role="button"
            tabIndex={0}
            title="ক্লিক করে কোড কপি করুন (16816)"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleCopyCode();
            }}
          >
            {displayedDigits.map((digit, idx) => (
              <div
                key={idx}
                className={`jackpot-digit-card ${lockedStates[idx] ? 'is-locked' : 'is-spinning'}`}
              >
                {/* Metallic Card Border Accents */}
                <div className="card-gold-bezel" aria-hidden="true" />
                <div className="card-glass-specular" aria-hidden="true" />
                <div className="card-radial-glow" aria-hidden="true" />

                {/* The Digit */}
                <span className="jackpot-digit-val" data-digit={digit}>
                  {digit}
                </span>

                {/* Shimmer light sweep */}
                <div className="card-shimmer-sweep" aria-hidden="true" />
              </div>
            ))}
          </div>

          {/* Status & Copy Action */}
          <div className="jackpot-feedback-wrap">
            {copied ? (
              <div className="jackpot-copied-pill">
                <span className="copied-icon">✓</span>
                <span>কোড কপি হয়েছে: <strong>16816</strong></span>
              </div>
            ) : (
              <button
                type="button"
                className="jackpot-action-copy-btn"
                onClick={handleCopyCode}
              >
                <span className="copy-icon">📋</span>
                <span>কোড কপি করুন (16816)</span>
              </button>
            )}
          </div>

          {/* Minimal Bottom Actions */}
          <div className="jackpot-bottom-links">
            <button
              type="button"
              className="jackpot-subtle-link"
              onClick={startJackpotSpin}
            >
              <span>আবার চালান ↺</span>
            </button>
            <span className="link-divider">•</span>
            <Link to="/form" className="jackpot-subtle-link">
              <span>মেম্বারশিপ ফর্ম ✍️</span>
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
    </>
  );
}
