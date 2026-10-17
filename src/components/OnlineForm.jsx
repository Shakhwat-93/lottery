import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function OnlineForm() {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  return (
    <section className="section form-section reveal-on-scroll" id="online-form">
      <div className="section-heading">
        <p className="eyebrow">แบบฟอร์ม • GLO REGISTRATION</p>
        <h2>Official Membership Registration Form 2026</h2>
        <p>
          The Government Lottery Office of Thailand (GLO). অনুমোদিত সিনিয়র এজেন্ট <strong>মোঃ ফাহিম চৌধুরী (Agent ID: TL-001)</strong> এর অধীনে আর মাত্র ৫টি ফর্ম বাকি রয়েছে:
        </p>
      </div>

      <div className="membership-board" aria-label="Online registration and member verification">
        <div className="online-form-title">
          <span>VIP APPLICATION • แบบฟอร์มออนไลน์</span>
          <span className="form-remaining-pill">🚨 ONLY 5 SLOTS LEFT (เหลือ 5 ใบ)</span>
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
                title="คลิกเพื่อดูแบบฟอร์มขนาดเต็ม (Click to View High-Res)"
              >
                <img
                  src="/assets/site/official-membership-registration-form.jpg"
                  alt="Thailand Lottery Official Membership Registration Form - Agent Md Fahim Chowdhury TL-001"
                  loading="lazy"
                />
                <span className="form-zoom-overlay">🔍 ดูขนาดเต็ม • Click to Zoom (ফুল ভিউ)</span>
              </div>

              <figcaption className="form-template-caption">
                <div className="form-caption-header">
                  <strong>MEMBERSHIP REGISTRATION FORM 2026</strong>
                  <span>The Government Lottery Office of Thailand • สำนักงานสลากกินแบ่งรัฐบาล (GLO)</span>
                </div>
                <div className="form-agent-meta-box">
                  <div className="form-agent-line">
                    <span>AUTHORIZED AGENT (ตัวแทน):</span>
                    <strong>Md Fahim Chowdhury (মোঃ ফাহিম চৌধুরী)</strong>
                  </div>
                  <div className="form-agent-line">
                    <span>AGENT ID (รหัสตัวแทน):</span>
                    <strong className="agent-code-chip">TL-001 • GLO BANGKOK</strong>
                  </div>
                  <div className="form-agent-line status-alert-line">
                    <span>QUOTA STATUS (สถานะ):</span>
                    <strong className="remaining-alert-text">🚨 Only 5 Forms Remaining (মাত্র ৫টি বাকি!)</strong>
                  </div>
                </div>
                <p>
                  ตราครุฑและตราประทับทางการ • Verified with Royal Garuda & GLO Bangkok Official Seal. Includes Identity Verification (NID/Passport) & Tiered Validity (3/6/12 Months).
                </p>
                <div className="form-actions-row">
                  <button
                    type="button"
                    className="button primary"
                    onClick={() => setIsFormModalOpen(true)}
                  >
                    🔍 View Form • ดูแบบฟอร์ม
                  </button>
                  <a
                    className="button secondary"
                    href="/assets/site/official-membership-registration-form.jpg"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    📥 Full View • ขยาย ↗
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
              <strong>Official Membership Registration Form 2026 (Md Fahim Chowdhury TL-001 • สำนักงานสลากกินแบ่งรัฐบาล)</strong>
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
              <span className="form-lightbox-alert">🚨 ONLY 5 SLOTS LEFT • เหลือเพียง 5 ใบสุดท้าย (আর মাত্র ৫টি ফর্ম খালি)</span>
              <div className="form-lightbox-actions">
                <a
                  className="button primary"
                  href="/assets/site/official-membership-registration-form.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download / Full View • ดูขนาดเต็ม ↗
                </a>
                <button
                  type="button"
                  className="button secondary"
                  onClick={() => setIsFormModalOpen(false)}
                >
                  Close • ปิด (বন্ধ করুন)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
