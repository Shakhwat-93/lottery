import React from 'react';

export default function Certificates() {
  return (
    <section className="section certificate-section reveal-on-scroll" id="certificate">
      <div className="section-heading">
        <p className="eyebrow">เอกสารรับรอง • OFFICIAL GLO</p>
        <h2>Official GLO Licenses & Dealer Accreditation</h2>
        <p>
          หนังสือรับรองจากสำนักงานสลากกินแบ่งรัฐบาล (GLO) • Issued directly by the Royal Thai Government. থাইল্যান্ড সরকারের ভেরিফাইড সনদ ও নিয়োগপত্র:
        </p>
      </div>

      <div className="certificate-layout">
        <figure className="hero-certificate certificate-focus">
          <figcaption>
            <span>✓ หนังสือแต่งตั้งตัวแทน • Notice No. สลก. 001/2566</span>
            <strong>Official Dealer Appointment Letter & Operating Guidelines</strong>
            <p>สำนักงานสลากกินแบ่งรัฐบาล กรุงเทพมหานคร • Authorized by GLO Bangkok Central Office (333 Phahonyothin Rd, Bangkok 10900).</p>
            <div className="cert-verify-chip">✓ Reg. สลก. 001/2566 • Official Bangkok Seal</div>
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
