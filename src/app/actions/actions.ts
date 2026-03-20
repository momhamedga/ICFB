"use server";

import { supabase } from "@/lib/supabase"; 
// ملاحظة: بما أن ملف الـ lib عندك يصدر supabase جاهز، سنستخدمه مباشرة 
// ولكن في المستقبل يفضل استخدام createServerClient داخل الـ Actions لأمان أعلى.

export async function getQualificationById(id: string) {
  try {
    const { data, error } = await supabase
      .from("qualifications")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Supabase Error:", error.message);
      return null;
    }
    
    return data;
  } catch (err) {
    console.error("Fetch Action Error:", err);
    return null;
  }
}

/**
 * دالة جلب رابط الصورة الكامل
 * تم إبقاء async هنا لتجنب خطأ Next.js في ملفات "use server"
 */
export async function getFullImageUrl(imagePath: string | null) {
  if (!imagePath) return "https://via.placeholder.com/1200x800?text=No+Image";
  
  // إذا كان الرابط خارجي بالفعل
  if (imagePath.startsWith('http')) return imagePath;
  
  const PROJECT_ID = "ildjspneaxcpasnnflcu"; 
  const cleanPath = imagePath.replace(/^\/+/, '');
  
  return `https://${PROJECT_ID}.supabase.co/storage/v1/object/public/qualifications/${cleanPath}`;
}