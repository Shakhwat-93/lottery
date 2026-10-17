import React from 'react';
import { Link } from 'react-router-dom';

export default function CustomerReview({ videoRef }) {
  return (
    <section className="section review-section reveal-on-scroll" id="customer-review">
      <div className="review-layout">
        <div className="review-copy">
          <p className="eyebrow">ความคิดเห็น • VERIFIED REVIEWS</p>
          <h2>Real Customer Video Testimonials</h2>
          <p className="review-subtext">
            Authentic member video testimonials with verified draw results & direct payouts. সম্মানিত সদস্যদের সরাসরি ভিডিও প্রতিক্রিয়া:
          </p>

          <div className="review-stats-card">
            <div className="review-stars-row">
              <span className="review-stars" aria-label="5 stars rating">
                ★★★★★
              </span>
              <span className="review-score">4.9 / 5.0</span>
              <span className="verified-badge-mini">Verified Review</span>
            </div>
            <p className="review-stats-note">ยืนยันจากสมาชิก 10,000+ ราย • 10,000+ Verified Members (১০,০০০+ নিবন্ধিত সদস্য)</p>
          </div>

          <div className="review-features">
            <div className="review-feature-item">
              <span className="feature-check">&#10003;</span>
              <div>
                <strong>1. 100% UNEDITED VIDEO • ลูกค้าตัวจริง</strong>
                <small>সরাসরি জয়ী সদস্যদের বাস্তব ভিডিও অভিজ্ঞতা ও জেনুইন প্রমাণ।</small>
              </div>
            </div>
            <div className="review-feature-item">
              <span className="feature-check">&#10003;</span>
              <div>
                <strong>2. GUARANTEED PAYOUT • ได้รับเงินรางวัลจริง</strong>
                <small>সরাসরি ব্যাংক বা একাউন্টে শতভাগ দ্রুত পে-আউট নিশ্চয়তা।</small>
              </div>
            </div>
            <div className="review-feature-item">
              <span className="feature-check">&#10003;</span>
              <div>
                <strong>3. GLO ACCREDITED SUPPORT • มีเอกสารรับรอง</strong>
                <small>২৪/৭ অফিসিয়াল গাইডেন্স ও সার্বক্ষণিক ভেরিফাইড সাপোর্ট।</small>
              </div>
            </div>
          </div>

          <div className="review-actions">
            <a className="button primary" href="#online-form">
              ลงทะเบียน • Register Form
            </a>
            <Link className="button secondary" to="/game">
              ดูเอกสาร • Sure Papers
            </Link>
          </div>
        </div>

        <div className="review-video-wrapper">
          <div className="phone-frame">
            <div className="phone-speaker" />
            <div className="phone-header">
              <span className="live-dot" />
              <strong>CUSTOMER REVIEW • ความคิดเห็นจากลูกค้า</strong>
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
              เบราว์เซอร์ของคุณไม่รองรับการเล่นวิดีโอ
            </video>
            <div className="phone-footer-bar">
              <span>&#10003; 100% Verified Customer Feedback • ยืนยันแล้ว</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
