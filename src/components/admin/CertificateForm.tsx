"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Upload, Database, User, BookOpen, Calendar as CalendarIcon, 
  Loader2, CheckCircle2, AlertCircle, FileText, Trash2, ExternalLink, ShieldCheck, Edit3, X
} from "lucide-react";
import { adminService } from "@/services/adminService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Certificate {
  id: string;
  cert_code: string;
  student_name: string;
  course_name: string;
  issue_date: string;
  pdf_url: string;
}

export default function CertificateForm() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  
  // حالات التعديل
  const [editingId, setEditingId] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const refreshData = useCallback(async () => {
    try {
      const data = await adminService.getAllCertificates();
      setCertificates(data || []);
    } catch (err) {
      console.error("Failed to fetch certificates");
    } finally {
      setFetching(false);
    }
  }, []);

  useEffect(() => { refreshData(); }, [refreshData]);

  // دالة بدء التعديل
  const startEdit = (cert: Certificate) => {
    setEditingId(cert.id);
    setStartDate(new Date(cert.issue_date));
    setSelectedFileName("Keep current file (Optional)");
    
    // ملء الحقول يدوياً
    if (formRef.current) {
      formRef.current.studentName.value = cert.student_name;
      formRef.current.code.value = cert.cert_code;
      formRef.current.courseName.value = cert.course_name;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setSelectedFileName(null);
    formRef.current?.reset();
    setStartDate(new Date());
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    const file = formData.get('pdfFile') as File;

    try {
      if (editingId) {
        // منطق التحديث (Update)
        await adminService.updateCertificate(editingId, {
          code: formData.get('code') as string,
          studentName: formData.get('studentName') as string,
          courseName: formData.get('courseName') as string,
          issueDate: startDate ? startDate.toISOString().split('T')[0] : "",
          file: file.size > 0 ? file : undefined // نرسل الملف فقط لو تم اختياره
        });
        setStatus({ type: 'success', msg: 'Credential updated successfully!' });
      } else {
        // منطق الإضافة (Create)
        await adminService.createCertificate({
          code: formData.get('code') as string,
          studentName: formData.get('studentName') as string,
          courseName: formData.get('courseName') as string,
          issueDate: startDate ? startDate.toISOString().split('T')[0] : "",
          file: file
        });
        setStatus({ type: 'success', msg: 'Credential published successfully!' });
      }
      
      cancelEdit();
      refreshData();
    } catch (err: any) {
      setStatus({ type: 'error', msg: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to revoke this credential?")) return;
    try {
      await adminService.deleteCertificate(id);
      refreshData();
    } catch (err) {
      alert("Error deleting record");
    }
  };

  return (
    <div className="space-y-8 md:space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. Form Section */}
      <motion.div 
        layout
        className="bg-white rounded-[30px] md:rounded-[40px] shadow-sm border border-zinc-100 overflow-hidden"
      >
        <div className="p-6 md:p-10 border-b border-zinc-50 flex justify-between items-center bg-zinc-50/30">
          <h2 className="font-black text-lg md:text-xl text-zinc-800 flex items-center gap-3">
            {editingId ? <Edit3 className="text-amber-500" /> : <ShieldCheck className="text-[#d32f2f]" />}
            {editingId ? "Edit Credential" : "New Authorisation"}
          </h2>
          {editingId && (
            <button onClick={cancelEdit} className="text-zinc-400 hover:text-zinc-800 transition-colors"><X size={20}/></button>
          )}
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="p-6 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400">
              <User size={14}/> Student Full Name
            </label>
            <input required name="studentName" type="text" className="w-full p-4 bg-zinc-50 rounded-2xl outline-none font-bold text-zinc-800 transition-all focus:ring-2 focus:ring-rose-100/50" placeholder="e.g. Alexander Hamilton" />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400">
              <Database size={14}/> Unique ID Code
            </label>
            <input required name="code" type="text" className="w-full p-4 bg-zinc-50 rounded-2xl outline-none font-bold text-zinc-800 focus:ring-2 focus:ring-rose-100/50" placeholder="e.g. UK-789-2026" />
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400">
              <BookOpen size={14}/> Programme Title
            </label>
            <input required name="courseName" type="text" className="w-full p-4 bg-zinc-50 rounded-2xl outline-none font-bold text-zinc-800 focus:ring-2 focus:ring-rose-100/50" placeholder="Master of Full-Stack Architecture" />
          </div>

          <div className="space-y-2 flex flex-col">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400">
              <CalendarIcon size={14}/> Issuance Date
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              dateFormat="dd/MM/yyyy"
              className="w-full p-4 bg-zinc-50 rounded-2xl outline-none font-bold text-zinc-800 cursor-pointer focus:ring-2 focus:ring-rose-100/50"
            />
          </div>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400">
              <Upload size={14}/> PDF Document {editingId && "(Optional)"}
            </label>
            <div className="relative group">
              <input name="pdfFile" type="file" accept=".pdf" onChange={(e) => setSelectedFileName(e.target.files?.[0]?.name || null)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
              <div className={`w-full p-4 rounded-2xl flex items-center justify-between transition-colors ${editingId ? 'bg-amber-50 text-amber-700' : 'bg-zinc-900 text-white group-hover:bg-zinc-800'}`}>
                <span className="text-[10px] font-bold truncate pr-4">{selectedFileName || "Select New PDF..."}</span>
                <FileText size={16} className={editingId ? 'text-amber-400' : 'text-zinc-500'} />
              </div>
            </div>
          </div>

          <div className="md:col-span-2 pt-6 border-t border-zinc-50 flex flex-col md:flex-row items-center justify-between gap-4">
            <AnimatePresence mode="wait">
              {status && (
                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className={`flex items-center gap-2 text-xs font-bold ${status.type === 'success' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {status.type === 'success' ? <CheckCircle2 size={16}/> : <AlertCircle size={16}/>}
                  {status.msg}
                </motion.div>
              )}
            </AnimatePresence>
            <button disabled={loading} type="submit" className={`w-full md:w-auto px-12 py-4 rounded-[20px] font-black text-[11px] uppercase tracking-widest transition-all disabled:opacity-50 shadow-lg ${editingId ? 'bg-amber-500 hover:bg-zinc-900 text-white' : 'bg-[#d32f2f] hover:bg-zinc-900 text-white shadow-rose-900/10'}`}>
              {loading ? <Loader2 className="animate-spin" size={18} /> : editingId ? "Update Credential" : "Authorise & Publish"}
            </button>
          </div>
        </form>
      </motion.div>

      {/* 2. Credentials List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-2 md:px-4">
          <h2 className="text-lg md:text-xl font-black text-zinc-800 flex items-center gap-2">
            <Database className="text-[#d32f2f]" size={20} /> Records Library
          </h2>
          <span className="bg-white border border-zinc-100 px-4 py-1.5 rounded-full text-[10px] font-black text-zinc-400 uppercase shadow-sm">
            Total: {certificates.length}
          </span>
        </div>

        {fetching ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-zinc-200" size={44} /></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <AnimatePresence>
              {certificates.map((cert) => (
                <motion.div
                  key={cert.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="group relative bg-white/60 backdrop-blur-xl border border-white rounded-[32px] p-5 md:p-6 shadow-xl shadow-zinc-200/40 hover:shadow-rose-900/5 transition-all duration-500"
                >
                  <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                    <div className="flex justify-between items-start">
                      <div className="p-3 bg-rose-50 rounded-2xl group-hover:scale-110 transition-transform">
                        <FileText className="text-[#d32f2f]" size={20} />
                      </div>
                      <div className="flex bg-zinc-50/80 rounded-xl p-1 border border-zinc-100">
                        <a href={cert.pdf_url} target="_blank" className="p-2 text-zinc-400 hover:text-blue-600 transition-colors"><ExternalLink size={16} /></a>
                        <button onClick={() => startEdit(cert)} className="p-2 text-zinc-400 hover:text-amber-600 transition-colors"><Edit3 size={16} /></button>
                        <button onClick={() => handleDelete(cert.id)} className="p-2 text-zinc-400 hover:text-rose-600 transition-colors"><Trash2 size={16} /></button>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <p className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em]">Student</p>
                      <h3 className="font-bold text-zinc-800 text-lg leading-tight group-hover:text-[#d32f2f] transition-colors">{cert.student_name}</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-100/60">
                      <div>
                        <p className="text-[8px] font-black text-zinc-400 uppercase">ID Code</p>
                        <p className="text-xs font-bold text-zinc-700">#{cert.cert_code}</p>
                      </div>
                      <div>
                        <p className="text-[8px] font-black text-zinc-400 uppercase">Date</p>
                        <p className="text-xs font-bold text-zinc-700">{new Date(cert.issue_date).toLocaleDateString('en-GB')}</p>
                      </div>
                    </div>

                    <div className="p-3 bg-zinc-50/50 rounded-2xl border border-zinc-100/50">
                      <p className="text-[8px] font-black text-zinc-400 uppercase mb-1">Programme</p>
                      <p className="text-[10px] font-bold text-zinc-600 line-clamp-1">{cert.course_name}</p>
                    </div>
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