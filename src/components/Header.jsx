import React from 'react';
import { Link } from 'react-router-dom';

export default function Header({ page = 'home' }) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Close menu on ESC key and prevent body scroll when open
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

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
            <span className="brand-title-wrap">
              <strong className="brand-title">Thailand Lottery</strong>
              {/* Blue Verified Check Badge */}
              <svg
                className="brand-verified-badge"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                aria-label="Official Verified"
                role="img"
              >
                <path
                  fill="#1D9BF0"
                  d="M22.25 12c0-1.43-.88-2.67-2.19-3.21.34-1.41-.09-2.92-1.15-3.98s-2.57-1.49-3.98-1.15C14.39 2.35 13.15 1.47 11.72 1.47s-2.67.88-3.21 2.19c-1.41-.34-2.92.09-3.98 1.15s-1.49 2.57-1.15 3.98C2.07 9.33 1.19 10.57 1.19 12s.88 2.67 2.19 3.21c-.34 1.41.09 2.92 1.15 3.98s2.57 1.49 3.98 1.15c.54 1.31 1.78 2.19 3.21 2.19s2.67-.88 3.21-2.19c1.41.34 2.92-.09 3.98-1.15s1.49-2.57 1.15-3.98c1.31-.54 2.19-1.78 2.19-3.21z"
                />
                <path
                  fill="#ffffff"
                  d="M10.2 16.2 6.5 12.5l1.42-1.42 2.28 2.29 6.58-6.58 1.42 1.42-8 8z"
                />
              </svg>
            </span>
            {/* Automatic Seamless Marquee for Thai Subtitle */}
            <div className="brand-subtitle-marquee-wrap" aria-label="สำนักงานสลากกินแบ่งรัฐบาล • সরকারি অনুমোদিত">
              <div className="brand-subtitle-marquee-track">
                <span className="brand-subtitle-item">สำนักงานสลากกินแบ่งรัฐบาล • সরকারি অনুমোদিত</span>
                <span className="brand-subtitle-item" aria-hidden="true">สำนักงานสลากกินแบ่งรัฐบาล • সরকারি অনুমোদিত</span>
              </div>
            </div>
          </span>
        </Link>

        {/* Mobile Hamburger Button with Gold Pill Outline */}
        <button
          type="button"
          className={`header-hamburger-btn ${mobileMenuOpen ? 'is-active' : ''}`}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
        >
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
        </button>

        {/* Backdrop for Mobile Sidebar Drawer */}
        <div
          className={`mobile-nav-backdrop ${mobileMenuOpen ? 'is-active' : ''}`}
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />

        <div className={`nav-panel ${mobileMenuOpen ? 'is-open' : ''}`}>
          <div className="nav-panel-header">
            <div className="nav-panel-title-wrap">
              <img
                src="/assets/logo.png?v=4"
                alt="Logo"
                className="nav-panel-logo"
                width="26"
                height="26"
              />
              <span className="nav-panel-title">MENU</span>
            </div>
            <button
              type="button"
              className="nav-panel-close-btn"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          <nav className="nav-links" aria-label="Primary navigation">
            {page === 'home' && (
              <>
                <a href="#certificate" onClick={() => setMobileMenuOpen(false)}>
                  <span className="nav-icon">📜</span> Certificates
                </a>
                <a href="#vip-offer" onClick={() => setMobileMenuOpen(false)}>
                  <span className="nav-icon">⏳</span> VIP Quota
                </a>
                <Link to="/form" onClick={() => setMobileMenuOpen(false)}>
                  <span className="nav-icon">📝</span> Membership Form
                </Link>
                <a href="#previous-winners" onClick={() => setMobileMenuOpen(false)}>
                  <span className="nav-icon">🏆</span> Winners
                </a>
                <a href="#customer-review" onClick={() => setMobileMenuOpen(false)}>
                  <span className="nav-icon">⭐</span> Customer Reviews
                </a>
                <a href="#location" onClick={() => setMobileMenuOpen(false)}>
                  <span className="nav-icon">📍</span> Bangkok HQ
                </a>
                <Link className="nav-cta" to="/game" onClick={() => setMobileMenuOpen(false)}>
                  VIP Sure Paper ↗
                </Link>
              </>
            )}
            {page === 'game' && (
              <>
                <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                  <span className="nav-icon">🏠</span> Home
                </Link>
                <Link to="/form" onClick={() => setMobileMenuOpen(false)}>
                  <span className="nav-icon">📝</span> Official Form
                </Link>
                <a href="#game-papers" onClick={() => setMobileMenuOpen(false)}>
                  <span className="nav-icon">📄</span> VIP Papers
                </a>
                <a href="#download" className="nav-cta" onClick={() => setMobileMenuOpen(false)}>
                  Direct Game ↗
                </a>
              </>
            )}
            {page === 'form' && (
              <>
                <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                  <span className="nav-icon">🏠</span> Home
                </Link>
                <Link to="/3-set-game" onClick={() => setMobileMenuOpen(false)}>
                  <span className="nav-icon">🎲</span> 3 Set Game
                </Link>
                <Link to="/game" onClick={() => setMobileMenuOpen(false)}>
                  <span className="nav-icon">📄</span> VIP Sure Papers
                </Link>
                <a href="#online-form" className="nav-cta" onClick={() => setMobileMenuOpen(false)}>
                  ফর্ম পূরণ করুন ✍️
                </a>
              </>
            )}
            {page === '3-set-game' && (
              <>
                <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                  <span className="nav-icon">🏠</span> Home
                </Link>
                <Link to="/form" onClick={() => setMobileMenuOpen(false)}>
                  <span className="nav-icon">📝</span> মেম্বারশিপ ফর্ম
                </Link>
                <Link to="/game" onClick={() => setMobileMenuOpen(false)}>
                  <span className="nav-icon">📄</span> VIP Sure Papers
                </Link>
                <Link to="/3-set-game" className="nav-cta" onClick={() => setMobileMenuOpen(false)}>
                  3 Set Game 🎯
                </Link>
              </>
            )}
          </nav>

          <div className="nav-panel-footer">
            <span className="nav-panel-footer-text">
              สำนักงานสลากกินแบ่งรัฐบาล • GLO Official 2026
            </span>
          </div>
        </div>
      </header>
    </>
  );
}
