import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function OnlineForm() {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  return (
    <section className="section form-section" id="online-form">
      <div className="section-heading">
        <p className="eyebrow">แบบฟอร์มลงทะเบียนออนไลน์ • Online Registration • অফিসিয়াল অনলাইন রেজিস্ট্রেশন</p>
        <h2>Thailand Lottery Official Membership Registration Form</h2>
        <p>
          থাইল্যান্ড সরকারের গভর্নমেন্ট লটারি অফিস (GLO) মেম্বার হতে নিচের অফিসিয়াল রেজিস্ট্রেশন ফরমটি পূরণ করুন। অনুমোদিত সিনিয়র এজেন্ট <strong>মোঃ ফাহিম চৌধুরী (Agent ID: TL-001)</strong> এর অধীনে আর <strong>মাত্র ৫টি ফর্ম বাকি রয়েছে</strong>।
        </p>
      </div>

      <div className="membership-board" aria-label="Online registration and member verification">
        <div className="online-form-title">
          <span>Membership Registration Form • แบบฟอร์มออนไลน์</span>
          <span className="form-remaining-pill">🚨 মাত্র ৫টি ফর্ম বাকি!</span>
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
                title="ক্লিক করে সম্পূর্ণ ফর্মটি বড় করে দেখুন"
              >
                <img
                  src="/assets/site/official-membership-registration-form.jpg"
                  alt="Thailand Lottery Official Membership Registration Form - Agent Md Fahim Chowdhury TL-001"
                  loading="lazy"
                />
                <span className="form-zoom-overlay">🔍 ক্লিক করে বড় ফরম দেখুন</span>
              </div>

              <figcaption className="form-template-caption">
                <div className="form-caption-header">
                  <strong>MEMBERSHIP REGISTRATION FORM 2026</strong>
                  <span>The Government Lottery Office of Thailand • GLO</span>
                </div>
                <div className="form-agent-meta-box">
                  <div className="form-agent-line">
                    <span>অথরাইজড এজেন্ট:</span>
                    <strong>মোঃ ফাহিম চৌধুরী (MD FAHIM CHOWDHURY)</strong>
                  </div>
                  <div className="form-agent-line">
                    <span>এজেন্ট আইডি:</span>
                    <strong className="agent-code-chip">TL-001</strong>
                  </div>
                  <div className="form-agent-line status-alert-line">
                    <span>অবশিষ্ট কোটা:</span>
                    <strong className="remaining-alert-text">🚨 আর মাত্র ৫টি ফর্ম খালি আছে!</strong>
                  </div>
                </div>
                <p>
                  গোল্ডেন গারুদা ও থাই রাজকীয় সিলমোহরযুক্ত মূল রেজিস্ট্রেশন ফরম। পার্সোনাল ইনফরমেশন, এনআইডি/পাসপোর্ট ভেরিফিকেশন এবং মেম্বারশিপ মেয়াদ (৩/৬/১২ মাস) নির্বাচনের সুযোগ রয়েছে।
                </p>
                <div className="form-actions-row">
                  <button
                    type="button"
                    className="button primary"
                    onClick={() => setIsFormModalOpen(true)}
                  >
                    🔍 মূল ফরমটি দেখুন
                  </button>
                  <a
                    className="button secondary"
                    href="/assets/site/official-membership-registration-form.jpg"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    📥 ফুল স্ক্রিন ভিউ
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
          className="winner-modal-overlay"
          onClick={() => setIsFormModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Thailand Lottery Membership Registration Form"
        >
          <div className="winner-modal-card form-lightbox-card" onClick={(e) => e.stopPropagation()}>
            <div className="winner-modal-header">
              <strong>Official Membership Registration Form 2026 (Md Fahim Chowdhury TL-001)</strong>
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
              <span className="form-lightbox-alert">🚨 আর মাত্র ৫টি ফর্ম খালি আছে!</span>
              <div className="form-lightbox-actions">
                <a
                  className="button primary"
                  href="/assets/site/official-membership-registration-form.jpg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ডাউনলোড / ফুল সাইজ ভিউ ↗
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
