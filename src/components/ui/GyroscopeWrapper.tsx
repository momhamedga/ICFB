"use client";

import { motion, useSpring, useMotionValue } from "framer-motion";
import { useEffect } from "react";

export default function GyroscopeWrapper({ children }: { children: React.ReactNode }) {
  // قيم الحركة (X, Y)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // تنعيم الحركة (Physics) عشان متبقاش متقطعة
  const springX = useSpring(x, { stiffness: 100, damping: 20 });
  const springY = useSpring(y, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const handleMotion = (e: DeviceOrientationEvent) => {
      // الحساس بيقرأ زوايا الميل (beta للميل الأمامي و gamma للميل الجانبي)
      const { beta, gamma } = e;
      if (beta && gamma) {
        // تحويل الزوايا لقيم بكسل بسيطة (حركة خفيفة جداً 15px بحد أقصى)
        x.set(gamma / 2); 
        y.set((beta - 45) / 2); // طرحنا 45 لأن ده وضع مسكة الموبايل الطبيعية
      }
    };

    // طلب الإذن في الـ iOS (أمر ضروري في التحديثات الجديدة)
    if (typeof DeviceOrientationEvent !== 'undefined' && 
        typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      // بنسيب المستخدم يفعلها بضغطة أول مرة (سياسة الخصوصية)
    } else {
      window.addEventListener("deviceorientation", handleMotion);
    }

    return () => window.removeEventListener("deviceorientation", handleMotion);
  }, [x, y]);

  return (
    <motion.div style={{ x: springX, y: springY }}>
      {children}
    </motion.div>
  );
}