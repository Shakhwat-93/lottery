import React from 'react';
import { Link } from 'react-router-dom';

export default function GamePanelCta() {
  return (
    <section className="game-panel reveal-on-scroll" id="game-open">
      <div>
        <p className="eyebrow">เข้าสู่ระบบ • 100% Sure Paper • ১০০% নিশ্চিত লটারি পেপার</p>
        <h2>Thailand Lottery Official Game Papers</h2>
        <p>
          সকল অফিসিয়াল সার্টিফিকেট ও লাইসেন্স যাচাই শেষ হলে সরাসরি গ্যালারি থেকে ১০০% নিশ্চিত পেপার ও নম্বরসমূহ দেখে নিন।
        </p>
      </div>
      <Link className="button primary" to="/game">
        গেম পেপার
      </Link>
    </section>
  );
}
