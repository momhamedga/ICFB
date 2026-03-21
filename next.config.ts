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
    unoptimized: true, 
  },

  // ✅ تفعيل هذا السطر إلزامي لاستضافات Hostinger و VPS
  output: 'standalone', 

  generateEtags: false, 
};

export default nextConfig;