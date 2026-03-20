// src/components/ui/MagneticWrapper.tsx
"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";

export default function MagneticWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  
  // قيم الحركة الأساسية
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // جعل الحركة "ناعمة" جداً (Ultra-Smooth Springs)
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = 'touches' in e ? e.touches[0] : e;
    const { width, height, left, top } = ref.current.getBoundingClientRect();
    
    // حساب المسافة من مركز العنصر
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // قوة الجذب (بمقدار 30 بكسل كحد أقصى)
    x.set((clientX - centerX) * 0.4); 
    y.set((clientY - centerY) * 0.4);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
      onMouseLeave={reset}
      onTouchEnd={reset}
      style={{ x: mouseX, y: mouseY }}
      className="relative"
    >
      {children}
    </motion.div>
  );
}