import React, { useState, useRef } from 'react';
import { useVipCodeSettings } from '../hooks/useVipCodeSettings';

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
  const settings = useVipCodeSettings();
  const agentName = settings.agentName || 'মোঃ ফাহিম চৌধুরী';

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

              {/* 1-Set VIP Game Govt Treasury Clearance & Calculation Highlight */}
              <div className="payee-clearance-highlight" aria-label="1-Set VIP Game Govt Treasury Clearance Notice">
                <div className="clearance-badge-row">
                  <span className="clearance-tag-pill">
                    <span className="clearance-sparkle" aria-hidden="true">👑</span> ১ সেট ভিআইপি গেম ক্লিয়ারেন্স নোটিশ
                  </span>
                  <span className="clearance-flag-pill">
                    <ThaiFlag width={15} height={10} style={{ marginRight: '5px' }} />
                    থাইল্যান্ড সেন্ট্রাল ট্রেজারি
                  </span>
                </div>

                <div className="clearance-main-statement">
                  <p>
                    থাইল্যান্ড থেকে <strong className="clearance-highlight-game">১ সেট ভিআইপি গেম</strong> সরাসরি নিয়ে আসতে সিনিয়র এজেন্ট <strong className="clearance-highlight-agent">{agentName}</strong>-কে বাংলাদেশি টাকায় <strong className="clearance-highlight-amt">৮ লাখ টাকা (৳ ৮,০০,০০০)</strong> সরাসরি থাইল্যান্ড সরকারকে সরকারি ট্রেজারি ফি প্রদান করতে হয়।
                  </p>
                </div>

                <div className="clearance-currency-calc">
                  <div className="curr-calc-card bdt-card">
                    <span className="curr-flag-label">🇧🇩 বাংলাদেশি টাকায় মোট ফি</span>
                    <strong className="curr-amount-highlight">৳ ৮,০০,০০০</strong>
                    <span className="curr-subtext">৮ লাখ টাকা (BDT)</span>
                  </div>

                  <div className="curr-calc-card thb-card">
                    <span className="curr-flag-label">
                      <ThaiFlag width={14} height={9} style={{ marginRight: '4px' }} />
                      থাইল্যান্ড কারেন্সিতে (THB)
                    </span>
                    <strong className="curr-amount-highlight">฿ ২,১৬,০০০</strong>
                    <span className="curr-subtext">২ লাখ ১৬ হাজার বাথ (Thai Baht)</span>
                  </div>
                </div>

                <div className="clearance-exchange-bar">
                  <span className="exchange-arrow" aria-hidden="true">⇄</span>
                  <span>অফিসিয়াল এক্সচেঞ্জ রেট ক্যালকুলেশন: <strong>১ ฿ (বাথ) ≈ ৩.৭০ ৳</strong> অনুযায়ী মোট <strong>২,১৬,০০০ থাই বাথ</strong></span>
                </div>

                {/* Government Treasury Verified Payment & Account Proof Slip */}
                <div className="clearance-treasury-account-box">
                  <div className="treasury-account-header">
                    <div className="treasury-account-title-wrap">
                      <span className="treasury-bank-emblem" aria-hidden="true">🏛️</span>
                      <div>
                        <strong className="treasury-account-heading">থাইল্যান্ড সরকারি ট্রেজারি ডিপোজিট অ্যাকাউন্ট</strong>
                        <span className="treasury-account-subheading">Royal Thai Govt Treasury Official Escrow Account</span>
                      </div>
                    </div>
                    <span className="treasury-verified-badge">
                      <span className="treasury-pulse-dot" aria-hidden="true" /> পেমেন্ট ডিপোজিট ভেরিফাইড
                    </span>
                  </div>

                  <div className="treasury-details-grid">
                    <div className="treasury-field-cell">
                      <span className="t-label">সরকারি ডিপোজিট ব্যাংক:</span>
                      <strong className="t-val">Krungthai Bank (KTB - ธนาคารกรุงไทย)</strong>
                      <span className="t-sub">ব্যাংকক সেন্ট্রাল গভঃ ট্রেজারি ব্রাঞ্চ</span>
                    </div>

                    <div className="treasury-field-cell highlight-cell">
                      <span className="t-label">ট্রেজারি অ্যাকাউন্ট নম্বর (Treasury A/C):</span>
                      <div className="t-ac-row">
                        <strong className="t-val ac-code">068-6-01824-3</strong>
                        <span className="t-code-tag">KTB-GLO-GOV</span>
                      </div>
                      <span className="t-sub">সরাসরি থাইল্যান্ড কেন্দ্রীয় রাজস্ব ডিপোজিট অ্যাকাউন্ট</span>
                    </div>

                    <div className="treasury-field-cell">
                      <span className="t-label">অ্যাকাউন্টের নাম (Official Payee):</span>
                      <strong className="t-val">The Government Lottery Office (GLO) Treasury</strong>
                      <span className="t-sub">সরাসরি থাইল্যান্ড সরকার (Royal Thai Govt)</span>
                    </div>

                    <div className="treasury-field-cell">
                      <span className="t-label">ট্রেজারি চালান ও ট্যাক্স ভেরিফিকেশন:</span>
                      <strong className="t-val mono-code">TAX ID: 0994000164944</strong>
                      <span className="t-sub">চালান কোড: <strong>GLO-TR-800K-CLEARED</strong></span>
                    </div>
                  </div>

                  <div className="treasury-status-strip">
                    <span className="strip-item">
                      <span className="check-mark">✓</span> ব্যাংক সুইফট: <strong>KRTHBKTH</strong>
                    </span>
                    <span className="strip-dot" aria-hidden="true">•</span>
                    <span className="strip-item">
                      <span className="check-mark">✓</span> ডিপোজিট স্টেটাস: <strong className="status-paid-text">৮ লাখ টাকা পেইড ও ক্লিয়ার্ড</strong>
                    </span>
                    <span className="strip-dot" aria-hidden="true">•</span>
                    <span className="strip-item">
                      <span className="check-mark">✓</span> পেপার রিলিজ: <strong className="status-active-text">অনুমোদিত</strong>
                    </span>
                  </div>
                </div>

                <div className="clearance-notice-footer">
                  <span className="footer-shield-icon" aria-hidden="true">🛡️</span>
                  <span>
                    থাইল্যান্ড সরকারের গভঃ লটারি অফিস (GLO) সেন্ট্রাল ট্রেজারি রুলস অনুযায়ী এই সম্পূর্ণ ফি সরকারি ব্যাংক অ্যাকাউন্টে জমা প্রদান সাপেক্ষে ১ সেট মাস্টার পেপার রিলিজ করা হয়।
                  </span>
                </div>
              </div>
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
