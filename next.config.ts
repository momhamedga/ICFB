import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // الـ React Compiler ميزة قوية بس ساعات بتعمل تضارب في الـ Chunks لو الـ Cache قديم
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
    // unoptimized مفيد جداً للصور، بس تأكد إن الـ Loader مش متعارض
    unoptimized: true, 
  },

  // ➕ ضيف السطر ده عشان تجبر Next.js ينضف الـ Build القديم تماماً
  generateEtags: false, 
  
  // تأكد إن الـ Output سليم لو شغال على استضافة عادية
  // output: 'standalone', // فك الضغط عن السطر ده لو شغال على Hostinger VPS
};

export default nextConfig;