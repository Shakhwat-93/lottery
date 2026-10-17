import React from 'react';

export default function Certificates() {
  return (
    <section className="section certificate-section reveal-on-scroll" id="certificate">
      <div className="section-heading">
        <p className="eyebrow">OFFICIAL LICENSES</p>
        <h2>সরকারি অনুমোদন ও লাইসেন্স</h2>
        <p>
          থাইল্যান্ড গভর্নমেন্ট লটারি অফিস (GLO) কর্তৃক ইস্যুকৃত মূল লাইসেন্স ও সনদপত্র:
        </p>
      </div>

      <div className="certificate-layout">
        <figure className="hero-certificate certificate-focus">
          <figcaption>
            <span>✓ অফিসিয়াল ডিলার নিয়োগপত্র (GLO Notice 001/2566)</span>
            <strong>Official Dealer Appointment Letter & Guidelines</strong>
            <p>Authorized by GLO Bangkok Central Office (333 Phahonyothin Rd, Bangkok 10900).</p>
            <div className="cert-verify-chip">✓ Reg. Notice 001/2566 • Official Bangkok Seal</div>
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
