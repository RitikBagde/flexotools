'use client';

import React, { useState, type ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';

interface GradeResult {
  score: number;
  strengths: string[];
  weaknesses: string[];
  tips: string[];
}

interface RateLimitInfo {
  remaining: number;
  resetTime: number;
}

export default function ResumeGrader() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GradeResult | null>(null);
  const [error, setError] = useState('');
  const [rateLimitInfo, setRateLimitInfo] = useState<RateLimitInfo | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setError('Please upload a PDF file');
        return;
      }
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }
      setFile(selectedFile);
      setError('');
      setResult(null);
      setToast('📄 Resume uploaded!');
    }
  };

  const removeFile = () => {
    setFile(null);
    setResult(null);
    setError('');
  };

  const gradeResume = async () => {
    if (!file) {
      setError('Please upload a PDF resume first');
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
      
      // Authenticated - proceed with grading
      await processResume();
    } catch (err) {
      console.error('Auth check failed:', err);
      setShowAuthModal(true);
    }
  };

  const processResume = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('file', file!);

      const response = await fetch('/api/tools/resume-grader', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          // Session expired during generation
          setShowAuthModal(true);
          return;
        }
        throw new Error(data.error || 'Failed to grade resume');
      }

      const cleaned: GradeResult = {
        score: data.score,
        strengths: data.strengths ?? [],
        weaknesses: data.weaknesses ?? [],
        tips: data.tips ?? [],
      };

      setResult(cleaned);
      setRateLimitInfo(data.rateLimitInfo ?? null);
      
      // Show celebration for good scores
      if (cleaned.score >= 70) {
        setShowCelebration(true);
      }
      
      setToast('✨ Analysis complete!');
    } catch (err) {
      console.error('Error:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to grade resume. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 65) return 'text-blue-600 dark:text-blue-400';
    if (score >= 50) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700';
    if (score >= 65) return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700';
    if (score >= 50) return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700';
    return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'ATS Friendly';
    if (score >= 65) return 'Good Match';
    if (score >= 50) return 'Needs Work';
    return 'Major Issues';
  };

  const getScoreEmoji = (score: number) => {
    if (score >= 80) return '🎯';
    if (score >= 65) return '👍';
    if (score >= 50) return '📈';
    return '⚠️';
  };

  const getProgressBarColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 65) return 'bg-blue-500';
    if (score >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <>
      {/* SEO Meta Tags - Add to your page.tsx or layout.tsx */}
      {/* 
      <Head>
        <title>Free ATS Resume Checker & Score Tool | Optimize Your Resume for Applicant Tracking Systems</title>
        <meta name="description" content="Free AI-powered ATS resume checker. Get instant feedback on your resume's compatibility with Applicant Tracking Systems. Improve keywords, formatting, and structure to pass ATS scans and land more interviews." />
        <meta name="keywords" content="ATS resume checker, resume scanner, ATS score, resume optimizer, applicant tracking system, resume keywords, job application tool, resume analyzer, free resume checker" />
        <link rel="canonical" href="https://yourwebsite.com/resume-grader" />
        
        <meta property="og:title" content="Free ATS Resume Checker - Optimize Your Resume Score" />
        <meta property="og:description" content="Check if your resume passes ATS scans. Get instant feedback on keywords, formatting, and structure. Free AI-powered analysis." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com/resume-grader" />
        <meta property="og:image" content="https://yourwebsite.com/images/resume-grader-og.jpg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free ATS Resume Checker & Score Tool" />
        <meta name="twitter:description" content="Check if your resume passes ATS scans. Get instant feedback and improve your job applications." />
        <meta name="twitter:image" content="https://yourwebsite.com/images/resume-grader-twitter.jpg" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "ATS Resume Checker",
            "description": "Free AI-powered tool to check and optimize your resume for Applicant Tracking Systems",
            "applicationCategory": "BusinessApplication",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "featureList": "ATS Compatibility Check, Keyword Analysis, Formatting Review, Improvement Tips"
          })}
        </script>
      </Head>
      */}

      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-6 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header - Duolingo style with mascot */}
          <header className="flex items-center justify-between mb-5">
            <div>
              <h1 className="text-3xl font-black text-gray-800 dark:text-white mb-1">
                📝 Resume ATS Scorer
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                Check if your resume passes Applicant Tracking Systems
              </p>
            </div>
            {/* Duolingo-style mascot */}
            <div className="text-7xl animate-bounce hidden sm:block" aria-hidden="true">
              💼
            </div>
          </header>

          {/* Info Badge - Duolingo style */}
          <div className="bg-slate-100 dark:bg-slate-900/30 border-2 border-slate-300 dark:border-slate-700 rounded-xl p-3 mb-4" role="region" aria-label="Features">
            <p className="text-xs text-slate-800 dark:text-slate-200 font-bold">
              ⚡ What we check: <span className="font-extrabold">ATS Compatibility • Keywords • Formatting • Structure • Login Required</span>
            </p>
          </div>

          {/* Upload Card - Duolingo rounded style */}
          <main className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-5 border-3 border-slate-200 dark:border-slate-700 mb-5">
            {!file ? (
              <section aria-labelledby="upload-heading">
                <h2 id="upload-heading" className="block text-base font-black text-gray-800 dark:text-white mb-3">
                  📤 Upload Your Resume
                </h2>
                <div className="border-3 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-8 text-center hover:border-slate-500 dark:hover:border-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/20 transition-all cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="resume-upload"
                    disabled={loading}
                    aria-label="Upload resume PDF file"
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    <div className="w-16 h-16 mx-auto mb-3 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-4xl" aria-hidden="true">
                      📄
                    </div>
                    <p className="text-gray-700 dark:text-gray-200 font-bold mb-1 text-base">
                      Click to upload PDF
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold">
                      Maximum file size: 10MB
                    </p>
                  </label>
                </div>
              </section>
            ) : (
              <section aria-labelledby="ready-heading">
                <h2 id="ready-heading" className="block text-base font-black text-gray-800 dark:text-white mb-3">
                  ✅ Ready to Analyze
                </h2>
                <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-900/30 border-2 border-slate-200 dark:border-slate-700 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-2xl" aria-hidden="true">
                      📄
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 dark:text-white text-sm">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={removeFile}
                    disabled={loading}
                    className="w-10 h-10 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl transition-all disabled:opacity-50 text-xl"
                    aria-label="Remove file"
                  >
                    ❌
                  </button>
                </div>
              </section>
            )}

            {error && (
              <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-700 rounded-xl flex items-start gap-2" role="alert">
                <span className="text-xl" aria-hidden="true">⚠️</span>
                <p className="text-sm font-bold text-red-700 dark:text-red-300">{error}</p>
              </div>
            )}

            {file && (
              <button
                onClick={gradeResume}
                disabled={loading}
                className={`w-full mt-4 py-3.5 px-6 rounded-xl font-black text-base shadow-xl transition-all ${
                  loading
                    ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                    : 'bg-slate-700 hover:bg-slate-800 text-white hover:scale-105 hover:shadow-2xl active:scale-95'
                }`}
                aria-label={loading ? 'Analyzing resume' : 'Check ATS score'}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin text-xl" aria-hidden="true">⚙️</span> Analyzing Resume...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <span className="text-xl" aria-hidden="true">🎯</span> Check ATS Score
                  </span>
                )}
              </button>
            )}
          </main>

          {/* Results - Duolingo card style */}
          {result && (
            <div className="space-y-4">
              {/* Score Card - Large Duolingo style */}
              <section className={`rounded-2xl shadow-xl p-6 border-3 ${getScoreBgColor(result.score)}`} aria-labelledby="score-heading">
                <div className="text-center">
                  <h2 id="score-heading" className="text-sm font-black text-gray-700 dark:text-gray-200 mb-2 uppercase tracking-wide">
                    🎯 ATS Score
                  </h2>
                  <div className={`text-6xl font-black mb-3 ${getScoreColor(result.score)}`} aria-label={`Score: ${result.score} out of 100`}>
                    {result.score}
                    <span className="text-3xl">/100</span>
                  </div>
                  
                  {/* Progress Bar - Duolingo style */}
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-3 overflow-hidden" role="progressbar" aria-valuenow={result.score} aria-valuemin={0} aria-valuemax={100}>
                    <div 
                      className={`h-3 rounded-full transition-all duration-1000 ${getProgressBarColor(result.score)}`}
                      style={{ width: `${result.score}%` }}
                    ></div>
                  </div>

                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${getScoreColor(result.score)} font-black text-sm bg-white dark:bg-gray-800`}>
                    <span className="text-xl" aria-hidden="true">{getScoreEmoji(result.score)}</span>
                    <span>{getScoreLabel(result.score)}</span>
                  </div>
                </div>
              </section>

              {/* Strengths - Duolingo green */}
              {result.strengths.length > 0 && (
                <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-5 border-3 border-green-200 dark:border-green-700" aria-labelledby="strengths-heading">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl" aria-hidden="true">✅</span>
                    <h2 id="strengths-heading" className="text-base font-black text-gray-800 dark:text-white">
                      What's Working
                    </h2>
                  </div>
                  <ul className="space-y-2.5">
                    {result.strengths.map((strength, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl border-2 border-green-200 dark:border-green-700"
                      >
                        <span className="text-green-600 dark:text-green-400 font-black text-base mt-0.5 shrink-0" aria-hidden="true">
                          ✓
                        </span>
                        <span className="text-sm text-gray-700 dark:text-gray-200 font-medium flex-1">
                          {strength}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Weaknesses - Duolingo yellow/red */}
              {result.weaknesses.length > 0 && (
                <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-5 border-3 border-yellow-200 dark:border-yellow-700" aria-labelledby="weaknesses-heading">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl" aria-hidden="true">⚠️</span>
                    <h2 id="weaknesses-heading" className="text-base font-black text-gray-800 dark:text-white">
                      ATS Red Flags
                    </h2>
                  </div>
                  <ul className="space-y-2.5">
                    {result.weaknesses.map((weakness, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border-2 border-yellow-200 dark:border-yellow-700"
                      >
                        <span className="text-yellow-600 dark:text-yellow-400 font-black text-base mt-0.5 shrink-0" aria-hidden="true">
                          !
                        </span>
                        <span className="text-sm text-gray-700 dark:text-gray-200 font-medium flex-1">
                          {weakness}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Tips - Duolingo blue */}
              {result.tips.length > 0 && (
                <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-5 border-3 border-blue-200 dark:border-blue-700" aria-labelledby="tips-heading">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl" aria-hidden="true">💡</span>
                    <h2 id="tips-heading" className="text-base font-black text-gray-800 dark:text-white">
                      How to Improve
                    </h2>
                  </div>
                  <ul className="space-y-2.5">
                    {result.tips.map((tip, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-700"
                      >
                        <span className="flex items-center justify-center w-7 h-7 bg-blue-500 text-white rounded-full text-xs font-black shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-sm text-gray-700 dark:text-gray-200 font-medium flex-1">
                          {tip}
                        </span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {/* Upload Another - Duolingo style button */}
              <button
                onClick={removeFile}
                className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-gray-800 dark:text-gray-200 font-black py-3.5 px-6 rounded-xl transition-all hover:scale-102 shadow-lg border-2 border-slate-200 dark:border-slate-700"
              >
                🔄 Check Another Resume
              </button>
            </div>
          )}

          {/* Footer - Duolingo info style */}
          <footer className="text-center mt-5 space-y-3">
            <p className="text-xs text-gray-600 dark:text-gray-400 font-bold">
              💡 Pro Tip: Use keywords from the job description to improve your ATS score
            </p>
            {rateLimitInfo && (
              <div className="inline-block px-4 py-2 bg-slate-100 dark:bg-slate-900/50 border-2 border-slate-300 dark:border-slate-700 rounded-full">
                <p className="text-xs text-slate-700 dark:text-slate-300 font-black">
                  ⚡ {rateLimitInfo.remaining} check{rateLimitInfo.remaining !== 1 ? 's' : ''} left this hour
                </p>
              </div>
            )}
          </footer>

          {/* Auth Required Modal */}
          {showAuthModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true" aria-labelledby="auth-modal-title">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-md w-full border-3 border-slate-200 dark:border-slate-700">
                <div className="text-center mb-4">
                  <div className="text-6xl mb-3" aria-hidden="true">🔒</div>
                  <h3 id="auth-modal-title" className="text-2xl font-black text-gray-800 dark:text-white mb-2">
                    Login Required
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Please sign in to analyze your resume with our AI-powered ATS checker.
                  </p>
                </div>
                
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      sessionStorage.setItem('auth_redirect', window.location.pathname);
                      router.push('/auth');
                    }}
                    className="w-full py-3 px-6 rounded-xl font-black text-base bg-slate-700 hover:bg-slate-800 text-white hover:scale-105 shadow-xl transition-all"
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

          {/* Celebration - Duolingo style */}
          {showCelebration && (
            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none" aria-live="polite" aria-atomic="true">
              <div className="text-8xl animate-bounce">
                🎉
              </div>
            </div>
          )}

          {/* Toast - Duolingo style */}
          {toast && (
            <div className="fixed bottom-4 right-4 bg-slate-700 dark:bg-slate-200 text-white dark:text-slate-900 px-5 py-3 rounded-xl shadow-2xl font-black text-sm flex items-center gap-2 z-50 animate-bounce" role="status" aria-live="polite">
              {toast}
            </div>
          )}
        </div>
      </div>
    </>
  );
}