// src/app/page.tsx
import Link from 'next/link';
import type { Metadata } from 'next';

// SEO: Page-specific metadata
export const metadata: Metadata = {
  title: "Free Online Tools - Image Compressor, PDF Extractor, QR Generator",
  description: "Use our free online tools: compress images up to 80%, extract text from PDFs, generate QR codes, score resumes with AI, and summarize text. No signup required. Privacy-first.",
  openGraph: {
    title: "FlexoTools - Free Online Tools for Everyone",
    description: "Fast, privacy-focused tools for image compression, PDF extraction, QR generation, and more",
    images: ["/og-home.png"], // TODO: Create specific OG image for homepage
  },
};

export default function Home() {
  const tools = [
    {
      href: '/tools/image-compressor',
      title: 'Image Compressor',
      description: 'Reduce image file sizes without losing quality',
      icon: '🖼️',
      gradient: 'from-purple-500 to-pink-500',
      stats: 'Up to 80% smaller',
    },
    {
      href: '/tools/pdf-text',
      title: 'PDF Text Extract',
      description: 'Extract text and data from PDF documents',
      icon: '📄',
      gradient: 'from-blue-500 to-cyan-500',
      stats: 'Swift Extract',
    },
    {
      href: '/tools/qr-generator',
      title: 'QR Generator',
      description: 'Create custom QR codes and Barcodes in seconds',
      icon: '📱',
      gradient: 'from-green-500 to-emerald-500',
      stats: 'Unlimited codes',
    },
    {
      href: '/tools/resume-grader',
      title: 'Resume ATS Scorer',
      description: 'AI-powered resume analysis and feedback',
      icon: '📋',
      gradient: 'from-orange-500 to-red-500',
      stats: 'Smart AI',
    },
    {
      href: '/tools/text-summarizer',
      title: 'Text Summarizer/Title Generator',
      description: 'Summarize long texts instantly',
      icon: '✨',
      gradient: 'from-violet-500 to-purple-500',
      stats: 'AI-powered',
    },
    {
      href: '#',
      title: 'More Tools',
      description: 'Additional tools are in development',
      icon: '🚀',
      gradient: 'from-gray-500 to-slate-500',
      stats: 'Stay tuned',
    },
  ];

  const features = [
    { icon: '⚡', title: 'Lightning Fast', description: 'Optimized for speed and performance' },
    { icon: '🔒', title: 'Privacy First', description: 'Your data never leaves your browser' },
    { icon: '🎯', title: 'Optional Signup', description: 'Only create an account for advanced tools' },
    { icon: '💎', title: 'Premium Quality', description: 'Professional-grade results' },
  ];

  return (
    <div className="space-y-20">
      {/* SEO: Structured Data for SoftwareApplication */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "FlexoTools",
            applicationCategory: "UtilitiesApplication",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              ratingCount: "10000",
            },
            operatingSystem: "Web Browser",
            description: "Free online tools for image compression, PDF extraction, QR code generation, resume scoring, and text summarization",
          }),
        }}
      />

      {/* Hero Section */}
      <section className="text-center space-y-6 py-12" aria-labelledby="hero-heading">
        <div className="inline-block">
          <span className="px-4 py-1.5 rounded-full bg-linear-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 text-sm font-medium text-foreground/80">
            ✨ Your All-in-One Toolkit
          </span>
        </div>
        
        {/* SEO: Main heading with keywords */}
        <h1 id="hero-heading" className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
          <span className="bg-linear-to-r from-purple-500 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
            Powerful Tools
          </span>
          <br />
          <span className="text-foreground">for Your Workflow</span>
        </h1>
        
        {/* SEO: Descriptive paragraph with keywords */}
        <p className="text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed">
          Fast, efficient, and privacy-focused tools for image compression, PDF extraction, 
          QR generation, and more. No signup required.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <a
            href="#tools"
            className="px-8 py-3 bg-linear-to-r from-purple-500 to-blue-500 text-white rounded-xl font-medium hover:shadow-xl hover:shadow-purple-500/20 hover:scale-105 transition-all duration-200"
            aria-label="Explore our free tools"
          >
            Explore Tools
          </a>
          <a
            href="#features"
            className="px-8 py-3 bg-foreground/5 hover:bg-foreground/10 text-foreground rounded-xl font-medium transition-all duration-200"
            aria-label="Learn more about our features"
          >
            Learn More
          </a>
        </div>

        {/* Stats - SEO: Add meaningful context */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-12" role="region" aria-label="Platform statistics">
          <div className="space-y-1">
            <div className="text-4xl font-bold bg-linear-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent" aria-label="10,000 plus active users">
              10K+
            </div>
            <div className="text-sm text-foreground/60">Active Users</div>
          </div>
          <div className="space-y-1">
            <div className="text-4xl font-bold bg-linear-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent" aria-label="50,000 plus files processed">
              50K+
            </div>
            <div className="text-sm text-foreground/60">Files Processed</div>
          </div>
          <div className="space-y-1">
            <div className="text-4xl font-bold bg-linear-to-r from-cyan-500 to-green-500 bg-clip-text text-transparent" aria-label="100 percent privacy safe">
              100%
            </div>
            <div className="text-sm text-foreground/60">Privacy Safe</div>
          </div>
        </div>
      </section>

      {/* Tools Grid - SEO: Semantic HTML with proper headings */}
      <section id="tools" className="space-y-8" aria-labelledby="tools-heading">
        <div className="text-center space-y-3">
          <h2 id="tools-heading" className="text-3xl md:text-4xl font-bold text-foreground">
            Choose Your Tool
          </h2>
          <p className="text-foreground/60">
            Select from our collection of powerful utilities
          </p>
        </div>

        {/* SEO: Grid with proper list semantics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
          {tools.map((tool, index) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group relative"
              style={{ animationDelay: `${index * 100}ms` }}
              aria-label={`${tool.title}: ${tool.description}`}
              role="listitem"
            >
              <article className="relative h-full p-6 rounded-2xl border border-foreground/10 bg-background/50 backdrop-blur-sm hover:border-foreground/20 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300 hover:-translate-y-1">
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 rounded-2xl bg-linear-to-br ${tool.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} aria-hidden="true"></div>
                
                {/* Content */}
                <div className="relative space-y-4">
                  {/* Icon */}
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${tool.gradient} flex items-center justify-center text-2xl shadow-lg`} aria-hidden="true">
                      {tool.icon}
                    </div>
                    <span className="text-xs font-medium text-foreground/40 group-hover:text-foreground/60 transition-colors">
                      {tool.stats}
                    </span>
                  </div>
                  
                  {/* Text */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-transparent group-hover:bg-linear-to-r group-hover:bg-clip-text group-hover:from-purple-500 group-hover:to-blue-500 transition-all">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-foreground/60 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                  
                  {/* Arrow */}
                  <div className="flex items-center text-sm font-medium text-foreground/40 group-hover:text-foreground/80 transition-colors">
                    <span>Try it now</span>
                    <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Section - SEO: Descriptive headings */}
      <section id="features" className="space-y-8" aria-labelledby="features-heading">
        <div className="text-center space-y-3">
          <h2 id="features-heading" className="text-3xl md:text-4xl font-bold text-foreground">
            Why Choose Us?
          </h2>
          <p className="text-foreground/60">
            Built with performance and privacy in mind
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" role="list">
          {features.map((feature, index) => (
            <article
              key={feature.title}
              className="p-6 rounded-xl bg-foreground/5 hover:bg-foreground/10 transition-all duration-300 space-y-3"
              style={{ animationDelay: `${index * 100}ms` }}
              role="listitem"
            >
              <div className="text-3xl" aria-hidden="true">{feature.icon}</div>
              <h3 className="text-lg font-bold text-foreground">{feature.title}</h3>
              <p className="text-sm text-foreground/60">{feature.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* CTA Section - SEO: Clear call to action */}
      <section className="relative overflow-hidden rounded-3xl bg-linear-to-br from-purple-500/10 via-blue-500/10 to-cyan-500/10 border border-foreground/10 p-12 text-center space-y-6" aria-labelledby="cta-heading">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.1)_1px,transparent_1px)] bg-size-[32px_32px]" aria-hidden="true"></div>
        
        <div className="relative space-y-4">
          <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold text-foreground">
            Ready to Get Started?
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            Join thousands of users who trust our tools for their workflow. 
            No credit card required.
          </p>
          <a href="#tools" aria-label="Start using our free tools">
            <button className="px-8 py-3 bg-linear-to-r from-purple-500 to-blue-500 text-white rounded-xl font-medium hover:shadow-xl hover:shadow-purple-500/20 hover:scale-105 transition-all duration-200">
              Start Using Tools
            </button>
          </a>  
        </div>
      </section>
    </div>
  );
}