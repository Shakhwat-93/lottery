import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'thai_lottery_vip_deadline_12h_v3';
const DEFAULT_DURATION = (11 * 3600 + 59 * 60 + 59) * 1000; // 12 Hours Duration
const RESET_DURATION = 12 * 3600 * 1000;

export default function VipOfferTimer() {
  const [timeLeft, setTimeLeft] = useState({
    hours: '12',
    minutes: '00',
    seconds: '00'
  });

  useEffect(() => {
    // Clear old short-duration deadline from storage
    localStorage.removeItem('thai_lottery_vip_deadline');
    localStorage.removeItem('thai_lottery_vip_deadline_12h');

    let deadline = localStorage.getItem(STORAGE_KEY);
    const now = Date.now();

    if (!deadline || parseInt(deadline, 10) <= now) {
      deadline = now + DEFAULT_DURATION;
      localStorage.setItem(STORAGE_KEY, deadline.toString());
    } else {
      deadline = parseInt(deadline, 10);
    }

    const calculateTime = () => {
      const currentTime = Date.now();
      let diff = Math.max(0, Math.floor((deadline - currentTime) / 1000));

      if (diff <= 0) {
        deadline = Date.now() + RESET_DURATION;
        localStorage.setItem(STORAGE_KEY, deadline.toString());
        diff = Math.floor((deadline - Date.now()) / 1000);
      }

      const h = Math.floor(diff / 3600);
      const m = Math.floor((diff % 3600) / 60);
      const s = diff % 60;

      setTimeLeft({
        hours: String(h).padStart(2, '0'),
        minutes: String(m).padStart(2, '0'),
        seconds: String(s).padStart(2, '0')
      });
    };

    calculateTime();
    const timerInterval = setInterval(calculateTime, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  return (
    <section className="section offer-timer-section reveal-on-scroll" id="vip-offer" aria-label="Limited time VIP discount offer">
      <div className="offer-card golden-offer-card">
        {/* Top Prominent Highlight Banner: Official Quota Announcement */}
        <div className="urgent-forms-highlight-banner" role="alert">
          <div className="urgent-badge-left">
            <span className="urgent-beacon-dot" aria-hidden="true" />
            <span className="urgent-badge-text">VIP QUOTA</span>
          </div>

          <div className="urgent-main-highlight">
            <span className="urgent-siren" aria-hidden="true">🚨</span>
            <span className="urgent-message">
              জরুরি নোটিশ: আর মাত্র <strong className="golden-urgent-number">৫টি</strong> ফর্ম বাকি আছে!
            </span>
          </div>

          <div className="urgent-quota-chip">
            <span>বুকিং: <strong>৯৫%</strong> • বাকি: <strong className="chip-gold-num">৫টি ফর্ম</strong></span>
          </div>
        </div>

        {/* Main Content: Headings, Descriptions and Golden Timer */}
        <div className="offer-main-content">
          <div className="offer-title-group">
            <h2 className="golden-timer-headline">
              সীমিত মেম্বারশিপ কোটা — আর মাত্র <span className="title-count-highlight">৫টি</span> ফর্ম বাকি
            </h2>
            <p className="offer-desc">
              The Government Lottery Office (GLO) Bangkok অনুমোদিত মেম্বারশিপ পোর্টাল। সময় শেষ হওয়ার পূর্বেই আবেদন সম্পন্ন করুন।
            </p>
          </div>

          {/* Luxury 24K Royal Golden Countdown Timer */}
          <div className="countdown-wrapper golden-countdown-wrapper" aria-label="Golden countdown timer">
            <div className="countdown-box golden-countdown-box">
              <span className="count-val golden-val" id="timer-hours">
                {timeLeft.hours}
              </span>
              <span className="count-label golden-label">HOURS</span>
            </div>
            <span className="count-sep golden-sep" aria-hidden="true">
              :
            </span>
            <div className="countdown-box golden-countdown-box">
              <span className="count-val golden-val" id="timer-minutes">
                {timeLeft.minutes}
              </span>
              <span className="count-label golden-label">MINS</span>
            </div>
            <span className="count-sep golden-sep" aria-hidden="true">
              :
            </span>
            <div className="countdown-box golden-countdown-box">
              <span className="count-val golden-val" id="timer-seconds">
                {timeLeft.seconds}
              </span>
              <span className="count-label golden-label">SECS</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Live Progress Bar and Action Buttons */}
        <div className="offer-bottom-bar">
          <div className="seats-progress-container">
            <div className="progress-labels">
              <span>
                আবেদন সম্পন্ন: <strong>৯৫%</strong>
              </span>
              <span>
                অবশিষ্ট: <strong className="seat-highlight-gold">মাত্র ৫টি ফর্ম বাকি</strong>
              </span>
            </div>
            <div className="progress-track" role="progressbar" aria-valuenow={95} aria-valuemin={0} aria-valuemax={100}>
              <div className="progress-fill golden-progress-fill" style={{ width: '95%' }} />
            </div>
          </div>

          <div className="offer-cta-group">
            <Link className="button primary offer-cta-btn golden-cta-btn" to="/form">
              <span>ফর্ম নিতে এখানে ক্লিক করুন</span>
              <span className="btn-arrow" aria-hidden="true">
                →
              </span>
            </Link>
            <Link className="button secondary" to="/game">
              সিওর পেপার
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
