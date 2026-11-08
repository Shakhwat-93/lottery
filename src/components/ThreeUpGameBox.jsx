import React from 'react';
import { Link } from 'react-router-dom';
import { useVipCodeSettings } from '../hooks/useVipCodeSettings';

export default function ThreeUpGameBox() {
  const settings = useVipCodeSettings();
  const activeYear = settings.activeYear || '2026';
  const title = settings.threeUpTitle || `থাইল্যান্ড লটারি 3 Up গেম পেপার ${activeYear}`;
  const subtitle = settings.threeUpSubtitle || 'অফিসিয়াল 3 আপ গেম পেপার ও লাইসেন্সকৃত অনুমোদনপত্র দেখতে নিচে ক্লিক করুন:';
  const buttonText = settings.threeUpButtonText || '3 UP GAME';

  return (
    <section className="section three-set-home-strip reveal-on-scroll" id="three-set-game-section">
      <div className="three-set-home-card">
        <div className="three-set-glow-ring" aria-hidden="true" />
        
        <div className="three-set-home-text">
          <span className="three-set-badge-tag">✦ VIP OFFICIAL DOCUMENT ✦</span>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>

        <div className="three-up-interactive-action-area">
          <Link
            to="/3-up-game"
            className="three-set-glowing-btn"
            aria-label={`Open ${buttonText} Page`}
          >
            <span className="three-set-shimmer" aria-hidden="true" />
            <span className="three-set-icon" aria-hidden="true">👑</span>
            <span className="three-set-text">{buttonText}</span>
            <span className="three-set-arrow" aria-hidden="true">➔</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
