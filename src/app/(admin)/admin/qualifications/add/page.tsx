"use client";

import QualificationForm from "@/components/admin/QualificationForm";
import { motion } from "framer-motion";
import { ChevronLeft, LayoutGrid } from "lucide-react";
import Link from "next/link";

export default function AddQualificationPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation / Breadcrumbs */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center justify-between mb-12"
        >
 <Link href="/admin" className="flex items-center gap-2 text-zinc-400 hover:text-zinc-900 transition-all font-bold text-xs uppercase tracking-widest"> ← Back to Terminal </Link>

          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl shadow-sm border border-zinc-100">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">System Online</span>
          </div>
        </motion.div>

        {/* Page Title Section */}
        <div className="mb-12 space-y-2">
          <h1 className="text-4xl font-black text-zinc-900 tracking-tighter">
            Create <span className="text-[#d32f2f]">Qualification</span>
          </h1>
          <p className="text-zinc-500 font-medium">
            Fill in the details below to add a new ILM accredited module to your academy.
          </p>
        </div>

        {/* The Form Component */}
        <QualificationForm />

      </div>
    </div>
  );
}