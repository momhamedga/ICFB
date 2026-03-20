"use client";

import { useReducer, useMemo, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Search, Zap, LayoutGrid, AlertOctagon, LayoutList } from "lucide-react"; 
import CourseCard from "./CourseCard";

// --- 1. Types Definitions ---
interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string;
  difficulty_level: string;
  available_seats: number;
  created_at: string;
}

type State = {
  searchQuery: string;
  activeFilter: "All" | "Beginner" | "Intermediate" | "Advanced";
  viewMode: "grid" | "list";
};

type Action = 
  | { type: "SET_SEARCH"; query: string }
  | { type: "SET_FILTER"; filter: State["activeFilter"] }
  | { type: "TOGGLE_VIEW" };

// --- 2. Reducer Engine (Defined outside to prevent re-renders) ---
const initialState: State = {
  searchQuery: "",
  activeFilter: "All",
  viewMode: "grid",
};

const coursesReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_SEARCH": return { ...state, searchQuery: action.query };
    case "SET_FILTER": return { ...state, activeFilter: action.filter };
    case "TOGGLE_VIEW": return { ...state, viewMode: state.viewMode === "grid" ? "list" : "grid" };
    default: return state;
  }
};

// --- 3. Main Master Component ---
export default function CoursesPageClient({ coursesPromise }: { coursesPromise: Promise<Course[]> }) {
  // استخدام use() لفك الـ Promise مباشرة في الـ Client Component (React 19)
  const allCourses = use(coursesPromise);
  const [state, dispatch] = useReducer(coursesReducer, initialState);

  // منطق الفلترة المحسن باستخدام useMemo
  const filteredCourses = useMemo(() => {
    return allCourses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(state.searchQuery.toLowerCase());
      const matchesFilter = state.activeFilter === "All" || course.difficulty_level === state.activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [allCourses, state.searchQuery, state.activeFilter]);

  return (
    <main className="min-h-screen bg-[#fcfcfc] pb-20 selection:bg-[#E63946]/10 font-sans">
      
      {/* Hero Section */}
 <section className="relative h-[45vh] md:h-[55vh] flex items-center justify-center overflow-hidden bg-[#003366]">
         <div className="absolute inset-0">
           <motion.div 
             animate={{ 
               scale: [1, 1.2, 1],
               rotate: [0, 90, 0],
               opacity: [0.3, 0.5, 0.3] 
             }}
             transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
             className="absolute -top-20 -left-20 w-96 h-96 bg-[#E63946] rounded-full blur-[120px]" 
           />
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
         </div>
 
         <div className="relative z-10 text-center px-4">
           <motion.div
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/80 text-[10px] font-bold uppercase tracking-[0.4em] mb-8"
           >
             <Sparkles size={14} className="text-[#E63946]" /> 
             Professional Evolution
           </motion.div>
 
           <motion.h1 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-white text-7xl md:text-[9rem] font-black tracking-tighter uppercase leading-none"
           >
             cour<span className="text-[#E63946]">ses</span>
           </motion.h1>
 
           <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 0.6 }}
             className="text-white mt-6 font-medium tracking-[0.6em] uppercase text-xs"
           >
             Institutional Architects
           </motion.p>
         </div>
       </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-12 md:-mt-16 relative z-30 space-y-6">
        
        {/* Modern Control Center */}
        <div className="bg-white/90 backdrop-blur-2xl border border-black/[0.03] p-4 md:p-6 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl flex flex-col gap-6">
          
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Filters */}
            <div className="flex items-center gap-1.5 p-1.5 bg-zinc-100/50 rounded-2xl w-full lg:w-auto overflow-x-auto no-scrollbar">
              {["All", "Beginner", "Intermediate", "Advanced"].map((level) => (
                <button
                  key={level}
                  onClick={() => dispatch({ type: "SET_FILTER", filter: level as any })}
                  className={`flex-1 lg:flex-none px-5 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                    state.activeFilter === level 
                    ? "bg-[#003366] text-white shadow-lg" 
                    : "text-zinc-400 hover:text-zinc-900"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>

            {/* View Stats & Layout Toggle */}
            <div className="flex items-center justify-between w-full lg:w-auto gap-6 px-2">
              <div className="flex items-center gap-2 text-zinc-400">
                <Zap size={14} className="text-[#E63946]" />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  {filteredCourses.length} Modules Online
                </span>
              </div>
              <button 
                onClick={() => dispatch({ type: "TOGGLE_VIEW" })}
                className="p-4 bg-zinc-900 text-white rounded-2xl hover:bg-[#E63946] transition-all shadow-md"
              >
                {state.viewMode === "grid" ? <LayoutGrid size={18} /> : <LayoutList size={18} />}
              </button>
            </div>
          </div>

          {/* Integrated Glass Search Bar */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <Search size={18} className="text-zinc-400 group-focus-within:text-[#E63946] transition-colors" />
            </div>
            <input 
              type="text"
              placeholder="QUERY THE REPOSITORY..."
              className="w-full bg-zinc-50 border-2 border-transparent focus:border-[#E63946]/10 focus:bg-white rounded-[1.5rem] py-5 md:py-6 pl-16 pr-6 font-bold text-[11px] tracking-widest uppercase outline-none transition-all shadow-inner placeholder:text-zinc-300"
              onChange={(e) => dispatch({ type: "SET_SEARCH", query: e.target.value })}
            />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:block">
              <kbd className="px-3 py-1 bg-zinc-200/50 rounded-lg text-[9px] text-zinc-500 font-black border border-black/5">ESC</kbd>
            </div>
          </div>
        </div>

        {/* Dynamic Responsive Content Area */}
        <div className="pt-8">
          <AnimatePresence mode="popLayout">
            {filteredCourses.length === 0 ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0 }}
                className="bg-white py-24 md:py-32 rounded-[3rem] text-center border border-dashed border-zinc-200"
              >
                <AlertOctagon size={40} className="mx-auto text-zinc-200 mb-4" />
                <p className="text-zinc-400 font-black uppercase tracking-[0.3em] text-[10px]">No Signal Matches Query</p>
              </motion.div>
            ) : (
              <motion.div 
                layout
                className={`grid gap-6 md:gap-10 ${
                  state.viewMode === "grid" 
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
                  : "grid-cols-1"
                }`}
              >
                {filteredCourses.map((course, idx) => (
                  <CourseCard key={course.id} course={course} index={idx} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}