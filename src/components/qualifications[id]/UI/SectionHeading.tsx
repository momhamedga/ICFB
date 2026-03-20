import { ReactNode } from "react";

interface SectionHeadingProps {
  icon: ReactNode;
  title: string;
  color?: string; // اختياري لتغيير لون الأيقونة إذا أردت
}

export default function SectionHeading({ icon, title, color = "text-[#ef4444]" }: SectionHeadingProps) {
  return (
    <div className="flex items-center gap-6 group">
      {/* Icon Wrapper */}
      <div className={`
        w-16 h-16 rounded-[1.25rem] bg-white border border-slate-100 
        flex items-center justify-center ${color} 
        shadow-[0_8px_30px_rgb(0,0,0,0.04)] 
        group-hover:shadow-[0_20px_40px_rgba(239,68,68,0.1)] 
        group-hover:border-[#ef4444]/20 
        transition-all duration-500
      `}>
        {icon}
      </div>

      {/* Title */}
      <div className="space-y-1">
        <h2 className="text-3xl md:text-4xl font-black text-[#001b3a] tracking-[-0.04em] leading-none">
          {title}
        </h2>
        {/* Decorative Line */}
        <div className="w-8 h-[2px] bg-[#ef4444] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>
    </div>
  );
}