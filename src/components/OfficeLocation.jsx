import React from 'react';

export default function OfficeLocation() {
  return (
    <section className="section location-section" id="location">
      <div className="section-heading">
        <p className="eyebrow">ที่ตั้งสำนักงานใหญ่ • Bangkok Head Office • থাইল্যান্ড অফিসিয়াল ঠিকানা</p>
        <h2>Government Lottery Office (GLO), Thailand</h2>
        <p>
          สำนักงานสลากกินแบ่งรัฐบาล อาคาร 333 ถนนพหลโยธิน แขวงจอมพล เขตจตุจักร กรุงเทพมหานคร 10900
          <br />
          (333 Government Lottery Office Building, Phahonyothin Rd, Chatuchak, Bangkok 10900, Thailand)
        </p>
      </div>

      <div className="map-card">
        <div className="map-topbar">
          <span className="map-pin" aria-hidden="true" />
          <div>
            <strong>สำนักงานสลากกินแบ่งรัฐบาล (GLO Bangkok)</strong>
            <small>333 Phahonyothin Rd, Chatuchak, Bangkok</small>
          </div>
          <a
            href="https://www.google.com/maps?q=13.8486,100.4651"
            target="_blank"
            rel="noopener noreferrer"
          >
            ম্যাপ দেখুন
          </a>
        </div>
        <iframe
          title="Thailand Lottery Nonthaburi location map"
          src="https://www.google.com/maps?q=13.8486,100.4651&z=13&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
