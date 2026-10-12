import React, { useState } from 'react';

const WINNERS_DATA = [
  {
    id: 'winner-1',
    drawDate: '01/10/2026',
    drawLabel: '01/10/2026 ALREADY WINNED',
    drawLabelBn: '০১/১০/২০২৬ ড্র — ১ম ক্যাটাগরি বিজয়ী 🏆',
    nameBn: 'মুহাম্মদ জহুরুল ইসলাম',
    nameEn: 'MOHAMMAD ZOHURUL ISLAM',
    title: 'পূর্ববর্তী সরকারি ড্র ১ম ক্যাটাগরি বিজয়ী (01/10/2026)',
    photoUrl: '/assets/site/winners/winner-1-zohurul-photo.jpg',
    idUrl: '/assets/site/winners/winner-1-zohurul-id.jpg',
    winSource: 'অনলাইন ফরম পূরণ করে বিজয়ী (01/10/2026 Draw)',
    idNumber: '2432347103',
    idType: 'Saudi Resident Digital Identity (ইকামা)',
    payoutStatus: '১০০% ব্যাংক ট্রান্সফারে সফল পরিশোধিত',
    agentName: 'ফাহিম চৌধুরী (Senior Official Agent)',
    statement:
      'আলহামদুলিল্লাহ, এজেন্ট ফাহিম চৌধুরীর অফিসিয়াল ফর্ম পূরণ করে পূর্ববর্তী খেলায় বিজয়ী হয়েছি। কোনো ঝামেলা ছাড়াই সরাসরি ব্যাংক একাউন্টে প্রাইজ পেয়েছি।'
  },
  {
    id: 'winner-2',
    drawDate: '10/12/2026',
    drawLabel: '10/12/2026 ALREADY WINNED',
    drawLabelBn: '১০/১২/২০২৬ ড্র — মেগা ক্যাটাগরি বিজয়ী 🏆',
    nameBn: 'মোঃ বাহার',
    nameEn: 'MD BAHAR',
    title: 'পূর্ববর্তী সরকারি ড্র মেগা ক্যাটাগরি বিজয়ী (10/12/2026)',
    photoUrl: '/assets/site/winners/winner-2-bahar-photo.jpg',
    idUrl: '/assets/site/winners/winner-2-bahar-id.jpg',
    winSource: 'অনলাইন ফরম পূরণ করে বিজয়ী (10/12/2026 Draw)',
    idNumber: '25832267139',
    idType: 'Absher Digital Resident Identity (ইকামা)',
    payoutStatus: '১০০% ব্যাংক ট্রান্সফারে সফল পরিশোধিত',
    agentName: 'ফাহিম চৌধুরী (Senior Official Agent)',
    statement:
      'হেড অফিস ফরম সাবমিট করার পর আমার নামে অফিসিয়াল টিকিট কনফার্ম হয় এবং রেজাল্ট মিলে বিজয়ী হয়েছি। সম্পূর্ণ আসল ও বিশ্বস্ত প্ল্যাটফর্ম।'
  }
];

