import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useVipCodeSettings } from '../hooks/useVipCodeSettings';
import { getSupabaseClient, isSupabaseConfigured } from '../lib/supabase';
import { loadVipCodeSettings, readVipCodeSettings, saveVipCodeSettings, formatVipDate } from '../lib/vipCodeSettings';
import { resolveEmbedUrl } from '../components/FacebookLiveStream';
import '../styles/admin.css';

const DEMO_SESSION_KEY = 'vip-code-demo-session';
const DEMO_ADMIN_EMAIL = 'armanali420@gmail.com';
const DEMO_ADMIN_PASSWORD = 'armanali420@gmail.com';

export default function AdminVipCodePage() {
  const publicSettings = useVipCodeSettings();
  const [settings, setSettings] = useState(publicSettings);
  const [activeTab, setActiveTab] = useState('draw'); // 'draw' | 'header' | 'papers' | 'contact' | 'agent' | 'results'
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('armanali420@gmail.com');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(isSupabaseConfigured);
  const [isSaving, setIsSaving] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [uploadingField, setUploadingField] = useState(null);

  const isAdmin = Boolean(user);

  useEffect(() => {
    let active = true;

    // 1. Check Demo session first
    if (window.localStorage.getItem(DEMO_SESSION_KEY) === 'true') {
      setUser({ email: DEMO_ADMIN_EMAIL, isDemo: true });
      setSettings(readVipCodeSettings());
      setIsLoading(false);
      return () => { active = false; };
    }

    if (!isSupabaseConfigured) {
      setIsLoading(false);
      return () => { active = false; };
    }

    // 2. Check Supabase Auth Client session
    getSupabaseClient().then(async (client) => {
      if (!client || !active) return;
      try {
        const { data: { session } } = await client.auth.getSession();
        if (session?.user && active) {
          setUser(session.user);
        }
      } catch (_) {}

      // 3. Fallback check Vercel session cookie
      if (!user) {
        fetch('/api/admin/session', { credentials: 'same-origin', cache: 'no-store' })
          .then(async (res) => (res.ok ? res.json() : null))
          .then((sessionData) => {
            if (active && sessionData?.user) setUser(sessionData.user);
          })
          .catch(() => {});
      }
    });

    // 4. Load initial settings
    loadVipCodeSettings()
      .then((current) => {
        if (active) setSettings(current);
      })
      .catch((loadError) => {
        if (active) setError(loadError.message);
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });

    // Safety timeout so panel never hangs on loading screen
    const safetyTimer = setTimeout(() => {
      if (active) setIsLoading(false);
    }, 2000);

    return () => {
      active = false;
      clearTimeout(safetyTimer);
    };
  }, []);

  // Synchronize when public settings change if not editing locally
  useEffect(() => {
    if (!user?.isDemo && !isSaving && !isDirty) {
      setSettings((prev) => ({ ...prev, ...publicSettings }));
    }
  }, [publicSettings, user?.isDemo, isSaving, isDirty]);

  const updateField = (field) => (event) => {
    setIsDirty(true);
    setSettings((current) => ({ ...current, [field]: event.target.value }));
    setMessage('');
    setError('');
  };

  const handleFileUpload = (field) => (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    setUploadingField(field);
    setMessage('');
    setError('');

    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target.result;

      // 1. Try serverless upload endpoint
      try {
        const response = await fetch('/api/admin/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fileData: dataUrl, fileName: file.name })
        });
        if (response.ok) {
          const result = await response.json();
          if (result?.publicUrl) {
            setIsDirty(true);
            setSettings((c) => ({ ...c, [field]: result.publicUrl }));
            setMessage('✅ ছবি সফলভাবে আপলোড ও ক্লাউডে সেভ হয়েছে!');
            setUploadingField(null);
            return;
          }
        }
      } catch (err) {
        console.warn('API upload fallback to data URL:', err);
      }

      // 2. Direct fallback (Canvas compressed data URL)
      try {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const maxDim = 1200;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          const compressed = canvas.toDataURL('image/jpeg', 0.85);

          setIsDirty(true);
          setSettings((c) => ({ ...c, [field]: compressed }));
          setMessage('✅ ছবি সফলভাবে লোড হয়েছে!');
          setUploadingField(null);
        };
        img.onerror = () => {
          setIsDirty(true);
          setSettings((c) => ({ ...c, [field]: dataUrl }));
          setUploadingField(null);
        };
        img.src = dataUrl;
      } catch {
        setIsDirty(true);
        setSettings((c) => ({ ...c, [field]: dataUrl }));
        setUploadingField(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    setIsSigningIn(true);
    setError('');
    setMessage('');

    const trimmedEmail = email.trim().toLowerCase();

    // 1. Check Demo credentials
    if (trimmedEmail === DEMO_ADMIN_EMAIL && password === DEMO_ADMIN_PASSWORD) {
      window.localStorage.setItem(DEMO_SESSION_KEY, 'true');
      setUser({ email: DEMO_ADMIN_EMAIL, isDemo: true });
      setSettings(readVipCodeSettings());
      setPassword('');
      setIsSigningIn(false);
      return;
    }

    // 2. Try direct Supabase Auth login
    if (isSupabaseConfigured) {
      try {
        const client = await getSupabaseClient();
        if (client) {
          const { data, error: sbError } = await client.auth.signInWithPassword({
            email: trimmedEmail,
            password: password
          });

          if (!sbError && data?.user) {
            setUser(data.user);
            setPassword('');
            const refreshed = await loadVipCodeSettings();
            setSettings(refreshed);
            setIsSigningIn(false);
            return;
          }
        }
      } catch (sbErr) {
        console.warn('[Admin] Direct Supabase auth attempt:', sbErr);
      }
    }

    // 3. Fallback to /api/admin/login (Vercel)
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmedEmail, password })
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Login failed.');
      setUser(result.user);
      setPassword('');
      const refreshed = await loadVipCodeSettings();
      setSettings(refreshed);
    } catch (signInError) {
      setError(signInError.message || 'Login করা যায়নি। Email এবং Password পুনরায় যাচাই করুন।');
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
      const client = await getSupabaseClient();
      await saveVipCodeSettings(settings, { localOnly: user?.isDemo, client });
      setIsDirty(false);
      setMessage(
        user?.isDemo
          ? 'Demo পরিবর্তন এই browser-এ সেভ হয়েছে।'
          : isSupabaseConfigured
          ? '✅ Supabase Database-এ সব তথ্য সফলভাবে সেভ হয়েছে!'
          : 'পরিবর্তনগুলো এই ব্রাউজারে সেভ হয়েছে।'
      );
    } catch (saveError) {
      setError(saveError.message || 'সেভ করা যায়নি। আবার চেষ্টা করুন।');
    } finally {
      setIsSaving(false);
    }
  };

  const discardChanges = async () => {
    setError('');
    setMessage('');
    setIsDirty(false);
    try {
      setSettings(isSupabaseConfigured && !user?.isDemo ? await loadVipCodeSettings() : readVipCodeSettings());
      setMessage('পরিবর্তন বাতিল করা হয়েছে।');
    } catch (loadError) {
      setError(loadError.message);
    }
  };

  const handleSignOut = async () => {
    if (user?.isDemo) {
      window.localStorage.removeItem(DEMO_SESSION_KEY);
    } else {
      try {
        const client = await getSupabaseClient();
        if (client) await client.auth.signOut();
      } catch (_) {}
      try {
        await fetch('/api/admin/session', { method: 'DELETE', credentials: 'same-origin' });
      } catch (_) {}
    }
    setUser(null);
    setMessage('সফলভাবে লগআউট হয়েছে।');
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
            <span className="admin-eyebrow">CONTROL DASHBOARD</span>
            <h1 id="admin-title">সাইট সেটিংস ও কোড পরিচালনা</h1>
            <p>ওয়েবসাইটের হেডার, নোটিশ, ড্র তারিখ, ভিআইপি কোড ও হেল্পলাইন সরাসরি পরিচালনা করুন।</p>
          </div>

          {isSupabaseConfigured ? (
            <div className="admin-draft-notice is-cloud" role="status">
              <strong>Cloud Database Connected</strong>
              <span>সব পেজের সেটিংস Supabase ক্লাউড থেকে লাইভ লোড হয়; পরিবর্তন করতে নিচে sign-in করুন।</span>
            </div>
          ) : (
            <div className="admin-draft-notice" role="note">
              <strong>Local draft mode</strong>
              <span>Supabase environment সেট না থাকায় সেভ করা পরিবর্তন ব্রাউজারে সংরক্ষিত থাকবে।</span>
            </div>
          )}

          {user?.isDemo && (
            <div className="admin-draft-notice" role="status">
              <strong>Demo mode · this browser only</strong>
              <span>Demo login মোডে আছেন। এখানে save করা পরিবর্তন শুধু এই ব্রাউজারে প্রিভিউ হবে।</span>
            </div>
          )}

          {isLoading ? (
            <p className="admin-feedback" role="status">Supabase থেকে সেটিংস লোড হচ্ছে…</p>
          ) : !isAdmin ? (
            <div className="admin-auth-block">
              <h2>Admin Sign-In</h2>
              <p>ওয়েবসাইটের তথ্য পরিবর্তন করতে আপনার Admin credentials দিয়ে লগইন করুন।</p>
              <form className="admin-form" onSubmit={handleSignIn}>
                <label className="admin-field">
                  <span>Email Address</span>
                  <input
                    type="email"
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>
                <label className="admin-field">
                  <span>Password</span>
                  <input
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    placeholder="Enter admin password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </label>
                {error && <p className="admin-feedback is-error" role="alert">{error}</p>}
                {message && <p className="admin-feedback is-success" role="status">{message}</p>}
                <button className="admin-save-button" type="submit" disabled={isSigningIn}>
                  {isSigningIn ? 'লগইন হচ্ছে…' : 'Admin Sign-in'}
                </button>
              </form>
              <p className="admin-auth-help">
                টিপস: Supabase Auth credentials (<code>armanali420@gmail.com</code>) দিয়ে সরাসরি ক্লাউড ডাটাবেজ আপডেট করতে পারবেন।
              </p>
            </div>
          ) : (
            <>
              <div className="admin-user-bar">
                <span>লগইন একাউন্ট: <strong>{user.email}</strong> {user.isDemo && '(Demo)'}</span>
                <button className="admin-reset-button" type="button" onClick={handleSignOut}>
                  লগআউট (Sign out)
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="admin-tabs" role="tablist" aria-label="সেটিংস বিভাগ">
                <button
                  type="button"
                  className={`admin-tab-btn ${activeTab === 'draw' ? 'is-active' : ''}`}
                  onClick={() => setActiveTab('draw')}
                >
                  <span>📅</span> ড্র তারিখ ও কোড
                </button>
                <button
                  type="button"
                  className={`admin-tab-btn ${activeTab === 'header' ? 'is-active' : ''}`}
                  onClick={() => setActiveTab('header')}
                >
                  <span>🏷️</span> ব্র্যান্ডিং ও নোটিশ
                </button>
                <button
                  type="button"
                  className={`admin-tab-btn ${activeTab === 'papers' ? 'is-active' : ''}`}
                  onClick={() => setActiveTab('papers')}
                >
                  <span>👑</span> ৩-আপ গেম ও পেপার
                </button>
                <button
                  type="button"
                  className={`admin-tab-btn ${activeTab === 'contact' ? 'is-active' : ''}`}
                  onClick={() => setActiveTab('contact')}
                >
                  <span>📞</span> হেল্পলাইন ও পেমেন্ট
                </button>
                <button
                  type="button"
                  className={`admin-tab-btn ${activeTab === 'agent' ? 'is-active' : ''}`}
                  onClick={() => setActiveTab('agent')}
                >
                  <span>🛡️</span> এজেন্ট ও কোটা নোটিশ
                </button>
                <button
                  type="button"
                  className={`admin-tab-btn ${activeTab === 'results' ? 'is-active' : ''}`}
                  onClick={() => setActiveTab('results')}
                >
                  <span>🏆</span> রেজাল্ট ও লাইভ
                </button>
              </div>

              {/* Settings Form */}
              <form className="admin-form" onSubmit={handleSubmit}>
                {/* TAB 1: DRAW DATES & VIP CODE */}
                {activeTab === 'draw' && (
                  <div className="admin-grid-2">
                    <label className="admin-field">
                      <span><b>01</b> প্রথম ড্র-এর তারিখ</span>
                      <input
                        type="date"
                        value={settings.firstDate || ''}
                        onChange={updateField('firstDate')}
                        required
                      />
                      <small>এই ড্র-এর জন্য ১ম পেপার ও কোড উন্মুক্ত থাকবে ({formatVipDate(settings.firstDate)})।</small>
                    </label>

                    <label className="admin-field">
                      <span><b>02</b> দ্বিতীয় ড্র-এর তারিখ</span>
                      <input
                        type="date"
                        value={settings.secondDate || ''}
                        onChange={updateField('secondDate')}
                        required
                      />
                      <small>পরবর্তী ড্র-এর তারিখ হিসেবে প্রদর্শিত হবে ({formatVipDate(settings.secondDate)})।</small>
                    </label>

                    <label className="admin-field">
                      <span><b>03</b> লটারি সাল / বছর (Active Year)</span>
                      <input
                        type="text"
                        value={settings.activeYear || ''}
                        onChange={updateField('activeYear')}
                        placeholder="2026"
                        maxLength={4}
                        required
                      />
                      <small>ওয়েবসাইটের সর্বত্র (শিরোনাম, ব্যানার, ফুটার, সার্টিফিকেট) এই সাল কার্যকর হবে।</small>
                    </label>

                    <label className="admin-field">
                      <span><b>04</b> VIP Agency Code (৫ ডিজিট)</span>
                      <input
                        type="text"
                        className="is-code"
                        inputMode="numeric"
                        autoComplete="off"
                        pattern="[0-9]{5}"
                        maxLength={5}
                        value={settings.code || ''}
                        onChange={updateField('code')}
                        required
                      />
                      <small>ঠিক ৫টি সংখ্যার কোড লিখুন। গ্রাহকরা পেজে এই কোডটি দেখতে পাবেন।</small>
                    </label>
                  </div>
                )}

                {/* TAB 2: HEADER & NOTICES */}
                {activeTab === 'header' && (
                  <div className="admin-grid-2">
                    <label className="admin-field">
                      <span><b>01</b> ব্র্যান্ডের নাম (Header Title)</span>
                      <input
                        type="text"
                        value={settings.headerTitle || ''}
                        onChange={updateField('headerTitle')}
                        placeholder="e.g. Thailand Lottery"
                        required
                      />
                      <small>ওয়েবসাইটের মূল লোগোর পাশে প্রদর্শিত নাম।</small>
                    </label>

                    <label className="admin-field">
                      <span><b>02</b> সাবটাইটেল / মারকুই টেক্সট</span>
                      <input
                        type="text"
                        value={settings.headerSubtitle || ''}
                        onChange={updateField('headerSubtitle')}
                        placeholder="สำนักงานสลากกินแบ่งรัฐบาล • সরকারি অনুমোদিত"
                        required
                      />
                      <small>হেডারে অ্যানিমেটেড মারকুই ও ফুটারের সাবটাইটেল।</small>
                    </label>

                    <div className="admin-field admin-grid-full admin-toggle-field">
                      <span><b>03</b> শীর্ষ ঘোষণা নোটিশ বার চালু / বন্ধ (ON / OFF)</span>
                      <div className="admin-toggle-switch-row">
                        <button
                          type="button"
                          className={`admin-toggle-pill ${settings.showTopNotice !== false ? 'is-on' : 'is-off'}`}
                          onClick={() => {
                            setIsDirty(true);
                            setSettings((c) => ({ ...c, showTopNotice: !(c.showTopNotice !== false) }));
                          }}
                        >
                          <span className="toggle-indicator" />
                          <span>{settings.showTopNotice !== false ? '🔔 অন (ON) — ঘোষণা বার সাইটে প্রদর্শিত হচ্ছে' : '🔕 অফ (OFF) — ঘোষণা বার সম্পূর্ণ লুকানো আছে'}</span>
                        </button>
                        <small>ঘোষণা বার সম্পূর্ণ বন্ধ করতে ক্লিক করুন। বন্ধ থাকলে সাইটের উপরে কোনো নোটিশ স্ক্রোল হবে না।</small>
                      </div>
                    </div>

                    <label className="admin-field admin-grid-full">
                      <span><b>04</b> শীর্ষ ঘোষণা নোটিশ টেক্সট (Top Notice)</span>
                      <textarea
                        value={settings.topNotice || ''}
                        onChange={updateField('topNotice')}
                        placeholder="শীর্ষে প্রদর্শনের জন্য জরুরি নোটিশ লিখুন..."
                        rows={3}
                      />
                      <small>নোটিশ বার অন থাকলে সাইটের সবচেয়ে উপরে লাল/সোনালী স্ট্রিপে লাইভ স্ক্রোল হবে।</small>
                    </label>
                  </div>
                )}

                {/* TAB 3: 3-UP GAME & PAPER CONTROLS */}
                {activeTab === 'papers' && (
                  <div className="admin-grid-2">
                    <label className="admin-field">
                      <span><b>01</b> ৩-আপ সেকশন টাইটেল (Home Card)</span>
                      <input
                        type="text"
                        value={settings.threeUpTitle || ''}
                        onChange={updateField('threeUpTitle')}
                        placeholder={`থাইল্যান্ড লটারি 3 সেট গেম পেপার ${settings.activeYear || '2026'}`}
                        required
                      />
                      <small>হোমপেজের ৩-আপ সেকশনের প্রধান শিরোনাম।</small>
                    </label>

                    <label className="admin-field">
                      <span><b>02</b> ৩-আপ বাটন টেক্সট</span>
                      <input
                        type="text"
                        value={settings.threeUpButtonText || ''}
                        onChange={updateField('threeUpButtonText')}
                        placeholder="3 UP GAME"
                        required
                      />
                      <small>হোমপেজের গ্লোয়িং বাটনের টেক্সট (default: 3 UP GAME)।</small>
                    </label>

                    <label className="admin-field admin-grid-full">
                      <span><b>03</b> ৩-আপ সেকশন সাবটাইটেল / বিবরণ</span>
                      <textarea
                        value={settings.threeUpSubtitle || ''}
                        onChange={updateField('threeUpSubtitle')}
                        placeholder="অফিসিয়াল 3 সেট / 3 আপ গেম পেপার ও লাইসেন্সকৃত অনুমোদনপত্র দেখতে নিচে ক্লিক করুন:"
                        rows={2}
                      />
                      <small>বাটনের ঠিক উপরে নির্দেশনামূলক টেক্সট।</small>
                    </label>

                    {/* Paper 1 (Game Paper Date 1) */}
                    <div className="admin-field admin-paper-upload-box">
                      <span><b>04</b> ১ সেট ৩ডি গেম পেপার — ১ম ড্র ({formatVipDate(settings.firstDate)})</span>
                      <div className="admin-paper-upload-row">
                        <label className="admin-file-btn">
                          <span>{uploadingField === 'gamePaperImage' ? '⏳ আপলোড হচ্ছে…' : '📁 ফাইল থেকে ছবি আপলোড করুন'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleFileUpload('gamePaperImage')}
                            disabled={uploadingField === 'gamePaperImage'}
                          />
                        </label>
                      </div>
                      <input
                        type="text"
                        value={settings.gamePaperImage || ''}
                        onChange={updateField('gamePaperImage')}
                        placeholder="/assets/site/3-up-game-paper-1.jpg বা ছবির অনলাইন লিংক"
                        required
                      />
                      {settings.gamePaperImage && (
                        <div className="admin-paper-preview-wrap">
                          <img src={settings.gamePaperImage} alt="Game Paper Preview 1" className="admin-paper-thumb" />
                          <div className="admin-paper-meta">
                            <span>প্রিভিউ সম্পন্ন</span>
                            <button
                              type="button"
                              className="admin-paper-clear-btn"
                              onClick={() => {
                                setIsDirty(true);
                                setSettings((c) => ({ ...c, gamePaperImage: '/assets/site/3-up-game-paper-1.jpg' }));
                              }}
                            >
                              রিসেট (ডিফল্ট)
                            </button>
                          </div>
                        </div>
                      )}
                      <small>১ম ড্র-এর তারিখ ({formatVipDate(settings.firstDate)}) ক্লিক করলে এই ছবিটি প্রদর্শিত হবে।</small>
                    </div>

                    {/* Paper 2 (Game Paper Date 2) */}
                    <div className="admin-field admin-paper-upload-box">
                      <span><b>05</b> ১ সেট ৩ডি গেম পেপার — ২য় ড্র ({formatVipDate(settings.secondDate)}) (ঐচ্ছিক)</span>
                      <div className="admin-paper-upload-row">
                        <label className="admin-file-btn">
                          <span>{uploadingField === 'gamePaperImageDate2' ? '⏳ আপলোড হচ্ছে…' : '📁 ফাইল থেকে ছবি আপলোড করুন'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleFileUpload('gamePaperImageDate2')}
                            disabled={uploadingField === 'gamePaperImageDate2'}
                          />
                        </label>
                      </div>
                      <input
                        type="text"
                        value={settings.gamePaperImageDate2 || ''}
                        onChange={updateField('gamePaperImageDate2')}
                        placeholder="খালি রাখলে ১ম ড্র-এর পেপার স্বয়ংক্রিয়ভাবে ব্যবহার হবে"
                      />
                      {settings.gamePaperImageDate2 && (
                        <div className="admin-paper-preview-wrap">
                          <img src={settings.gamePaperImageDate2} alt="Game Paper Preview 2" className="admin-paper-thumb" />
                          <div className="admin-paper-meta">
                            <span>২য় ড্র কাস্টম পেপার</span>
                            <button
                              type="button"
                              className="admin-paper-clear-btn"
                              onClick={() => {
                                setIsDirty(true);
                                setSettings((c) => ({ ...c, gamePaperImageDate2: '' }));
                              }}
                            >
                              মুছে ফেলুন (Remove)
                            </button>
                          </div>
                        </div>
                      )}
                      <small>২য় ড্র-এর তারিখ ({formatVipDate(settings.secondDate)}) ক্লিক করলে এই ছবিটি প্রদর্শিত হবে।</small>
                    </div>

                    {/* Paper 3 (Calculation Paper Date 1) */}
                    <div className="admin-field admin-paper-upload-box">
                      <span><b>06</b> ১ বছর ২৪ সেট ক্যালকুলেশন পেপার — ১ম ড্র ({formatVipDate(settings.firstDate)})</span>
                      <div className="admin-paper-upload-row">
                        <label className="admin-file-btn">
                          <span>{uploadingField === 'calculationPaperImage' ? '⏳ আপলোড হচ্ছে…' : '📁 ফাইল থেকে ছবি আপলোড করুন'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleFileUpload('calculationPaperImage')}
                            disabled={uploadingField === 'calculationPaperImage'}
                          />
                        </label>
                      </div>
                      <input
                        type="text"
                        value={settings.calculationPaperImage || ''}
                        onChange={updateField('calculationPaperImage')}
                        placeholder="/assets/site/3-up-game-paper-2.jpg বা ছবির অনলাইন লিংক"
                        required
                      />
                      {settings.calculationPaperImage && (
                        <div className="admin-paper-preview-wrap">
                          <img src={settings.calculationPaperImage} alt="Calc Paper Preview 1" className="admin-paper-thumb" />
                          <div className="admin-paper-meta">
                            <span>প্রিভিউ সম্পন্ন</span>
                            <button
                              type="button"
                              className="admin-paper-clear-btn"
                              onClick={() => {
                                setIsDirty(true);
                                setSettings((c) => ({ ...c, calculationPaperImage: '/assets/site/3-up-game-paper-2.jpg' }));
                              }}
                            >
                              রিসেট (ডিফল্ট)
                            </button>
                          </div>
                        </div>
                      )}
                      <small>ক্যালকুলেশন বক্সের ১ম ড্র ({formatVipDate(settings.firstDate)}) ক্লিক করলে প্রদর্শিত হবে।</small>
                    </div>

                    {/* Paper 4 (Calculation Paper Date 2) */}
                    <div className="admin-field admin-paper-upload-box">
                      <span><b>07</b> ১ বছর ২৪ সেট ক্যালকুলেশন পেপার — ২য় ড্র ({formatVipDate(settings.secondDate)}) (ঐচ্ছিক)</span>
                      <div className="admin-paper-upload-row">
                        <label className="admin-file-btn">
                          <span>{uploadingField === 'calculationPaperImageDate2' ? '⏳ আপলোড হচ্ছে…' : '📁 ফাইল থেকে ছবি আপলোড করুন'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleFileUpload('calculationPaperImageDate2')}
                            disabled={uploadingField === 'calculationPaperImageDate2'}
                          />
                        </label>
                      </div>
                      <input
                        type="text"
                        value={settings.calculationPaperImageDate2 || ''}
                        onChange={updateField('calculationPaperImageDate2')}
                        placeholder="খালি রাখলে ১ম ড্র-এর ক্যালকুলেশন পেপার ব্যবহার হবে"
                      />
                      {settings.calculationPaperImageDate2 && (
                        <div className="admin-paper-preview-wrap">
                          <img src={settings.calculationPaperImageDate2} alt="Calc Paper Preview 2" className="admin-paper-thumb" />
                          <div className="admin-paper-meta">
                            <span>২য় ড্র কাস্টম পেপার</span>
                            <button
                              type="button"
                              className="admin-paper-clear-btn"
                              onClick={() => {
                                setIsDirty(true);
                                setSettings((c) => ({ ...c, calculationPaperImageDate2: '' }));
                              }}
                            >
                              মুছে ফেলুন (Remove)
                            </button>
                          </div>
                        </div>
                      )}
                      <small>ক্যালকুলেশন বক্সের ২য় ড্র ({formatVipDate(settings.secondDate)}) ক্লিক করলে প্রদর্শিত হবে।</small>
                    </div>

                    <label className="admin-field">
                      <span><b>08</b> গেম পেপারের হাইলাইট ব্যাজ টেক্সট</span>
                      <input
                        type="text"
                        value={settings.gamePaperBadge || ''}
                        onChange={updateField('gamePaperBadge')}
                        placeholder="OFFICIAL VIP GAME PAPER"
                        required
                      />
                      <small>গেম পেপার ভিউয়ারের ওপরে সোনালী হাইলাইট ব্যাজ।</small>
                    </label>

                    <label className="admin-field">
                      <span><b>09</b> ক্যালকুলেশন পেপারের হাইলাইট ব্যাজ টেক্সট</span>
                      <input
                        type="text"
                        value={settings.calculationPaperBadge || ''}
                        onChange={updateField('calculationPaperBadge')}
                        placeholder="OFFICIAL VIP CALCULATION PAPER"
                        required
                      />
                      <small>ক্যালকুলেশন পেপার ভিউয়ারের ওপরে সোনালী হাইলাইট ব্যাজ।</small>
                    </label>
                  </div>
                )}

                {/* TAB 4: CONTACTS, HELPLINE & PAYMENT */}
                {activeTab === 'contact' && (
                  <div className="admin-grid-2">
                    <label className="admin-field">
                      <span><b>01</b> অফিসিয়াল হেল্পলাইন নম্বর</span>
                      <input
                        type="text"
                        value={settings.phoneNumber || ''}
                        onChange={updateField('phoneNumber')}
                        placeholder="+8801309802224"
                        required
                      />
                      <small>সরাসরি কল বা কপি করার জন্য মূল নম্বর।</small>
                    </label>

                    <label className="admin-field">
                      <span><b>02</b> WhatsApp নম্বর</span>
                      <input
                        type="text"
                        value={settings.whatsappNumber || ''}
                        onChange={updateField('whatsappNumber')}
                        placeholder="+8801309802224"
                        required
                      />
                      <small>ফ্লোটিং হোয়াটসঅ্যাপ বাটনে ক্লিক করলে এই নম্বরে চ্যাট শুরু হবে।</small>
                    </label>

                    <label className="admin-field">
                      <span><b>03</b> IMO হেল্পলাইন নম্বর</span>
                      <input
                        type="text"
                        value={settings.imoNumber || ''}
                        onChange={updateField('imoNumber')}
                        placeholder="+8801309802224"
                        required
                      />
                      <small>ইমো বাটনে ক্লিক করলে এই নম্বরটি ব্যবহার হবে।</small>
                    </label>

                    <label className="admin-field">
                      <span><b>04</b> বিকাশ (Bkash) পেমেন্ট নম্বর</span>
                      <input
                        type="text"
                        value={settings.bkashNumber || ''}
                        onChange={updateField('bkashNumber')}
                        placeholder="+8801705330881"
                        required
                      />
                      <small>রেজিস্ট্রেশন ফর্মে কপি বাটনে গ্রাহকরা এই বিকাশ নম্বর পাবেন।</small>
                    </label>

                    <label className="admin-field">
                      <span><b>05</b> নগদ (Nagad) নম্বর (ঐচ্ছিক)</span>
                      <input
                        type="text"
                        value={settings.nagadNumber || ''}
                        onChange={updateField('nagadNumber')}
                        placeholder="+8801705330881"
                      />
                      <small>নগদ পেমেন্টের জন্য ব্যবহৃত নম্বর।</small>
                    </label>

                    <label className="admin-field">
                      <span><b>06</b> রকেট (Rocket) নম্বর (ঐচ্ছিক)</span>
                      <input
                        type="text"
                        value={settings.rocketNumber || ''}
                        onChange={updateField('rocketNumber')}
                        placeholder="+8801705330881"
                      />
                      <small>ডাচ বাংলা রকেট পেমেন্ট নম্বর।</small>
                    </label>

                    <label className="admin-field admin-grid-full">
                      <span><b>07</b> WhatsApp প্রি-ফিল্ড ডিফল্ট মেসেজ</span>
                      <input
                        type="text"
                        value={settings.whatsappMessage || ''}
                        onChange={updateField('whatsappMessage')}
                        placeholder="Hello, I want VIP 3 Up Game & Calculation Paper"
                      />
                      <small>গ্রাহকরা WhatsApp লিংকে ক্লিক করলে চ্যাটে এই মেসেজটি স্বয়ংক্রিয়ভাবে লেখা থাকবে।</small>
                    </label>
                  </div>
                )}

                {/* TAB 5: AGENT PROFILE & URGENT QUOTA */}
                {activeTab === 'agent' && (
                  <div className="admin-grid-2">
                    <label className="admin-field">
                      <span><b>01</b> অফিসিয়াল এজেন্টের নাম</span>
                      <input
                        type="text"
                        value={settings.agentName || ''}
                        onChange={updateField('agentName')}
                        placeholder="মোঃ ফাহিম চৌধুরী"
                        required
                      />
                      <small>হোমপেজের অফিসিয়াল সার্টিফিকেট ও ভেরিফিকেশন কার্ডে প্রদর্শিত হবে।</small>
                    </label>

                    <label className="admin-field">
                      <span><b>02</b> সরকারি লাইসেন্স নম্বর</span>
                      <input
                        type="text"
                        value={settings.licenseNumber || ''}
                        onChange={updateField('licenseNumber')}
                        placeholder="TGL-2025-001784"
                        required
                      />
                      <small>বিশ্বাসযোগ্যতা বৃদ্ধিতে ব্যবহৃত লাইসেন্স কোড।</small>
                    </label>

                    <label className="admin-field">
                      <span><b>03</b> অবশিষ্ট কোটা / ফর্ম সংখ্যা</span>
                      <input
                        type="text"
                        value={settings.urgentFormsLeft || ''}
                        onChange={updateField('urgentFormsLeft')}
                        placeholder="5টি"
                        required
                      />
                      <small>অফার ব্যানারে 'আর মাত্র ৫টি ফর্ম বাকি' হিসেবে দৃশ্যমান হবে।</small>
                    </label>

                    <label className="admin-field">
                      <span><b>04</b> জরুরি অফার নোটিশ হেডলাইন</span>
                      <input
                        type="text"
                        value={settings.urgentNotice || ''}
                        onChange={updateField('urgentNotice')}
                        placeholder="আর মাত্র 5টি ফর্ম বাকি আছে শুধু!"
                        required
                      />
                      <small>টাইমার কাউন্টডাউনের উপরে জরুরি এলার্ট হেডলাইন।</small>
                    </label>
                  </div>
                )}

                {/* TAB 6: RESULTS & LIVE STREAM */}
                {activeTab === 'results' && (
                  <div className="admin-grid-2">
                    <label className="admin-field">
                      <span><b>01</b> সর্বশেষ ৩ডি উইনিং রেজাল্ট নম্বর</span>
                      <input
                        type="text"
                        value={settings.latestResult3d || ''}
                        onChange={updateField('latestResult3d')}
                        placeholder="781"
                        maxLength={6}
                      />
                      <small>হোমপেজের রেজাল্ট ও উইনার্স সেকশনে হাইলাইট হিসেবে দৃশ্যমান হবে।</small>
                    </label>

                    <label className="admin-field admin-grid-full">
                      <span><b>02</b> অফিসিয়াল লাইভ ভিডিও Embed Code অথবা Video URL</span>
                      <textarea
                        value={settings.liveStreamUrl || ''}
                        onChange={updateField('liveStreamUrl')}
                        placeholder='সরাসরি <iframe> এম্বেড কোড পেস্ট করুন, অথবা YouTube / Facebook লাইভ ভিডিও লিংক দিন...&#10;উদাহরণ:&#10;<iframe width="560" height="315" src="https://www.youtube.com/embed/..." ...></iframe>&#10;অথবা https://www.youtube.com/watch?v=...'
                        rows={4}
                      />
                      <small>
                        💡 টিপস: আপনি সরাসরি সম্পূর্ণ <code>&lt;iframe&gt;</code> এম্বেড কোড পেস্ট করতে পারেন, অথবা সাধারণ YouTube / Facebook ভিডিও লিংক পেস্ট করলেও সিস্টেম স্বয়ংক্রিয়ভাবে লাইভ প্লেয়ারে রূপান্তর করে নিবে।
                      </small>
                    </label>

                    {/* Live Stream Preview Box */}
                    {Boolean(settings.liveStreamUrl) && (
                      <div className="admin-field admin-grid-full" style={{ marginTop: '0.5rem' }}>
                        <span><b>03</b> লাইভ ভিডিও প্রিভিউ (Live Preview)</span>
                        <div style={{ maxWidth: '480px', borderRadius: '10px', overflow: 'hidden', border: '1.5px solid rgba(255, 215, 0, 0.4)', background: '#000' }}>
                          <iframe
                            src={resolveEmbedUrl(settings.liveStreamUrl) || 'https://www.youtube.com/embed/Emnh_bS2PIo'}
                            width="100%"
                            height="240"
                            title="Admin Live Stream Preview"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{ display: 'block', border: 'none' }}
                          />
                        </div>
                        <small style={{ color: '#74e6b2', marginTop: '0.4rem' }}>
                          ✓ প্লেয়ার সফলভাবে প্রস্তুত হয়েছে: {resolveEmbedUrl(settings.liveStreamUrl)}
                        </small>
                      </div>
                    )}
                  </div>
                )}

                {/* Real-time Preview Bar */}
                <div className="admin-preview-box">
                  <span className="admin-preview-label">লাইভ প্রিভিউ সারাংশ (Live Preview)</span>
                  <div className="admin-preview-content">
                    <span className="admin-preview-chip">🏷️ {settings.headerTitle || 'Thailand Lottery'}</span>
                    <span className="admin-preview-chip">📅 ১ম ড্র: {formatVipDate(settings.firstDate)}</span>
                    <span className="admin-preview-chip">👑 কোড: {settings.code}</span>
                    <span className="admin-preview-chip">💬 WA: {settings.whatsappNumber || settings.phoneNumber}</span>
                    <span className="admin-preview-chip">💰 বিকাশ: {settings.bkashNumber}</span>
                    <span className="admin-preview-chip">👤 এজেন্ট: {settings.agentName}</span>
                    <span className="admin-preview-chip">🎮 ৩-আপ: {settings.threeUpButtonText}</span>
                  </div>
                </div>

                {error && <p className="admin-feedback is-error" role="alert">{error}</p>}
                {message && <p className="admin-feedback is-success" role="status">{message}</p>}

                <div className="admin-actions">
                  <button className="admin-save-button" type="submit" disabled={isSaving}>
                    {isSaving ? 'সেভ হচ্ছে…' : '💾 সমস্ত পরিবর্তন সেভ করুন'}
                  </button>
                  <button
                    className="admin-reset-button"
                    type="button"
                    onClick={discardChanges}
                    disabled={isSaving}
                  >
                    পরিবর্তন বাতিল
                  </button>
                </div>
              </form>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
