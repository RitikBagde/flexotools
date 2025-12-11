"use client";

import React, { useState } from "react";

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

  // Auto-hide toast
  React.useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(id);
  }, [toast]);

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

      const result = await res.json();

      if (!res.ok) {
        setError(result.error || "Failed to extract text.");
        return;
      }

      if (result.success && result.data) {
        const isLikelyScanned = result.data.isLikelyScanned as boolean | undefined;

        setPagesInfo({
          numPages: result.data.numPages,
          fileName: result.data.fileName,
          isLikelyScanned,
        });

        if (isLikelyScanned) {
          setExtractedText("");
        } else {
          setExtractedText(result.data.fullText || "No text found in PDF.");
          setToast("✨ Text extracted successfully!");
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
        throw new Error("Download failed");
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
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-emerald-950/20 dark:via-teal-950/20 dark:to-cyan-950/20 py-6 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header with Mascot */}
        <header className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-3xl font-black text-gray-800 dark:text-white mb-1">
              📄 PDF Text Extractor
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Convert PDFs to text in seconds!
            </p>
          </div>
          {/* Cute Mascot */}
          <div className="text-7xl animate-bounce hidden sm:block" role="img" aria-label="Books emoji">
            📚
          </div>
        </header>

        {/* Info Badge */}
        <section className="bg-teal-100 dark:bg-teal-900/30 border-2 border-teal-300 dark:border-teal-700 rounded-xl p-3 mb-4" aria-labelledby="features-badge">
          <h2 id="features-badge" className="sr-only">Supported Features</h2>
          <p className="text-xs text-teal-800 dark:text-teal-200 font-semibold">
            ✨ Supports: <span className="font-bold">Text-based PDFs • Download as TXT or DOCX</span>
          </p>
        </section>

        {/* Main Card */}
        <main className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-5 border-3 border-teal-200 dark:border-teal-700">
          
          {/* Upload Section */}
          <section className="mb-5" aria-labelledby="upload-section">
            <label htmlFor="pdf-upload" className="block text-base font-bold text-gray-800 dark:text-white mb-2">
              📤 Upload Your PDF
            </label>
            <input
              id="pdf-upload"
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              aria-describedby="upload-help"
              className="block w-full text-xs text-gray-600 dark:text-gray-300 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-teal-500 file:text-white hover:file:bg-teal-600 file:cursor-pointer file:transition-all file:shadow-md cursor-pointer"
            />
            <p id="upload-help" className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              💡 Works best with PDFs that have selectable text. Large PDFs may take a moment.
            </p>
          </section>

          {/* Extract Button */}
          <button
            onClick={handleExtractText}
            disabled={loading || !file}
            aria-label={loading ? "Extracting text from PDF" : "Extract and view text from PDF"}
            className={`w-full py-3 px-6 rounded-xl font-black text-base shadow-2xl transition-all mb-5 ${
              !file || loading
                ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                : 'bg-linear-to-r from-teal-500 to-cyan-500 text-white hover:scale-105 hover:shadow-teal-500/50 active:scale-95'
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

          {/* Error Message */}
          {error && (
            <div className="mb-5 p-3 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-700 rounded-xl" role="alert">
              <p className="text-sm font-semibold text-red-700 dark:text-red-300 flex items-start gap-2">
                <span className="text-lg" aria-hidden="true">❌</span>
                <span>{error}</span>
              </p>
            </div>
          )}

          {/* Scanned PDF Warning */}
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

          {/* Extracted Text Section */}
          {extractedText && !pagesInfo?.isLikelyScanned && (
            <section className="space-y-3" aria-labelledby="extracted-text-heading">
              {/* Header with Actions */}
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <h2 id="extracted-text-heading" className="text-base font-black text-gray-800 dark:text-white flex items-center gap-2">
                  <span aria-hidden="true">📝</span> Extracted Text
                </h2>
                <div className="flex items-center gap-2 flex-wrap" role="group" aria-label="Text actions">
                  {pagesInfo?.numPages && (
                    <span className="px-3 py-1 bg-teal-100 dark:bg-teal-900/30 rounded-full text-xs font-bold text-teal-700 dark:text-teal-300" aria-label={`${pagesInfo.numPages} pages`}>
                      📄 {pagesInfo.numPages} pages
                    </span>
                  )}
                  <button
                    onClick={handleCopy}
                    type="button"
                    aria-label="Copy text to clipboard"
                    className="px-3 py-1.5 text-xs rounded-full border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-bold transition-all hover:scale-105"
                  >
                    📋 Copy
                  </button>
                  <button
                    onClick={() => handleDirectDownload("txt")}
                    disabled={downloading !== null}
                    aria-label="Download as TXT file"
                    className="px-3 py-1.5 text-xs rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 shadow-md"
                  >
                    {downloading === "txt" ? "⏳" : "💾 TXT"}
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

              {/* Text Area */}
              <textarea
                aria-label="Extracted text content"
                className="w-full h-64 text-sm bg-gray-50 dark:bg-gray-900 border-2 border-teal-200 dark:border-teal-700 rounded-xl p-4 text-gray-800 dark:text-gray-100 resize-y font-mono focus:border-teal-500 dark:focus:border-teal-400 focus:ring-4 focus:ring-teal-200 dark:focus:ring-teal-900/50 transition-all"
                value={extractedText}
                readOnly
              />

              {/* Character Count */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500 dark:text-gray-400">
                  📊 Character count: <span className="font-bold">{extractedText.length.toLocaleString()}</span>
                </span>
              </div>
            </section>
          )}
        </main>

        {/* Toast Notification */}
        {toast && (
          <div className="fixed bottom-4 right-4 bg-teal-500 text-white px-4 py-3 rounded-xl shadow-2xl font-bold text-sm flex items-center gap-2 animate-bounce z-50" role="alert" aria-live="polite">
            {toast}
          </div>
        )}

        {/* SEO Content Section */}
        <section className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border-2 border-gray-200 dark:border-gray-700" aria-labelledby="seo-content">
          <h2 id="seo-content" className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Extract Text from PDF Files Online
          </h2>
          
          <div className="space-y-4 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            <p>
              Our free PDF text extractor makes it easy to convert PDF documents to editable text formats. 
              Extract text from PDF files and download as TXT or DOCX instantly - all processing happens 
              securely in your browser.
            </p>

            <h3 className="text-lg font-bold text-gray-800 dark:text-white mt-6 mb-3">
              Key Features
            </h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Fast text extraction:</strong> Convert PDF to text in seconds</li>
              <li><strong>Multiple formats:</strong> Download as TXT or DOCX files</li>
              <li><strong>Browser-based:</strong> No file uploads to servers - your privacy is protected</li>
              <li><strong>Free and unlimited:</strong> Extract text from as many PDFs as you need</li>
              <li><strong>Copy to clipboard:</strong> Quickly copy extracted text for immediate use</li>
            </ul>

            <h3 className="text-lg font-bold text-gray-800 dark:text-white mt-6 mb-3">
              How It Works
            </h3>
            <p>
              Simply upload your PDF file, click extract, and view the text instantly. You can copy the text 
              to your clipboard or download it as a TXT or DOCX file. Perfect for extracting text from contracts, 
              reports, forms, or any text-based PDF document.
            </p>

            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
              <strong>Note:</strong> This tool works best with PDFs that contain selectable text. Scanned PDFs 
              or image-based PDFs require OCR (Optical Character Recognition), which is not currently supported.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}