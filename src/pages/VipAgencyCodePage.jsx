import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import LogoPageTransition from '../components/LogoPageTransition';
import { useVipCodeSettings } from '../hooks/useVipCodeSettings';
import { formatVipDate } from '../lib/vipCodeSettings';

// Web Audio API Synthesizer (zero network requests, instantaneous tactile jackpot audio)
class JackpotAudioController {
  constructor() {
    this.ctx = null;
    this.masterGain = null;
    this.compressor = null;
    this.muted = false;
    this.lastTickTime = 0;
    this.lastLockTime = 0;
    this.lastWinTime = 0;
  }

  init() {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      return;
    }
    if (typeof window === 'undefined') return;

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;

      this.ctx = new AudioCtx();

      // Master Compressor for silky acoustic balance, zero clipping & distortion
      this.compressor = this.ctx.createDynamicsCompressor();
      this.compressor.threshold.setValueAtTime(-16, this.ctx.currentTime);
      this.compressor.knee.setValueAtTime(10, this.ctx.currentTime);
      this.compressor.ratio.setValueAtTime(4, this.ctx.currentTime);
      this.compressor.attack.setValueAtTime(0.003, this.ctx.currentTime);
      this.compressor.release.setValueAtTime(0.12, this.ctx.currentTime);

      // Master Gain for smooth output
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.32, this.ctx.currentTime);

      this.masterGain.connect(this.compressor);
      this.compressor.connect(this.ctx.destination);
    } catch (_) {}
  }

  playTick() {
    if (this.muted) return;
    this.init();
    if (!this.ctx || !this.masterGain || this.ctx.state !== 'running') return;

    const now = this.ctx.currentTime;
    // Throttle ticks to avoid audio buffer saturation (min 65ms between ticks)
    if (now - this.lastTickTime < 0.065) return;
    this.lastTickTime = now;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1100, now);
      filter.Q.setValueAtTime(2.5, now);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(680, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.024);

      // Attack (2ms) & decay (22ms) -> 100% click-free & pop-free
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.14, now + 0.002);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.024);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.026);
    } catch (_) {}
  }

  playLock(index = 0) {
    if (this.muted) return;
    this.init();
    if (!this.ctx || !this.masterGain || this.ctx.state !== 'running') return;

    try {
      const now = this.ctx.currentTime;
      // Prevent duplicate/double lock chimes within 120ms
      if (now - this.lastLockTime < 0.12) return;
      this.lastLockTime = now;

      const freqs = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
      const freq = freqs[index % freqs.length];

      // Crisp single bell chime (zero doubling overtone clash)
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.linearRampToValueAtTime(0.22, now + 0.004);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.24);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.26);
    } catch (_) {}
  }

  playJackpotWin() {
    if (this.muted) return;
    this.init();
    if (!this.ctx || !this.masterGain || this.ctx.state !== 'running') return;

    try {
      const now = this.ctx.currentTime;
      // Strict cooldown guard: prevent double-triggering victory fanfare
      if (now - this.lastWinTime < 0.8) return;
      this.lastWinTime = now;

      const start = now + 0.01;
      const notes = [
        { f: 523.25, t: 0.00, d: 0.28 }, // C5
        { f: 659.25, t: 0.08, d: 0.28 }, // E5
        { f: 783.99, t: 0.16, d: 0.32 }, // G5
        { f: 1046.50, t: 0.25, d: 0.72 } // C6 clean resolve
      ];

      notes.forEach(({ f, t, d }) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, start + t);

        gain.gain.setValueAtTime(0.0001, start + t);
        gain.gain.linearRampToValueAtTime(0.20, start + t + 0.005);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + t + d);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(start + t);
        osc.stop(start + t + d + 0.02);
      });
    } catch (_) {}
  }
}

const audioCtrl = new JackpotAudioController();

