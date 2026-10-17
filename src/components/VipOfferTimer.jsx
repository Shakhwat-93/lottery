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
            <span className="urgent-badge-text">โควตาพิเศษ • VIP QUOTA</span>
          </div>

          <div className="urgent-main-highlight">
            <span className="urgent-siren" aria-hidden="true">🚨</span>
            <span className="urgent-message">
              เหลือเพียง <strong className="golden-urgent-number">5</strong> ที่นั่ง • ONLY <strong className="golden-urgent-number">5</strong> SLOTS LEFT!
            </span>
          </div>

          <div className="urgent-quota-chip">
            <span>จองแล้ว: <strong>95%</strong> • เหลือ: <strong className="chip-gold-num">5 ใบ (৫টি বাকি)</strong></span>
          </div>
        </div>

        {/* Main Content: Headings, Descriptions and Golden Timer */}
        <div className="offer-main-content">
          <div className="offer-title-group">
            <h2 className="golden-timer-headline">
              โควตาพิเศษ VIP 2569 — আর মাত্র <span className="title-count-highlight">৫টি</span> ফর্ম বাকি আছে
            </h2>
            <p className="offer-desc">
              The Government Lottery Office (GLO) Bangkok authorized VIP registration under Senior Agent <strong>Md Fahim Chowdhury (TL-001)</strong>. সময় শেষ হওয়ার পূর্বেই রেজিস্ট্রেশন সম্পন্ন করে মেম্বারশিপ নিশ্চিত করুন।
            </p>
          </div>

          {/* Luxury 24K Royal Golden Countdown Timer */}
          <div className="countdown-wrapper golden-countdown-wrapper" aria-label="Golden countdown timer">
            <div className="countdown-box golden-countdown-box">
              <span className="count-val golden-val" id="timer-hours">
                {timeLeft.hours}
              </span>
              <span className="count-label golden-label">HOURS • ชม.</span>
            </div>
            <span className="count-sep golden-sep" aria-hidden="true">
              :
            </span>
            <div className="countdown-box golden-countdown-box">
              <span className="count-val golden-val" id="timer-minutes">
                {timeLeft.minutes}
              </span>
              <span className="count-label golden-label">MINS • นาที</span>
            </div>
            <span className="count-sep golden-sep" aria-hidden="true">
              :
            </span>
            <div className="countdown-box golden-countdown-box">
              <span className="count-val golden-val" id="timer-seconds">
                {timeLeft.seconds}
              </span>
              <span className="count-label golden-label">SECS • วินาที</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Live Progress Bar and Action Buttons */}
        <div className="offer-bottom-bar">
          <div className="seats-progress-container">
            <div className="progress-labels">
              <span>
                🔥 รับสมัครแล้ว: <strong>95 Completed (จองแล้ว 95%)</strong>
              </span>
              <span>
                โควตาคงเหลือ: <strong className="seat-highlight-gold">Only 5 Slots Left (মাত্র ৫টি বাকি)</strong>
              </span>
            </div>
            <div className="progress-track" role="progressbar" aria-valuenow={95} aria-valuemin={0} aria-valuemax={100}>
              <div className="progress-fill golden-progress-fill" style={{ width: '95%' }} />
            </div>
          </div>

          <div className="offer-cta-group">
            <a className="button primary offer-cta-btn golden-cta-btn" href="#online-form">
              <span>ลงทะเบียน • Register Now (বাকি ৫টি ফর্ম)</span>
              <span className="btn-arrow" aria-hidden="true">
                →
              </span>
            </a>
            <Link className="button secondary" to="/game">
              ดูเอกสาร • View Sure Papers
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
