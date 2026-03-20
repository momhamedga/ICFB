// src/components/layout/header/NavLink.tsx
import { motion } from "framer-motion";
import Link from "next/link";

interface NavLinkProps {
  item: { name: string; href: string };
  isActive: boolean;
  isHovered: boolean;
  onHover: (path: string) => void;
  isDark: boolean;
}

export const NavLink = ({ item, isActive, isHovered, onHover, isDark }: NavLinkProps) => (
  <Link 
    href={item.href}
    onMouseEnter={() => onHover(item.href)}
    className={`px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] transition-all relative z-10
      ${(isActive || isHovered) ? "text-red-500" : isDark ? "text-zinc-400 hover:text-white" : "text-zinc-500 hover:text-zinc-900"}`}
  >
    {item.name}
    {(isHovered || isActive) && (
      <motion.span
        layoutId="nav-pill"
        className={`absolute inset-0 rounded-full -z-10 ${isDark ? 'bg-white/5' : 'bg-red-50/50'}`}
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
      />
    )}
  </Link>
);