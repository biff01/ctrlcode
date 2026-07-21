import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // Pin the workspace root to this project so Next.js doesn't pick the
    // parent-directory lockfile (C:\Users\Bahrom\package-lock.json).
    root: __dirname,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  allowedDevOrigins: ["10.252.4.197"],
};

export default nextConfig;
