import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import ModifyCourseClient from "./ModifyCourseClient";

export async function generateStaticParams() {
  // حددنا نوع البيانات اللي راجعة إنها مصفوفة فيها id من نوع string أو number
  const { data: courses } = await supabase
    .from("courses")
    .select("id") as { data: { id: string }[] | null };

  // دلوقتي TypeScript عارف إن course جواه id
  return courses?.map((course) => ({ 
    id: course.id.toString() 
  })) || [];
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