import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header"; 
import Footer from "@/components/footer/Footer";
import DynamicFavicon from "@/components/ui/DynamicFavicon";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 1. شيلنا أي Favicon من الـ Metadata عشان الـ Component هو اللي يسيطر
export const metadata: Metadata = {
  title: "ICFB | International Coaching Federation of British",
  description: "The leading federation for professional coaching and qualifications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><circle cx='16' cy='16' r='14' fill='%23E63946'/></svg>" />
      </head>
      <body 
        suppressHydrationWarning={true} 
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F8FAFC] text-[#001429] selection:bg-[#E63946] selection:text-white`}
      >
        {/* --- 🏗️ Global Blueprint Background --- */}
        <div className="fixed inset-0 -z-50 pointer-events-none">
          {/* 1. القاعدة البيضاء */}
          <div className="absolute inset-0 bg-[#F8FAFC]" />

          {/* 2. الشبكة الهندسية (Blueprint Grid) */}
          <div 
            className="absolute inset-0 opacity-[0.4]" 
            style={{
              backgroundImage: `
                linear-gradient(to right, #8080800a 1px, transparent 1px),
                linear-gradient(to bottom, #8080800a 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px'
            }} 
          />
          
          {/* 3. الإضاءات الخافتة الموحدة */}
          <div className="absolute top-[10%] -left-[10%] w-[600px] h-[600px] bg-[#E63946]/[0.03] rounded-full blur-[120px]" />
          <div className="absolute bottom-[20%] -right-[10%] w-[500px] h-[500px] bg-[#003366]/[0.03] rounded-full blur-[100px]" />

          {/* 4. تأثير الـ Noise الخفيف جداً لكسر حدة الألوان الديجيتال */}
          <div className="absolute inset-0 opacity-[0.015] bg-[url('https://www.transparenttextures.com/patterns/p6.png')]" />
        </div>

        <DynamicFavicon />
        
        <Header />
        
        {/* المحتوى الرئيسي */}
        {/* شيلنا الـ bg من هنا عشان نعتمد على الـ Layout */}
    <main className="relative z-10 min-h-screen pt-[100px] md:pt-[140px]">
          {children}
          
          {/* تدرج سفلي "ناعم" يظهر في نهاية كل صفحة أوتوماتيكياً */}
      </main>

        <Footer/>
      </body>
    </html>
  );
}