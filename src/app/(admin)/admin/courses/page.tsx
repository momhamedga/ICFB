import { supabase } from "@/lib/supabase";
import AdminCoursesDashboardClient from "./AdminCoursesDashboardClient";
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export default async function Page() {
  // جلب البيانات من السيرفر مباشرة لضمان السرعة و SEO
  const { data: courses, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return <div>Data Retrieval Error.</div>;

  return <AdminCoursesDashboardClient initialData={courses || []} />;
}