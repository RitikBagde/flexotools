"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { generateFAQSchema, type FAQItem } from "@/lib/seo";
import {
  HelpCircle,
  FileText,
  Clock,
  Zap,
  ListChecks,
  Lock,
  BadgeDollarSign,
} from "lucide-react";

type ActionMode = "title" | "summarize" | "bullets";
type OutputLength = "short" | "medium" | "long";

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

  const [actionMode, setActionMode] = useState<ActionMode>("summarize");
  const [outputLength, setOutputLength] = useState<OutputLength>("medium");

  // ✅ FAQ array (used for schema + UI)
  const faqs: FAQItem[] = [
    {
      question: "How does the AI text summarizer work?",
      answer:
        "We analyze your text with modern NLP models to extract main ideas, structure them and produce concise outputs tailored to the selected mode and length.",
    },
    {
      question: "What's the difference between short, medium, and long summaries?",
      answer: "Short = 1-2 sentences, Medium = 2-4 sentences, Long = 4-6 sentences. Choose what fits your needs.",
    },
    {
      question: "Are there any usage limits?",
      answer:
        "Yes — to keep the service free and fast we limit requests (example: 5 per 3 hours). Auth required. Rate-limit messages will show when applicable.",
    },
    {
      question: "Can I summarize any type of text?",
      answer:
        "Works best with coherent paragraphs: articles, reports, essays, blog posts. Avoid pasting extremely small fragments or heavily malformed text.",
    },
    {
      question: "What's the difference between modes?",
      answer: "Summary = paragraph overview, Title = catchy headline, Bullets = compact list of key points.",
    },
    {
      question: "Is my text private?",
      answer:
        "Yes. Input is processed server-side and discarded after generation according to our privacy practices. Avoid pasting very sensitive personal data if you prefer not to share it.",
    },
  ];

  // JSON-LD schema
  const faqSchema = generateFAQSchema(faqs);

  // Auto-hide toast
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(id);
  }, [toast]);

  // Celebration animation
  useEffect(() => {
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
      setToast("📄 File uploaded successfully!");
    };
    reader.readAsText(file);
  };

  // Robust error parser (tries to read JSON or text body)
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

  const checkAuthAndProcess = async () => {
    if (!inputText.trim()) {
      setError("Please enter some text first.");
      return;
    }

    try {
      const authCheck = await fetch("/api/auth/check");
      if (!authCheck.ok) {
        // not authenticated
        setShowAuthModal(true);
        return;
      }
      const authData = await authCheck.json();
      if (!authData?.authenticated) {
        setShowAuthModal(true);
        return;
      }
      await handleProcess();
    } catch (err) {
      console.error("Auth check failed:", err);
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
    setStats(null);

    try {
      const res = await fetch("/api/tools/text-summarizer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: inputText,
          action: actionMode,
          length: outputLength,
        }),
      });

      const result = await (async () => {
        try {
          return await res.json();
        } catch {
          return null;
        }
      })();

      if (!res.ok) {
        // Rate limit
        if (res.status === 429 && result?.resetIn) {
          setRateLimitInfo({
            message: result.message || "Rate limit exceeded",
            resetIn: result.resetIn,
          });
          setError(result.message || "Rate limit exceeded");
          return;
        }

        if (res.status === 401) {
          setShowAuthModal(true);
          return;
        }

        const errMsg = result?.error || (await parseErrorResponse(res));
        setError(errMsg);
        return;
      }

      if (result?.success && result?.data) {
        const data = result.data;
        if (data.summary) setSummary(data.summary);
        if (data.title) setTitle(data.title);
        if (Array.isArray(data.bullets)) setBullets(data.bullets);
        if (data.originalLength) {
          setStats({
            originalLength: data.originalLength,
            summaryLength: data.summaryLength,
          });
        }
        setShowCelebration(true);
        setToast("✨ Generated successfully!");
      } else {
        setError("Unexpected response shape from server.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => setToast(`📋 ${type} copied to clipboard!`))
      .catch(() => setError("Failed to copy to clipboard."));
  };

  const handleClear = () => {
    setInputText("");
    setSummary("");
    setTitle("");
    setBullets([]);
    setError(null);
    setStats(null);
    setRateLimitInfo(null);
    setToast("🗑️ All cleared!");
  };

  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;

  // Data-driven FAQ UI mapping (icons)
  const faqUi = [
    { icon: FileText, q: "How does the AI text summarizer work?", a: faqs[0].answer },
    { icon: Clock, q: "What's the difference between short, medium, and long summaries?", a: faqs[1].answer },
    { icon: Zap, q: "Are there any usage limits?", a: faqs[2].answer },
    { icon: ListChecks, q: "Can I summarize any type of text?", a: faqs[3].answer },
    { icon: HelpCircle, q: "What's the difference between modes?", a: faqs[4].answer },
    { icon: Lock, q: "Is my text private?", a: faqs[5].answer },
  ];

  return (
    <>
      {/* FAQ JSON-LD for SEO */}
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      <div className="min-h-screen bg-linear-to-br from-lime-50 via-green-50 to-emerald-50 dark:from-lime-950/20 dark:via-green-950/20 dark:to-emerald-950/20 py-6 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header with Mascot */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <h1 className="text-3xl font-black text-gray-800 dark:text-white mb-1">✍️ Text Summarizer</h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">Transform long text into magic!</p>
            </div>
            <div className="text-7xl animate-bounce hidden sm:block">📝</div>
          </div>

          {/* Info Badge */}
          <div className="bg-lime-100 dark:bg-lime-900/30 border-2 border-lime-300 dark:border-lime-700 rounded-xl p-3 mb-4">
            <p className="text-xs text-lime-800 dark:text-lime-200 font-semibold">
              ⚡ Features: <span className="font-bold">5 requests/3 hours • AI Summaries • Titles • Bullet Points • Login Required</span>
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-5 border-3 border-lime-200 dark:border-lime-700">
            {/* Input area & controls (unchanged, original UI) */}
            <div className="mb-4">
              <label className="block text-base font-bold text-gray-800 dark:text-white mb-2">📝 Input Text</label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste your article, essay, or any text here..."
                className="w-full h-48 text-sm bg-gray-50 dark:bg-gray-900 border-2 border-lime-200 dark:border-lime-700 rounded-xl p-4 text-gray-800 dark:text-gray-100 resize-y focus:border-lime-500 dark:focus:border-lime-400 focus:ring-4 focus:ring-lime-200 dark:focus:ring-lime-900/50 transition-all"
              />
              <div className="flex justify-between items-center mt-2 flex-wrap gap-2">
                <div className="flex gap-3 text-xs font-semibold">
                  <span className="px-2 py-1 bg-lime-100 dark:bg-lime-900/30 rounded-full text-lime-700 dark:text-lime-300">📊 {inputText.length.toLocaleString()} chars</span>
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 rounded-full text-green-700 dark:text-green-300">📖 {wordCount} words</span>
                </div>
                <div className="flex gap-2">
                  <label className="text-xs font-bold px-3 py-1.5 bg-lime-500 hover:bg-lime-600 text-white rounded-full cursor-pointer transition-all hover:scale-105 shadow-md">
                    📄 Upload
                    <input type="file" accept=".txt" onChange={handleFileChange} className="hidden" />
                  </label>
                  {inputText && (
                    <button onClick={handleClear} className="text-xs font-bold px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full transition-all hover:scale-105 shadow-md">🗑️ Clear</button>
                  )}
                </div>
              </div>
            </div>

            {/* Mode selection */}
            <div className="mb-4">
              <label className="block text-base font-bold text-gray-800 dark:text-white mb-2">🎯 Choose Mode</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <button onClick={() => setActionMode("summarize")} className={`p-3 rounded-xl border-2 font-bold text-left transition-all ${actionMode === "summarize" ? "bg-lime-500 text-white border-lime-600 shadow-lg scale-105" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:scale-105"}`}>
                  <div className="text-xl mb-1">📝</div>
                  <div className="text-sm">Summary</div>
                </button>

                <button onClick={() => setActionMode("title")} className={`p-3 rounded-xl border-2 font-bold text-left transition-all ${actionMode === "title" ? "bg-lime-500 text-white border-lime-600 shadow-lg scale-105" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:scale-105"}`}>
                  <div className="text-xl mb-1">✨</div>
                  <div className="text-sm">Title</div>
                </button>

                <button onClick={() => setActionMode("bullets")} className={`p-3 rounded-xl border-2 font-bold text-left transition-all ${actionMode === "bullets" ? "bg-lime-500 text-white border-lime-600 shadow-lg scale-105" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:scale-105"}`}>
                  <div className="text-xl mb-1">•</div>
                  <div className="text-sm">Bullets</div>
                </button>
              </div>
            </div>

            {/* Output length */}
            {actionMode === "summarize" && (
              <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border-2 border-green-200 dark:border-green-700">
                <label className="block text-sm font-bold text-gray-800 dark:text-white mb-2">📏 Output Length</label>
                <select value={outputLength} onChange={(e) => setOutputLength(e.target.value as OutputLength)} className="w-full px-3 py-2 rounded-lg border-2 border-green-300 dark:border-green-600 bg-white dark:bg-gray-700 text-sm text-gray-800 dark:text-white font-semibold focus:border-green-500 dark:focus:border-green-400 focus:ring-2 focus:ring-green-200 dark:focus:ring-green-900/50 transition-all">
                  <option value="short">🐁 Short (Concise)</option>
                  <option value="medium">🐱 Medium (Balanced)</option>
                  <option value="long">🦁 Long (Detailed)</option>
                </select>
              </div>
            )}

            {/* Generate */}
            <button onClick={checkAuthAndProcess} disabled={loading || !inputText.trim()} className={`w-full py-3 px-6 rounded-xl font-black text-base shadow-2xl transition-all mb-4 ${loading || !inputText.trim() ? "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed" : "bg-linear-to-r from-lime-500 to-green-500 text-white hover:scale-105 hover:shadow-lime-500/50 active:scale-95"}`}>
              {loading ? (
                <span className="flex items-center justify-center gap-2"><span className="animate-spin">⚙️</span> Processing Magic...</span>
              ) : (
                <span className="flex items-center justify-center gap-2"><span>🚀</span> Generate</span>
              )}
            </button>

            {/* Outputs */}
            {title && (
              <section className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-black text-gray-800 dark:text-white">🏷️ Generated Title</h3>
                  <div className="flex gap-2">
                    <button onClick={() => handleCopy(title, "Title")} className="px-3 py-1 text-xs rounded-full border-2 font-bold">📋 Copy</button>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border-2 border-lime-100 dark:border-lime-800">
                  <p className="text-sm text-gray-700 dark:text-gray-200">{title}</p>
                </div>
              </section>
            )}

            {summary && (
              <section className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-black text-gray-800 dark:text-white">📝 Summary</h3>
                  <div className="flex gap-2">
                    <button onClick={() => handleCopy(summary, "Summary")} className="px-3 py-1 text-xs rounded-full border-2 font-bold">📋 Copy</button>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border-2 border-lime-100 dark:border-lime-800">
                  <p className="text-sm text-gray-700 dark:text-gray-200 whitespace-pre-wrap">{summary}</p>
                </div>
              </section>
            )}

            {bullets.length > 0 && (
              <section className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-black text-gray-800 dark:text-white">• Bullet Points</h3>
                  <div className="flex gap-2">
                    <button onClick={() => handleCopy(bullets.join("\n"), "Bullets")} className="px-3 py-1 text-xs rounded-full border-2 font-bold">📋 Copy</button>
                  </div>
                </div>
                <ul className="space-y-2">
                  {bullets.map((b, i) => (
                    <li key={i} className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border-2 border-lime-100 dark:border-lime-800 text-sm text-gray-700 dark:text-gray-200">
                      {b}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* SEO content section (unchanged) */}
          <section className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border-2 border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Free AI Text Summarizer - Instant Summaries, Titles & Bullets</h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>Our free AI-powered text summarizer helps you condense long articles, essays, and documents into concise summaries. Generate titles, summaries, and bullet points instantly with advanced AI technology. Perfect for students, researchers, professionals, and anyone who needs to process large amounts of text quickly.</p>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mt-6 mb-3">Key Features</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>AI-powered summarization:</strong> Advanced algorithms create accurate, coherent summaries</li>
                <li><strong>Three modes:</strong> Generate summaries, titles, or bullet point lists</li>
                <li><strong>Adjustable length:</strong> Choose short, medium, or long summaries</li>
                <li><strong>Fast processing:</strong> Get results in seconds</li>
                <li><strong>Copy to clipboard:</strong> Easily copy generated content</li>
                <li><strong>File upload support:</strong> Upload .txt files for quick processing</li>
              </ul>
            </div>
          </section>

          {/* FAQ - data driven with icons */}
          <section className="mt-6 space-y-3">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Frequently Asked Questions</h3>

            {faqUi.map((f, idx) => {
              const Icon = f.icon;
              return (
                <details key={idx} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 border-2 border-gray-200 dark:border-gray-700 group">
                  <summary className="font-bold text-gray-800 dark:text-white cursor-pointer flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Icon className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                      {f.q}
                    </span>
                    <span className="text-lime-500 group-open:rotate-180 transition-transform">▼</span>
                  </summary>
                  <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{f.a}</p>
                </details>
              );
            })}

            <div className="mt-6 p-4 bg-lime-50 dark:bg-lime-900/10 rounded-xl border-2 border-lime-200 dark:border-lime-700">
              <p className="text-sm font-semibold text-lime-800 dark:text-lime-200">💡 <strong>Pro Tip:</strong> For best summaries, paste a complete section (with headings/intros) rather than isolated sentences. That helps the model detect structure and produce better results.</p>
            </div>
          </section>
        </div>

        {/* Auth modal */}
        {showAuthModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true" aria-labelledby="auth-modal-title">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 max-w-md w-full border-3 border-slate-200 dark:border-slate-700">
              <div className="text-center mb-4">
                <div className="text-6xl mb-3" aria-hidden="true">🔒</div>
                <h3 id="auth-modal-title" className="text-2xl font-black text-gray-800 dark:text-white mb-2">Login Required</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Please sign in to generate content with our AI service.</p>
              </div>

              <div className="space-y-3">
                <button onClick={() => { sessionStorage.setItem("auth_redirect", window.location.pathname); router.push("/auth"); }} className="w-full py-3 px-6 rounded-xl font-black text-base bg-lime-700 hover:bg-lime-800 text-white hover:scale-105 shadow-xl transition-all">🚀 Sign In / Sign Up</button>
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
          <div className="fixed bottom-4 right-4 bg-lime-700 text-white px-5 py-3 rounded-xl shadow-2xl font-black text-sm flex items-center gap-2 z-50 animate-bounce" role="status" aria-live="polite">
            {toast}
          </div>
        )}
      </div>
    </>
  );
}
