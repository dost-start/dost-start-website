import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable image optimization for better performance
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
      {
        protocol: "https",
        hostname: "i.imgur.com",
      },
      {
        protocol: "https",
        hostname: "media1.tenor.com",
      },
      {
        protocol: "https",
        hostname: "www.roice.xyz",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
    ],
    // Optimize image loading
    formats: ["image/avif", "image/webp"],
    // Cache optimized images for 1 year (immutable content)
    minimumCacheTTL: 31536000,
    // Allow slightly larger device sizes for better quality
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Enable experimental features for better performance
  experimental: {
    // Optimize package imports for faster builds
    optimizePackageImports: [
      "lucide-react",
      "react-icons",
      "@radix-ui/react-checkbox",
      "@radix-ui/react-dialog",
      "@radix-ui/react-label",
      "@radix-ui/react-popover",
      "@radix-ui/react-scroll-area",
      "@radix-ui/react-select",
      "@radix-ui/react-slot",
      "@radix-ui/react-tabs",
    ],
  },

  // Add cache headers for static assets
  async headers() {
    return [
      {
        // Cache static assets for 1 year
        source: "/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Cache fonts for 1 year
        source: "/:all*(woff|woff2|ttf|otf|eot)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
