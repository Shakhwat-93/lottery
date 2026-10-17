import React, { useState } from 'react';

const WINNER_FORMS = [
  {
    id: 'winner-1',
    nameBn: 'মুহাম্মদ জহুরুল ইসলাম',
    nameEn: 'MOHAMMAD ZOHURUL ISLAM',
    formImg: '/assets/site/winners/winner-form-zohurul.jpg',
    badge: '🏆 1ST CATEGORY WINNER • รางวัลที่ 1',
    country: 'Saudi Arabia • ซาอุดีอาระเบีย (সৌদি আরব)',
    agent: 'Md Fahim Chowdhury (TL-001)',
    price: '250 SAR (Special Discount)'
  },
  {
    id: 'winner-2',
    nameBn: 'মোঃ বাহার',
    nameEn: 'MD BAHAR',
    formImg: '/assets/site/winners/winner-form-bahar.jpg',
    badge: '👑 MEGA CATEGORY WINNER • รางวัลพิเศษ',
    country: 'Saudi Arabia • ซาอุดีอาระเบีย (সৌদি আরব)',
    agent: 'Md Fahim Chowdhury (TL-001)',
    price: '250 SAR (Special Discount)'
  }
];

export default function PreviousWinners() {
  const [modalImage, setModalImage] = useState(null);

  return (
    <section className="section winners-section reveal-on-scroll" id="previous-winners" aria-label="Previous Game Form Winners">
      <div className="section-heading">
        <p className="eyebrow">
          <span className="eyebrow-flag" aria-hidden="true">🏆</span> ทำเนียบผู้โชคดี • OFFICIAL WINNERS
        </p>
        <h2>GLO Certified Previous Winners • ผลรางวัลทางการ</h2>
        <p>
          Official GLO Membership Forms of recent draw winners. ক্লিক করে ফুল সাইজ ভেরিফাইড ফরম দেখুন:
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
              <span className="winner-form-verified-tag">✓ VERIFIED • ตรวจสอบแล้ว</span>
            </div>

            {/* Form Image Container with Zoom overlay */}
            <div
              className="winner-form-img-wrapper"
              onClick={() => setModalImage({ src: winner.formImg, title: `${winner.nameBn} (${winner.nameEn}) - Official GLO Winner Form` })}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setModalImage({ src: winner.formImg, title: `${winner.nameBn} (${winner.nameEn}) - Official GLO Winner Form` });
                }
              }}
              title="คลิกเพื่อดูแบบฟอร์มขนาดเต็ม (Click to Zoom)"
            >
              <img
                src={winner.formImg}
                alt={`Official Membership Registration Form of ${winner.nameEn}`}
                className="winner-form-main-img"
                loading="lazy"
              />
              <div className="winner-form-hover-overlay">
                <span className="winner-form-hover-btn">🔍 ดูขนาดเต็ม • Click to Zoom (ফুল ভিউ)</span>
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
                🔍 Full Screen • ขยาย ↗
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
              <span>สำนักงานสลากกินแบ่งรัฐบาล • Official GLO Membership Registration Record • অফিসিয়াল রেকর্ড</span>
              <button
                type="button"
                className="button secondary"
                onClick={() => setModalImage(null)}
              >
                Close • ปิด (বন্ধ করুন)
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
