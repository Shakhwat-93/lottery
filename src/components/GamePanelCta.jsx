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
      <Link className="button primary" to="/vip-agency-code">
        ভিআইপি এজেন্সি কোড ↗
      </Link>
    </section>
  );
}
