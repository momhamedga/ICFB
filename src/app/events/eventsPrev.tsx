"use client";

import { use, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, Calendar as CalendarIcon, Search, 
  ArrowUpRight, MapPin, Fingerprint, LayoutGrid 
} from "lucide-react";
import { format } from "date-fns";
import { Event } from "@/types/types";
interface EventsClientPageProps {
  eventsPromise: Promise<Event[]>;
}
export default function EventsClientPage({ eventsPromise }: { eventsPromise: Promise<Event[]> }) {
  // استخدام use مع fallback لضمان عدم حدوث crash
  const initialEvents = use(eventsPromise) || [];
  
  const [searchQuery, setSearchQuery] = useState("");
const [activeLocation, setActiveLocation] = useState("All");
  const LOCATIONS = ["All", "Dubai - Innovation Hub", "Abu Dhabi - Global Market", "Virtual - Metaverse Station"];
const filteredEvents = useMemo(() => {
  // 1. إجبار النوع هنا هو اللي هيشيل الخطوط الحمراء عن الـ filter
  const events = (initialEvents as Event[]) || [];

  return events.filter((event: Event) => {
    // 2. تأمين النصوص بشكل صارم
    const title = (event.title || "").toLowerCase();
    const category = event.category || "";
    const search = (searchQuery || "").toLowerCase().trim();

    const matchesSearch = title.includes(search);
    const matchesLocation = 
      activeLocation === "All" || 
      category === activeLocation;

    return matchesSearch && matchesLocation;
  });
}, [initialEvents, searchQuery, activeLocation]);
  return (
    <div className="relative z-10 font-sans selection:bg-[#E63946] selection:text-white">
      
      {/* 1. Cinematic Hero - Inspired by "EVENTS" Screenshot */}
      <section className="relative h-[40vh] md:h-[60vh] flex items-center justify-center overflow-hidden bg-[#003366]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(230,57,70,0.1)_0%,transparent_100%)]" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
        </div>

        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#E63946] text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] mb-6"
          >
            <Sparkles size={12} /> Professional Evolution
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-white text-6xl md:text-[12rem] font-black tracking-[-0.04em] uppercase leading-[0.85] flex flex-col md:block"
          >
            EVE<span className="text-[#E63946]">NTS</span>
          </motion.h1>
          
          <motion.p className="text-white/40 mt-4 md:mt-8 font-bold tracking-[0.5em] uppercase text-[10px] md:text-xs">
            Institutional Architects
          </motion.p>
        </div>
      </section>

      {/* 2. Tactical Search & Filter - Optimized for Mobile */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 -mt-10 md:-mt-14 relative z-30">
        <div className="bg-white border border-zinc-200 p-4 md:p-6 rounded-[2rem] md:rounded-[3rem] shadow-2xl flex flex-col lg:flex-row gap-4 items-center">
          
          {/* Search Input */}
          <div className="relative flex-1 w-full group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-[#E63946] transition-colors" size={18} />
            <input 
              type="text"
              placeholder="SEARCH PROTOCOLS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-50 border-none rounded-2xl py-5 md:py-6 pl-14 pr-6 font-black text-[10px] md:text-xs uppercase outline-none focus:ring-2 focus:ring-[#E63946]/10 transition-all"
            />
          </div>

          {/* Location Chips - Scrollable on Mobile */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full lg:w-auto pb-2 lg:pb-0 px-2">
            {LOCATIONS.map((loc) => (
              <button
                key={loc}
                onClick={() => setActiveLocation(loc)}
                className={`px-5 py-3 md:py-4 rounded-xl text-[9px] font-black uppercase tracking-widest whitespace-nowrap transition-all border ${
                  activeLocation === loc 
                    ? "bg-[#001429] text-white border-[#001429] shadow-lg scale-105" 
                    : "bg-white text-zinc-400 border-zinc-100 hover:border-zinc-300"
                }`}
              >
                {loc === "All" ? "ALL STATIONS" : loc.split(" - ")[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. The Grid - Heavy Typography Style */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mt-16 md:mt-24 pb-32">
        <AnimatePresence mode="popLayout">
          {filteredEvents.length === 0 ? (
            <motion.div className="py-40 text-center border-2 border-dashed border-zinc-100 rounded-[3rem] md:rounded-[5rem]">
               <Fingerprint size={48} className="mx-auto text-zinc-200 mb-6" />
               <p className="text-zinc-400 font-black uppercase tracking-[0.4em] text-[10px]">No active protocols found</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
              {filteredEvents.map((event, idx) => (
                <motion.div
                  key={event.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="group relative bg-white rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-12 border border-zinc-100 hover:border-[#E63946]/20 shadow-sm hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500"
                >
                  {/* Category Badge */}
                  <div className="flex justify-between items-start mb-8 md:mb-12">
                    <div className="flex items-center gap-2 px-4 py-2 bg-[#F8FAFC] rounded-lg border border-zinc-100">
                      <MapPin size={12} className="text-[#E63946]" />
                      <span className="text-[8px] font-black uppercase tracking-widest text-[#001429]">{event.category}</span>
                    </div>
                    <LayoutGrid size={18} className="text-zinc-200 group-hover:text-[#E63946] transition-colors" />
                  </div>

                  {/* Title - Extra Heavy Like the Screenshot */}
                  <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-[0.9] mb-8 text-[#001429] italic group-hover:not-italic transition-all">
                    {event.title}
                  </h3>
                  
                  {/* Date Protocol */}
                  <div className="flex items-center gap-3 mb-10 md:mb-14 py-4 border-y border-zinc-50">
                    <div className="w-10 h-10 rounded-full bg-[#E63946]/5 flex items-center justify-center">
                       <CalendarIcon size={16} className="text-[#E63946]" />
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-zinc-300 uppercase tracking-widest">Date_Log</p>
                      <p className="text-[11px] font-black text-[#001429] uppercase">
                        {format(new Date(event.date), "MMMM dd, yyyy")}
                      </p>
                    </div>
                  </div>

                  {/* Actions - Modern & Tactical */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button 
                      onClick={() => (window.location.href = `/contact?subject=Booking for ${event.title}`)}
                      className="flex-[3] py-5 bg-[#001429] text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-[#E63946] transition-all duration-300 active:scale-95 shadow-lg shadow-[#001429]/10"
                    >
                      Secure Spot <ArrowUpRight size={14} />
                    </button>
                    
                    <a
                      href={`https://wa.me/971XXXXXXXXX?text=Inquiry: ${event.title}`}
                      target="_blank"
                      className="flex-1 flex items-center justify-center bg-[#25D366]/5 text-[#25D366] border border-[#25D366]/20 rounded-2xl py-5 hover:bg-[#25D366] hover:text-white transition-all duration-300"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}