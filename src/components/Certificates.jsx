import React from 'react';

export default function Certificates() {
  return (
    <section className="section certificate-section reveal-on-scroll" id="certificate">
      <div className="section-heading">
        <p className="eyebrow">
          เอกสารและใบรับรอง • OFFICIAL CERTIFICATES • সরকারি লাইসেন্স ও সনদপত্র
        </p>
        <h2>Verified Government Licenses & Official Proofs</h2>
        <p>
          গ্রাহকদের <strong className="clarity-digit">100%</strong> আস্থা ও শতভাগ নিরাপত্তার স্বার্থে থাইল্যান্ড সরকার এবং গভর্নমেন্ট লটারি অফিস (GLO) কর্তৃক ইস্যুকৃত মূল লাইসেন্স ও ডিলার সনদপত্র:
        </p>
      </div>

      <div className="certificate-layout">
        <figure className="hero-certificate certificate-focus">
          <figcaption>
            <span>★ ✓ หนังสือแต่งตั้ง • Notice: สลก. 001/2566</span>
            <strong>Official Dealer Appointment Letter & Manual</strong>
            <p>ব্যাংকক প্রধান কার্যালয় (333 Phahonyothin Rd, Bangkok 10900) কর্তৃক অনুমোদিত ডিলার নির্দেশিকা ও অফিসিয়াল নিয়োগপত্র।</p>
            <div className="cert-verify-chip">✓ Reg. No. 001/2566 • Official Stamp</div>
          </figcaption>
          <div className="certificate-seal" aria-hidden="true">
            <span>🏛️</span>
            <strong>OFFICIAL</strong>
            <small>NOTICE</small>
          </div>
          <img
            src="/assets/site/thai-dealer-guide.jpg"
            alt="Official Thailand Government Lottery Dealer Guidelines and Appointment Notice"
            loading="lazy"
          />
        </figure>
      </div>
    </section>
  );
}
