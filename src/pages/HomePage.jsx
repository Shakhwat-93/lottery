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
import GamePanelCta from '../components/GamePanelCta';
import ThreeUpGameBox from '../components/ThreeUpGameBox';
import { useMediaCoordinator } from '../hooks/useMediaCoordinator';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function HomePage() {
  const { heroVideoRef, reviewVideoRef, handleHeroClick, handleReviewVideoPlay } = useMediaCoordinator();
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
        <PaymentMethods />
        <GamePanelCta />

        {/* 
        ========================================================================
        HIDDEN SECTIONS: Game & Calculation Paper (hidden as per user request)
        ========================================================================
        <section className="game-panel reveal-on-scroll" id="game-strip-section">
          <div>
            <p className="eyebrow">VIP ACCESS</p>
            <h2>Game</h2>
            <p>
              <strong className="clarity-digit">100%</strong> নিশ্চিত অফিসিয়াল গেম পেপার ও ভিআইপি ড্র রেজাল্ট দেখতে প্রবেশ করুন।
            </p>
          </div>

          <div className="game-panel-buttons-stack" aria-label="Game Dates">
            <Link
              to="/game-paper?date=01-11-2026"
              className="button primary vip-agency-date-btn"
              aria-label="Game Draw Date 01-11-2026"
            >
              <span>01-11-2026</span>
              <span className="vip-btn-arrow" aria-hidden="true">↗</span>
            </Link>
            <Link
              to="/game-paper?date=16-11-2026"
              className="button primary vip-agency-date-btn"
              aria-label="Game Special Draw Date 16-11-2026"
            >
              <span>16-11-2026</span>
              <span className="vip-btn-arrow" aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>

        <section className="game-panel reveal-on-scroll" id="calculation-paper-section">
          <div>
            <p className="eyebrow">VIP ACCESS</p>
            <h2>Calculation Paper</h2>
            <p>
              <strong className="clarity-digit">100%</strong> নিশ্চিত ১ বছরের ২৪ সেট অফিসিয়াল ক্যালকুলেশন পেপার দেখতে প্রবেশ করুন।
            </p>
          </div>

          <div className="game-panel-buttons-stack" aria-label="Calculation Paper Dates">
            <Link
              to="/game-paper?type=calc&date=01-11-2026"
              className="button primary vip-agency-date-btn"
              aria-label="Calculation Paper Draw Date 01-11-2026"
            >
              <span>01-11-2026</span>
              <span className="vip-btn-arrow" aria-hidden="true">↗</span>
            </Link>
            <Link
              to="/game-paper?type=calc&date=16-11-2026"
              className="button primary vip-agency-date-btn"
              aria-label="Calculation Paper Special Draw Date 16-11-2026"
            >
              <span>16-11-2026</span>
              <span className="vip-btn-arrow" aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
        */}

        <ThreeUpGameBox />
        <PreviousWinners />
        <CustomerReview videoRef={reviewVideoRef} onReviewVideoPlay={handleReviewVideoPlay} />
      </main>
      <Footer page="home" />
    </>
  );
}
