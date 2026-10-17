import React from 'react';
import { Link } from 'react-router-dom';

export default function GamePanelCta() {
  return (
    <section className="game-panel reveal-on-scroll" id="game-open">
      <div>
        <p className="eyebrow">ระบบเอกสาร • VIP ACCESS</p>
        <h2>Thailand Lottery Official Master Papers</h2>
        <p>
          เข้าสู่คลังเอกสาร VIP 100% • Access all official master papers, touch charts and cut numbers. ১০০% নিশ্চিত পেপার ও নম্বর গ্যালারি দেখতে প্রবেশ করুন।
        </p>
      </div>
      <Link className="button primary" to="/game">
        ดูเอกสาร • VIP Papers ↗
      </Link>
    </section>
  );
}
