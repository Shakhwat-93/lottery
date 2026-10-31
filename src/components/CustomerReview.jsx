import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const REVIEW_SLIDES = [
  {
    id: 1,
    numberLabel: '০১',
    title: 'Customer Review 01',
    badge: '100% VERIFIED',
    customerName: 'সরাসরি বিজয়ী গ্রাহক',
    tag: '৩ সেট গেম উইনিং প্রুফ',
    videoSrc: '/reviews/review-1.mp4',
    poster: '/assets/site/review-poster.jpg',
    highlight: 'প্রথম পুরস্কার নিশ্চিত পে-আউট প্রমাণ'
  },
  {
    id: 2,
    numberLabel: '০২',
    title: 'Customer Review 02',
    badge: 'OFFICIAL WINNER',
    customerName: 'লাইভ বিজয়ী রিভিউ',
    tag: 'ভিআইপি ডাইরেক্ট পে-আউট',
    videoSrc: '/reviews/review-2.mp4',
    poster: '/assets/site/review-poster-2.jpg',
    highlight: 'ব্যাংক একাউন্টে সরাসরি পুরস্কার ট্রান্সফার'
  },
  {
    id: 3,
    numberLabel: '০৩',
    title: 'Customer Review 03',
    badge: 'PRIZE RECEIVED',
    customerName: 'প্রবাসী সদস্যের ফিডব্যাক',
    tag: '১০০% বিশ্বস্ত ড্র রেজাল্ট',
    videoSrc: '/reviews/review-3.mp4',
    poster: '/assets/site/review-poster-3.jpg',
    highlight: 'থাই সরকারি অনুমোদিত লাইসেন্সড পেপার'
  },
  {
    id: 4,
    numberLabel: '০৪',
    title: 'Customer Review 04',
    badge: 'VIP MEMBER PROOF',
    customerName: 'গ্রাহকের সরাসরি অভিজ্ঞতা',
    tag: 'রিয়েল পেপার উইনিং গ্যারান্টি',
    videoSrc: '/reviews/review-4.mp4',
    poster: '/assets/site/review-poster-4.jpg',
    highlight: '১০০% সততা ও ২৪ ঘণ্টা বিশ্বস্ত সহায়তা'
  }
];

