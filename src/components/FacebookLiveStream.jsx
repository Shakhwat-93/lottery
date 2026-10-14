import React, { useState, useEffect, useRef } from 'react';

/**
 * ============================================================================
 * FACEBOOK LIVE VIDEO STREAM COMPONENT (DEMO)
 * ============================================================================
 * Placed directly above the Official Agent Certificate.
 * 
 * TO REPLACE WITH REAL FACEBOOK LIVE LATER:
 * Option A (MP4 / Stream URL): Change the `DEMO_VIDEO_SRC` constant below.
 * Option B (Facebook iframe embed): Replace the <video> element with your Facebook embed <iframe>.
 * ============================================================================
 */

const DEMO_VIDEO_SRC = '/hero-section.mp4';
const DEMO_POSTER_SRC = '/assets/site/top-office.jpg';

const LIVE_COMMENTS = [
  { id: 1, name: 'মোঃ রফিক', text: 'ফাহিম ভাইয়ের রেজাল্ট ১০০% সঠিক 👍', time: '১ মিনিট আগে' },
  { id: 2, name: 'আব্দুল মান্নান', text: 'লাইভ দেখে অনলাইন ফর্ম পূরণ করলাম ❤️', time: '২ মিনিট আগে' },
  { id: 3, name: 'কামরুল হাসান', text: 'বিশ্বস্ত ও আসল এজেন্ট ফাহিম ভাই 🔥', time: '৩ মিনিট আগে' },
  { id: 4, name: 'সজিব আহমেদ', text: 'থ্যাংক ইউ ভাই পেপারের জন্য 🙏', time: '৪ মিনিট আগে' },
  { id: 5, name: 'তারেক রহমান', text: 'সরকারি লাইসেন্সপ্রাপ্ত সেরা এজেন্ট 🏆', time: '৫ মিনিট আগে' },
];

