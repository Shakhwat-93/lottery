import React from 'react';
import { Link } from 'react-router-dom';

export default function Header({ page = 'home' }) {
  const isGamePage = page === 'game';
  const isFormPage = page === 'form';
  const tickerText = isGamePage
    ? 'สำนักงานสลากกินแบ่งรัฐบาล • VIP 100% SURE PAPERS'
    : isFormPage
    ? 'สำนักงานสลากกินแบ่งรัฐบาล • OFFICIAL MEMBERSHIP FORM 2026'
    : 'สำนักงานสลากกินแบ่งรัฐบาล • Thailand Official Lottery (GLO)';

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <>
      <div className="thai-flag-top-strip" aria-hidden="true" />
      <header className="site-header">
        <Link to="/" className="brand" aria-label="Thailand Lottery home">
          <span className="brand-mark" aria-hidden="true">
            <img
              src="/assets/logo.png?v=4"
              alt="Thailand Lottery Official Logo"
              className="brand-logo"
              width="52"
              height="52"
            />
          </span>
          <span className="brand-text">
            <strong className="brand-title">
              <span>Thailand Lottery</span>
            </strong>
            <span className="brand-subtitle">
              สำนักงานสลากกินแบ่งรัฐบาล • সরকারি অনুমোদিত
            </span>
          </span>
        </Link>

        {/* Mobile Hamburger Button with Gold Pill Outline */}
        <button
          type="button"
          className="header-hamburger-btn"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
        </button>

        <div className={`nav-panel ${mobileMenuOpen ? 'is-open' : ''}`}>
          <nav className="nav-links" aria-label="Primary navigation">
            {page === 'home' && (
              <>
                <a href="#certificate" onClick={() => setMobileMenuOpen(false)}>Certificates</a>
                <a href="#vip-offer" onClick={() => setMobileMenuOpen(false)}>VIP Quota</a>
                <Link to="/form" onClick={() => setMobileMenuOpen(false)}>Register</Link>
                <a href="#previous-winners" onClick={() => setMobileMenuOpen(false)}>Winners</a>
                <a href="#customer-review" onClick={() => setMobileMenuOpen(false)}>Reviews</a>
                <a href="#location" onClick={() => setMobileMenuOpen(false)}>Bangkok HQ</a>
                <Link className="nav-cta" to="/game" onClick={() => setMobileMenuOpen(false)}>
                  Sure Paper
                </Link>
              </>
            )}
            {page === 'game' && (
              <>
                <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
                <Link to="/form" onClick={() => setMobileMenuOpen(false)}>Official Form</Link>
                <a href="#game-papers" onClick={() => setMobileMenuOpen(false)}>VIP Papers</a>
                <a href="#download" onClick={() => setMobileMenuOpen(false)}>Direct Game ↗</a>
              </>
            )}
            {page === 'form' && (
              <>
                <Link to="/" onClick={() => setMobileMenuOpen(false)}>← Home</Link>
                <Link to="/3-set-game" onClick={() => setMobileMenuOpen(false)}>3 Set Game</Link>
                <Link to="/game" onClick={() => setMobileMenuOpen(false)}>VIP Sure Papers</Link>
                <a href="#online-form" className="nav-cta" onClick={() => setMobileMenuOpen(false)}>
                  ফর্ম পূরণ করুন
                </a>
              </>
            )}
            {page === '3-set-game' && (
              <>
                <Link to="/" onClick={() => setMobileMenuOpen(false)}>← Home</Link>
                <Link to="/form" onClick={() => setMobileMenuOpen(false)}>মেম্বারশিপ ফর্ম</Link>
                <Link to="/game" onClick={() => setMobileMenuOpen(false)}>VIP Sure Papers</Link>
                <Link to="/3-set-game" className="nav-cta" onClick={() => setMobileMenuOpen(false)}>
                  3 Set Game
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
    </>
  );
}
