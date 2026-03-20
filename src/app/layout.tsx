import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header"; 
import Footer from "@/components/Footer";
import DynamicFavicon from "@/components/DynamicFavicon";

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
        {/* 2. بنحط Fallback Icon بسيط في البداية عشان الـ SEO */}
        <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><circle cx='16' cy='16' r='14' fill='%23E63946'/></svg>" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}>
        
        {/* المكونات العالمية (Global Logic) */}
        <DynamicFavicon />
        
        <Header />
        
        {/* المحتوى الرئيسي */}
        <main className="min-h-screen pt-[140px]"> 
          {children}
        </main>

        <Footer/>
      </body>
    </html>
  );
}