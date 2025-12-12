'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

type AuthMode = 'signin' | 'signup' | 'forgot';

// Separate component that uses useSearchParams
function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect');
  
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const endpoint = mode === 'signin' ? '/api/auth/signin' : '/api/auth/signup';
      const body = mode === 'signin' 
        ? { email, password }
        : { email, password, fullName: name };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      setSuccess(mode === 'signin' ? '✅ Signed in successfully!' : '✅ Account created!');
      
      setTimeout(() => {
        const destination = redirectPath || '/';
        window.location.href = destination;
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setLoading(true);
    setError('');

    try {
      if (redirectPath) {
        sessionStorage.setItem('auth_redirect', redirectPath);
      }

      const response = await fetch('/api/auth/google', {
        method: 'POST',
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Google sign in failed');
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No redirect URL received');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Google sign in failed');
      setLoading(false);
    }
  };

  const handleMagicLink = async () => {
    if (!email) {
      setError('Please enter your email first');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, redirectTo: redirectPath }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send magic link');
      }

      setMagicLinkSent(true);
      setSuccess('📧 Check your email for the magic link!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send magic link');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send reset email');
      }

      setSuccess('📧 Check your email for a password reset link');
      setEmail('');
      
      setTimeout(() => {
        setMode('signin');
        setSuccess('');
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  const getMascotEmoji = () => {
    if (success) return '🎉';
    if (error) return '😅';
    if (loading) return '⚙️';
    if (mode === 'forgot') return '🔑';
    return mode === 'signin' ? '👋' : '🚀';
  };

  if (mode === 'forgot') {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-slate-950 dark:via-gray-950 dark:to-zinc-950 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className={`text-7xl mb-4 ${loading ? 'animate-spin' : 'animate-bounce'}`}>
              {getMascotEmoji()}
            </div>
            <h1 className="text-3xl font-black text-gray-800 dark:text-white mb-2">
              Reset Password
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              Enter your email to receive a reset link
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border-3 border-slate-200 dark:border-slate-700">
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-800 dark:text-white mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  placeholder="you@example.com"
                  className="w-full bg-gray-50 dark:bg-gray-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-gray-800 dark:text-gray-100 font-medium focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50 transition-all disabled:opacity-50"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-700 rounded-xl flex items-start gap-2">
                  <span className="text-lg">⚠️</span>
                  <p className="text-sm font-bold text-red-700 dark:text-red-300 flex-1">
                    {error}
                  </p>
                </div>
              )}

              {success && (
                <div className="p-3 bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-700 rounded-xl flex items-start gap-2">
                  <span className="text-lg">✅</span>
                  <p className="text-sm font-bold text-green-700 dark:text-green-300 flex-1">
                    {success}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3.5 px-6 rounded-xl font-black text-base shadow-xl transition-all duration-200 ${
                  loading
                    ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    : 'bg-linear-to-r from-slate-600 to-gray-700 text-white hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98]'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⚙️</span> Sending...
                  </span>
                ) : (
                  '📧 Send Reset Link'
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setMode('signin');
                  setError('');
                  setSuccess('');
                }}
                className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline"
              >
                ← Back to sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-slate-950 dark:via-gray-950 dark:to-zinc-950 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {redirectPath && (
          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-700 rounded-xl">
            <p className="text-xs font-bold text-blue-800 dark:text-blue-200 text-center">
              🔒 Please sign in to access this tool
            </p>
          </div>
        )}

        <div className="text-center mb-8">
          <div className={`text-7xl mb-4 ${loading ? 'animate-spin' : 'animate-bounce'}`}>
            {getMascotEmoji()}
          </div>
          <h1 className="text-3xl font-black text-gray-800 dark:text-white mb-2">
            {mode === 'signin' ? 'Welcome Back!' : 'Join Us!'}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            {mode === 'signin' 
              ? 'Sign in to access your toolkit' 
              : 'Create an account to get started'}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border-3 border-slate-200 dark:border-slate-700">
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-xl">
              <button
                onClick={() => {
                  setMode('signin');
                  setError('');
                  setSuccess('');
                  setMagicLinkSent(false);
                }}
                className={`py-2.5 px-4 rounded-lg text-sm font-black transition-all duration-200 ${
                  mode === 'signin'
                    ? 'bg-slate-600 text-white shadow-lg scale-105'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Sign In
              </button>

              <button
                onClick={() => {
                  setMode('signup');
                  setError('');
                  setSuccess('');
                  setMagicLinkSent(false);
                }}
                className={`py-2.5 px-4 rounded-lg text-sm font-black transition-all duration-200 ${
                  mode === 'signup'
                    ? 'bg-slate-600 text-white shadow-lg scale-105'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          {magicLinkSent ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">📧</div>
              <h3 className="text-xl font-black text-gray-800 dark:text-white mb-2">
                Check Your Email!
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                We've sent a magic link to <strong>{email}</strong>
              </p>
              <button
                onClick={() => setMagicLinkSent(false)}
                className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:underline"
              >
                ← Back to sign in
              </button>
            </div>
          ) : (
            <>
              <form onSubmit={handleEmailAuth} className="space-y-4">
                {mode === 'signup' && (
                  <div>
                    <label className="block text-sm font-bold text-gray-800 dark:text-white mb-2">
                      UserName
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required={mode === 'signup'}
                      disabled={loading}
                      placeholder="Enter UserName"
                      className="w-full bg-gray-50 dark:bg-gray-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-gray-800 dark:text-gray-100 font-medium focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50 transition-all disabled:opacity-50"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-sm font-bold text-gray-800 dark:text-white mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    placeholder="you@example.com"
                    className="w-full bg-gray-50 dark:bg-gray-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-gray-800 dark:text-gray-100 font-medium focus:border-slate-500 dark:focus:border-slate-400 focus:ring-4 focus:ring-slate-200 dark:focus:ring-slate-900/50 transition-all disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-800 dark:text-white mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={loading}
                      placeholder="••••••••"
                      className="w-full bg-gray-50 dark:bg-gray-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-gray-800 dark:text-gray-100 font-medium focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/50 dark:focus:ring-blue-400/50 transition-all disabled:opacity-50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xl hover:scale-110 transition-transform"
                    >
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                  {mode === 'signup' && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
                      At least 6 characters
                    </p>
                  )}
                </div>

                {error && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-700 rounded-xl flex items-start gap-2">
                    <span className="text-lg">⚠️</span>
                    <p className="text-sm font-bold text-red-700 dark:text-red-300 flex-1">
                      {error}
                    </p>
                  </div>
                )}

                {success && (
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-700 rounded-xl flex items-start gap-2">
                    <span className="text-lg">✅</span>
                    <p className="text-sm font-bold text-green-700 dark:text-green-300 flex-1">
                      {success}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3.5 px-6 rounded-xl font-black text-base shadow-xl transition-all duration-200 ${
                    loading
                      ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      : 'bg-linear-to-r from-slate-600 to-gray-700 text-white hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98]'
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="animate-spin">⚙️</span> 
                      {mode === 'signin' ? 'Signing in...' : 'Creating account...'}
                    </span>
                  ) : (
                    mode === 'signin' ? '🔑 Sign In' : '🚀 Create Account'
                  )}
                </button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t-2 border-gray-200 dark:border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-bold">
                    OR CONTINUE WITH
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleGoogleAuth}
                  disabled={loading}
                  className="w-full py-3 px-6 rounded-xl font-bold text-sm bg-white dark:bg-gray-900 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </button>

                <button
                  onClick={handleMagicLink}
                  disabled={loading || !email}
                  className="w-full py-3 px-6 rounded-xl font-bold text-sm bg-slate-100 dark:bg-slate-900/50 border-2 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <span className="text-lg">✨</span>
                  Send Magic Link
                </button>
              </div>

              {mode === 'signin' && (
                <div className="mt-4 text-center">
                  <button 
                    onClick={() => {
                      setMode('forgot');
                      setError('');
                      setSuccess('');
                    }}
                    className="text-sm font-bold text-slate-600 dark:text-slate-400 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-6 font-medium">
          {mode === 'signup' ? (
            <>
              By creating an account, you agree to our{' '}
              <a href="/legal/terms" className="font-bold text-blue-600 dark:text-blue-400 hover:underline">Terms of Service</a>
              {' '}and{' '}
              <a href="/legal/privacy" className="font-bold text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</a>
            </>
          ) : (
            <>
              By continuing, you agree to our{' '}
              <a href="/legal/terms" className="font-bold text-blue-600 dark:text-blue-400 hover:underline">Terms</a>
              {' '}and{' '}
              <a href="/legal/privacy" className="font-bold text-blue-600 dark:text-blue-400 hover:underline">Privacy Policy</a>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

// Main page component with Suspense wrapper
export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-slate-950 dark:via-gray-950 dark:to-zinc-950 flex items-center justify-center">
        <div className="text-center">
          <div className="text-7xl mb-4 animate-spin">⚙️</div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">Loading...</p>
        </div>
      </div>
    }>
      <AuthForm />
    </Suspense>
  );
}