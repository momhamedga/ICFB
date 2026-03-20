import CoachingHero from "@/components/Coaching/CoachingHero";
import CoachingTabsContainer from "@/components/Coaching/CoachingTabsContainer";

/**
 * @description Optimized Coaching Entry Point
 * @structure Static Server Shell + Heavy Client Interactive Components
 */

export default function CoachingPage() {
  return (
    <main className="min-h-screen  pb-32 selection:bg-[#E63946] selection:text-white overflow-x-hidden">
      
      {/* ⚡ Client-Side Hero (Separated for speed) */}
      <CoachingHero />

      {/* 🧩 Interactive Hub */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 -mt-20 relative z-30">
        <CoachingTabsContainer />
      </div>

      {/* 🏁 Static Branding Elements */}
      <aside className="fixed right-8 bottom-12 hidden xl:flex flex-col items-center gap-6 pointer-events-none opacity-10">
        <span className="text-[9px] font-black text-[#003366] uppercase tracking-[1em] [writing-mode:vertical-rl]">
          Standard_Protocol_26
        </span>
        <div className="w-[1px] h-32 bg-gradient-to-b from-[#003366] to-transparent" />
      </aside>

    </main>
  );
}