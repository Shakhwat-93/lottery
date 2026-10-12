import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroVideo from '../components/HeroVideo';
import TrustHero from '../components/TrustHero';
import Certificates from '../components/Certificates';
import VipOfferTimer from '../components/VipOfferTimer';
import PaymentMethods from '../components/PaymentMethods';
import CustomerReview from '../components/CustomerReview';
import PreviousWinners from '../components/PreviousWinners';
import OnlineForm from '../components/OnlineForm';
import GamePanelCta from '../components/GamePanelCta';
import { useMediaCoordinator } from '../hooks/useMediaCoordinator';

export default function HomePage() {
  const { heroVideoRef, reviewVideoRef, handleHeroClick } = useMediaCoordinator();

  return (
    <>
      <Header page="home" />
      <main id="top">
        <HeroVideo videoRef={heroVideoRef} onVideoClick={handleHeroClick} />
        <TrustHero />
        <Certificates />
        <VipOfferTimer />
        <OnlineForm />
        <PreviousWinners />
        <PaymentMethods />
        <CustomerReview videoRef={reviewVideoRef} />
        <GamePanelCta />
      </main>
      <Footer page="home" />
    </>
  );
}
