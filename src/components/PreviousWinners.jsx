import React, { useState } from 'react';

const WINNER_FORMS = [
  {
    id: 'winner-1',
    nameBn: 'মুহাম্মদ জহুরুল ইসলাম',
    nameEn: 'MOHAMMAD ZOHURUL ISLAM',
    formImg: '/assets/site/winners/winner-form-zohurul.jpg',
    badge: '🏆 ১ম ক্যাটাগরি বিজয়ী ফরম',
    country: 'সৌদি আরব (Saudi Arabia)',
    agent: 'মোঃ ফাহিম চৌধুরী (TL-001)',
    price: '250 SAR (Special Discount)'
  },
  {
    id: 'winner-2',
    nameBn: 'মোঃ বাহার',
    nameEn: 'MD BAHAR',
    formImg: '/assets/site/winners/winner-form-bahar.jpg',
    badge: '👑 মেগা ক্যাটাগরি বিজয়ী ফরম',
    country: 'সৌদি আরব (Saudi Arabia)',
    agent: 'মোঃ ফাহিম চৌধুরী (TL-001)',
    price: '250 SAR (Special Discount)'
  }
];

export default function PreviousWinners() {
  const [modalImage, setModalImage] = useState(null);

  return (
    <section className="section winners-section reveal-on-scroll" id="previous-winners" aria-label="Previous Game Form Winners">
      <div className="section-heading">
        <p className="eyebrow">
          <span className="eyebrow-flag" aria-hidden="true">🏆</span> ผู้ชนะเกมก่อนหน้า • OFFICIAL VERIFIED WINNERS • পূর্ববর্তী গেমের ফর্ম বিজয়ী
        </p>
        <h2>Previous Game Form Winners • সরাসরি বিজয়ী মেম্বারশিপ ফরম</h2>
        <p>
          থাইল্যান্ড সরকারের পূর্ববর্তী ড্র-তে অফিসিয়াল মেম্বারশিপ ফর্ম পূরণ করে যারা সরাসরি ক্যাটাগরি বিজয়ী হয়েছেন—নিচে তাদের মূল ভেরিফায়েড অফিসিয়াল ফরম তুলে ধরা হলো (সম্পূর্ণ বড় করে দেখতে ফর্মের ওপর ক্লিক করুন):
        </p>
      </div>

      <div className="winner-forms-grid">
        {WINNER_FORMS.map((winner) => (
          <article key={winner.id} className="winner-form-card card-enter-anim">
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
              onClick={() => setModalImage({ src: winner.formImg, title: `${winner.nameBn} (${winner.nameEn}) - অফিসিয়াল বিজয়ী ফরম` })}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setModalImage({ src: winner.formImg, title: `${winner.nameBn} (${winner.nameEn}) - অফিসিয়াল বিজয়ী ফরম` });
                }
              }}
              title="ক্লিক করে বড় করে দেখুন"
            >
              <img
                src={winner.formImg}
                alt={`Official Membership Registration Form of ${winner.nameEn}`}
                className="winner-form-main-img"
                loading="lazy"
              />
              <div className="winner-form-hover-overlay">
                <span className="winner-form-hover-btn">🔍 বড় করে দেখুন (Click to Zoom)</span>
              </div>
            </div>

            {/* Form Card Footer */}
            <div className="winner-form-card-footer">
              <div className="winner-form-meta">
                <span className="winner-meta-pill">📍 {winner.country}</span>
                <span className="winner-meta-pill">✍️ এজেন্ট: {winner.agent}</span>
              </div>
              <button
                type="button"
                className="button-form-fullscreen"
                onClick={() => setModalImage({ src: winner.formImg, title: `${winner.nameBn} (${winner.nameEn}) - অফিসিয়াল বিজয়ী ফরম` })}
              >
                🔍 ফুল স্ক্রিন দেখুন
              </button>
            </div>
          </article>
        ))}
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
              <span>✓ থাইল্যান্ড গভর্নমেন্ট লটারি অফিসিয়াল মেম্বারশিপ রেজিস্ট্রেশন ফরম</span>
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
