"use client";

import { useReducer, useRef } from "react";
import Image from "next/image"; 
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Layout, Upload, Loader2, CheckCircle2, ChevronLeft, DollarSign, Users, FileText } from "lucide-react";
import Link from "next/link";

type State = {
  formData: any;
  loading: boolean;
  uploading: boolean;
  preview: string | null;
  status: "idle" | "success" | "error";
  errorMsg: string;
};

const formReducer = (state: State, action: any): State => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return { ...state, formData: { ...state.formData, [action.field]: action.value }, status: "idle" };
    case "SET_LOADING": return { ...state, loading: action.value };
    case "SET_UPLOADING": return { ...state, uploading: action.value };
    case "UPLOAD_SUCCESS":
      return { ...state, preview: action.url, formData: { ...state.formData, image_url: action.url }, uploading: false };
    case "SUBMIT_SUCCESS": return { ...state, status: "success", loading: false };
    case "SUBMIT_ERROR": return { ...state, status: "error", errorMsg: action.msg, loading: false };
    default: return state;
  }
};

export default function ModifyCourseClient({ initialCourse }: { initialCourse: any }) {
  if (!initialCourse) return null;

  const [state, dispatch] = useReducer(formReducer, {
    formData: initialCourse,
    loading: false,
    uploading: false,
    preview: initialCourse?.image_url || null,
    status: "idle",
    errorMsg: ""
  });

  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // لوجيك رفع الصور للسوبابيز
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    dispatch({ type: "SET_UPLOADING", value: true });
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `course-images/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('assets') // تأكد إن عندك Bucket اسمه assets
      .upload(filePath, file);

    if (uploadError) {
      console.error(uploadError);
      dispatch({ type: "SET_UPLOADING", value: false });
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from('assets').getPublicUrl(filePath);
    dispatch({ type: "UPLOAD_SUCCESS", url: publicUrl });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: "SET_LOADING", value: true });

    const { error } = await supabase
      .from("courses")
      .update({
        title: state.formData.title,
        price: Number(state.formData.price),
        available_seats: Number(state.formData.available_seats),
        image_url: state.formData.image_url,
        description: state.formData.description // إضافة الوصف بناءً على الصورة
      })
      .eq("id", initialCourse.id);

    if (error) {
      dispatch({ type: "SUBMIT_ERROR", msg: error.message });
    } else {
      dispatch({ type: "SUBMIT_SUCCESS" });
      setTimeout(() => {
        router.refresh();
        router.push("/admin/courses");
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] p-6 md:p-12 font-sans selection:bg-[#d32f2f]/10">
      <div className="max-w-5xl mx-auto">
        
        <Link href="/admin/courses" className="group inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-[#d32f2f] mb-12 transition-colors">
          <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
          Return to Hub
        </Link>

        <form onSubmit={handleUpdate} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          <div className="lg:col-span-2 space-y-8">
            {/* Core Identity */}
            <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-zinc-100">
              <h2 className="text-[11px] font-black uppercase mb-8 flex items-center gap-3 tracking-[0.3em] text-zinc-400">
                <Layout size={18} className="text-[#d32f2f]" /> Course Node
              </h2>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-zinc-300 ml-2">Title</label>
                  <input 
                    value={state.formData.title}
                    className="w-full bg-[#fafafa] border-2 border-zinc-50 rounded-2xl py-5 px-8 font-bold outline-none focus:border-[#d32f2f]/10 focus:bg-white transition-all text-zinc-900"
                    onChange={e => dispatch({ type: "UPDATE_FIELD", field: "title", value: e.target.value })}
                  />
                </div>

                {/* Technical Specifications (حسب الصورة اللي بعتها) */}
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-zinc-300 ml-2">Technical Specifications</label>
                  <textarea 
                    rows={5}
                    placeholder="Enter details..."
                    value={state.formData.description || ""}
                    className="w-full bg-[#fafafa] border-2 border-zinc-50 rounded-3xl py-5 px-8 font-medium outline-none focus:border-[#d32f2f]/10 focus:bg-white transition-all text-zinc-600 resize-none"
                    onChange={e => dispatch({ type: "UPDATE_FIELD", field: "description", value: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Assets */}
            <div className="bg-white p-6 rounded-[3rem] border border-zinc-100 group">
              <div 
                onClick={() => !state.uploading && fileInputRef.current?.click()} 
                className="relative aspect-video rounded-[2.5rem] overflow-hidden cursor-pointer bg-zinc-50 border-2 border-dashed border-zinc-100 group-hover:border-[#d32f2f]/20 transition-all flex items-center justify-center"
              >
                {state.uploading ? (
                  <div className="flex flex-col items-center gap-3">
                    <Loader2 className="animate-spin text-[#d32f2f]" size={32} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Uploading Asset...</span>
                  </div>
                ) : state.preview ? (
                  <Image src={state.preview} alt="Preview" fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <div className="text-center space-y-2 text-zinc-300">
                    <Upload size={32} className="mx-auto" />
                    <span className="text-[10px] font-black uppercase tracking-widest block">No Asset Found</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                   <p className="text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                     <Upload size={16} /> Replace Visual Node
                   </p>
                </div>
              </div>
              <input type="file" ref={fileInputRef} hidden onChange={handleImageUpload} accept="image/*" />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-[#0b1623] p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
              {/* Glassmorphism Effect for Sidebar */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#d32f2f]/10 blur-[50px] rounded-full" />
              
              <h2 className="text-[10px] font-black uppercase mb-10 text-[#d32f2f] tracking-[0.4em] relative z-10">Logistics</h2>
              
              <div className="space-y-8 relative z-10">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-zinc-500">
                    <DollarSign size={12} /> Unit Price
                  </div>
                  <input 
                    type="number" 
                    value={state.formData.price}
                    className="w-full bg-[#162231] border border-zinc-800 rounded-2xl py-4 px-6 text-white outline-none focus:border-[#d32f2f] transition-all font-bold"
                    onChange={e => dispatch({ type: "UPDATE_FIELD", field: "price", value: e.target.value })}
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-zinc-500">
                    <Users size={12} /> Available Slots
                  </div>
                  <input 
                    type="number" 
                    value={state.formData.available_seats}
                    className="w-full bg-[#162231] border border-zinc-800 rounded-2xl py-4 px-6 text-white outline-none focus:border-[#d32f2f] transition-all font-bold"
                    onChange={e => dispatch({ type: "UPDATE_FIELD", field: "available_seats", value: e.target.value })}
                  />
                </div>

                <button 
                  disabled={state.loading || state.uploading}
                  className="w-full py-6 bg-[#d32f2f] hover:bg-[#b72828] disabled:bg-zinc-700 text-white rounded-[1.5rem] font-black uppercase text-[10px] tracking-[0.2em] shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  {state.loading ? <Loader2 className="animate-spin" size={18} /> : (
                    <><Save size={16} /> Deploy Updates</>
                  )}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {state.status === "success" && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                  className="bg-emerald-500 p-6 rounded-[2rem] text-white text-center shadow-lg shadow-emerald-500/20"
                >
                  <CheckCircle2 size={24} className="mx-auto mb-2" />
                  <p className="text-[10px] font-black uppercase tracking-widest">Node Synchronized</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </form>
      </div>
    </div>
  );
}