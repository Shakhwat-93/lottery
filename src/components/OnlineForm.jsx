import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function OnlineForm() {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  return (
    <section className="section form-section reveal-on-scroll" id="online-form">
      <div className="section-heading">
        <p className="eyebrow">GLO REGISTRATION</p>
        <h2>Official Membership Registration Form 2026</h2>
        <p>
          The Government Lottery Office (GLO) অনুমোদিত সিনিয়র এজেন্ট <strong>মোঃ ফাহিম চৌধুরী (Agent ID: TL-001)</strong> এর অধীনে আর মাত্র ৫টি ফর্ম বাকি:
        </p>
      </div>

      <div className="membership-board" aria-label="Online registration and member verification">
        <div className="online-form-title">
          <span>VIP APPLICATION</span>
          <span className="form-remaining-pill">🚨 মাত্র ৫টি ফর্ম বাকি</span>
        </div>

        <div className="form-showcase-layout">
          {/* Left: The Official Blank Form Template */}
          <div className="form-template-container">
            <figure className="form-template-card">
              <span className="document-badge form-template-badge">👑 Official Registration Form</span>
              
              <div 
                className="form-img-clickable-wrapper" 
                onClick={() => setIsFormModalOpen(true)}
                role="button"
                tabIndex={0}
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
                <a
                  className="button primary"
                  href="/assets/site/official-membership-registration-form.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ফুল ভিউ ↗
                </a>
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
