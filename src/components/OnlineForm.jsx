import React, { useState } from 'react';
import FormSubmitAnimation from './FormSubmitAnimation';

export default function OnlineForm({ isStandalonePage = false }) {
  const isTestSuccess = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('submitted') === 'true';
  const isTestAnim = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('anim') === 'true';

  const [formData, setFormData] = useState({
    name: isTestSuccess || isTestAnim ? 'Arman' : '',
    gender: 'Male',
    phone: isTestSuccess || isTestAnim ? '9666665843548' : '',
    address: isTestSuccess || isTestAnim ? 'Riyadh, Saudi Arabia' : '',
    country: isTestSuccess || isTestAnim ? 'Saudi Arabia' : 'Bangladesh',
    customCountry: '',
    subscriptionPlan: '3 Month'
  });

  const [photoFile, setPhotoFile] = useState(isTestSuccess || isTestAnim ? { name: 'arman_photo.jpg' } : null);
  const [nidFile, setNidFile] = useState(isTestSuccess || isTestAnim ? { name: 'arman_passport.jpg' } : null);
  const [activeCard, setActiveCard] = useState('name');
  const [submitted, setSubmitted] = useState(isTestSuccess);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSubmitAnimation, setShowSubmitAnimation] = useState(isTestAnim);
  const [registrationId, setRegistrationId] = useState('GLO-TL-784291');
  const [submissionTime, setSubmissionTime] = useState('24 Oct 2026, 02:35 PM');
  const [copiedId, setCopiedId] = useState(false);
  const [copiedBkash, setCopiedBkash] = useState(false);

  const copyBkashNumber = () => {
    const bkashNum = '+8801705330881';
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(bkashNum);
      setCopiedBkash(true);
      setTimeout(() => setCopiedBkash(false), 2000);
    }
  };

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
    if (!formData.subscriptionPlan) {
      alert('Please select a Membership Subscription Plan.');
      setActiveCard('subscription');
      return;
    }

    // Generate unique Registration ID & timestamp
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const newId = `GLO-TL-${randomNum}`;
    setRegistrationId(newId);
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
    const formattedTime = now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    setSubmissionTime(`${formattedDate}, ${formattedTime}`);

    // Trigger HyperFrames cinematic submit animation
    setIsSubmitting(true);
    setShowSubmitAnimation(true);
  };

  const handleAnimationComplete = () => {
    setShowSubmitAnimation(false);
    setIsSubmitting(false);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const copyRegistrationId = () => {
    const idToCopy = registrationId || 'GLO-TL-784291';
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(idToCopy);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  const getWhatsAppConfirmUrl = () => {
    const id = registrationId || 'GLO-TL-784291';
    const country = formData.country === 'Other Country' ? formData.customCountry : formData.country || 'Bangladesh';
    const planFeeMap = {
      '3 Month': '250 SAR',
      '6 Month': '750 SAR',
      '12 Month': '1,250 SAR'
    };
    const feeText = planFeeMap[formData.subscriptionPlan] || '250 SAR';
    const text = encodeURIComponent(
      `Hello Senior Agent Md Fahim Chowdhury,\n\nI have submitted my Official Thailand Lottery Membership Registration Form.\n\n📄 Registration ID: ${id}\n👤 Full Name: ${formData.name || 'Arman'}\n📞 Contact Phone: ${formData.phone || ''}\n👑 Plan: ${formData.subscriptionPlan || '3 Month'} Subscription (${feeText})\n💰 Fee: ${feeText}\n📍 Country: ${country}\n\nPlease verify and activate my official VIP membership.`
    );
    return `https://wa.me/8801309802224?text=${text}`;
  };

  const resetForm = () => {
    setFormData({
      name: '',
      gender: 'Male',
      phone: '',
      address: '',
      country: 'Bangladesh',
      customCountry: '',
      subscriptionPlan: '3 Month'
    });
    setPhotoFile(null);
    setNidFile(null);
    setActiveCard('name');
    setCopiedId(false);
    setSubmitted(false);
    setShowSubmitAnimation(false);
    setIsSubmitting(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      className={`section form-section ${isStandalonePage ? 'standalone-form-section' : 'reveal-on-scroll'}`}
      id="online-form"
    >
      {showSubmitAnimation && (
        <FormSubmitAnimation
          registrationId={registrationId}
          applicantName={formData.name || 'Arman'}
          plan={formData.subscriptionPlan || '3 Month'}
          onComplete={handleAnimationComplete}
        />
      )}
      <div className="google-form-container" aria-label="Official Thailand Lottery Registration Form">
        {!submitted ? (
          <>
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
                </div>
              </div>
              <div className="gform-official-text">
                <div className="gform-verified-badge-line">
                  <span className="gform-govt-seal">Government Lottery Office (GLO) • Bangkok, Thailand</span>
                  <span className="gform-verified-tag">
                    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
                      <path
                        fill="#10B981"
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
                  <h1 className="gform-main-heading">
                    Thailand Official <span className="gform-heading-nowrap">Lottery
                      <span className="gform-verified-title-check" title="Official Verified GLO Thailand">
                        <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
                          <path
                            fill="#10B981"
                            d="M22.25 12c0-1.43-.88-2.67-2.19-3.19.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.52-1.31-1.76-2.19-3.19-2.19s-2.67.88-3.19 2.19c-1.39-.46-2.9-.2-3.91.81s-1.27 2.52-.81 3.91C2.93 9.33 2.05 10.57 2.05 12s.88 2.67 2.19 3.19c-.46 1.39-.2 2.9.81 3.91s2.52 1.27 3.91.81c.52 1.31 1.76 2.19 3.19 2.19s2.67-.88 3.19-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.52 2.19-1.76 2.19-3.19z"
                          />
                          <path
                            fill="#FFFFFF"
                            d="M10.09 16.72l-4.14-4.14 1.41-1.41 2.73 2.73 6.13-6.13 1.41 1.41-7.54 7.54z"
                          />
                        </svg>
                      </span>
                    </span>
                  </h1>
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

            {/* Section Divider: MEMBERSHIP SUBSCRIPTION PLAN */}
            <div className="gform-section-header-banner gform-subscription-banner">
              <div className="gform-section-banner-title">
                <span className="gform-section-icon" aria-hidden="true">💎</span>
                <span className="gform-section-text">
                  MEMBERSHIP SUBSCRIPTION PLAN
                </span>
              </div>
              <span className="gform-section-pill">OFFICIAL VIP ACCESS</span>
            </div>

            {/* Subscription Plan Selection Card */}
            <div
              className={`gform-question-card ${activeCard === 'subscription' ? 'is-active-card' : ''}`}
              onClick={() => setActiveCard('subscription')}
            >
              <div className="gform-card-left-indicator" aria-hidden="true" />
              <label className="gform-question-title">
                Membership Subscription Plan (মেম্বারশিপ প্ল্যান ও প্রাইজ নির্বাচন করুন) <span className="gform-req">*</span>
              </label>
              <p className="gform-question-desc">
                Select your desired membership duration for official VIP lottery access, sure paper, and results
              </p>

              <div className="gform-subscription-cards-grid">
                {/* 3 Month Option (250 SAR) */}
                <label
                  className={`gform-sub-plan-card plan-card-3m ${formData.subscriptionPlan === '3 Month' ? 'is-selected-plan' : ''}`}
                >
                  <input
                    type="radio"
                    name="subscriptionPlan"
                    value="3 Month"
                    checked={formData.subscriptionPlan === '3 Month'}
                    onChange={handleChange}
                    className="gform-sub-radio"
                  />
                  <div className="gform-sub-card-inner">
                    <div className="gform-sub-header">
                      <span className="gform-sub-icon">⚡</span>
                      <span className="gform-sub-badge">Standard VIP</span>
                    </div>
                    <div className="gform-sub-duration">3 Month</div>
                    <div className="gform-sub-duration-bn">3 মাস মেম্বারশিপ</div>

                    {/* Pricing Highlight Box */}
                    <div className="gform-sub-pricing-block">
                      <div className="gform-sub-price-wrapper">
                        <span className="gform-sub-price-currency">SAR</span>
                        <span className="gform-sub-price-number">250</span>
                      </div>
                      <span className="gform-sub-price-label">সৌদি রিয়াল (SAR)</span>
                    </div>

                    <div className="gform-sub-desc">3 মাসের নিয়মিত ভিআইপি শিওর পেপার ও গেম এক্সেস</div>
                    <div className="gform-sub-check-indicator">
                      <span className="gform-sub-checkmark">✓</span>
                    </div>
                  </div>
                </label>

                {/* 6 Month Option (750 SAR - Most Popular) */}
                <label
                  className={`gform-sub-plan-card plan-card-6m is-popular ${formData.subscriptionPlan === '6 Month' ? 'is-selected-plan' : ''}`}
                >
                  <div className="gform-sub-popular-ribbon">★ Most Popular</div>
                  <input
                    type="radio"
                    name="subscriptionPlan"
                    value="6 Month"
                    checked={formData.subscriptionPlan === '6 Month'}
                    onChange={handleChange}
                    className="gform-sub-radio"
                  />
                  <div className="gform-sub-card-inner">
                    <div className="gform-sub-header">
                      <span className="gform-sub-icon">⭐</span>
                      <span className="gform-sub-badge badge-popular">Recommended</span>
                    </div>
                    <div className="gform-sub-duration">6 Month</div>
                    <div className="gform-sub-duration-bn">6 মাস মেম্বারশিপ</div>

                    {/* Pricing Highlight Box */}
                    <div className="gform-sub-pricing-block">
                      <div className="gform-sub-price-wrapper">
                        <span className="gform-sub-price-currency">SAR</span>
                        <span className="gform-sub-price-number">750</span>
                      </div>
                      <span className="gform-sub-price-label">সৌদি রিয়াল (SAR)</span>
                    </div>

                    <div className="gform-sub-desc">6 মাসের নিয়মিত ভিআইপি এক্সেস ও সিনিয়র এজেন্ট সরাসরি সাপোর্ট</div>
                    <div className="gform-sub-check-indicator">
                      <span className="gform-sub-checkmark">✓</span>
                    </div>
                  </div>
                </label>

                {/* 12 Month Option (1250 SAR - VIP Full Year) */}
                <label
                  className={`gform-sub-plan-card plan-card-12m is-best-value ${formData.subscriptionPlan === '12 Month' ? 'is-selected-plan' : ''}`}
                >
                  <div className="gform-sub-value-ribbon">💎 VIP Year</div>
                  <input
                    type="radio"
                    name="subscriptionPlan"
                    value="12 Month"
                    checked={formData.subscriptionPlan === '12 Month'}
                    onChange={handleChange}
                    className="gform-sub-radio"
                  />
                  <div className="gform-sub-card-inner">
                    <div className="gform-sub-header">
                      <span className="gform-sub-icon">👑</span>
                      <span className="gform-sub-badge badge-gold">Best Value</span>
                    </div>
                    <div className="gform-sub-duration">12 Month</div>
                    <div className="gform-sub-duration-bn">12 মাস (1 বছর VIP)</div>

                    {/* Pricing Highlight Box */}
                    <div className="gform-sub-pricing-block">
                      <div className="gform-sub-price-wrapper">
                        <span className="gform-sub-price-currency">SAR</span>
                        <span className="gform-sub-price-number">1,250</span>
                      </div>
                      <span className="gform-sub-price-label">সৌদি রিয়াল (SAR)</span>
                    </div>

                    <div className="gform-sub-desc">সম্পূর্ণ 1 বছর আনলিমিটেড প্রিমিয়াম মেম্বারশিপ ও সর্বোচ্চ সুবিধা</div>
                    <div className="gform-sub-check-indicator">
                      <span className="gform-sub-checkmark">✓</span>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Form Footer Action */}
            <div className="gform-footer-action-bar">
              {/* bKash Payment Notice Card (Right Before Submit) */}
              <div className="gform-bkash-notice-card" role="note" aria-label="bKash Payment Notice">
                <div className="gform-bkash-card-top">
                  <div className="gform-bkash-brand-badge">
                    <div className="gform-bkash-logo-wrap">
                      <img
                        src="/assets/bkash-logo.svg"
                        alt="bKash Logo"
                        className="gform-bkash-strip-logo"
                        width="74"
                        height="32"
                        loading="lazy"
                      />
                    </div>
                    <span className="gform-bkash-type-pill">পার্সোনাল বিকাশ নাম্বার</span>
                  </div>
                  <span className="gform-bkash-action-pill">⚡ Send Money করতে হবে</span>
                </div>

                <p className="gform-bkash-target-text">
                  ফাহিম চৌধুরীকে মেম্বারশিপ কনফার্ম করতে বিকাশ এ পেমেন্ট করুন:
                </p>

                <div className="gform-bkash-num-container">
                  <div className="gform-bkash-num-left">
                    <span className="gform-bkash-num-tag">Personal bKash No.</span>
                    <span className="gform-bkash-digits">+8801705330881</span>
                  </div>
                  <button
                    type="button"
                    className={`gform-bkash-copy-btn ${copiedBkash ? 'is-copied' : ''}`}
                    onClick={copyBkashNumber}
                    title="Copy bKash Number"
                  >
                    {copiedBkash ? '✓ কপি হয়েছে!' : '📋 কপি করুন'}
                  </button>
                </div>

                <div className="gform-bkash-foot-note">
                  💡 অনুগ্রহ করে বিকাশ অ্যাপ অথবা *247# ডায়াল করে উক্ত নাম্বারে <strong>Send Money</strong> সম্পন্ন করুন।
                </div>
              </div>

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
        </>
      ) : (
        /* Dedicated Ultra-Premium Google Form Submission Confirmation Page */
        <div className="gform-success-card" role="region" aria-label="Submission Success Confirmation">
          {/* Royal Gold & Thai National Stripe */}
          <div className="gform-success-top-stripe" />

          <div className="gform-success-body">
            {/* 1. Official Thailand Lottery GLO Logo & Verification Seal */}
            <div className="gform-success-brand-header">
              <div className="gform-success-logo-wrapper">
                <img
                  src="/assets/logo.png?v=4"
                  alt="Thailand Lottery Official Logo"
                  className="gform-success-logo"
                  width="88"
                  height="88"
                />
              </div>

              <div className="gform-success-authority-badge">
                <span className="glo-seal-pill">สำนักงานสลากกินแบ่งรัฐบาล • GLO BANGKOK</span>
                <span className="glo-verified-tag">✓ OFFICIAL VERIFIED PORTAL</span>
              </div>
            </div>

            {/* 2. Success Animation & Royal Title */}
            <div className="gform-success-heading-block">
              <div className="gform-success-celebration-badge">
                <div className="gform-success-ring-pulse" />
                <span className="gform-success-check-icon">✓</span>
              </div>
              <h2 className="gform-success-title">Application Submitted Successfully!</h2>
              <div className="gform-success-subtitle-bengali">
                আপনার মেম্বারশিপ রেজিস্ট্রেশন সফলভাবে দাখিল হয়েছে
              </div>
              <p className="gform-success-desc">
                Your response has been securely recorded in the official Government Lottery Office (GLO) Bangkok database under Senior Authorized Agent <strong>Md Fahim Chowdhury (TL-001)</strong>.
              </p>
            </div>

            {/* 3. Official Tracking ID & Timestamp Card */}
            <div className="gform-success-tracking-bar">
              <div className="tracking-id-group">
                <span className="tracking-label">OFFICIAL REGISTRATION ID</span>
                <div className="tracking-code-row">
                  <span className="tracking-code">{registrationId || 'GLO-TL-784291'}</span>
                  <button
                    type="button"
                    className="tracking-copy-btn"
                    onClick={copyRegistrationId}
                    title="Copy Registration ID"
                  >
                    {copiedId ? '✓ Copied!' : '📋 Copy ID'}
                  </button>
                </div>
              </div>
              <div className="tracking-meta-group">
                <span className="tracking-status-pill">
                  <span className="pulse-dot" /> VERIFIED & RECORDED
                </span>
                <span className="tracking-time-text">
                  🕒 {submissionTime || '24 Oct 2026, 02:35 PM'}
                </span>
              </div>
            </div>

            {/* 4. Luxury Colorful Highlighted Official Submission Receipt */}
            <div className="gform-receipt-summary gform-receipt-premium">
              <div className="gform-receipt-header">
                <div className="receipt-header-left">
                  <span className="receipt-doc-icon">📄</span>
                  <div>
                    <strong>Official Membership Submission Receipt</strong>
                    <span className="receipt-subline">The Government Lottery Office (GLO) Thailand</span>
                  </div>
                </div>
                <span className="receipt-tag-verified">
                  <span className="tag-glow" /> PENDING VERIFICATION
                </span>
              </div>

              <div className="gform-receipt-grid">
                {/* Full Name */}
                <div className="receipt-row receipt-row-highlight">
                  <span className="receipt-label">
                    <span className="receipt-icon">👤</span> Full Name:
                  </span>
                  <strong className="receipt-value receipt-name-val">
                    <span className="vip-crown">👑</span> {formData.name || 'Arman'}
                  </strong>
                </div>

                {/* Gender */}
                <div className="receipt-row">
                  <span className="receipt-label">
                    <span className="receipt-icon">⚧</span> Gender:
                  </span>
                  <strong className="receipt-value">
                    <span className={`gender-badge gender-${(formData.gender || 'Male').toLowerCase()}`}>
                      {formData.gender === 'Male' ? '♂ Male (পুরুষ)' : '♀ Female (মহিলা)'}
                    </span>
                  </strong>
                </div>

                {/* Contact Phone */}
                <div className="receipt-row receipt-row-highlight">
                  <span className="receipt-label">
                    <span className="receipt-icon">📞</span> Contact Number:
                  </span>
                  <strong className="receipt-value">
                    <span className="phone-badge">
                      <span className="phone-dot" /> {formData.phone || '9666665843548'}
                    </span>
                  </strong>
                </div>

                {/* Address */}
                <div className="receipt-row">
                  <span className="receipt-label">
                    <span className="receipt-icon">📍</span> Current Address:
                  </span>
                  <strong className="receipt-value receipt-address-val">
                    {formData.address || 'Saudi Arabia'}
                  </strong>
                </div>

                {/* Country */}
                <div className="receipt-row">
                  <span className="receipt-label">
                    <span className="receipt-icon">🌐</span> Country:
                  </span>
                  <strong className="receipt-value">
                    <span className="country-badge">
                      {formData.country === 'Other Country' ? formData.customCountry : formData.country || 'Bangladesh'}
                    </span>
                  </strong>
                </div>

                {/* Subscription Plan (Mega Highlighted Colorful Banner) */}
                <div className="receipt-row receipt-plan-row">
                  <span className="receipt-label">
                    <span className="receipt-icon">🏆</span> Subscription Plan:
                  </span>
                  <strong className="receipt-value">
                    <span className={`plan-badge-colorful plan-${(formData.subscriptionPlan || '3 Month').toLowerCase().replace(' ', '-')}`}>
                      {formData.subscriptionPlan === '3 Month' && '⚡ 3 Month VIP Membership (250 SAR)'}
                      {formData.subscriptionPlan === '6 Month' && '⭐ 6 Month VIP Membership (750 SAR - Popular)'}
                      {formData.subscriptionPlan === '12 Month' && '👑 12 Month MEGA VIP Membership (1,250 SAR - Best Value)'}
                      {!formData.subscriptionPlan && '⚡ 3 Month VIP Membership (250 SAR)'}
                    </span>
                  </strong>
                </div>

                {/* Membership Fee Highlighted Badge */}
                <div className="receipt-row receipt-fee-row receipt-row-highlight">
                  <span className="receipt-label">
                    <span className="receipt-icon">💰</span> Membership Fee:
                  </span>
                  <strong className="receipt-value">
                    <span className="receipt-fee-badge-gold">
                      {formData.subscriptionPlan === '3 Month' && '250 SAR (সৌদি রিয়াল)'}
                      {formData.subscriptionPlan === '6 Month' && '750 SAR (সৌদি রিয়াল)'}
                      {formData.subscriptionPlan === '12 Month' && '1,250 SAR (সৌদি রিয়াল)'}
                      {!formData.subscriptionPlan && '250 SAR (সৌদি রিয়াল)'}
                    </span>
                  </strong>
                </div>

                {/* Applicant Photo */}
                <div className="receipt-row">
                  <span className="receipt-label">
                    <span className="receipt-icon">🖼️</span> Applicant Photo:
                  </span>
                  <strong className="receipt-value">
                    <span className="doc-verified-pill">
                      ✓ {photoFile ? photoFile.name : 'Photo Uploaded (যাচাইকৃত)'}
                    </span>
                  </strong>
                </div>

                {/* NID / Passport Document */}
                <div className="receipt-row">
                  <span className="receipt-label">
                    <span className="receipt-icon">🆔</span> NID / Passport:
                  </span>
                  <strong className="receipt-value">
                    <span className="doc-verified-pill">
                      ✓ {nidFile ? nidFile.name : 'NID Document Uploaded (যাচাইকৃত)'}
                    </span>
                  </strong>
                </div>

                {/* Authorized Agent Box */}
                <div className="receipt-row receipt-agent-row">
                  <span className="receipt-label">
                    <span className="receipt-icon">✍️</span> Authorized Agent:
                  </span>
                  <strong className="receipt-value">
                    <span className="agent-badge-royal">
                      <span className="agent-star">★</span> Md Fahim Chowdhury (TL-001)
                    </span>
                  </strong>
                </div>
              </div>

              {/* Official Security Seal Ribbon inside Receipt */}
              <div className="receipt-security-footer">
                <div className="security-seal-mark">
                  <span className="seal-emblem">🛡️</span>
                  <div className="seal-text-group">
                    <span className="seal-main">ENCRYPTED GLO OFFICIAL REGISTRATION</span>
                    <span className="seal-sub">Direct Regulated by Government Lottery Office, Bangkok</span>
                  </div>
                </div>
                <span className="seal-code">GLO-SEC-2026-OK</span>
              </div>
            </div>

            {/* Success Actions: Print Receipt & Submit Another */}
            <div className="gform-success-action-group">
              <button
                type="button"
                className="button-print-receipt"
                onClick={() => window.print()}
              >
                <span>📥 রসিদ প্রিন্ট / সেভ করুন</span>
              </button>

              <button
                type="button"
                className="gform-reset-btn"
                onClick={resetForm}
              >
                Submit another response (আরেকটি আবেদন করুন)
              </button>

              <a href="/" className="gform-back-home-link">
                ← হোম পেইজে ফিরে যান
              </a>
            </div>
          </div>
        </div>
      )}
      </div>
    </section>
  );
}
