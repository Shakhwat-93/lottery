import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function FormShowcase() {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  return (
    <section className="section form-section reveal-on-scroll" id="online-form">
      <div className="section-heading">
        <p className="eyebrow">
          ONLINE REGISTRATION • অফিসিয়াল অনলাইন রেজিস্ট্রেশন
        </p>
        <h2>Thailand Lottery Official Membership Registration Form</h2>
        <p>
          থাইল্যান্ড সরকারের গভর্নমেন্ট লটারি অফিস (GLO) মেম্বার হতে নিচের অফিসিয়াল রেজিস্ট্রেশন ফরমটি পূরণ করুন। অনুমোদিত সিনিয়র এজেন্ট <strong>মোঃ ফাহিম চৌধুরী (Agent ID: TL-001)</strong> এর অধীনে আর <strong>মাত্র ৫টি ফর্ম বাকি রয়েছে</strong>। সময় শেষ হওয়ার আগেই নিচের ফর্মটি পূরণ করে আপনার নিশ্চিত টিকিট ও সিওর পেপার কনফার্ম করুন!
        </p>
      </div>

      <div className="membership-board" aria-label="Online registration and member verification">
        <div className="online-form-title">
          <span>MEMBERSHIP REGISTRATION FORM</span>
          <span className="form-remaining-pill">🚨 মাত্র ৫টি ফর্ম বাকি!</span>
        </div>

        <div className="form-showcase-layout">
          {/* Official Blank Form Template Card */}
          <div className="form-template-container">
            <figure className="form-template-card">
              <span className="document-badge form-template-badge">👑 Official Registration Form</span>

              <div
                className="form-img-clickable-wrapper"
                onClick={() => setIsFormModalOpen(true)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setIsFormModalOpen(true);
                  }
                }}
                title="ক্লিক করে ফুল ভিউ দেখুন"
              >
                <img
                  src="/assets/site/official-membership-registration-form.jpg"
                  alt="Thailand Lottery Official Membership Registration Form - Agent Md Fahim Chowdhury TL-001"
                  loading="lazy"
                />
                <span className="form-zoom-overlay">🔍 ফুল ভিউ</span>
              </div>

              <figcaption className="form-template-caption">
                <div className="form-caption-header">
                  <strong>MEMBERSHIP REGISTRATION FORM 2026</strong>
                  <span>The Government Lottery Office of Thailand (GLO)</span>
                </div>
                <div className="form-agent-meta-box">
                  <div className="form-agent-line">
                    <span>AUTHORIZED AGENT:</span>
                    <strong>Md Fahim Chowdhury (মোঃ ফাহিম চৌধুরী)</strong>
                  </div>
                  <div className="form-agent-line">
                    <span>AGENT ID:</span>
                    <strong className="agent-code-chip">TL-001 • GLO BANGKOK</strong>
                  </div>
                  <div className="form-agent-line status-alert-line">
                    <span>QUOTA STATUS:</span>
                    <strong className="remaining-alert-text">🚨 মাত্র ৫টি ফর্ম বাকি</strong>
                  </div>
                </div>

                {/* Direct Agent Contact Strip */}
                <div className="form-showcase-agent-contact">
                  <span className="showcase-contact-kicker">ফাহিম চৌধুরীর সাথে সরাসরি IMO বা WhatsApp-এ যোগাযোগ করুন:</span>
                  <div className="showcase-contact-actions">
                    <a
                      href="https://wa.me/8801309802224?text=%E0%A6%86%E0%A6%B8%E0%A6%B8%E0%A6%BE%E0%A6%B2%E0%A6%BE%E0%A6%AE%E0%A7%81%20%E0%A6%86%E0%A6%B2%E0%A6%BE%E0%A6%87%E0%A6%95%E0%A7%81%E0%A6%AE%2C%20%E0%A6%AB%E0%A6%BE%E0%A6%B9%E0%A6%BF%E0%A6%AE%20%E0%A6%B8%E0%A7%8D%E0%A6%AF%E0%A6%BE%E0%A6%B0%E0%A7%87%E0%A6%B0%20%E0%A6%B8%E0%A6%BE%E0%A6%A5%E0%A7%87%20%E0%A6%95%E0%A6%A5%E0%A6%BE%20%E0%A6%AC%E0%A6%B2%E0%A6%A4%E0%A7%87%20%E0%A6%9A%E0%A6%BE%E0%A6%87%E0%A5%A4"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="showcase-contact-btn showcase-wa-btn"
                      title="WhatsApp: +8801309802224"
                    >
                      <span className="showcase-btn-icon">💬</span>
                      <span>WhatsApp (+8801309802224)</span>
                    </a>
                    <a
                      href="tel:+8801309802224"
                      className="showcase-contact-btn showcase-imo-btn"
                      title="IMO: +8801309802224"
                    >
                      <span className="showcase-btn-icon">imo</span>
                      <span>IMO (+8801309802224)</span>
                    </a>
                  </div>
                </div>
                <p>
                  থাইল্যান্ড সরকারের অফিসিয়াল সিলমোহর ও ওয়াটারমার্ক যুক্ত মেম্বারশিপ ফর্ম।
                </p>
                <div className="form-actions-row">
                  <button
                    type="button"
                    className="button primary"
                    onClick={() => setIsFormModalOpen(true)}
                  >
                    🔍 ফর্ম দেখুন
                  </button>
                  <Link className="button primary cta-pulse-btn" to="/form">
                    ফর্ম পূরণ করুন ✍️
                  </Link>
                  <a
                    className="button secondary"
                    href="/assets/site/official-membership-registration-form.jpg"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ফুল ভিউ ↗
                  </a>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>

      {/* Form Lightbox Modal */}
      {isFormModalOpen && (
        <div
          className="winner-modal-overlay modal-fade-in"
          onClick={() => setIsFormModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Thailand Lottery Membership Registration Form"
        >
          <div className="winner-modal-card form-lightbox-card modal-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="winner-modal-header">
              <strong>Official Membership Registration Form 2026</strong>
              <button
                type="button"
                className="winner-modal-close"
                onClick={() => setIsFormModalOpen(false)}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
            <div className="winner-modal-body form-lightbox-body">
              <img
                src="/assets/site/official-membership-registration-form.jpg"
                alt="Thailand Lottery Official Membership Registration Form High Resolution"
                className="winner-modal-img"
              />
            </div>
            <div className="winner-modal-footer">
              <span className="form-lightbox-alert">🚨 মাত্র ৫টি ফর্ম খালি রয়েছে!</span>
              <div className="form-lightbox-actions">
                <Link
                  className="button primary"
                  to="/form"
                  onClick={() => setIsFormModalOpen(false)}
                >
                  অনলাইন ফর্ম পূরণ করুন ✍️
                </Link>
                <button
                  type="button"
                  className="button secondary"
                  onClick={() => setIsFormModalOpen(false)}
                >
                  বন্ধ করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
