"use client";

import { motion } from "framer-motion";

const SkeletonCard = () => (
  <div className="bg-white rounded-[2.5rem] overflow-hidden border border-zinc-100 shadow-sm p-0 flex flex-col h-full min-h-[440px]">
    {/* Image Area Skeleton */}
    <div className="relative h-[300px] md:h-[320px] w-full bg-zinc-100 overflow-hidden">
      {/* Shimmer Effect */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent z-10"
      />
      
      {/* Badge Placeholder */}
      <div className="absolute top-6 left-6 w-24 h-6 bg-zinc-200 rounded-full animate-pulse" />
      
      {/* Bottom Info Placeholder */}
      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
        <div className="flex gap-2">
          <div className="w-16 h-6 bg-zinc-200 rounded-xl animate-pulse" />
          <div className="w-16 h-6 bg-zinc-200 rounded-xl animate-pulse" />
        </div>
        <div className="w-12 h-12 bg-zinc-200 rounded-2xl animate-pulse" />
      </div>
    </div>

    {/* Content Area Skeleton */}
    <div className="p-8 md:p-10 space-y-4">
      <div className="flex items-center gap-2">
        <div className="w-6 h-[1px] bg-zinc-200" />
        <div className="w-20 h-3 bg-zinc-100 rounded-full animate-pulse" />
      </div>
      <div className="space-y-2">
        <div className="w-full h-8 bg-zinc-100 rounded-xl animate-pulse" />
        <div className="w-2/3 h-8 bg-zinc-100 rounded-xl animate-pulse" />
      </div>
    </div>
  </div>
);

export default function QualificationSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 w-full">
      {[1, 2, 3].map((i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}