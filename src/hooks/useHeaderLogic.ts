// src/hooks/useHeaderLogic.ts
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export function useHeaderLogic() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [portalOpen, setPortalOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState(pathname);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setPortalOpen(false);
    setHoveredPath(pathname);
  }, [pathname]);

  return { scrolled, isOpen, setIsOpen, portalOpen, setPortalOpen, hoveredPath, setHoveredPath, pathname };
}