import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CustomerReview({ videoRef }) {
  const [activeDate, setActiveDate] = useState('2/12/2069');

  const handleDateSelect = (date) => {
    setActiveDate(date);
    if (videoRef?.current) {
      videoRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
      }
    }
  };

  return (
    <section className="section review-section reveal-on-scroll" id="customer-review">
      {/* 2 Animated Glowing Highlight Buttons directly above Customer Feedback */}
      <div className="review-glow-cta-container" aria-label="Customer Feedback Draw Date Selector">
        <div className="review-glow-cta-header">
          <span className="review-glow-pulsing-badge">
            <span className="glow-radar-ping" aria-hidden="true" />
            <span className="glow-badge-text">✦ অফিশিয়াল ভিআইপি ড্র রেজাল্ট ও ফিডব্যাক ✦</span>
          </span>
        </div>

        <div className="review-glow-buttons-row">
          <button
            type="button"
            className={`review-super-glow-btn btn-date-1 ${activeDate === '2/12/2069' ? 'is-active' : ''}`}
            onClick={() => handleDateSelect('2/12/2069')}
            aria-pressed={activeDate === '2/12/2069'}
          >
            <span className="shimmer-sweep" aria-hidden="true" />
            <span className="btn-glow-aura" aria-hidden="true" />
            <div className="btn-content-inner">
              <span className="btn-badge-label">
                <span className="btn-live-dot" /> VIP DRAW
              </span>
              <strong className="btn-main-date">2/12/2069</strong>
              <span className="btn-action-hint">ক্লিক করে ভিডিও দেখুন ➔</span>
            </div>
          </button>

          <button
            type="button"
            className={`review-super-glow-btn btn-date-2 ${activeDate === '20/21/2069' ? 'is-active' : ''}`}
            onClick={() => handleDateSelect('20/21/2069')}
            aria-pressed={activeDate === '20/21/2069'}
          >
            <span className="shimmer-sweep" aria-hidden="true" />
            <span className="btn-glow-aura" aria-hidden="true" />
            <div className="btn-content-inner">
              <span className="btn-badge-label">
                <span className="btn-live-dot" /> SPECIAL DRAW
              </span>
              <strong className="btn-main-date">20/21/2069</strong>
              <span className="btn-action-hint">ক্লিক করে ভিডিও দেখুন ➔</span>
            </div>
          </button>
        </div>
      </div>

      <div className="review-layout">
        <div className="review-copy">
          <p className="eyebrow">ความคิดเห็นจากลูกค้า • GENUINE REVIEWS • সম্মানিত গ্রাহকদের সরাসরি রিভিউ</p>
          <h2>Real Customer Video Feedback</h2>
          <p className="review-subtext">
            সরাসরি জয়ী গ্রাহক ও সদস্যদের ভিডিও অভিজ্ঞতা শুনুন—যেখানে রয়েছে <strong className="clarity-digit">100%</strong> সততা, স্বচ্ছতা এবং সরাসরি ব্যাংক একাউন্টে পুরস্কার ও পেপার পাওয়ার প্রমাণ।
          </p>

          <div className="review-stats-card">
            <div className="review-stars-row">
              <span className="review-stars" aria-label="5 stars rating">
                ★★★★★
              </span>
              <span className="review-score">4.9 / 5.0</span>
              <span className="verified-badge-mini">VERIFIED REVIEW</span>
            </div>
            <p className="review-stats-note">ยืนยันจากสมาชิกและตัวแทนมากกว่า 10,000+ รายการ • 10,000+ সন্তুষ্ট গ্রাহক</p>
          </div>

          <div className="review-features">
            <div className="review-feature-item">
              <span className="feature-check">&#10003;</span>
              <div>
                <strong>1. গ্রাহকদের বাস্তব ভিডিও (Genuine Member Experience)</strong>
                <small>ลูกค้าตัวจริง 100% • কোনো কৃত্রিম বিজ্ঞাপন বা এডিটিং ছাড়া গ্রাহকের নিজস্ব ভিডিও বার্তা।</small>
              </div>
            </div>
            <div className="review-feature-item">
              <span className="feature-check">&#10003;</span>
              <div>
                <strong>2. সঠিক ফলাফল ও পে-আউট নিশ্চয়তা (Guaranteed Payout)</strong>
                <small>ได้รับเงินรางวัลจริง • থাইল্যান্ড সরকারের নির্ধারিত রেজাল্টের সাথে হুবহু মিল ও দ্রুত পেমেন্ট।</small>
              </div>
            </div>
            <div className="review-feature-item">
              <span className="feature-check">&#10003;</span>
              <div>
                <strong>3. অফিসিয়াল সিকিউরিটি ও নিশ্চয়তা (Official Security)</strong>
                <small>ปลอดภัย มีเอกสารรับรอง • 24 ঘণ্টা সার্বক্ষণিক কাস্টমার কেয়ার ও ভেরিফাইড ডকুমেন্ট সাপোর্ট।</small>
              </div>
            </div>
          </div>

          <div className="review-actions">
            <Link className="button primary" to="/form">
              রেজিস্ট্রেশন
            </Link>
            <Link className="button secondary" to="/game">
              সিওর পেপার
            </Link>
          </div>
        </div>

        <div className="review-video-wrapper">
          <div className="phone-frame">
            <div className="phone-speaker" />
            <div className="phone-header">
              <span className="live-dot" />
              <strong>CUSTOMER REVIEW • {activeDate}</strong>
              <span className="thai-badge-mini">TH</span>
            </div>
            <video
              ref={videoRef}
              className="review-video-player"
              id="review-video"
              controls
              playsInline
              preload="metadata"
              poster="/assets/site/review-poster.jpg"
            >
              <source src="/review.mp4" type="video/mp4" />
              Your browser does not support video playback.
            </video>
            <div className="phone-footer-bar">
              <span>&#10003; 100% Verified Customer Feedback ({activeDate})</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