export default function PreviousWinners() {
  const [modalImage, setModalImage] = useState(null);
  const [activeDraw, setActiveDraw] = useState('all');
  const [activeTabs, setActiveTabs] = useState({
    'winner-1': 'photo',
    'winner-2': 'photo'
  });

  const setTab = (winnerId, tab) => {
    setActiveTabs((prev) => ({ ...prev, [winnerId]: tab }));
  };

  const displayedWinners = activeDraw === 'all'
    ? WINNERS_DATA
    : WINNERS_DATA.filter((w) => w.drawDate === activeDraw);

  return (
    <section className="section winners-section reveal-on-scroll" id="previous-winners" aria-label="Previous Game Form Winners">
      <div className="section-heading">
        <p className="eyebrow">
          <span className="eyebrow-flag" aria-hidden="true">🏆</span> ผู้ชนะเกมก่อนหน้า • VERIFIED WINNERS • পূর্ববর্তী গেমের ফর্ম বিজয়ী
        </p>
        <h2>Previous Game Form Winners • সরাসরি ফর্ম বিজয়ী প্রমাণ</h2>
        <p>
          থাইল্যান্ড সরকারের পূর্ববর্তী ড্র-তে অফিসিয়াল মেম্বারশিপ ফর্ম পূরণ করে যারা সরাসরি বিজয়ী হয়েছেন। শতভাগ স্বচ্ছতা ও আস্থার স্বার্থে তাদের ছবি ও সরকারি ভেরিফায়েড ডিজিটাল পরিচয়পত্র (Iqama ID) নিচে তুলে ধরা হলো:
        </p>
      </div>

      {/* 2 Glowing Buttons / Glowing Bar Above Winners */}
      <div className="winners-glowing-bars-container">
        <div className="winners-glowing-header-label">
          <span className="pulse-dot-gold" />
          <span>পূর্ববর্তী সরকারি ড্র রেকর্ড • ALREADY WINNED DRAWS</span>
        </div>

        <div className="winners-glowing-bars-group" role="tablist" aria-label="Winning draw selection">
          <button
            type="button"
            className={`glowing-draw-btn draw-gold ${activeDraw === '01/10/2026' ? 'active-draw' : ''}`}
            onClick={() => setActiveDraw((prev) => (prev === '01/10/2026' ? 'all' : '01/10/2026'))}
            role="tab"
            aria-selected={activeDraw === '01/10/2026'}
          >
            <span className="draw-btn-icon">🏆</span>
            <div className="draw-btn-text">
              <strong className="draw-title">01/10/2026 ALREADY WINNED</strong>
              <small className="draw-sub">মুহাম্মদ জহুরুল ইসলাম • ১ম ক্যাটাগরি বিজয়ী</small>
            </div>
            <span className="draw-status-pill">ALREADY WINNED ✓</span>
          </button>

          <button
            type="button"
            className={`glowing-draw-btn draw-emerald ${activeDraw === '10/12/2026' ? 'active-draw' : ''}`}
            onClick={() => setActiveDraw((prev) => (prev === '10/12/2026' ? 'all' : '10/12/2026'))}
            role="tab"
            aria-selected={activeDraw === '10/12/2026'}
          >
            <span className="draw-btn-icon">👑</span>
            <div className="draw-btn-text">
              <strong className="draw-title">10/12/2026 ALREADY WINNED</strong>
              <small className="draw-sub">মোঃ বাহার • মেগা ক্যাটাগরি বিজয়ী</small>
            </div>
            <span className="draw-status-pill">ALREADY WINNED ✓</span>
          </button>

          {activeDraw !== 'all' && (
            <button
              type="button"
              className="glowing-draw-reset-btn"
              onClick={() => setActiveDraw('all')}
              title="সকল বিজয়ী দেখুন"
            >
              🔄 উভয় ড্র দেখুন (View Both)
            </button>
          )}
        </div>
      </div>

      <div className={`winners-grid ${displayedWinners.length === 1 ? 'single-winner' : ''}`}>
        {displayedWinners.map((winner) => {
          const currentTab = activeTabs[winner.id];
          return (
            <article key={winner.id} className="winner-card card-enter-anim">
              {/* Top Glowing Already Winned Banner */}
              <div className="card-already-winned-banner">
                <div className="winned-banner-left">
                  <span className="winned-banner-fire" aria-hidden="true">🔥</span>
                  <div>
                    <span className="winned-date-code">{winner.drawLabel}</span>
                    <strong className="winned-bn-title">{winner.drawLabelBn}</strong>
                  </div>
                </div>
                <div className="winned-banner-badge">
                  <span className="pulse-dot-green" />
                  <span>ALREADY WINNED ✓</span>
                </div>
              </div>

              {/* Media Switcher Tab Header */}
              <div className="winner-media-tabs" role="tablist">
                <button
                  type="button"
                  className={`winner-tab-btn ${currentTab === 'photo' ? 'active' : ''}`}
                  onClick={() => setTab(winner.id, 'photo')}
                  role="tab"
                  aria-selected={currentTab === 'photo'}
                >
                  <span>👤 বিজয়ী ছবি</span>
                </button>
                <button
                  type="button"
                  className={`winner-tab-btn ${currentTab === 'id' ? 'active' : ''}`}
                  onClick={() => setTab(winner.id, 'id')}
                  role="tab"
                  aria-selected={currentTab === 'id'}
                >
                  <span>🆔 ডিজিটাল আইডি প্রমাণ</span>
                </button>
              </div>

              {/* Media Display Area */}
              <div className="winner-media-frame">
                {currentTab === 'photo' ? (
                  <div
                    className="winner-photo-wrapper"
                    onClick={() => setModalImage({ src: winner.photoUrl, title: `${winner.nameBn} - বিজয়ী ছবি` })}
                    role="button"
                    tabIndex={0}
                    title="ক্লিক করে বড় করে দেখুন"
                  >
                    <img
                      src={winner.photoUrl}
                      alt={`Thailand Lottery Previous Game Winner - ${winner.nameBn}`}
                      className="winner-main-photo"
                      loading="lazy"
                    />
                    <span className="winner-zoom-chip">🔍 ক্লিক করে বড় দেখুন</span>
                    <span className="winner-photo-badge">🏆 Winner 2026</span>
                  </div>
                ) : (
                  <div
                    className="winner-id-wrapper"
                    onClick={() => setModalImage({ src: winner.idUrl, title: `${winner.nameBn} - অফিসিয়াল আইডি ডকুমেন্ট` })}
                    role="button"
                    tabIndex={0}
                    title="ক্লিক করে বড় করে দেখুন"
                  >
                    <img
                      src={winner.idUrl}
                      alt={`Government Verified Resident ID of ${winner.nameBn}`}
                      className="winner-id-photo"
                      loading="lazy"
                    />
                    <span className="winner-zoom-chip">🔍 ক্লিক করে বড় দেখুন</span>
                    <span className="winner-id-badge">✓ ডিজিটাল আইডি ভেরিফাইড</span>
                  </div>
                )}
              </div>

              {/* Winner Details & Credentials */}
              <div className="winner-content">
                <div className="winner-name-group">
                  <div className="winner-kicker">{winner.title}</div>
                  <h3 className="winner-name-bn">{winner.nameBn}</h3>
                  <div className="winner-name-en">{winner.nameEn}</div>
                </div>

                <div className="winner-info-list">
                  <div className="winner-info-row highlight-row">
                    <span className="info-label">বিজয়ের মাধ্যম:</span>
                    <strong className="info-val">{winner.winSource}</strong>
                  </div>
                  <div className="winner-info-row">
                    <span className="info-label">ডকুমেন্ট / আইডি:</span>
                    <strong className="info-val monospace-val">{winner.idNumber}</strong>
                  </div>
                  <div className="winner-info-row">
                    <span className="info-label">আইডি ধরন:</span>
                    <span className="info-val">{winner.idType}</span>
                  </div>
                  <div className="winner-info-row">
                    <span className="info-label">পে-আউট স্ট্যাটাস:</span>
                    <span className="info-val status-green">✓ {winner.payoutStatus}</span>
                  </div>
                  <div className="winner-info-row">
                    <span className="info-label">অথরাইজড এজেন্ট:</span>
                    <span className="info-val">{winner.agentName}</span>
                  </div>
                </div>

                {/* Winner Testimonial Quote */}
                <blockquote className="winner-quote">
                  "{winner.statement}"
                </blockquote>

                {/* Proof Action Buttons */}
                <div className="winner-actions">
                  <button
                    type="button"
                    className="button-doc-preview"
                    onClick={() =>
                      setModalImage({
                        src: winner.idUrl,
                        title: `${winner.nameBn} (${winner.nameEn}) - অফিসিয়াল আইডি ডকুমেন্ট প্রুফ`
                      })
                    }
                  >
                    📄 সরকারি আইডি প্রুফ দেখুন
                  </button>
                  <a className="button-win-cta" href="#online-form">
                    ফর্ম পূরণ করুন ✍️
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Bottom CTA to Form */}
      <div className="winners-bottom-cta">
        <div className="bottom-cta-box">
          <div className="cta-box-text">
            <strong>আপনিও পরবর্তী সরকারি খেলায় বিজয়ী হতে চান?</strong>
            <p>দেরি না করে এখনই নিচের অফিসিয়াল হেড অফিস মেম্বারশিপ ফর্মটি পূরণ করে আপনার টিকিট নিশ্চিত করুন!</p>
          </div>
          <a className="button primary cta-jump-btn" href="#online-form">
            📝 পরবর্তী ড্র-এর জন্য ফরম পূরণ করুন
          </a>
        </div>
      </div>

      {/* Image Modal Lightbox */}
      {modalImage && (
        <div
          className="winner-modal-overlay modal-fade-in"
          onClick={() => setModalImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label={modalImage.title}
        >
          <div className="winner-modal-card modal-scale-in" onClick={(e) => e.stopPropagation()}>
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
            <div className="winner-modal-body">
              <img src={modalImage.src} alt={modalImage.title} className="winner-modal-img" />
            </div>
            <div className="winner-modal-footer">
              <span>✓ থাইল্যান্ড গভর্নমেন্ট লটারি অফিসিয়াল ভেরিফায়েড উইনার রেকর্ড</span>
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
