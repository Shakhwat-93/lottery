import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer({ page = 'home' }) {
  const isGamePage = page === 'game';

  return (
    <footer className="site-footer">
      {!isGamePage ? (
        <>
          <p>
            © 2026 Thailand Lottery Head Office (สำนักงานสลากกินแบ่งรัฐบาล). All Rights Reserved.
            <br />
            <small style={{ color: 'var(--royal-gold-bright)', fontSize: '0.82rem' }}>
              সতর্কতা: শুধুমাত্র ১৮+ বয়স্কদের জন্য প্রযোজ্য। থাইল্যান্ড সরকারের গভর্নমেন্ট লটারি আইনানুযায়ী পরিচালিত।
            </small>
          </p>
          <a href="#top">Back to top (উপরে যান)</a>
        </>
      ) : (
        <>
          <p>Thailand Lottery 2026 - เอกสาร 100% Sure</p>
          <Link to="/">กลับหน้าหลัก (হোমে ফিরুন)</Link>
        </>
      )}
    </footer>
  );
}
