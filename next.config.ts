import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // Explicitly set output mode for Docker
  /* config options here */
};

export default nextConfig;
