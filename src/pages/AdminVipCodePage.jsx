import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useVipCodeSettings } from '../hooks/useVipCodeSettings';
import { getSupabaseClient, isSupabaseConfigured } from '../lib/supabase';
import { loadVipCodeSettings, readVipCodeSettings, saveVipCodeSettings } from '../lib/vipCodeSettings';
import '../styles/admin.css';

export default function AdminVipCodePage() {
  const publicSettings = useVipCodeSettings();
  const [settings, setSettings] = useState(publicSettings);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('armanali420@gmail.com');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isPasswordRecovery, setIsPasswordRecovery] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(isSupabaseConfigured);
  const [isSaving, setIsSaving] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const isAdmin = user?.app_metadata?.role === 'admin';

  useEffect(() => {
    if (!isSupabaseConfigured) return undefined;

    let active = true;
    const loadSettings = async () => {
      try {
        const current = await loadVipCodeSettings();
        if (active) setSettings(current);
      } catch (loadError) {
        if (active) setError(loadError.message);
      } finally {
        if (active) setIsLoading(false);
      }
    };

    let subscription;
    getSupabaseClient().then((client) => {
      if (!client || !active) return;
      client.auth.getUser().then(({ data, error: authError }) => {
        if (!active) return;
        if (authError) setError(authError.message);
        setUser(data.user);
      });
      const { data: { subscription: authSubscription } } = client.auth.onAuthStateChange((event, session) => {
        setUser(session?.user ?? null);
        if (event === 'PASSWORD_RECOVERY') setIsPasswordRecovery(true);
      });
      subscription = authSubscription;
    });

    loadSettings();
    return () => {
      active = false;
      subscription?.unsubscribe();
    };
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

    const client = await getSupabaseClient();
    const { data, error: signInError } = await client.auth.signInWithPassword({ email, password });
    setIsSigningIn(false);

    if (signInError) {
      setError(`লগইন করা যায়নি: ${signInError.message}`);
      return;
    }

    setUser(data.user);
    setPassword('');
    if (data.user?.app_metadata?.role !== 'admin') {
      setError('এই account-এ admin access নেই। Supabase Auth user-এর app_metadata-তে role=admin সেট করতে হবে।');
    }
  };

  const handlePasswordResetRequest = async () => {
    setError('');
    setMessage('');
    const normalizedEmail = email.trim();
    if (!normalizedEmail) {
      setError('Password reset email পাঠানোর আগে email address লিখুন।');
      return;
    }

    setIsSigningIn(true);
    const client = await getSupabaseClient();
    const { error: resetError } = await client.auth.resetPasswordForEmail(normalizedEmail, {
      redirectTo: `${window.location.origin}/admin`
    });
    setIsSigningIn(false);

    if (resetError) {
      setError(`Password reset email পাঠানো যায়নি: ${resetError.message}`);
      return;
    }
    setMessage('Account থাকলে password reset link email-এ পাঠানো হয়েছে। Link খুলে নতুন password সেট করুন।');
  };

  const handlePasswordUpdate = async (event) => {
    event.preventDefault();
    setError('');
    setMessage('');
    if (newPassword.length < 8) {
      setError('নতুন password কমপক্ষে ৮ অক্ষরের হতে হবে।');
      return;
    }

    setIsSigningIn(true);
    const client = await getSupabaseClient();
    const { data, error: updateError } = await client.auth.updateUser({ password: newPassword });
    setIsSigningIn(false);
    if (updateError) {
      setError(`Password update করা যায়নি: ${updateError.message}`);
      return;
    }

    setUser(data.user);
    setNewPassword('');
    setIsPasswordRecovery(false);
    setMessage('Password আপডেট হয়েছে। এখন এই password দিয়ে sign in করতে পারবেন।');
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
    const client = await getSupabaseClient();
    const { error: signOutError } = await client.auth.signOut();
    if (signOutError) setError(signOutError.message);
    else setUser(null);
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
            <p className="admin-feedback" role="status">Supabase থেকে সেটিংস লোড হচ্ছে…</p>
          ) : isPasswordRecovery ? (
            <div className="admin-auth-block">
              <h2>নতুন password সেট করুন</h2>
              <p>Email-এ পাওয়া recovery link দিয়ে আপনি প্রবেশ করেছেন। নতুন password দিন।</p>
              <form className="admin-form" onSubmit={handlePasswordUpdate}>
                <label className="admin-field">
                  <span>নতুন password</span>
                  <input type="password" autoComplete="new-password" minLength={8} value={newPassword} onChange={(event) => setNewPassword(event.target.value)} required />
                </label>
                {error && <p className="admin-feedback is-error" role="alert">{error}</p>}
                <button className="admin-save-button" type="submit" disabled={isSigningIn}>
                  {isSigningIn ? 'আপডেট হচ্ছে…' : 'নতুন password সেভ করুন'}
                </button>
              </form>
            </div>
          ) : (isSupabaseConfigured && !isAdmin) ? (
            user ? (
              <div className="admin-auth-block">
                <p className="admin-feedback is-error" role="alert">
                  এই account-এ admin permission নেই। Supabase Auth user-এর <strong>app_metadata.role</strong> হিসেবে <strong>admin</strong> সেট করুন।
                </p>
                <button className="admin-reset-button" type="button" onClick={handleSignOut}>Sign out</button>
              </div>
            ) : (
              <div className="admin-auth-block">
                <h2>Admin sign-in</h2>
                <p>Supabase Auth-এর admin account দিয়ে প্রবেশ করুন।</p>
                <form className="admin-form" onSubmit={handleSignIn}>
                  <label className="admin-field">
                    <span>Email</span>
                    <input type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} required />
                  </label>
                  <label className="admin-field">
                    <span>Password</span>
                    <input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
                  </label>
                  <button className="admin-reset-button" type="button" onClick={handlePasswordResetRequest} disabled={isSigningIn}>
                    {isSigningIn ? 'অপেক্ষা করুন…' : 'পাসওয়ার্ড ভুলে গেছেন? Reset email পাঠান'}
                  </button>
                  {message && <p className="admin-feedback is-success" role="status">{message}</p>}
                  {error && <p className="admin-feedback is-error" role="alert">{error}</p>}
                  <button className="admin-save-button" type="submit" disabled={isSigningIn}>
                    {isSigningIn ? 'প্রবেশ করা হচ্ছে…' : 'Admin sign-in'}
                  </button>
                </form>
                <p className="admin-auth-help">Dashboard → Authentication → Users থেকে Auth user তৈরি করুন, তারপর তার <strong>app_metadata</strong>-তে <code>{'{ "role": "admin" }'}</code> দিন।</p>
              </div>
            )
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
