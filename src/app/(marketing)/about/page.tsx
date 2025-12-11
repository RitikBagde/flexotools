export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:py-16">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-black text-foreground mb-4">
          About FlexoTools
        </h1>
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
          Your privacy-first collection of powerful, lightweight tools designed to make work faster and simpler.
        </p>
      </div>

      {/* Main Content Card */}
      <div className="bg-background/50 backdrop-blur-sm rounded-3xl shadow-xl p-6 sm:p-10 border-2 border-foreground/10 mb-8">
        
        {/* Mission Statement */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🚀</span>
            <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
          </div>
          <p className="text-foreground/80 leading-relaxed text-lg">
            FlexoTools is a collection of focused, privacy-friendly tools designed to make your daily workflow faster and simpler. From image compression and PDF text extraction to QR generation and AI-powered text utilities, everything is built to be fast, reliable, and easy to use.
          </p>
        </div>

        {/* Goals Section */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">🎯</span>
            <h2 className="text-2xl font-bold text-foreground">Our Goals</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border-2 border-purple-200 dark:border-purple-700">
              <span className="text-2xl">⚡</span>
              <div>
                <h3 className="font-bold text-foreground mb-1">Lightweight & Fast</h3>
                <p className="text-foreground/70">Provide simple tools without complicated dashboards or unnecessary bloat.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border-2 border-blue-200 dark:border-blue-700">
              <span className="text-2xl">🔒</span>
              <div>
                <h3 className="font-bold text-foreground mb-1">Privacy First</h3>
                <p className="text-foreground/70">Keep your data private — no unnecessary logging, tracking, or data collection.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border-2 border-green-200 dark:border-green-700">
              <span className="text-2xl">🎓</span>
              <div>
                <h3 className="font-bold text-foreground mb-1">Built for Everyone</h3>
                <p className="text-foreground/70">Help students, creators, and developers get things done quickly and efficiently.</p>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">⚙️</span>
            <h2 className="text-2xl font-bold text-foreground">How It Works</h2>
          </div>
          <p className="text-foreground/80 leading-relaxed text-lg mb-4">
            Most tools run directly in your browser or through secure API calls. We avoid storing personal data unless absolutely necessary for authentication or billing. You stay in control of your data.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 bg-foreground/5 rounded-xl">
              <div className="text-3xl mb-2">🌐</div>
              <div className="font-bold text-foreground mb-1">Browser-First</div>
              <div className="text-sm text-foreground/60">Processing happens locally when possible</div>
            </div>
            <div className="text-center p-4 bg-foreground/5 rounded-xl">
              <div className="text-3xl mb-2">🔐</div>
              <div className="font-bold text-foreground mb-1">Secure APIs</div>
              <div className="text-sm text-foreground/60">Encrypted connections for all tools</div>
            </div>
            <div className="text-center p-4 bg-foreground/5 rounded-xl">
              <div className="text-3xl mb-2">🚫</div>
              <div className="font-bold text-foreground mb-1">No Tracking</div>
              <div className="text-sm text-foreground/60">Your files stay yours forever</div>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">✨</span>
            <h2 className="text-2xl font-bold text-foreground">Why Choose Us?</h2>
          </div>
          <div className="bg-linear-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-6 border-2 border-purple-200 dark:border-purple-700">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-xl">✓</span>
                <span className="text-foreground/80">No signup required for basic tools</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">✓</span>
                <span className="text-foreground/80">Free forever tier with generous limits</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">✓</span>
                <span className="text-foreground/80">Fast processing with modern technology</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">✓</span>
                <span className="text-foreground/80">Works on all devices - desktop, tablet, mobile</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-xl">✓</span>
                <span className="text-foreground/80">Regular updates and new tools added frequently</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center bg-linear-to-r from-purple-500 to-blue-500 rounded-3xl p-8 sm:p-12 text-white shadow-2xl">
        <h2 className="text-3xl font-black mb-4">Ready to Get Started?</h2>
        <p className="text-lg mb-6 opacity-90">
          Try our tools now — no credit card, no commitment, no hassle.
        </p>
        <a 
          href="/"
          className="inline-block px-8 py-4 bg-white text-purple-600 font-bold rounded-2xl hover:scale-105 hover:shadow-xl transition-all"
        >
          🚀 Explore Tools
        </a>
      </div>
    </main>
  );
}