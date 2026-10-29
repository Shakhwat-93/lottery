import React from 'react';
import { Link } from 'react-router-dom';

export default function GamePanelCta() {
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
        {/* Button 1: 16/02/2069 */}
        <Link
          className="button primary vip-agency-date-btn"
          to="/vip-agency-code?date=16/02/2069"
          aria-label="VIP Agency Code Date 16/02/2069"
        >
          <span>16/02/2069</span>
          <span className="vip-btn-arrow" aria-hidden="true">↗</span>
        </Link>

        {/* Button 2: 30/02/2069 */}
        <Link
          className="button primary vip-agency-date-btn"
          to="/vip-agency-code?date=30/02/2069"
          aria-label="VIP Agency Code Date 30/02/2069"
        >
          <span>30/02/2069</span>
          <span className="vip-btn-arrow" aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}
