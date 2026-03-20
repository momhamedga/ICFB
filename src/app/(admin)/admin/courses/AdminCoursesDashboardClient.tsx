"use client";

import { useReducer, useMemo, useTransition, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Search, Loader2, ExternalLink, AlertCircle, X } from "lucide-react";
import Link from "next/link";

// --- Types ---
interface Course {
  id: string;
  title: string;
  price: number;
  available_seats: number;
  start_date: string;
  image_url: string;
}

type Action =
  | { type: "SET_SEARCH"; query: string }
  | { type: "DELETE_OPTIMISTIC"; id: string }
  | { type: "DELETE_REVERT"; originalData: Course[]; error: string }
  | { type: "SET_ERROR"; msg: string | null };

interface State {
  data: Course[];
  searchQuery: string;
  error: string | null;
}

const dashboardReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_SEARCH": return { ...state, searchQuery: action.query };
    case "DELETE_OPTIMISTIC": return { ...state, data: state.data.filter(c => c.id !== action.id), error: null };
    case "DELETE_REVERT": return { ...state, data: action.originalData, error: action.error };
    case "SET_ERROR": return { ...state, error: action.msg };
    default: return state;
  }
};

export default function AdminCoursesDashboardClient({ initialData }: { initialData: Course[] }) {
  const [state, dispatch] = useReducer(dashboardReducer, { data: initialData, searchQuery: "", error: null });
  const [isPending, startTransition] = useTransition();
  const [deleteTarget, setDeleteTarget] = useState<Course | null>(null);

  const filteredCourses = useMemo(() => 
    state.data.filter(c => c.title.toLowerCase().includes(state.searchQuery.toLowerCase())),
    [state.data, state.searchQuery]
  );

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    const id = deleteTarget.id;
    const originalData = [...state.data];
    
    setDeleteTarget(null);
    dispatch({ type: "DELETE_OPTIMISTIC", id });

    const { error } = await supabase.from("courses").delete().eq("id", id);
    if (error) dispatch({ type: "DELETE_REVERT", originalData, error: error.message });
  };

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 md:p-12 font-sans selection:bg-[#d32f2f]/10">
      
      {/* --- Custom Purge Modal --- */}
      <AnimatePresence shadow-sm>
        {deleteTarget && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDeleteTarget(null)} className="absolute inset-0 bg-black/40 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl border border-zinc-100 overflow-hidden">
              <div className="space-y-6 text-center">
                <div className="w-16 h-16 bg-red-50 text-[#d32f2f] rounded-2xl flex items-center justify-center mx-auto group">
                  <Trash2 size={28} className="group-hover:shake" />
                </div>
                <div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter text-zinc-900">Confirm Purge</h3>
                  <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest mt-2">Node: {deleteTarget.title}</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setDeleteTarget(null)} className="flex-1 py-4 rounded-xl bg-zinc-100 text-zinc-900 font-black uppercase text-[10px] tracking-widest hover:bg-zinc-200 transition-all">Abort</button>
                  <button onClick={confirmDelete} className="flex-1 py-4 rounded-xl bg-[#d32f2f] text-white font-black uppercase text-[10px] tracking-widest hover:bg-black shadow-lg shadow-red-500/20 transition-all">Confirm</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-[1400px] mx-auto">
        {/* --- Header --- */}
        <header className="flex flex-col xl:flex-row xl:items-end justify-between gap-10 mb-20">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase italic text-zinc-900 leading-none">
              courses <span className="text-[#d32f2f]">Admin</span>
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-zinc-400 pl-2">Nexus Management System v2.6</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full xl:w-auto">
            <div className="relative group w-full sm:w-96">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-300 group-focus-within:text-[#d32f2f] transition-colors" size={20} />
              <input 
                placeholder="Search Repository..."
                className="w-full bg-white border-2 border-zinc-100 rounded-[1.8rem] py-5 pl-16 pr-8 outline-none focus:border-[#d32f2f]/20 font-bold text-sm transition-all shadow-sm"
                onChange={(e) => startTransition(() => dispatch({ type: "SET_SEARCH", query: e.target.value }))}
              />
              {isPending && <Loader2 className="absolute right-6 top-1/2 -translate-y-1/2 animate-spin text-zinc-300" size={16} />}
            </div>
            <Link href="/admin/courses/add" className="w-full sm:w-auto bg-[#0b1623] text-white px-10 py-5 rounded-[1.8rem] font-black uppercase text-[11px] tracking-widest hover:bg-[#d32f2f] transition-all shadow-2xl flex items-center justify-center gap-3">
              <Plus size={20} /> New Entry
            </Link>
          </div>
        </header>

        {/* --- Error Display --- */}
        <AnimatePresence>
          {state.error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mb-8 bg-red-50 border border-red-100 p-4 rounded-2xl flex items-center gap-3 text-red-600 font-bold text-xs uppercase tracking-tight">
              <AlertCircle size={16} /> {state.error}
              <button onClick={() => dispatch({ type: "SET_ERROR", msg: null })} className="ml-auto p-1 hover:bg-red-100 rounded-lg"><X size={14}/></button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- Grid --- */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course) => (
              <motion.div key={course.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5, filter: "blur(20px)" }} className="bg-white border border-zinc-100 rounded-[2.8rem] p-3 group hover:shadow-2xl transition-all duration-500 flex flex-col">
                <div className="relative aspect-[16/11] rounded-[2.2rem] overflow-hidden bg-zinc-50 mb-6">
                  <Image src={course.image_url} alt={course.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[8px] font-black text-zinc-900 border border-white/20">ID: {course.id.slice(0, 5)}</div>
                  <div className="absolute bottom-4 right-4 bg-[#d32f2f] px-4 py-2 rounded-xl text-[12px] font-black text-white shadow-xl">${course.price}</div>
                </div>

                <div className="px-5 pb-5 flex flex-col flex-1">
                  <div className="mb-6">
                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[#d32f2f] mb-1">Core Node</p>
                    <h3 className="text-xl font-black uppercase tracking-tighter text-zinc-900 leading-tight line-clamp-2 min-h-[3rem]">{course.title}</h3>
                  </div>
                  <div className="mt-auto flex items-center gap-3">
                    <Link href={`/admin/courses/${course.id}`} className="flex-1 bg-zinc-900 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-center hover:bg-[#d32f2f] transition-all flex items-center justify-center gap-2">
                      Configure <ExternalLink size={14} />
                    </Link>
                    <button onClick={() => setDeleteTarget(course)} className="w-14 h-14 flex items-center justify-center bg-zinc-50 text-zinc-400 hover:bg-red-50 hover:text-[#d32f2f] rounded-2xl transition-all border border-transparent hover:border-red-100 active:scale-90">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-40 opacity-20 uppercase font-black tracking-widest text-zinc-400 italic">No matches in repository</div>
        )}
      </div>
    </div>
  );
}