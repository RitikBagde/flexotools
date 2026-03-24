import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  turbopack: {
    resolveAlias: {
      canvas: './empty-canvas.js',
    },
  },

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

  async redirects() {
    return [
      {
        source: '/tools/pdf-text',
        destination: '/tools/pdf-text-extractor',
        permanent: true,
      },
      {
        source: '/tools/resume-grader',
        destination: '/tools/resume-ats-checker',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;