export default function VipAgencyCodePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const settings = useVipCodeSettings();
  const dateParam = searchParams.get('date') || formatVipDate(settings.firstDate);
  const isLockedForMembership = dateParam !== formatVipDate(settings.firstDate);
  const [showLogoTransition, setShowLogoTransition] = useState(true);
  const targetDigits = useMemo(() => settings.code.split(''), [settings.code]);
  const [displayedDigits, setDisplayedDigits] = useState(['0', '0', '0', '0', '0']);
  const [lockedStates, setLockedStates] = useState([false, false, false, false, false]);
  const [isJackpotWon, setIsJackpotWon] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const spinTimerRef = useRef(null);
  const spinStartTimerRef = useRef(null);
  const spinRunIdRef = useRef(0);
  const hasStartedInitialSpinRef = useRef(false);
  const timeoutsRef = useRef([]);
  const lockedStatesRef = useRef([false, false, false, false, false]);

  // Fullscreen body lock & audio warm-up
  useEffect(() => {
    document.body.classList.add('jackpot-page-active');
    window.scrollTo(0, 0);

    // Warm up Web Audio API on first touch/click
    const warmAudio = () => {
      audioCtrl.init();
      window.removeEventListener('pointerdown', warmAudio);
      window.removeEventListener('keydown', warmAudio);
    };
    window.addEventListener('pointerdown', warmAudio, { once: true });
    window.addEventListener('keydown', warmAudio, { once: true });
    audioCtrl.init();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        navigate('/');
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.classList.remove('jackpot-page-active');
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('pointerdown', warmAudio);
      if (spinTimerRef.current) clearInterval(spinTimerRef.current);
      if (spinStartTimerRef.current) clearTimeout(spinStartTimerRef.current);
      spinRunIdRef.current += 1;
      timeoutsRef.current.forEach((t) => clearTimeout(t));
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

  // Launch the Slot Reel Jackpot Spin Animation (Smooth & single-instance guarded)
  const startJackpotSpin = useCallback(() => {
    const runId = ++spinRunIdRef.current;

    setIsJackpotWon(false);
    lockedStatesRef.current = [false, false, false, false, false];
    setLockedStates([false, false, false, false, false]);
    setDisplayedDigits(['0', '0', '0', '0', '0']);

    // Clear any previous intervals and timeouts
    if (spinTimerRef.current) clearInterval(spinTimerRef.current);
    if (spinStartTimerRef.current) clearTimeout(spinStartTimerRef.current);
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    timeoutsRef.current = [];

    // Single unified ticker timer for all 5 reels (80ms smooth cadence)
    spinTimerRef.current = setInterval(() => {
      if (runId !== spinRunIdRef.current) return;
      setDisplayedDigits((prev) => {
        let changed = false;
        const next = [...prev];
        for (let i = 0; i < 5; i++) {
          if (!lockedStatesRef.current[i]) {
            next[i] = Math.floor(Math.random() * 10).toString();
            changed = true;
          }
        }
        return changed ? next : prev;
      });
      audioCtrl.playTick();
    }, 80);

    // Sequential locks (Reels 0 -> 4)
    const lockDelays = [400, 780, 1160, 1540, 1920];

    lockDelays.forEach((delay, idx) => {
      const timeoutId = setTimeout(() => {
        if (runId !== spinRunIdRef.current) return;
        lockedStatesRef.current[idx] = true;
        setLockedStates((prev) => {
          const next = [...prev];
          next[idx] = true;
          return next;
        });
        setDisplayedDigits((prev) => {
          const next = [...prev];
          next[idx] = targetDigits[idx];
          return next;
        });

        // Play lock chime only on digits 1..4 so final reveal plays a single clean fanfare (zero double-sound)
        if (idx < targetDigits.length - 1) {
          audioCtrl.playLock(idx);
        }

        // When the final digit locks in
        if (idx === targetDigits.length - 1) {
          if (spinTimerRef.current) {
            clearInterval(spinTimerRef.current);
            spinTimerRef.current = null;
          }
          const winTimeout = setTimeout(() => {
            if (runId !== spinRunIdRef.current) return;
            setIsJackpotWon(true);
            audioCtrl.playJackpotWin();
            launchConfetti();
          }, 70);
          timeoutsRef.current.push(winTimeout);
        }
      }, delay);
      timeoutsRef.current.push(timeoutId);
    });
  }, [targetDigits]);

  // When Logo transition finishes, trigger the jackpot sequence ONCE
  const handleLogoComplete = useCallback(() => {
    setShowLogoTransition(false);
    if (!isLockedForMembership && !hasStartedInitialSpinRef.current) {
      hasStartedInitialSpinRef.current = true;
      spinStartTimerRef.current = setTimeout(() => {
        startJackpotSpin();
      }, 150);
    }
  }, [isLockedForMembership, startJackpotSpin]);

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
          badgeText={isLockedForMembership ? '🔒 VIP MEMBERSHIP REQUIRED' : `👑 VIP AGENCY CODE ${settings.activeYear || '2026'}`}
          title="THAILAND OFFICIAL LOTTERY"
          subtitle={dateParam ? `VIP AGENCY ACCESS • ${dateParam}` : 'GOVERNMENT LOTTERY OFFICE • VIP ACCESS'}
          statusText={isLockedForMembership ? 'CHECKING VIP MEMBERSHIP CLEARANCE...' : 'DECRYPTING VIP 5-DIGIT AGENCY CODE...'}
          duration={1700}
          onComplete={handleLogoComplete}
        />
      )}

      {/* 2. Fullscreen Jackpot 5-Digit Chamber */}
      <main
        className={`jackpot-fullscreen-chamber ${isJackpotWon ? 'jackpot-won' : ''} ${isLockedForMembership ? 'chamber-is-membership-locked' : ''}`}
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
            <span className={`live-pulse-dot ${isLockedForMembership ? 'is-locked-dot' : ''}`} />
            <span>GLO VIP AGENCY CODE{dateParam ? ` • ${dateParam}` : ''}</span>
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
            <div className={`jackpot-crown-pill ${isLockedForMembership ? 'is-locked-pill' : ''}`}>
              <span className="crown-emoji">{isLockedForMembership ? '🔒' : '👑'}</span>
              <span className="crown-text">
                {isLockedForMembership ? 'VIP MEMBERSHIP ACCESS' : 'VIP AGENCY CODE'}
              </span>
            </div>
            <h1 className="jackpot-stage-title">
              {isLockedForMembership
                ? '★ VIP AGENCY CODE (LOCKED) ★'
                : (isJackpotWon ? '★ VIP AGENCY CODE REVEALED ★' : 'DECRYPTING VIP AGENCY CODE...')}
            </h1>
            {isLockedForMembership && (
              <p className="jackpot-locked-requirement-text">
                এজেন্সি কোড দেখতে মেম্বারশিপ প্রয়োজন
              </p>
            )}
          </div>

          {/* Trusted Badges Bar */}
          <div className="vip-trusted-badges-row" aria-label="Official Trust Badges">
            <div className="vip-trust-badge-pill">
              <span className="vip-trust-icon">🛡️</span>
              <span>১০০% নিশ্চিত নো মিস</span>
            </div>
            <div className="vip-trust-badge-pill">
              <span className="vip-trust-icon">✓</span>
              <span>100% TRUSTED &amp; VERIFIED</span>
            </div>
            <div className="vip-trust-badge-pill">
              <span className="vip-trust-icon">★</span>
              <span>গভর্নমেন্ট লাইসেন্সপ্রাপ্ত</span>
            </div>
          </div>

          {/* THE 5 DIGITS CONTAINER */}
          <div
            className={`jackpot-digits-row ${isLockedForMembership ? 'is-membership-locked' : (isJackpotWon ? 'is-jackpot-revealed' : '')}`}
            role={isLockedForMembership ? 'region' : 'button'}
            tabIndex={isLockedForMembership ? -1 : 0}
            title={isLockedForMembership ? 'এই কোডটি মেম্বারদের জন্য লক করা' : `ক্লিক করে কোড কপি করুন (${settings.code})`}
            onClick={isLockedForMembership ? undefined : handleCopyCode}
            onKeyDown={isLockedForMembership ? undefined : (e) => {
              if (e.key === 'Enter' || e.key === ' ') handleCopyCode();
            }}
          >
            {isLockedForMembership ? (
              // 5 LOCKED & COVERED CARDS (Code reveal hobe na)
              Array.from({ length: 5 }).map((_, idx) => (
                <div key={idx} className="jackpot-digit-card is-locked-hidden">
                  <div className="card-gold-bezel" aria-hidden="true" />
                  <div className="card-glass-specular" aria-hidden="true" />
                  <div className="card-radial-glow" aria-hidden="true" />

                  {/* Lock symbol instead of number */}
                  <span className="jackpot-digit-lock-icon" aria-hidden="true">
                    🔒
                  </span>

                  <div className="card-shimmer-sweep" aria-hidden="true" />
                </div>
              ))
            ) : (
              // REVEALED DIGITS FOR 01-11-2026
              displayedDigits.map((digit, idx) => (
                <div
                  key={idx}
                  className={`jackpot-digit-card ${lockedStates[idx] ? 'is-locked' : 'is-spinning'}`}
                >
                  <div className="card-gold-bezel" aria-hidden="true" />
                  <div className="card-glass-specular" aria-hidden="true" />
                  <div className="card-radial-glow" aria-hidden="true" />

                  <span className="jackpot-digit-val" data-digit={digit}>
                    {digit}
                  </span>

                  <div className="card-shimmer-sweep" aria-hidden="true" />
                </div>
              ))
            )}
          </div>

          {/* Action Box: Membership Card for 16-11-2026, Copy for 01-11-2026 */}
          {isLockedForMembership ? (
            <div className="vip-membership-locked-card">
              <div className="locked-card-header">
                <span className="locked-card-pulse-icon">✨</span>
                <h2 className="locked-card-title">এজেন্সি কোড নিতে মেম্বারশিপ নিতে হবে</h2>
              </div>
              <p className="locked-card-desc">
                {dateParam ? `${dateParam} তারিখের ` : ''}১০০% নিশ্চিত ভিআইপি ৫-ডিজিট এজেন্সি কোড ও পেপার আনলক করতে এখনই অফিসিয়াল মেম্বারশিপ ফর্ম পূরণ করুন।
              </p>
              <Link
                to="/form"
                className="button primary vip-membership-cta-btn"
                aria-label="এখনই মেম্বারশিপ নিন"
              >
                <span className="vip-cta-crown">👑</span>
                <span>এখনই মেম্বারশিপ নিন</span>
                <span className="vip-cta-arrow">➔</span>
              </Link>
              <p className="locked-card-footnote">
                🔒 ১০০% বিশ্বস্ত ও শতভাগ নিশ্চিত গ্যারান্টি • তাৎক্ষণিক মেম্বারশিপ অনুমোদন
              </p>
            </div>
          ) : (
            <div className="jackpot-feedback-wrap">
              {copied ? (
                <div className="jackpot-copied-pill">
                  <span className="copied-icon">✓</span>
                  <span>কোড কপি হয়েছে: <strong>{settings.code}</strong></span>
                </div>
              ) : (
                <button
                  type="button"
                  className="jackpot-action-copy-btn"
                  onClick={handleCopyCode}
                >
                  <span className="copy-icon">📋</span>
                  <span>কোড কপি করুন ({settings.code})</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Film Texture & Edge Vignette */}
        <div className="jackpot-vignette-overlay" aria-hidden="true" />
      </main>
    </>
  );
}
