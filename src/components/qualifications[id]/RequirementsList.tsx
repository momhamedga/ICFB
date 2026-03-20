"use client";
import { motion } from "framer-motion";
import { CheckCircle2, ShieldAlert } from "lucide-react";
import SectionHeading from "./UI/SectionHeading";

export default function RequirementsList({ requirements }: { requirements: string[] }) {
  return (
    <section className="space-y-10">
      <SectionHeading 
        icon={<ShieldAlert className="text-emerald-500" />} 
        title="Entry Requirements" 
      />
      
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
        className="grid md:grid-cols-2 gap-4"
      >
        {requirements.map((req, i) => (
          <motion.div 
            key={i}
            variants={{
              hidden: { y: 10, opacity: 0 },
              visible: { y: 0, opacity: 1 }
            }}
            className="group p-6 bg-white border border-slate-100 rounded-[2rem] flex gap-5 items-start hover:border-[#ef4444]/20 hover:shadow-xl transition-all duration-500"
          >
            <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center group-hover:bg-[#ef4444] transition-colors duration-500 shrink-0">
              <CheckCircle2 size={14} className="text-emerald-500 group-hover:text-white" />
            </div>
            <p className="text-[#003366] font-bold text-sm leading-relaxed tracking-tight">
              {req}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}