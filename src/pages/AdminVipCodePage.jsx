import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DEFAULT_VIP_CODE_SETTINGS, readVipCodeSettings, saveVipCodeSettings } from '../lib/vipCodeSettings';
import '../styles/admin.css';

export default function AdminVipCodePage() {
  const [settings, setSettings] = useState(readVipCodeSettings);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const updateField = (field) => (event) => {
    setSettings((current) => ({ ...current, [field]: event.target.value }));
    setMessage('');
    setError('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (settings.firstDate === settings.secondDate) {
      setError('দুটি তারিখ আলাদা হতে হবে।');
      return;
    }

    try {
      saveVipCodeSettings(settings);
      setMessage('পরিবর্তনগুলো এই ব্রাউজারে সেভ হয়েছে।');
    } catch (saveError) {
      setError(saveError.message || 'সেভ করা যায়নি। আবার চেষ্টা করুন।');
    }
  };

  const resetDraft = () => {
    setSettings({ ...DEFAULT_VIP_CODE_SETTINGS });
    setMessage('');
    setError('');
  };

  return (
    <main className="admin-page">
      <div className="admin-shell">
        <header className="admin-header">
          <Link className="admin-back-link" to="/">← সাইটে ফিরে যান</Link>
          <span className="admin-status"><i /> ADMIN WORKSPACE</span>
        </header>

        <section className="admin-card" aria-labelledby="admin-title">
          <div className="admin-card-heading">
            <span className="admin-eyebrow">VIP AGENCY CODE</span>
            <h1 id="admin-title">তারিখ ও কোড পরিচালনা</h1>
            <p>সাইটে দেখানো ড্র-এর তারিখ এবং ৫ ডিজিটের কোড আপডেট করুন।</p>
          </div>

          <div className="admin-draft-notice" role="note">
            <strong>Local draft mode</strong>
            <span>Supabase যুক্ত না হওয়া পর্যন্ত সেভ করা পরিবর্তন শুধু এই ব্রাউজারেই থাকবে।</span>
          </div>

          <form className="admin-form" onSubmit={handleSubmit}>
            <label className="admin-field">
              <span><b>01</b> প্রথম ড্র-এর তারিখ</span>
              <input type="date" value={settings.firstDate} onChange={updateField('firstDate')} required />
              <small>এই তারিখের জন্য VIP কোড দেখানো হবে।</small>
            </label>

            <label className="admin-field">
              <span><b>02</b> দ্বিতীয় ড্র-এর তারিখ</span>
              <input type="date" value={settings.secondDate} onChange={updateField('secondDate')} required />
              <small>এই তারিখের পেজ বর্তমানে membership locked থাকবে।</small>
            </label>

            <label className="admin-field">
              <span><b>03</b> VIP agency code</span>
              <input
                type="text"
                inputMode="numeric"
                autoComplete="off"
                pattern="[0-9]{5}"
                maxLength={5}
                value={settings.code}
                onChange={updateField('code')}
                aria-describedby="admin-code-help"
                required
              />
              <small id="admin-code-help">ঠিক ৫টি সংখ্যার কোড লিখুন। শুরুর ০ থাকলে সেটিও রাখা যাবে।</small>
            </label>

            {error && <p className="admin-feedback is-error" role="alert">{error}</p>}
            {message && <p className="admin-feedback is-success" role="status">{message}</p>}

            <div className="admin-actions">
              <button className="admin-save-button" type="submit">পরিবর্তন সেভ করুন</button>
              <button className="admin-reset-button" type="button" onClick={resetDraft}>ডিফল্টে ফিরুন</button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
