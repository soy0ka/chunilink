import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "chunithm-net-eng.com",
        pathname: "/mobile/img/**",
      },
      {
        protocol: "https",
        hostname: "chunithm-net-eng.com",
        pathname: "/mobile/images/**",
      },
    ],
  },
};

export default nextConfig;
