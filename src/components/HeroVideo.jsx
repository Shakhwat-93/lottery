import React from 'react';

export default function HeroVideo({ videoRef, onVideoClick }) {
  return (
    <section className="top-showcase" aria-label="Thailand Lottery office banner">
      <video
        ref={videoRef}
        className="top-showcase-video"
        id="hero-video"
        autoPlay
        loop
        playsInline
        preload="auto"
        poster="/assets/site/top-office.jpg"
        onClick={onVideoClick}
        style={{ cursor: 'pointer' }}
      >
        <source src="/hero-section.mp4" type="video/mp4" />
        <img src="/assets/site/top-office.jpg" alt="Thailand Lottery office banner" />
      </video>
      <div className="top-showcase-verified" aria-label="Official Verified Badge" title="Official Verified">
        <svg className="verified-blue-tick" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="#1D9BF0"
            d="M22.25 12c0-1.43-.88-2.67-2.19-3.19.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.52-1.31-1.76-2.19-3.19-2.19s-2.67.88-3.19 2.19c-1.39-.46-2.9-.2-3.91.81s-1.27 2.52-.81 3.91C2.93 9.33 2.05 10.57 2.05 12s.88 2.67 2.19 3.19c-.46 1.39-.2 2.9.81 3.91s2.52 1.27 3.91.81c.52 1.31 1.76 2.19 3.19 2.19s2.67-.88 3.19-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.52 2.19-1.76 2.19-3.19z"
          />
          <path fill="#FFFFFF" d="M10.09 16.72l-4.14-4.14 1.41-1.41 2.73 2.73 6.13-6.13 1.41 1.41-7.54 7.54z" />
        </svg>
      </div>
    </section>
  );
}
