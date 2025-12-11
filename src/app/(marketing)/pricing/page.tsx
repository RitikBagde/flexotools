// src/app/pricing/page.tsx
"use client";

import Link from "next/link";
import { useState } from "react";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      name: "Free",
      price: { monthly: 0, yearly: 0 },
      description: "Great for personal use and testing.",
      features: [
        "Access to basic tools",
        "5 uses per day per tool",
        "Standard processing speed",
        "Community support",
        "Basic analytics"
      ],
      buttonText: "Get Started",
      buttonLink: "/",
      buttonVariant: "secondary",
      popular: false
    },
    {
      name: "Pro",
      price: { monthly: 9, yearly: 90 },
      description: "For power users and small teams.",
      features: [
        "All Free features",
        "Unlimited tool usage",
        "5x faster processing",
        "Priority email support",
        "Advanced analytics",
        "Custom export formats",
        "API access (5K calls/mo)"
      ],
      buttonText: "Start Pro Trial",
      buttonLink: "#payment",
      buttonVariant: "primary",
      popular: true
    },
    {
      name: "Team",
      price: { monthly: 29, yearly: 290 },
      description: "For teams that need collaboration.",
      features: [
        "All Pro features",
        "Team workspaces (up to 10)",
        "Shared projects & assets",
        "Centralized billing",
        "Priority phone support",
        "Custom integrations",
        "API access (50K calls/mo)",
        "SSO & advanced security"
      ],
      buttonText: "Contact Sales",
      buttonLink: "#contact",
      buttonVariant: "secondary",
      popular: false
    }
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
          Simple, Transparent Pricing
        </h1>
        <p className="text-foreground/60 text-lg mb-8 max-w-2xl mx-auto">
          Start free and upgrade only when you need more power. No hidden fees, cancel anytime.
        </p>

        {/* Billing Toggle */}
        <div className="inline-flex items-center gap-3 p-1 bg-foreground/5 rounded-full">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              billingCycle === 'monthly'
                ? 'bg-linear-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                : 'text-foreground/60 hover:text-foreground'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              billingCycle === 'yearly'
                ? 'bg-linear-to-r from-purple-500 to-blue-500 text-white shadow-lg'
                : 'text-foreground/60 hover:text-foreground'
            }`}
          >
            Yearly
            <span className="ml-2 text-xs bg-green-500/20 text-green-500 px-2 py-0.5 rounded-full">
              Save 17%
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid gap-8 md:grid-cols-3 mb-16">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative rounded-2xl p-8 transition-all duration-300 hover:scale-105 ${
              plan.popular
                ? 'bg-linear-to-br from-purple-500/10 to-blue-500/10 border-2 border-purple-500 shadow-2xl shadow-purple-500/20'
                : 'bg-foreground/5 border border-foreground/10 hover:border-foreground/20'
            }`}
          >
            {/* Popular Badge */}
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-linear-to-r from-purple-500 to-blue-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg">
                  MOST POPULAR
                </span>
              </div>
            )}

            {/* Plan Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {plan.name}
              </h2>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-5xl font-bold text-foreground">
                  ${billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly}
                </span>
                {plan.price.monthly > 0 && (
                  <span className="text-foreground/60">
                    /{billingCycle === 'yearly' ? 'year' : 'month'}
                  </span>
                )}
              </div>
              <p className="text-foreground/60 text-sm">
                {plan.description}
              </p>
            </div>

            {/* Features List */}
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-foreground/80">
                  <svg
                    className="w-5 h-5 text-green-500 shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <Link
              href={plan.buttonLink}
              className={`block w-full py-3 px-6 rounded-lg font-semibold text-center transition-all duration-200 ${
                plan.buttonVariant === 'primary'
                  ? 'bg-linear-to-r from-purple-500 to-blue-500 text-white hover:shadow-xl hover:shadow-purple-500/30 hover:scale-105'
                  : 'bg-foreground/10 text-foreground hover:bg-foreground/20'
              }`}
            >
              {plan.buttonText}
            </Link>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <div className="mt-24 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
          Frequently Asked Questions
        </h2>
        <div className="space-y-6">
          <div className="p-6 bg-foreground/5 rounded-xl border border-foreground/10">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Can I change plans anytime?
            </h3>
            <p className="text-foreground/60">
              Yes! You can upgrade, downgrade, or cancel your subscription at any time. Changes take effect at the start of your next billing cycle.
            </p>
          </div>
          <div className="p-6 bg-foreground/5 rounded-xl border border-foreground/10">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              What payment methods do you accept?
            </h3>
            <p className="text-foreground/60">
              We accept all major credit cards (Visa, Mastercard, American Express) through Stripe. We also support PayPal for annual plans.
            </p>
          </div>
          <div className="p-6 bg-foreground/5 rounded-xl border border-foreground/10">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Is there a free trial for paid plans?
            </h3>
            <p className="text-foreground/60">
              Yes! Pro and Team plans come with a 14-day free trial. No credit card required to start.
            </p>
          </div>
          <div className="p-6 bg-foreground/5 rounded-xl border border-foreground/10">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Do you offer refunds?
            </h3>
            <p className="text-foreground/60">
              We offer a 30-day money-back guarantee on all paid plans. If you're not satisfied, contact us for a full refund.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-24 text-center p-12 bg-linear-to-br from-purple-500/10 to-blue-500/10 rounded-2xl border border-foreground/10">
        <h2 className="text-3xl font-bold mb-4 text-foreground">
          Still have questions?
        </h2>
        <p className="text-foreground/60 mb-6 max-w-xl mx-auto">
          Our team is here to help you choose the right plan for your needs.
        </p>
        <Link
          href="#contact"
          className="inline-flex items-center gap-2 px-8 py-3 bg-linear-to-r from-purple-500 to-blue-500 text-white rounded-lg font-semibold hover:shadow-xl hover:shadow-purple-500/30 hover:scale-105 transition-all duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Contact Sales
        </Link>
      </div>

      {/* Payment Placeholder */}
      <div id="payment" className="mt-16 p-8 bg-foreground/5 rounded-xl border border-foreground/10 text-center">
        <p className="text-foreground/60">
          💳 <strong>Payment integration coming soon!</strong> This will be connected to Stripe for secure checkout.
        </p>
      </div>
    </main>
  );
}