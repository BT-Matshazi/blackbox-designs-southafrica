import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/photos/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cms.blackboxdesigns.co.za",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  allowedDevOrigins: [
    "local-origin.dev",
    "*.local-origin.dev",
    "192.168.1.193", // Fixed: removed protocol and port
    "localhost", // Fixed: removed port
  ],
};

export default nextConfig;
