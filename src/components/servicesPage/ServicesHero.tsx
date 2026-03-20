import { Sparkles } from "lucide-react";

export default function ServicesHero() {
  return (
    <section className="relative h-[50vh] md:h-[65vh] flex items-center justify-center bg-[#003366] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#E63946] rounded-full blur-[150px] opacity-20" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
      </div>

      <div className="relative z-10 text-center px-6">
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white/60 text-[10px] font-bold uppercase tracking-[0.5em] mb-10">
          <Sparkles size={14} className="text-[#E63946]" /> 
          Architectural Excellence
        </div>

        <h1 className="text-white text-6xl md:text-[11rem] font-black tracking-[-0.05em] uppercase leading-[0.85]">
          SER<span className="text-[#E63946]">V</span>ICES
        </h1>
        
        <p className="text-white mt-8 text-[10px] md:text-xs font-bold tracking-[0.8em] uppercase opacity-40">
          Strategic Solutions for Global Leaders
        </p>
      </div>
    </section>
  );
}