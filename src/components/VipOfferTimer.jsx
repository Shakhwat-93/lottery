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
      <div className="offer-card">
        {/* Top Row: Alert Ribbons and Remaining Forms Count */}
        <div className="offer-header-row">
          <span className="offer-badge-pill">
            <span className="pulse-fire" aria-hidden="true">
              🔥
            </span>
            <span>ข้อเสนอพิเศษ • সীমিত সময়ের অফার • LIMITED TIME OFFER</span>
          </span>
          <div className="seats-alert-badge forms-alert-badge">
            <span className="seat-dot pulse-red" aria-hidden="true" />
            <strong>
              🚨 আর মাত্র <span className="seats-num">৫টি</span> ফর্ম বাকি আছে!
            </strong>
            <small>เหลือเพียง 5 แบบฟอร์มเท่านั้น • Only 5 Forms Left</small>
          </div>
        </div>

        {/* Main Content: Headings, Descriptions and Timer Blocks */}
        <div className="offer-main-content">
          <div className="offer-title-group">
            <p className="eyebrow">
              <span className="alert-fire-icon" aria-hidden="true">⚡</span> สมาชิกวีไอพี • আর মাত্র ৫টি ফর্ম বাকি • LIMITED 5 FORMS ONLY
            </p>
            <h2>আর মাত্র ৫টি ফর্ম বাকি আছে — দ্রুত আপনার ফর্মটি বুক করুন!</h2>
            <p className="offer-desc">
              থাইল্যান্ড গভর্নমেন্ট লটারি অফিস (GLO) অনুমোদিত মেম্বারশিপ কোটায় সিনিয়র এজেন্ট <strong>মোঃ ফাহিম চৌধুরী (TL-001)</strong> এর অধীনে আর <strong>মাত্র ৫টি অফিসিয়াল মেম্বারশিপ ফর্ম</strong> খালি রয়েছে। সময় শেষ হওয়ার আগেই নিচের ফর্মটি পূরণ করে আপনার নিশ্চিত টিকিট ও সিওর পেপার বুক করুন!
            </p>
          </div>

          {/* Live Countdown Timer */}
          <div className="countdown-wrapper" aria-label="Countdown timer">
            <div className="countdown-box">
              <span className="count-val" id="timer-hours">
                {timeLeft.hours}
              </span>
              <span className="count-label">ঘণ্টা (Hours)</span>
            </div>
            <span className="count-sep" aria-hidden="true">
              :
            </span>
            <div className="countdown-box">
              <span className="count-val" id="timer-minutes">
                {timeLeft.minutes}
              </span>
              <span className="count-label">মিনিট (Mins)</span>
            </div>
            <span className="count-sep" aria-hidden="true">
              :
            </span>
            <div className="countdown-box">
              <span className="count-val" id="timer-seconds">
                {timeLeft.seconds}
              </span>
              <span className="count-label">সেকেন্ড (Secs)</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Live Progress Bar and Action Buttons */}
        <div className="offer-bottom-bar">
          <div className="seats-progress-container">
            <div className="progress-labels">
              <span>
                🔥 ফর্ম পূরণ চলছে: <strong>৯৫টি ফরম সম্পন্ন (৯৫%)</strong>
              </span>
              <span>
                অবশিষ্ট কোটা: <strong className="seat-highlight">মাত্র ৫ / ১০০ টি ফর্ম বাকি!</strong>
              </span>
            </div>
            <div className="progress-track" role="progressbar" aria-valuenow={95} aria-valuemin={0} aria-valuemax={100}>
              <div className="progress-fill" style={{ width: '95%' }} />
            </div>
          </div>

          <div className="offer-cta-group">
            <a className="button primary offer-cta-btn" href="#online-form">
              <span>বাকি ৫টি ফর্মের ১টি পূরণ করুন ✍️</span>
              <span className="btn-arrow" aria-hidden="true">
                →
              </span>
            </a>
            <Link className="button secondary" to="/game">
              সিওর পেপার দেখুন
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
