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
      <video
        ref={videoRef}
        className="top-showcase-video"
        id="hero-video"
        playsInline
        preload="auto"
        poster="/assets/site/top-office.jpg"
        onClick={handleToggle}
        style={{ cursor: 'pointer' }}
      >
        <source src="/hero-section.mp4" type="video/mp4" />
        <img src="/assets/site/top-office.jpg" alt="Thailand Lottery office banner" />
      </video>

      {/* Luxury 24K Gold Play Button in Center - Disappears completely when video plays */}
      {!isPlaying && (
        <button
          type="button"
          className="hero-center-play-btn paused"
          onClick={handleToggle}
          aria-label="Play video (ভিডিও প্লে করুন)"
          title="Play (ভিডিও প্লে করুন)"
        >
          <span className="hero-play-pulse" aria-hidden="true" />
          <span className="hero-play-icon-wrap">
            <svg className="hero-play-svg play-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </section>
  );
}
