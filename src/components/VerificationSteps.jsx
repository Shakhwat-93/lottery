import React from 'react';

export default function VerificationSteps() {
  return (
    <section className="section verification-section" id="verification">
      <div className="section-heading">
        <p className="eyebrow">ขั้นตอนการตรวจสอบ • Credibility Verification • সত্যতা যাচাইয়ের 3টি সহজ ধাপ</p>
        <h2>3-Step Official Credibility Verification</h2>
        <p>
          কোনোরকম সন্দেহ ছাড়াই সরাসরি ঘরে বসে থাইল্যান্ড সরকারের অফিশিয়াল ডাটাবেজ ও ডকুমেন্টস মিলিয়ে নিন:
        </p>
      </div>

      <div className="verification-grid">
        <article>
          <span className="verify-icon verify-icon-gold">&#10003;</span>
          <span className="step-number">01</span>
          <h3>1. লাইসেন্স ও কিউআর স্ক্যান (Verify QR)</h3>
          <p>সার্টিফিকেটের কিউআর কোড স্ক্যান করে সরাসরি থাইল্যান্ড গভর্নমেন্ট লটারি অফিসের ডাটাবেজ তথ্য যাচাই করুন।</p>
        </article>
        <article>
          <span className="verify-icon verify-icon-blue">&#9733;</span>
          <span className="step-number">02</span>
          <h3>2. সরকারি চুক্তিপত্র পরীক্ষা (Review Agreement)</h3>
          <p>ব্যাংকক প্রধান কার্যালয় কর্তৃক স্বাক্ষরিত ও স্ট্যাম্পকৃত ডিলার চুক্তিপত্রের আইনি কপি মিলিয়ে নিশ্চিত হোন।</p>
        </article>
        <article>
          <span className="verify-icon verify-icon-green">&#10003;</span>
          <span className="step-number">03</span>
          <h3>3. মেম্বারশিপ ও পেপার (Get Membership)</h3>
          <p>নির্ধারিত অনলাইন রেজিস্ট্রেশন ফরম পূরণ করে নিজস্ব ভেরিফাইড মেম্বার আইডি ও নিশ্চিত পেপার সংগ্রহ করুন।</p>
        </article>
      </div>
    </section>
  );
}
