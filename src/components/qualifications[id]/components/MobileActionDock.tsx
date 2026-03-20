"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Download, Phone } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function MobileActionDock() {
  const [isVisible, setIsVisible] = useState(false);

  // إظهار الشريط فقط بعد التمرير لمسافة معينة
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 z-[100] md:hidden"
        >
          <div className="bg-[#001b3a]/90 backdrop-blur-2xl border border-white/10 p-4 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center gap-3">
            
            {/* زر التقديم السريع - الأساسي */}
            <Link href="/contact" className="flex-[2]">
              <button className="w-full h-14 bg-[#ef4444] text-white rounded-2xl font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-3 active:scale-95 transition-transform shadow-lg shadow-red-500/20">
                Apply_Now <Send size={14} />
              </button>
            </Link>

            {/* أزرار التواصل السريع */}
            <button className="w-14 h-14 bg-white/10 border border-white/10 text-white rounded-2xl flex items-center justify-center active:scale-90 transition-transform">
              <Download size={18} />
            </button>

            <a href="tel:+971..." className="w-14 h-14 bg-white text-[#001b3a] rounded-2xl flex items-center justify-center active:scale-90 transition-transform shadow-xl">
              <Phone size={18} />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}