"use client";

import { memo } from "react";

// فصل البادج كمكون مستقل لسهولة التعديل
export const ServiceBadge = memo(({ children }: { children: string }) => (
  <span className="px-4 py-1.5 rounded-full bg-red-600/10 border border-red-600/20 text-red-500 text-[9px] font-black uppercase tracking-[0.3em] backdrop-blur-md">
    {children}
  </span>
));
ServiceBadge.displayName = "ServiceBadge";

// مكون الأيقونة مع تأثير التوهج الخلفي (Neon Glow)
export const ServiceIcon = memo(({ icon }: { icon: React.ReactNode }) => (
  <div className="relative group/icon">
    {/* طبقة التوهج - تعمل فقط عند الـ Hover */}
    <div className="absolute inset-0 bg-red-600 blur-2xl opacity-20 group-hover/icon:opacity-50 transition-opacity duration-700" />
    <div className="relative w-16 h-16 rounded-[2rem] bg-[#002a54] border border-white/10 flex items-center justify-center text-red-600 shadow-2xl transition-all duration-700 group-hover:scale-110 group-hover:-rotate-12">
      {icon}
    </div>
  </div>
));
ServiceIcon.displayName = "ServiceIcon";