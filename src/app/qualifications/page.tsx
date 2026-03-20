
import HeroQualifications from "@/components/Courses/HeroQualifications";
import QualificationsClientContent from "@/components/Courses/QualificationsClientContent";
import { supabase } from "@/lib/supabase";

// تأكد من أن هذا المسار صحيح في مشروعك
export const revalidate = 3600;

export default async function QualificationsPage() {
  // جلب البيانات من السيرفر
  const { data: courses } = await supabase
    .from("qualifications")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen  pb-32 overflow-hidden selection:bg-[#ef4444] selection:text-white">
      
      {/* مكون الهيرو المنفصل - تأكد أنه يحتوي على "use client" بالداخل */}
      <HeroQualifications />

      {/* قسم محتوى الشبكة */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 -mt-10">
        <QualificationsClientContent initialData={courses || []} />
      </section>

    </main>
  );
}