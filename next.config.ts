import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    disableStaticImages: true,
    domains: ['simulator-full-movil.vercel.app'], 
  },
};

export default nextConfig;
