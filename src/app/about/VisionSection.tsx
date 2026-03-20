"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, Cpu, Zap, Activity } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function VisionSection() {
    // مصفوفة بسيطة للقيم المضافة لتعزيز المحتوى بصرياً
    const features = [
        { icon: <Cpu size={20} />, text: "Advanced Logic" },
        { icon: <Zap size={20} />, text: "Fast Execution" },
        { icon: <Activity size={20} />, text: "Real-time Monitoring" }
    ];

    return (
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center py-20">
            {/* الجزء النصي - Content Side */}
            <div className="space-y-10">
                <div className="space-y-6">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="w-12 h-1 bg-[#E63946]" 
                    />
                    
                    <h2 className="text-5xl md:text-7xl font-black text-[#003366] leading-[0.9] uppercase italic tracking-tighter">
                        We help to implement <br /> 
                        <span className="text-[#E63946]">your ideas into</span> <br />
                        automation
                    </h2>
                </div>

                <div className="space-y-6">
                    <p className="text-zinc-500 text-lg leading-relaxed font-medium">
                        We donec pulvinar magna id leoersi pellentesque impered dignissim rhoncus euismod euismod eros vitae best consulting & financial services theme.
                    </p>
                    
                    <p className="text-zinc-400 text-sm leading-relaxed">
                        Business ipsum dolor sit amet nsectetur cing elit. Suspe ndisse suscipit sagittis leo sit met entum is not estibulum dignity sim posuere cubilia durae. At vero eos accusamus et iusto odio dignissimos provident.
                    </p>
                </div>

                {/* ميزة إضافية: أيقونات سريعة لتعزيز الفكرة */}
                <div className="flex flex-wrap gap-6">
                    {features.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-[#003366] font-bold text-[10px] uppercase tracking-widest">
                            <span className="p-2 bg-zinc-100 rounded-lg text-[#E63946]">{item.icon}</span>
                            {item.text}
                        </div>
                    ))}
                </div>

                <Link href={"/contact"}>
                
                         <button className="group flex items-center gap-4 bg-[#003366] text-white px-10 py-6 rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-[#E63946] transition-all shadow-xl hover:shadow-[#E63946]/20">
                    Contact Us
                    <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
                </Link>
            </div>
            
            {/* الجزء البصري - Visual Side */}
            <div className="relative group">
                {/* الخلفية المزخرفة - Decorative Frame */}
                <motion.div 
                    initial={{ rotate: 3 }}
                    whileInView={{ rotate: 5 }}
                    className="absolute -inset-4 border-2 border-[#E63946]/20 rounded-[4rem] -z-10"
                />
                
                <div className="absolute inset-0 bg-[#E63946] rounded-[4rem] rotate-3 group-hover:rotate-0 transition-transform duration-700 shadow-2xl" />
                
                <div className="relative h-[600px] bg-zinc-900 rounded-[4rem] overflow-hidden border-4 border-white shadow-2xl">
                    {/* طبقة الجراديانت الزجاجية */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#003366] via-transparent to-transparent opacity-60 z-10" />
                    
                    {/* محاكاة الصورة (Placeholder للصورة التي في السكرين شوت) */}
                    <div className="absolute inset-0 flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100" />

                    {/* العناصر العائمة - Floating UI */}
                    <div className="absolute top-10 right-10 z-20">
                        <motion.div 
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/20"
                        >
                            <div className="flex gap-1">
                                {[1,2,3].map(i => <div key={i} className="w-2 h-2 rounded-full bg-[#E63946]" />)}
                            </div>
                        </motion.div>
                    </div>

                    <div className="absolute bottom-12 left-12 z-20 text-white">
                        <p className="font-black text-5xl italic uppercase leading-none tracking-tighter">
                            01 / <span className="text-[#E63946]">Logic</span>
                        </p>
                        <p className="text-white/60 text-[10px] font-bold uppercase tracking-[0.4em] mt-4 flex items-center gap-2">
                            <span className="w-8 h-[1px] bg-[#E63946]" />
                            The Code Laboratory
                        </p>
                    </div>
                </div>

                {/* هندسة إضافية خلفية (Triangles) كما في التصميم */}
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[linear-gradient(45deg,#E63946_25%,transparent_25%),linear-gradient(-45deg,#E63946_25%,transparent_25%)] bg-[length:20px_20px] opacity-20" />
            </div>
        </section>
    );
}