import React from 'react';
import { Link } from 'react-router-dom';

export default function ThreeUpGameBox() {
  return (
    <section className="section three-set-home-strip reveal-on-scroll" id="three-set-game-section">
      <div className="three-set-home-card">
        <div className="three-set-glow-ring" aria-hidden="true" />
        
        <div className="three-set-home-text">
          <span className="three-set-badge-tag">✦ VIP OFFICIAL DOCUMENT ✦</span>
          <h3>থাইল্যান্ড লটারি 3 সেট গেম পেপার 2026</h3>
          <p>অফিসিয়াল 3 সেট / 3 আপ গেম পেপার ও লাইসেন্সকৃত অনুমোদনপত্র দেখতে নিচে ক্লিক করুন:</p>
        </div>

        <div className="three-up-interactive-action-area">
          <Link
            to="/3-up-game"
            className="three-set-glowing-btn"
            aria-label="Open 3 Up Game Page"
          >
            <span className="three-set-shimmer" aria-hidden="true" />
            <span className="three-set-icon" aria-hidden="true">👑</span>
            <span className="three-set-text">3 UP GAME</span>
            <span className="three-set-arrow" aria-hidden="true">➔</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
