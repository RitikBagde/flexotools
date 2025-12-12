// src/app/legal/metadata.ts
/**
 * Single source of truth for /legal/* metadata.
 * Update domain/logo/email here if you change environment.
 */

export const SITE = {
  name: "FlexoTools",
  domain: "https://flexotools.com", // <- update if your production domain differs
  logo: "https://flexotools.com/og-image.png", // OG image path
  contactEmail: "flexotools.app@gmail.com",
  supportEmail: "flexotools.team@gmail.com",
};

// Default datePublished for structured data; replace with actual launch date if desired
export const DEFAULT_PUBLISHED = "2024-01-01";

function buildBaseMeta(title: string, description: string, path: string) {
  const url = `${SITE.domain}${path}`;
  return {
    title,
    description,
    robots: { index: true, follow: true },
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE.name,
      type: "article",
      images: [SITE.logo],
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    // expose url (handy for pages)
    _url: url,
  } as const;
}

/** Metadata objects for each legal page */
export const privacyMetadata = buildBaseMeta(
  "Privacy Policy — FlexoTools",
  "FlexoTools Privacy Policy — how we collect, use, disclose, and protect your information when you use our services.",
  "/legal/privacy"
);

export const termsMetadata = buildBaseMeta(
  "Terms of Service — FlexoTools",
  "FlexoTools Terms of Service — the rules and policies governing your use of FlexoTools services.",
  "/legal/terms"
);

export const cookiesMetadata = buildBaseMeta(
  "Cookie Policy — FlexoTools",
  "FlexoTools Cookie Policy — how we use cookies and similar technologies, what cookies we use, and how you can control them.",
  "/legal/cookies"
);

/**
 * Helper: return JSON-LD graph (Organization + WebPage + BreadcrumbList)
 * - pageMeta: one of privacyMetadata / termsMetadata / cookiesMetadata
 * - dateModified: YYYY-MM-DD
 * - datePublished: optional (defaults to DEFAULT_PUBLISHED)
 */
export function makeLegalJsonLd(
  pageMeta: { title: string; description: string; _url: string },
  dateModified: string,
  datePublished = DEFAULT_PUBLISHED
) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE.domain}/#organization`,
        name: SITE.name,
        url: SITE.domain,
        logo: SITE.logo,
        contactPoint: [
          {
            "@type": "ContactPoint",
            email: SITE.contactEmail,
            contactType: "customer support",
          },
        ],
      },
      {
        "@type": "WebPage",
        "@id": pageMeta._url,
        url: pageMeta._url,
        name: pageMeta.title,
        description: pageMeta.description,
        inLanguage: "en-US",
        isPartOf: { "@id": `${SITE.domain}/#organization` },
        primaryImageOfPage: { url: SITE.logo },
        datePublished,
        dateModified,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.domain },
          { "@type": "ListItem", position: 2, name: "Legal", item: `${SITE.domain}/legal` },
          { "@type": "ListItem", position: 3, name: pageMeta.title.split(" — ")[0], item: pageMeta._url },
        ],
      },
    ],
  };
}
