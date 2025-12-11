'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  id: string;
  email: string;
  user_metadata: {
    full_name?: string;
    plan?: 'free' | 'pro'; // ⭐ add plan here (stored in Supabase user_metadata)
  };
  created_at: string;
}

type TabId = 'profile';
type SaveStatus = 'idle' | 'saving' | 'saved';

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: 'profile', label: 'Profile', icon: '👤' },
];

export default function SettingsPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<TabId>('profile');

  const [editingName, setEditingName] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [tempName, setTempName] = useState('');
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');

  const [plan, setPlan] = useState<'free' | 'pro'>('free'); // ⭐ track current plan

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/user', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }

      const data = await response.json();

      if (!data.user) {
        // No user -> send to auth, and let them come back to settings
        router.replace('/auth?redirect=/settings');
        return;
      }

      setUser(data.user);
      const name = data.user.user_metadata?.full_name || '';
      setDisplayName(name);
      setTempName(name);

      // ⭐ read plan from user_metadata (default to 'free' if missing)
      const userPlan = (data.user.user_metadata?.plan as 'free' | 'pro') || 'free';
      setPlan(userPlan);
    } catch (error) {
      console.error('Error fetching user:', error);
      router.replace('/auth?redirect=/settings');
    } finally {
      setLoading(false);
    }
  };

  const simulateSave = async (fn: () => void) => {
    // Small helper to centralize "saving" state logic
    setSaveStatus('saving');
    try {
      // ⚠️ TODO: Replace this with a real API call when ready
      // Example:
      // await fetch('/api/user/preferences', { ... });

      fn();

      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (err) {
      console.error('Error saving changes:', err);
      setSaveStatus('idle');
      // You can add toast/error UI here if you want
    }
  };

  const handleSaveDisplayName = async () => {
    if (!tempName.trim() || !user) return;

    await simulateSave(() => {
      // ⚠️ TODO: Replace with real profile update (Supabase / API)
      // e.g., await supabase.auth.updateUser({ data: { full_name: tempName } });
      setDisplayName(tempName);
      setUser((prev) =>
        prev ? { ...prev, user_metadata: { ...prev.user_metadata, full_name: tempName } } : prev
      );
      setEditingName(false);
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-slate-950 dark:via-gray-950 dark:to-zinc-950 flex items-center justify-center">
        <div className="text-6xl animate-spin">⚙️</div>
      </div>
    );
  }

  if (!user) {
    // Fallback if user is somehow still null
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <p className="text-sm font-semibold">Redirecting to sign in…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-slate-950 dark:via-gray-950 dark:to-zinc-950">
      {/* Header */}
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="text-sm font-semibold text-gray-900 dark:text-white"
              >
                Settings
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2">
            Account Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            Manage your account preferences and settings
          </p>
        </div>

        {/* Tabs Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg border-2 border-gray-200 dark:border-gray-800 overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200 dark:border-gray-800">
            <div className="flex overflow-x-auto">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-bold text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'text-gray-900 dark:text-white border-b-2 border-gray-900 dark:border-white'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <span className="text-xl">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-black text-gray-900 dark:text-white mb-4">
                    Profile Information
                  </h2>

                  {/* Display Name */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-bold text-gray-500 dark:text-gray-400">
                        DISPLAY NAME
                      </p>
                      {!editingName && (
                        <button
                          onClick={() => setEditingName(true)}
                          className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          Edit
                        </button>
                      )}
                    </div>
                    {editingName ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={tempName}
                          onChange={(e) => setTempName(e.target.value)}
                          className="flex-1 px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-semibold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
                          placeholder="Enter your name"
                          disabled={saveStatus === 'saving'}
                        />
                        <button
                          onClick={handleSaveDisplayName}
                          disabled={saveStatus === 'saving'}
                          className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg text-sm font-bold hover:opacity-80 transition-opacity disabled:opacity-60"
                        >
                          {saveStatus === 'saving' ? 'Saving…' : 'Save'}
                        </button>
                        <button
                          onClick={() => {
                            setEditingName(false);
                            setTempName(displayName);
                          }}
                          disabled={saveStatus === 'saving'}
                          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg text-sm font-bold hover:opacity-80 transition-opacity disabled:opacity-60"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {displayName || 'Not set'}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl mb-4">
                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-2">
                      EMAIL ADDRESS
                    </p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {user.email}
                    </p>
                  </div>

                  {/* Member Since */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl mb-4">
                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-2">
                      MEMBER SINCE
                    </p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {user.created_at
                        ? new Date(user.created_at).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })
                        : 'N/A'}
                    </p>
                  </div>

                  {/* Account Plan */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-bold text-gray-500 dark:text-gray-400">
                        CURRENT PLAN
                      </p>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          plan === 'pro'
                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200'
                            : 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                        }`}
                      >
                        {plan === 'pro' ? 'Pro' : 'Active'}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      {plan === 'pro' ? 'Pro Plan' : 'Free Plan'}
                    </p>

                    {plan === 'free' && (
                      <button
                        onClick={() => router.push('/pricing')}
                        className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Upgrade to Pro →
                      </button>
                    )}
                    {/* ⭐ When plan is pro, we simply hide the upgrade button */}
                  </div>

                  {/* 🔗 Tools Shortcuts */}
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-xs font-bold text-gray-500 dark:text-gray-400">
                        TOOLS SHORTCUTS
                      </p>
                      <p className="text-[11px] font-semibold text-gray-500 dark:text-gray-400">
                        Jump quickly into a tool
                      </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <Link
                        href="/tools/text-summarizer"
                        className="flex items-center justify-between px-3 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <span>📝</span>
                          <span>Text Summarizer</span>
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Open →</span>
                      </Link>

                      <Link
                        href="/tools/pdf-text"
                        className="flex items-center justify-between px-3 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <span>📄</span>
                          <span>PDF Text Extractor</span>
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Open →</span>
                      </Link>

                      <Link
                        href="/tools/image-compressor"
                        className="flex items-center justify-between px-3 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <span>🖼️</span>
                          <span>Image Compressor</span>
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Open →</span>
                      </Link>

                      <Link
                        href="/tools/qr-generator"
                        className="flex items-center justify-between px-3 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <span>📱</span>
                          <span>QR / Barcode Generator</span>
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Open →</span>
                      </Link>

                      <Link
                        href="/tools/resume-grader"
                        className="flex items-center justify-between px-3 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <span className="flex items-center gap-2">
                          <span>📊</span>
                          <span>Resume Grader</span>
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">Open →</span>
                      </Link>
                    </div>
                  </div>
                </div>

                {saveStatus === 'saved' && (
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl">
                    <p className="text-sm font-bold text-green-800 dark:text-green-200">
                      ✓ Changes saved successfully
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
