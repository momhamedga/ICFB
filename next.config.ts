import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ildjspneaxcpasnnflcu.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    // ضيف السطر ده عشان تحل مشكلة الـ 400 تماماً
    unoptimized: true, 
  },
};

export default nextConfig;