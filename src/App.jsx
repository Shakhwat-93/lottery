import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PWAInstallProvider } from './context/PWAInstallContext';
import InstallAppBanner from './components/InstallAppBanner';
import AppIntroSplash from './components/AppIntroSplash';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import FormPage from './pages/FormPage';
import ThreeSetGamePage from './pages/ThreeSetGamePage';
import VipAgencyCodePage from './pages/VipAgencyCodePage';
import GamePaperPage from './pages/GamePaperPage';

export default function App() {
  const [showIntro, setShowIntro] = useState(() => {
    try {
      if (window.location.search.includes('intro=1')) return true;
      const seen = sessionStorage.getItem('thai_lottery_intro_seen');
      return !seen;
    } catch {
      return true;
    }
  });

  const handleIntroComplete = () => {
    setShowIntro(false);
    try {
      sessionStorage.setItem('thai_lottery_intro_seen', 'true');
    } catch (e) {
      // ignore
    }
  };

  return (
    <PWAInstallProvider>
      {showIntro && <AppIntroSplash onComplete={handleIntroComplete} />}
      <BrowserRouter>
        <InstallAppBanner />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/form.html" element={<FormPage />} />
          <Route path="/registration" element={<FormPage />} />
          <Route path="/3-set-game" element={<ThreeSetGamePage />} />
          <Route path="/three-set-game" element={<ThreeSetGamePage />} />
          <Route path="/3setgame" element={<ThreeSetGamePage />} />
          <Route path="/vip-agency-code" element={<VipAgencyCodePage />} />
          <Route path="/agency-code" element={<VipAgencyCodePage />} />
          <Route path="/vip-code" element={<VipAgencyCodePage />} />
          <Route path="/game-paper" element={<GamePaperPage />} />
          <Route path="/official-paper" element={<GamePaperPage />} />
          <Route path="/calculation-paper" element={<GamePaperPage />} />
          <Route path="/calc-paper" element={<GamePaperPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/game.html" element={<GamePage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </PWAInstallProvider>
  );
}
