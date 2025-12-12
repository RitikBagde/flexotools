"use client";

import React, { useState, type ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { generateFAQSchema, type FAQItem } from "@/lib/seo";
import { HelpCircle,BarChart3, Lock, Brain, Target, AlertTriangle, BadgeDollarSign } from "lucide-react";

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
  const [error, setError] = useState("");
  const [rateLimitInfo, setRateLimitInfo] = useState<RateLimitInfo | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // ✅ FAQ data for UI + schema
  const faqs: FAQItem[] = [
    {
      question: "What's a good ATS score?",
      answer:
        "80+ is excellent and ATS-friendly. 65-79 is good but could use improvements. 50-64 needs significant work. Below 50 indicates major ATS compatibility issues.",
    },
    {
      question: "Do I need to create an account?",
      answer:
        "Yes, a free account is required to use the ATS checker. This helps prevent abuse and enables rate limiting. Your resume data is kept secure.",
    },
    {
      question: "What does the ATS checker analyze?",
      answer:
        "We analyze keyword density, section organization, contact information formatting, dates, bullet point usage, file compatibility, resume length, and general ATS-readability.",
    },
    {
      question: "Should I tailor my resume for each job?",
      answer:
        "Yes — customize your resume by adding keywords from the job description. Use the ATS checker to validate your tailored resume before applying.",
    },
    {
      question: "What are common ATS mistakes?",
      answer:
        "Using tables/text boxes, putting critical info in headers/footers, unusual section titles, special characters, embedded images, and missing relevant keywords are common problems.",
    },
    {
      question: "Is this tool free?",
      answer:
        "Yes — create a free account and check your resume. There may be hourly rate limits to ensure fair access for everyone.",
    },
  ];

  const faqSchema = generateFAQSchema(faqs);

  // Auto-hide toast
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(id);
  }, [toast]);

  // Celebration auto-hide
  useEffect(() => {
    if (!showCelebration) return;
    const id = setTimeout(() => setShowCelebration(false), 2000);
    return () => clearTimeout(id);
  }, [showCelebration]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] ?? null;
    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf" && !/\.pdf$/i.test(selectedFile.name)) {
      setError("Please upload a PDF file");
      return;
    }
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB");
      return;
    }

    setFile(selectedFile);
    setError("");
    setResult(null);
    setToast("📄 Resume uploaded!");
  };

  const removeFile = () => {
    setFile(null);
    setResult(null);
    setError("");
  };

  // Robust fetch helper (parses JSON error or text)
  async function parseErrorResponse(res: Response) {
    let msg = `HTTP ${res.status} ${res.statusText}`;
    try {
      const contentType = res.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const data = await res.json();
        if (data?.error) msg = data.error;
        else if (data?.message) msg = data.message;
        else msg = JSON.stringify(data);
      } else {
        const text = await res.text();
        if (text) msg = text;
      }
    } catch (e) {
      console.error("error reading error body", e);
    }
    return msg;
  }

  // Check auth then call processResume
  const gradeResume = async () => {
    if (!file) {
      setError("Please upload a PDF resume first");
      return;
    }

    setError("");
    try {
      const authRes = await fetch("/api/auth/check", { method: "GET" });
      if (!authRes.ok) {
        const errMsg = await parseErrorResponse(authRes);
        console.warn("Auth check failed:", errMsg);
        setShowAuthModal(true);
        return;
      }
      const authData = await authRes.json();
      if (!authData?.authenticated) {
        setShowAuthModal(true);
        return;
      }

      await processResume();
    } catch (err) {
      console.error("Auth check error:", err);
      setShowAuthModal(true);
    }
  };

  const processResume = async () => {
    if (!file) {
      setError("Please upload a PDF resume first");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/tools/resume-grader", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errMsg = await parseErrorResponse(res);
        // special-case unauthorized/session-expired
        if (res.status === 401) {
          setShowAuthModal(true);
          return;
        }
        throw new Error(errMsg);
      }

      const data = await res.json();

      // Expect API to return { score, strengths, weaknesses, tips, rateLimitInfo? }
      const cleaned: GradeResult = {
        score: Number(data.score ?? 0),
        strengths: Array.isArray(data.strengths) ? data.strengths : [],
        weaknesses: Array.isArray(data.weaknesses) ? data.weaknesses : [],
        tips: Array.isArray(data.tips) ? data.tips : [],
      };

      setResult(cleaned);
      setRateLimitInfo((data.rateLimitInfo as RateLimitInfo) ?? null);

      if (cleaned.score >= 70) {
        setShowCelebration(true);
      }

      setToast("✨ Analysis complete!");
    } catch (err: any) {
      console.error("Process resume error:", err);
      setError(err?.message ?? "Failed to grade resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600 dark:text-green-400";
    if (score >= 65) return "text-blue-600 dark:text-blue-400";
    if (score >= 50) return "text-yellow-600 dark:text-yellow-400";
    return "text-red-600 dark:text-red-400";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700";
    if (score >= 65) return "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700";
    if (score >= 50) return "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-700";
    return "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "ATS Friendly";
    if (score >= 65) return "Good Match";
    if (score >= 50) return "Needs Work";
    return "Major Issues";
  };

  const getScoreEmoji = (score: number) => {
    if (score >= 80) return "🎯";
    if (score >= 65) return "👍";
    if (score >= 50) return "📈";
    return "⚠️";
  };

  const getProgressBarColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 65) return "bg-blue-500";
    if (score >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <>
      {/* ✅ ADD FAQ SCHEMA */}
      {faqSchema && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-6 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <header className="flex items-center justify-between mb-5">
            <div>
              <h1 className="text-3xl font-black text-gray-800 dark:text-white mb-1">📝 Resume ATS Scorer</h1>
              <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                Check if your resume passes Applicant Tracking Systems
              </p>
            </div>
            <div className="text-7xl animate-bounce hidden sm:block" aria-hidden="true">💼</div>
          </header>

          {/* Info Badge */}
          <div className="bg-slate-100 dark:bg-slate-900/30 border-2 border-slate-300 dark:border-slate-700 rounded-xl p-3 mb-4" role="region" aria-label="Features">
            <p className="text-xs text-slate-800 dark:text-slate-200 font-bold">
              ⚡ What we check: <span className="font-extrabold">ATS Compatibility • Keywords • Formatting • Structure • Login Required</span>
            </p>
          </div>

          {/* Upload Card */}
          <main className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-5 border-3 border-slate-200 dark:border-slate-700 mb-5">
            {!file ? (
              <section aria-labelledby="upload-heading">
                <h2 id="upload-heading" className="block text-base font-black text-gray-800 dark:text-white mb-3">📤 Upload Your Resume</h2>
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
                    <div className="w-16 h-16 mx-auto mb-3 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-4xl" aria-hidden="true">📄</div>
                    <p className="text-gray-700 dark:text-gray-200 font-bold mb-1 text-base">Click to upload PDF</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold">Maximum file size: 10MB</p>
                  </label>
                </div>
              </section>
            ) : (
              <section aria-labelledby="ready-heading">
                <h2 id="ready-heading" className="block text-base font-black text-gray-800 dark:text-white mb-3">✅ Ready to Analyze</h2>
                <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-900/30 border-2 border-slate-200 dark:border-slate-700 rounded-xl p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-2xl" aria-hidden="true">📄</div>
                    <div>
                      <p className="font-bold text-gray-800 dark:text-white text-sm">{file.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold">{(file.size / 1024).toFixed(1)} KB</p>
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
                className={`w-full mt-4 py-3.5 px-6 rounded-xl font-black text-base shadow-xl transition-all ${loading ? "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed" : "bg-slate-700 hover:bg-slate-800 text-white hover:scale-105 hover:shadow-2xl active:scale-95"}`}
                aria-label={loading ? "Analyzing resume" : "Check ATS score"}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2"><span className="animate-spin text-xl" aria-hidden="true">⚙️</span> Analyzing Resume...</span>
                ) : (
                  <span className="flex items-center justify-center gap-2"><span className="text-xl" aria-hidden="true">🎯</span> Check ATS Score</span>
                )}
              </button>
            )}
          </main>

          {/* Results */}
          {result && (
            <div className="space-y-4">
              <section className={`rounded-2xl shadow-xl p-6 border-3 ${getScoreBgColor(result.score)}`} aria-labelledby="score-heading">
                <div className="text-center">
                  <h2 id="score-heading" className="text-sm font-black text-gray-700 dark:text-gray-200 mb-2 uppercase tracking-wide">🎯 ATS Score</h2>
                  <div className={`text-6xl font-black mb-3 ${getScoreColor(result.score)}`} aria-label={`Score: ${result.score} out of 100`}>
                    {result.score}<span className="text-3xl">/100</span>
                  </div>

                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-3 overflow-hidden" role="progressbar" aria-valuenow={result.score} aria-valuemin={0} aria-valuemax={100}>
                    <div className={`h-3 rounded-full transition-all duration-1000 ${getProgressBarColor(result.score)}`} style={{ width: `${result.score}%` }} />
                  </div>

                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${getScoreColor(result.score)} font-black text-sm bg-white dark:bg-gray-800`}>
                    <span className="text-xl" aria-hidden="true">{getScoreEmoji(result.score)}</span><span>{getScoreLabel(result.score)}</span>
                  </div>
                </div>
              </section>

              {result.strengths.length > 0 && (
                <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-5 border-3 border-green-200 dark:border-green-700" aria-labelledby="strengths-heading">
                  <div className="flex items-center gap-2 mb-3"><span className="text-2xl" aria-hidden="true">✅</span><h2 id="strengths-heading" className="text-base font-black text-gray-800 dark:text-white">What's Working</h2></div>
                  <ul className="space-y-2.5">
                    {result.strengths.map((s, i) => (
                      <li key={i} className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl border-2 border-green-200 dark:border-green-700">
                        <span className="text-green-600 dark:text-green-400 font-black text-base mt-0.5">✓</span>
                        <span className="text-sm text-gray-700 dark:text-gray-200 font-medium flex-1">{s}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {result.weaknesses.length > 0 && (
                <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-5 border-3 border-yellow-200 dark:border-yellow-700" aria-labelledby="weaknesses-heading">
                  <div className="flex items-center gap-2 mb-3"><span className="text-2xl" aria-hidden="true">⚠️</span><h2 id="weaknesses-heading" className="text-base font-black text-gray-800 dark:text-white">ATS Red Flags</h2></div>
                  <ul className="space-y-2.5">
                    {result.weaknesses.map((w, i) => (
                      <li key={i} className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border-2 border-yellow-200 dark:border-yellow-700">
                        <span className="text-yellow-600 dark:text-yellow-400 font-black text-base mt-0.5">!</span>
                        <span className="text-sm text-gray-700 dark:text-gray-200 font-medium flex-1">{w}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {result.tips.length > 0 && (
                <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-5 border-3 border-blue-200 dark:border-blue-700" aria-labelledby="tips-heading">
                  <div className="flex items-center gap-2 mb-3"><span className="text-2xl" aria-hidden="true">💡</span><h2 id="tips-heading" className="text-base font-black text-gray-800 dark:text-white">How to Improve</h2></div>
                  <ul className="space-y-2.5">
                    {result.tips.map((t, i) => (
                      <li key={i} className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-700">
                        <span className="flex items-center justify-center w-7 h-7 bg-blue-500 text-white rounded-full text-xs font-black shrink-0">{i + 1}</span>
                        <span className="text-sm text-gray-700 dark:text-gray-200 font-medium flex-1">{t}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <button onClick={removeFile} className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-gray-800 dark:text-gray-200 font-black py-3.5 px-6 rounded-xl transition-all hover:scale-102 shadow-lg border-2 border-slate-200 dark:border-slate-700">🔄 Check Another Resume</button>
            </div>
          )}

          {/* Footer */}
          <footer className="text-center mt-5 space-y-3">
            <p className="text-xs text-gray-600 dark:text-gray-400 font-bold">💡 Pro Tip: Use keywords from the job description to improve your ATS score</p>
            {rateLimitInfo && (
              <div className="inline-block px-4 py-2 bg-slate-100 dark:bg-slate-900/50 border-2 border-slate-300 dark:border-slate-700 rounded-full">
                <p className="text-xs text-slate-700 dark:text-slate-300 font-black">⚡ {rateLimitInfo.remaining} check{rateLimitInfo.remaining !== 1 ? "s" : ""} left this hour</p>
              </div>
            )}
          </footer>

          {/* Auth Modal */}
          {showAuthModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true" aria-labelledby="auth-modal-title">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-md w-full border-3 border-slate-200 dark:border-slate-700">
                <div className="text-center mb-4">
                  <div className="text-6xl mb-3" aria-hidden="true">🔒</div>
                  <h3 id="auth-modal-title" className="text-2xl font-black text-gray-800 dark:text-white mb-2">Login Required</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Please sign in to analyze your resume with our AI-powered ATS checker.</p>
                </div>

                <div className="space-y-3">
                  <button onClick={() => { sessionStorage.setItem("auth_redirect", window.location.pathname); router.push("/auth"); }} className="w-full py-3 px-6 rounded-xl font-black text-base bg-slate-700 hover:bg-slate-800 text-white hover:scale-105 shadow-xl transition-all">🚀 Sign In / Sign Up</button>
                  <button onClick={() => setShowAuthModal(false)} className="w-full py-3 px-6 rounded-xl font-bold text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all">Cancel</button>
                </div>
              </div>
            </div>
          )}

          {/* Celebration */}
          {showCelebration && (
            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none" aria-live="polite" aria-atomic="true">
              <div className="text-8xl animate-bounce">🎉</div>
            </div>
          )}

          {/* Toast */}
          {toast && (
            <div className="fixed bottom-4 right-4 bg-slate-700 dark:bg-slate-200 text-white dark:text-slate-900 px-5 py-3 rounded-xl shadow-2xl font-black text-sm flex items-center gap-2 z-50 animate-bounce" role="status" aria-live="polite">
              {toast}
            </div>
          )}

          {/* SEO Content Section */}
          <section className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border-2 border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Free ATS Resume Checker - Optimize Your Resume Score</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>Our free AI-powered ATS resume checker helps you optimize your resume for Applicant Tracking Systems.</p>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mt-6 mb-3">Key Features</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>AI-powered analysis:</strong> Advanced algorithms check your resume against ATS best practices</li>
                <li><strong>Instant scoring:</strong> Get your ATS compatibility score (0-100) in seconds</li>
                <li><strong>Keyword optimization:</strong> Identify missing or weak keywords that ATS systems look for</li>
              </ul>
            </div>
          </section>

          {/* FAQ Section */}
          {/* ✅ FAQ Section - Collapsible boxes with icons */}
<section className="mt-6 space-y-3">
  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
    Frequently Asked Questions
  </h3>

  {/* FAQ 1 */}
  <details className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border-2 border-gray-200 dark:border-gray-700 group">
    <summary className="font-bold text-gray-800 dark:text-white cursor-pointer flex items-center justify-between">
      <span className="flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-slate-600 dark:text-slate-300" />
        What's a good ATS score?
      </span>
      <span className="text-slate-500 group-open:rotate-180 transition-transform">▼</span>
    </summary>
    <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
      80+ is excellent and ATS-friendly. 65–79 is good but could use improvements. 
      50–64 needs significant work. Below 50 indicates major ATS issues that should 
      be fixed before applying.
    </p>
  </details>

  {/* FAQ 2 */}
  <details className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border-2 border-gray-200 dark:border-gray-700 group">
    <summary className="font-bold text-gray-800 dark:text-white cursor-pointer flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Lock className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                  Do I need to create an account?
                </span>
                <span className="text-slate-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                Yes, a free account is required to access the AI resume checker. This prevents 
                abuse and ensures fair usage for all users. Your uploaded resume stays private 
                and secure.
              </p>
            </details>

            {/* FAQ 3 */}
            <details className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border-2 border-gray-200 dark:border-gray-700 group">
              <summary className="font-bold text-gray-800 dark:text-white cursor-pointer flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                  What does the ATS checker analyze?
                </span>
                <span className="text-slate-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                We check keyword alignment, ATS readability, formatting, structure, file 
                compatibility, bullet strength, section clarity, date formatting, and 
                overall resume quality.
              </p>
            </details>

            {/* FAQ 4 */}
            <details className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border-2 border-gray-200 dark:border-gray-700 group">
              <summary className="font-bold text-gray-800 dark:text-white cursor-pointer flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                  Should I tailor my resume for each job?
                </span>
                <span className="text-slate-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                Yes! The best-performing resumes are customized for each job application. 
                Use keywords directly from the job posting and run your resume again to see 
                your improved score.
              </p>
            </details>

            {/* FAQ 5 */}
            <details className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border-2 border-gray-200 dark:border-gray-700 group">
              <summary className="font-bold text-gray-800 dark:text-white cursor-pointer flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  What are common ATS mistakes?
                </span>
                <span className="text-slate-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                Common errors include using tables, fancy fonts, images, text boxes, 
                unrecognized headings, missing keywords, and placing important info in 
                headers/footers.
              </p>
            </details>

            {/* FAQ 6 */}
            <details className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border-2 border-gray-200 dark:border-gray-700 group">
              <summary className="font-bold text-gray-800 dark:text-white cursor-pointer flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <BadgeDollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
                  Is this tool really free?
                </span>
                <span className="text-slate-500 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                Yes! The ATS resume checker is free with a basic account. Hourly rate limits 
                apply to ensure stable service for everyone.
              </p>
            </details>

            {/* Pro Tip Box */}
            <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-900/20 rounded-xl border-2 border-slate-200 dark:border-slate-700">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                💡 <strong>Pro Tip:</strong> Mirror the exact keywords from the job posting — 
                ATS systems reward exact phrase matching.
              </p>
            </div>
          </section>

        </div>
      </div>
    </>
  );
}
