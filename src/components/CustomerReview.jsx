import React from 'react';
import { Link } from 'react-router-dom';

export default function CustomerReview({ videoRef }) {
  return (
    <section className="section review-section reveal-on-scroll" id="customer-review">
      <div className="review-layout">
        <div className="review-copy">
          <p className="eyebrow">VERIFIED REVIEWS</p>
          <h2>গ্রাহকদের বাস্তব ভিডিও রিভিউ</h2>
          <p className="review-subtext">
            সরাসরি জয়ী সদস্যদের বাস্তব ভিডিও প্রতিক্রিয়া:
          </p>

          <div className="review-stats-card">
            <div className="review-stars-row">
              <span className="review-stars" aria-label="5 stars rating">
                ★★★★★
              </span>
              <span className="review-score">4.9 / 5.0</span>
              <span className="verified-badge-mini">Verified Review</span>
            </div>
            <p className="review-stats-note">১০,০০০+ নিবন্ধিত সদস্য (Verified Members)</p>
          </div>

          <div className="review-features">
            <div className="review-feature-item">
              <span className="feature-check">&#10003;</span>
              <div>
                <strong>১. বাস্তব ভিডিও অভিজ্ঞতা</strong>
                <small>সরাসরি জয়ী সদস্যদের বাস্তব ভিডিও মতামত ও প্রমাণ।</small>
              </div>
            </div>
            <div className="review-feature-item">
              <span className="feature-check">&#10003;</span>
              <div>
                <strong>২. শতভাগ পে-আউট নিশ্চয়তা</strong>
                <small>সরাসরি একাউন্টে শতভাগ দ্রুত পে-আউট নিশ্চয়তা।</small>
              </div>
            </div>
            <div className="review-feature-item">
              <span className="feature-check">&#10003;</span>
              <div>
                <strong>৩. সার্বক্ষণিক মেম্বারশিপ সাপোর্ট</strong>
                <small>২৪/৭ অফিসিয়াল গাইডেন্স ও সার্বক্ষণিক সাপোর্ট।</small>
              </div>
            </div>
          </div>

          <div className="review-actions">
            <a className="button primary" href="#online-form">
              রেজিস্ট্রেশন
            </a>
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
