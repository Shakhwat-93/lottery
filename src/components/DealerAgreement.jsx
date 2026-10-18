import React from 'react';
import { Link } from 'react-router-dom';

export default function DealerAgreement() {
  return (
    <section className="section split-section" id="agreement">
      <div className="section-copy">
        <p className="eyebrow">เอกสารสัญญาตัวแทน • Official Legal Agreement • আইনি চুক্তিপত্র</p>
        <h2>Government Authorized Dealer Agreement</h2>
        <p>
          থাইল্যান্ড সরকারের গভর্নমেন্ট লটারি অফিস (GLO) এবং অনুমোদিত ডিলারের মধ্যকার অফিসিয়াল দ্বিপাক্ষিক চুক্তিপত্র। এখানে গ্রাহকদের আমানত ও অধিকার থাই রাষ্ট্রীয় আইন অনুযায়ী শতভাগ সুরক্ষিত।
        </p>

        <div className="review-features" style={{ marginTop: '1.2rem', marginBottom: '1.5rem' }}>
          <div className="review-feature-item">
            <span className="feature-check">&#10003;</span>
            <div>
              <strong>เลขที่ สลก. 001/2566</strong>
              <small>সরকারি রেজিস্ট্রেশন ও ডিলার অনুমোদন কোড</small>
            </div>
          </div>
          <div className="review-feature-item">
            <span className="feature-check">&#10003;</span>
            <div>
              <strong>สำนักงานสลากกินแบ่งรัฐบาล</strong>
              <small>ব্যাংকক প্রধান কার্যালয়ের মূল স্ট্যাম্প ও স্বাক্ষরিত কপি</small>
            </div>
          </div>
          <div className="review-feature-item">
            <span className="feature-check">&#10003;</span>
            <div>
              <strong>100% Legal Protection</strong>
              <small>গ্রাহকদের জন্য শতভাগ আইনসঙ্গত ও নিরাপদ সেবা</small>
            </div>
          </div>
        </div>

        <div className="review-actions">
          <a
            className="button primary"
            href="/assets/site/thai-official-appointment.jpg"
            target="_blank"
            rel="noopener noreferrer"
          >
            চুক্তিপত্র দেখুন
          </a>
          <Link className="button secondary" to="/form">
            রেজিস্ট্রেশন
          </Link>
        </div>
      </div>

      <figure className="document-frame tall-document">
        <span className="document-badge">⚖️ Agreement Checked</span>
        <img
          src="/assets/site/thai-official-appointment.jpg"
          alt="Thailand Lottery Official Government Dealer Agreement Document"
          loading="lazy"
        />
      </figure>
    </section>
  );
}
