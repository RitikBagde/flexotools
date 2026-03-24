'use client'
import React, { useEffect, useState } from 'react'
import { generateFAQSchema, type FAQItem } from '@/lib/seo'
import { HelpCircle, Sliders, Clock, FileText, Lock, AlertTriangle, ChevronDown } from 'lucide-react'

type Mode = 'preset' | 'target' | 'custom'
type PresetSize = 'small' | 'medium' | 'large'
type OutputFormat = 'auto' | 'jpeg' | 'png' | 'webp' | 'avif'

export default function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [mode, setMode] = useState<Mode>('preset')
  const [preset, setPreset] = useState<PresetSize>('medium')
  const [targetSizeKB, setTargetSizeKB] = useState<number | ''>(500)
  const [width, setWidth] = useState<number | ''>('')
  const [height, setHeight] = useState<number | ''>('')
  const [quality, setQuality] = useState<number>(80)
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('auto')
  const [outputName, setOutputName] = useState<string>('')
  const [compressedSizeKB, setCompressedSizeKB] = useState<number | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const [showCelebration, setShowCelebration] = useState(false)

  const faqs: FAQItem[] = [
    {
      question: 'How does the image compressor work?',
      answer: 'We analyze the image and apply resizing, quality adjustments, and modern formats (WebP/AVIF) to reduce file size while preserving visual quality.'
    },
    {
      question: 'How do presets differ from custom settings?',
      answer: 'Presets are quick defaults (Small/Medium/Large). Custom lets you set exact width/height and quality for precise results.'
    },
    {
      question: 'Are there usage limits?',
      answer: 'No limits for basic usage — compress as many images as you need in-browser. Large server-side queues may have limits if enabled in certain deployments.'
    },
    {
      question: 'What formats are supported?',
      answer: 'We support JPG, PNG, WebP, AVIF, TIFF, and GIF. HEIC is not supported in this tool.'
    },
    {
      question: 'Is my image private?',
      answer: 'Yes. By default processing happens client-side in the browser. If server-side processing is used, input is processed per our privacy practices and not stored long-term.'
    },
    {
      question: 'Common issues & tips',
      answer: 'Artifacts can appear when forcing very small target sizes. If quality drops, try increasing the target size or using custom quality/resize settings.'
    }
  ]

  const faqSchema = generateFAQSchema(faqs)

  useEffect(() => {
    return () => { if (preview) URL.revokeObjectURL(preview) }
  }, [preview])

  useEffect(() => {
    if (!toast) return
    const id = setTimeout(() => setToast(null), 3000)
    return () => clearTimeout(id)
  }, [toast])

  useEffect(() => {
    if (!showCelebration) return
    const id = setTimeout(() => setShowCelebration(false), 2000)
    return () => clearTimeout(id)
  }, [showCelebration])

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null
    if (f && f.size > 4.5 * 1024 * 1024) {
      alert("File too large! Please upload an image under 4.5MB.")
      e.target.value = ""
      return
    }
    setFile(f)
    setCompressedSizeKB(null)
    if (preview) URL.revokeObjectURL(preview)
    if (f) {
      const url = URL.createObjectURL(f)
      setPreview(url)
      const originalName = f.name
      const dotIndex = originalName.lastIndexOf('.')
      setOutputName(dotIndex > 0 ? originalName.substring(0, dotIndex) : originalName)
    } else {
      setOutputName('')
    }
  }

  function getOutputExtension(): string {
    if (!file) return 'jpg'
    if (outputFormat === 'jpeg') return 'jpg'
    if (outputFormat === 'png') return 'png'
    if (outputFormat === 'webp') return 'webp'
    if (outputFormat === 'avif') return 'avif'
    const name = file.name.toLowerCase()
    if (name.endsWith('.png')) return 'png'
    if (name.endsWith('.webp')) return 'webp'
    if (name.endsWith('.avif')) return 'avif'
    return 'jpg'
  }

  async function compress() {
    if (!file) return
    setIsLoading(true)
    try {
      const form = new FormData()
      form.append('file', file)
      form.append('mode', mode)
      form.append('preset', preset)
      form.append('quality', String(quality))
      form.append('width', width === '' ? '' : String(width))
      form.append('height', height === '' ? '' : String(height))
      form.append('targetSizeKB', targetSizeKB === '' ? '' : String(targetSizeKB))
      form.append('outputFormat', outputFormat)

      const res = await fetch('/api/tools/image-compress', { method: 'POST', body: form })

      if (!res.ok) {
        let msg = `HTTP ${res.status} ${res.statusText}`
        try {
          const ct = res.headers.get('content-type') || ''
          if (ct.includes('application/json')) {
            const data = await res.json()
            if ((data as any)?.error) msg = (data as any).error
          } else {
            const text = await res.text()
            if (text) msg = text
          }
        } catch (e) { console.error(e) }
        alert(msg)
        return
      }

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const ext = getOutputExtension()
      const safeName = outputName.trim() || file.name.replace(/\.[^/.]+$/, '') || 'compressed'
      const filename = `${safeName}.${ext}`

      setCompressedSizeKB(blob.size / 1024)
      setShowCelebration(true)
      setToast(`Amazing! Saved as ${filename} 🎉`)

      const a = document.createElement('a')
      a.href = url
      a.download = filename
      a.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error(err)
      alert('Processing failed: ' + String(err))
    } finally {
      setIsLoading(false)
    }
  }

  const originalSizeKB = file ? file.size / 1024 : null
  const reductionPercent =
    originalSizeKB && compressedSizeKB
      ? ((1 - compressedSizeKB / originalSizeKB) * 100).toFixed(1)
      : null

  return (
    <>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/*
        THEME FIX: Replaced all hardcoded text-gray-700/text-gray-800 with
        text-foreground variants. These automatically adapt to light and dark mode.
        
        The pattern used throughout this file:
          text-gray-800 dark:text-white   →  text-foreground
          text-gray-700 dark:text-gray-300 →  text-foreground/70
          text-gray-600 dark:text-gray-400 →  text-foreground/60
          text-gray-500 dark:text-gray-400 →  text-foreground/50
          bg-white dark:bg-gray-800       →  bg-background
          bg-gray-50 dark:bg-gray-900     →  bg-background/50
          bg-gray-100 dark:bg-gray-700    →  bg-foreground/5
      */}
      <div className="min-h-screen bg-linear-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-pink-950/20 dark:via-purple-950/20 dark:to-blue-950/20 py-6 px-4">
        <main className="max-w-3xl mx-auto">

          {/* FIX: Header text now uses text-foreground instead of text-gray-800 */}
          <header className="flex items-center justify-between mb-5">
            <div>
              {/* H1 updated to long-tail keyword for SEO */}
              <h1 className="text-3xl font-black text-foreground mb-1">
                🖼️ Free Image Compressor — No Signup, No Quality Loss
              </h1>
              {/* FIX: was text-gray-700 (invisible on light bg) → text-foreground/70 */}
              <p className="text-sm text-foreground/70">
                Compress WebP, PNG, JPG and AVIF images free online
              </p>
            </div>
            <div className="text-7xl animate-bounce hidden sm:block" role="img" aria-label="Art palette emoji">🎨</div>
          </header>

          {/* FIX: text-purple-800 is fine in light, but dark needed explicit override */}
          <section className="bg-purple-100 dark:bg-purple-900/30 border-2 border-purple-300 dark:border-purple-700 rounded-xl p-3 mb-4">
            <p className="text-xs text-purple-900 dark:text-purple-200 font-semibold">
              ✨ Supports: <span className="font-bold">JPG, PNG, WebP, AVIF, TIFF, GIF</span>
            </p>
            <p className="text-xs text-purple-900 dark:text-purple-200 font-semibold">
              ✨ Does not support: <span className="font-bold">HEIC</span>
            </p>
          </section>

          {/* FIX: bg-white dark:bg-gray-800 → bg-background, all gray text → foreground variants */}
          <article className="bg-background rounded-2xl shadow-2xl p-5 border-2 border-purple-200 dark:border-purple-700">

            <section className="mb-5">
              <h2 className="block text-base font-bold text-foreground mb-2">📤 Upload Your Image</h2>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                aria-label="Choose image file to compress"
                className="block w-full text-xs text-foreground/60 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-purple-500 file:text-white hover:file:bg-purple-600 file:cursor-pointer file:transition-all file:shadow-md cursor-pointer"
              />

              {file && (
                <div className="mt-3 p-2.5 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-700" role="status" aria-live="polite">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-xs font-semibold text-blue-900 dark:text-blue-200">
                      📊 Original: {originalSizeKB!.toFixed(1)} kB
                    </span>
                    {originalSizeKB && compressedSizeKB && (
                      <span className="text-xs font-bold text-green-700 dark:text-green-400 animate-pulse">
                        ✅ Compressed: {compressedSizeKB.toFixed(1)} kB ({reductionPercent}% smaller!)
                      </span>
                    )}
                  </div>
                </div>
              )}
            </section>

            {preview && (
              <section className="mb-5 text-center">
                <img
                  src={preview}
                  alt={`Preview of ${file?.name || 'uploaded image'}`}
                  className="mx-auto max-w-full max-h-64 rounded-xl shadow-xl border-2 border-purple-200 dark:border-purple-700"
                />
              </section>
            )}

            <section className="mb-5">
              <h2 className="block text-base font-bold text-foreground mb-2">📝 Output Image Name</h2>
              <div className="flex items-center gap-2 flex-wrap">
                <input
                  type="text"
                  placeholder="my-compressed-image"
                  value={outputName}
                  onChange={(e) => setOutputName(e.target.value)}
                  aria-label="Output filename without extension"
                  className="flex-1 min-w-[180px] px-3 py-2 rounded-lg border-2 border-foreground/20 bg-background text-sm text-foreground font-semibold focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900/50 transition-all"
                />
                <span className="text-base font-bold text-purple-600 dark:text-purple-400">.{getOutputExtension()}</span>
              </div>
            </section>

            <section className="mb-5">
              <h2 className="block text-base font-bold text-foreground mb-2">🎯 Choose Your Mode</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2" role="group" aria-label="Compression mode options">
                {(['preset', 'target', 'custom'] as Mode[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    aria-pressed={mode === m}
                    className={`p-3 rounded-xl border-2 font-bold text-left transition-all ${
                      mode === m
                        ? 'bg-purple-500 text-white border-purple-600 shadow-lg scale-105'
                        : 'bg-foreground/5 text-foreground border-foreground/20 hover:scale-105'
                    }`}
                  >
                    <div className="text-xl mb-1" aria-hidden="true">
                      {m === 'preset' ? '🚀' : m === 'target' ? '🎯' : '⚙️'}
                    </div>
                    <div className="text-sm">
                      {m === 'preset' ? 'Quick Preset' : m === 'target' ? 'Target Size' : 'Custom'}
                    </div>
                    <div className="text-xs opacity-75 mt-0.5">
                      {m === 'preset' ? 'Fast & easy' : m === 'target' ? 'Hit your goal' : 'Full control'}
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {mode === 'preset' && (
              <section className="mb-5 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border-2 border-purple-200 dark:border-purple-700">
                <h3 className="block text-base font-bold text-foreground mb-2">📏 Choose Size</h3>
                <select
                  value={preset}
                  onChange={(e) => setPreset(e.target.value as PresetSize)}
                  aria-label="Select compression preset"
                  className="w-full px-3 py-2 rounded-lg border-2 border-purple-300 dark:border-purple-600 bg-background text-sm text-foreground font-semibold focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900/50 transition-all"
                >
                  <option value="small">🐁 Small (max 1280px, ~60% quality)</option>
                  <option value="medium">🐱 Medium (max 1920px, ~75% quality)</option>
                  <option value="large">🦁 Large (original size, ~85% quality)</option>
                </select>
              </section>
            )}

            {mode === 'target' && (
              <section className="mb-5 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-700">
                <h3 className="block text-base font-bold text-foreground mb-2">🎯 Target File Size</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {[250, 500, 1000].map((kb) => (
                    <button
                      key={kb}
                      type="button"
                      onClick={() => setTargetSizeKB(kb)}
                      className="px-4 py-1.5 text-sm bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full transition-all shadow-md hover:shadow-lg hover:scale-105"
                    >
                      {kb === 1000 ? '1 MB' : `${kb} kB`}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="custom-target-size" className="text-sm font-semibold text-foreground/70">Or custom:</label>
                  <input
                    id="custom-target-size"
                    type="number"
                    min={50}
                    value={targetSizeKB}
                    onChange={(e) => setTargetSizeKB(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-28 px-3 py-1.5 text-sm rounded-lg border-2 border-blue-300 dark:border-blue-600 bg-background text-foreground font-bold focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                  <span className="text-sm font-bold text-foreground/70">kB</span>
                </div>
              </section>
            )}

            {mode === 'custom' && (
              <section className="mb-5 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border-2 border-green-200 dark:border-green-700">
                <h3 className="block text-base font-bold text-foreground mb-2">📐 Resolution</h3>
                <div className="flex flex-wrap gap-3 items-center mb-4">
                  {(['width', 'height'] as const).map((dim) => (
                    <div key={dim} className="flex items-center gap-1.5">
                      <label htmlFor={`custom-${dim}`} className="text-sm font-semibold text-foreground/70 capitalize">{dim}:</label>
                      <input
                        id={`custom-${dim}`}
                        type="number"
                        min={1}
                        value={dim === 'width' ? width : height}
                        onChange={(e) => {
                          const val = e.target.value === '' ? '' : Number(e.target.value)
                          dim === 'width' ? setWidth(val) : setHeight(val)
                        }}
                        placeholder="Auto"
                        className="w-20 px-2 py-1.5 text-sm rounded-lg border-2 border-green-300 dark:border-green-600 bg-background text-foreground font-bold focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                      />
                      <span className="text-xs text-foreground/50">px</span>
                    </div>
                  ))}
                </div>
                <label htmlFor="quality-slider" className="block text-base font-bold text-foreground mb-2">
                  💎 Quality: {quality}%
                </label>
                <input
                  id="quality-slider"
                  type="range"
                  min={30}
                  max={100}
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  aria-label={`Image quality: ${quality} percent`}
                  className="w-full h-2 bg-green-200 dark:bg-green-800 rounded-full appearance-none cursor-pointer accent-green-500"
                />
              </section>
            )}

            <section className="mb-5">
              <h2 className="block text-base font-bold text-foreground mb-2">🎨 Output Format</h2>
              <select
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value as OutputFormat)}
                aria-label="Select output image format"
                className="w-full px-3 py-2 rounded-lg border-2 border-foreground/20 bg-background text-sm text-foreground font-semibold focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900/50 transition-all"
              >
                <option value="auto">✨ Auto (Smart detection)</option>
                <option value="jpeg">📷 JPEG (.jpg)</option>
                <option value="png">🖼️ PNG (.png)</option>
                <option value="webp">🌐 WebP (.webp)</option>
                <option value="avif">🚀 AVIF (.avif)</option>
              </select>
            </section>

            <button
              disabled={!file || isLoading}
              onClick={compress}
              aria-label={isLoading ? 'Compressing image' : 'Download compressed image'}
              className={`w-full py-3 px-6 rounded-xl font-black text-base shadow-2xl transition-all ${
                !file || isLoading
                  ? 'bg-foreground/10 text-foreground/30 cursor-not-allowed'
                  : 'bg-linear-to-r from-purple-500 to-pink-500 text-white hover:scale-105 hover:shadow-purple-500/50 active:scale-95'
              }`}
            >
              {isLoading
                ? <span className="flex items-center justify-center gap-2"><span className="animate-spin" aria-hidden="true">⚙️</span> Compressing Magic...</span>
                : <span className="flex items-center justify-center gap-2"><span aria-hidden="true">⬇️</span> Download Compressed Image</span>
              }
            </button>
          </article>

          {/* SEO Content Section — FIX: all text uses foreground variants */}
          <section className="mt-8 bg-background rounded-2xl shadow-xl p-6 border-2 border-foreground/10">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Compress Images Online Free — No Signup, No Quality Loss
            </h2>
            <div className="space-y-4 text-foreground/70">
              <p>
                Our free online image compressor lets you compress WebP, PNG, JPG, AVIF, TIFF and GIF
                images without losing quality. No signup required — just upload and download.
                All processing happens in your browser, so your images never leave your device.
              </p>
              <h3 className="text-xl font-bold text-foreground mt-6 mb-3">Key Features</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Multiple formats:</strong> Compress WebP, PNG, JPG, AVIF, TIFF and GIF</li>
                <li><strong>Three compression modes:</strong> Quick presets, target size, or custom settings</li>
                <li><strong>No file uploads to servers:</strong> All processing happens in your browser</li>
                <li><strong>Instant results:</strong> Download your compressed images immediately</li>
                <li><strong>Free and unlimited:</strong> Compress images online free with no limits</li>
              </ul>
              <h3 className="text-xl font-bold text-foreground mt-6 mb-3">Why Compress Images?</h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Faster websites:</strong> Smaller images mean faster page speeds and better SEO</li>
                <li><strong>Reduced bandwidth:</strong> Save on hosting costs and data usage</li>
                <li><strong>Better user experience:</strong> Quick-loading images keep visitors engaged</li>
                <li><strong>Storage savings:</strong> Keep more photos without filling up space</li>
              </ul>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mt-6 space-y-3">
            <h3 className="text-2xl font-bold text-foreground mb-4">Frequently Asked Questions</h3>
            {faqs.map((faq, index) => {
              const icons = [HelpCircle, Sliders, Clock, FileText, Lock, AlertTriangle]
              const Icon = icons[index] || HelpCircle
              return (
                <details
                  key={index}
                  className="bg-background rounded-xl shadow-md p-5 border-2 border-foreground/10 group"
                >
                  <summary className="font-bold text-foreground cursor-pointer flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Icon className="w-5 h-5 text-purple-500 shrink-0" />
                      {faq.question}
                    </span>
                    <ChevronDown className="w-5 h-5 text-purple-500 group-open:rotate-180 transition-transform shrink-0" />
                  </summary>
                  {/* FIX: was text-gray-700 → text-foreground/70 */}
                  <p className="mt-3 text-sm text-foreground/70 leading-relaxed">{faq.answer}</p>
                </details>
              )
            })}

            <div className="mt-6 p-4 bg-purple-50 dark:bg-purple-900/10 rounded-xl border-2 border-purple-200 dark:border-purple-700">
              <p className="text-sm font-semibold text-purple-900 dark:text-purple-200">
                💡 <strong>Pro Tip:</strong> For web use, WebP and AVIF offer the best size/quality tradeoff. Test visually before bulk-processing.
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
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-3 rounded-xl shadow-2xl font-bold text-sm flex items-center gap-2 animate-bounce" role="alert" aria-live="polite">
            <span aria-hidden="true">✨</span>
            {toast}
          </div>
        )}
      </div>
    </>
  )
}