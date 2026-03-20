"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
// استيراد المكونات من الملف المشترك
import { 
  ServiceCard, 
  TabTrigger, 
  MentoringBenefit, 
  CorporateSidebar, 
  MentoringSidebar, 
  ContactSection 
} from "./SharedUI";
import { SERVICES_LIST, MENTORING_BENEFITS } from "@/lib/constants/services";

export default function ServicesContent() {
  const [activeTab, setActiveTab] = useState("services");

  return (
    <div className="pb-20">
      {/* 1. نظام التبديل (Tab Switcher) */}
      <div className="max-w-xl mx-auto -mt-10 md:-mt-14 relative z-40 mb-24 px-4">
        <div className="flex p-1.5 bg-[#001A33]/95 backdrop-blur-2xl rounded-full border border-white/10 shadow-2xl">
          <TabTrigger 
            label="Corporate" 
            isActive={activeTab === "services"} 
            onClick={() => setActiveTab("services")} 
          />
          <TabTrigger 
            label="Mentoring" 
            isActive={activeTab === "mentoring"} 
            onClick={() => setActiveTab("mentoring")} 
          />
        </div>
      </div>

      {/* 2. عرض المحتوى مع الأنيميشن */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-7xl mx-auto px-6"
        >
          {activeTab === "services" ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* الجانب الأيسر: الشرح (Corporate Sidebar) */}
              <div className="lg:col-span-4 lg:sticky lg:top-32">
                <CorporateSidebar />
              </div>
              
              {/* الجانب الأيمن: كروت الخدمات */}
              <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {SERVICES_LIST.map((title, i) => (
                  <ServiceCard key={i} title={title} index={i + 1} />
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
              {/* الجانب الأيسر: تفاصيل البرنامج (Mentoring Sidebar) */}
              <div className="lg:col-span-5 lg:sticky lg:top-32">
                <MentoringSidebar />
              </div>

              {/* الجانب الأيمن: قائمة المزايا الفخمة */}
              <div className="lg:col-span-7 space-y-4">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#003366]/30 mb-8 ml-4">
                  Growth_Benefits
                </h4>
                {MENTORING_BENEFITS.map((benefit, i) => (
                  <MentoringBenefit key={i} title={benefit} index={i + 1} />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* 3. فورم التواصل النهائي (Contact Section) */}
      <div className="mt-20">
        <div className="max-w-7xl mx-auto px-6">
           <div className="h-px w-full bg-slate-100 mb-32" /> 
        </div>
        <ContactSection />
      </div>
    </div>
  );
}