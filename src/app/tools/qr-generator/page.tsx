"use client";

import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import Barcode from "react-barcode";

type Mode = "qr" | "barcode";

export default function QrBarcodeGenerator() {
  const [mode, setMode] = useState<Mode>("qr");
  const [value, setValue] = useState("https://");
  const [size, setSize] = useState(256);
  const [bgColor, setBgColor] = useState("#0f172a");
  const [fgColor, setFgColor] = useState("#ffffff");
  const [toast, setToast] = useState<string | null>(null);

  // Auto-hide toast
  React.useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(id);
  }, [toast]);

  // Only first line is used for barcode (avoids crazy width & newlines)
  const barcodeValue = (value.split("\n")[0] || "").trim() || " ";

  const handleDownload = () => {
    const id = mode === "qr" ? "qr-canvas" : "barcode-canvas";
    const canvas = document.getElementById(id) as HTMLCanvasElement | null;

    if (!canvas) return;

    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = mode === "qr" ? "qr-code.png" : "barcode.png";
    a.click();
    
    setToast(`🎉 ${mode === "qr" ? "QR Code" : "Barcode"} downloaded!`);
  };

  const handleShare = async () => {
    const id = mode === "qr" ? "qr-canvas" : "barcode-canvas";
    const canvas = document.getElementById(id) as HTMLCanvasElement | null;

    if (!canvas) return;

    try {
      // Convert canvas to blob
      canvas.toBlob(async (blob) => {
        if (!blob) return;

        const file = new File(
          [blob],
          mode === "qr" ? "qr-code.png" : "barcode.png",
          { type: "image/png" }
        );

        // Check if Web Share API is supported
        if (navigator.share && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: mode === "qr" ? "QR Code" : "Barcode",
            text: `Check out this ${mode === "qr" ? "QR code" : "barcode"} I generated!`,
          });
          setToast("✨ Shared successfully!");
        } else {
          // Fallback: copy to clipboard or show message
          setToast("⚠️ Sharing not supported on this device. Use download instead.");
        }
      });
    } catch (error) {
      console.error("Share failed:", error);
      setToast("❌ Share failed. Try downloading instead.");
    }
  };

  const helperText =
    mode === "qr"
      ? "Make sure links include https:// for best scanning behavior."
      : "Works best with product codes, numbers, or short IDs. Only the first line is used for the barcode.";

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-slate-950/20 dark:via-gray-950/20 dark:to-zinc-950/20 py-6 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header with Mascot */}
        <header className="flex items-center justify-between mb-5">
          <div>
            <h1 className="text-3xl font-black text-gray-800 dark:text-white mb-1">
              {mode === "qr" ? "📱 QR Code Generator" : "🏷️ Barcode Generator"}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Create scannable codes in seconds!
            </p>
          </div>
          {/* Cute Mascot */}
          <div className="text-7xl animate-bounce hidden sm:block" role="img" aria-label={mode === "qr" ? "Target emoji" : "Package emoji"}>
            {mode === "qr" ? "🎯" : "📦"}
          </div>
        </header>

        {/* Info Badge */}
        <section className="bg-slate-100 dark:bg-slate-900/30 border-2 border-slate-300 dark:border-slate-700 rounded-xl p-3 mb-4" aria-labelledby="features-badge">
          <h2 id="features-badge" className="sr-only">Generator Features</h2>
          <p className="text-xs text-slate-800 dark:text-slate-200 font-semibold">
            ✨ Features: <span className="font-bold">Custom Colors • Adjustable Size • Instant Download</span>
          </p>
        </section>

        {/* Main Card */}
        <main className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-5 border-3 border-slate-200 dark:border-slate-700">
          
          {/* Mode Switch */}
          <section className="mb-5" aria-labelledby="mode-section">
            <h2 id="mode-section" className="block text-base font-bold text-gray-800 dark:text-white mb-2">
              🎨 Choose Mode
            </h2>
            <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-xl" role="group" aria-label="Code type selection">
              <button
                onClick={() => setMode("qr")}
                aria-pressed={mode === "qr"}
                className={`py-2.5 px-4 rounded-lg text-sm font-bold transition-all ${
                  mode === "qr"
                    ? "bg-slate-600 text-white shadow-lg scale-105"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                <span className="text-lg" aria-hidden="true">📱</span> QR Code
              </button>

              <button
                onClick={() => setMode("barcode")}
                aria-pressed={mode === "barcode"}
                className={`py-2.5 px-4 rounded-lg text-sm font-bold transition-all ${
                  mode === "barcode"
                    ? "bg-slate-600 text-white shadow-lg scale-105"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                }`}
              >
                <span className="text-lg" aria-hidden="true">🏷️</span> Barcode
              </button>
            </div>
          </section>

          {/* Layout Section */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Controls */}
            <div className="flex-1 space-y-4">
              {/* Text Input */}
              <div>
                <label htmlFor="code-input" className="block text-base font-bold text-gray-800 dark:text-white mb-2">
                  ✍️ {mode === "qr" ? "Text or URL" : "Text or Code"}
                </label>

                <textarea
                  id="code-input"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  rows={3}
                  aria-describedby="input-help"
                  className="w-full bg-gray-50 dark:bg-gray-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-gray-800 dark:text-gray-100 resize-y font-mono focus:border-slate-500 dark:focus:border-slate-400 focus:ring-4 focus:ring-slate-200 dark:focus:ring-slate-900/50 transition-all"
                  placeholder={mode === "qr" ? "Enter any text, link, ID…" : "Enter product ID, SKU, or number…"}
                />

                <p id="input-help" className="text-xs text-gray-500 dark:text-gray-400 mt-2 flex items-start gap-1">
                  <span aria-hidden="true">💡</span>
                  <span>{helperText}</span>
                </p>
              </div>

              {/* Size Control */}
              <div className="p-4 bg-gray-50 dark:bg-gray-900/20 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                <label htmlFor="size-slider" className="block text-sm font-bold text-gray-800 dark:text-white mb-2">
                  📏 Size: {size}px
                </label>
                <input
                  id="size-slider"
                  type="range"
                  min={mode === "qr" ? 128 : 200}
                  max={mode === "qr" ? 512 : 600}
                  step={mode === "qr" ? 32 : 20}
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  aria-label={`Code size: ${size} pixels`}
                  className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-full appearance-none cursor-pointer accent-slate-500"
                />
              </div>

              {/* Color Controls */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-zinc-50 dark:bg-zinc-900/20 rounded-xl border-2 border-zinc-200 dark:border-zinc-700">
                  <label htmlFor="fg-color" className="block text-xs font-bold text-gray-800 dark:text-white mb-2">
                    🎨 Foreground
                  </label>
                  <input
                    id="fg-color"
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    aria-label="Foreground color"
                    className="w-full h-10 rounded-lg cursor-pointer border-2 border-zinc-300 dark:border-zinc-600"
                  />
                </div>

                <div className="p-3 bg-zinc-50 dark:bg-zinc-900/20 rounded-xl border-2 border-zinc-200 dark:border-zinc-700">
                  <label htmlFor="bg-color" className="block text-xs font-bold text-gray-800 dark:text-white mb-2">
                    🖼️ Background
                  </label>
                  <input
                    id="bg-color"
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    aria-label="Background color"
                    className="w-full h-10 rounded-lg cursor-pointer border-2 border-zinc-300 dark:border-zinc-600"
                  />
                </div>
              </div>

              {/* Download & Share Buttons */}
              <div className="grid grid-cols-2 gap-3" role="group" aria-label="Code actions">
                <button
                  onClick={handleDownload}
                  disabled={!value.trim()}
                  aria-label={`Download ${mode === "qr" ? "QR code" : "barcode"} as PNG`}
                  className={`py-3 px-4 rounded-xl font-black text-sm shadow-2xl transition-all ${
                    !value.trim()
                      ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      : 'bg-linear-to-r from-slate-600 to-gray-700 text-white hover:scale-105 hover:shadow-slate-500/50 active:scale-95'
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    <span aria-hidden="true">⬇️</span> Download
                  </span>
                </button>

                <button
                  onClick={handleShare}
                  disabled={!value.trim()}
                  aria-label={`Share ${mode === "qr" ? "QR code" : "barcode"}`}
                  className={`py-3 px-4 rounded-xl font-black text-sm shadow-2xl transition-all ${
                    !value.trim()
                      ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      : 'bg-linear-to-r from-gray-600 to-zinc-700 text-white hover:scale-105 hover:shadow-gray-500/50 active:scale-95'
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    <span aria-hidden="true">📤</span> Share
                  </span>
                </button>
              </div>
            </div>

            {/* Right Preview */}
            <div className="flex-1 flex items-center justify-center">
              <div className="bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 border-3 border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-xl w-full" role="region" aria-label="Code preview">
                <div className="flex items-center justify-center min-h-[280px]">
                  {mode === "qr" ? (
                    <div className="bg-white p-3 rounded-xl shadow-lg">
                      <QRCodeCanvas
                        id="qr-canvas"
                        value={value || " "}
                        size={size}
                        bgColor={bgColor}
                        fgColor={fgColor}
                        includeMargin={true}
                        level="H"
                      />
                    </div>
                  ) : (
                    <div className="w-full max-w-md overflow-x-auto bg-white p-4 rounded-xl shadow-lg">
                      <div className="min-w-max flex justify-center">
                        <Barcode
                          id="barcode-canvas"
                          value={barcodeValue}
                          renderer="canvas"
                          width={2}
                          height={size / 3}
                          background={bgColor}
                          lineColor={fgColor}
                          displayValue={true}
                          fontSize={14}
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                <p className="text-xs text-center text-gray-600 dark:text-gray-400 mt-4 font-semibold">
                  📱 Scan with your phone to test!
                </p>
              </div>
            </div>
          </div>
        </main>

        {/* Toast Notification */}
        {toast && (
          <div className="fixed bottom-4 right-4 bg-slate-600 text-white px-4 py-3 rounded-xl shadow-2xl font-bold text-sm flex items-center gap-2 animate-bounce z-50" role="alert" aria-live="polite">
            {toast}
          </div>
        )}

        {/* SEO Content Section */}
        <section className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border-2 border-gray-200 dark:border-gray-700" aria-labelledby="seo-content">
          <h2 id="seo-content" className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Free QR Code & Barcode Generator
          </h2>
          
          <div className="space-y-4 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            <p>
              Create custom QR codes and barcodes instantly with our free online generator. Perfect for sharing 
              URLs, contact information, product codes, and more. Customize colors and sizes to match your brand.
            </p>

            <h3 className="text-lg font-bold text-gray-800 dark:text-white mt-6 mb-3">
              QR Code Generator Features
            </h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Instant generation:</strong> Create QR codes in seconds</li>
              <li><strong>Custom colors:</strong> Match your brand or design</li>
              <li><strong>Adjustable size:</strong> Generate codes from 128px to 512px</li>
              <li><strong>High quality:</strong> Download as PNG with error correction</li>
              <li><strong>Share directly:</strong> Use the Web Share API on supported devices</li>
            </ul>

            <h3 className="text-lg font-bold text-gray-800 dark:text-white mt-6 mb-3">
              Barcode Generator Features
            </h3>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Standard format:</strong> CODE128 barcode generation</li>
              <li><strong>Product codes:</strong> Perfect for SKUs, product IDs, and inventory</li>
              <li><strong>Customizable:</strong> Adjust colors and dimensions</li>
              <li><strong>Scannable:</strong> High-quality output for reliable scanning</li>
            </ul>

            <h3 className="text-lg font-bold text-gray-800 dark:text-white mt-6 mb-3">
              Use Cases
            </h3>
            <p>
              QR codes are perfect for sharing website URLs, WiFi passwords, contact cards, event invitations, 
              product information, and payment links. Barcodes are ideal for inventory management, product labeling, 
              retail pricing, and shipping labels.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}