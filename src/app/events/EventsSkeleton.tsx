export default function EventsSkeleton() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] animate-pulse">
      <div className="h-[45vh] md:h-[55vh] bg-[#001429]" />
      <div className="max-w-7xl mx-auto px-6 -mt-16 space-y-24">
        {/* Search Bar Skeleton */}
        <div className="h-24 bg-white/50 backdrop-blur-xl rounded-[2.5rem] border border-zinc-100" />
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-20">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-[450px] bg-white rounded-[3.5rem] border border-zinc-100 shadow-sm" />
          ))}
        </div>
      </div>
    </div>
  );
}