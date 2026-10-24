import React, { useState, useEffect, useRef, useCallback } from 'react';

const WINNER_FORMS = [
  {
    id: 'winner-1',
    nameBn: 'মুহাম্মদ জহুরুল ইসলাম',
    nameEn: 'MOHAMMAD ZOHURUL ISLAM',
    formImg: '/assets/site/winners/winner-form-zohurul.jpg',
    badge: '🏆 1st ক্যাটাগরি বিজয়ী ফরম',
    country: 'সৌদি আরব (Saudi Arabia)',
    agent: 'Md Fahim Chowdhury (TL-001)',
    price: '250 SAR'
  },
  {
    id: 'winner-2',
    nameBn: 'মোঃ বাহার',
    nameEn: 'MD BAHAR',
    formImg: '/assets/site/winners/winner-form-bahar.jpg',
    badge: '👑 মেগা ক্যাটাগরি বিজয়ী ফরম',
    country: 'সৌদি আরব (Saudi Arabia)',
    agent: 'Md Fahim Chowdhury (TL-001)',
    price: '250 SAR'
  }
];

export default function PreviousWinners() {
  const [modalImage, setModalImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const hasDragged = useRef(false);

  const totalWinners = WINNER_FORMS.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalWinners);
  }, [totalWinners]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalWinners) % totalWinners);
  }, [totalWinners]);

  const goToSlide = (idx) => {
    setCurrentIndex(idx);
  };

  // Auto-play interval on mobile (pauses on interaction)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
    hasDragged.current = false;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
    if (Math.abs(touchEndX.current - touchStartX.current) > 12) {
      hasDragged.current = true;
    }
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  const handleCardImageClick = (winner) => {
    if (hasDragged.current) return;
    setModalImage({
      src: winner.formImg,
      title: `${winner.nameBn} (${winner.nameEn}) - Official GLO Winner Form`
    });
  };

  return (
    <section className="section winners-section reveal-on-scroll" id="previous-winners" aria-label="Previous Game Form Winners">
      <div className="section-heading">
        <p className="eyebrow">
          <span className="eyebrow-flag" aria-hidden="true">🏆</span> ผู้ชนะเกมก่อนหน้า • OFFICIAL VERIFIED WINNERS • পূর্ববর্তী গেমের ফর্ম বিজয়ী
        </p>
        <h2>Previous Game Form Winners • সরাসরি বিজয়ী মেম্বারশিপ ফরম</h2>
        <p>
          থাইল্যান্ড সরকারের পূর্ববর্তী ড্র-তে অফিসিয়াল মেম্বারশিপ ফর্ম পূরণ করে যারা সরাসরি ক্যাটাগরি বিজয়ী হয়েছেন—নিচে তাদের মূল ভেরিফায়েড অফিসিয়াল ফরম তুলে ধরা হলো (সম্পূর্ণ বড় করে দেখতে ফর্মের ওপর ক্লিক করুন):
        </p>
      </div>

      {/* Mobile Quick Switcher Tabs */}
      <div className="winner-form-switcher-tabs" role="tablist" aria-label="Winner Select Tabs">
        {WINNER_FORMS.map((winner, idx) => (
          <button
            key={winner.id}
            type="button"
            role="tab"
            aria-selected={currentIndex === idx}
            className={`winner-form-switcher-btn ${currentIndex === idx ? 'active' : ''}`}
            onClick={() => goToSlide(idx)}
          >
            <span className="winner-switcher-icon">{idx === 0 ? '🏆' : '👑'}</span>
            <span className="winner-switcher-name">{winner.nameBn}</span>
          </button>
        ))}
      </div>

      {/* Showcase Container: Grid on Desktop, Swipeable Slider on Mobile */}
      <div
        className="winner-showcase-container"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Navigation Buttons for Mobile */}
        <button
          type="button"
          className="winner-slider-nav-btn prev-btn"
          onClick={prevSlide}
          aria-label="Previous Winner Form"
        >
          <span>‹</span>
        </button>

        <div className="winner-slider-window">
          <div
            className="winner-forms-track winner-forms-grid"
            style={{ '--slide-index': currentIndex }}
          >
            {WINNER_FORMS.map((winner, idx) => (
              <article
                key={winner.id}
                className={`winner-form-card card-enter-anim ${idx === currentIndex ? 'active-winner-slide' : ''}`}
              >
                {/* Form Top Ribbon */}
                <div className="winner-form-card-header">
                  <div className="winner-form-header-title">
                    <span className="winner-form-badge">{winner.badge}</span>
                    <strong className="winner-form-name">
                      {winner.nameBn} <span className="winner-form-name-en">({winner.nameEn})</span>
                    </strong>
                  </div>
                  <span className="winner-form-verified-tag">✓ ভেরিফাইড ফরম</span>
                </div>

                {/* Form Image Container with Zoom overlay */}
                <div
                  className="winner-form-img-wrapper"
                  onClick={() => handleCardImageClick(winner)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleCardImageClick(winner);
                    }
                  }}
                  title="ক্লিক করে ফুল ভিউ দেখুন"
                >
                  <img
                    src={winner.formImg}
                    alt={`Official Membership Registration Form of ${winner.nameEn}`}
                    className="winner-form-main-img"
                    loading="lazy"
                  />
                  <div className="winner-form-hover-overlay">
                    <span className="winner-form-hover-btn">🔍 ফুল ভিউ</span>
                  </div>
                </div>

                {/* Form Card Footer */}
                <div className="winner-form-card-footer">
                  <div className="winner-form-meta">
                    <span className="winner-meta-pill">📍 {winner.country}</span>
                    <span className="winner-meta-pill">✍️ AGENT: {winner.agent}</span>
                  </div>
                  <button
                    type="button"
                    className="button-form-fullscreen"
                    onClick={() => setModalImage({ src: winner.formImg, title: `${winner.nameBn} (${winner.nameEn}) - Official GLO Winner Form` })}
                  >
                    ফুল ভিউ ↗
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="winner-slider-nav-btn next-btn"
          onClick={nextSlide}
          aria-label="Next Winner Form"
        >
          <span>›</span>
        </button>
      </div>

      {/* Mobile Slider Pagination Dots & Hint */}
      <div className="winner-slider-footer-controls">
        <div className="winner-slider-dots" role="tablist" aria-label="Slider Dots">
          {WINNER_FORMS.map((winner, idx) => (
            <button
              key={winner.id}
              type="button"
              className={`winner-slider-dot ${idx === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to ${winner.nameBn}`}
            >
              <span className="dot-inner" />
            </button>
          ))}
        </div>
        <div className="winner-slider-hint">
          <span className="hint-arrow">‹</span>
          <span>ডানে-বামে স্লাইড করুন ({currentIndex + 1} / {totalWinners})</span>
          <span className="hint-arrow">›</span>
        </div>
      </div>

      {/* Lightbox Modal */}
      {modalImage && (
        <div
          className="winner-modal-overlay modal-fade-in"
          onClick={() => setModalImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label={modalImage.title}
        >
          <div className="winner-modal-card winner-form-modal-card modal-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="winner-modal-header">
              <strong>{modalImage.title}</strong>
              <button
                type="button"
                className="winner-modal-close"
                onClick={() => setModalImage(null)}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
            <div className="winner-modal-body winner-form-modal-body">
              <img src={modalImage.src} alt={modalImage.title} className="winner-modal-img winner-form-full-img" />
            </div>
            <div className="winner-modal-footer">
              <span>The Government Lottery Office (GLO) Official Record</span>
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
