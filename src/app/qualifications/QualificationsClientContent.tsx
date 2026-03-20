"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Clock, Award, ChevronRight, GraduationCap, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function QualificationsClientContent({ initialData }: { initialData: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Master Level", "Executive Level", "Professional Level"];

  const filtered = useMemo(() => {
    return initialData.filter(c => {
      const matchSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = activeCategory === "All" || c.category === activeCategory;
      return matchSearch && matchCat;
    });
  }, [searchTerm, activeCategory, initialData]);

  return (
    <div className="space-y-16">
      {/* Search & Filter - Ultra Modern Glass */}
      <div className="bg-white/40 backdrop-blur-2xl border border-white/20 p-2 md:p-3 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex flex-col md:flex-row gap-4 items-center sticky top-10 z-[50] max-w-4xl mx-auto">
        <div className="relative w-full md:w-72 group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#ef4444] transition-colors" size={18} />
          <input 
            type="text"
            placeholder="Find your future..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-white/50 rounded-full border-none font-bold text-zinc-900 placeholder:text-zinc-400 outline-none focus:ring-2 ring-[#ef4444]/10 transition-all text-sm"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full no-scrollbar px-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.15em] whitespace-nowrap transition-all duration-500 ${
                activeCategory === cat 
                ? "bg-[#002d5b] text-white shadow-[0_10px_20px_rgba(0,45,91,0.2)] scale-105" 
                : "bg-transparent text-zinc-500 hover:bg-white hover:text-zinc-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Luxury Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <AnimatePresence mode="popLayout">
          {filtered.map((item, index) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
              className="group relative"
            >
              {/* Animated Background Glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#ef4444] to-[#002d5b] rounded-[2.5rem] opacity-0 group-hover:opacity-10 blur-xl transition duration-700" />
              
              <div className="relative h-full bg-white rounded-[2.5rem] border border-zinc-100 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.02)] group-hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] transition-all duration-700">
                
                {/* Image Area with Overlay */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image 
                    src={item.image_url} 
                    alt={item.title} 
                    fill 
                    className="object-cover transition-transform duration-[1.5s] group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#002d5b]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  {/* Floating Badge */}
                  <div className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white text-[9px] font-black uppercase tracking-widest">
                    <Sparkles size={12} className="text-[#ef4444]" />
                    {item.category}
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <span className="flex items-center gap-2 text-zinc-400 text-[10px] font-black uppercase"><Clock size={14} className="text-[#ef4444]" /> {item.duration}</span>
                       <span className="flex items-center gap-2 text-zinc-400 text-[10px] font-black uppercase"><Award size={14} className="text-[#ef4444]" /> Level {item.level}</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-black text-zinc-900 leading-[1.2] group-hover:text-[#ef4444] transition-colors duration-500 min-h-[3.6rem] line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-zinc-500 text-sm leading-relaxed font-medium line-clamp-2 opacity-80 group-hover:opacity-100">
                    {item.overview}
                  </p>

                  <div className="pt-6 flex items-center justify-between border-t border-zinc-50">
                    <Link 
                      href={`/qualifications/${item.id}`} 
                      className="group/btn relative inline-flex items-center gap-3 text-[#002d5b] font-black text-[11px] uppercase tracking-[0.2em] transition-all"
                    >
                      <span className="relative z-10 group-hover/btn:text-[#ef4444] transition-colors">Explore Program</span>
                      <div className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center group-hover/btn:bg-[#ef4444] group-hover/btn:text-white transition-all duration-500 ring-4 ring-transparent group-hover/btn:ring-[#ef4444]/10">
                        <ChevronRight size={16} strokeWidth={3} />
                      </div>
                    </Link>
                    
                    <div className="opacity-10 group-hover:opacity-100 group-hover:rotate-[360deg] transition-all duration-[1s]">
                        <GraduationCap size={24} className="text-[#002d5b]" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filtered.length === 0 && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          className="py-32 text-center bg-white/50 backdrop-blur-sm rounded-[3rem] border-2 border-dashed border-zinc-200"
        >
          <div className="inline-flex w-20 h-20 items-center justify-center bg-zinc-50 rounded-full mb-6 text-zinc-300">
            <Search size={32} />
          </div>
          <p className="text-zinc-400 font-black uppercase tracking-[0.3em] text-sm">No Programs Found</p>
        </motion.div>
      )}
    </div>
  );
}