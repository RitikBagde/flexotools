// src/app/legal/cookies/page.tsx
// SERVER COMPONENT — removed 'use client' so metadata works correctly

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy | FlexoTools',
  description:
    'FlexoTools cookie policy — we only set cookies after you give consent. Learn what cookies we use, why, and how to control them.',
  alternates: {
    canonical: 'https://flexotools.com/legal/cookies',
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
  name: 'Cookie Policy',
  description: 'FlexoTools cookie policy explaining consent-first cookie usage',
  url: 'https://flexotools.com/legal/cookies',
  dateModified: lastUpdatedISO,
  publisher: {
    '@type': 'Organization',
    name: 'FlexoTools',
    url: 'https://flexotools.com',
  },
}

export default function CookiePolicyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Cookie Policy</h1>
      <p className="text-foreground/60 mb-8 text-sm">Last updated: {lastUpdated}</p>

      <div className="mb-8 p-4 bg-purple-50 dark:bg-purple-900/10 border border-purple-200 dark:border-purple-800 rounded-xl">
        <p className="text-sm font-semibold text-purple-900 dark:text-purple-400 mb-1">
          🍪 Consent-first approach
        </p>
        <p className="text-sm text-foreground/70 leading-relaxed">
          FlexoTools uses a consent-first cookie approach. <strong>No analytics or advertising
          cookies are set until you explicitly accept them</strong> via the cookie banner shown on
          your first visit. Essential cookies (such as your cookie preference itself) are set
          immediately and cannot be disabled as they are required for the site to function.
        </p>
      </div>

      <section className="space-y-6 text-foreground/80 text-sm leading-relaxed">

        <p>
          This Cookie Policy explains how FlexoTools (&quot;we&quot;, &quot;us&quot;, and &quot;our&quot;) uses cookies
          and similar technologies. It explains what these technologies are, why we use them, and
          — importantly — your rights to control our use of them including how to withdraw consent.
        </p>

        {/* Section 1 */}
        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">1. What Are Cookies?</h2>
          <p className="mb-3">
            Cookies are small text files placed on your device when you visit a website. They are
            widely used to make websites work correctly and to give site owners useful information
            about how their site is used.
          </p>
          <p>
            Cookies set by FlexoTools directly are called <strong>first-party cookies</strong>.
            Cookies set by third parties (such as Google) are called <strong>third-party cookies</strong>.
            Both types are covered by this policy.
          </p>
        </div>

        {/* Section 2 */}
        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">2. What Cookies We Use and Why</h2>
          <p className="mb-4">
            We use four categories of cookies. The table below shows each type, what it does,
            whether it requires your consent, and how long it lasts.
          </p>

          {/* Essential */}
          <div className="mt-4 p-4 bg-foreground/5 rounded-xl border border-foreground/10">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-semibold text-foreground">Essential Cookies</h3>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-500">
                No consent needed
              </span>
            </div>
            <p className="mb-2 text-foreground/70">
              Required for the site to function. These are set immediately on your first visit
              regardless of your cookie choice.
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-foreground/70">
              <li><strong>Cookie consent preference</strong> — stores your Accept/Decline choice so the banner doesn&apos;t reappear</li>
              <li><strong>Authentication cookies</strong> — keeps you logged in to your FlexoTools account</li>
              <li><strong>Security cookies</strong> — protect against fraud and CSRF attacks</li>
            </ul>
            <p className="mt-2 text-xs text-foreground/50">Duration: Session to 30 days</p>
          </div>

          {/* Preference */}
          <div className="mt-4 p-4 bg-foreground/5 rounded-xl border border-foreground/10">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-semibold text-foreground">Preference Cookies</h3>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400">
                No consent needed
              </span>
            </div>
            <p className="mb-2 text-foreground/70">
              Remember your settings so you don&apos;t have to re-configure them on every visit.
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-foreground/70">
              <li><strong>Theme preference</strong> — remembers your light/dark mode selection</li>
              <li><strong>Language preference</strong> — remembers your preferred language if applicable</li>
            </ul>
            <p className="mt-2 text-xs text-foreground/50">Duration: Up to 1 year</p>
          </div>

          {/* Analytics */}
          <div className="mt-4 p-4 bg-foreground/5 rounded-xl border border-foreground/10">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-semibold text-foreground">Analytics Cookies</h3>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-500">
                Requires your consent
              </span>
            </div>
            <p className="mb-2 text-foreground/70">
              Help us understand how visitors use FlexoTools so we can improve our tools.
              <strong> These are only set if you click &quot;Accept all&quot;</strong> on the cookie banner.
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-foreground/70">
              <li><strong>Google Analytics (GA4)</strong> — tracks page views, session duration, and which tools are used most</li>
              <li><strong>Vercel Analytics</strong> — measures real-user performance metrics like page load speed</li>
            </ul>
            <p className="mt-2 text-xs text-foreground/50">Duration: Up to 2 years</p>
          </div>

          {/* Advertising */}
          <div className="mt-4 p-4 bg-foreground/5 rounded-xl border border-foreground/10">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-semibold text-foreground">Advertising Cookies</h3>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400">
                Requires your consent
              </span>
            </div>
            <p className="mb-2 text-foreground/70">
              Used to show you relevant ads via Google AdSense.
              <strong> Personalised ads are only served if you click &quot;Accept all&quot;.</strong>{' '}
              If you decline, non-personalised ads are still shown but no personal data is used
              for targeting.
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-sm text-foreground/70">
              <li><strong>Google AdSense</strong> — serves ads that help keep FlexoTools tools free</li>
              <li><strong>DoubleClick (Google)</strong> — manages ad frequency and personalisation</li>
            </ul>
            <p className="mt-2 text-xs text-foreground/50">Duration: Up to 1 year</p>
          </div>
        </div>

        {/* Section 3 */}
        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">3. What Happens If You Decline?</h2>
          <p className="mb-3">
            If you click <strong>&quot;Decline&quot;</strong> on the cookie banner:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>No analytics cookies are set — we cannot track your visit</li>
            <li>No personalised advertising cookies are set</li>
            <li>Ads will still appear on the site, but they will be non-personalised (generic)</li>
            <li>All FlexoTools tools continue to work exactly the same</li>
            <li>Your preference is saved so the banner does not reappear</li>
          </ul>
          <p className="mt-3 text-foreground/70">
            Declining does not block ads — it only prevents personalised targeting. This is by
            design: ads fund the free tools on FlexoTools regardless of your consent choice.
          </p>
        </div>

        {/* Section 4 */}
        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">4. How to Change or Withdraw Consent</h2>
          <p className="mb-3">
            You can change your cookie preference at any time using one of these methods:
          </p>

          <div className="space-y-3">
            <div className="p-3 bg-foreground/5 rounded-lg border border-foreground/10">
              <p className="font-semibold text-foreground text-sm mb-1">Clear your browser storage</p>
              <p className="text-xs text-foreground/60">
                Open browser DevTools → Application → Local Storage → find the key
                <code className="mx-1 px-1 py-0.5 bg-foreground/10 rounded text-xs">flexotools_cookie_consent</code>
                and delete it. Reload the page and the banner will reappear.
              </p>
            </div>

            <div className="p-3 bg-foreground/5 rounded-lg border border-foreground/10">
              <p className="font-semibold text-foreground text-sm mb-1">Browser cookie controls</p>
              <p className="text-xs text-foreground/60">
                You can block or delete all cookies via your browser settings. Note that blocking
                essential cookies may prevent login features from working.
              </p>
              <div className="mt-2 space-y-1 text-xs text-foreground/60">
                <p><strong>Chrome:</strong> Settings → Privacy → Cookies and other site data</p>
                <p><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</p>
                <p><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</p>
                <p><strong>Edge:</strong> Settings → Privacy → Cookies and site permissions</p>
              </div>
            </div>

            <div className="p-3 bg-foreground/5 rounded-lg border border-foreground/10">
              <p className="font-semibold text-foreground text-sm mb-1">Google opt-outs</p>
              <p className="text-xs text-foreground/60">
                To opt out of Google Analytics specifically, install the{' '}
                <strong>Google Analytics Opt-out Browser Add-on</strong>. To manage Google ad
                personalisation, visit{' '}
                <strong>myaccount.google.com/data-and-privacy</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Section 5 */}
        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">5. Third-Party Cookies</h2>
          <p className="mb-3">
            Some cookies on FlexoTools are set by third-party services. We do not control these
            cookies directly. Refer to each provider&apos;s privacy policy for details:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong>Google Analytics & AdSense</strong> —{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-500 hover:underline"
              >
                Google Privacy Policy
              </a>
            </li>
            <li>
              <strong>Supabase</strong> — authentication and database (essential only)
            </li>
            <li>
              <strong>Vercel</strong> — hosting and performance monitoring
            </li>
          </ul>
        </div>

        {/* Section 6 */}
        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">6. Do Not Track</h2>
          <p>
            Some browsers send a &quot;Do Not Track&quot; (DNT) signal. Because there is no consistent
            industry standard for DNT, our site does not respond to these signals automatically.
            You can use the consent banner or browser controls described above to manage your
            preferences instead.
          </p>
        </div>

        {/* Section 7 */}
        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">7. Updates to This Policy</h2>
          <p className="mb-3">
            We may update this Cookie Policy when our cookie usage changes or when legal
            requirements change. The &quot;Last updated&quot; date at the top reflects when it was last
            revised. If we make significant changes, we will increment the consent version so
            the banner reappears and you can make a fresh choice.
          </p>
        </div>

        {/* Section 8 */}
        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">8. Contact Us</h2>
          <p className="mb-3">
            If you have questions about this Cookie Policy or our data practices, contact us:
          </p>
          <div className="p-4 bg-foreground/5 rounded-xl border border-foreground/10 space-y-1">
            <p className="font-medium text-foreground mb-2">Email:{' '}
              <a href="mailto:support@flexotools.com" className="text-purple-500 hover:underline">
                support@flexotools.com
              </a>
            </p>
            <p className="font-medium text-foreground mb-2">Support: flexotools.team@gmail.com</p>
            <p className="font-medium text-foreground mb-2">Website: https://flexotools.com</p>
          </div>
        </div>

      </section>
    </main>
  )
}