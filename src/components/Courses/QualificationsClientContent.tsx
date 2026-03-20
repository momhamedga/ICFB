"use client";
import { useState, useTransition, useMemo } from "react";
import { Search, Sparkles } from "lucide-react";
import { CourseCard } from "./CourseCard";
import { AnimatePresence, motion } from "framer-motion";

export default function QualificationsClientContent({ initialData }: { initialData: any[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [isPending, startTransition] = useTransition();

  const categories = ["All", "Master Level", "Executive Level", "Professional Level"];

  const filteredData = useMemo(() => {
    return initialData.filter(c => {
      const matchSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = activeCategory === "All" || c.category === activeCategory;
      return matchSearch && matchCat;
    });
  }, [searchTerm, activeCategory, initialData]);

  return (
    <div className="space-y-12 md:space-y-20">
      
      {/* 🛠️ Modern Dynamic Dock (Responsive Masterpiece) */}
      <div className="sticky top-6 z-50 px-4">
        <div className="max-w-4xl mx-auto flex flex-col gap-3">
          
          {/* 🔍 Search Input - Glassmorphism style */}
          <div className="relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#ef4444] transition-colors duration-500" size={18} />
            <input 
              type="text"
              placeholder="SYSTEM_SEARCH_PROTOCOL..."
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-14 md:h-16 bg-[#003366] border border-white/5 rounded-[2rem] pl-16 pr-6 text-white placeholder:text-white/10 text-[10px] font-black uppercase tracking-[0.3em] outline-none focus:border-[#ef4444]/30 transition-all shadow-2xl"
            />
          </div>

          {/* 🎚️ Filter Scroll Dock - الحل الجذري للموبايل */}
          <div className="bg-[#003366] border border-white/5 p-1.5 rounded-[2.5rem] shadow-2xl overflow-hidden">
            <div className="flex items-center gap-1 overflow-x-auto scroller-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-1">
              {categories.map((cat) => (
                <FilterButton 
                  key={cat}
                  label={cat}
                  isActive={activeCategory === cat}
                  onClick={() => startTransition(() => setActiveCategory(cat))}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 🎬 Grid Display */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 px-6 md:px-12 max-w-[1600px] mx-auto"
      >
        <AnimatePresence mode="popLayout">
          {filteredData.map((item, index) => (
            <CourseCard key={item.id} item={item} index={index} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* 🚫 Empty State */}
      {filteredData.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="py-40 text-center"
        >
          <p className="text-white/10 text-[10px] md:text-xs font-black uppercase tracking-[1.2em] animate-pulse">
            System_Return_Null_Err
          </p>
        </motion.div>
      )}
    </div>
  );
}

// مكون فرعي للزرار لضمان أنيق التصميم وتكرار المنطق
function FilterButton({ label, isActive, onClick }: { label: string, isActive: boolean, onClick: () => void }) {
  // فصل الكلمة الأخيرة عشان نخليها إيطاليك زي الستايل بتاعك
  const words = label.split(" ");
  const last = words.length > 1 ? words.pop() : "";
  const first = words.join(" ");

  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className={`
        relative shrink-0 flex items-center gap-2 h-11 md:h-13 px-6 md:px-10 rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all duration-500 whitespace-nowrap
        ${isActive 
          ? "bg-[#ef4444] text-white shadow-[0_10px_30px_rgba(239,68,68,0.3)]" 
          : "text-white/30 hover:text-white/60 hover:bg-white/[0.03]"
        }
      `}
    >
      <span>
        {first} <span className={isActive ? "text-white/80 italic" : "text-[#ef4444] italic"}>{last}</span>
      </span>
      {isActive && <Sparkles size={12} className="text-white animate-pulse" />}
    </motion.button>
  );
}