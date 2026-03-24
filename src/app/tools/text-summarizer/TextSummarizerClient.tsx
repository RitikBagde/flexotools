"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { generateFAQSchema, type FAQItem } from "@/lib/seo";
import { HelpCircle, FileText, Clock, Zap, ListChecks, Lock, ChevronDown } from "lucide-react";

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

  const faqSchema = generateFAQSchema(faqs);

  const faqIcons = [FileText, Clock, Zap, ListChecks, HelpCircle, Lock];

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(id);
  }, [toast]);

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
        body: JSON.stringify({ text: inputText, action: actionMode, length: outputLength }),
      });

      const result = await (async () => {
        try { return await res.json(); } catch { return null; }
      })();

      if (!res.ok) {
        if (res.status === 429 && result?.resetIn) {
          setRateLimitInfo({ message: result.message || "Rate limit exceeded", resetIn: result.resetIn });
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
        if (data.originalLength) setStats({ originalLength: data.originalLength, summaryLength: data.summaryLength });
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
  const hasOutput = title || summary || bullets.length > 0;

  return (
    <>
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      <div className="min-h-screen bg-linear-to-br from-lime-50 via-green-50 to-emerald-50 dark:from-lime-950/20 dark:via-green-950/20 dark:to-emerald-950/20 py-6 px-4">
        <main className="max-w-3xl mx-auto">

          <header className="flex items-center justify-between mb-5">
            <div>
              <h1 className="text-3xl font-black text-foreground mb-1">✍️ Text Summarizer</h1>
              <p className="text-sm text-foreground/70">Transform long text into magic!</p>
            </div>
            <div className="text-7xl animate-bounce hidden sm:block" aria-hidden="true">📝</div>
          </header>

          <section className="bg-lime-100 dark:bg-lime-900/30 border-2 border-lime-300 dark:border-lime-700 rounded-xl p-3 mb-4">
            <p className="text-xs text-lime-900 dark:text-lime-200 font-semibold">
              ⚡ Features: <span className="font-bold">5 requests/3 hours • AI Summaries • Titles • Bullet Points • Login Required</span>
            </p>
          </section>

          <article className="bg-background rounded-2xl shadow-2xl p-5 border-2 border-lime-200 dark:border-lime-700">

            <section className="mb-4">
              <label className="block text-base font-bold text-foreground mb-2">📝 Input Text</label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste your article, essay, or any text here..."
                className="w-full h-48 text-sm bg-foreground/5 border-2 border-lime-200 dark:border-lime-700 rounded-xl p-4 text-foreground resize-y focus:border-lime-500 focus:ring-4 focus:ring-lime-200 dark:focus:ring-lime-900/50 transition-all"
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
                    <input type="file" accept=".txt" onChange={handleFileChange} className="hidden" />
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
            </section>

            <section className="mb-4">
              <h2 className="block text-base font-bold text-foreground mb-2">🎯 Choose Mode</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2" role="group" aria-label="Output mode">
                {([
                  { mode: "summarize" as ActionMode, emoji: "📝", label: "Summary", desc: "Paragraph overview" },
                  { mode: "title" as ActionMode, emoji: "✨", label: "Title", desc: "Catchy headline" },
                  { mode: "bullets" as ActionMode, emoji: "•", label: "Bullets", desc: "Key points list" },
                ]).map(({ mode: m, emoji, label, desc }) => (
                  <button
                    key={m}
                    onClick={() => setActionMode(m)}
                    aria-pressed={actionMode === m}
                    className={`p-3 rounded-xl border-2 font-bold text-left transition-all ${
                      actionMode === m
                        ? "bg-lime-500 text-white border-lime-600 shadow-lg scale-105"
                        : "bg-foreground/5 text-foreground border-foreground/20 hover:scale-105"
                    }`}
                  >
                    <div className="text-xl mb-1" aria-hidden="true">{emoji}</div>
                    <div className="text-sm">{label}</div>
                    <div className="text-xs opacity-75 mt-0.5">{desc}</div>
                  </button>
                ))}
              </div>
            </section>

            {actionMode === "summarize" && (
              <section className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border-2 border-green-200 dark:border-green-700">
                <label className="block text-sm font-bold text-foreground mb-2">📏 Output Length</label>
                <select
                  value={outputLength}
                  onChange={(e) => setOutputLength(e.target.value as OutputLength)}
                  className="w-full px-3 py-2 rounded-lg border-2 border-green-300 dark:border-green-600 bg-background text-sm text-foreground font-semibold focus:border-green-500 focus:ring-2 focus:ring-green-200 dark:focus:ring-green-900/50 transition-all"
                >
                  <option value="short">🐁 Short (Concise)</option>
                  <option value="medium">🐱 Medium (Balanced)</option>
                  <option value="long">🦁 Long (Detailed)</option>
                </select>
              </section>
            )}

            {error && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-700 rounded-xl" role="alert">
                <p className="text-sm font-semibold text-red-700 dark:text-red-300 flex items-start gap-2">
                  <span aria-hidden="true">❌</span>
                  <span>{error}</span>
                </p>
              </div>
            )}

            <button
              onClick={checkAuthAndProcess}
              disabled={loading || !inputText.trim()}
              aria-label={loading ? "Processing text" : "Generate output"}
              className={`w-full py-3 px-6 rounded-xl font-black text-base shadow-2xl transition-all mb-4 ${
                loading || !inputText.trim()
                  ? "bg-foreground/10 text-foreground/30 cursor-not-allowed"
                  : "bg-linear-to-r from-lime-500 to-green-500 text-white hover:scale-105 hover:shadow-lime-500/50 active:scale-95"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin" aria-hidden="true">⚙️</span> Processing Magic...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span aria-hidden="true">🚀</span> Generate
                </span>
              )}
            </button>

            {title && (
              <section className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-black text-foreground">🏷️ Generated Title</h3>
                  <button
                    onClick={() => handleCopy(title, "Title")}
                    className="px-3 py-1 text-xs rounded-full border-2 border-foreground/20 hover:bg-foreground/5 text-foreground/70 font-bold transition-all hover:scale-105"
                  >
                    📋 Copy
                  </button>
                </div>
                <div className="p-4 bg-foreground/5 rounded-lg border-2 border-lime-100 dark:border-lime-800">
                  <p className="text-sm text-foreground/80">{title}</p>
                </div>
              </section>
            )}

            {summary && (
              <section className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-black text-foreground">📝 Summary</h3>
                  <button
                    onClick={() => handleCopy(summary, "Summary")}
                    className="px-3 py-1 text-xs rounded-full border-2 border-foreground/20 hover:bg-foreground/5 text-foreground/70 font-bold transition-all hover:scale-105"
                  >
                    📋 Copy
                  </button>
                </div>
                <div className="p-4 bg-foreground/5 rounded-lg border-2 border-lime-100 dark:border-lime-800">
                  <p className="text-sm text-foreground/80 whitespace-pre-wrap">{summary}</p>
                </div>
                {stats && (
                  <p className="text-xs text-foreground/50 mt-2">
                    📊 {stats.originalLength?.toLocaleString()} chars → {stats.summaryLength?.toLocaleString()} chars
                  </p>
                )}
              </section>
            )}

            {bullets.length > 0 && (
              <section className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-black text-foreground">• Bullet Points</h3>
                  <button
                    onClick={() => handleCopy(bullets.join("\n"), "Bullets")}
                    className="px-3 py-1 text-xs rounded-full border-2 border-foreground/20 hover:bg-foreground/5 text-foreground/70 font-bold transition-all hover:scale-105"
                  >
                    📋 Copy
                  </button>
                </div>
                <ul className="space-y-2">
                  {bullets.map((b, i) => (
                    <li key={i} className="p-3 bg-foreground/5 rounded-lg border-2 border-lime-100 dark:border-lime-800 text-sm text-foreground/80">
                      {b}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </article>

          <section className="mt-8 bg-background rounded-2xl shadow-xl p-6 border-2 border-foreground/10">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Free AI Text Summarizer — Instant Summaries, Titles & Bullets
            </h2>
            <div className="space-y-4 text-foreground/70">
              <p>
                Our free AI-powered text summarizer helps you condense long articles, essays, and documents into concise summaries.
                Generate titles, summaries, and bullet points instantly with advanced AI technology.
              </p>
              <h3 className="text-xl font-bold text-foreground mt-6 mb-3">Key Features</h3>
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

          <section className="mt-6 space-y-3">
            <h3 className="text-2xl font-bold text-foreground mb-4">Frequently Asked Questions</h3>

            {faqs.map((faq, index) => {
              const Icon = faqIcons[index] || HelpCircle;
              return (
                <details
                  key={index}
                  className="bg-background rounded-xl shadow-md p-5 border-2 border-foreground/10 group"
                >
                  <summary className="font-bold text-foreground cursor-pointer flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Icon className="w-5 h-5 text-lime-600 shrink-0" />
                      {faq.question}
                    </span>
                    <ChevronDown className="w-5 h-5 text-lime-600 group-open:rotate-180 transition-transform shrink-0" />
                  </summary>
                  <p className="mt-3 text-sm text-foreground/70 leading-relaxed">{faq.answer}</p>
                </details>
              );
            })}

            <div className="mt-6 p-4 bg-lime-50 dark:bg-lime-900/10 rounded-xl border-2 border-lime-200 dark:border-lime-700">
              <p className="text-sm font-semibold text-lime-900 dark:text-lime-200">
                💡 <strong>Pro Tip:</strong> For best summaries, paste a complete section (with headings/intros) rather than isolated sentences.
              </p>
            </div>
          </section>
        </main>

        {showAuthModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true" aria-labelledby="auth-modal-title">
            <div className="bg-background rounded-2xl shadow-2xl p-6 max-w-md w-full border-2 border-foreground/10">
              <div className="text-center mb-4">
                <div className="text-6xl mb-3" aria-hidden="true">🔒</div>
                <h3 id="auth-modal-title" className="text-2xl font-black text-foreground mb-2">Login Required</h3>
                <p className="text-sm text-foreground/70">Please sign in to generate content with our AI service.</p>
              </div>
              <div className="space-y-3">
                <button
                  onClick={() => { sessionStorage.setItem("auth_redirect", window.location.pathname); router.push("/auth"); }}
                  className="w-full py-3 px-6 rounded-xl font-black text-base bg-linear-to-r from-lime-600 to-green-600 text-white hover:scale-105 shadow-xl transition-all"
                >
                  🚀 Sign In / Sign Up
                </button>
                <button
                  onClick={() => setShowAuthModal(false)}
                  className="w-full py-3 px-6 rounded-xl font-bold text-sm bg-foreground/5 text-foreground/70 hover:bg-foreground/10 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {showCelebration && (
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none" aria-live="polite" aria-atomic="true">
            <div className="text-8xl animate-bounce">🎉</div>
          </div>
        )}

        {toast && (
          <div className="fixed bottom-4 right-4 bg-lime-600 text-white px-5 py-3 rounded-xl shadow-2xl font-black text-sm flex items-center gap-2 z-50 animate-bounce" role="status" aria-live="polite">
            <span aria-hidden="true">✨</span>
            {toast}
          </div>
        )}
      </div>
    </>
  );
}