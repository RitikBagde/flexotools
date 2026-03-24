"use client";

import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import Barcode from "react-barcode";
import { generateFAQSchema, type FAQItem } from "@/lib/seo";
import { HelpCircle, Link2, Wifi, Image, Share2, DownloadCloud, BadgeDollarSign, ChevronDown } from "lucide-react";

type Mode = "qr" | "barcode";

export default function QrBarcodeGenerator() {
  const [mode, setMode] = useState<Mode>("qr");
  const [value, setValue] = useState("https://");
  const [size, setSize] = useState(256);
  const [bgColor, setBgColor] = useState("#0f172a");
  const [fgColor, setFgColor] = useState("#ffffff");
  const [toast, setToast] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  const faqs: FAQItem[] = [
    {
      question: "What's the difference between QR codes and barcodes?",
      answer:
        "QR codes are 2D square codes that can store more information (URLs, text, contact info) and can be scanned from any angle. Barcodes are 1D linear codes typically used for product identification.",
    },
    {
      question: "Are the codes I create permanent?",
      answer:
        "Yes — once you download a code the image is static and contains the data directly. They do not expire unless you delete the image.",
    },
    {
      question: "Can I use custom colors for branding?",
      answer:
        "Absolutely. Ensure sufficient contrast — dark foreground on a light background is the most reliable for scanning.",
    },
    {
      question: "What size should I use for printing?",
      answer:
        "For business cards and small prints, 256–384px works well. For posters, 512px is a good starting point. Barcodes depend on scanner distance — increase width and height for farther distances.",
    },
    {
      question: "Can smartphones scan these codes?",
      answer:
        "Modern smartphones can scan QR codes directly from the camera app. Barcodes may require a dedicated scanner app or POS system.",
    },
    {
      question: "Is this tool really free?",
      answer:
        "Yes — generate unlimited codes in your browser with no signup and no watermarks.",
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

  const barcodeValue = (value.split("\n")[0] || "").trim() || " ";

  function handleDownload() {
    const id = mode === "qr" ? "qr-canvas" : "barcode-canvas";
    const canvas = document.getElementById(id) as HTMLCanvasElement | null;

    if (!canvas) return setToast("❌ Canvas not found");

    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = mode === "qr" ? "qr-code.png" : "barcode.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setToast(`🎉 ${mode === "qr" ? "QR Code" : "Barcode"} downloaded!`);
    setShowCelebration(true);
  }

  async function handleShare() {
    const id = mode === "qr" ? "qr-canvas" : "barcode-canvas";
    const canvas = document.getElementById(id) as HTMLCanvasElement | null;

    if (!canvas) return setToast("❌ Canvas not found");

    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return setToast("❌ Failed to create image");

        const file = new File(
          [blob],
          mode === "qr" ? "qr-code.png" : "barcode.png",
          { type: "image/png" }
        );

        if ((navigator as any).share && (navigator as any).canShare && (navigator as any).canShare({ files: [file] })) {
          try {
            await (navigator as any).share({
              files: [file],
              title: mode === "qr" ? "QR Code" : "Barcode",
              text: `Check out this ${mode === "qr" ? "QR code" : "barcode"} I generated!`,
            });
            setToast("✨ Shared successfully!");
            setShowCelebration(true);
          } catch (err) {
            console.error("Share failed:", err);
            setToast("❌ Share canceled or failed.");
          }
        } else if (navigator.clipboard && (navigator.clipboard as any).write) {
          try {
            const clipboardItem = new (window as any).ClipboardItem({ [file.type]: blob });
            await (navigator.clipboard as any).write([clipboardItem]);
            setToast("📋 Image copied to clipboard");
          } catch (err) {
            setToast("⚠️ Sharing not supported on this device. Use download instead.");
          }
        } else {
          setToast("⚠️ Sharing not supported on this device. Use download instead.");
        }
      });
    } catch (error) {
      console.error("Share failed:", error);
      setToast("❌ Share failed. Try downloading instead.");
    }
  }

  const helperText =
    mode === "qr"
      ? "Make sure links include https:// for best scanning behavior."
      : "Works best with product codes, numbers, or short IDs. Only the first line is used for the barcode.";

  const faqIcons = [Link2, Wifi, Image, DownloadCloud, Share2, BadgeDollarSign];

  return (
    <>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="min-h-screen bg-linear-to-br from-slate-50 via-gray-50 to-zinc-50 dark:from-slate-950/20 dark:via-gray-950/20 dark:to-zinc-950/20 py-6 px-4">
        <main className="max-w-3xl mx-auto">

          <header className="flex items-center justify-between mb-5">
            <div>
              <h1 className="text-3xl font-black text-foreground mb-1">
                {mode === "qr" ? "📱 QR Code Generator" : "🏷️ Barcode Generator"}
              </h1>
              <p className="text-sm text-foreground/70">
                Create scannable codes in seconds!
              </p>
            </div>
            <div className="text-7xl animate-bounce hidden sm:block" role="img" aria-label={mode === "qr" ? "Target emoji" : "Package emoji"}>
              {mode === "qr" ? "🎯" : "📦"}
            </div>
          </header>

          <section className="bg-slate-100 dark:bg-slate-900/30 border-2 border-slate-300 dark:border-slate-700 rounded-xl p-3 mb-4">
            <p className="text-xs text-slate-900 dark:text-slate-200 font-semibold">
              ✨ Features: <span className="font-bold">Custom Colors • Adjustable Size • Instant Download • Web Share</span>
            </p>
          </section>

          <article className="bg-background rounded-2xl shadow-2xl p-5 border-2 border-slate-200 dark:border-slate-700">

            <section className="mb-5">
              <h2 className="block text-base font-bold text-foreground mb-2">🎨 Choose Mode</h2>
              <div className="grid grid-cols-2 gap-2 p-1 bg-foreground/5 rounded-xl" role="group" aria-label="Code type selection">
                {(["qr", "barcode"] as Mode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    aria-pressed={mode === m}
                    className={`py-2.5 px-4 rounded-lg text-sm font-bold transition-all ${
                      mode === m
                        ? "bg-slate-600 text-white shadow-lg scale-105"
                        : "text-foreground/70 hover:bg-foreground/10"
                    }`}
                  >
                    <span className="text-lg" aria-hidden="true">{m === "qr" ? "📱" : "🏷️"}</span>{" "}
                    {m === "qr" ? "QR Code" : "Barcode"}
                  </button>
                ))}
              </div>
            </section>

            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1 space-y-4">

                <div>
                  <label htmlFor="code-input" className="block text-base font-bold text-foreground mb-2">
                    ✍️ {mode === "qr" ? "Text or URL" : "Text or Code"}
                  </label>
                  <textarea
                    id="code-input"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    rows={3}
                    aria-describedby="input-help"
                    className="w-full bg-foreground/5 border-2 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm text-foreground resize-y font-mono focus:border-slate-500 focus:ring-4 focus:ring-slate-200 dark:focus:ring-slate-900/50 transition-all"
                    placeholder={mode === "qr" ? "Enter any text, link, ID…" : "Enter product ID, SKU, or number…"}
                  />
                  <p id="input-help" className="text-xs text-foreground/50 mt-2 flex items-start gap-1">
                    <span aria-hidden="true">💡</span>
                    <span>{helperText}</span>
                  </p>
                </div>

                <div className="p-4 bg-foreground/5 rounded-xl border-2 border-foreground/10">
                  <label htmlFor="size-slider" className="block text-sm font-bold text-foreground mb-2">
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
                    className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-slate-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: "fg-color", label: "🎨 Foreground", value: fgColor, setter: setFgColor },
                    { id: "bg-color", label: "🖼️ Background", value: bgColor, setter: setBgColor },
                  ].map(({ id, label, value: colorVal, setter }) => (
                    <div key={id} className="p-3 bg-foreground/5 rounded-xl border-2 border-foreground/10">
                      <label htmlFor={id} className="block text-xs font-bold text-foreground mb-2">{label}</label>
                      <input
                        id={id}
                        type="color"
                        value={colorVal}
                        onChange={(e) => setter(e.target.value)}
                        className="w-full h-10 rounded-lg cursor-pointer border-2 border-foreground/20"
                      />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3" role="group" aria-label="Code actions">
                  <button
                    onClick={handleDownload}
                    disabled={!value.trim()}
                    aria-label={`Download ${mode === "qr" ? "QR code" : "barcode"} as PNG`}
                    className={`py-3 px-4 rounded-xl font-black text-sm shadow-2xl transition-all ${
                      !value.trim()
                        ? "bg-foreground/10 text-foreground/30 cursor-not-allowed"
                        : "bg-linear-to-r from-slate-600 to-gray-700 text-white hover:scale-105 hover:shadow-slate-500/50 active:scale-95"
                    }`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <DownloadCloud className="w-4 h-4 inline" /> <span>Download</span>
                    </span>
                  </button>

                  <button
                    onClick={handleShare}
                    disabled={!value.trim()}
                    aria-label={`Share ${mode === "qr" ? "QR code" : "barcode"}`}
                    className={`py-3 px-4 rounded-xl font-black text-sm shadow-2xl transition-all ${
                      !value.trim()
                        ? "bg-foreground/10 text-foreground/30 cursor-not-allowed"
                        : "bg-linear-to-r from-gray-600 to-zinc-700 text-white hover:scale-105 hover:shadow-gray-500/50 active:scale-95"
                    }`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      <Share2 className="w-4 h-4 inline" /> <span>Share</span>
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex-1 flex items-center justify-center">
                <div className="bg-linear-to-br from-foreground/5 to-foreground/10 border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-xl w-full" role="region" aria-label="Code preview">
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
                  <p className="text-xs text-center text-foreground/60 mt-4 font-semibold">
                    📱 Scan with your phone to test!
                  </p>
                </div>
              </div>
            </div>
          </article>

          <section className="mt-8 bg-background rounded-2xl shadow-xl p-6 border-2 border-foreground/10">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Free QR Code & Barcode Generator — Create Custom Scannable Codes
            </h2>
            <div className="space-y-4 text-foreground/70">
              <p>
                Create custom QR codes and barcodes instantly with our free online generator. Perfect for sharing
                URLs, contact information, WiFi passwords, product codes, inventory management, and more. Customize
                colors and sizes to match your brand identity.
              </p>
              <h3 className="text-xl font-bold text-foreground mt-6 mb-3">Key Features</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Instant generation:</strong> Create QR codes and barcodes in seconds</li>
                <li><strong>Fully customizable:</strong> Adjust colors and sizes to match your needs</li>
                <li><strong>High quality:</strong> Download as PNG with optimal scanning reliability</li>
                <li><strong>Web Share support:</strong> Easily share codes on supported devices</li>
                <li><strong>No registration:</strong> Start creating immediately, no account needed</li>
                <li><strong>Free and unlimited:</strong> Generate as many codes as you need</li>
              </ul>
              <h3 className="text-xl font-bold text-foreground mt-6 mb-3">Common Use Cases</h3>
              <p>
                QR codes are perfect for website URLs, WiFi credentials, contact information, event tickets,
                payment links, and social media profiles. Barcodes are ideal for product SKUs, inventory tracking,
                retail pricing, shipping labels, and asset management.
              </p>
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
                      <Icon className="w-5 h-5 text-slate-500 shrink-0" />
                      {faq.question}
                    </span>
                    <ChevronDown className="w-5 h-5 text-slate-500 group-open:rotate-180 transition-transform shrink-0" />
                  </summary>
                  <p className="mt-3 text-sm text-foreground/70 leading-relaxed">{faq.answer}</p>
                </details>
              );
            })}

            <div className="mt-6 p-4 bg-slate-50 dark:bg-slate-900/20 rounded-xl border-2 border-slate-200 dark:border-slate-700">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-200">
                💡 <strong>Pro Tip:</strong> For URLs, always include `https://` so scanning devices open links reliably.
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
          <div className="fixed bottom-4 right-4 bg-slate-600 text-white px-4 py-3 rounded-xl shadow-2xl font-bold text-sm flex items-center gap-2 animate-bounce z-50" role="alert" aria-live="polite">
            <span aria-hidden="true">✨</span>
            {toast}
          </div>
        )}
      </div>
    </>
  );
}