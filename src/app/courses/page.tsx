// app/courses/page.tsx
import { Suspense } from "react";
import { supabase } from "@/lib/supabase";
import CoursesPageClient from "./CoursesPageClient"; // ملفك الحالي بعد تغيير اسمه

// تحسين: جلب البيانات في السيرفر
async function getCourses() {
  const { data } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false });
  return data || [];
}

export default function Page() {
  // جلب الـ Promise
  const coursesPromise = getCourses();

  return (
    <div className="">
      {/* Suspense يضمن ظهور الهيكل الأساسي فوراً وحالة التحميل */}
      <Suspense fallback={<CoursesSkeleton />}>
        <CoursesPageClient coursesPromise={coursesPromise} />
      </Suspense>
    </div>
  );
}

// هيكل تحميل بسيط واحترافي بنفس استايلك
function CoursesSkeleton() {
  return (
    <div className="min-h-screen bg-[#0b1623] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#d32f2f] border-t-transparent rounded-full animate-spin" />
        <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em]">Syncing Repository...</p>
      </div>
    </div>
  );
}