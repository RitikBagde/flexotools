import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  
  // Turbopack configuration for Next.js 16
  turbopack: {
    resolveAlias: {
      canvas: './empty-canvas.js',
    },
  },
  
  // Webpack configuration (for production builds)
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        canvas: false,
        encoding: false,
      };
    }
    return config;
  },
};

export default nextConfig;