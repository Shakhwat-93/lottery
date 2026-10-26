import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function VipAgencyCodePage() {
  const [activeDate, setActiveDate] = useState('2/12/2069');
  const [modalOpen, setModalOpen] = useState(false);
  const paperRef = useRef(null);
  useScrollReveal();

  useEffect(() => {
    document.body.classList.add('vip-agency-code-page');
    window.scrollTo(0, 0);
    return () => {
      document.body.classList.remove('vip-agency-code-page');
    };
  }, []);

  const handleDateSelect = (date) => {
    setActiveDate(date);
    if (paperRef.current) {
      paperRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <>
      <Header page="vip-agency-code" />
      <main className="three-set-main vip-agency-main">
        {/* Topbar navigation */}
        <div className="three-set-topbar">
          <div className="three-set-topbar-inner">
            <div className="three-set-back-group">
              <Link to="/" className="three-set-home-btn" aria-label="Go to Homepage">
                <span>← হোমপেজ</span>
              </Link>
              <Link to="/form" className="three-set-back-btn" aria-label="Go to Membership Form">
                <span>মেম্বারশিপ ফর্ম ✍️</span>
              </Link>
            </div>
            <div className="three-set-verified-tag">
              <span className="live-dot" />
              <span>100% GLO Official VIP Document</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="three-set-hero reveal-on-scroll">
          <div className="three-set-hero-header">
            <span className="premium-tag">
              ราชอาณาจักรไทย • GLO VIP 2026 • 24 SET CALCULATION PAPER
            </span>
            <h1 className="three-set-title">Thailand Lottery VIP Agency Code</h1>
            <p className="three-set-desc">
              থাইল্যান্ড গভর্নমেন্ট লটারি অফিস (GLO) অনুমোদিত ১ বছরের ২৪ সেট ক্যালকুলেশন পেপার (1 Year 24 Set Calculation Paper 2026) ও অফিসিয়াল ভিআইপি এজেন্সি কোড।
            </p>

            <div className="three-set-badges">
              <span className="premium-badge badge-gold">
                <span className="badge-symbol">★</span>
                <span>
                  <strong>VIP AGENCY CODE</strong>
                  <small>অফিসিয়াল ক্যালকুলেশন নথি</small>
                </span>
              </span>
              <span className="premium-badge badge-green">
                <span className="badge-symbol">✓</span>
                <span>
                  <strong>GOVERNMENT VERIFIED</strong>
                  <small>100% খাঁটি পেপার ও কোড</small>
                </span>
              </span>
            </div>
          </div>

          {/* The 2 Glowing Highlight Buttons */}
          <div className="review-glow-cta-container vip-agency-glow-cta" aria-label="VIP Draw Date Selector">
            <div className="review-glow-cta-header">
              <span className="review-glow-pulsing-badge">
                <span className="glow-radar-ping" aria-hidden="true" />
                <span className="glow-badge-text">✦ অফিশিয়াল ভিআইপি ড্র রেজাল্ট ও কোড ✦</span>
              </span>
            </div>

            <div className="review-glow-buttons-row">
              <button
                type="button"
                className={`review-super-glow-btn btn-date-1 ${activeDate === '2/12/2069' ? 'is-active' : ''}`}
                onClick={() => handleDateSelect('2/12/2069')}
                aria-pressed={activeDate === '2/12/2069'}
                aria-label="Draw Date 2/12/2069 VIP Draw"
              >
                <span className="shimmer-sweep" aria-hidden="true" />
                <span className="btn-glow-aura" aria-hidden="true" />
                <div className="btn-content-inner">
                  <span className="btn-badge-label">
                    <span className="btn-live-dot" /> VIP DRAW
                  </span>
                  <strong className="btn-main-date">2/12/2069</strong>
                  <span className="btn-action-hint">ক্লিক করে ক্যালকুলেশন পেপার দেখুন ➔</span>
                </div>
              </button>

              <button
                type="button"
                className={`review-super-glow-btn btn-date-2 ${activeDate === '20/21/2069' ? 'is-active' : ''}`}
                onClick={() => handleDateSelect('20/21/2069')}
                aria-pressed={activeDate === '20/21/2069'}
                aria-label="Draw Date 20/21/2069 Special Draw"
              >
                <span className="shimmer-sweep" aria-hidden="true" />
                <span className="btn-glow-aura" aria-hidden="true" />
                <div className="btn-content-inner">
                  <span className="btn-badge-label">
                    <span className="btn-live-dot" /> SPECIAL DRAW
                  </span>
                  <strong className="btn-main-date">20/21/2069</strong>
                  <span className="btn-action-hint">ক্লিক করে ক্যালকুলেশন পেপার দেখুন ➔</span>
                </div>
              </button>
            </div>
          </div>

          {/* 2nd Image Document Card: 1 Year 24 Set Calculation Paper 2026 */}
          <div className="three-set-card-wrap vip-agency-paper-wrap" ref={paperRef}>
            <figure
              className="three-set-document-card"
              onClick={() => setModalOpen(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setModalOpen(true);
              }}
              title="সম্পূর্ণ বড় করে দেখতে ক্লিক করুন"
            >
              <span className="document-badge">
                👑 1 Year 24 Set Calculation Paper 2026 • VIP Agency Code ({activeDate})
              </span>
              <div className="three-set-img-container">
                <img
                  src="/assets/site/vip-agency-code-calculation-paper.jpg"
                  alt="Thailand Lottery VIP Agency Code 1 Year 24 Set Calculation Paper 2026"
                  className="three-set-img"
                  loading="eager"
                />
                <span className="three-set-zoom-hint">🔍 ক্লিক করে ফুল স্ক্রিন দেখুন</span>
              </div>
            </figure>

            {/* Quick Actions Bar */}
            <div className="form-actions-row" style={{ marginTop: '1.25rem', justifyContent: 'center' }}>
              <button
                type="button"
                className="button primary"
                onClick={() => setModalOpen(true)}
              >
                🔍 বড় করে দেখুন
              </button>
              <Link className="button primary cta-pulse-btn" to="/form">
                অনলাইন ফর্ম পূরণ করুন ✍️
              </Link>
              <a
                className="button secondary"
                href="/assets/site/vip-agency-code-calculation-paper.jpg"
                target="_blank"
                rel="noopener noreferrer"
              >
                ফুল ভিউ ↗
              </a>
            </div>
          </div>

          {/* Action Call to Action */}
          <div className="three-set-actions-panel" style={{ marginTop: '2.5rem' }}>
            <div className="three-set-actions-inner">
              <h3>ভিআইপি মেম্বারশিপ ফর্ম নিয়ে সরাসরি যুক্ত হতে চান?</h3>
              <p>
                সীমিত কোটায় এখনই আপনার ফর্ম পূরণ করুন অথবা হোমপেজের অফিশিয়াল তথ্যসমূহ দেখুন:
              </p>
              <div className="three-set-cta-buttons">
                <Link to="/form" className="button primary pulse-glow">
                  <span>অনলাইন ফর্ম পূরণ করুন →</span>
                </Link>
                <Link to="/" className="button secondary">
                  <span>হোমপেজে ফিরে যান 🏠</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Lightbox Modal */}
      {modalOpen && (
        <div
          className="modal-backdrop"
          onClick={() => setModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="1 Year 24 Set Calculation Paper 2026 Lightbox"
        >
          <div
            className="modal-content three-set-modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '780px' }}
          >
            <div className="modal-header">
              <h3>1 Year 24 Set Calculation Paper 2026 • VIP Agency Code</h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setModalOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="modal-body three-set-modal-body" style={{ textAlign: 'center', background: '#071739', padding: '1rem' }}>
              <img
                src="/assets/site/vip-agency-code-calculation-paper.jpg"
                alt="Thailand Lottery VIP Agency Code 1 Year 24 Set Calculation Paper 2026 Full View"
                className="three-set-modal-img"
                style={{ maxHeight: '85vh', width: 'auto', maxWidth: '100%', objectFit: 'contain', borderRadius: '8px' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', padding: '1rem', background: '#05112B' }}>
              <Link to="/form" className="button primary" onClick={() => setModalOpen(false)}>
                মেম্বারশিপ ফর্ম পূরণ করুন ✍️
              </Link>
              <button
                type="button"
                className="button secondary"
                onClick={() => setModalOpen(false)}
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer page="vip-agency-code" />
    </>
  );
}
