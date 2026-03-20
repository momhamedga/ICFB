"use client";

import React, { memo } from "react";

// تعريف الـ Props بوضوح لمنع أخطاء الـ Type
interface BadgeProps {
  children: React.ReactNode;
}

export const GridBackground = memo(() => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      {/* طبقة النقاط - Grid System */}
      <div 
        className="absolute inset-0 opacity-[0.15]" 
        style={{ 
          backgroundImage: `radial-gradient(#ef4444 0.5px, transparent 0.5px)`, 
          backgroundSize: '24px 24px' 
        }} 
      />
      {/* توهج مركزي ناعم */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.08)_0%,transparent_70%)]" />
    </div>
  );
});

GridBackground.displayName = "GridBackground";

export const ServiceBadge = memo(({ children }: BadgeProps) => {
  return (
    <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[8px] font-black uppercase tracking-[0.2em] backdrop-blur-md inline-block">
      {children}
    </span>
  );
});

ServiceBadge.displayName = "ServiceBadge";