export default function FacebookLiveStream() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [viewers, setViewers] = useState(4268);
  const [activeCommentIndex, setActiveCommentIndex] = useState(0);
  const [reactions, setReactions] = useState([]);

  // 1. Natural live viewer count fluctuation (e.g. 4,260 - 4,295)
  useEffect(() => {
    const interval = setInterval(() => {
      setViewers((prev) => {
        const delta = Math.floor(Math.random() * 9) - 4; // -4 to +4
        return Math.max(4150, Math.min(4380, prev + delta));
      });
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  // 2. Cycling live comments
  useEffect(() => {
    const commentInterval = setInterval(() => {
      setActiveCommentIndex((prev) => (prev + 1) % LIVE_COMMENTS.length);
    }, 4500);
    return () => clearInterval(commentInterval);
  }, []);

  // 3. Floating live reactions (Facebook hearts, likes, wows)
  useEffect(() => {
    const reactionIcons = ['❤️', '👍', '🔥', '😮', '👏'];
    const reactionInterval = setInterval(() => {
      const newReaction = {
        id: Date.now() + Math.random(),
        icon: reactionIcons[Math.floor(Math.random() * reactionIcons.length)],
        left: 65 + Math.random() * 25, // random X position (65% to 90%)
      };
      setReactions((prev) => [...prev.slice(-6), newReaction]);
    }, 1800);
    return () => clearInterval(reactionInterval);
  }, []);

  // Autoplay muted on mount
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlay = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <div className="fb-live-card" aria-label="Facebook Live Streaming - Fahim Chowdhury">
      {/* 1. Facebook Live Top Navigation & Identity Bar */}
      <div className="fb-live-header">
        <div className="fb-author-info">
          <div className="fb-avatar-ring">
            <img
              src="/assets/logo.png"
              alt="Fahim Chowdhury Official"
              className="fb-avatar-img"
              width="44"
              height="44"
            />
            <span className="fb-avatar-live-badge">LIVE</span>
          </div>

          <div className="fb-author-meta">
            <div className="fb-author-title">
              <strong>ফাহিম চৌধুরী (Fahim Chowdhury)</strong>
              <svg className="fb-verified-tick" viewBox="0 0 24 24" width="16" height="16" aria-label="Verified">
                <path
                  fill="#1877F2"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                />
              </svg>
            </div>
            <div className="fb-sub-meta">
              <span className="fb-live-pill">
                <span className="fb-live-dot" />
                LIVE
              </span>
              <span className="fb-meta-desc">থাইল্যান্ড লটারি অফিশিয়াল লাইভ সম্প্রচার</span>
            </div>
          </div>
        </div>

        <div className="fb-live-stats-row">
          <div className="fb-viewers-tag" title="Live Viewers">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
            </svg>
            <span>{viewers.toLocaleString('en-US')}</span>
          </div>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="fb-follow-button"
            aria-label="Follow on Facebook"
          >
            + Follow
          </a>
        </div>
      </div>

      {/* 2. Facebook Live Video Player Container */}
      <div className="fb-video-container" onClick={togglePlay}>
        <video
          ref={videoRef}
          className="fb-video-element"
          playsInline
          loop
          muted={isMuted}
          poster={DEMO_POSTER_SRC}
        >
          <source src={DEMO_VIDEO_SRC} type="video/mp4" />
        </video>

        {/* Video Overlay Watermark & Live Indicators */}
        <div className="fb-video-overlay-top">
          <div className="fb-broadcast-badge">
            <span className="live-blink-circle" />
            <span>ফেসবুক লাইভ সম্প্রচার</span>
          </div>
          <span className="fb-watermark-logo">facebook live</span>
        </div>

        {/* Floating Facebook Live Reactions */}
        <div className="fb-floating-reactions-box" aria-hidden="true">
          {reactions.map((r) => (
            <span key={r.id} className="fb-floating-emoji" style={{ left: `${r.left}%` }}>
              {r.icon}
            </span>
          ))}
        </div>

        {/* Dynamic Live Comment Notification Bubble */}
        <div className="fb-live-comment-bubble" aria-live="polite">
          <div className="comment-user-icon">💬</div>
          <div className="comment-content">
            <strong className="comment-author">{LIVE_COMMENTS[activeCommentIndex].name}:</strong>
            <span className="comment-body">{LIVE_COMMENTS[activeCommentIndex].text}</span>
          </div>
        </div>

        {/* Center Play/Pause Overlay Indicator (shows when paused) */}
        {!isPlaying && (
          <div className="fb-center-play-overlay">
            <div className="fb-play-circle" title="Play Video">
              <svg viewBox="0 0 24 24" width="34" height="34" fill="#FFFFFF">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className="fb-tap-hint">ভিডিও প্লে করতে ট্যাপ করুন</span>
          </div>
        )}

        {/* Sound / Unmute Control Button */}
        <button
          type="button"
          className="fb-audio-toggle-btn"
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute Sound (সাউন্ড চালু করুন)' : 'Mute Sound (সাউন্ড বন্ধ করুন)'}
          title={isMuted ? 'Unmute (সাউন্ড শুনুন)' : 'Mute (সাউন্ড মিউট করুন)'}
        >
          {isMuted ? (
            <>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
              </svg>
              <span>সাউন্ড শুনুন</span>
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
              <span>সাউন্ড চালু আছে</span>
            </>
          )}
        </button>
      </div>

      {/* 3. Facebook Live Bottom Reactions & Interaction Bar */}
      <div className="fb-live-footer">
        <div className="fb-action-buttons">
          <button type="button" className="fb-action-btn" title="Like">
            <span className="fb-icon">👍</span>
            <span>১.৪K</span>
          </button>
          <button type="button" className="fb-action-btn" title="Comment">
            <span className="fb-icon">💬</span>
            <span>৪২০</span>
          </button>
          <button type="button" className="fb-action-btn" title="Share">
            <span className="fb-icon">↗</span>
            <span>২৮৬</span>
          </button>
        </div>

        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="fb-watch-live-btn"
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="#FFFFFF" aria-hidden="true">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          <span>ফেসবুকে লাইভ দেখুন</span>
        </a>
      </div>
    </div>
  );
}
