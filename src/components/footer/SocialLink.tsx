// src/components/footer/SocialLink.tsx
import { memo } from "react";
import Link from "next/link";

export const SocialLink = memo(({ Icon, href = "#" }: any) => (
  <Link 
    href={href} 
    className="h-12 w-full bg-white/[0.03] border border-white/5 flex items-center justify-center text-zinc-500 hover:text-white hover:bg-red-600/20 hover:border-red-600/40 transition-all duration-500 rounded-2xl group"
  >
    <Icon size={18} className="group-hover:scale-110 transition-transform duration-500" />
  </Link>
));
SocialLink.displayName = "SocialLink";