import React from 'react';
import { Link } from 'react-router-dom';

export default function GamePanelCta() {
  return (
    <section className="game-panel reveal-on-scroll" id="game-open">
      <div>
        <p className="eyebrow">VIP ACCESS</p>
        <h2>থাইল্যান্ড লটারি মাস্টার পেপার্স</h2>
        <p>
          ১০০% নিশ্চিত পেপার ও নম্বর চার্ট দেখতে ভিআইপি গ্যালারিতে প্রবেশ করুন।
        </p>
      </div>
      <Link className="button primary" to="/game">
        ভিআইপি পেপার ↗
      </Link>
    </section>
  );
}
