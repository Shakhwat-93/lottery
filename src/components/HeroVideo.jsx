import React, { useState, useEffect } from 'react';

export default function HeroVideo({ videoRef, onVideoClick }) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef?.current;
    if (!video) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      video.pause();
      video.currentTime = 0;
      setIsPlaying(false);
    };

    video.addEventListener('play', onPlay);
    video.addEventListener('pause', onPause);
    video.addEventListener('ended', onEnded);

    return () => {
      video.removeEventListener('play', onPlay);
      video.removeEventListener('pause', onPause);
      video.removeEventListener('ended', onEnded);
    };
  }, [videoRef]);

  const handleToggle = (e) => {
    e.stopPropagation();
    if (onVideoClick) {
      onVideoClick();
    } else {
      const video = videoRef?.current;
      if (!video) return;
      if (video.paused) {
        video.muted = false;
        video.volume = 1.0;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    }
  };

  return (
    <section
      className={`top-showcase ${isPlaying ? 'is-playing' : 'is-paused'}`}
      aria-label="Thailand Lottery office banner"
    >
      {/* 100% TRUSTED Official Corner Badge */}
      <div className="hero-trusted-glo-badge" aria-label="100% Trusted">
        <span className="trusted-glo-icon-wrap" aria-hidden="true">
          <svg className="trusted-glo-check-svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" stroke="currentColor" strokeWidth="0.8" />
          </svg>
        </span>
        <span className="trusted-glo-text">100% TRUSTED</span>
      </div>

      <video
        ref={videoRef}
        className="top-showcase-video"
        id="hero-video"
        playsInline
        preload="auto"
        poster="/assets/site/hero-video-poster.jpg"
        onClick={handleToggle}
        style={{ cursor: 'pointer' }}
      >
        <source src="/hero-section.mp4" type="video/mp4" />
        <img src="/assets/site/hero-video-poster.jpg" alt="Thailand Lottery Official Studio Video" />
      </video>
    </section>
  );
}
