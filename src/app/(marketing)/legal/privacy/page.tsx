// src/app/legal/privacy/page.tsx
// SERVER COMPONENT — removed 'use client' so metadata exports correctly

import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | FlexoTools',
  description:
    'FlexoTools privacy policy — how we collect, use and protect your data. Consent-first approach: no tracking cookies set until you accept.',
  alternates: {
    canonical: 'https://flexotools.com/legal/privacy',
  },
  robots: { index: true, follow: true },
}

const today = new Date()

const lastUpdated = today.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})

const lastUpdatedISO = today.toISOString().split('T')[0]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Privacy Policy',
  description: 'FlexoTools privacy policy explaining data collection and consent-first cookie usage',
  url: 'https://flexotools.com/legal/privacy',
  dateModified: lastUpdatedISO,
  publisher: {
    '@type': 'Organization',
    name: 'FlexoTools',
    url: 'https://flexotools.com',
  },
}

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
        Privacy Policy
      </h1>
      <p className="text-foreground/60 mb-8 text-sm">Last updated: {lastUpdated}</p>

      <div className="mb-8 p-4 bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-800 rounded-xl">
        <p className="text-sm font-semibold text-purple-900 dark:text-purple-400 mb-1">
          🔒 Privacy-first approach
        </p>
        <p className="text-sm text-foreground/70 leading-relaxed">
          FlexoTools uses a <strong>consent-first</strong> approach to data collection. No
          analytics or advertising cookies are set until you explicitly accept via the cookie
          banner on your first visit. Most tools process files entirely in your browser —
          your files never leave your device unless a specific tool requires server processing.
        </p>
      </div>

      <section className="space-y-6 text-foreground/80 text-sm leading-relaxed">

        <p>
          At FlexoTools, we take your privacy seriously. This Privacy Policy explains how we
          collect, use, disclose, and safeguard your information when you use our services.
          Please read this policy carefully. If you disagree with its terms, please discontinue
          use of the site.
        </p>

        {/* Section 1 */}
        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">1. Information We Collect</h2>

          <h3 className="text-lg font-semibold text-foreground mb-2 mt-4">Personal Information</h3>
          <p className="mb-3">
            We only collect personal information you voluntarily provide when you:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
            <li>Register for an account (email address, name)</li>
            <li>Contact us for support</li>
            <li>Subscribe to communications</li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mb-2 mt-4">Usage Data</h3>
          <p className="mb-3">
            If you accept analytics cookies via the cookie banner, we collect:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
            <li>Pages visited and tools used</li>
            <li>Browser type and device information</li>
            <li>Approximate location (country/city level only)</li>
            <li>Session duration and navigation patterns</li>
          </ul>
          <p className="text-foreground/60 text-xs mt-2">
            If you decline cookies, none of the above usage data is collected.
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-2 mt-4">File Data</h3>
          <p>
            When you use our tools, files you upload are processed to deliver the service.
            For browser-based tools (Image Compressor, QR Generator, PDF Extractor), processing
            happens entirely on your device — files never reach our servers. For AI-powered tools
            (Resume ATS Checker, Text Summarizer), files are sent to our server, processed, and
            deleted immediately after the result is returned. We do not store your files.
          </p>
        </div>

        {/* Section 2 */}
        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">2. How We Use Your Information</h2>
          <p className="mb-3">We use collected information to:</p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Provide, operate, and maintain our tools and services</li>
            <li>Send important updates, security alerts, and support messages</li>
            <li>Respond to your support requests</li>
            <li>Analyse usage trends and improve our tools — <strong>only with your consent</strong></li>
            <li>Show relevant ads via Google AdSense — <strong>only with your consent</strong></li>
            <li>Show non-personalised ads even without consent (ads fund the free tools)</li>
            <li>Detect and address technical issues and security threats</li>
            <li>Comply with legal obligations</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">3. Cookies and Consent Mode</h2>
          <p className="mb-3">
            We use Google Consent Mode v2. This means all tracking is set to <strong>denied
            by default</strong> when you first visit. Cookies are only activated based on your
            choice in the cookie banner:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4">
            <div className="p-3 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-xl">
              <p className="text-sm font-bold text-green-700 dark:text-green-400 mb-1">✅ Accept all</p>
              <ul className="text-xs text-foreground/70 space-y-1">
                <li>• Google Analytics activated</li>
                <li>• Personalised ads activated</li>
                <li>• Usage data collected</li>
              </ul>
            </div>
            <div className="p-3 bg-foreground/5 border border-foreground/10 rounded-xl">
              <p className="text-sm font-bold text-foreground/60 mb-1">🔒 Decline</p>
              <ul className="text-xs text-foreground/70 space-y-1">
                <li>• No analytics cookies set</li>
                <li>• Non-personalised ads only</li>
                <li>• No personal data used</li>
              </ul>
            </div>
          </div>

          <p>
            For full details on cookie types and how to withdraw consent, see our{' '}
            <Link href="/legal/cookies" className="text-purple-500 hover:underline">
              Cookie Policy
            </Link>.
          </p>
        </div>

        {/* Section 4 */}
        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">4. How We Share Your Information</h2>
          <p className="mb-3">
            We do not sell your personal information. We share data only in these situations:
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-2 mt-4">Service Providers</h3>
          <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
            <li><strong>Supabase</strong> — user authentication and account management</li>
            <li><strong>Vercel</strong> — application hosting and performance monitoring</li>
            <li>
              <strong>Google Analytics & AdSense</strong> — analytics and advertising,
              only if you have consented
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mb-2 mt-4">Legal Requirements</h3>
          <p className="mb-3">
            We may disclose your information if required by law, court order, or other
            governmental authority.
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-2 mt-4">Business Transfers</h3>
          <p>
            If FlexoTools is acquired or merges with another company, your data may be
            transferred. We will notify you before this happens.
          </p>
        </div>

        {/* Section 5 */}
        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">5. Data Retention</h2>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Uploaded files</strong> — deleted immediately after processing (server-side tools) or never leave your device (browser-side tools)</li>
            <li><strong>Account data</strong> — retained until you request deletion or the account is inactive for 12+ months</li>
            <li><strong>Analytics data</strong> — retained for up to 26 months by Google Analytics (only if you consented)</li>
            <li><strong>Cookie preference</strong> — stored in your browser's localStorage, no expiry</li>
          </ul>
        </div>

        {/* Section 6 */}
        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">6. Data Security</h2>
          <p className="mb-3">We protect your information using:</p>
          <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
            <li>HTTPS encryption for all data in transit</li>
            <li>Secure authentication via Supabase</li>
            <li>No long-term storage of uploaded files</li>
            <li>Regular security reviews</li>
          </ul>
          <p>
            No method of transmission over the internet is 100% secure. While we implement
            strong protections, we cannot guarantee absolute security.
          </p>
        </div>

        {/* Section 7 */}
        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">7. Your Privacy Rights</h2>
          <p className="mb-3">
            Depending on your location you may have the right to:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
            <li><strong>Access</strong> — request a copy of data we hold about you</li>
            <li><strong>Correction</strong> — request we fix inaccurate information</li>
            <li><strong>Deletion</strong> — request your personal data be deleted</li>
            <li><strong>Portability</strong> — receive your data in a machine-readable format</li>
            <li><strong>Objection</strong> — object to processing for certain purposes</li>
            <li><strong>Withdraw consent</strong> — withdraw cookie consent anytime via the Cookie Policy instructions</li>
          </ul>
          <p>
            To exercise these rights, email us at{' '}
            <a href="mailto:support@flexotools.com" className="text-purple-500 hover:underline">
              support@flexotools.com
            </a>. We will respond within 30 days.
          </p>
        </div>

        {/* Section 8 */}
        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">8. Children&apos;s Privacy</h2>
          <p>
            Our Service is not directed at children under 13. We do not knowingly collect
            personal information from children under 13. If you believe your child has provided
            us with personal information, contact us immediately and we will delete it.
          </p>
        </div>

        {/* Section 9 */}
        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">9. International Data Transfers</h2>
          <p>
            FlexoTools is based in India. If you access our service from outside India, your
            information may be transferred to and processed in India or other countries where
            our service providers operate (such as the United States for Google services). By
            using FlexoTools, you consent to this transfer.
          </p>
        </div>

        {/* Section 10 */}
        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">10. Third-Party Links</h2>
          <p>
            Our Service may contain links to third-party websites. We have no control over and
            assume no responsibility for the content or privacy practices of those sites. We
            encourage you to review the privacy policy of any site you visit.
          </p>
        </div>

        {/* Section 11 */}
        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">11. Advertising</h2>
          <p className="mb-3">
            FlexoTools displays ads via Google AdSense to fund free access to our tools.
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>If you <strong>accept cookies</strong>, personalised ads are shown based on your browsing interests</li>
            <li>If you <strong>decline cookies</strong>, non-personalised ads are shown — contextual only, no personal data used</li>
            <li>Ads appear on all pages regardless of consent choice</li>
            <li>You can opt out of Google ad personalisation at{' '}
              <a
                href="https://myaccount.google.com/data-and-privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-500 hover:underline"
              >
                myaccount.google.com/data-and-privacy
              </a>
            </li>
          </ul>
        </div>

        {/* Section 12 */}
        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">12. Changes to This Policy</h2>
          <p className="mb-3">
            We may update this Privacy Policy periodically. When we do we will:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
            <li>Update the &quot;Last updated&quot; date at the top</li>
            <li>Display a notice on the site for material changes</li>
            <li>Re-show the cookie consent banner if consent-related practices change</li>
          </ul>
          <p>
            Continued use of FlexoTools after changes are posted constitutes acceptance of the
            updated policy.
          </p>
        </div>

        {/* Section 13 */}
        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">13. Contact Us</h2>
          <p className="mb-3">
            If you have questions about this Privacy Policy or want to exercise your data rights:
          </p>
          <div className="p-4 bg-foreground/5 rounded-xl border border-foreground/10 space-y-1">
            <p className="font-medium text-foreground">
              Email:{' '}
              <a href="mailto:support@flexotools.com" className="text-purple-500 hover:underline">
                support@flexotools.com
              </a>
            </p>
            <p className="font-medium text-foreground">Support: flexotools.team@gmail.com</p>
            <p className="font-medium text-foreground">Website: https://flexotools.com</p>
          </div>
        </div>

      </section>
    </main>
  )
}