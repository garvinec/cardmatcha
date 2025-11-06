/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // Enable Next.js image optimization for better FCP
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Allow external image domains from credit card issuers
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.citi.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.chase.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.americanexpress.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.capitalone.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.bankofamerica.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.wellsfargo.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.usbank.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.discover.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "secure.bankofamerica.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.citi.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.chase.com",
        pathname: "/**",
      },
    ],
  },
  // Enable compression
  compress: true,
};

export default nextConfig;
