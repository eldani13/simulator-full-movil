import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    disableStaticImages: true,
    domains: ['simulator-full-movil.vercel.app'], // Permite la optimización de imágenes desde tu dominio
  },
};

export default nextConfig;
