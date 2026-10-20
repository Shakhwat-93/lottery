import React, { useState } from 'react';

export default function OnlineForm({ isStandalonePage = false }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    country: 'Bangladesh',
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
    'Bangladesh',
    'Saudi Arabia',
    'United Arab Emirates (UAE)',
    'Qatar',
    'Oman',
    'Kuwait',
    'Bahrain',
    'Malaysia',
    'Singapore',
    'Thailand',
    'Other Country'
  ];

  const govtPaymentOptions = [
    {
      id: 'Visa',
      name: 'Visa Card',
      desc: 'International Debit & Credit Card Gateway',
      badge: 'VISA',
      badgeClass: 'visa'
    },
    {
      id: 'Mastercard',
      name: 'Mastercard',
      desc: 'Global Verified Mastercard Payment Gateway',
      badge: 'Mastercard',
      badgeClass: 'mastercard'
    },
    {
      id: 'American Express',
      name: 'American Express',
      desc: 'Global AMEX Official Treasury Gateway',
      badge: 'AMEX',
      badgeClass: 'amex'
    },
    {
      id: 'Bank Transfer',
      name: 'Direct Bank Transfer',
      desc: 'Thailand Central Bank Authorized Treasury Account',
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
      alert('Please upload your passport-size photo.');
      setActiveCard('photo');
      return;
    }
    if (!nidFile) {
      alert('Please upload your National ID or Passport document.');
      setActiveCard('nid');
      return;
    }
    if (!formData.bkashSenderNumber || !formData.bkashTrxId) {
      alert('Please provide your bKash Sender Number and Transaction ID (TrxID).');
      setActiveCard('bkash');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      country: 'Bangladesh',
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
      <div className="google-form-container" aria-label="Official Thailand Lottery Registration Form">
        {/* Top Header Card */}
        <div className="gform-top-card">
          <div className="gform-color-stripe" />
          <div className="gform-header-content">
            <div className="gform-logo-row">
              <div className="gform-logo-box">
                <span className="brand-mark gform-brand-mark" aria-hidden="true">
                  <img
                    src="/assets/logo.png?v=4"
                    alt="Thailand Lottery Official Logo"
                    className="brand-logo"
                    width="64"
                    height="64"
                  />
                  <span className="gform-logo-verified-badge" title="Official Verified GLO Thailand">
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
                  </span>
                </span>
              </div>
              <div className="gform-official-text">
                <div className="gform-verified-badge-line">
                  <span className="gform-govt-seal">Government Lottery Office (GLO) • Bangkok, Thailand</span>
                  <span className="gform-verified-tag">
                    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                      <path
                        fill="#1D9BF0"
                        d="M22.25 12c0-1.43-.88-2.67-2.19-3.19.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.52-1.31-1.76-2.19-3.19-2.19s-2.67.88-3.19 2.19c-1.39-.46-2.9-.2-3.91.81s-1.27 2.52-.81 3.91C2.93 9.33 2.05 10.57 2.05 12s.88 2.67 2.19 3.19c-.46 1.39-.2 2.9.81 3.91s2.52 1.27 3.91.81c.52 1.31 1.76 2.19 3.19 2.19s2.67-.88 3.19-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.52 2.19-1.76 2.19-3.19z"
                      />
                      <path
                        fill="#FFFFFF"
                        d="M10.09 16.72l-4.14-4.14 1.41-1.41 2.73 2.73 6.13-6.13 1.41 1.41-7.54 7.54z"
                      />
                    </svg>
                    <span>Official Verified Portal</span>
                  </span>
                </div>
                <div className="gform-title-with-badge">
                  <h1 className="gform-main-heading">Thailand Official Lottery</h1>
                  <span className="gform-verified-title-check" title="Verified Portal">
                    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                      <path
                        fill="#1D9BF0"
                        d="M22.25 12c0-1.43-.88-2.67-2.19-3.19.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.52-1.31-1.76-2.19-3.19-2.19s-2.67.88-3.19 2.19c-1.39-.46-2.9-.2-3.91.81s-1.27 2.52-.81 3.91C2.93 9.33 2.05 10.57 2.05 12s.88 2.67 2.19 3.19c-.46 1.39-.2 2.9.81 3.91s2.52 1.27 3.91.81c.52 1.31 1.76 2.19 3.19 2.19s2.67-.88 3.19-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.52 2.19-1.76 2.19-3.19z"
                      />
                      <path
                        fill="#FFFFFF"
                        d="M10.09 16.72l-4.14-4.14 1.41-1.41 2.73 2.73 6.13-6.13 1.41 1.41-7.54 7.54z"
                      />
                    </svg>
                  </span>
                </div>
                <h2 className="gform-form-name">VIP Membership Registration Form 2026</h2>
                <p className="gform-subtext">
                  Directly regulated by the Government Lottery Office (GLO), Bangkok, Thailand.
                  Please provide accurate information below to complete your official membership registration.
                </p>
              </div>
            </div>

            <div className="gform-meta-banner">
              <span className="gform-fee-pill">
                🏛️ Official Quota Fee: <strong>2,500 BDT (VIP Quota)</strong>
              </span>
              <span className="gform-quota-pill">
                🚨 Remaining Slots: <strong>Only 5 quotas available</strong>
              </span>
            </div>

            <div className="gform-notice-box">
              <p>⚠️ Please submit verified and accurate information. Uploading your photo and valid ID is mandatory.</p>
              <span className="gform-required-note">* Indicates required question</span>
            </div>
          </div>
        </div>

        {submitted ? (
          /* Google Form Submission Confirmation Receipt */
          <div className="gform-success-card">
            <div className="gform-color-stripe" />
            <div className="gform-success-body">
              <div className="gform-success-check-badge">✓</div>
              <h2 className="gform-success-title">Application Submitted Successfully!</h2>
              <p className="gform-success-subtitle">
                Your response has been recorded. Your application has been registered with the Thailand Government Lottery Office (GLO).
              </p>

              <div className="gform-receipt-summary">
                <div className="gform-receipt-header">
                  <span>📄 Official Submission Receipt</span>
                  <span className="receipt-tag">STATUS: PENDING VERIFICATION</span>
                </div>
                <div className="gform-receipt-grid">
                  <div className="receipt-row">
                    <span className="receipt-label">Applicant Full Name:</span>
                    <strong className="receipt-value">{formData.name}</strong>
                  </div>
                  <div className="receipt-row">
                    <span className="receipt-label">Phone / WhatsApp:</span>
                    <strong className="receipt-value">{formData.phone}</strong>
                  </div>
                  <div className="receipt-row">
                    <span className="receipt-label">Country:</span>
                    <strong className="receipt-value">
                      {formData.country === 'Other Country' ? formData.customCountry : formData.country}
                    </strong>
                  </div>
                  <div className="receipt-row">
                    <span className="receipt-label">Passport Photo:</span>
                    <strong className="receipt-value file-ok">✓ {photoFile ? photoFile.name : 'Uploaded'}</strong>
                  </div>
                  <div className="receipt-row">
                    <span className="receipt-label">ID Document:</span>
                    <strong className="receipt-value file-ok">✓ {nidFile ? nidFile.name : 'Uploaded'}</strong>
                  </div>
                  <div className="receipt-row">
                    <span className="receipt-label">Thailand Govt Payment Method:</span>
                    <strong className="receipt-value highlight-govt">{formData.govtPaymentMethod}</strong>
                  </div>
                  <div className="receipt-row">
                    <span className="receipt-label">bKash Sender Number:</span>
                    <strong className="receipt-value">{formData.bkashSenderNumber}</strong>
                  </div>
                  <div className="receipt-row">
                    <span className="receipt-label">bKash Transaction ID:</span>
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
                  Submit another response
                </button>
              </div>
            </div>
          </div>
        ) : (
          <form className="gform-body" onSubmit={handleSubmit} noValidate>
            {/* 1. Full Name */}
            <div
              className={`gform-question-card ${activeCard === 'name' ? 'is-active-card' : ''}`}
              onClick={() => setActiveCard('name')}
            >
              <div className="gform-card-left-indicator" aria-hidden="true" />
              <label className="gform-question-title" htmlFor="gform-name">
                Full Name <span className="gform-req">*</span>
              </label>
              <p className="gform-question-desc">Enter your full official name as printed on your National ID or Passport</p>
              <div className="gform-input-wrapper">
                <input
                  id="gform-name"
                  name="name"
                  type="text"
                  required
                  className="gform-underline-input"
                  placeholder="Your answer"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setActiveCard('name')}
                />
                <span className="gform-input-focus-line" aria-hidden="true" />
              </div>
            </div>

            {/* 2. Phone / WhatsApp */}
            <div
              className={`gform-question-card ${activeCard === 'phone' ? 'is-active-card' : ''}`}
              onClick={() => setActiveCard('phone')}
            >
              <div className="gform-card-left-indicator" aria-hidden="true" />
              <label className="gform-question-title" htmlFor="gform-phone">
                Phone / WhatsApp Number <span className="gform-req">*</span>
              </label>
              <p className="gform-question-desc">Your official VIP confirmation code and draw updates will be sent to this number</p>
              <div className="gform-input-wrapper">
                <input
                  id="gform-phone"
                  name="phone"
                  type="tel"
                  required
                  className="gform-underline-input"
                  placeholder="e.g. +880 1XXXXXXXXX (include country code)"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => setActiveCard('phone')}
                />
                <span className="gform-input-focus-line" aria-hidden="true" />
              </div>
            </div>

            {/* 3. Country Name */}
            <div
              className={`gform-question-card ${activeCard === 'country' ? 'is-active-card' : ''}`}
              onClick={() => setActiveCard('country')}
            >
              <div className="gform-card-left-indicator" aria-hidden="true" />
              <label className="gform-question-title" htmlFor="gform-country">
                Country of Residence <span className="gform-req">*</span>
              </label>
              <p className="gform-question-desc">Select the country where you are currently residing</p>
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

              {formData.country === 'Other Country' && (
                <div className="gform-input-wrapper gform-sub-input">
                  <input
                    name="customCountry"
                    type="text"
                    required
                    className="gform-underline-input"
                    placeholder="Specify your country name..."
                    value={formData.customCountry}
                    onChange={handleChange}
                  />
                  <span className="gform-input-focus-line" aria-hidden="true" />
                </div>
              )}
            </div>

            {/* 4. Passport Photo Upload */}
            <div
              className={`gform-question-card ${activeCard === 'photo' ? 'is-active-card' : ''}`}
              onClick={() => setActiveCard('photo')}
            >
              <div className="gform-card-left-indicator" aria-hidden="true" />
              <div className="gform-question-title">
                Applicant Passport Photo <span className="gform-req">*</span>
              </div>
              <p className="gform-question-desc">
                Upload 1 recent clear passport-size photograph (JPG, PNG — Max 10MB)
              </p>

              {photoFile ? (
                <div className="gform-file-card-preview">
                  <div className="gform-file-thumb">
                    <img src={photoFile.preview} alt="Passport preview" />
                  </div>
                  <div className="gform-file-details">
                    <span className="gform-file-name">{photoFile.name}</span>
                    <span className="gform-file-size">{photoFile.size} • Uploaded successfully</span>
                  </div>
                  <button
                    type="button"
                    className="gform-file-remove-btn"
                    title="Remove file and select another"
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
                    <span>Add file</span>
                  </label>
                  <input
                    id="gform-photo-input"
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    className="gform-hidden-file-input"
                    onChange={handlePhotoUpload}
                    onFocus={() => setActiveCard('photo')}
                  />
                  <span className="gform-upload-hint">or drag and drop file here</span>
                </div>
              )}
            </div>

            {/* 5. NID / Passport Document Upload */}
            <div
              className={`gform-question-card ${activeCard === 'nid' ? 'is-active-card' : ''}`}
              onClick={() => setActiveCard('nid')}
            >
              <div className="gform-card-left-indicator" aria-hidden="true" />
              <div className="gform-question-title">
                National ID (NID) or Passport Document <span className="gform-req">*</span>
              </div>
              <p className="gform-question-desc">
                Upload a clear photo or scanned copy of your National ID card or Passport front page (Max 10MB)
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
                    <span className="gform-file-size">{nidFile.size} • Document attached</span>
                  </div>
                  <button
                    type="button"
                    className="gform-file-remove-btn"
                    title="Remove file and select another"
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
                    <span>Add file</span>
                  </label>
                  <input
                    id="gform-nid-input"
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/webp, application/pdf"
                    className="gform-hidden-file-input"
                    onChange={handleNidUpload}
                    onFocus={() => setActiveCard('nid')}
                  />
                  <span className="gform-upload-hint">PDF or image file (Max 10MB)</span>
                </div>
              )}
            </div>

            {/* 6. Payment to Thailand Government */}
            <div
              className={`gform-question-card ${activeCard === 'govt-payment' ? 'is-active-card' : ''}`}
              onClick={() => setActiveCard('govt-payment')}
            >
              <div className="gform-card-left-indicator" aria-hidden="true" />
              <div className="gform-question-title">
                Payment to Thailand Government <span className="gform-req">*</span>
              </div>
              <p className="gform-question-desc">
                Select your preferred international payment gateway for the Thailand GLO Treasury
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
                <span>Official Government Authorization: GLO Notice 001/2566 — Verified International Treasury Gateway.</span>
              </div>
            </div>

            {/* 7. Final Membership Payment — bKash */}
            <div
              className={`gform-question-card gform-bkash-card ${activeCard === 'bkash' ? 'is-active-card' : ''}`}
              onClick={() => setActiveCard('bkash')}
            >
              <div className="gform-card-left-indicator" aria-hidden="true" />
              <div className="gform-question-title">
                Final Membership Payment — bKash <span className="gform-req">*</span>
              </div>
              <p className="gform-question-desc">
                To confirm your VIP membership and activate your registration, complete Send Money to the official agent number below:
              </p>

              {/* bKash Official Box */}
              <div className="gform-bkash-box">
                <div className="bkash-header-bar">
                  <div className="bkash-logo-brand">
                    <span className="bkash-bird-icon">🌸</span>
                    <strong>bKash Official Payment</strong>
                  </div>
                  <span className="bkash-type-badge">Send Money (Personal)</span>
                </div>

                <div className="bkash-number-row">
                  <div className="bkash-num-info">
                    <span className="bkash-num-label">Official bKash Number:</span>
                    <strong className="bkash-display-number">{bkashNumber}</strong>
                  </div>
                  <button
                    type="button"
                    className={`bkash-copy-btn ${copiedBkash ? 'copied' : ''}`}
                    onClick={copyBkashNumber}
                  >
                    {copiedBkash ? '✓ Copied!' : '📋 Copy Number'}
                  </button>
                </div>

                <div className="bkash-fee-strip">
                  <span>Membership Registration Fee:</span>
                  <strong className="bkash-fee-amount">2,500 BDT</strong>
                </div>

                <div className="bkash-instructions-box">
                  <p>
                    <strong>📌 Payment Instructions:</strong><br />
                    1. Open your bKash app or dial <strong>*247#</strong>.<br />
                    2. Select <strong>Send Money</strong> and send <strong>2,500 BDT</strong> to the official number above.<br />
                    3. After completing the payment, enter your Sender Number and Transaction ID (TrxID) below.
                  </p>
                </div>
              </div>

              {/* bKash Inputs */}
              <div className="gform-bkash-inputs-group">
                <div className="gform-input-subcard">
                  <label className="gform-sub-label" htmlFor="gform-bkash-sender">
                    bKash Sender Number <span className="gform-req">*</span>
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

                <div className="gform-input-subcard">
                  <label className="gform-sub-label" htmlFor="gform-bkash-trx">
                    bKash Transaction ID (TrxID) <span className="gform-req">*</span>
                  </label>
                  <div className="gform-input-wrapper">
                    <input
                      id="gform-bkash-trx"
                      name="bkashTrxId"
                      type="text"
                      required
                      className="gform-underline-input"
                      placeholder="e.g. BKA89XZ123"
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
                {isSubmitting ? 'Processing...' : 'Submit'}
              </button>

              <button
                type="button"
                className="gform-clear-form-btn"
                onClick={resetForm}
              >
                Clear form
              </button>
            </div>

            <div className="gform-footer-disclaimer">
              <span>Never submit passwords through Google Forms.</span>
              <p>This content is neither created nor endorsed by Google. — <u>Report Abuse</u> — <u>Terms of Service</u> — <u>Privacy Policy</u></p>
              <div className="gform-google-branding">
                <strong>Google</strong> Forms
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
