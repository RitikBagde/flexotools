export interface ToolConfig {
  path: string;
  name: string;
  requiresAuth: boolean;
  description?: string;
  icon?: string;
}

export const TOOLS_CONFIG: ToolConfig[] = [
  {
    path: '/tools/image-compress',
    name: 'Image Compress',
    requiresAuth: false, // Public tool
    description: 'Compress images without login',
    icon: '🖼️',
  },
  {
    path: '/tools/pdf-text',
    name: 'PDF to Text',
    requiresAuth: false, // Public tool
    description: 'Extract text from PDFs',
    icon: '📄',
  },
  {
    path: '/tools/resume-grader',
    name: 'Resume Grader',
    requiresAuth: true, // Protected - login required
    description: 'Grade your resume with AI',
    icon: '📝',
  },
  {
    path: '/tools/text-summarizer',
    name: 'Text Summarizer',
    requiresAuth: true, // Protected - login required
    description: 'Summarize text with AI',
    icon: '✍️',
  },
];

// Helper function to check if a tool requires authentication
export function isProtectedTool(pathname: string): boolean {
  const tool = TOOLS_CONFIG.find(t => pathname.startsWith(t.path));
  return tool?.requiresAuth ?? false;
}

// Helper function to get tool config
export function getToolConfig(pathname: string): ToolConfig | undefined {
  return TOOLS_CONFIG.find(t => pathname.startsWith(t.path));
}

// Get all protected tool paths
export function getProtectedToolPaths(): string[] {
  return TOOLS_CONFIG.filter(t => t.requiresAuth).map(t => t.path);
}

// Get all public tool paths
export function getPublicToolPaths(): string[] {
  return TOOLS_CONFIG.filter(t => !t.requiresAuth).map(t => t.path);
}