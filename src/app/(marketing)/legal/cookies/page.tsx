// src/app/legal/cookies/page.tsx
"use client";

export default function CookiePolicyPage() {
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
        Cookie Policy
      </h1>
      <p className="text-foreground/60 mb-8 text-sm">
        Last updated: {lastUpdated}
      </p>

      <section className="space-y-6 text-foreground/80 text-sm leading-relaxed">
        <p>
          This Cookie Policy explains how FlexoTools (&quot;we&quot;, &quot;us&quot;, and &quot;our&quot;) uses cookies and 
          similar technologies to recognize you when you visit our website. It explains what these technologies are 
          and why we use them, as well as your rights to control our use of them.
        </p>

        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">1. What Are Cookies?</h2>
          <p className="mb-3">
            Cookies are small text files that are placed on your computer or mobile device when you visit a website. 
            They are widely used to make websites work, or work more efficiently, as well as to provide information 
            to the owners of the site.
          </p>
          <p>
            Cookies set by the website owner (in this case, FlexoTools) are called &quot;first-party cookies&quot;. 
            Cookies set by parties other than the website owner are called &quot;third-party cookies&quot;.
          </p>
        </div>

        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">2. Why Do We Use Cookies?</h2>
          <p className="mb-3">
            We use first-party and third-party cookies for several reasons:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>To enable certain functions of our Service</li>
            <li>To provide analytics and understand how our Service is used</li>
            <li>To remember your preferences (such as theme selection)</li>
            <li>To keep you logged in to your account</li>
            <li>To improve overall user experience</li>
            <li>For security purposes and fraud detection</li>
          </ul>
        </div>

        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">3. Types of Cookies We Use</h2>

          <div className="mt-4 p-4 bg-foreground/5 rounded-lg border border-foreground/10">
            <h3 className="text-lg font-semibold text-foreground mb-2">Essential Cookies</h3>
            <p className="mb-2">
              These cookies are strictly necessary for the operation of our Service. They enable core functionality 
              such as security, network management, and accessibility.
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
              <li><strong>Authentication cookies:</strong> Keep you logged in as you navigate between pages</li>
              <li><strong>Security cookies:</strong> Help detect fraudulent activity and protect user data</li>
              <li><strong>Session cookies:</strong> Maintain your session state across page requests</li>
            </ul>
            <p className="mt-2 text-xs text-foreground/60">
              Duration: Session-based or up to 30 days
            </p>
          </div>

          <div className="mt-4 p-4 bg-foreground/5 rounded-lg border border-foreground/10">
            <h3 className="text-lg font-semibold text-foreground mb-2">Preference Cookies</h3>
            <p className="mb-2">
              These cookies enable our website to remember information that changes the way the website behaves 
              or looks, such as your preferred language or theme (light/dark mode).
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
              <li><strong>Theme preference:</strong> Remembers your light/dark mode selection</li>
              <li><strong>Language preference:</strong> Stores your language selection</li>
              <li><strong>Layout preferences:</strong> Remembers your customization choices</li>
            </ul>
            <p className="mt-2 text-xs text-foreground/60">
              Duration: Up to 1 year
            </p>
          </div>

          <div className="mt-4 p-4 bg-foreground/5 rounded-lg border border-foreground/10">
            <h3 className="text-lg font-semibold text-foreground mb-2">Analytics Cookies</h3>
            <p className="mb-2">
              These cookies help us understand how visitors interact with our website by collecting and reporting 
              information anonymously. This helps us improve our Service.
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
              <li><strong>Google Analytics:</strong> Tracks page views, user behavior, and traffic sources</li>
              <li><strong>Usage metrics:</strong> Records which tools are most popular</li>
              <li><strong>Performance monitoring:</strong> Helps identify and fix technical issues</li>
            </ul>
            <p className="mt-2 text-xs text-foreground/60">
              Duration: Up to 2 years
            </p>
          </div>

          <div className="mt-4 p-4 bg-foreground/5 rounded-lg border border-foreground/10">
            <h3 className="text-lg font-semibold text-foreground mb-2">Marketing Cookies</h3>
            <p className="mb-2">
              These cookies track your online activity to help advertisers deliver more relevant advertising or 
              to limit how many times you see an ad. We only use these with your explicit consent.
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4 text-sm">
              <li><strong>Advertising cookies:</strong> Remember websites you visit to show relevant ads</li>
              <li><strong>Social media cookies:</strong> Enable social sharing features</li>
              <li><strong>Retargeting cookies:</strong> Show ads based on your previous visits</li>
            </ul>
            <p className="mt-2 text-xs text-foreground/60">
              Duration: Up to 1 year
            </p>
          </div>
        </div>

        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">4. Third-Party Cookies</h2>
          <p className="mb-3">
            In addition to our own cookies, we may also use various third-party cookies to report usage statistics, 
            deliver advertisements, and so on. These include:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Google Analytics:</strong> Helps us understand how users interact with our Service</li>
            <li><strong>Stripe:</strong> For secure payment processing</li>
            <li><strong>Supabase:</strong> For authentication and database services</li>
            <li><strong>Social media platforms:</strong> If you use social sharing features</li>
          </ul>
        </div>

        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">5. How Can You Control Cookies?</h2>
          
          <h3 className="text-lg font-semibold text-foreground mb-2 mt-4">Browser Controls</h3>
          <p className="mb-3">
            Most web browsers allow you to control cookies through their settings. You can set your browser to:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
            <li>Block all cookies</li>
            <li>Accept cookies only from specific websites</li>
            <li>Delete cookies when you close your browser</li>
            <li>Alert you when websites try to set cookies</li>
          </ul>

          <h3 className="text-lg font-semibold text-foreground mb-2 mt-4">Browser-Specific Instructions</h3>
          <div className="space-y-2 ml-4 mb-4">
            <p><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</p>
            <p><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</p>
            <p><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</p>
            <p><strong>Edge:</strong> Settings → Privacy, search, and services → Cookies and site permissions</p>
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-2 mt-4">Opt-Out Links</h3>
          <p className="mb-3">
            You can opt out of certain third-party cookies:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li><strong>Google Analytics:</strong> Use the Google Analytics Opt-out Browser Add-on</li>
            <li><strong>Advertising:</strong> Visit the Network Advertising Initiative opt-out page</li>
          </ul>

          <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
            <p className="text-yellow-700 dark:text-yellow-400 font-medium mb-2">
              ⚠️ Important Note
            </p>
            <p className="text-foreground/80">
              If you disable or refuse cookies, please note that some parts of our Service may become inaccessible 
              or not function properly. Essential cookies cannot be disabled as they are necessary for the Service to work.
            </p>
          </div>
        </div>

        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">6. Do Not Track Signals</h2>
          <p>
            Some browsers have a &quot;Do Not Track&quot; feature that lets you tell websites that you do not want to have 
            your online activities tracked. Currently, our Service does not respond to Do Not Track signals. 
            However, you can still manage your cookie preferences as described above.
          </p>
        </div>

        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">7. Updates to This Cookie Policy</h2>
          <p className="mb-3">
            We may update this Cookie Policy from time to time to reflect changes in our practices or for other 
            operational, legal, or regulatory reasons. When we make changes, we will update the &quot;Last updated&quot; date 
            at the top of this page.
          </p>
          <p>
            We encourage you to review this Cookie Policy periodically to stay informed about our use of cookies.
          </p>
        </div>

        <div className="border-t border-foreground/10 pt-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">8. More Information</h2>
          <p className="mb-3">
            If you have any questions about our use of cookies or other technologies, please contact us.
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