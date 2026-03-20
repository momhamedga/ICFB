// src/components/shared/DynamicFavicon.tsx
"use client";
import { useUIStore } from "@/states/uiStore";
import { useEffect } from "react";

export default function DynamicFavicon() {
  const isPaletteOpen = useUIStore((state) => state.isPaletteOpen);
  const isMenuOpen = useUIStore((state) => state.isMenuOpen);

  useEffect(() => {
    const updateFavicon = () => {
      // تحديد لون الـ Favicon بناءً على حالة الموقع
      let color = "#E63946"; // اللون الاحمر الاساسي (الافتراضي)
      
      if (isPaletteOpen) {
        color = "#00F2FE"; // لون ازرق سيان عند فتح الباليت (حالة بحث)
      } else if (isMenuOpen) {
        color = "#A1FF0A"; // لون اخضر ليموني عند فتح المنيو (حالة ملاحة)
      }

      // رسم الـ SVG حياً (مثال بسيط: دائرة نابضة)
      const svgString = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
          <circle cx="16" cy="16" r="14" fill="${color}" opacity="0.8">
            <animate attributeName="r" from="14" to="16" dur="1s" begin="0s" repeatCount="indefinite" />
            <animate attributeName="opacity" from="0.8" to="0.3" dur="1s" begin="0s" repeatCount="indefinite" />
          </circle>
          <circle cx="16" cy="16" r="6" fill="${color}" />
        </svg>
      `;

      // تحويل الـ SVG لـ Data URL
      const encodedSvg = encodeURIComponent(svgString).replace(/'/g, '%27').replace(/"/g, '%22');
      const faviconUrl = `data:image/svg+xml;charset=utf-8,${encodedSvg}`;

      // تحديث الـ Link Tag في الـ HEAD
      const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
      if (link) {
        link.href = faviconUrl;
      }
    };

    updateFavicon();
  }, [isPaletteOpen, isMenuOpen]); // إعادة التشغيل عند تغير الحالات

  return null; // مكون وظيفي فقط
}