import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

const SLIDE_PAPERS = [
  { id: 1, label: 'Paper 01 - 3UP Touch', src: '/assets/game/game-01.jpg', tag: 'VIP 3-UP SET' },
  { id: 2, label: 'Paper 02 - Master Digit', src: '/assets/game/game-02.jpg', tag: 'SURE DIGIT' },
  { id: 3, label: 'Paper 03 - Cut Number', src: '/assets/game/game-03.jpg', tag: 'TOTAL CUT' },
  { id: 4, label: 'Paper 04 - Down Set', src: '/assets/game/game-04.jpg', tag: '2D SURE PAIR' },
  { id: 5, label: 'Paper 05 - Win Chart', src: '/assets/game/game-05.jpg', tag: 'ROYAL CHART' },
  { id: 6, label: 'Paper 06 - Final VIP', src: '/assets/game/game-06.jpg', tag: 'FINAL 100%' },
  { id: 7, label: 'Paper 07 - Mega Cut', src: '/assets/game/game-08.jpg', tag: 'PREMIUM DIGIT' },
  { id: 8, label: 'Paper 08 - King Touch', src: '/assets/game/game-09.jpg', tag: 'SURE WINNER' }
];

export default function SurePaperSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const totalSlides = SLIDE_PAPERS.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Auto-play interval (pauses on hover)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 3800);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  // Touch swipe support for mobile devices
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  return (
    <section className="section slider-section reveal-on-scroll" id="sure-papers-slider" aria-label="100% Sure Paper Slider">
      <div className="section-heading">
        <p className="eyebrow">
          <span className="alert-fire-icon" aria-hidden="true">⚡</span> <strong className="clarity-digit">100%</strong> সিওর পেপার
        </p>
        <h2>আসন্ন ড্র-এর সিওর পেপার গ্যালারি</h2>
        <p>
          আসন্ন ড্র-এর জন্য নির্ধারিত অফিসিয়াল সিওর পেপারসমূহ:
        </p>
      </div>

      <div
        className="luxury-slider-wrapper"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Slider Controls: Prev Button */}
        <button
          type="button"
          className="slider-nav-btn prev-btn"
          onClick={prevSlide}
          aria-label="Previous Sure Paper"
        >
          <span>‹</span>
        </button>

        {/* Slider Track Container */}
        <div className="slider-track-window">
          <div
            className="slider-track"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {SLIDE_PAPERS.map((paper, idx) => (
              <div
                key={paper.id}
                className={`slider-slide ${idx === currentIndex ? 'active-slide' : ''}`}
                aria-hidden={idx !== currentIndex}
              >
                <div className="slide-card">
                  <div className="slide-badge-top">
                    <span className="slide-tag">{paper.tag}</span>
                    <span className="slide-counter">
                      {idx + 1} / {totalSlides}
                    </span>
                  </div>

                  <div
                    className="slide-image-wrapper"
                    onClick={() => setModalImage(paper)}
                    role="button"
                    tabIndex={0}
                    title="ক্লিক করে ফুল স্ক্রিন দেখুন"
                  >
                    <img
                      src={paper.src}
                      alt={`Thailand Lottery 100% Sure ${paper.label}`}
                      className="slide-image"
                      loading="lazy"
                    />
                    <span className="slide-zoom-hint">🔍 ফুল ভিউ</span>
                  </div>

                  <div className="slide-footer-meta">
                    <strong>{paper.label}</strong>
                    <button
                      type="button"
                      className="slide-zoom-btn"
                      onClick={() => setModalImage(paper)}
                    >
                      ফুল ভিউ ↗
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Slider Controls: Next Button */}
        <button
          type="button"
          className="slider-nav-btn next-btn"
          onClick={nextSlide}
          aria-label="Next Sure Paper"
        >
          <span>›</span>
        </button>
      </div>

      {/* Pagination Dot Indicators */}
      <div className="slider-dots-group" role="tablist" aria-label="Slider navigation dots">
        {SLIDE_PAPERS.map((paper, idx) => (
          <button
            key={paper.id}
            type="button"
            className={`slider-dot ${idx === currentIndex ? 'active-dot' : ''}`}
            onClick={() => goToSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            role="tab"
            aria-selected={idx === currentIndex}
          />
        ))}
      </div>

      {/* Bottom CTA to View All Papers */}
      <div className="slider-bottom-action">
        <Link className="button primary slider-all-btn" to="/game">
          🎯 সকল পেপার দেখুন
        </Link>
      </div>

      {/* Fullscreen Lightbox Zoom Modal with Fade In/Out */}
      {modalImage && (
        <div
          className="winner-modal-overlay modal-fade-in"
          onClick={() => setModalImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label={modalImage.label}
        >
          <div className="winner-modal-card modal-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="winner-modal-header">
              <strong>{modalImage.label} ({modalImage.tag})</strong>
              <button
                type="button"
                className="winner-modal-close"
                onClick={() => setModalImage(null)}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
            <div className="winner-modal-body">
              <img
                src={modalImage.src}
                alt={modalImage.label}
                className="winner-modal-img"
              />
            </div>
            <div className="winner-modal-footer">
              <span>The Government Lottery Office (GLO) 100% Authentic Papers</span>
              <button
                type="button"
                className="button secondary"
                onClick={() => setModalImage(null)}
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
