import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import ModifyCourseClient from "./ModifyCourseClient";

export async function generateStaticParams() {
  // صمام أمان لو الـ Env variables مش موجودة وقت الـ Build في الـ CI/CD
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return [];
  }

  try {
    const { data: courses } = await supabase
      .from("courses")
      .select("id") as { data: { id: string }[] | null };

    return courses?.map((course) => ({ 
      id: course.id.toString() 
    })) || [];
  } catch (error) {
    console.error("Build-time fetch error:", error);
    return []; // بنرجع فاضي عشان الـ Build يكمل والباقي يتولد Dynamic
  }
}
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  // 2. فك تشفير الـ ID باستخدام await (Standard 2026)
  const { id } = await params;

  // 3. التحقق من صحة الـ ID (لو كان UUID مثلاً) لمنع طلبات مالهاش لازمة
  if (!id) return notFound();

  // 4. جلب البيانات مع تحديد الأعمدة (أسرع وأخف على الـ Memory)
  const { data: course, error } = await supabase
    .from("courses")
    .select("id, title, price, available_seats, image_url, start_date")
    .eq("id", id)
    .single();

  // 5. الحماية القصوى
  if (error || !course) {
    console.error("Critical Database Error:", error?.message);
    return notFound();
  }

  // 6. تمرير البيانات للـ Client Component
  // ملاحظة: بعتنا البيانات كـ initialCourse عشان الـ Reducer جوا يعرف يستلمها صح
  return (
    <main className="min-h-screen bg-[#fafafa]">
       <ModifyCourseClient initialCourse={course} />
    </main>
  );
}