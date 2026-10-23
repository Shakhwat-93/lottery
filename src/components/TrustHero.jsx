import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FacebookLiveStream from './FacebookLiveStream';

export default function TrustHero() {
  const [copied, setCopied] = useState(false);
  const phoneNumber = '+8801309802224';
  const cleanPhone = '8801309802224';

  const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent('আসসালামু আলাইকুম, মোঃ ফাহিম স্যারের সাথে সরাসরি যোগাযোগ করতে চাই।')}`;
  const imoUrl = `imo://chat?phone=${cleanPhone}`;

  const copyNumber = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(phoneNumber);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleImoClick = (e) => {
    if (/Mobi|Android|iPhone/i.test(navigator.userAgent)) {
      window.location.href = imoUrl;
      setTimeout(() => {
        window.location.href = `tel:${phoneNumber}`;
      }, 700);
    } else {
      copyNumber();
      alert(`IMO নম্বর: ${phoneNumber} (কপি করা হয়েছে)`);
    }
  };

  return (
    <section className="hero reveal-on-scroll">
      <div className="hero-content">
        <p className="eyebrow hero-eyebrow-multiline">
          ราชอาณาจักรไทย&nbsp;•&nbsp;THAILAND OFFICIAL LOTTERY&nbsp;•&nbsp;সরকারি অনুমোদনপ্রাপ্ত
        </p>
        <h1 className="hero-main-title">
          <span className="hero-title-welcome">Welcome To</span>
          <span className="hero-title-main">Thailand Lottery</span>
          <span className="hero-title-year">2026</span>
        </h1>
        <p className="hero-copy hero-copy-paragraph">
          থাইল্যান্ড সরকারের গভর্নমেন্ট লটারির অফিস (GLO) দ্বারা সরাসরি লাইসেন্সপ্রাপ্ত ও আন্তর্জাতিকভাবে বিশ্বস্ত প্ল্যাটফর্ম। ১০০% নিরাপদ লেনদেন, ভেরিফাইড রেজাল্ট ও অফিসিয়াল মেম্বারশিপ সেবা।
        </p>

        <div className="trust-list" aria-label="Trust signals">
          <span>✓ লাইসেন্স নং TGL-2025-001784</span>
          <span>★ সেরা এজেন্ট ২০২৬ (Best Agent)</span>
        </div>

        <div className="hero-actions">
          <Link className="button primary" to="/form">
            রেজিস্ট্রেশন
          </Link>
          <a className="button secondary" href="#certificate">
            লাইসেন্স যাচাই
          </a>
        </div>
      </div>

      <div className="hero-certificate-column">
        {/* Facebook Live Streaming Video (Directly Above Agent Certificate) */}
        <FacebookLiveStream />

        <figure className="hero-certificate">
        {/* Elite Official Government Agent Credential Header */}
        <div className="agent-official-credential-card">
          {/* Top Government Tag & Live Verification Status */}
          <div className="agent-credential-header">
            <div className="agent-gov-authority">
              <svg className="agent-thai-flag-mini" viewBox="0 0 24 16" width="20" height="13" aria-hidden="true">
                <rect width="24" height="16" fill="#A51931" />
                <rect y="2.67" width="24" height="10.66" fill="#F4F5F8" />
                <rect y="5.33" width="24" height="5.34" fill="#2D2A4A" />
              </svg>
              <span className="agent-gov-text">สำนักงานสลากกินแบ่งรัฐบาล • GLO AUTHORIZED</span>
            </div>
            <div className="agent-verified-pill">
              <span className="pulse-dot" aria-hidden="true"></span>
              <span>VERIFIED 2026</span>
            </div>
          </div>

          {/* Agent Main Identity */}
          <div className="agent-main-identity">
            <div className="agent-seal-container" aria-hidden="true">
              <div className="agent-gold-medal">
                <span className="medal-crown">🏆</span>
                <span className="medal-year">2026</span>
              </div>
            </div>

            <div className="agent-text-details">
              <div className="agent-title-kicker">
                <span>GLO BANGKOK ACCREDITED AGENT</span>
              </div>
              <div className="agent-name-display">
                <h3 className="agent-name-bengali">মোঃ ফাহিম চৌধুরী</h3>
                <span className="agent-verified-badge" title="Government Verified Official Agent">
                  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                    <path
                      fill="#1D9BF0"
                      d="M22.25 12c0-1.43-.88-2.67-2.19-3.19.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.52-1.31-1.76-2.19-3.19-2.19s-2.67.88-3.19 2.19c-1.39-.46-2.9-.2-3.91.81s-1.27 2.52-.81 3.91C2.93 9.33 2.05 10.57 2.05 12s.88 2.67 2.19 3.19c-.46 1.39-.2 2.9.81 3.91s2.52 1.27 3.91.81c.52 1.31 1.76 2.19 3.19 2.19s2.67-.88 3.19-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.52 2.19-1.76 2.19-3.19z"
                    />
                    <path fill="#FFFFFF" d="M10.09 16.72l-4.14-4.14 1.41-1.41 2.73 2.73 6.13-6.13 1.41 1.41-7.54 7.54z" />
                  </svg>
                </span>
                <span className="agent-name-english">Fahim Chowdhury</span>
              </div>
            </div>
          </div>

          {/* Credentials Data Bar */}
          <div className="agent-credentials-bar">
            <div className="agent-data-item">
              <span className="data-label">LICENSE NO:</span>
              <strong className="data-value highlight">GLO-BD-2026-001784</strong>
            </div>
            <div className="agent-data-item">
              <span className="data-label">HEAD OFFICE:</span>
              <strong className="data-value">Bangkok, Thailand</strong>
            </div>
            <div className="agent-data-item status-item">
              <span className="data-check">✓</span>
              <span className="data-status">100% GLO ACCREDITED</span>
            </div>
          </div>

          {/* Agent Direct Official Contact (IMO & WhatsApp) */}
          <div className="agent-direct-contact-section" aria-label="Direct Agent Contact">
            <div className="agent-contact-header">
              <span className="agent-contact-live-dot" aria-hidden="true" />
              <div className="agent-contact-prompt">
                <span className="agent-contact-prompt-main">
                  ফাহিম চৌধুরীর সাথে সরাসরি IMO বা WhatsApp-এ যোগাযোগ করতে নিচে ক্লিক করুন
                </span>
                <span className="agent-contact-prompt-sub">
                  যেকোনো প্রশ্ন, তথ্য বা সরাসরি সহায়তার জন্য ২৪/৭ লাইভ যোগাযোগ
                </span>
              </div>
            </div>

            <div className="agent-contact-grid">
              {/* WhatsApp Button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="agent-contact-btn agent-btn-whatsapp"
                title="WhatsApp-এ মেসেজ পাঠান: +8801309802224"
              >
                <div className="agent-contact-icon-box wa-icon-box">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="#FFFFFF" aria-hidden="true">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </div>
                <div className="agent-contact-btn-body">
                  <span className="agent-contact-btn-tag">WHATSAPP CHAT</span>
                  <span className="agent-contact-btn-num">{phoneNumber}</span>
                </div>
                <span className="agent-contact-badge-action">মেসেজ ➔</span>
              </a>

              {/* IMO Button */}
              <a
                href={imoUrl}
                onClick={handleImoClick}
                className="agent-contact-btn agent-btn-imo"
                title="IMO-তে যোগাযোগ করুন: +8801309802224"
              >
                <div className="agent-contact-icon-box imo-icon-box">
                  <span className="agent-imo-icon-text">imo</span>
                </div>
                <div className="agent-contact-btn-body">
                  <span className="agent-contact-btn-tag">IMO SUPPORT</span>
                  <span className="agent-contact-btn-num">{phoneNumber}</span>
                </div>
                <span className="agent-contact-badge-action">কল / চ্যাট ➔</span>
              </a>
            </div>

            {/* Helpline bar & copy */}
            <div className="agent-contact-bar-footer">
              <span className="agent-contact-live-status">
                <span className="agent-live-signal" />
                ফাহিম চৌধুরী সক্রিয় আছেন (24/7 Live)
              </span>
              <button
                type="button"
                onClick={copyNumber}
                className={`agent-contact-copy-pill ${copied ? 'is-copied' : ''}`}
                title="নম্বর কপি করুন"
              >
                {copied ? '✓ কপি হয়েছে!' : '📋 নম্বর কপি করুন'}
              </button>
            </div>
          </div>
        </div>

        {/* Certificate Display */}
        <div className="certificate-img-container">
          <div className="certificate-seal" aria-hidden="true">
            <span>🏆</span>
            <strong>BEST AGENT</strong>
            <small>GLO 2026</small>
          </div>
          <img
            src="/assets/site/best-agent-certificate.jpg"
            alt="Thailand Lottery Official Government Best Agent Certificate 2026"
          />
        </div>
      </figure>
    </div>
  </section>
  );
}
