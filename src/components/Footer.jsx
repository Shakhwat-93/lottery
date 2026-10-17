import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer({ page = 'home' }) {
  const isGamePage = page === 'game';

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer" id="site-footer">
      <div className="footer-inner">
        {/* Brand / Official GLO Identity Header */}
        <div className="footer-brand">
          <div className="footer-logo-wrap">
            <img
              src="/assets/logo.png"
              alt="Thailand Government Lottery Office Logo"
              className="footer-logo-img"
              width="44"
              height="44"
            />
            <div className="footer-brand-meta">
              <span className="footer-brand-title">Thailand Official Lottery</span>
              <span className="footer-brand-sub">สำนักงานสลากกินแบ่งรัฐบาล • GLO Bangkok HQ</span>
            </div>
          </div>

          {/* Sleek, Non-Wrapping Back to Top Button */}
          <a href="#top" onClick={scrollToTop} className="footer-back-to-top" aria-label="Back to top">
            <span>উপরে যান</span>
            <span className="back-top-arrow" aria-hidden="true">↑</span>
          </a>
        </div>

        {/* Divider line */}
        <div className="footer-divider" />

        {/* Legal & Age Disclaimer Grid */}
        <div className="footer-content">
          <div className="footer-disclaimer-box">
            <span className="footer-18-badge">18+</span>
            <p className="footer-warning-text">
              <strong>সতর্কতা:</strong> শুধুমাত্র ১৮+ বছর বা তদূর্ধ্ব বয়স্কদের জন্য প্রযোজ্য। থাইল্যান্ড সরকারের গভর্নমেন্ট লটারি আইন অনুযায়ী পরিচালিত।
            </p>
          </div>

          <p className="footer-copyright">
            © 2026 Thailand Lottery Head Office (สำนักงานสลากกินแบ่งรัฐบาล). All Rights Reserved.
          </p>

          {isGamePage && (
            <div className="footer-nav-link">
              <Link to="/" className="footer-home-btn">
                ← กลับหน้าหลัก (হোমে ফিরুন)
              </Link>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
