"use client";
import { motion } from "framer-motion";

const stats = [
    { label: "Engineering Protocols", value: "500+" },
    { label: "Active Nodes", value: "12k" },
    { label: "Uptime Reliability", value: "99.9%" }
];

export default function StatsGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, i) => (
                <motion.div
                    key={i}
                    whileHover={{ y: -10 }}
                    className="bg-white/80 backdrop-blur-3xl border border-black/5 p-10 rounded-[3rem] shadow-2xl flex flex-col items-center text-center group"
                >
                    <span className="text-5xl font-black text-[#003366] mb-2 group-hover:text-[#E63946] transition-colors">
                        {stat.value}
                    </span>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
                        {stat.label}
                    </span>
                </motion.div>
            ))}
        </div>
    );
}