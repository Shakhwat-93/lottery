import React from 'react';
import { Link } from 'react-router-dom';
import { useVipCodeSettings } from '../hooks/useVipCodeSettings';
import { formatVipDate } from '../lib/vipCodeSettings';

export default function GamePanelCta() {
  const settings = useVipCodeSettings();
  const dates = [settings.firstDate, settings.secondDate];

  return (
    <section className="game-panel reveal-on-scroll" id="game-open">
      <div>
        <p className="eyebrow">VIP ACCESS</p>
        <h2>থাইল্যান্ড লটারি VIP Agency Code</h2>
        <p>
          <strong className="clarity-digit">100%</strong> নিশ্চিত ১ বছরের ২৪ সেট ক্যালকুলেশন পেপার ও ভিআইপি এজেন্সি কোড দেখতে প্রবেশ করুন।
        </p>
      </div>

      {/* 2 Vertically Stacked VIP Agency Code Date Buttons */}
      <div className="game-panel-buttons-stack" aria-label="VIP Agency Code Dates">
        {dates.map((date) => {
          const displayDate = formatVipDate(date);
          return (
            <Link
              key={date}
              className="button primary vip-agency-date-btn"
              to={`/vip-agency-code?date=${displayDate}`}
              aria-label={`VIP Agency Code Date ${displayDate}`}
            >
              <span>{displayDate}</span>
              <span className="vip-btn-arrow" aria-hidden="true">↗</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
