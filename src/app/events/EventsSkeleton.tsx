export default function EventsSkeleton() {
  return (
    <div className="min-h-screen bg-[#fafafa] animate-pulse">
      {/* Hero Skeleton */}
      <div className="h-[40vh] md:h-[55vh] bg-zinc-200" />
      
      <div className="max-w-7xl mx-auto px-4 -mt-12 space-y-20">
        {/* Search Bar Skeleton */}
        <div className="h-24 bg-white rounded-[2.5rem] shadow-sm" />

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-96 bg-white rounded-[3.5rem] border border-black/[0.03]" />
          ))}
        </div>
      </div>
    </div>
  );
}