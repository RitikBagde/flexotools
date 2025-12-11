// src/app/legal/privacy/page.tsx
"use client";

export default function PrivacyPolicyPage() {
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
        Privacy Policy
      </h1>
      <p className="text-foreground/60 mb-8 text-sm">
        Last updated: {lastUpdated}
      </p>

      <section className="space-y-6 text-foreground/80 text-sm leading-relaxed">
        <p>
          At FlexoTools, we take your privacy seriously. This Privacy Policy explains how we collect, 
          use, disclose, and safeguard your information when you use our services. Please read this policy carefully.
        </p>

        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">1. Information We Collect</h2>
          
          <h3 className="text-lg font-semibold text-foreground mb-2 mt-4">Personal Information</h3>
          <p className="mb-3">
            We may collect personal information that you voluntarily provide to us when you:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
            <li>Register for an account (email address, name)</li>
            <li>Subscribe to our newsletter or marketing communications</li>
            <li>Contact us for customer support</li>
            <li>Participate in surveys or promotions</li>
            {/* <li>Make a payment (billing information processed securely through Stripe)</li> */}
          </ul>

          <h3 className="text-lg font-semibold text-foreground mb-2 mt-4">Usage Data</h3>
          <p className="mb-3">
            We automatically collect certain information when you visit, use, or navigate our Service:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
            <li>Log and usage data (IP address, browser type, device information, pages visited)</li>
            {/* <li>Tool usage statistics (which tools you use, frequency of use)</li> */}
            <li>Performance metrics (processing times, file sizes)</li>
            <li>Cookies and tracking technologies (see our Cookie Policy for details)</li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mb-2 mt-4">File Data</h3>
          <p>
            When you use our tools, we temporarily process your uploaded files (images, PDFs, documents, etc.). 
            These files are processed in memory and are automatically deleted after processing is complete, typically 
            within minutes. We do not permanently store your files unless you explicitly save them to your account.
          </p>
        </div>

        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">2. How We Use Your Information</h2>
          <p className="mb-3">
            We use the information we collect or receive to:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Provide, operate, and maintain our Service</li>
            {/* <li>Process your transactions and manage your subscriptions</li> */}
            <li>Send you important updates, security alerts, and support messages</li>
            <li>Respond to your comments, questions, and customer service requests</li>
            <li>Analyze usage trends and improve our tools and services</li>
            <li>Detect, prevent, and address technical issues and security threats</li>
            <li>Comply with legal obligations and enforce our Terms of Service</li>
            <li>Send you marketing communications (with your consent, and you can opt-out anytime)</li>
          </ul>
        </div>

        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">3. How We Share Your Information</h2>
          <p className="mb-3">
            We may share your information in the following situations:
          </p>
          
          <h3 className="text-lg font-semibold text-foreground mb-2 mt-4">Service Providers</h3>
          <p className="mb-3">
            We may share your information with third-party vendors, service providers, and contractors who perform 
            services for us, including:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
            <li><strong>Authentication:</strong> Supabase for user authentication and account management</li>
            {/* <li><strong>Payment Processing:</strong> RazorPay for secure payment processing</li> */}
            <li><strong>Hosting:</strong> Vercel for application hosting and deployment</li>
            <li><strong>Analytics:</strong> Google Analytics or similar services for usage analytics</li>
            {/* <li><strong>Email:</strong> SendGrid or similar services for transactional emails</li> */}
          </ul>

          <h3 className="text-lg font-semibold text-foreground mb-2 mt-4">Legal Requirements</h3>
          <p className="mb-3">
            We may disclose your information if required to do so by law or in response to valid requests by public 
            authorities (e.g., court orders, subpoenas).
          </p>

          <h3 className="text-lg font-semibold text-foreground mb-2 mt-4">Business Transfers</h3>
          <p>
            If we are involved in a merger, acquisition, or asset sale, your information may be transferred. 
            We will provide notice before your information is transferred and becomes subject to a different Privacy Policy.
          </p>
        </div>

        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">4. Data Retention</h2>
          <p className="mb-3">
            We retain your information for as long as necessary to:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
            <li>Provide you with our services</li>
            <li>Comply with legal obligations</li>
            <li>Resolve disputes and enforce our agreements</li>
          </ul>
          <p>
            Uploaded files are processed temporarily and automatically deleted after processing (typically within minutes 
            to a few hours). Account data is retained until you request deletion or we terminate inactive accounts 
            according to our data retention policy.
          </p>
        </div>

        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">5. Data Security</h2>
          <p className="mb-3">
            We implement appropriate technical and organizational security measures to protect your information:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
            <li>Encryption in transit (HTTPS/TLS) and at rest</li>
            <li>Secure authentication with Supabase</li>
            <li>Regular security audits and updates</li>
            <li>Access controls and authentication requirements</li>
            {/* <li>Secure payment processing through PCI-compliant providers</li> */}
          </ul>
          <p>
            However, no method of transmission over the Internet or electronic storage is 100% secure. 
            While we strive to use commercially acceptable means to protect your information, we cannot 
            guarantee its absolute security.
          </p>
        </div>

        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">6. Your Privacy Rights</h2>
          <p className="mb-3">
            Depending on your location, you may have the following rights regarding your personal information:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
            <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
            <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
            <li><strong>Deletion:</strong> Request deletion of your personal information</li>
            <li><strong>Portability:</strong> Request a copy of your data in a machine-readable format</li>
            <li><strong>Objection:</strong> Object to processing of your information for certain purposes</li>
            <li><strong>Withdraw Consent:</strong> Withdraw consent for processing where we rely on consent</li>
          </ul>
          <p>
            To exercise these rights, please contact us. We will respond to your 
            request within 30 days.
          </p>
        </div>

        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">7. Cookies and Tracking Technologies</h2>
          <p className="mb-3">
            We use cookies and similar tracking technologies to track activity on our Service and store certain information. 
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>
          <p>
            For more detailed information about the cookies we use and your choices regarding cookies, 
            please visit our Cookie Policy.
          </p>
        </div>

        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">8. Children&apos;s Privacy</h2>
          <p>
            Our Service is not intended for children under 13 years of age. We do not knowingly collect 
            personally identifiable information from children under 13. If you are a parent or guardian and 
            you believe your child has provided us with personal information, please contact us immediately.
          </p>
        </div>

        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">9. International Data Transfers</h2>
          <p>
            Your information may be transferred to and maintained on computers located outside of your state, 
            province, country, or other governmental jurisdiction where data protection laws may differ. 
            If you are located outside the India and choose to provide information to us, we transfer 
            the information to the India and process it there.
          </p>
        </div>

        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">10. Third-Party Links</h2>
          <p>
            Our Service may contain links to third-party websites that are not operated by us. We have no control 
            over and assume no responsibility for the content, privacy policies, or practices of any third-party sites.
          </p>
        </div>

        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">11. Changes to This Privacy Policy</h2>
          <p className="mb-3">
            We may update our Privacy Policy from time to time. We will notify you of any changes by:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
            <li>Updating the &quot;Last updated&quot; date at the top of this Privacy Policy</li>
            <li>Sending you an email notification for material changes</li>
            <li>Displaying a prominent notice on our Service</li>
          </ul>
          <p>
            You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy 
            are effective when they are posted on this page.
          </p>
        </div>

        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">12. Contact Us</h2>
          <p className="mb-3">
            If you have any questions about this Privacy Policy, please contact us.
          </p>
          {/* <div className="mt-3 p-4 bg-foreground/5 rounded-lg border border-foreground/10">
            <p className="font-medium text-foreground mb-2">Email: privacy@microsaas.com</p>
            <p className="font-medium text-foreground mb-2">Support: support@microsaas.com</p>
            <p className="font-medium text-foreground">Website: www.microsaas.com</p>
          </div> */}
        </div>
      </section>
    </main>
  );
}