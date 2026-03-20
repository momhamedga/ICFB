"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Users, Briefcase, Award, ArrowUpRight } from "lucide-react";
import React from "react";

const features = [
  {
    title: "Expert People",
    tag: "HUMAN_LOGIC",
    description: "Our architects don't just code; they engineer digital destiny with surgical precision.",
    icon: <Users size={24} />,
    color: "#E63946"
  },
  {
    title: "Big Experience",
    tag: "LEGACY_NODE",
    description: "Decades of collective intelligence distilled into high-performance automation protocols.",
    icon: <Briefcase size={24} />,
    color: "#003366"
  },
  {
    title: "Quality First",
    tag: "ZERO_ERROR",
    description: "Committed to the absolute quality. We deliver systems that outlive the competition.",
    icon: <Award size={24} />,
    color: "#E63946"
  }
];

export default function FeaturesSection() {
  return (
    <section className="bg-white py-32 relative overflow-hidden">
      {/* خلفية هندسية (Blueprint Grid) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header بتصميم Typography عنيف */}
        <div className="mb-24 space-y-4">
          <motion.span 
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            className="text-[#E63946] font-black text-[10px] tracking-[0.5em] uppercase block"
          >
            System_Capabilities
          </motion.span>
          <h2 className="text-7xl md:text-8xl font-black text-[#003366] uppercase italic leading-[0.8] tracking-tighter">
            Core <br /> <span className="text-zinc-200/50">Protocols</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-zinc-100">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} feature={feature} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }: { feature: typeof features[0], index: number }) {
  // تتبع حركة الماوس لعمل تأثير 3D Tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative group p-12 border-b md:border-b-0 md:border-r border-zinc-100 cursor-none"
    >
      {/* الرقم التسلسلي الخلفي */}
      <span className="absolute top-10 right-10 text-8xl font-black text-zinc-50 opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none">
        0{index + 1}
      </span>

      <div className="relative z-10 space-y-8" style={{ transform: "translateZ(50px)" }}>
        {/* الأيقونة بتصميم نيون */}
        <div 
          className="w-16 h-16 flex items-center justify-center rounded-2xl transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(230,57,70,0.3)]"
          style={{ backgroundColor: feature.color + "10", color: feature.color }}
        >
          {feature.icon}
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#E63946] animate-pulse" />
            <span className="text-[9px] font-black text-zinc-400 tracking-[0.3em] uppercase">{feature.tag}</span>
          </div>
          <h3 className="text-3xl font-black text-[#003366] uppercase group-hover:text-[#E63946] transition-colors duration-300">
            {feature.title}
          </h3>
          <p className="text-zinc-500 text-sm font-medium leading-relaxed group-hover:text-zinc-800 transition-colors">
            {feature.description}
          </p>
        </div>

        {/* سهم تفاعلي يظهر عند التحويم */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="pt-6 flex items-center gap-4 text-[#E63946] font-black text-[10px] uppercase tracking-widest cursor-pointer"
        >
          Initialize Protocol <ArrowUpRight size={16} />
        </motion.div>
      </div>

      {/* تأثير الضوء المتحرك (Flash Highlight) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E63946]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}