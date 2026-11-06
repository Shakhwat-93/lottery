import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useVipCodeSettings } from '../hooks/useVipCodeSettings';
import { isSupabaseConfigured } from '../lib/supabase';
import { loadVipCodeSettings, readVipCodeSettings, saveVipCodeSettings } from '../lib/vipCodeSettings';
import '../styles/admin.css';

export default function AdminVipCodePage() {
  const publicSettings = useVipCodeSettings();
  const [settings, setSettings] = useState(publicSettings);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('armanali420@gmail.com');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(isSupabaseConfigured);
  const [isSaving, setIsSaving] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const isAdmin = Boolean(user);

  useEffect(() => {
    if (!isSupabaseConfigured) return undefined;

    let active = true;
    fetch('/api/admin/session', { credentials: 'same-origin', cache: 'no-store' })
      .then(async (response) => response.ok ? response.json() : null)
      .then((session) => {
        if (active) setUser(session?.user ?? null);
      })
      .catch(() => {
        if (active) setError('Admin login API পাওয়া যায়নি। Vercel deployment ও private environment variables সেট করুন।');
      });

    loadVipCodeSettings()
      .then((current) => { if (active) setSettings(current); })
      .catch((loadError) => { if (active) setError(loadError.message); })
      .finally(() => { if (active) setIsLoading(false); });

    return () => { active = false; };
  }, []);
  useEffect(() => {
    setSettings(publicSettings);
  }, [publicSettings]);

  const updateField = (field) => (event) => {
    setSettings((current) => ({ ...current, [field]: event.target.value }));
    setMessage('');
    setError('');
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    setIsSigningIn(true);
    setError('');
    setMessage('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Login failed.');
      setUser(result.user);
      setPassword('');
    } catch (signInError) {
      setError(signInError.message || 'Login করা যায়নি।');
    } finally {
      setIsSigningIn(false);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');
    setError('');

    if (settings.firstDate === settings.secondDate) {
      setError('দুটি তারিখ আলাদা হতে হবে।');
      return;
    }

    setIsSaving(true);
    try {
      await saveVipCodeSettings(settings);
      setMessage(isSupabaseConfigured
        ? 'Supabase database-এ পরিবর্তন সেভ হয়েছে।'
        : 'পরিবর্তনগুলো এই ব্রাউজারে সেভ হয়েছে।');
    } catch (saveError) {
      setError(saveError.message || 'সেভ করা যায়নি। আবার চেষ্টা করুন।');
    } finally {
      setIsSaving(false);
    }
  };

  const discardChanges = async () => {
    setError('');
    setMessage('');
    try {
      setSettings(isSupabaseConfigured ? await loadVipCodeSettings() : readVipCodeSettings());
    } catch (loadError) {
      setError(loadError.message);
    }
  };

  const handleSignOut = async () => {
    await fetch('/api/admin/session', { method: 'DELETE', credentials: 'same-origin' });
    setUser(null);
  };

  return (
    <main className="admin-page">
      <div className="admin-shell">
        <header className="admin-header">
          <Link className="admin-back-link" to="/">← সাইটে ফিরে যান</Link>
          <span className={`admin-status ${isSupabaseConfigured ? 'is-connected' : ''}`}>
            <i /> {isSupabaseConfigured ? 'SUPABASE CONNECTED' : 'LOCAL DRAFT MODE'}
          </span>
        </header>

        <section className="admin-card" aria-labelledby="admin-title">
          <div className="admin-card-heading">
            <span className="admin-eyebrow">VIP AGENCY CODE</span>
            <h1 id="admin-title">তারিখ ও কোড পরিচালনা</h1>
            <p>সাইটে দেখানো ড্র-এর তারিখ এবং ৫ ডিজিটের কোড আপডেট করুন।</p>
          </div>

          {isSupabaseConfigured ? (
            <div className="admin-draft-notice is-cloud" role="status">
              <strong>Cloud database connected</strong>
              <span>Public page settings Supabase থেকে লোড হয়; পরিবর্তন করতে admin sign-in দরকার।</span>
            </div>
          ) : (
            <div className="admin-draft-notice" role="note">
              <strong>Local draft mode</strong>
              <span>Supabase environment সেট না থাকায় সেভ করা পরিবর্তন শুধু এই ব্রাউজারেই থাকবে।</span>
            </div>
          )}

          {isLoading ? (
            <p className="admin-feedback" role="status">Supabase থেকে settings load হচ্ছে…</p>
          ) : (isSupabaseConfigured && !isAdmin) ? (
            <div className="admin-auth-block">
              <h2>Admin sign-in</h2>
              <p>Admin account দিয়ে প্রবেশ করুন।</p>
              <form className="admin-form" onSubmit={handleSignIn}>
                <label className="admin-field">
                  <span>Email</span>
                  <input type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} required />
                </label>
                <label className="admin-field">
                  <span>Password</span>
                  <input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
                </label>
                {error && <p className="admin-feedback is-error" role="alert">{error}</p>}
                <button className="admin-save-button" type="submit" disabled={isSigningIn}>
                  {isSigningIn ? 'Sign-in হচ্ছে…' : 'Admin sign-in'}
                </button>
              </form>
              <p className="admin-auth-help">এই panel-এর login Vercel server-side credentials ব্যবহার করে; Supabase Auth লাগে না।</p>
            </div>
          ) : (
            <>
              {isAdmin && (
                <div className="admin-user-bar">
                  <span>{user.email}</span>
                  <button className="admin-reset-button" type="button" onClick={handleSignOut}>Sign out</button>
                </div>
              )}

              <form className="admin-form" onSubmit={handleSubmit}>
                <label className="admin-field">
                  <span><b>01</b> প্রথম ড্র-এর তারিখ</span>
                  <input type="date" value={settings.firstDate} onChange={updateField('firstDate')} required />
                  <small>এই তারিখের জন্য VIP কোড দেখানো হবে।</small>
                </label>

                <label className="admin-field">
                  <span><b>02</b> দ্বিতীয় ড্র-এর তারিখ</span>
                  <input type="date" value={settings.secondDate} onChange={updateField('secondDate')} required />
                  <small>এই তারিখের পেজ membership locked থাকবে।</small>
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
                  <button className="admin-save-button" type="submit" disabled={isSaving}>
                    {isSaving ? 'সেভ হচ্ছে…' : 'পরিবর্তন সেভ করুন'}
                  </button>
                  <button className="admin-reset-button" type="button" onClick={discardChanges} disabled={isSaving}>পরিবর্তন বাতিল</button>
                </div>
              </form>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
