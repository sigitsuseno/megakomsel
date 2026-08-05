import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Native module better-sqlite3 tidak boleh di-bundle oleh server bundler
  serverExternalPackages: ["better-sqlite3"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "placehold.co" },
    ],
  },
};

export default nextConfig;