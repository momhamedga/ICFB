import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  
  // 1. أضف هذا السطر لضمان قراءة المسارات بشكل صحيح في الاستضافات المشتركة
  trailingSlash: true, 

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ildjspneaxcpasnnflcu.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    unoptimized: true, 
  },

  output: 'standalone', 
  generateEtags: false, 
};

export default nextConfig;