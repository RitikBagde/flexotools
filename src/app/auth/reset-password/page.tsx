'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [supabase] = useState(() =>
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  );

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      try {
        // Simple session check
        const { data: { session } } = await supabase.auth.getSession();
        
        console.log('Session check:', session ? 'Found' : 'Not found');
        
        if (mounted) {
          if (session) {
            setIsAuthenticated(true);
          } else {
            setError('Invalid or expired reset link. Please request a new one.');
            setIsAuthenticated(false);
          }
        }
      } catch (err) {
        console.error('Auth check error:', err);
        if (mounted) {
          setError('Failed to validate reset link');
          setIsAuthenticated(false);
        }
      } finally {
        if (mounted) {
          setCheckingAuth(false);
        }
      }
    };

    // Wait a bit for Supabase to process URL hash
    const timer = setTimeout(checkAuth, 1000);

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password: password,
      });

      if (updateError) {
        throw new Error(updateError.message);
      }

      setSuccess(true);
      
      // Sign out and redirect
      await supabase.auth.signOut();
      
      setTimeout(() => {
        router.push('/auth?mode=signin');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-slate-950 dark:via-gray-950 dark:to-zinc-950 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center">
          <div className="text-7xl mb-4 animate-spin">⚙️</div>
          <h1 className="text-3xl font-black text-gray-800 dark:text-white mb-2">
            Validating...
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Please wait while we verify your reset link
          </p>
        </div>
      </div>
    );
  }

  // Invalid token state
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-slate-950 dark:via-gray-950 dark:to-zinc-950 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center">
          <div className="text-7xl mb-4">⚠️</div>
          <h1 className="text-3xl font-black text-gray-800 dark:text-white mb-2">
            Invalid Reset Link
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {error || 'This reset link is invalid or has expired. Please request a new one.'}
          </p>
          <div className="space-y-3">
            <button
              onClick={() => router.push('/auth?mode=forgot')}
              className="w-full px-8 py-3 bg-linear-to-r from-slate-600 to-gray-700 text-white rounded-xl font-bold hover:scale-105 transition-all"
            >
              Request New Reset Link
            </button>
            <button
              onClick={() => router.push('/auth')}
              className="w-full px-8 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-xl font-bold hover:scale-105 transition-all"
            >
              Back to Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  if (success) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-slate-950 dark:via-gray-950 dark:to-zinc-950 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full text-center">
          <div className="text-7xl mb-4 animate-bounce">✅</div>
          <h1 className="text-3xl font-black text-gray-800 dark:text-white mb-2">
            Password Reset!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Your password has been successfully reset. Redirecting to sign in...
          </p>
        </div>
      </div>
    );
  }

  // Reset password form
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-slate-950 dark:via-gray-950 dark:to-zinc-950 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="text-7xl mb-4 animate-bounce">🔐</div>
          <h1 className="text-3xl font-black text-gray-800 dark:text-white mb-2">
            Reset Your Password
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            Enter your new password below
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border-3 border-slate-200 dark:border-slate-700">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-800 dark:text-white mb-2">
                New Password
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
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
                At least 6 characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-800 dark:text-white mb-2">
                Confirm Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
                placeholder="••••••••"
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
                  <span className="animate-spin">⚙️</span> Resetting Password...
                </span>
              ) : (
                '🔐 Reset Password'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => router.push('/auth')}
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