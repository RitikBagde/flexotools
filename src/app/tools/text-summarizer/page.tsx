"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

type ActionMode = 'title' | 'summarize' | 'bullets';
type OutputLength = 'short' | 'medium' | 'long';

export default function TextSummarizerPage() {
  const router = useRouter();
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [title, setTitle] = useState("");
  const [bullets, setBullets] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rateLimitInfo, setRateLimitInfo] = useState<{ message: string; resetIn: number } | null>(null);
  const [stats, setStats] = useState<{ originalLength?: number; summaryLength?: number } | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  const [actionMode, setActionMode] = useState<ActionMode>('summarize');
  const [outputLength, setOutputLength] = useState<OutputLength>('medium');

  // Auto-hide toast
  React.useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(id);
  }, [toast]);

  // Celebration animation
  React.useEffect(() => {
    if (!showCelebration) return;
    const id = setTimeout(() => setShowCelebration(false), 2000);
    return () => clearTimeout(id);
  }, [showCelebration]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setInputText(text);
      setToast('📄 File uploaded successfully!');
    };
    reader.readAsText(file);
  };

  const checkAuthAndProcess = async () => {
    if (!inputText.trim()) {
      setError("Please enter some text first.");
      return;
    }

    // Check if user is authenticated
    try {
      const authCheck = await fetch('/api/auth/check');
      const authData = await authCheck.json();
      
      if (!authCheck.ok || !authData.authenticated) {
        // Not authenticated - show modal
        setShowAuthModal(true);
        return;
      }
      
      // Authenticated - proceed with generation
      await handleProcess();
    } catch (err) {
      console.error('Auth check failed:', err);
      setShowAuthModal(true);
    }
  };

  const handleProcess = async () => {
    setError(null);
    setRateLimitInfo(null);
    setLoading(true);
    setSummary("");
    setTitle("");
    setBullets([]);

    try {
      const res = await fetch("/api/tools/text-summarizer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          text: inputText, 
          action: actionMode,
          length: outputLength 
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        if (res.status === 429 && result.resetIn) {
          setRateLimitInfo({
            message: result.message || "Rate limit exceeded",
            resetIn: result.resetIn
          });
        } else if (res.status === 401) {
          // Session expired during generation
          setShowAuthModal(true);
        } else {
          setError(result.error || "Failed to process text.");
        }
        return;
      }

      if (result.success && result.data) {
        if (result.data.summary) {
          setSummary(result.data.summary);
        }
        if (result.data.title) {
          setTitle(result.data.title);
        }
        if (result.data.bullets) {
          setBullets(result.data.bullets);
        }
        if (result.data.originalLength) {
          setStats({
            originalLength: result.data.originalLength,
            summaryLength: result.data.summaryLength,
          });
        }
        
        setShowCelebration(true);
        setToast('✨ Generated successfully!');
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setToast(`📋 ${type} copied to clipboard!`);
      },
      () => {
        setError("Failed to copy to clipboard.");
      }
    );
  };

  const handleClear = () => {
    setInputText("");
    setSummary("");
    setTitle("");
    setBullets([]);
    setError(null);
    setStats(null);
    setRateLimitInfo(null);
    setToast('🗑️ All cleared!');
  };

  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;

  return (
    <div className="min-h-screen bg-linear-to-br from-lime-50 via-green-50 to-emerald-50 dark:from-lime-950/20 dark:via-green-950/20 dark:to-emerald-950/20 py-6 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header with Mascot */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-3xl font-black text-gray-800 dark:text-white mb-1">
              ✍️ Text Summarizer
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Transform long text into magic!
            </p>
          </div>
          {/* Cute Mascot */}
          <div className="text-7xl animate-bounce hidden sm:block">
            📝
          </div>
        </div>

        {/* Info Badge */}
        <div className="bg-lime-100 dark:bg-lime-900/30 border-2 border-lime-300 dark:border-lime-700 rounded-xl p-3 mb-4">
          <p className="text-xs text-lime-800 dark:text-lime-200 font-semibold">
            ⚡ Features: <span className="font-bold">5 requests/3 hours • AI Summaries • Titles • Bullet Points • Login Required</span>
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-5 border-3 border-lime-200 dark:border-lime-700">
          
          {/* Input Text Area */}
          <div className="mb-4">
            <label className="block text-base font-bold text-gray-800 dark:text-white mb-2">
              📝 Input Text
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your article, essay, or any text here..."
              className="w-full h-48 text-sm bg-gray-50 dark:bg-gray-900 border-2 border-lime-200 dark:border-lime-700 rounded-xl p-4 text-gray-800 dark:text-gray-100 resize-y focus:border-lime-500 dark:focus:border-lime-400 focus:ring-4 focus:ring-lime-200 dark:focus:ring-lime-900/50 transition-all"
            />
            <div className="flex justify-between items-center mt-2 flex-wrap gap-2">
              <div className="flex gap-3 text-xs font-semibold">
                <span className="px-2 py-1 bg-lime-100 dark:bg-lime-900/30 rounded-full text-lime-700 dark:text-lime-300">
                  📊 {inputText.length.toLocaleString()} chars
                </span>
                <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded-full text-green-700 dark:text-green-300">
                  📖 {wordCount} words
                </span>
              </div>
              <div className="flex gap-2">
                <label className="text-xs font-bold px-3 py-1.5 bg-lime-500 hover:bg-lime-600 text-white rounded-full cursor-pointer transition-all hover:scale-105 shadow-md">
                  📄 Upload
                  <input
                    type="file"
                    accept=".txt"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                {inputText && (
                  <button
                    onClick={handleClear}
                    className="text-xs font-bold px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full transition-all hover:scale-105 shadow-md"
                  >
                    🗑️ Clear
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Mode Selection */}
          <div className="mb-4">
            <label className="block text-base font-bold text-gray-800 dark:text-white mb-2">
              🎯 Choose Mode
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <button
                onClick={() => setActionMode('summarize')}
                className={`p-3 rounded-xl border-2 font-bold text-left transition-all ${
                  actionMode === 'summarize'
                    ? 'bg-lime-500 text-white border-lime-600 shadow-lg scale-105'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:scale-105'
                }`}
              >
                <div className="text-xl mb-1">📝</div>
                <div className="text-sm">Summary</div>
              </button>
              
              <button
                onClick={() => setActionMode('title')}
                className={`p-3 rounded-xl border-2 font-bold text-left transition-all ${
                  actionMode === 'title'
                    ? 'bg-lime-500 text-white border-lime-600 shadow-lg scale-105'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:scale-105'
                }`}
              >
                <div className="text-xl mb-1">✨</div>
                <div className="text-sm">Title</div>
              </button>
              
              <button
                onClick={() => setActionMode('bullets')}
                className={`p-3 rounded-xl border-2 font-bold text-left transition-all ${
                  actionMode === 'bullets'
                    ? 'bg-lime-500 text-white border-lime-600 shadow-lg scale-105'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:scale-105'
                }`}
              >
                <div className="text-xl mb-1">•</div>
                <div className="text-sm">Bullets</div>
              </button>
            </div>
          </div>

          {/* Output Length (only for summarize) */}
          {actionMode === "summarize" && (
            <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border-2 border-green-200 dark:border-green-700">
              <label className="block text-sm font-bold text-gray-800 dark:text-white mb-2">
                📏 Output Length
              </label>
              <select
                value={outputLength}
                onChange={(e) => setOutputLength(e.target.value as OutputLength)}
                className="w-full px-3 py-2 rounded-lg border-2 border-green-300 dark:border-green-600 bg-white dark:bg-gray-700 text-sm text-gray-800 dark:text-white font-semibold focus:border-green-500 dark:focus:border-green-400 focus:ring-2 focus:ring-green-200 dark:focus:ring-green-900/50 transition-all"
              >
                <option value="short">🐁 Short (Concise)</option>
                <option value="medium">🐱 Medium (Balanced)</option>
                <option value="long">🦁 Long (Detailed)</option>
              </select>
            </div>
          )}

          {/* Generate Button */}
          <button
            onClick={checkAuthAndProcess}
            disabled={loading || !inputText.trim()}
            className={`w-full py-3 px-6 rounded-xl font-black text-base shadow-2xl transition-all mb-4 ${
              loading || !inputText.trim()
                ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                : 'bg-linear-to-r from-lime-500 to-green-500 text-white hover:scale-105 hover:shadow-lime-500/50 active:scale-95'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-spin">⚙️</span> Processing Magic...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <span>🚀</span> Generate
              </span>
            )}
          </button>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-700 rounded-xl flex items-start gap-2">
              <span className="text-lg">❌</span>
              <p className="text-sm font-semibold text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}

          {/* Rate Limit Info */}
          {rateLimitInfo && (
            <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-700 rounded-xl flex items-start gap-2">
              <span className="text-lg">⏱️</span>
              <div>
                <p className="text-sm font-black text-amber-800 dark:text-amber-200">Rate Limit Reached</p>
                <p className="text-xs text-amber-700 dark:text-amber-300 mt-1">{rateLimitInfo.message}</p>
                <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">We limit requests to 5 every 3 hours to protect our free service.</p>
              </div>
            </div>
          )}

          {/* Generated Title */}
          {title && (
            <div className="mb-4 p-4 bg-linear-to-br from-lime-50 to-green-50 dark:from-lime-900/20 dark:to-green-900/20 border-2 border-lime-200 dark:border-lime-700 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-base font-black text-gray-800 dark:text-white flex items-center gap-2">
                  <span>✨</span> Generated Title
                </h2>
                <button
                  onClick={() => handleCopy(title, "Title")}
                  className="text-xs font-bold px-3 py-1.5 rounded-full border-2 border-lime-300 dark:border-lime-600 hover:bg-lime-100 dark:hover:bg-lime-800 text-lime-700 dark:text-lime-300 transition-all hover:scale-105"
                >
                  📋 Copy
                </button>
              </div>
              <p className="text-gray-800 dark:text-white text-lg font-semibold leading-relaxed">{title}</p>
            </div>
          )}

          {/* Summary */}
          {summary && (
            <div className="mb-4 p-4 bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-700 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-base font-black text-gray-800 dark:text-white flex items-center gap-2">
                  <span>📝</span> Summary
                </h2>
                <button
                  onClick={() => handleCopy(summary, "Summary")}
                  className="text-xs font-bold px-3 py-1.5 rounded-full border-2 border-green-300 dark:border-green-600 hover:bg-green-100 dark:hover:bg-green-800 text-green-700 dark:text-green-300 transition-all hover:scale-105"
                >
                  📋 Copy
                </button>
              </div>
              <p className="text-gray-800 dark:text-white leading-relaxed text-sm">{summary}</p>
              {stats && stats.originalLength && stats.summaryLength && (
                <div className="mt-3 pt-3 border-t-2 border-green-200 dark:border-green-700">
                  <p className="text-xs font-bold text-green-700 dark:text-green-300">
                    📊 Reduced from {stats.originalLength.toLocaleString()} to {stats.summaryLength.toLocaleString()} characters
                    ({Math.round(((stats.originalLength - stats.summaryLength) / stats.originalLength) * 100)}% smaller!)
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Bullet Points */}
          {bullets.length > 0 && (
            <div className="mb-4 p-4 bg-linear-to-br from-emerald-50 to-lime-50 dark:from-emerald-900/20 dark:to-lime-900/20 border-2 border-emerald-200 dark:border-emerald-700 rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-black text-gray-800 dark:text-white flex items-center gap-2">
                  <span>•</span> Bullet Points
                </h2>
                <button
                  onClick={() => handleCopy(bullets.join('\n'), "Bullet Points")}
                  className="text-xs font-bold px-3 py-1.5 rounded-full border-2 border-emerald-300 dark:border-emerald-600 hover:bg-emerald-100 dark:hover:bg-emerald-800 text-emerald-700 dark:text-emerald-300 transition-all hover:scale-105"
                >
                  📋 Copy
                </button>
              </div>
              <ul className="space-y-2">
                {bullets.map((bullet, index) => (
                  <li key={index} className="flex items-start gap-2 p-2 bg-white dark:bg-gray-900 rounded-lg">
                    <span className="text-lime-600 dark:text-lime-400 font-black mt-0.5">•</span>
                    <span className="text-sm text-gray-800 dark:text-white flex-1">{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Auth Required Modal */}
        {showAuthModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-md w-full border-3 border-lime-200 dark:border-lime-700">
              <div className="text-center mb-4">
                <div className="text-6xl mb-3">🔒</div>
                <h3 className="text-2xl font-black text-gray-800 dark:text-white mb-2">
                  Login Required
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Please sign in to generate summaries, titles, and bullet points with AI.
                </p>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => {
                    sessionStorage.setItem('auth_redirect', window.location.pathname);
                    router.push('/auth');
                  }}
                  className="w-full py-3 px-6 rounded-xl font-black text-base bg-linear-to-r from-lime-500 to-green-500 text-white hover:scale-105 shadow-xl transition-all"
                >
                  🚀 Sign In / Sign Up
                </button>
                
                <button
                  onClick={() => setShowAuthModal(false)}
                  className="w-full py-3 px-6 rounded-xl font-bold text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Celebration Modal */}
        {showCelebration && (
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div className="text-6xl animate-bounce">
              🎉
            </div>
          </div>
        )}

        {/* Toast Notification */}
        {toast && (
          <div className="fixed bottom-4 right-4 bg-lime-500 text-white px-4 py-3 rounded-xl shadow-2xl font-bold text-sm flex items-center gap-2 animate-bounce z-50">
            {toast}
          </div>
        )}
      </div>
    </div>
  );
}