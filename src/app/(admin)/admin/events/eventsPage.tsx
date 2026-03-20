"use client";

import { useReducer, useState, use, useTransition, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Trash2, Calendar as CalendarIcon, X, Loader2, CheckCircle2,
  Sparkles, ChevronLeft, Search, Edit3, MapPin,ChevronDown, Check
} from "lucide-react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import confetti from "canvas-confetti";
import "react-day-picker/dist/style.css";
import Link from "next/link";

import { eventsReducer, Event } from "@/types/types";
import { createEventAction, deleteEventAction, updateEventAction } from "@/app/actions/events";

interface Props {
  eventsPromise: Promise<Event[]>;
}

export default function EventPageAll({ eventsPromise }: Props) {
  const initialEvents = use(eventsPromise);
  const [isPending, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState("");
  
  // المواقع المعتمدة في الـ SQL Constraint
  const LOCATIONS = [
    "Dubai - Innovation Hub",
    "Abu Dhabi - Global Market",
    "Virtual - Metaverse Station",
    "Sharjah - Research Center"
  ];

  // States للمودال والبيانات
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [formData, setFormData] = useState({ id: "", title: "", location: LOCATIONS[0] });

  const [state, dispatch] = useReducer(eventsReducer, {
    events: initialEvents,
    isEditorOpen: false,
    isSyncing: false,
  });

  // نظام البحث الحديث - فلترة لحظية
  const filteredEvents = useMemo(() => {
    return state.events.filter(e => 
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [state.events, searchQuery]);
const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const triggerSuccessStyle = (isUpdate = false) => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: isUpdate ? ["#003366", "#000000"] : ["#E63946", "#003366"]
    });
  };

  const openEditModal = (event: Event) => {
    setFormData({ 
      id: event.id, 
      title: event.title, 
      location: event.category // ربط الـ category بالـ location في الواجهة
    });
    setSelectedDate(new Date(event.date));
    dispatch({ type: "TOGGLE_EDITOR" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !selectedDate || isPending) return;

    startTransition(async () => {
      dispatch({ type: "SET_SYNCING", status: true });
      try {
        // تجهيز البيانات: نرسل الـ location كـ category لتوافق الـ Schema
        const payload = { 
          title: formData.title, 
          date: selectedDate, 
          category: formData.location 
        };
        
        if (formData.id) {
          const updatedEvent = await updateEventAction(formData.id, payload);
          dispatch({ type: "UPDATE_EVENT", payload: updatedEvent });
          triggerSuccessStyle(true);
        } else {
          const savedEvent = await createEventAction(payload);
          dispatch({ type: "ADD_EVENT", payload: savedEvent });
          triggerSuccessStyle(false);
        }

        setTimeout(() => closeAndReset(), 500);
      } catch (error) {
        console.error("Operation Failed:", error);
      } finally {
        dispatch({ type: "SET_SYNCING", status: false });
      }
    });
  };

  const closeAndReset = () => {
    setFormData({ id: "", title: "", location: LOCATIONS[0] });
    setSelectedDate(new Date());
    if (state.isEditorOpen) dispatch({ type: "CLOSE_EDITOR" });
  };

  const handleDelete = (id: string) => {
    startTransition(async () => {
      dispatch({ type: "SET_SYNCING", status: true });
      try {
        await deleteEventAction(id);
        dispatch({ type: "DELETE_EVENT", id });
      } catch (error) {
        console.error("Delete Error:", error);
      } finally {
        dispatch({ type: "SET_SYNCING", status: false });
      }
    });
  };

  return (
    <main className="min-h-screen bg-[#fcfcfc] pb-20">
      
         {/* --- الهيرو المطابق للهوية البصرية (Master Hero) --- */}
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
            EVE<span className="text-[#E63946]">NTS</span>
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

      <div className="max-w-7xl mx-auto px-4 -mt-20 relative z-30 space-y-8">
        {/* Control Bar */}
        <div className="bg-white/90 backdrop-blur-3xl border border-black/5 p-4 md:p-6 rounded-[2.5rem] shadow-2xl flex flex-col lg:flex-row gap-6 items-center">
          <div className="flex items-center gap-4 w-full lg:w-auto">
             <Link href="/admin" className="p-4 bg-zinc-100 rounded-2xl hover:bg-zinc-200 transition-all"><ChevronLeft size={20}/></Link>
             <h2 className="text-2xl font-black italic uppercase tracking-tighter">Terminal</h2>
          </div>
          <div className="relative w-full flex-1 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
            <input 
              type="text" 
              placeholder="SEARCH EventS OR LOCATIONS..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-50 border-none rounded-2xl py-5 pl-16 pr-6 font-bold text-sm outline-none focus:ring-2 focus:ring-[#E63946]/10"
            />
          </div>
          <button onClick={() => dispatch({ type: "TOGGLE_EDITOR" })} className="w-full lg:w-auto bg-black text-white px-8 py-5 rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-[#E63946] transition-all">
            <Plus size={24} /> <span className="text-xs uppercase tracking-widest">New Event</span>
          </button>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event) => (
              <motion.div key={event.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="group bg-white p-8 rounded-[3rem] border border-black/5 shadow-sm hover:shadow-2xl transition-all">
                <div className="flex justify-between items-start mb-6">
                  <span className="inline-flex items-center gap-2 text-[9px] font-black uppercase px-4 py-2 bg-[#003366] text-white rounded-xl">
                    <MapPin size={10} className="text-[#E63946]" /> {event.category}
                  </span>
                  <div className="flex gap-2">
                    <button onClick={() => openEditModal(event)} className="p-2 text-zinc-300 hover:text-blue-600 transition-colors"><Edit3 size={18}/></button>
                    <button onClick={() => handleDelete(event.id)} className="p-2 text-zinc-300 hover:text-[#E63946] transition-colors"><Trash2 size={18}/></button>
                  </div>
                </div>
                <h3 className="text-2xl font-black uppercase leading-tight mb-4 text-[#003366]">{event.title}</h3>
                <div className="flex items-center gap-2 text-zinc-400 font-bold text-xs uppercase tracking-tighter">
                  <CalendarIcon size={14} /> {format(new Date(event.date), "MMMM dd, yyyy")}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

   {/* CRUD Modal */}
<AnimatePresence>
  {state.isEditorOpen && (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Background Overlay */}
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }} 
        onClick={closeAndReset} 
        className="absolute inset-0 bg-black/80 backdrop-blur-md" 
      />

      {/* Modal Container: overflow-visible ضروري لظهور القائمة المنسدلة */}
      <motion.div 
        initial={{ scale: 0.9, y: 50, opacity: 0 }} 
        animate={{ scale: 1, y: 0, opacity: 1 }} 
        exit={{ scale: 0.9, y: 50, opacity: 0 }} 
        className="relative w-full max-w-4xl bg-white p-8 md:p-12 rounded-[3.5rem] shadow-2xl overflow-visible"
      >
        {/* نموذج واحد فقط يغلف المحتوى بالكامل */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Left Column: Data Input */}
          <div className="space-y-8">
            <h2 className="text-4xl font-black uppercase italic tracking-tighter text-[#003366]">
              {formData.id ? "Edit" : "New"} <br /> 
              <span className="text-[#E63946]">Event</span>
            </h2>

            <div className="space-y-6">
              {/* input اسم البروتوكول */}
              <input 
                required 
                placeholder="Event NAME" 
                className="w-full bg-zinc-50 rounded-2xl p-6 font-black outline-none border-2 border-transparent focus:border-[#E63946]/20 transition-all" 
                value={formData.title} 
                onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
              />

              {/* ميزة الـ Luxury Dropdown الجديدة */}
              <div className="relative">
                <div
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`relative w-full bg-zinc-50 rounded-2xl p-6 pl-16 font-black flex items-center justify-between cursor-pointer transition-all duration-300 border-2 ${isDropdownOpen ? "border-[#E63946] bg-white shadow-xl" : "border-transparent"}`}
                >
                  <MapPin className={`absolute left-6 transition-colors ${isDropdownOpen ? "text-[#E63946]" : "text-zinc-400"}`} size={20} />
                  <span className="text-[11px] uppercase tracking-widest text-[#003366] font-black">
                    {formData.location}
                  </span>
                  <motion.div animate={{ rotate: isDropdownOpen ? 180 : 0 }}>
                    <ChevronDown size={18} className="text-zinc-400" />
                  </motion.div>
                </div>

                {/* Dropdown Menu Items */}
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 5, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute z-[110] w-full mt-2 bg-white/95 backdrop-blur-2xl border border-black/5 rounded-[2rem] shadow-2xl p-2 overflow-hidden"
                    >
                      {LOCATIONS.map((loc) => (
                        <motion.div
                          key={loc}
                          whileHover={{ x: 5, backgroundColor: "rgba(230, 57, 70, 0.05)" }}
                          onClick={() => {
                            setFormData({ ...formData, location: loc });
                            setIsDropdownOpen(false);
                          }}
                          className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all ${formData.location === loc ? "bg-[#003366] text-white shadow-lg" : "text-zinc-500 hover:text-zinc-800"}`}
                        >
                          <span className="font-black text-[10px] uppercase tracking-widest">{loc}</span>
                          {formData.location === loc && <Check size={14} className="text-[#E63946]" />}
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Right Column: Date Picker & Submit */}
          <div className="flex flex-col items-center bg-zinc-50 p-6 rounded-[2.5rem]">
            <DayPicker mode="single" selected={selectedDate} onSelect={setSelectedDate} />
            
            <motion.button 
              disabled={isPending} 
              type="submit" 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full mt-6 py-6 rounded-2xl font-black uppercase text-white shadow-xl flex items-center justify-center gap-3 transition-all duration-300 ${isPending ? "bg-zinc-400" : formData.id ? "bg-[#003366]" : "bg-[#E63946]"}`}
            >
              {isPending ? <Loader2 className="animate-spin" /> : <CheckCircle2 size={20} />}
              <span>{isPending ? "Synchronizing..." : formData.id ? "Update Event" : "Deploy Event"}</span>
            </motion.button>
          </div>

        </form>
      </motion.div>
    </div>
  )}
</AnimatePresence>
    </main>
  );
}