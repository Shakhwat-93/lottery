import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import FormPage from './pages/FormPage';
import ThreeSetGamePage from './pages/ThreeSetGamePage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/form.html" element={<FormPage />} />
        <Route path="/registration" element={<FormPage />} />
        <Route path="/3-set-game" element={<ThreeSetGamePage />} />
        <Route path="/three-set-game" element={<ThreeSetGamePage />} />
        <Route path="/3setgame" element={<ThreeSetGamePage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/game.html" element={<GamePage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
