import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useScrollReveal } from '../hooks/useScrollReveal';

const PAPERS = [
  { id: 1, label: 'Paper 01 - 3UP Master', src: '/assets/game/game-01.jpg', isLarge: true },
  { id: 2, label: 'Paper 02 - Direct Touch', src: '/assets/game/game-02.jpg' },
  { id: 3, label: 'Paper 03 - Cut Number', src: '/assets/game/game-03.jpg' },
  { id: 4, label: 'Paper 04 - Down Set', src: '/assets/game/game-04.jpg' },
  { id: 5, label: 'Paper 05 - Royal Chart', src: '/assets/game/game-05.jpg' },
  { id: 6, label: 'Paper 06 - Final VIP', src: '/assets/game/game-06.jpg' },
  { id: 7, label: 'Paper 07 - Mega Cut', src: '/assets/game/game-08.jpg' },
  { id: 8, label: 'Paper 08 - King Touch', src: '/assets/game/game-09.jpg' }
];

export default function GamePage() {
  const [modalImage, setModalImage] = useState(null);
  useScrollReveal();

  useEffect(() => {
    document.body.classList.add('game-page');
    window.scrollTo(0, 0);
    return () => {
      document.body.classList.remove('game-page');
    };
  }, []);

  return (
    <>
      <Header page="game" />
      <main>
        <section className="game-hero reveal-on-scroll">
          <div className="game-hero-copy">
            <p className="eyebrow">100% SURE PAPERS</p>
            <h1>Official 100% Sure Paper Gallery</h1>
            <p>
              অফিসিয়াল <strong className="clarity-digit">100%</strong> সিওর পেপার, মাস্টার ডিজিট ও টাচ চার্ট গ্যালারি:
            </p>

            <div className="badge-row" aria-label="Game trust badges">
              <span className="premium-badge badge-green">
                <span className="badge-symbol">&#10003;</span>
                <span>
                  <strong>UPDATED 2026</strong>
                  <small>ปี 2569</small>
                </span>
              </span>
              <span className="premium-badge badge-gold">
                <span className="badge-symbol">&#9733;</span>
                <span>
                  <strong>GLO VIP PAPERS</strong>
                  <small>100% Official</small>
                </span>
              </span>
            </div>
          </div>

          <figure
            className="game-hero-image"
            onClick={() => setModalImage({ label: 'Latest Paper 01 (3UP Master)', src: '/assets/game/game-01.jpg' })}
            role="button"
            tabIndex={0}
            title="ক্লিক করে ফুল ভিউ দেখুন"
            style={{ cursor: 'pointer' }}
          >
            <span className="document-badge">VIP Paper 01</span>
            <img src="/assets/game/game-01.jpg" alt="Featured 100% Sure lottery paper" />
            <span className="game-zoom-chip">🔍 ফুল ভিউ</span>
          </figure>
        </section>

        <section className="section game-gallery-section reveal-on-scroll" id="game-papers">
          <div className="section-heading">
            <p className="eyebrow">VIP PAPERS</p>
            <h2>Official 100% Sure Paper Gallery</h2>
            <p>
              ক্লিক করে ফুল স্ক্রিন ভিউ দেখুন:
            </p>
          </div>

          <div className="game-gallery">
            {PAPERS.map((paper) => (
              <article
                key={paper.id}
                className={`game-card ${paper.isLarge ? 'game-card-large' : ''}`}
                onClick={() => setModalImage(paper)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setModalImage(paper);
                  }
                }}
                title="ক্লিক করে ফুল স্ক্রিন দেখুন"
                style={{ cursor: 'pointer' }}
              >
                <span className="card-badge">{paper.label}</span>
                <div className="game-card-img-wrap">
                  <img
                    src={paper.src}
                    alt={`Thailand lottery game ${paper.label}`}
                    loading="lazy"
                  />
                  <div className="game-card-hover-hint">
                    <span>🔍 ফুল ভিউ</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="game-panel reveal-on-scroll" id="download">
          <div>
            <p className="eyebrow">DIRECT ACCESS</p>
            <h2>Down Game 100% Direct Access</h2>
            <p>অফিসিয়াল গেম সার্ভার পেজে প্রবেশ করুন:</p>
          </div>
          <a
            className="button primary"
            href="https://sites.google.com/view/sakilkhan56/home"
            target="_blank"
            rel="noopener noreferrer"
          >
            ওপেন গেম পেজ ↗
          </a>
        </section>
      </main>

      {/* Lightbox Modal for Game Papers */}
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
              <strong>{modalImage.label} • 100% Sure Paper</strong>
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
              <span>The Government Lottery Office (GLO) Official Paper</span>
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

      <Footer page="game" />
    </>
  );
}
