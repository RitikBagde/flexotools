// src/app/tools/[tool]/layout.tsx
// This layout applies SEO to ALL tool pages automatically

// ============================================
// FILE 2: src/app/tools/[tool]/layout.tsx (IMPROVED VERSION)
// ============================================

import { 
  generateToolMetadata, 
  generateHowToSchema, 
  generateWebAppSchema,
  generateBreadcrumbSchema // ✅ NEW
} from "@/lib/seo"

// Generate metadata dynamically for each tool
export async function generateMetadata({ params }: { params: { tool: string } }) {
  return generateToolMetadata(params.tool)
}

export default function ToolLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { tool: string }
}) {
  const howToSchema = generateHowToSchema(params.tool)
  const webAppSchema = generateWebAppSchema(params.tool)
  const breadcrumbSchema = generateBreadcrumbSchema(params.tool) // ✅ NEW

  return (
    <>
      {/* Structured Data - HowTo */}
      {howToSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
      )}
      
      {/* Structured Data - WebApplication */}
      {webAppSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        />
      )}
      
      {/* ✅ NEW: Structured Data - Breadcrumbs */}
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      
      {/* Tool Content */}
      <div className="min-h-screen">
        {children}
      </div>
    </>
  )
}