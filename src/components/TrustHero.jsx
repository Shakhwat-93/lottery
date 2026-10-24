import React from 'react';
import { Link } from 'react-router-dom';
import FacebookLiveStream from './FacebookLiveStream';

export default function TrustHero() {
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
