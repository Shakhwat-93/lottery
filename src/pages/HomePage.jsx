import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroVideo from '../components/HeroVideo';
import TrustHero from '../components/TrustHero';
import Certificates from '../components/Certificates';
import VipOfferTimer from '../components/VipOfferTimer';
import FormShowcase from '../components/FormShowcase';
import PaymentMethods from '../components/PaymentMethods';
import CustomerReview from '../components/CustomerReview';
import PreviousWinners from '../components/PreviousWinners';
import SurePaperSlider from '../components/SurePaperSlider';
import GamePanelCta from '../components/GamePanelCta';
import { useMediaCoordinator } from '../hooks/useMediaCoordinator';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function HomePage() {
  const { heroVideoRef, reviewVideoRef, handleHeroClick } = useMediaCoordinator();
  useScrollReveal();

  return (
    <>
      <Header page="home" />
      <main id="top">
        <HeroVideo videoRef={heroVideoRef} onVideoClick={handleHeroClick} />
        <TrustHero />
        <Certificates />
        <VipOfferTimer />
        <FormShowcase />
        <PreviousWinners />
        <CustomerReview videoRef={reviewVideoRef} />
        <PaymentMethods />
        <section className="section three-set-home-strip reveal-on-scroll" id="three-set-game-section">
          <div className="three-set-home-card">
            <div className="three-set-glow-ring" aria-hidden="true" />
            <div className="three-set-home-text">
              <span className="three-set-badge-tag">✦ VIP OFFICIAL DOCUMENT ✦</span>
              <h3>থাইল্যান্ড লটারি 3 সেট গেম পেপার 2026</h3>
              <p>অফিসিয়াল 3 সেট গেম পেপার ও লাইসেন্সকৃত অনুমোদনপত্র দেখতে নিচে ক্লিক করুন:</p>
            </div>
            <Link to="/3-set-game" className="three-set-glowing-btn" aria-label="Open 3 set game document">
              <span className="three-set-shimmer" aria-hidden="true" />
              <span className="three-set-icon" aria-hidden="true">👑</span>
              <span className="three-set-text">3 set game</span>
              <span className="three-set-arrow" aria-hidden="true">➔</span>
            </Link>
          </div>
        </section>
        <SurePaperSlider />
        <GamePanelCta />
      </main>
      <Footer page="home" />
    </>
  );
}
