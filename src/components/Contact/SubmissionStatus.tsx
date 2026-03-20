"use client";

import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle } from "lucide-react";

type SubmissionStatusType = "idle" | "sending" | "success" | "error";

interface SubmissionStatusProps {
  status: SubmissionStatusType;
}

export default function SubmissionStatus({ status }: SubmissionStatusProps) {
  if (status === "idle" || status === "sending") return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
      // في الموبايل بيبقى في النص، في الديسكتوب يمين
      className="fixed bottom-6 md:bottom-10 left-6 right-6 md:left-auto md:right-10 z-[100] flex items-center gap-5 px-6 py-4 md:px-8 md:py-5 rounded-[24px] md:rounded-[30px] bg-[#001429]/90 backdrop-blur-3xl border border-white/10 shadow-2xl"
    >
      {status === "success" ? (
        <>
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-green-500/20 flex items-center justify-center text-green-500 shrink-0">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <h3 className="text-[#f0f4f8] font-black text-xs md:text-sm uppercase tracking-wider text-green-400">Mission Accomplished</h3>
            <p className="text-zinc-500 text-[10px] md:text-[11px] font-bold tracking-tight">Data uplinked to headquarters.</p>
          </div>
        </>
      ) : (
        <>
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-red-500/20 flex items-center justify-center text-red-500 shrink-0">
            <AlertCircle size={24} />
          </div>
          <div>
            <h3 className="text-[#f0f4f8] font-black text-xs md:text-sm uppercase tracking-wider text-red-500">System Failure</h3>
            <p className="text-zinc-500 text-[10px] md:text-[11px] font-bold tracking-tight">Uplink failed. Check connection.</p>
          </div>
        </>
      )}
    </motion.div>
  );
}