// src/components/dashboard/LoadingState.tsx
import { Loader2 } from "lucide-react";

export const LoadingState = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-[#000d1a] relative overflow-hidden">
    {/* تأثير ضوئي خلف الـ Loader */}
    <div className="absolute w-[300px] h-[300px] bg-red-600/10 blur-[100px] rounded-full animate-pulse" />
    
    <div className="relative z-10 flex flex-col items-center">
      <Loader2 className="animate-spin text-red-600 mb-6" size={50} strokeWidth={1.5} />
      <div className="space-y-2 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 animate-pulse">
          Synchronizing_Neural_Data
        </p>
        <div className="w-32 h-[1px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent mx-auto" />
      </div>
    </div>
  </div>
);