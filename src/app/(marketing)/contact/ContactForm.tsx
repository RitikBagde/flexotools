'use client'

// src/app/contact/ContactForm.tsx
// This is the interactive form component.
// All hardcoded text-gray-* and bg-gray-* colors have been replaced with
// text-foreground/* and bg-foreground/* variants so they work in both
// light and dark mode without becoming invisible.

import React, { useState } from 'react'
import { Mail, User, MessageSquare, Send, CheckCircle, AlertCircle } from 'lucide-react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [agreed, setAgreed] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    if (!agreed) {
      setStatus({ type: 'error', message: 'Please accept the Terms & Conditions and Privacy Policy' })
      return
    }
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus({ type: 'error', message: 'Please fill in all required fields' })
      return
    }

    setLoading(true)
    setStatus({ type: '', message: '' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await response.json()

      if (response.ok) {
        setStatus({ type: 'success', message: "Message sent successfully! We'll get back to you soon." })
        setFormData({ name: '', email: '', subject: '', message: '' })
        setAgreed(false)
      } else {
        setStatus({ type: 'error', message: data.error || 'Failed to send message. Please try again.' })
      }
    } catch {
      setStatus({ type: 'error', message: 'Something went wrong. Please try again later.' })
    } finally {
      setLoading(false)
    }
  }

  const inputClass = `
    block w-full py-4 px-4
    bg-foreground/5
    border border-foreground/20
    rounded-xl
    text-foreground
    placeholder:text-foreground/40
    focus:ring-2 focus:ring-purple-500 focus:border-transparent
    transition-all
  `

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-200 dark:border-purple-500/30 mb-6">
            <span className="text-2xl">✨</span>
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
              Get in Touch
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl font-bold mb-4">
            <span className="bg-linear-to-r from-purple-600 via-blue-600 to-cyan-600 dark:from-purple-400 dark:via-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
              Contact Us
            </span>
          </h1>
          {/* FIX: was text-gray-600 dark:text-gray-400 */}
          <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
            Have a question or feedback? We&apos;d love to hear from you. Send us a message
            and we&apos;ll respond as soon as possible.
          </p>
        </div>

        {/* Form Card */}
        {/* FIX: was bg-white/80 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 */}
        <div className="bg-background/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-foreground/10 p-8 sm:p-12">
          <div className="space-y-6">

            {/* Name */}
            <div>
              {/* FIX: was text-gray-900 dark:text-gray-100 */}
              <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-3">
                Your Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  {/* FIX: was text-gray-400 dark:text-gray-500 */}
                  <User className="h-5 w-5 text-foreground/40" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`${inputClass} pl-12`}
                  placeholder="Your Name"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-3">
                Your Email <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-foreground/40" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`${inputClass} pl-12`}
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block text-sm font-semibold text-foreground mb-3">
                Subject <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MessageSquare className="h-5 w-5 text-foreground/40" />
                </div>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`${inputClass} pl-12 pr-10 appearance-none cursor-pointer`}
                >
                  <option value="">Choose a subject...</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Feedback">Feedback</option>
                  <option value="Bug Report">Bug Report</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Other">Other</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-foreground/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-3">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleChange}
                className={`${inputClass} resize-none`}
                placeholder="Write your message here..."
              />
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start pt-2">
              <div className="flex items-center h-6">
                <input
                  id="terms"
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="h-5 w-5 text-purple-600 bg-foreground/5 border-foreground/20 rounded focus:ring-purple-500 cursor-pointer"
                />
              </div>
              {/* FIX: was text-gray-700 dark:text-gray-300 */}
              <label htmlFor="terms" className="ml-3 text-sm text-foreground/70 cursor-pointer leading-relaxed">
                I accept the{' '}
                <a href="/legal/terms" className="text-purple-500 font-semibold hover:underline">
                  Terms & Conditions
                </a>{' '}
                and{' '}
                <a href="/legal/privacy" className="text-purple-500 font-semibold hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Status Message */}
            {status.message && (
              <div className={`flex items-start gap-3 p-4 rounded-xl border ${
                status.type === 'success'
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                  : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
              }`}>
                {status.type === 'success' ? (
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                )}
                <p className={
                  status.type === 'success'
                    ? 'text-green-700 dark:text-green-300'
                    : 'text-red-700 dark:text-red-300'
                }>
                  {status.message}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 text-white font-semibold py-5 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:translate-y-0 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send message
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer note */}
        <div className="mt-10 text-center">
          {/* FIX: was text-gray-600 dark:text-gray-400 */}
          <p className="text-sm text-foreground/50">
            💬 We typically respond within 24–48 hours
          </p>
        </div>
      </div>
    </div>
  )
}