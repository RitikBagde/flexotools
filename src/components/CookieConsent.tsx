'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type ConsentState = 'accepted' | 'declined' | null

const CONSENT_KEY = 'flexotools_cookie_consent'
const CONSENT_VERSION = '1'

export function useCookieConsent() {
  const [consent, setConsent] = useState<ConsentState>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        if (parsed.version === CONSENT_VERSION) {
          setConsent(parsed.value)
        }
      }
    } catch {}
    setLoaded(true)
  }, [])

  const accept = () => {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify({
        value: 'accepted',
        version: CONSENT_VERSION,
        date: new Date().toISOString(),
      }))
    } catch {}
    setConsent('accepted')
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
      })
    }
  }

  const decline = () => {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify({
        value: 'declined',
        version: CONSENT_VERSION,
        date: new Date().toISOString(),
      }))
    } catch {}
    setConsent('declined')
    if (typeof window !== 'undefined' && (window as any).gtag) {
      ;(window as any).gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'granted',        // ads still show
        ad_user_data: 'denied',       // no personal data used
        ad_personalization: 'denied', // no personalised targeting
      })
    }
  }

  return { consent, loaded, accept, decline }
}

export default function CookieConsent() {
  const { consent, loaded, accept, decline } = useCookieConsent()
  const [visible, setVisible] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    if (loaded && consent === null) {
      const t = setTimeout(() => setVisible(true), 600)
      return () => clearTimeout(t)
    }
  }, [loaded, consent])

  const handleAccept = () => {
    setLeaving(true)
    setTimeout(accept, 350)
  }

  const handleDecline = () => {
    setLeaving(true)
    setTimeout(decline, 350)
  }

  if (!visible || consent !== null) return null

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-5 transition-all duration-300 ease-in-out ${
        leaving ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}
      role="dialog"
      aria-modal="false"
      aria-label="Cookie consent"
    >
      <div className="max-w-3xl mx-auto">
        <div className="relative rounded-2xl border border-purple-500/20 bg-background shadow-2xl shadow-black/30 overflow-hidden">

          {/* Top gradient accent bar */}
          <div className="h-1 w-full bg-linear-to-r from-purple-500 via-pink-500 to-blue-500" />

          <div className="p-5 sm:p-6 space-y-4">

            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-xl shrink-0">
                  🍪
                </div>
                <div>
                  <h2 className="text-base font-bold text-foreground">
                    We use cookies
                  </h2>
                  <p className="text-xs text-foreground/50 mt-0.5">
                    Your choice controls how we use data on this site
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="text-xs text-purple-500 hover:text-purple-400 font-semishrink-0 mt-1 underline underline-offset-2 transition-colors"
                aria-expanded={showDetails}
              >
                {showDetails ? 'Hide details' : 'What are these?'}
              </button>
            </div>

            {/* Description */}
            <p className="text-sm text-foreground/70 leading-relaxed">
              We use cookies to understand how visitors use FlexoTools and to show relevant ads
              that help keep our tools free. You can accept all cookies or choose non-personalised
              ads only —{' '}
              <strong className="text-foreground">
                ads will still appear either way
              </strong>
              , just personalised or generic.
            </p>

            {/* Expandable two-column detail panel */}
            {showDetails && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Accept column */}
                <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800">
                  <p className="text-sm font-bold text-green-700 dark:text-green-400 mb-2">
                    ✅ If you Accept
                  </p>
                  <ul className="space-y-1.5 text-xs text-foreground/70">
                    <li className="flex items-start gap-1.5">
                      <span className="text-green-500 mt-0.5 shrink-0">•</span>
                      Personalised ads shown (more relevant to you)
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-green-500 mt-0.5 shrink-0">•</span>
                      Analytics help us understand & improve tools
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-green-500 mt-0.5 shrink-0">•</span>
                      Supports FlexoTools staying free
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-green-500 mt-0.5 shrink-0">•</span>
                      You can withdraw consent anytime
                    </li>
                  </ul>
                </div>

                {/* Decline column */}
                <div className="p-4 rounded-xl bg-foreground/5 border border-foreground/10">
                  <p className="text-sm font-bold text-foreground/60 mb-2">
                    🔒 If you Decline
                  </p>
                  <ul className="space-y-1.5 text-xs text-foreground/70">
                    <li className="flex items-start gap-1.5">
                      <span className="text-foreground/40 mtshrink-0">•</span>
                      Non-personalised ads still shown
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-foreground/40 mtshrink-0">•</span>
                      No analytics or tracking cookies set
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-foreground/40 mtshrink-0">•</span>
                      No personal data used for ad targeting
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-foreground/40 mtshrink-0">•</span>
                      All tools still work exactly the same
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Bottom row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-1">
              {/* Policy links */}
              <div className="flex items-center gap-3 text-xs text-foreground/40">
                <Link
                  href="/legal/privacy"
                  className="hover:text-purple-500 transition-colors"
                >
                  Privacy Policy
                </Link>
                <span>·</span>
                <Link
                  href="/legal/cookies"
                  className="hover:text-purple-500 transition-colors"
                >
                  Cookie Policy
                </Link>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={handleDecline}
                  className="flex-1 sm:flex-none px-5 py-2.5 text-sm font-bold rounded-xl border-2 border-foreground/20 text-foreground/60 hover:text-foreground hover:border-foreground/40 transition-all duration-200"
                  aria-label="Decline optional cookies"
                >
                  Decline
                </button>
                <button
                  onClick={handleAccept}
                  className="flex-1 sm:flex-none px-7 py-2.5 text-sm font-bold rounded-xl bg-linear-to-r from-purple-500 to-pink-500 text-white hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-200"
                  aria-label="Accept all cookies"
                >
                  Accept all ✓
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}