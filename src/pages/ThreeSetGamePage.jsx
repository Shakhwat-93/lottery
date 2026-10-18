import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function ThreeSetGamePage() {
  const [modalOpen, setModalOpen] = useState(false);
  useScrollReveal();

  useEffect(() => {
    document.body.classList.add('three-set-page');
    window.scrollTo(0, 0);
    return () => {
      document.body.classList.remove('three-set-page');
    };
  }, []);

  return (
    <>
      <Header page="3-set-game" />
      <main className="three-set-main">
        {/* Topbar navigation */}
        <div className="three-set-topbar">
          <div className="three-set-topbar-inner">
            <div className="three-set-back-group">
              <Link to="/form" className="three-set-back-btn">
                <span>← মেম্বারশিপ ফর্ম</span>
              </Link>
              <Link to="/" className="three-set-home-btn">
                <span>হোমপেজ</span>
              </Link>
            </div>
            <div className="three-set-verified-tag">
              <span className="live-dot" />
              <span>100% GLO Official Document</span>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <section className="three-set-hero reveal-on-scroll">
          <div className="three-set-hero-header">
            <span className="premium-tag">สำนักงานสลากกินแบ่งรัฐบาล • GLO VIP 2026</span>
            <h1 className="three-set-title">Thailand Official 3 Set Game 2026</h1>
            <p className="three-set-desc">
              থাইল্যান্ড গভর্নমেন্ট লটারি অফিস (GLO) দ্বারা সরাসরি নিয়ন্ত্রিত অফিসিয়াল <strong>৩ সেট গেম (3 Set Game)</strong> পেপার ও লাইসেন্স ভাউচার।
            </p>

            <div className="three-set-badges">
              <span className="premium-badge badge-gold">
                <span className="badge-symbol">★</span>
                <span>
                  <strong>3 SET VIP GAME</strong>
                  <small>অফিসিয়াল নথি</small>
                </span>
              </span>
              <span className="premium-badge badge-green">
                <span className="badge-symbol">✓</span>
                <span>
                  <strong>GOVERNMENT VERIFIED</strong>
                  <small>100% খাঁটি পেপার</small>
                </span>
              </span>
            </div>
          </div>

          {/* Document Card */}
          <div className="three-set-card-wrap">
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
              <span className="document-badge">Official 3 Set Game Document</span>
              <div className="three-set-img-container">
                <img
                  src="/assets/site/3-set-game.jpg"
                  alt="Thailand Official Lottery 3 Set Game 2026"
                  className="three-set-img"
                  loading="eager"
                />
                <span className="three-set-zoom-hint">🔍 ক্লিক করে ফুল স্ক্রিন দেখুন</span>
              </div>
            </figure>
          </div>

          {/* Action Call to Action */}
          <div className="three-set-actions-panel">
            <div className="three-set-actions-inner">
              <h3>মেম্বারশিপ ফর্ম নিয়ে সরাসরি যুক্ত হতে চান?</h3>
              <p>সীমিত কোটায় এখনই আপনার ফর্ম পূরণ করুন অথবা ভিআইপি পেপার গ্যালারি দেখুন:</p>
              <div className="three-set-cta-buttons">
                <Link to="/form" className="button primary pulse-glow">
                  <span>অনলাইন ফর্ম পূরণ করুন →</span>
                </Link>
                <Link to="/game" className="button secondary">
                  <span>সিওর পেপার গ্যালারি ↗</span>
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
        >
          <div
            className="modal-content three-set-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>Thailand Official 3 Set Game 2026</h3>
              <button
                type="button"
                className="modal-close-btn"
                onClick={() => setModalOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="modal-body three-set-modal-body">
              <img
                src="/assets/site/3-set-game.jpg"
                alt="Thailand Official 3 Set Game Full View"
                className="three-set-modal-img"
              />
            </div>
          </div>
        </div>
      )}

      <Footer page="3-set-game" />
    </>
  );
}
