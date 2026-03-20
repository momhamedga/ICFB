// src/components/dashboard/SidebarInfo.tsx
import { User, ShieldCheck, Activity } from "lucide-react";

export const SidebarInfo = ({ certData }: { certData: any }) => (
  <aside className="space-y-6">
    {/* Profile Card */}
    <div className="bg-[#003366] p-8 rounded-[2.5rem] text-center shadow-xl relative overflow-hidden group">
      {/* لمسة فنية خلفية */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
      
      <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20">
        <User size={32} className="text-white" />
      </div>
      <h3 className="text-lg font-bold tracking-tight text-white">{certData?.student_name}</h3>
      <p className="text-white/40 text-[10px] mt-1 font-mono uppercase tracking-widest">
        Auth_ID: {certData?.cert_code}
      </p>
    </div>
    
    {/* System Logs Card */}
    <div className="bg-white border border-zinc-200/60 p-6 rounded-[2.5rem] shadow-sm">
      <div className="flex items-center gap-2 mb-6 ml-2">
        <Activity size={14} className="text-[#E63946]" />
        <p className="text-[10px] font-black uppercase tracking-widest text-[#003366]">System_Status</p>
      </div>
      <div className="space-y-3">
        <LogItem label="Identity" value="Verified" status="success" />
        <LogItem label="Network" value="Secure" status="success" />
        <LogItem label="Access" value="Student" />
      </div>
    </div>
  </aside>
);

const LogItem = ({ label, value, status }: { label: string, value: string, status?: string }) => (
  <div className="flex justify-between items-center px-5 py-4 bg-zinc-50 rounded-2xl border border-zinc-100 hover:border-[#003366]/20 transition-all">
    <span className="text-[10px] text-zinc-500 font-black uppercase">{label}</span>
    <span className={`text-[10px] font-bold ${status === 'success' ? 'text-emerald-600' : 'text-[#003366]'}`}>
      {value}
    </span>
  </div>
);