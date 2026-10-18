import React, { useState } from 'react';

export default function OnlineForm({ isStandalonePage = false }) {
  const [formData, setFormData] = useState({
    name: '',
    familyMembersName: '',
    address: '',
    phone: '',
    paymentMethod: 'Mastercard'
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const paymentOptions = [
    { id: 'Mastercard', name: 'Mastercard', badge: 'mastercard' },
    { id: 'Visa', name: 'VISA', badge: 'visa' },
    { id: 'Apple Pay', name: 'Apple Pay', badge: 'apple-pay' },
    { id: 'Google Pay', name: 'Google Pay', badge: 'google-pay' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <section className={`section form-section ${isStandalonePage ? 'standalone-form-section' : 'reveal-on-scroll'}`} id="online-form">
      {isStandalonePage ? (
        <div className="standalone-form-header">
          <div className="standalone-form-badge-row">
            <span className="premium-badge badge-green">
              <span className="badge-symbol">✓</span>
              <span>
                <strong>OFFICIAL GLO FORM 2026</strong>
                <small>থাইল্যান্ড সরকার অনুমোদিত</small>
              </span>
            </span>
            <span className="premium-badge badge-gold">
              <span className="badge-symbol">★</span>
              <span>
                <strong>VIP QUOTA ACTIVE</strong>
                <small>বাকি মাত্র ৫টি ফর্ম</small>
              </span>
            </span>
          </div>
        </div>
      ) : (
        <div className="section-heading">
          <p className="eyebrow">GLO REGISTRATION</p>
          <h2>Official Membership Registration Form 2026</h2>
          <p>
            The Government Lottery Office (GLO) অনুমোদিত সিনিয়র এজেন্ট <strong>মোঃ ফাহিম চৌধুরী (Agent ID: TL-001)</strong> এর অধীনে আর মাত্র ৫টি ফর্ম বাকি:
          </p>
        </div>
      )}

      <div className="google-form-container" aria-label="Official Google Form Style Registration">
        {/* Google Form Top Card */}
        <div className="gform-top-card">
          <div className="gform-color-stripe" />
          <div className="gform-header-content">
            <div className="gform-logo-row">
              <span className="brand-mark gform-brand-mark" aria-hidden="true">
                <img
                  src="/assets/logo.png?v=4"
                  alt="Thailand Lottery Official Logo"
                  className="brand-logo"
                  width="60"
                  height="60"
                />
              </span>
              <div className="gform-official-text">
                <div className="gform-verified-badge-line">
                  <span className="gform-govt-seal">สำนักงานสลากกินแบ่งรัฐบาล</span>
                  <span className="gform-verified-tag">
                    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                      <path
                        fill="#1D9BF0"
                        d="M22.25 12c0-1.43-.88-2.67-2.19-3.19.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.52-1.31-1.76-2.19-3.19-2.19s-2.67.88-3.19 2.19c-1.39-.46-2.9-.2-3.91.81s-1.27 2.52-.81 3.91C2.93 9.33 2.05 10.57 2.05 12s.88 2.67 2.19 3.19c-.46 1.39-.2 2.9.81 3.91s2.52 1.27 3.91.81c.52 1.31 1.76 2.19 3.19 2.19s2.67-.88 3.19-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.52 2.19-1.76 2.19-3.19z"
                      />
                      <path
                        fill="#FFFFFF"
                        d="M10.09 16.72l-4.14-4.14 1.41-1.41 2.73 2.73 6.13-6.13 1.41 1.41-7.54 7.54z"
                      />
                    </svg>
                    <span>ভেরিফাইড অফিসিয়াল পোর্টাল</span>
                  </span>
                </div>
                <h3 className="gform-main-heading">Thailand Official Lottery Membership Form 2026</h3>
                <p className="gform-subtext">
                  থাইল্যান্ড সরকারের গভর্নমেন্ট লটারি অফিস (GLO) দ্বারা সরাসরি নিয়ন্ত্রিত অফিসিয়াল অনলাইন আবেদনপত্র।
                </p>
              </div>
            </div>

            <div className="gform-meta-banner">
              <span className="gform-fee-pill">
                💰 রেজিস্ট্রেশন ফি: <strong>২৫০০ রিয়াল (2500 SAR)</strong>
              </span>
              <span className="gform-quota-pill">
                🚨 অবশিষ্ট কোটা: <strong>মাত্র ৫টি ফর্ম বাকি</strong>
              </span>
            </div>

            <div className="gform-notice-box">
              <p>
                ⚠️ দয়া করে সমস্ত সঠিক ও বৈধ তথ্য প্রদান করুন। ফর্ম সাবমিট করার পর আমাদের অফিসিয়াল এজেন্ট আপনার সাথে যোগাযোগ করবে।
              </p>
              <span className="gform-required-note">* নির্দেশিত ঘরগুলো পূরণ করা বাধ্যতামূলক</span>
            </div>
          </div>
        </div>

        {submitted ? (
          <div className="gform-success-card">
            <div className="gform-success-icon">✓</div>
            <h3>আবেদন সফলভাবে গ্রহণ করা হয়েছে!</h3>
            <p>
              ধন্যবাদ <strong>{formData.name}</strong>। আপনার মেম্বারশিপ আবেদন সফলভাবে সাবমিট হয়েছে।
            </p>
            <div className="gform-success-meta">
              <div><strong>রেজিস্ট্রেশন ফি:</strong> ২৫০০ রিয়াল (2500 SAR)</div>
              <div><strong>পেমেন্ট মেথড:</strong> {formData.paymentMethod}</div>
              <div><strong>স্ট্যাটাস:</strong> ভেরিফিকেশন প্রক্রিয়াধীন (GLO Verified)</div>
            </div>
            <p className="gform-success-note">
              আমাদের সিনিয়র এজেন্ট শীঘ্রই আপনার প্রদত্ত তথ্যের ভিত্তিতে যোগাযোগ করবেন।
            </p>
            <button
              type="button"
              className="button secondary"
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: '',
                  familyMembersName: '',
                  address: '',
                  phone: '',
                  paymentMethod: 'Mastercard'
                });
              }}
            >
              নতুন আবেদন করুন
            </button>
          </div>
        ) : (
          <form className="gform-body" onSubmit={handleSubmit}>
            {/* Field 1: Name */}
            <div className="gform-question-card">
              <label className="gform-question-title" htmlFor="gform-name">
                আপনার নাম (Full Name) <span className="gform-req">*</span>
              </label>
              <p className="gform-question-desc">পাসপোর্ট বা আইডি কার্ড অনুযায়ী আপনার পূর্ণ নাম লিখুন</p>
              <input
                id="gform-name"
                name="name"
                type="text"
                required
                className="gform-text-input"
                placeholder="আপনার পূর্ণ নাম লিখুন..."
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* Field 2: Family Member's Name */}
            <div className="gform-question-card">
              <label className="gform-question-title" htmlFor="gform-family">
                পরিবারের সদস্যের নাম (Family Member's Name) <span className="gform-req">*</span>
              </label>
              <p className="gform-question-desc">নমিনী অথবা জরুরি প্রয়োজনে যোগাযোগের জন্য পিতা/মাতা/স্ত্রী/স্বামীর নাম</p>
              <input
                id="gform-family"
                name="familyMembersName"
                type="text"
                required
                className="gform-text-input"
                placeholder="পরিবারের সদস্যের নাম লিখুন..."
                value={formData.familyMembersName}
                onChange={handleChange}
              />
            </div>

            {/* Field 3: Address */}
            <div className="gform-question-card">
              <label className="gform-question-title" htmlFor="gform-address">
                বর্তমান ঠিকানা (Present Address) <span className="gform-req">*</span>
              </label>
              <p className="gform-question-desc">শহর, এলাকা, জেলা এবং দেশের নাম উল্লেখ করুন</p>
              <textarea
                id="gform-address"
                name="address"
                rows="3"
                required
                className="gform-text-input gform-textarea"
                placeholder="আপনার পূর্ণ ঠিকানা লিখুন..."
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            {/* Field 4: Phone / WhatsApp */}
            <div className="gform-question-card">
              <label className="gform-question-title" htmlFor="gform-phone">
                ফোন / হোয়াটসঅ্যাপ নম্বর (Phone / WhatsApp) <span className="gform-req">*</span>
              </label>
              <p className="gform-question-desc">যে নম্বরে লাইভ রেজাল্ট ও নিশ্চিতকরণ কোড পাঠানো হবে</p>
              <input
                id="gform-phone"
                name="phone"
                type="tel"
                required
                className="gform-text-input"
                placeholder="+966 / +880 / +66 ইত্যাদি কোডসহ নম্বর দিন..."
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            {/* Field 5: Registration Fee (Fixed 2500 Riyal) */}
            <div className="gform-question-card gform-fee-card">
              <div className="gform-question-title">
                রেজিস্ট্রেশন ফি (Registration Fee) <span className="gform-req">*</span>
              </div>
              <p className="gform-question-desc">সরকারি নির্ধারিত কোটা মেম্বারশিপ ফি</p>
              <div className="gform-fee-display-box">
                <div className="gform-fee-amount-badge">
                  <span className="fee-icon">💵</span>
                  <div className="fee-text-group">
                    <strong className="fee-amount">২৫০০ রিয়াল (2500 SAR)</strong>
                    <span className="fee-note">এককালীন সরকারি মেম্বারশিপ ফি (100% Verified)</span>
                  </div>
                </div>
                <div className="gform-fee-radio-pill active">
                  <input type="radio" checked readOnly id="fee-confirm" />
                  <label htmlFor="fee-confirm">২৫০০ রিয়াল পরিশোধে সম্মত</label>
                </div>
              </div>
            </div>

            {/* Field 6: Accepted Payment Methods */}
            <div className="gform-question-card">
              <div className="gform-question-title">
                পেমেন্ট মেথড নির্বাচন করুন (Accepted Payment Method) <span className="gform-req">*</span>
              </div>
              <p className="gform-question-desc">
                হোমপেজে প্রদর্শিত অনুমোদিত নিরাপদ পেমেন্ট মেথডসমূহের মধ্য থেকে নির্বাচন করুন
              </p>

              <div className="gform-payment-grid">
                {paymentOptions.map((opt) => (
                  <label
                    key={opt.id}
                    className={`gform-payment-option ${formData.paymentMethod === opt.id ? 'is-selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={opt.id}
                      checked={formData.paymentMethod === opt.id}
                      onChange={handleChange}
                    />
                    <div className="gform-pay-brand-wrap">
                      {opt.id === 'Mastercard' && (
                        <span className="pay-brand mastercard gform-mini-pay">
                          <i />
                          <strong>mastercard</strong>
                        </span>
                      )}
                      {opt.id === 'Visa' && (
                        <span className="pay-brand visa gform-mini-pay">
                          VISA
                        </span>
                      )}
                      {opt.id === 'Apple Pay' && (
                        <span className="pay-brand apple-pay gform-mini-pay">
                          <span aria-hidden="true">●</span> Pay
                        </span>
                      )}
                      {opt.id === 'Google Pay' && (
                        <span className="pay-brand google-pay gform-mini-pay">
                          <span aria-hidden="true">G</span> Pay
                        </span>
                      )}
                      <span className="gform-pay-name">{opt.name}</span>
                    </div>
                  </label>
                ))}
              </div>

              <div className="gform-security-footer">
                <span>🔒 256-Bit SSL এনক্রিপ্টেড ও সরাসরি সরকারি ট্রেজারিতে জমা</span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="gform-action-bar">
              <button
                type="submit"
                disabled={isSubmitting}
                className="button primary gform-submit-btn"
              >
                {isSubmitting ? 'প্রসেসিং হচ্ছে...' : 'ফর্ম জমা দিন (Submit Form) →'}
              </button>
              <button
                type="reset"
                className="gform-clear-btn"
                onClick={() => {
                  setFormData({
                    name: '',
                    familyMembersName: '',
                    address: '',
                    phone: '',
                    paymentMethod: 'Mastercard'
                  });
                }}
              >
                ফর্ম ক্লিয়ার করুন
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
