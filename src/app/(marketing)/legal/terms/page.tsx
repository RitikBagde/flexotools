// src/app/legal/terms/page.tsx
"use client";

export default function TermsOfServicePage() {
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
        Terms of Service
      </h1>
      <p className="text-foreground/60 mb-8 text-sm">
        Last updated: {lastUpdated}
      </p>

      <section className="space-y-6 text-foreground/80 text-sm leading-relaxed">
        <p>
          Welcome to FlexoTools. By accessing or using our services, you agree to be bound by
          these Terms of Service. If you do not agree to these terms, please do not use our service.
        </p>

        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing and using FlexoTools (&quot;the Service&quot;), you accept and agree to be bound by the 
            terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
          </p>
        </div>

        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">2. Use of the Service</h2>
          <p className="mb-3">
            You agree to use the tools only for lawful purposes and in accordance with these terms. You must not use our Service:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>In any way that violates any applicable national or international law or regulation</li>
            <li>To transmit, or procure the sending of, any advertising or promotional material without our prior written consent</li>
            <li>To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity</li>
            <li>In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent, or harmful</li>
            <li>To engage in any other conduct that restricts or inhibits anyone&apos;s use or enjoyment of the Service</li>
          </ul>
        </div>

        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">3. User Accounts</h2>
          <p className="mb-3">
            When you create an account with us, you must provide accurate, complete, and current information at all times. 
            Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
          </p>
          <p>
            You are responsible for safeguarding the password that you use to access the Service and for any activities 
            or actions under your password. You agree not to disclose your password to any third party. You must notify 
            us immediately upon becoming aware of any breach of security or unauthorized use of your account.
          </p>
        </div>

        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">4. Intellectual Property Rights</h2>
          <p className="mb-3">
            The Service and its original content (excluding Content provided by users), features, and functionality are 
            and will remain the exclusive property of FlexoTools and its licensors.
          </p>
          <p>
            You retain all rights to any content you submit, post or display on or through the Service. By uploading 
            content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and process your 
            content solely for the purpose of providing the Service to you.
          </p>
        </div>

        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">5. Content Guidelines</h2>
          <p className="mb-3">
            You are responsible for any content you upload or process using the Service. You agree not to upload, process, or share:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Content that is illegal, harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable</li>
            <li>Content that infringes any patent, trademark, trade secret, copyright, or other proprietary rights</li>
            <li>Unsolicited or unauthorized advertising, promotional materials, spam, or any other form of solicitation</li>
            <li>Material that contains software viruses or any other malicious code</li>
          </ul>
        </div>

        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">6. Payment and Subscription Terms</h2>
          <p className="mb-3">
            Some aspects of the Service are provided on a subscription basis. You will be billed in advance on a recurring 
            and periodic basis (&quot;Billing Cycle&quot;). Billing cycles are set on a monthly or annual basis.
          </p>
          <p className="mb-3">
            A valid payment method, including credit card, is required to process the payment for your subscription. 
            You shall provide accurate and complete billing information.
          </p>
          <p>
            You may cancel your subscription at any time through your account settings. Upon cancellation, you will 
            continue to have access to the Service until the end of your current billing period.
          </p>
        </div>

        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">7. Refund Policy</h2>
          <p>
            We offer a 30-day money-back guarantee on all paid plans. If you are not satisfied with the Service, 
            you may request a full refund within 30 days of your initial purchase. Refunds beyond 30 days will 
            be considered on a case-by-case basis.
          </p>
        </div>

        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">8. Service Availability</h2>
          <p className="mb-3">
            We strive to provide uninterrupted service, but we cannot guarantee that the Service will be available 
            at all times. We may experience hardware, software, or other problems or need to perform maintenance 
            related to the Service, resulting in interruptions, delays, or errors.
          </p>
          <p>
            We reserve the right to change, revise, update, suspend, discontinue, or otherwise modify the Service 
            at any time or for any reason without notice to you.
          </p>
        </div>

        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">9. Limitation of Liability</h2>
          <p className="mb-3">
            The Service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied. 
            We do not warrant that the Service will be uninterrupted, timely, secure, or error-free.
          </p>
          <p>
            In no event shall FlexoTools, nor its directors, employees, partners, agents, suppliers, or affiliates, 
            be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, 
            loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or 
            inability to access or use the Service.
          </p>
        </div>

        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">10. Indemnification</h2>
          <p>
            You agree to defend, indemnify, and hold harmless FlexoTools and its licensee and licensors, and their 
            employees, contractors, agents, officers, and directors, from and against any and all claims, damages, obligations, 
            losses, liabilities, costs or debt, and expenses arising from your use of and access to the Service, or your 
            violation of these Terms.
          </p>
        </div>

        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">11. Termination</h2>
          <p className="mb-3">
            We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, 
            including without limitation if you breach the Terms.
          </p>
          <p>
            Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, 
            you may simply discontinue using the Service or contact us to request account deletion.
          </p>
        </div>

        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">12. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of your jurisdiction, without regard 
            to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be 
            considered a waiver of those rights.
          </p>
        </div>

        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">13. Changes to These Terms</h2>
          <p className="mb-3">
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision 
            is material, we will try to provide at least 30 days&apos; notice prior to any new terms taking effect.
          </p>
          <p>
            By continuing to access or use our Service after those revisions become effective, you agree to be bound 
            by the revised terms. If you do not agree to the new terms, please stop using the Service.
          </p>
        </div>

        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">14. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <div className="mt-3 p-4 bg-foreground/5 rounded-lg border border-foreground/10">
            <p className="font-medium text-foreground">Email: support@microsaas.com</p>
            <p className="font-medium text-foreground">Website: www.microsaas.com</p>
          </div>
        </div>
      </section>
    </main>
  );
}