import React from 'react';
import { Link } from 'react-router-dom';

export default function CustomerReview({ videoRef }) {
  return (
    <section className="section review-section reveal-on-scroll" id="customer-review">
      <div className="review-layout">
        <div className="review-copy">
          <p className="eyebrow">ความคิดเห็นจากลูกค้า • GENUINE REVIEWS • সম্মানিত গ্রাহকদের সরাসরি রিভিউ</p>
          <h2>Real Customer Video Feedback</h2>
          <p className="review-subtext">
            সরাসরি জয়ী গ্রাহক ও সদস্যদের ভিডিও অভিজ্ঞতা শুনুন—যেখানে রয়েছে ১০০% সততা, স্বচ্ছতা এবং সরাসরি ব্যাংক একাউন্টে পুরস্কার ও পেপার পাওয়ার প্রমাণ।
          </p>

          <div className="review-stats-card">
            <div className="review-stars-row">
              <span className="review-stars" aria-label="5 stars rating">
                ★★★★★
              </span>
              <span className="review-score">4.9 / 5.0</span>
              <span className="verified-badge-mini">VERIFIED REVIEW</span>
            </div>
            <p className="review-stats-note">ยืนยันจากสมาชิกและตัวแทนมากกว่า 10,000+ รายการ • ১০,০০০+ সন্তুষ্ট গ্রাহক</p>
          </div>

          <div className="review-features">
            <div className="review-feature-item">
              <span className="feature-check">&#10003;</span>
              <div>
                <strong>১. গ্রাহকদের বাস্তব ভিডিও (Genuine Member Experience)</strong>
                <small>ลูกค้าตัวจริง 100% • কোনো কৃত্রিম বিজ্ঞাপন বা এডিটিং ছাড়া গ্রাহকের নিজস্ব ভিডিও বার্তা।</small>
              </div>
            </div>
            <div className="review-feature-item">
              <span className="feature-check">&#10003;</span>
              <div>
                <strong>২. সঠিক ফলাফল ও পে-আউট নিশ্চয়তা (Guaranteed Payout)</strong>
                <small>ได้รับเงินรางวัลจริง • থাইল্যান্ড সরকারের নির্ধারিত রেজাল্টের সাথে হুবহু মিল ও দ্রুত পেমেন্ট।</small>
              </div>
            </div>
            <div className="review-feature-item">
              <span className="feature-check">&#10003;</span>
              <div>
                <strong>৩. অফিসিয়াল সিকিউরিটি ও নিশ্চয়তা (Official Security)</strong>
                <small>ปลอดภัย มีเอกสารรับรอง • ২৪ ঘণ্টা সার্বক্ষণিক কাস্টমার কেয়ার ও ভেরিফাইড ডকুমেন্ট সাপোর্ট।</small>
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
              <strong>CUSTOMER REVIEW</strong>
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
              <span>&#10003; 100% Verified Customer Feedback</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
