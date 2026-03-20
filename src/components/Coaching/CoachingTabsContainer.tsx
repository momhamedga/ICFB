"use client";
import { useState, useOptimistic, useTransition } from "react";
import { LayoutGroup, motion, AnimatePresence } from "framer-motion";
import OverviewSection from "./OverviewSection";
import ServicesGrid from "./ServicesGrid";
import BookingForm from "./BookingForm";

type Tab = "overview" | "services" | "booking";

export default function CoachingTabsContainer() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [isPending, startTransition] = useTransition();

  // Optimistic UI for instant tab switching
  const [optimisticTab, setOptimisticTab] = useOptimistic(activeTab);

  const handleTabChange = (tab: Tab) => {
    startTransition(() => {
      setOptimisticTab(tab);
      setActiveTab(tab);
    });
  };

  return (
    <div className="space-y-12">
      {/* 📱 Floating Mobile Dock / 💻 Desktop Tab Bar */}
      <nav className="fixed bottom-6 left-4 right-4 md:relative md:bottom-0 md:left-0 md:right-0 z-[100] md:z-10">
        <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-3xl p-2 rounded-[2.5rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.2)] border border-white/40 flex items-center justify-between gap-1">
          <TabNavBtn 
            active={optimisticTab === "overview"} 
            onClick={() => handleTabChange("overview")} 
            label="Intel" 
          />
          <TabNavBtn 
            active={optimisticTab === "services"} 
            onClick={() => handleTabChange("services")} 
            label="Protocol" 
          />
          <TabNavBtn 
            active={optimisticTab === "booking"} 
            onClick={() => handleTabChange("booking")} 
            label="Reserve" 
            primary 
          />
        </div>
      </nav>

      {/* Content Render with High-Speed Transitions */}
      <div className="min-h-[500px] py-10">
        <AnimatePresence mode="wait">
          {activeTab === "overview" && <OverviewSection key="overview" />}
          {activeTab === "services" && <ServicesGrid key="services" />}
          {activeTab === "booking" && <BookingForm key="booking" />}
        </AnimatePresence>
      </div>
    </div>
  );
}

function TabNavBtn({ active, onClick, label, primary }: any) {
  return (
    <button 
      onClick={onClick}
      className={`relative flex-1 py-4 md:py-5 rounded-[2rem] text-[10px] md:text-xs font-black uppercase tracking-[0.2em] transition-all duration-500 outline-none
        ${active ? (primary ? 'text-white' : 'text-[#003366]') : 'text-slate-400 hover:text-slate-600'}
      `}
    >
      {active && (
        <motion.div 
          layoutId="activeTab"
          className={`absolute inset-0 rounded-[1.8rem] z-0 ${primary ? 'bg-[#E63946]' : 'bg-[#003366]/5'}`}
          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </button>
  );
}