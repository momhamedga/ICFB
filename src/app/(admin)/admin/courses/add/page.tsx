"use client";

import { useReducer, useRef, useCallback, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Save, Layout, Clock, Upload, X, Loader2, 
  CheckCircle2, AlertOctagon, ShieldCheck, 
  Activity, Layers, ChevronDown 
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

// --- 1. Enhanced Strict Typing (2026 standards) ---
interface CourseFormData {
  title: string;
  description: string;
  price: string;
  available_seats: number;
  start_date: string;
  image_url: string;
  difficulty_level: "Beginner" | "Intermediate" | "Advanced";
}

type State = {
  formData: CourseFormData;
  loading: boolean;
  uploading: boolean;
  preview: string | null;
  status: "idle" | "success" | "error";
  errorMsg: string;
};

type Action =
  | { type: "UPDATE_FIELD"; field: keyof CourseFormData; value: any }
  | { type: "SET_UPLOADING"; value: boolean }
  | { type: "SET_LOADING"; value: boolean }
  | { type: "UPLOAD_SUCCESS"; url: string }
  | { type: "SUBMIT_SUCCESS" }
  | { type: "SUBMIT_ERROR"; msg: string }
  | { type: "RESET_IMAGE" };

const initialState: State = {
  formData: { 
    title: "", description: "", price: "", 
    available_seats: 12, start_date: "", image_url: "",
    difficulty_level: "Intermediate" 
  },
  loading: false, uploading: false, preview: null, status: "idle", errorMsg: ""
};

const formReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "UPDATE_FIELD": return { ...state, formData: { ...state.formData, [action.field]: action.value }, status: "idle" };
    case "SET_UPLOADING": return { ...state, uploading: action.value };
    case "SET_LOADING": return { ...state, loading: action.value };
    case "UPLOAD_SUCCESS": return { ...state, preview: action.url, formData: { ...state.formData, image_url: action.url } };
    case "RESET_IMAGE": return { ...state, preview: null, formData: { ...state.formData, image_url: "" } };
    case "SUBMIT_SUCCESS": return { ...state, status: "success", loading: false };
    case "SUBMIT_ERROR": return { ...state, status: "error", errorMsg: action.msg, loading: false };
    default: return state;
  }
};

