import React, { useState, useEffect } from 'react';

/**
 * ============================================================================
 * FACEBOOK LIVE VIDEO STREAM COMPONENT
 * ============================================================================
 * Features the official Facebook Live Video:
 * Source: https://www.facebook.com/share/v/1TeU2wQZqg/
 * Canonical: https://www.facebook.com/LottoLiveThailand/videos/1112938755005390/
 * ============================================================================
 */

const FB_VIDEO_SHARE_URL = 'https://www.facebook.com/share/v/1TeU2wQZqg/';
const FB_EMBED_SRC =
  'https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2FLottoLiveThailand%2Fvideos%2F1112938755005390%2F&show_text=false&width=476&t=0';

const LIVE_COMMENTS = [
  { id: 1, name: 'মোঃ রফিক', text: 'ফাহিম ভাইয়ের রেজাল্ট ১০০% সঠিক 👍', time: '১ মিনিট আগে' },
  { id: 2, name: 'আব্দুল মান্নান', text: 'লাইভ দেখে অনলাইন ফর্ম পূরণ করলাম ❤️', time: '২ মিনিট আগে' },
  { id: 3, name: 'কামরুল হাসান', text: 'বিশ্বস্ত ও আসল এজেন্ট ফাহিম ভাই 🔥', time: '৩ মিনিট আগে' },
  { id: 4, name: 'সজিব আহমেদ', text: 'থ্যাংক ইউ ভাই পেপারের জন্য 🙏', time: '৪ মিনিট আগে' },
  { id: 5, name: 'তারেক রহমান', text: 'সরকারি লাইসেন্সপ্রাপ্ত সেরা এজেন্ট 🏆', time: '৫ মিনিট আগে' },
];

export default function FacebookLiveStream() {
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

  return (
    <div className="fb-live-card" aria-label="Facebook Live Streaming - Lotto Live Thailand">
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
              <strong>ফাহিম চৌধুরী • Lotto Live Thailand</strong>
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
              <span className="fb-meta-desc">থাইল্যান্ড লটারি অফিশিয়াল লাইভ ড্র সম্প্রচার</span>
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
            href={FB_VIDEO_SHARE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="fb-follow-button"
            aria-label="Follow on Facebook"
          >
            + Follow
          </a>
        </div>
      </div>

      {/* 2. Official Facebook Video Player Embed */}
      <div className="fb-video-container">
        <iframe
          src={FB_EMBED_SRC}
          className="fb-iframe-player"
          scrolling="no"
          frameBorder="0"
          allowFullScreen={true}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
          title="Thailand Lottery Official Facebook Live - Lotto Live Thailand"
        />

        {/* Video Overlay Watermark & Live Indicators */}
        <div className="fb-video-overlay-top">
          <div className="fb-broadcast-badge">
            <span className="live-blink-circle" />
            <span>ফেসবুক লাইভ সম্প্রচার</span>
          </div>
          <a
            href={FB_VIDEO_SHARE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="fb-watermark-logo"
            title="Open on Facebook"
          >
            facebook live ↗
          </a>
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
          href={FB_VIDEO_SHARE_URL}
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
