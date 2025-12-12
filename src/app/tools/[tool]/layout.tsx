// src/app/tools/[tool]/layout.tsx
// This layout applies SEO to ALL tool pages automatically

import { 
  generateToolMetadata, 
  generateHowToSchema, 
  generateWebAppSchema,
  generateBreadcrumbSchema
} from "@/lib/seo"

// Generate metadata dynamically for each tool
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ tool: string }> 
}) {
  const { tool } = await params
  return generateToolMetadata(tool)
}

export default async function ToolLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ tool: string }>
}) {
  const { tool } = await params
  
  const howToSchema = generateHowToSchema(tool)
  const webAppSchema = generateWebAppSchema(tool)
  const breadcrumbSchema = generateBreadcrumbSchema(tool)

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
      
      {/* Structured Data - Breadcrumbs */}
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