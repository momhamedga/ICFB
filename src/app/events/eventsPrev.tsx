"use client";

import { use, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, Calendar as CalendarIcon, Search, 
  ArrowUpRight, Clock, MapPin 
} from "lucide-react";
import { format } from "date-fns";
import { Event } from "@/types/types";

interface Props {
  eventsPromise: Promise<Event[]>;
}

export default function EventsClientPage({ eventsPromise }: Props) {
  const initialEvents = use(eventsPromise);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLocation, setActiveLocation] = useState("All");

  // المواقع المعتمدة (يجب أن تطابق الموجودة في الـ Admin تماماً)
  const LOCATIONS = [
    "All",
    "Dubai - Innovation Hub",
    "Abu Dhabi - Global Market",
    "Virtual - Metaverse Station",
    "Sharjah - Research Center"
  ];

  // منطق الفلترة المحدث ليعمل مع المواقع
  const filteredEvents = useMemo(() => {
    return initialEvents.filter(e => {
      const matchesSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase());
      // هنا e.category هي التي تخزن الموقع في قاعدة البيانات
      const matchesLocation = activeLocation === "All" || e.category === activeLocation;
      return matchesSearch && matchesLocation;
    });
  }, [initialEvents, searchQuery, activeLocation]);

  const handleBooking = (eventTitle: string) => {
    window.location.href = `/contact?subject=Booking for ${eventTitle}`;
  };

  return (
    <main className="min-h-screen bg-[#fafafa] pb-32 selection:bg-[#E63946]/10">
      
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

      {/* 2. البحث والفلترة بالمواقع */}
      <div className="max-w-7xl mx-auto px-4 -mt-12 relative z-30">
        <div className="bg-white/80 backdrop-blur-3xl border border-black/[0.05] p-5 rounded-[2.5rem] shadow-2xl flex flex-col lg:flex-row gap-6 items-center">
          
          <div className="relative flex-1 w-full group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
            <input 
              type="text"
              placeholder="SEARCH PROTOCOLS OR LOCATIONS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-50 border-none rounded-2xl py-6 pl-16 pr-6 font-black text-xs uppercase outline-none focus:ring-2 focus:ring-[#E63946]/10 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 p-1.5 bg-zinc-100/50 rounded-2xl overflow-x-auto no-scrollbar w-full lg:w-auto">
            {LOCATIONS.map((loc) => (
              <button
                key={loc}
                onClick={() => setActiveLocation(loc)}
                className={`px-6 py-4 rounded-xl text-[9px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                  activeLocation === loc ? "bg-[#003366] text-white shadow-lg" : "text-zinc-400 hover:text-[#003366]"
                }`}
              >
                {loc === "All" ? "All Stations" : loc.split(" - ")[0]} {/* عرض اسم المدينة فقط في التبويبات للتبسيط */}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. عرض الكروت */}
      <div className="max-w-7xl mx-auto px-4 mt-20">
        <AnimatePresence mode="popLayout">
          {filteredEvents.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-40 text-center border-2 border-dashed border-zinc-200 rounded-[4rem]">
               <p className="text-zinc-400 font-black uppercase tracking-[0.4em] text-xs">No active protocols in this sector.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredEvents.map((event, idx) => (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="group relative bg-white rounded-[3.5rem] p-10 border border-black/[0.03] shadow-sm hover:shadow-2xl transition-all"
                >
                  <div className="flex justify-between items-start mb-10">
                    <span className="inline-flex items-center gap-2 px-5 py-2 bg-[#003366] text-white rounded-xl text-[9px] font-black uppercase tracking-[0.2em]">
                      <MapPin size={10} className="text-[#E63946]" /> {event.category}
                    </span>
                    <Clock size={20} className="text-zinc-200 group-hover:text-[#E63946] transition-colors" />
                  </div>

                  <h3 className="text-3xl font-black uppercase italic tracking-tighter leading-tight mb-6 text-[#003366]">
                    {event.title}
                  </h3>
                  
                  <div className="space-y-4 mb-10">
                    <div className="flex items-center gap-3 text-zinc-400 font-bold text-[10px] uppercase tracking-widest">
                      <CalendarIcon size={16} className="text-[#E63946]" />
                      {format(new Date(event.date), "MMMM dd, yyyy")}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button 
                      onClick={() => handleBooking(event.title)}
                      className="flex-[4] py-6 bg-zinc-900 text-white rounded-[1.8rem] font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-[#E63946] hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-lg"
                    >
                      Secure Spot <ArrowUpRight size={16} />
                    </button>

                    <a
                      href={`https://wa.me/971XXXXXXXXX?text=Hello, I want to book for ${event.title}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center bg-[#25D366] text-white rounded-[1.8rem] hover:bg-[#128C7E] transition-all duration-300 group/wa relative overflow-hidden"
                    >
                      <span className="absolute inset-0 bg-white/20 scale-0 group-hover/wa:scale-150 rounded-full transition-transform duration-500" />
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative z-10 group-hover/wa:rotate-12 transition-transform">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}