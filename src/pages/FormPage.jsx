import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import OnlineForm from '../components/OnlineForm';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function FormPage() {
  useScrollReveal();

  useEffect(() => {
    document.body.classList.add('form-page');
    window.scrollTo(0, 0);
    return () => {
      document.body.classList.remove('form-page');
    };
  }, []);

  return (
    <>
      <Header page="form" />
      <main className="form-page-main">
        {/* Breadcrumb & Navigation Bar */}
        <div className="form-page-topbar">
          <div className="form-page-topbar-inner">
            <Link to="/" className="form-back-link">
              <span className="back-arrow">←</span>
              <span>হোমপেজে ফিরুন</span>
            </Link>
            <div className="form-page-security-tag">
              <span className="lock-icon">🔒</span>
              <span>GLO অফিশিয়াল নিরাপদ সার্ভার</span>
            </div>
          </div>
        </div>

        {/* Dedicated Form Component */}
        <OnlineForm isStandalonePage={true} />
      </main>
      <Footer page="form" />
    </>
  );
}
