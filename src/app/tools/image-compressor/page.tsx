'use client'
import React, { useEffect, useState } from 'react'
import Head from 'next/head'

type Mode = 'preset' | 'target' | 'custom'
type PresetSize = 'small' | 'medium' | 'large'
type OutputFormat = 'auto' | 'jpeg' | 'png' | 'webp' | 'avif'

export default function ImageCompressor() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // options
  const [mode, setMode] = useState<Mode>('preset')
  const [preset, setPreset] = useState<PresetSize>('medium')
  const [targetSizeKB, setTargetSizeKB] = useState<number | ''>(500)
  const [width, setWidth] = useState<number | ''>('')
  const [height, setHeight] = useState<number | ''>('')
  const [quality, setQuality] = useState<number>(80)
  const [outputFormat, setOutputFormat] = useState<OutputFormat>('auto')

  // editable output name (without extension)
  const [outputName, setOutputName] = useState<string>('')

  // new: track compressed size + toast
  const [compressedSizeKB, setCompressedSizeKB] = useState<number | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const [showCelebration, setShowCelebration] = useState(false)

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview)
    }
  }, [preview])

  // auto-hide toast
  useEffect(() => {
    if (!toast) return
    const id = setTimeout(() => setToast(null), 3000)
    return () => clearTimeout(id)
  }, [toast])

  // celebration animation
  useEffect(() => {
    if (!showCelebration) return
    const id = setTimeout(() => setShowCelebration(false), 2000)
    return () => clearTimeout(id)
  }, [showCelebration])

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null
    setFile(f)
    setCompressedSizeKB(null)

    if (preview) URL.revokeObjectURL(preview)

    if (f) {
      const url = URL.createObjectURL(f)
      setPreview(url)

      const originalName = f.name
      const dotIndex = originalName.lastIndexOf('.')
      if (dotIndex > 0) {
        setOutputName(originalName.substring(0, dotIndex))
      } else {
        setOutputName(originalName)
      }
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
    if (name.endsWith('.gif')) return 'jpg'
    if (name.endsWith('.tif') || name.endsWith('.tiff')) return 'jpg'

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

      const res = await fetch('/api/tools/image-compress', {
        method: 'POST',
        body: form,
      })

      if (!res.ok) {
        let msg = `HTTP ${res.status} ${res.statusText}`

        try {
          const contentType = res.headers.get('content-type') || ''
          if (contentType.includes('application/json')) {
            const data = await res.json()
            if ((data as any)?.error) msg = (data as any).error
          } else {
            const text = await res.text()
            if (text) msg = text
          }
        } catch (e) {
          console.error('error reading error body', e)
        }

        alert(msg)
        return
      }

      const blob = await res.blob()
      const url = URL.createObjectURL(blob)

      const ext = getOutputExtension()
      const safeName =
        outputName.trim() || file.name.replace(/\.[^/.]+$/, '') || 'compressed'
      const filename = `${safeName}.${ext}`

      const sizeKB = blob.size / 1024
      setCompressedSizeKB(sizeKB)

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

  // SEO metadata
  const pageTitle = "Free Online Image Compressor - Reduce Image Size Without Losing Quality"
  const pageDescription = "Compress JPG, PNG, WebP, AVIF images online for free. Reduce file size by up to 90% while maintaining quality. Fast, secure, and easy to use image optimization tool."
  const pageUrl = typeof window !== 'undefined' ? window.location.href : ''

  return (
    <>
      {/* SEO Head Tags */}
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="image compressor, compress images, reduce image size, optimize images, JPG compressor, PNG compressor, WebP, AVIF, free image tool" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        
        {/* Mobile Optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#a855f7" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={pageUrl} />
      </Head>

      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Image Compressor",
            "description": pageDescription,
            "applicationCategory": "UtilitiesApplication",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "operatingSystem": "Any",
            "browserRequirements": "Requires JavaScript. Requires HTML5."
          })
        }}
      />

      <div className="min-h-screen bg-linear-to-br from-pink-50 via-purple-50 to-blue-50 dark:from-pink-950/20 dark:via-purple-950/20 dark:to-blue-950/20 py-6 px-4">
        <main className="max-w-3xl mx-auto">
          {/* Header with Mascot */}
          <header className="flex items-center justify-between mb-5">
            <div>
              <h1 className="text-3xl font-black text-gray-800 dark:text-white mb-1">
                🖼️ Image Compressor
              </h1>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Make your images smaller, faster, better!
              </p>
            </div>
            <div className="text-7xl animate-bounce hidden sm:block" role="img" aria-label="Art palette emoji">
              🎨
            </div>
          </header>

          {/* Supported Formats Badge */}
          <section className="bg-purple-100 dark:bg-purple-900/30 border-2 border-purple-300 dark:border-purple-700 rounded-xl p-3 mb-4" aria-labelledby="supported-formats">
            <h2 id="supported-formats" className="sr-only">Supported Image Formats</h2>
            <p className="text-xs text-purple-800 dark:text-purple-200 font-semibold">
              ✨ Supports: <span className="font-bold">JPG, PNG, WebP, AVIF, TIFF, GIF</span>
            </p>
          </section>

          {/* Main Card */}
          <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-5 border-3 border-purple-200 dark:border-purple-700">
            
            {/* Upload Section */}
            <section className="mb-5" aria-labelledby="upload-section">
              <h2 id="upload-section" className="block text-base font-bold text-gray-800 dark:text-white mb-2">
                📤 Upload Your Image
              </h2>
              <div className="relative">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange}
                  aria-label="Choose image file to compress"
                  className="block w-full text-xs text-gray-600 dark:text-gray-300 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-purple-500 file:text-white hover:file:bg-purple-600 file:cursor-pointer file:transition-all file:shadow-md cursor-pointer"
                />
              </div>
              
              {/* File Info */}
              {file && (
                <div className="mt-3 p-2.5 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-700" role="status" aria-live="polite">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-xs font-semibold text-blue-800 dark:text-blue-200">
                      📊 Original: {originalSizeKB!.toFixed(1)} kB
                    </span>
                    {originalSizeKB && compressedSizeKB && (
                      <span className="text-xs font-bold text-green-600 dark:text-green-400 animate-pulse">
                        ✅ Compressed: {compressedSizeKB.toFixed(1)} kB ({reductionPercent}% smaller!)
                      </span>
                    )}
                  </div>
                </div>
              )}
            </section>

            {/* Preview */}
            {preview && (
              <section className="mb-5 text-center" aria-labelledby="preview-section">
                <h2 id="preview-section" className="sr-only">Image Preview</h2>
                <img
                  src={preview}
                  alt={`Preview of ${file?.name || 'uploaded image'}`}
                  className="mx-auto max-w-full max-h-64 rounded-xl shadow-xl border-3 border-purple-200 dark:border-purple-700"
                />
              </section>
            )}

            {/* Output Filename */}
            <section className="mb-5" aria-labelledby="filename-section">
              <h2 id="filename-section" className="block text-base font-bold text-gray-800 dark:text-white mb-2">
                📝 Output Image Name
              </h2>
              <div className="flex items-center gap-2 flex-wrap">
                <input
                  type="text"
                  placeholder="my-compressed-image"
                  value={outputName}
                  onChange={(e) => setOutputName(e.target.value)}
                  aria-label="Output filename without extension"
                  className="flex-1 min-w-[180px] px-3 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-800 dark:text-white font-semibold focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900/50 transition-all"
                />
                <span className="text-base font-bold text-purple-600 dark:text-purple-400" aria-label="File extension">
                  .{getOutputExtension()}
                </span>
              </div>
            </section>

            {/* Mode Selector */}
            <section className="mb-5" aria-labelledby="mode-section">
              <h2 id="mode-section" className="block text-base font-bold text-gray-800 dark:text-white mb-2">
                🎯 Choose Your Mode
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2" role="group" aria-label="Compression mode options">
                <button
                  onClick={() => setMode('preset')}
                  aria-pressed={mode === 'preset'}
                  className={`p-3 rounded-xl border-2 font-bold text-left transition-all ${
                    mode === 'preset'
                      ? 'bg-purple-500 text-white border-purple-600 shadow-lg scale-105'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:scale-105'
                  }`}
                >
                  <div className="text-xl mb-1" aria-hidden="true">🚀</div>
                  <div className="text-sm">Quick Preset</div>
                  <div className="text-xs opacity-75 mt-0.5">Fast & easy</div>
                </button>
                
                <button
                  onClick={() => setMode('target')}
                  aria-pressed={mode === 'target'}
                  className={`p-3 rounded-xl border-2 font-bold text-left transition-all ${
                    mode === 'target'
                      ? 'bg-purple-500 text-white border-purple-600 shadow-lg scale-105'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:scale-105'
                  }`}
                >
                  <div className="text-xl mb-1" aria-hidden="true">🎯</div>
                  <div className="text-sm">Target Size</div>
                  <div className="text-xs opacity-75 mt-0.5">Hit your goal</div>
                </button>
                
                <button
                  onClick={() => setMode('custom')}
                  aria-pressed={mode === 'custom'}
                  className={`p-3 rounded-xl border-2 font-bold text-left transition-all ${
                    mode === 'custom'
                      ? 'bg-purple-500 text-white border-purple-600 shadow-lg scale-105'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:scale-105'
                  }`}
                >
                  <div className="text-xl mb-1" aria-hidden="true">⚙️</div>
                  <div className="text-sm">Custom</div>
                  <div className="text-xs opacity-75 mt-0.5">Full control</div>
                </button>
              </div>
            </section>

            {/* Preset Options */}
            {mode === 'preset' && (
              <section className="mb-5 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border-2 border-purple-200 dark:border-purple-700" aria-labelledby="preset-options">
                <h3 id="preset-options" className="block text-base font-bold text-gray-800 dark:text-white mb-2">
                  📏 Choose Size
                </h3>
                <select
                  value={preset}
                  onChange={(e) => setPreset(e.target.value as PresetSize)}
                  aria-label="Select compression preset"
                  className="w-full px-3 py-2 rounded-lg border-2 border-purple-300 dark:border-purple-600 bg-white dark:bg-gray-700 text-sm text-gray-800 dark:text-white font-semibold focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900/50 transition-all"
                >
                  <option value="small">🐁 Small (max 1280px, ~60% quality)</option>
                  <option value="medium">🐱 Medium (max 1920px, ~75% quality)</option>
                  <option value="large">🦁 Large (original size, ~85% quality)</option>
                </select>
              </section>
            )}

            {/* Target Size Options */}
            {mode === 'target' && (
              <section className="mb-5 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-700" aria-labelledby="target-options">
                <h3 id="target-options" className="block text-base font-bold text-gray-800 dark:text-white mb-2">
                  🎯 Target File Size
                </h3>
                <div className="flex flex-wrap gap-2 mb-3" role="group" aria-label="Quick target size options">
                  <button 
                    type="button" 
                    onClick={() => setTargetSizeKB(250)}
                    aria-label="Set target size to 250 kilobytes"
                    className="px-4 py-1.5 text-sm bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full transition-all shadow-md hover:shadow-lg hover:scale-105"
                  >
                    250 kB
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setTargetSizeKB(500)}
                    aria-label="Set target size to 500 kilobytes"
                    className="px-4 py-1.5 text-sm bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full transition-all shadow-md hover:shadow-lg hover:scale-105"
                  >
                    500 kB
                  </button>
                  <button 
                    type="button" 
                    onClick={() => setTargetSizeKB(1000)}
                    aria-label="Set target size to 1 megabyte"
                    className="px-4 py-1.5 text-sm bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full transition-all shadow-md hover:shadow-lg hover:scale-105"
                  >
                    1 MB
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <label htmlFor="custom-target-size" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Or custom:</label>
                  <input
                    id="custom-target-size"
                    type="number"
                    min={50}
                    value={targetSizeKB}
                    onChange={(e) =>
                      setTargetSizeKB(e.target.value === '' ? '' : Number(e.target.value))
                    }
                    aria-label="Custom target size in kilobytes"
                    className="w-28 px-3 py-1.5 text-sm rounded-lg border-2 border-blue-300 dark:border-blue-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white font-bold focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900/50 transition-all"
                  />
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300">kB</span>
                </div>
              </section>
            )}

            {/* Custom Options */}
            {mode === 'custom' && (
              <section className="mb-5 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border-2 border-green-200 dark:border-green-700" aria-labelledby="custom-options">
                <h3 id="custom-options" className="block text-base font-bold text-gray-800 dark:text-white mb-2">
                  📐 Resolution
                </h3>
                <div className="flex flex-wrap gap-3 items-center mb-4">
                  <div className="flex items-center gap-1.5">
                    <label htmlFor="custom-width" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Width:</label>
                    <input
                      id="custom-width"
                      type="number"
                      min={1}
                      value={width}
                      onChange={(e) =>
                        setWidth(e.target.value === '' ? '' : Number(e.target.value))
                      }
                      placeholder="Auto"
                      aria-label="Custom width in pixels"
                      className="w-20 px-2 py-1.5 text-sm rounded-lg border-2 border-green-300 dark:border-green-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white font-bold focus:border-green-500 dark:focus:border-green-400 focus:ring-2 focus:ring-green-200 dark:focus:ring-green-900/50 transition-all"
                    />
                    <span className="text-xs text-gray-600 dark:text-gray-400">px</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <label htmlFor="custom-height" className="text-sm font-semibold text-gray-700 dark:text-gray-300">Height:</label>
                    <input
                      id="custom-height"
                      type="number"
                      min={1}
                      value={height}
                      onChange={(e) =>
                        setHeight(e.target.value === '' ? '' : Number(e.target.value))
                      }
                      placeholder="Auto"
                      aria-label="Custom height in pixels"
                      className="w-20 px-2 py-1.5 text-sm rounded-lg border-2 border-green-300 dark:border-green-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white font-bold focus:border-green-500 dark:focus:border-green-400 focus:ring-2 focus:ring-green-200 dark:focus:ring-green-900/50 transition-all"
                    />
                    <span className="text-xs text-gray-600 dark:text-gray-400">px</span>
                  </div>
                </div>

                <label htmlFor="quality-slider" className="block text-base font-bold text-gray-800 dark:text-white mb-2">
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

            {/* Output Format */}
            <section className="mb-5" aria-labelledby="format-section">
              <h2 id="format-section" className="block text-base font-bold text-gray-800 dark:text-white mb-2">
                🎨 Output Format
              </h2>
              <select
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value as OutputFormat)}
                aria-label="Select output image format"
                className="w-full px-3 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-800 dark:text-white font-semibold focus:border-purple-500 dark:focus:border-purple-400 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-900/50 transition-all"
              >
                <option value="auto">✨ Auto (Smart detection)</option>
                <option value="jpeg">📷 JPEG (.jpg)</option>
                <option value="png">🖼️ PNG (.png)</option>
                <option value="webp">🌐 WebP (.webp)</option>
                <option value="avif">🚀 AVIF (.avif)</option>
              </select>
            </section>

            {/* Compress Button */}
            <button
              disabled={!file || isLoading}
              onClick={compress}
              aria-label={isLoading ? 'Compressing image' : 'Download compressed image'}
              className={`w-full py-3 px-6 rounded-xl font-black text-base shadow-2xl transition-all ${
                !file || isLoading
                  ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                  : 'bg-linear-to-r from-purple-500 to-pink-500 text-white hover:scale-105 hover:shadow-purple-500/50 active:scale-95'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin" aria-hidden="true">⚙️</span> Compressing Magic...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <span aria-hidden="true">⬇️</span> Download Compressed Image
                </span>
              )}
            </button>
          </article>

          {/* SEO Content Section */}
          <section className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border-2 border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Why Use Our Image Compressor?
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                Our free online image compressor helps you reduce image file sizes without sacrificing quality. 
                Perfect for optimizing images for websites, social media, email, and storage.
              </p>
              
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mt-6 mb-3">
                Key Features
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Multiple formats supported:</strong> JPG, PNG, WebP, AVIF, TIFF, and GIF</li>
                <li><strong>Three compression modes:</strong> Quick presets, target size, or custom settings</li>
                <li><strong>No file uploads to servers:</strong> All processing happens in your browser</li>
                <li><strong>Instant results:</strong> Download your compressed images immediately</li>
                <li><strong>Free and unlimited:</strong> Compress as many images as you need</li>
              </ul>

              <h3 className="text-xl font-bold text-gray-800 dark:text-white mt-6 mb-3">
                Benefits of Image Compression
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Faster website loading:</strong> Smaller images mean faster page speeds and better SEO</li>
                <li><strong>Reduced bandwidth:</strong> Save on hosting costs and data usage</li>
                <li><strong>Better user experience:</strong> Quick-loading images keep visitors engaged</li>
                <li><strong>Storage savings:</strong> Keep more photos and images without filling up space</li>
              </ul>
            </div>
          </section>
        </main>

        {/* Celebration Modal */}
        {showCelebration && (
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div className="text-6xl animate-bounce">
              🎉
            </div>
          </div>
        )}

        {/* Toast */}
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