export default function CustomerReview({ videoRef }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchEndX = useRef(0);
  const touchEndY = useRef(0);

  const currentSlide = REVIEW_SLIDES[currentIndex];

  const goToSlide = (index) => {
    if (index === currentIndex) return;
    if (videoRef && videoRef.current) {
      videoRef.current.pause();
    }
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    const next = (currentIndex + 1) % REVIEW_SLIDES.length;
    goToSlide(next);
  };

  const prevSlide = () => {
    const prev = (currentIndex - 1 + REVIEW_SLIDES.length) % REVIEW_SLIDES.length;
    goToSlide(prev);
  };

  // Reload video source cleanly on slide switch without breaking the DOM ref
  useEffect(() => {
    if (videoRef && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.load();
    }
  }, [currentIndex, videoRef]);

  // Touch Swipe handlers for mobile smooth flick
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchEndX.current = e.touches[0].clientX;
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    const diffX = touchStartX.current - touchEndX.current;
    const diffY = touchStartY.current - touchEndY.current;
    // Trigger swipe if horizontal flick > 45px and dominant over vertical scroll
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 45) {
      if (diffX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  return (
    <section className="section review-section reveal-on-scroll" id="customer-review">
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
              <strong className="review-score">4.9</strong>
              <span className="review-score-max">/ 5.0</span>
              <span className="review-verified-pill">VERIFIED REVIEWS ({REVIEW_SLIDES.length} VIDEOS)</span>
            </div>
            <p className="review-stats-note">
              ยืนยันจากสมาชิกและตัวแทนมากกว่า 10,000+ รายการ • <strong>10,000+ সন্তুষ্ট গ্রাহক</strong>
            </p>
          </div>

          <div className="review-features-list">
            <div className="review-feature-row">
              <span className="feature-check-badge" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <div className="feature-text-block">
                <h4 className="feature-title">১. গ্রাহকদের বাস্তব ভিডিও (Genuine Member Experience)</h4>
                <p className="feature-desc">ลูกค้าตัวจริง 100% • কোনো কৃত্রিম বিজ্ঞাপন বা এডিটিং ছাড়া গ্রাহকের নিজস্ব ভিডিও বার্তা।</p>
              </div>
            </div>

            <div className="review-feature-row">
              <span className="feature-check-badge" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <div className="feature-text-block">
                <h4 className="feature-title">২. সঠিক ফলাফল ও পে-আউট নিশ্চয়তা (Guaranteed Payout)</h4>
                <p className="feature-desc">ได้รับเงินรางวัลจริง • থাইল্যান্ড সরকারের নির্ধারিত রেজাল্টের সাথে হুবহু মিল ও দ্রুত পেমেন্ট।</p>
              </div>
            </div>

            <div className="review-feature-row">
              <span className="feature-check-badge" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <div className="feature-text-block">
                <h4 className="feature-title">৩. অফিসিয়াল নিরাপত্তা ও সহায়তা (Official Security)</h4>
                <p className="feature-desc">ปลอดภัย มีเอกสารรับรอง • ২৪ ঘণ্টা সার্বক্ষণিক কাস্টমার কেয়ার ও ভেরিফাইড ডকুমেন্ট সাপোর্ট।</p>
              </div>
            </div>
          </div>

          <div className="hero-actions review-actions">
            <Link className="button primary" to="/form">
              রেজিস্ট্রেশন
            </Link>
            <Link className="button secondary" to="/game">
              সিওর পেপার
            </Link>
          </div>
        </div>

        <div className="review-video-wrapper">
          <div
            className="review-slider-container"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Left Nav Arrow */}
            <button
              type="button"
              className="review-slider-arrow prev"
              onClick={prevSlide}
              aria-label="Previous customer review video"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Mobile Phone Mockup Card */}
            <div className="phone-frame review-phone-frame">
              <div className="phone-speaker" />
              <div className="phone-header">
                <div className="phone-header-left">
                  <span className="live-dot" />
                  <strong>REVIEW {currentSlide.numberLabel}</strong>
                </div>
                <div className="phone-header-right">
                  <span className="review-verified-tag">{currentSlide.badge}</span>
                  <span className="thai-badge-mini" title="Thailand Official" />
                </div>
              </div>

              {/* Video Player */}
              <div className="review-video-box">
                <video
                  ref={videoRef}
                  className="review-video-player"
                  id="review-video"
                  controls
                  playsInline
                  preload="metadata"
                  poster={currentSlide.poster}
                >
                  <source src={currentSlide.videoSrc} type="video/mp4" />
                  Your browser does not support video playback.
                </video>
              </div>

              {/* Footer info pill inside phone */}
              <div className="phone-footer-bar">
                <span className="footer-verified-icon">✓</span>
                <span className="footer-customer-name">{currentSlide.customerName}</span>
                <span className="footer-dot">•</span>
                <span className="footer-tag">{currentSlide.tag}</span>
              </div>
            </div>

            {/* Right Nav Arrow */}
            <button
              type="button"
              className="review-slider-arrow next"
              onClick={nextSlide}
              aria-label="Next customer review video"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>

          {/* Slider Pagination Controls & Tabs */}
          <div className="review-slider-controls">
            {/* Top Indicator: Current / Total + Active Title */}
            <div className="review-counter-badge">
              <span className="counter-icon">🎬</span>
              <span className="counter-current">{currentIndex + 1}</span>
              <span className="counter-separator">/</span>
              <span className="counter-total">{REVIEW_SLIDES.length}</span>
              <span className="counter-divider">|</span>
              <span className="counter-title">{currentSlide.customerName}</span>
            </div>

            {/* Pagination Dots */}
            <div className="review-pagination-dots" role="tablist" aria-label="Review video navigation">
              {REVIEW_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  aria-selected={idx === currentIndex}
                  aria-label={`Go to ${slide.title}`}
                  className={`review-dot ${idx === currentIndex ? 'active' : ''}`}
                  onClick={() => goToSlide(idx)}
                />
              ))}
            </div>

            {/* Quick Switcher Pills for Mobile & Desktop */}
            <div className="review-quick-tabs">
              {REVIEW_SLIDES.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  className={`review-tab-btn ${idx === currentIndex ? 'active' : ''}`}
                  onClick={() => goToSlide(idx)}
                >
                  <span className="tab-play-icon">▶</span>
                  <span className="tab-label">রিভিউ {slide.numberLabel}</span>
                </button>
              ))}
            </div>

            <p className="review-mobile-hint">
              <span>👉 সোয়াইপ করুন অথবা বাটনে ট্যাপ করে সকল রিভিউ ভিডিও দেখুন</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
