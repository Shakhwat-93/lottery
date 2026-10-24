import React, { useState, useRef } from 'react';

function ThaiFlag({ width = 20, height = 13, className = "", style = {} }) {
  return (
    <svg
      className={`thai-flag-svg ${className}`}
      viewBox="0 0 900 600"
      width={width}
      height={height}
      aria-label="Flag of Thailand"
      role="img"
      style={{
        borderRadius: '2px',
        display: 'inline-block',
        verticalAlign: 'middle',
        flexShrink: 0,
        boxShadow: '0 1px 3px rgba(0,0,0,0.25)',
        ...style
      }}
    >
      <rect width="900" height="600" fill="#A51931" />
      <rect y="100" width="900" height="400" fill="#FFFFFF" />
      <rect y="200" width="900" height="200" fill="#2D2A4A" />
    </svg>
  );
}

export default function PaymentMethods() {
  const [isMapOpen, setIsMapOpen] = useState(false);
  const mapSectionRef = useRef(null);

  const handleToggleMap = () => {
    setIsMapOpen((prev) => {
      const nextState = !prev;
      if (nextState) {
        setTimeout(() => {
          mapSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 120);
      }
      return nextState;
    });
  };

  return (
    <section className="section payment-section reveal-on-scroll" id="payment-methods" aria-label="Official Government Payment and Treasury">
      <div className="payment-wrapper">
        {/* Main Payment & Treasury Card */}
        <div className="payment-card">
          <div className="payment-copy">
            <p className="eyebrow">
              <span className="eyebrow-flag" aria-hidden="true">🇹🇭</span> รัฐบาลไทย • OFFICIAL GOVT TREASURY • সরাসরি সরকারি কোষাগার
            </p>
            <h2>Accepted Payment Methods & Direct Govt Treasury</h2>

            {/* Payee Transparency Box */}
            <div className="payee-official-box">
              <div className="payee-badge-row">
                <span className="payee-pill">
                  <span className="payee-check">✓</span> সরাসরি থাইল্যান্ড সরকারে জমা
                </span>
                <span className="payee-merchant-code">
                  মার্চেন্ট আইডি: <strong>TH-GLO-GOV-2026</strong>
                </span>
              </div>

              <div className="payee-details">
                <span className="payee-title-label">পেমেন্ট প্রাপক (Official Payee):</span>
                <strong className="payee-name-bn">
                  গভর্নমেন্ট লটারি অফিস (GLO) কেন্দ্রীয় কোষাগার, থাইল্যান্ড সরকার
                </strong>
                <span className="payee-name-en">
                  The Government Lottery Office (GLO) Treasury, Royal Thai Government
                </span>
              </div>

              <p className="payee-guarantee-note">
                🛡️ আপনার জমাকৃত প্রতিটি ডিপোজিট বা ফি সরাসরি থাইল্যান্ড সরকারের কেন্দ্রীয় ট্রেজারি গেটওয়েতে ব্যাংক-এনক্রিপ্টেড পদ্ধতিতে জমা হয়। কোনো ব্যক্তি বা মধ্যস্থতাকারীর ব্যক্তিগত অ্যাকাউন্টে টাকা নেওয়া হয় না।
              </p>
            </div>
          </div>

          {/* Payment Methods Grid & Badges */}
          <div className="payment-methods-col">
            <div className="payment-methods" aria-label="Accepted payment brands">
              <span className="pay-brand mastercard" aria-label="Mastercard">
                <i />
                <strong>mastercard</strong>
              </span>
              <span className="pay-brand visa" aria-label="Visa">
                VISA
              </span>
              <span className="pay-brand apple-pay" aria-label="Apple Pay">
                <span aria-hidden="true">●</span> Pay
              </span>
              <span className="pay-brand google-pay" aria-label="Google Pay">
                <span aria-hidden="true">G</span> Pay
              </span>
            </div>

            <div className="payment-security-badges">
              <span>🔒 256-Bit SSL Encryption</span>
              <span>⚡ Instant Verification</span>
              <span>🏛️ 100% Thai Govt Escrow</span>
            </div>
          </div>
        </div>

        {/* Office Location & Interactive Map Trigger Card */}
        <div
          id="location"
          className={`gov-office-location-card ${isMapOpen ? 'active-expanded' : ''}`}
          onClick={handleToggleMap}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleToggleMap();
            }
          }}
          aria-expanded={isMapOpen}
          aria-label="Toggle Thailand Government Office Location Map"
        >
          <div className="gov-office-info">
            <div className="gov-pin-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div className="gov-office-text">
              <div className="gov-office-header-line">
                <strong className="gov-office-title">สำนักงานสลากกินแบ่งรัฐบาล (GLO Bangkok HQ)</strong>
                <span className="gov-verified-pill">● প্রধান কার্যালয়</span>
              </div>
              <p className="gov-office-address">
                333 Phahonyothin Rd, Chatuchak, Bangkok 10900, Thailand
              </p>
              <span className="gov-click-hint">
                👉 ব্যাংকক অফিসের লাইভ ম্যাপ দেখতে ক্লিক করুন
              </span>
            </div>
          </div>

          <button
            type="button"
            className="gov-map-toggle-btn"
            onClick={(e) => {
              e.stopPropagation();
              handleToggleMap();
            }}
          >
            <span>{isMapOpen ? '✕ বন্ধ করুন' : '🗺️ ম্যাপ দেখুন'}</span>
            <span className="toggle-chevron" aria-hidden="true">
              {isMapOpen ? '▲' : '▼'}
            </span>
          </button>
        </div>

        {/* Expandable Live Interactive Google Map View */}
        {isMapOpen && (
          <div className="gov-interactive-map-wrapper" ref={mapSectionRef}>
            <div className="gov-map-header">
              <div className="gov-map-title-block">
                <span className="gov-thai-badge">
                  <ThaiFlag width={16} height={11} style={{ marginRight: '5px' }} />
                  สำนักงานสลากกินแบ่งรัฐบาล • THAILAND
                </span>
                <h4>The Government Lottery Office (GLO) Bangkok Headquarters</h4>
                <p>📍 359 Nonthaburi Rd, Tha Sai, Mueang Nonthaburi, Bangkok 11000, Thailand</p>
              </div>
              <div className="gov-map-actions">
                <a
                  href="https://www.google.com/maps?q=The+Government+Lottery+Office,+Bangkok,+Thailand"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gov-map-ext-link"
                >
                  ম্যাপে যান ↗
                </a>
                <button
                  type="button"
                  className="gov-map-close-btn"
                  onClick={handleToggleMap}
                  title="Close Map"
                  aria-label="Close Map"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Official Prominent Thailand Point Bar */}
            <div className="gov-map-verified-strip">
              <div className="gov-map-strip-left">
                <span className="gov-map-pulse-dot" aria-hidden="true" />
                <ThaiFlag width={22} height={14} />
                <span className="gov-map-strip-title">
                  ম্যাপ লোকেশন পয়েন্ট: <strong>ব্যাংকক, থাইল্যান্ড (Bangkok, Thailand)</strong>
                </span>
              </div>
              <span className="gov-map-strip-badge">✓ Google Verified GLO HQ</span>
            </div>

            <div className="gov-map-iframe-container">
              <iframe
                title="The Government Lottery Office (GLO) Bangkok, Thailand Interactive Map"
                src="https://maps.google.com/maps?q=The+Government+Lottery+Office,+Bangkok,+Thailand&t=&z=14&ie=UTF8&iwloc=&output=embed"
                loading="eager"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="gov-office-meta-bar">
              <div className="meta-item">
                <span className="meta-label">OFFICE LOCATION:</span>
                <strong>
                  <ThaiFlag width={18} height={12} style={{ marginRight: '6px' }} />
                  Bangkok, Thailand
                </strong>
              </div>
              <div className="meta-item">
                <span className="meta-label">OFFICE HOURS:</span>
                <strong>Mon - Fri 08:30 - 16:30 ICT</strong>
              </div>
              <div className="meta-item">
                <span className="meta-label">HOTLINE:</span>
                <strong>+66 2 528 9999</strong>
              </div>
              <div className="meta-item">
                <span className="meta-label">STATUS:</span>
                <strong className="status-live">● GLO ACTIVE</strong>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
