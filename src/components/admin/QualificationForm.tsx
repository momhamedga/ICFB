"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { uploadCertificate as uploadImage } from "@/lib/storage";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Save, Plus, Trash2, LayoutGrid, Image as ImageIcon, 
  Loader2, CheckCircle2, ChevronDown, Edit3, 
  Search, Copy, Check
} from "lucide-react";
import Image from "next/image";

// 1. تعريف واجهة البيانات (TypeScript Interface)
interface Qualification {
  id: string;
  title: string;
  category: string;
  level: number;
  duration: string;
  image_url: string;
  overview: string;
  aimed_at: string;
  accreditation: string;
  requirements: string[];
  created_at?: string;
}

export default function QualificationDashboard() {
  // States مع تحديد الأنواع
  const [loading, setLoading] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(true);
  const [courses, setCourses] = useState<Qualification[]>([]); // مصفوفة من نوع Qualification
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form States
  const [requirements, setRequirements] = useState<string[]>([""]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [category, setCategory] = useState<string>("Master Level");
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);

  const categories: string[] = ["Master Level", "Executive Level", "Professional Level"];

  // تنظيف ذاكرة الصور المعاينة
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // جلب البيانات
  const fetchCourses = useCallback(async () => {
    setFetching(true);
    const { data, error } = await supabase
      .from("qualifications")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (!error && data) {
      setCourses(data as Qualification[]);
    }
    setFetching(false);
  }, []);

  useEffect(() => { fetchCourses(); }, [fetchCourses]);

  // معالجة تغيير الصورة
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  // ميزة نسخ الرابط
  const copyToClipboard = async (id: string) => {
    const url = `${window.location.origin}/qualifications/${id}`;
    await navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // ميزة البحث
  const filteredCourses = useMemo(() => {
    return courses.filter(course =>
      course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, courses]);

  // إدارة المتطلبات
  const addRequirement = () => setRequirements([...requirements, ""]);
  
  const removeRequirement = (index: number) => {
    const newReqs = requirements.filter((_, i) => i !== index);
    setRequirements(newReqs.length ? newReqs : [""]);
  };

  const handleRequirementChange = (index: number, value: string) => {
    const newReqs = [...requirements];
    newReqs[index] = value;
    setRequirements(newReqs);
  };

  // الحفظ والتعديل
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    let imageUrl = imagePreview || "";

    try {
      if (imageFile) {
        imageUrl = await uploadImage(imageFile, 'qualifications');
      }

      // تجهيز الكائن بناءً على الـ Interface
      const qualificationData: Partial<Qualification> = {
        title: formData.get("title") as string,
        category: category,
        level: parseInt(formData.get("level") as string) || 0,
        duration: formData.get("duration") as string,
        image_url: imageUrl,
        overview: formData.get("overview") as string,
        aimed_at: formData.get("aimed_at") as string,
        accreditation: formData.get("accreditation") as string,
        requirements: requirements.filter(r => r.trim() !== ""),
      };

      if (editingId) {
        const { error } = await supabase.from("qualifications").update(qualificationData).eq("id", editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("qualifications").insert([{ ...qualificationData, created_at: new Date().toISOString() }]);
        if (error) throw error;
      }
      
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      resetForm(e.target as HTMLFormElement);
      fetchCourses();
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure? This action cannot be undone.")) {
      const { error } = await supabase.from("qualifications").delete().eq("id", id);
      if (!error) fetchCourses();
    }
  };

  const startEdit = (course: Qualification) => {
    setEditingId(course.id);
    setCategory(course.category);
    setRequirements(course.requirements && course.requirements.length > 0 ? course.requirements : [""]);
    setImagePreview(course.image_url);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = (formElement?: HTMLFormElement) => {
    setEditingId(null);
    setImagePreview(null);
    setImageFile(null);
    setRequirements([""]);
    setCategory("Master Level");
    formElement?.reset();
  };

  return (
    <div className="relative min-h-screen bg-[#fafafa] py-10 px-4 md:px-10">
      
      {/* Success Notification */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] w-full max-w-md px-6">
            <div className="bg-[#0a0f16] border border-emerald-500/30 backdrop-blur-xl rounded-3xl p-6 shadow-2xl flex items-center gap-5">
              <CheckCircle2 className="text-emerald-500" size={32} />
              <div>
                <h3 className="text-emerald-400 font-black text-sm uppercase tracking-widest">Success</h3>
                <p className="text-zinc-400 text-xs font-medium">Database updated successfully.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- FORM SECTION --- */}
      <motion.div layout className="max-w-4xl mx-auto bg-white p-8 md:p-14 rounded-[3rem] shadow-[0_40px_80px_rgba(0,0,0,0.03)] border border-zinc-100 mb-20">
        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-zinc-50 pb-10">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-[#d32f2f] text-white rounded-[1.5rem] flex items-center justify-center shadow-lg shadow-red-100">
                {editingId ? <Edit3 size={32} /> : <LayoutGrid size={32} />}
              </div>
              <div>
                <h2 className="text-3xl font-black text-zinc-900 tracking-tight">{editingId ? "Edit Program" : "Add Qualification"}</h2>
                <p className="text-zinc-400 font-bold text-xs uppercase tracking-[0.2em] mt-1">Admin Control Center</p>
              </div>
            </div>
            {editingId && (
              <button type="button" onClick={() => resetForm()} className="text-[10px] font-black uppercase text-red-500 tracking-widest bg-red-50 px-4 py-2 rounded-full transition-all hover:bg-red-100">Cancel Edit</button>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Image Upload */}
            <div className="md:col-span-2 space-y-4">
               <label className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-2">Visual Branding</label>
               <div className="relative aspect-video w-full bg-zinc-50 rounded-[2.5rem] border-2 border-dashed border-zinc-200 overflow-hidden group cursor-pointer transition-all hover:border-[#d32f2f]/30">
                  {imagePreview ? (
                    <Image src={imagePreview} alt="Preview" fill className="object-cover" unoptimized />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-300">
                      <ImageIcon size={48} strokeWidth={1} />
                      <p className="text-xs font-bold mt-2">Upload Cover Image</p>
                    </div>
                  )}
                  <input type="file" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer z-10" />
               </div>
            </div>

            {/* Inputs */}
            <div className="md:col-span-2 space-y-4">
              <label className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-2">Program Title</label>
              <input name="title" required placeholder="Enter program title..." defaultValue={courses.find(c => c.id === editingId)?.title || ""} className="w-full px-8 py-6 bg-zinc-50 rounded-[1.8rem] border-none font-bold text-zinc-900 shadow-inner outline-none focus:bg-white transition-all" />
            </div>

            <div className="md:col-span-2 space-y-4">
              <label className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-2">Course Overview</label>
              <textarea name="overview" required placeholder="Describe objectives..." defaultValue={courses.find(c => c.id === editingId)?.overview || ""} className="w-full px-8 py-6 bg-zinc-50 rounded-[1.8rem] border-none font-medium text-zinc-900 shadow-inner outline-none focus:bg-white transition-all min-h-[160px] resize-none" />
            </div>

            <div className="space-y-4">
              <label className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-2">Category</label>
              <div className="relative">
                <button type="button" onClick={() => setIsSelectOpen(!isSelectOpen)} className="w-full px-8 py-6 bg-zinc-50 rounded-[1.8rem] flex items-center justify-between font-bold text-zinc-900 shadow-inner">
                  {category} <ChevronDown className={`transition-transform ${isSelectOpen ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isSelectOpen && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 15 }} exit={{ opacity: 0 }} className="absolute z-50 w-full bg-white/90 backdrop-blur-2xl border border-zinc-100 rounded-[2.2rem] shadow-2xl p-3">
                      {categories.map(opt => (
                        <button key={opt} type="button" onClick={() => { setCategory(opt); setIsSelectOpen(false); }} className={`w-full text-left px-7 py-5 rounded-[1.5rem] font-bold mb-1 last:mb-0 transition-all ${category === opt ? "bg-[#d32f2f] text-white" : "text-zinc-500 hover:bg-zinc-50"}`}>{opt}</button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-2">Level</label>
                <input name="level" type="number" defaultValue={courses.find(c => c.id === editingId)?.level || 7} className="w-full px-8 py-6 bg-zinc-50 rounded-[1.8rem] border-none font-bold text-zinc-900 shadow-inner outline-none" />
              </div>
              <div className="space-y-4">
                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-2">Duration</label>
                <input name="duration" defaultValue={courses.find(c => c.id === editingId)?.duration || "12 Months"} className="w-full px-8 py-6 bg-zinc-50 rounded-[1.8rem] border-none font-bold text-zinc-900 shadow-inner outline-none" />
              </div>
            </div>

            <div className="md:col-span-2 space-y-4">
              <label className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-2">Aimed At</label>
              <input name="aimed_at" defaultValue={courses.find(c => c.id === editingId)?.aimed_at || ""} className="w-full px-8 py-6 bg-zinc-50 rounded-[1.8rem] border-none font-bold text-zinc-900 shadow-inner outline-none focus:bg-white transition-all" />
            </div>

            <div className="md:col-span-2 space-y-4">
              <label className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400 ml-2">Accreditation</label>
              <input name="accreditation" defaultValue={courses.find(c => c.id === editingId)?.accreditation || ""} className="w-full px-8 py-6 bg-zinc-50 rounded-[1.8rem] border-none font-bold text-zinc-900 shadow-inner outline-none focus:bg-white transition-all" />
            </div>

            {/* Dynamic Requirements */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center justify-between ml-2">
                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400">Requirements</label>
                <button type="button" onClick={addRequirement} className="w-10 h-10 bg-zinc-900 text-white rounded-xl flex items-center justify-center hover:bg-[#d32f2f] transition-all shadow-lg">
                  <Plus size={18} />
                </button>
              </div>
              <div className="space-y-3">
                {requirements.map((req, index) => (
                  <div key={index} className="flex gap-3 group">
                    <div className="flex-none w-14 h-14 bg-zinc-100 rounded-[1rem] flex items-center justify-center text-[10px] font-black text-zinc-400">
                      {index + 1}
                    </div>
                    <input 
                      value={req} 
                      onChange={(e) => handleRequirementChange(index, e.target.value)}
                      placeholder="Requirement point..." 
                      className="w-full px-6 py-4 bg-zinc-50 rounded-[1.2rem] border-none font-bold text-zinc-900 shadow-inner outline-none focus:bg-white transition-all" 
                    />
                    <button type="button" onClick={() => removeRequirement(index)} className="w-14 h-14 rounded-[1.2rem] flex items-center justify-center text-zinc-300 hover:text-red-500 hover:bg-red-50 transition-all">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button disabled={loading} className="w-full py-8 bg-[#d32f2f] text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.4em] shadow-xl hover:bg-zinc-900 transition-all flex items-center justify-center gap-4 group">
            {loading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
            {editingId ? "Confirm Changes" : "Establish New Program"}
          </button>
        </form>
      </motion.div>

      {/* --- INVENTORY SECTION --- */}
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12 px-4">
           <div>
              <h3 className="text-4xl font-black text-zinc-900 tracking-tight">Active Programs</h3>
              <p className="text-zinc-400 font-bold text-xs uppercase tracking-[0.2em] mt-2">Manage your academic portfolio</p>
           </div>
           
           <div className="relative group w-full md:w-96">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-300" size={20} />
              <input 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search programs..." 
                className="w-full pl-16 pr-8 py-5 bg-white rounded-2xl border border-zinc-100 shadow-sm focus:shadow-xl outline-none font-bold"
              />
           </div>
        </div>

        {fetching ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[3rem] border border-zinc-100">
            <Loader2 className="animate-spin text-[#d32f2f] mb-4" size={40} />
            <p className="text-zinc-400 font-black text-[10px] uppercase tracking-widest">Accessing data...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredCourses.map((course) => (
                <motion.div 
                  key={course.id} 
                  layout 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group bg-white rounded-[2.5rem] border border-zinc-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={course.image_url || "/placeholder.jpg"} alt={course.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" unoptimized />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 gap-3">
                       <div className="flex gap-2">
                          <button onClick={() => startEdit(course)} className="flex-1 bg-white py-4 rounded-xl text-zinc-900 font-black text-[10px] uppercase tracking-widest hover:bg-[#d32f2f] hover:text-white transition-colors flex items-center justify-center gap-2">
                            <Edit3 size={14} /> Edit
                          </button>
                          <button 
                            onClick={() => copyToClipboard(course.id)} 
                            className={`w-14 py-4 rounded-xl transition-all flex items-center justify-center ${copiedId === course.id ? 'bg-emerald-500 text-white' : 'bg-white/20 text-white backdrop-blur-md'}`}
                          >
                            {copiedId === course.id ? <Check size={18} /> : <Copy size={18} />}
                          </button>
                       </div>
                       <button onClick={() => handleDelete(course.id)} className="w-full bg-red-500/10 border border-red-500/20 backdrop-blur-md py-4 rounded-xl text-red-500 font-black text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">
                         Terminate Program
                       </button>
                    </div>

                    <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl shadow-sm">
                       <span className="text-[10px] font-black text-zinc-900 uppercase italic">LVL {course.level}</span>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 bg-[#d32f2f] rounded-full" />
                      <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{course.category}</span>
                    </div>
                    <h4 className="text-xl font-black text-zinc-900 leading-tight line-clamp-2">{course.title}</h4>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}