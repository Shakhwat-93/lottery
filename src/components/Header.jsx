import React from 'react';
import { Link } from 'react-router-dom';

export default function Header({ page = 'home' }) {
  const isGamePage = page === 'game';
  const tickerText = isGamePage
    ? 'สำนักงานสลากกินแบ่งรัฐบาล • VIP 100% SURE PAPERS • คลังเอกสาร VIP'
    : 'สำนักงานสลากกินแบ่งรัฐบาล • THE GOVERNMENT LOTTERY OFFICE (GLO) • 100% OFFICIAL';

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
              <svg
                className="brand-verified-tick"
                viewBox="0 0 24 24"
                aria-label="Verified"
                title="Official Verified"
              >
                <path
                  fill="#1D9BF0"
                  d="M22.25 12c0-1.43-.88-2.67-2.19-3.19.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.52-1.31-1.76-2.19-3.19-2.19s-2.67.88-3.19 2.19c-1.39-.46-2.9-.2-3.91.81s-1.27 2.52-.81 3.91C2.93 9.33 2.05 10.57 2.05 12s.88 2.67 2.19 3.19c-.46 1.39-.2 2.9.81 3.91s2.52 1.27 3.91.81c.52 1.31 1.76 2.19 3.19 2.19s2.67-.88 3.19-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.52 2.19-1.76 2.19-3.19z"
                />
                <path
                  fill="#FFFFFF"
                  d="M10.09 16.72l-4.14-4.14 1.41-1.41 2.73 2.73 6.13-6.13 1.41 1.41-7.54 7.54z"
                />
              </svg>
            </strong>
            <span className="brand-ticker-wrap">
              <small className="brand-ticker-track">
                <span>{tickerText}</span>
                <span>{tickerText}</span>
              </small>
            </span>
          </span>
        </Link>

        {/* Mobile quick action button */}
        {!isGamePage ? (
          <Link to="/game" className="mobile-header-cta" aria-label="100% Sure Paper">
            <span>100% Sure</span>
          </Link>
        ) : (
          <Link to="/" className="mobile-header-cta" aria-label="Home">
            <span>Home • หน้าหลัก</span>
          </Link>
        )}

        <div className="nav-panel">
          <nav className="nav-links" aria-label="Primary navigation">
            {!isGamePage ? (
              <>
                <a href="#certificate">Certificates • ใบรับรอง</a>
                <a href="#vip-offer">VIP Quota • โควตา</a>
                <a href="#online-form">Register • ลงทะเบียน</a>
                <a href="#previous-winners">Winners • ผู้ชนะ</a>
                <a href="#customer-review">Review • รีวิว</a>
                <a href="#location">Bangkok HQ • ที่ตั้ง</a>
                <Link className="nav-cta" to="/game">
                  100% Sure Paper
                </Link>
              </>
            ) : (
              <>
                <Link to="/">Home • หน้าหลัก</Link>
                <a href="#game-papers">VIP Papers • เอกสาร</a>
                <a href="#download">Direct Game ↗</a>
              </>
            )}
          </nav>
        </div>
      </header>
    </>
  );
}
