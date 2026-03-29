// src/app/legal/terms/page.tsx
// SERVER COMPONENT — removed 'use client' so metadata exports correctly

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | FlexoTools',
  description:
    'FlexoTools terms of service — rules for using our free online tools including image compression, PDF extraction, QR generation and more.',
  alternates: {
    canonical: 'https://flexotools.com/legal/terms',
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
  name: 'Terms of Service',
  description: 'FlexoTools terms of service',
  url: 'https://flexotools.com/legal/terms',
  dateModified: lastUpdatedISO,
  publisher: {
    '@type': 'Organization',
    name: 'FlexoTools',
    url: 'https://flexotools.com',
  },
}

export default function TermsOfServicePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Terms of Service</h1>
      <p className="text-foreground/60 mb-8 text-sm">Last updated: {lastUpdated}</p>

      <section className="space-y-6 text-foreground/80 text-sm leading-relaxed">
        <p>
          Welcome to FlexoTools. By accessing or using our services, you agree to be bound by
          these Terms of Service. If you do not agree to these terms, please do not use our service.
        </p>

        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing and using FlexoTools (&quot;the Service&quot;), you accept and agree to be bound
            by these terms. If you do not agree, please do not use this service.
          </p>
        </div>

        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">2. Use of the Service</h2>
          <p className="mb-3">
            You agree to use the tools only for lawful purposes. You must not use our Service:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>In any way that violates applicable law or regulation</li>
            <li>To transmit advertising or promotional material without our prior written consent</li>
            <li>To impersonate FlexoTools, its employees, or any other person or entity</li>
            <li>In any way that infringes upon the rights of others or is illegal, threatening, or harmful</li>
            <li>To engage in conduct that restricts or inhibits anyone&apos;s use or enjoyment of the Service</li>
          </ul>
        </div>

        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">3. User Accounts</h2>
          <p className="mb-3">
            When you create an account, you must provide accurate and complete information.
            Failure to do so constitutes a breach of these Terms and may result in termination
            of your account.
          </p>
          <p>
            You are responsible for safeguarding your password and for all activities that occur
            under your account. Notify us immediately of any unauthorized use of your account.
          </p>
        </div>

        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">4. Intellectual Property Rights</h2>
          <p className="mb-3">
            The Service and its original content, features, and functionality are and will remain
            the exclusive property of FlexoTools and its licensors.
          </p>
          <p>
            You retain all rights to content you upload. By uploading content you grant us a
            worldwide, non-exclusive, royalty-free license to process your content solely to
            provide the Service to you. We do not claim ownership of your files.
          </p>
        </div>

        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">5. Content Guidelines</h2>
          <p className="mb-3">
            You are responsible for any content you upload or process. You agree not to upload:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Content that is illegal, harmful, threatening, abusive, or defamatory</li>
            <li>Content that infringes any patent, trademark, copyright, or other proprietary rights</li>
            <li>Spam, malware, viruses, or any other malicious code</li>
            <li>Content that violates the privacy or publicity rights of any person</li>
          </ul>
        </div>

        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">6. Advertising</h2>
          <p className="mb-3">
            FlexoTools displays advertisements via Google AdSense to fund free access to our tools.
            By using the Service you acknowledge that:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Ads may appear on any page of the Service</li>
            <li>Personalised ads are shown only if you accept cookies via the consent banner</li>
            <li>Non-personalised ads are shown regardless of your cookie choice</li>
            <li>You can manage ad personalisation at your Google account settings</li>
          </ul>
        </div>

        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">7. Payment and Subscription Terms</h2>
          <p className="mb-3">
            Core tools are free to use. If paid plans are introduced in the future, billing will
            be on a recurring basis (monthly or annual). You will be notified before any free
            features become paid.
          </p>
          <p>
            If paid plans are introduced, you may cancel at any time through your account
            settings and retain access until the end of your current billing period.
          </p>
        </div>

        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">8. Service Availability</h2>
          <p className="mb-3">
            We strive to provide uninterrupted service but cannot guarantee availability at all
            times. We may perform maintenance that results in temporary interruptions.
          </p>
          <p>
            We reserve the right to change, update, suspend, or discontinue the Service at any
            time without notice.
          </p>
        </div>

        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">9. Limitation of Liability</h2>
          <p className="mb-3">
            The Service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind.
            We do not warrant that the Service will be uninterrupted, error-free, or secure.
          </p>
          <p>
            In no event shall FlexoTools or its affiliates be liable for any indirect, incidental,
            special, consequential, or punitive damages resulting from your use of or inability
            to use the Service.
          </p>
        </div>

        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">10. Indemnification</h2>
          <p>
            You agree to defend, indemnify, and hold harmless FlexoTools and its officers,
            directors, employees, and agents from any claims, damages, or expenses arising from
            your use of the Service or violation of these Terms.
          </p>
        </div>

        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">11. Termination</h2>
          <p className="mb-3">
            We may terminate or suspend your account immediately, without prior notice, if you
            breach these Terms.
          </p>
          <p>
            Upon termination your right to use the Service ceases immediately. To delete your
            account, contact us at support@flexotools.com.
          </p>
        </div>

        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">12. Governing Law</h2>
          <p>
            These Terms are governed by the laws of India. Any disputes arising from these Terms
            shall be subject to the exclusive jurisdiction of the courts in India.
          </p>
        </div>

        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">13. Changes to These Terms</h2>
          <p className="mb-3">
            We may modify these Terms at any time. For material changes we will provide at least
            30 days notice before new terms take effect.
          </p>
          <p>
            Continued use of the Service after changes are posted constitutes acceptance of the
            revised Terms.
          </p>
        </div>

        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">14. Contact Us</h2>
          <p className="mb-3">If you have questions about these Terms, please contact us:</p>
          <div className="p-4 bg-foreground/5 rounded-xl border border-foreground/10 space-y-1">
            <p className="font-medium text-foreground">Email:{' '}
              <a href="mailto:support@flexotools.com" className="text-purple-500 hover:underline">
                support@flexotools.com
              </a>
            </p>
            <p className="font-medium text-foreground">Website: https://flexotools.com</p>
          </div>
        </div>
      </section>
    </main>
  )
}