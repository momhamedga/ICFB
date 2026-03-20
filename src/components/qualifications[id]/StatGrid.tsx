import { Target, Globe2, Zap } from "lucide-react";

export default function StatGrid() {
  const stats = [
    {
      title: "Global Recognition",
      desc: "Accredited by world-class institutions in the UK and UAE.",
      icon: <Globe2 className="text-[#ef4444]" />,
      bg: "bg-[#003366]/5"
    },
    {
      title: "Impact Driven",
      desc: "Designed for immediate application in executive leadership.",
      icon: <Zap className="text-[#ef4444]" />,
      bg: "bg-[#ef4444]/5"
    },
    {
      title: "Target Focused",
      desc: "Specifically tailored for professional management levels.",
      icon: <Target className="text-[#ef4444]" />,
      bg: "bg-slate-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, i) => (
        <div 
          key={i} 
          className={`p-8 rounded-[2.5rem] border border-transparent hover:border-slate-100 hover:bg-white hover:shadow-2xl transition-all duration-700 group ${stat.bg}`}
        >
          <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:rotate-[10deg] transition-transform duration-500">
            {stat.icon}
          </div>
          <h4 className="text-[#003366] font-black text-sm uppercase tracking-tighter mb-3">
            {stat.title}
          </h4>
          <p className="text-slate-500 text-[11px] font-bold leading-relaxed">
            {stat.desc}
          </p>
        </div>
      ))}
    </div>
  );
}