// --- 2. Internal Component: Modern Date Picker ---
function ModernDatePicker({ value, onChange }: { value: string, onChange: (date: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedDate = value ? new Date(value) : undefined;

  return (
    <div className="relative group">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#162231] border-none rounded-2xl p-5 text-white font-bold outline-none ring-1 ring-white/5 focus-within:ring-[#d32f2f]/50 transition-all cursor-pointer flex items-center justify-between shadow-inner"
      >
        <div className="flex items-center gap-4">
          <Clock size={18} className="text-[#d32f2f]" />
          <span className={value ? "text-white text-sm" : "text-zinc-500 text-[10px] font-black uppercase tracking-widest"}>
            {value ? format(selectedDate!, "PPP") : "Select Launch Date"}
          </span>
        </div>
        <ChevronDown size={14} className={`text-zinc-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute z-50 mt-4 p-6 bg-[#0b1623] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[2.5rem] left-0 md:-left-10 backdrop-blur-xl"
            >
              <style>{`
                .rdp { --rdp-accent-color: #d32f2f; --rdp-background-color: #1e2d3d; margin: 0; }
                .rdp-day_selected { background-color: #d32f2f !important; font-weight: 900; }
                .rdp-button:hover:not([disabled]):not(.rdp-day_selected) { background-color: rgba(211, 47, 47, 0.2); }
                .rdp-head_cell { font-size: 10px; font-weight: 900; text-transform: uppercase; color: #71717a; padding-bottom: 1rem; }
              `}</style>
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  if (date) {
                    onChange(date.toISOString());
                    setIsOpen(false);
                  }
                }}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- 3. Main Page Component ---
export default function AddCoursePage() {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      return dispatch({ type: "SUBMIT_ERROR", msg: "Payload too heavy (Max 5MB)" });
    }

    try {
      dispatch({ type: "SET_UPLOADING", value: true });
      const fileExt = file.name.split('.').pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from("course-images")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage.from("course-images").getPublicUrl(fileName);
      dispatch({ type: "UPLOAD_SUCCESS", url: publicUrl });
    } catch (err: any) {
      dispatch({ type: "SUBMIT_ERROR", msg: `Uplink Failure: ${err.message}` });
    } finally {
      dispatch({ type: "SET_UPLOADING", value: false });
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.formData.image_url) return dispatch({ type: "SUBMIT_ERROR", msg: "Visual Identity Missing" });

    dispatch({ type: "SET_LOADING", value: true });
    try {
      const { error } = await supabase.from("courses").insert([{
        ...state.formData,
        price: parseFloat(state.formData.price),
        created_at: new Date().toISOString()
      }]);

      if (error) throw error;
      dispatch({ type: "SUBMIT_SUCCESS" });
      setTimeout(() => router.push("/admin/courses"), 1500);
    } catch (err: any) {
      dispatch({ type: "SUBMIT_ERROR", msg: err.message });
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 md:p-12 lg:p-16 font-sans selection:bg-[#d32f2f]/10">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Command Bar */}
        <div className="flex flex-wrap items-center justify-between gap-6 mb-16">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="px-6 py-3 bg-zinc-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#d32f2f] transition-all flex items-center gap-3">
              <Activity size={14} /> Main Terminal
            </Link>
            <Link href="/admin/courses" className="px-6 py-3 bg-white border border-zinc-100 text-zinc-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:border-zinc-300 transition-all flex items-center gap-3 shadow-sm">
              <Layers size={14} /> Repository
            </Link>
          </div>
          <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-2xl shadow-sm border border-zinc-100">
            <ShieldCheck size={16} className="text-[#00c853]" />
            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 italic">Encrypted Session: v2.6.4</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Section */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-zinc-100">
              <h2 className="text-[11px] font-black text-zinc-900 uppercase mb-10 flex items-center gap-3 tracking-[0.3em]">
                <Layout size={18} className="text-[#d32f2f]" /> Module Core
              </h2>
              <div className="space-y-8">
                <div className="group space-y-2">
                  <label className="text-[9px] font-black uppercase text-zinc-400 ml-2">Label</label>
                  <input required placeholder="E.G. NEXT.JS MASTERCLASS" className="w-full bg-[#fafafa] border-2 border-zinc-50 rounded-2xl p-6 text-zinc-900 font-black text-xl uppercase tracking-tighter outline-none focus:border-[#d32f2f]/10 focus:bg-white transition-all"
                    onChange={e => dispatch({ type: "UPDATE_FIELD", field: "title", value: e.target.value })} />
                </div>
                <div className="group space-y-2">
                  <label className="text-[9px] font-black uppercase text-zinc-400 ml-2">Specifications</label>
                  <textarea rows={5} placeholder="Technical details..." className="w-full bg-[#fafafa] border-2 border-zinc-50 rounded-2xl p-6 text-zinc-600 font-medium outline-none focus:border-[#d32f2f]/10 focus:bg-white transition-all resize-none"
                    onChange={e => dispatch({ type: "UPDATE_FIELD", field: "description", value: e.target.value })} />
                </div>
              </div>
            </div>

            {/* Asset Uplink Area */}
            <div className="bg-white p-10 rounded-[3rem] border border-zinc-100">
              <div onClick={() => fileInputRef.current?.click()} className="group relative aspect-[21/9] rounded-[2.5rem] bg-[#fafafa] border-2 border-dashed border-zinc-200 flex items-center justify-center cursor-pointer hover:border-[#d32f2f]/20 transition-all overflow-hidden">
                <AnimatePresence mode="wait">
                  {state.preview ? (
                    <motion.div key="preview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative w-full h-full">
                      <img src={state.preview} alt="Asset" className="w-full h-full object-cover" />
                      <button type="button" onClick={(e) => { e.stopPropagation(); dispatch({ type: "RESET_IMAGE" }); }} className="absolute top-6 right-6 p-4 bg-black/80 text-white rounded-2xl hover:bg-[#d32f2f] transition-all backdrop-blur-xl">
                        <X size={20} />
                      </button>
                    </motion.div>
                  ) : (
                    <div className="text-center group-hover:scale-110 transition-all duration-500">
                      {state.uploading ? <Loader2 className="animate-spin text-[#d32f2f] mb-4 mx-auto" size={32} /> : <Upload className="text-zinc-300 mb-4 mx-auto" size={32} />}
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.5em]">Sync Visual Node</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
              <input type="file" ref={fileInputRef} hidden accept="image/*" onChange={handleFileUpload} />
            </div>
          </div>

          {/* Logistics Panel (Right) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-[#0b1623] p-10 rounded-[3.5rem] text-white shadow-2xl border-t border-white/5">
              <h2 className="text-[10px] font-black uppercase mb-12 flex items-center gap-3 text-[#d32f2f] tracking-[0.4em]">
                <Clock size={16} /> Deploy Config
              </h2>
              
              <div className="space-y-10">
                {/* 1. Expertise Tier Selector */}
                <div className="space-y-4">
                  <label className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em] ml-2 italic">Expertise Tier</label>
                  <div className="flex bg-[#162231] p-1.5 rounded-[2rem] ring-1 ring-white/5 overflow-hidden">
                    {["Beginner", "Intermediate", "Advanced"].map((level) => {
                      const isActive = state.formData.difficulty_level === level;
                      return (
                        <button
                          key={level}
                          type="button"
                          onClick={() => dispatch({ type: "UPDATE_FIELD", field: "difficulty_level", value: level })}
                          className={`flex-1 py-4 rounded-[1.6rem] text-[9px] font-black uppercase tracking-widest transition-all duration-500 relative ${isActive ? "text-white" : "text-zinc-500 hover:text-zinc-300"}`}
                        >
                          {isActive && (
                            <motion.div
                              layoutId="active-pill-dark"
                              className="absolute inset-0 bg-[#d32f2f] rounded-[1.6rem] shadow-lg shadow-red-500/20"
                              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                          )}
                          <span className="relative z-10">{level}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Modern Date Picker */}
                <div className="space-y-4">
                  <label className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em] ml-2 italic">Launch Date</label>
                  <ModernDatePicker 
                    value={state.formData.start_date}
                    onChange={(date) => dispatch({ type: "UPDATE_FIELD", field: "start_date", value: date })}
                  />
                </div>

                {/* 3. Valuation & Nodes */}
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <label className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em] ml-2 italic">Valuation</label>
                    <div className="relative group">
                      <span className="absolute left-5 top-1/2 -translate-y-1/2 font-black text-[#d32f2f] text-[10px]">$</span>
                      <input 
                        type="number" 
                        placeholder="0.00" 
                        className="w-full bg-[#162231] border-none rounded-2xl p-5 pl-10 text-white font-bold outline-none ring-1 ring-white/10 focus:ring-[#d32f2f]/40 transition-all text-sm"
                        onChange={e => dispatch({ type: "UPDATE_FIELD", field: "price", value: e.target.value })} 
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.3em] ml-2 italic">Nodes</label>
                    <input 
                      type="number" 
                      placeholder="12" 
                      className="w-full bg-[#162231] border-none rounded-2xl p-5 text-white font-bold outline-none ring-1 ring-white/10 focus:ring-[#d32f2f]/40 transition-all text-center text-sm"
                      onChange={e => dispatch({ type: "UPDATE_FIELD", field: "available_seats", value: parseInt(e.target.value) })} 
                    />
                  </div>
                </div>

                {/* 4. Action Trigger */}
                <button 
                  disabled={state.loading || state.uploading} 
                  className="w-full mt-4 py-7 bg-[#d32f2f] text-white rounded-[2rem] font-black uppercase tracking-[0.5em] text-[10px] hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-20 flex items-center justify-center gap-4 shadow-2xl shadow-red-500/20 group"
                >
                  {state.loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} className="group-hover:rotate-12 transition-transform" />}
                  Execute Deployment
                </button>
              </div>

              {/* Status Indicator */}
              <AnimatePresence>
                {state.status === "success" && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 p-5 bg-[#00c853]/10 rounded-2xl border border-[#00c853]/20 flex items-center gap-4">
                    <CheckCircle2 className="text-[#00c853]" size={18} />
                    <span className="text-[9px] font-black uppercase tracking-widest text-[#00c853]">Uplink Sync Successful</span>
                  </motion.div>
                )}
                {state.status === "error" && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 p-5 bg-red-500/10 rounded-2xl border border-red-500/20 flex items-center gap-4">
                    <AlertOctagon className="text-red-500" size={18} />
                    <span className="text-[9px] font-black uppercase tracking-widest text-red-500 truncate">{state.errorMsg}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}