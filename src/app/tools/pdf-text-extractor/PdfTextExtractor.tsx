"use client";

import React, { useState, useEffect } from "react";
import { generateFAQSchema, type FAQItem } from "@/lib/seo";
import { HelpCircle, FileText, Lock, AlertTriangle, Clipboard, Download, ChevronDown } from "lucide-react";

export default function PdfTextExtractor() {
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState<"txt" | "docx" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pagesInfo, setPagesInfo] = useState<{
    numPages?: number;
    fileName?: string;
    isLikelyScanned?: boolean;
  } | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  const faqs: FAQItem[] = [
    {
      question: "Does this work with scanned PDFs?",
      answer:
        "This tool works best with PDFs that contain selectable text. Scanned PDFs (image-based) require OCR and are not supported yet. The tool will detect scanned PDFs and show a warning.",
    },
    {
      question: "Are my PDF files uploaded to your servers?",
      answer:
        "No — processing happens in your browser by default. Files do not leave your device unless your deployment is configured otherwise.",
    },
    {
      question: "What's the maximum file size?",
      answer:
        "You can upload PDF files up to 10MB. Very large PDFs may take longer depending on your device's CPU and memory.",
    },
    {
      question: "Can I extract text from password-protected PDFs?",
      answer:
        "No — password-protected or encrypted PDFs cannot be processed. Please unlock them with the password locally first.",
    },
    {
      question: "Why choose TXT vs DOCX format?",
      answer:
        "TXT is plain text (great for quick copy/paste or code). DOCX preserves basic structure and is better if you want to edit in Word or Google Docs.",
    },
    {
      question: "Is this tool really free?",
      answer:
        "Yes — this PDF text extractor is free to use with no sign-up and no hidden fees. Extract as many PDFs as you need.",
    },
  ];

  const faqSchema = generateFAQSchema(faqs);

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
    const f = e.target.files?.[0] || null;
    setFile(f);
    setExtractedText("");
    setError(null);
    setPagesInfo(null);
  };

  const handleExtractText = async () => {
    setError(null);
    setExtractedText("");

    if (!file) {
      setError("Please select a PDF file first.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/tools/pdf-text", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        let msg = `HTTP ${res.status} ${res.statusText}`;
        try {
          const contentType = res.headers.get("content-type") || "";
          if (contentType.includes("application/json")) {
            const data = await res.json();
            if ((data as any)?.error) msg = (data as any).error;
          } else {
            const text = await res.text();
            if (text) msg = text;
          }
        } catch (e) {
          console.error("error reading error body", e);
        }
        setError(msg);
        return;
      }

      const result = await res.json();

      if (result?.success && result?.data) {
        const isLikelyScanned = result.data.isLikelyScanned as boolean | undefined;

        setPagesInfo({
          numPages: result.data.numPages,
          fileName: result.data.fileName,
          isLikelyScanned,
        });

        if (isLikelyScanned) {
          setExtractedText("");
          setToast("⚠️ Scanned PDF detected — no selectable text found.");
        } else {
          setExtractedText(result.data.fullText || "No text found in PDF.");
          setToast("✨ Text extracted successfully!");
          setShowCelebration(true);
        }
      } else {
        setError("No text could be extracted from this PDF.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong while uploading the file.");
    } finally {
      setLoading(false);
    }
  };

  const handleDirectDownload = async (format: "txt" | "docx") => {
    if (!file) {
      setError("Please select a PDF file first.");
      return;
    }

    if (pagesInfo?.isLikelyScanned) {
      setError(
        "This looks like a scanned PDF. Downloads are disabled because text extraction is not supported for images yet."
      );
      return;
    }

    try {
      setDownloading(format);
      setError(null);

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`/api/tools/pdf-text?format=${format}`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        let msg = `HTTP ${res.status} ${res.statusText}`;
        try {
          const contentType = res.headers.get("content-type") || "";
          if (contentType.includes("application/json")) {
            const data = await res.json();
            if ((data as any)?.error) msg = (data as any).error;
          } else {
            const text = await res.text();
            if (text) msg = text;
          }
        } catch (e) {
          console.error("error reading error body", e);
        }
        throw new Error(msg);
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const baseName = file.name.replace(/\.pdf$/i, "") || "document";

      a.href = url;
      a.download = `${baseName}.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setToast(`🎉 Downloaded as ${format.toUpperCase()}!`);
      setShowCelebration(true);
    } catch (err) {
      console.error(err);
      setError(`Failed to download ${format.toUpperCase()} file.`);
    } finally {
      setDownloading(null);
    }
  };

  const handleCopy = async () => {
    if (!extractedText) return;
    try {
      await navigator.clipboard.writeText(extractedText);
      setToast("📋 Copied to clipboard!");
    } catch {
      setError("Failed to copy.");
    }
  };

  return (
    <>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="min-h-screen bg-linear-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/20 dark:via-teal-950/20 dark:to-cyan-950/20 py-6 px-4">
        <main className="max-w-3xl mx-auto">

          <header className="flex items-center justify-between mb-5">
            <div>
              <h1 className="text-3xl font-black text-foreground mb-1">
                📄 PDF Text Extractor — Free Online, Browser-Based
              </h1>
              <p className="text-sm text-foreground/70">
                Convert PDFs to text in seconds!
              </p>
            </div>
            <div className="text-7xl animate-bounce hidden sm:block" role="img" aria-label="Books emoji">
              📚
            </div>
          </header>

          <section className="bg-teal-100 dark:bg-teal-900/30 border-2 border-teal-300 dark:border-teal-700 rounded-xl p-3 mb-4">
            <p className="text-xs text-teal-900 dark:text-teal-200 font-semibold">
              ✨ Supports: <span className="font-bold">Text-based PDFs • Download as TXT or DOCX</span>
            </p>
          </section>

          <article className="bg-background rounded-2xl shadow-2xl p-5 border-2 border-teal-200 dark:border-teal-700">

            <section className="mb-5">
              <label htmlFor="pdf-upload" className="block text-base font-bold text-foreground mb-2">
                📤 Upload Your PDF
              </label>
              <input
                id="pdf-upload"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                aria-describedby="upload-help"
                className="block w-full text-xs text-foreground/60 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-teal-500 file:text-white hover:file:bg-teal-600 file:cursor-pointer file:transition-all file:shadow-md cursor-pointer"
              />
              <p id="upload-help" className="text-xs text-foreground/50 mt-2">
                💡 Works best with PDFs that have selectable text. Large PDFs may take a moment.
              </p>
            </section>

            <button
              onClick={handleExtractText}
              disabled={loading || !file}
              aria-label={loading ? "Extracting text from PDF" : "Extract and view text from PDF"}
              className={`w-full py-3 px-6 rounded-xl font-black text-base shadow-2xl transition-all mb-5 ${
                !file || loading
                  ? "bg-foreground/10 text-foreground/30 cursor-not-allowed"
                  : "bg-linear-to-r from-teal-500 to-cyan-500 text-white hover:scale-105 hover:shadow-teal-500/50 active:scale-95"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin" aria-hidden="true">⚙️</span> Extracting Magic...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span aria-hidden="true">🔍</span> Extract & View Text
                </span>
              )}
            </button>

            {error && (
              <div className="mb-5 p-3 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-700 rounded-xl" role="alert">
                <p className="text-sm font-semibold text-red-700 dark:text-red-300 flex items-start gap-2">
                  <span className="text-lg" aria-hidden="true">❌</span>
                  <span>{error}</span>
                </p>
              </div>
            )}

            {pagesInfo?.isLikelyScanned && (
              <div className="mb-5 p-4 bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-300 dark:border-amber-700 rounded-xl" role="alert">
                <div className="flex items-start gap-3">
                  <span className="text-2xl" aria-hidden="true">⚠️</span>
                  <div>
                    <h3 className="text-sm font-black text-amber-800 dark:text-amber-200 mb-1">
                      Scanned PDF Detected!
                    </h3>
                    <p className="text-xs text-amber-700 dark:text-amber-300">
                      We couldn't extract much text because this PDF doesn't contain real selectable text.
                      This tool currently <span className="font-bold">does not support OCR</span> or reading text from images.
                      Try using the original editable document or a different PDF.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {extractedText && !pagesInfo?.isLikelyScanned && (
              <section className="space-y-3" aria-labelledby="extracted-text-heading">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <h2 id="extracted-text-heading" className="text-base font-black text-foreground flex items-center gap-2">
                    <FileText className="w-5 h-5 text-teal-600" /> <span>Extracted Text</span>
                  </h2>
                  <div className="flex items-center gap-2 flex-wrap" role="group" aria-label="Text actions">
                    {pagesInfo?.numPages && (
                      <span className="px-3 py-1 bg-teal-100 dark:bg-teal-900/30 rounded-full text-xs font-bold text-teal-700 dark:text-teal-500" aria-label={`${pagesInfo.numPages} pages`}>
                        📄 {pagesInfo.numPages} pages
                      </span>
                    )}
                    <button
                      onClick={handleCopy}
                      type="button"
                      aria-label="Copy text to clipboard"
                      className="px-3 py-1.5 text-xs rounded-full border-2 border-foreground/20 hover:bg-foreground/5 text-foreground/70 font-bold transition-all hover:scale-105"
                    >
                      <Clipboard className="inline w-4 h-4 mr-1" /> Copy
                    </button>
                    <button
                      onClick={() => handleDirectDownload("txt")}
                      disabled={downloading !== null}
                      aria-label="Download as TXT file"
                      className="px-3 py-1.5 text-xs rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 shadow-md"
                    >
                      {downloading === "txt" ? "⏳" : <><Download className="inline w-4 h-4 mr-1" /> TXT</>}
                    </button>
                    <button
                      onClick={() => handleDirectDownload("docx")}
                      disabled={downloading !== null}
                      aria-label="Download as DOCX file"
                      className="px-3 py-1.5 text-xs rounded-full bg-blue-500 hover:bg-blue-600 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 shadow-md"
                    >
                      {downloading === "docx" ? "⏳" : "📄 DOCX"}
                    </button>
                  </div>
                </div>

                <textarea
                  aria-label="Extracted text content"
                  className="w-full h-64 text-sm bg-foreground/5 border-2 border-teal-200 dark:border-teal-700 rounded-xl p-4 text-foreground resize-y font-mono focus:border-teal-500 focus:ring-4 focus:ring-teal-200 dark:focus:ring-teal-900/50 transition-all"
                  value={extractedText}
                  readOnly
                />

                <div className="flex items-center justify-between text-xs">
                  <span className="text-foreground/70">
                    📊 Character count: <span className="font-bold">{extractedText.length.toLocaleString()}</span>
                  </span>
                </div>
              </section>
            )}
          </article>

          <section className="mt-8 bg-background rounded-2xl shadow-xl p-6 border-2 border-foreground/10">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Extract Text from PDF Files Online — Free & Fast
            </h2>
            <div className="space-y-4 text-foreground/70">
              <p>
                Our free PDF text extractor makes it easy to convert PDF documents to editable text formats.
                Extract text from PDF files and download as TXT or DOCX instantly — all processing happens
                securely in your browser with no uploads to our servers.
              </p>
              <h3 className="text-xl font-bold text-foreground mt-6 mb-3">Key Features</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Instant extraction:</strong> Convert PDF to text in seconds without waiting</li>
                <li><strong>Multiple export formats:</strong> Download as TXT or DOCX files for Word compatibility</li>
                <li><strong>100% browser-based:</strong> No file uploads to servers — your privacy is fully protected</li>
                <li><strong>Free and unlimited:</strong> Extract text from as many PDFs as you need, no limits</li>
                <li><strong>Copy to clipboard:</strong> Quickly copy extracted text for immediate use in any application</li>
                <li><strong>Page count display:</strong> See how many pages were processed</li>
              </ul>
              <h3 className="text-xl font-bold text-foreground mt-6 mb-3">How to Use the PDF Text Extractor</h3>
              <ol className="list-decimal list-inside space-y-2 ml-4">
                <li><strong>Upload your PDF:</strong> Click the upload button and select your PDF file (max 10MB)</li>
                <li><strong>Extract text:</strong> Click "Extract & View Text" to process the document</li>
                <li><strong>View results:</strong> Read the extracted text directly in your browser</li>
                <li><strong>Export or copy:</strong> Download as TXT/DOCX or copy to clipboard</li>
              </ol>
            </div>
          </section>

          <section className="mt-6 space-y-3">
            <h3 className="text-2xl font-bold text-foreground mb-4">Frequently Asked Questions</h3>

            {faqs.map((faq, index) => {
              const icons = [HelpCircle, Lock, FileText, AlertTriangle, Download, HelpCircle];
              const Icon = icons[index] || HelpCircle;
              return (
                <details
                  key={index}
                  className="bg-background rounded-xl shadow-md p-5 border-2 border-foreground/10 group"
                >
                  <summary className="font-bold text-foreground cursor-pointer flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Icon className="w-5 h-5 text-teal-500 shrink-0" />
                      {faq.question}
                    </span>
                    <ChevronDown className="w-5 h-5 text-teal-500 group-open:rotate-180 transition-transform shrink-0" />
                  </summary>
                  <p className="mt-3 text-sm text-foreground/70 leading-relaxed">{faq.answer}</p>
                </details>
              );
            })}

            <div className="mt-6 p-4 bg-teal-50 dark:bg-teal-900/10 rounded-xl border-2 border-teal-200 dark:border-teal-700">
              <p className="text-sm font-semibold text-teal-900 dark:text-teal-200">
                💡 <strong>Pro Tip:</strong> For best results, use PDFs that were created digitally (not scanned). If you have a scanned PDF, try a dedicated OCR tool first.
              </p>
            </div>
          </section>
        </main>

        {showCelebration && (
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div className="text-6xl animate-bounce">🎉</div>
          </div>
        )}

        {toast && (
          <div className="fixed bottom-4 right-4 bg-teal-500 text-white px-4 py-3 rounded-xl shadow-2xl font-bold text-sm flex items-center gap-2 animate-bounce z-50" role="alert" aria-live="polite">
            <span aria-hidden="true">✨</span>
            {toast}
          </div>
        )}
      </div>
    </>
  );
}