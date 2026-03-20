"use server";

import { supabase } from "@/lib/supabase";

/**
 * 1. التحقق من الكود (للدخول)
 */
export async function verifyCertificateAction(code: string) {
  const cleanCode = code.trim();
  if (!cleanCode) return { success: false, message: "Please enter a valid code." };

  try {
    const { data, error } = await supabase
      .from("certificates")
      .select("id, cert_code, student_name, course_name, pdf_url, created_at")
      .eq("cert_code", cleanCode)
      .single();

    if (error || !data) return { success: false, message: "Credential not found." };
    return { success: true, data };
  } catch (err) {
    return { success: false, message: "Connection error." };
  }
}

/**
 * 2. تحميل الملف مباشرة (لأن اللينك موجود فعلاً في الجدول)
 */
export async function generateCertificateAction(certCode: string) {
  try {
    const { data, error } = await supabase
      .from("certificates")
      .select("pdf_url") // سحبنا اللينك اللي شفناه في الصورة
      .eq("cert_code", certCode)
      .single();

    if (error || !data || !data.pdf_url) {
      throw new Error("PDF file not found in our storage.");
    }

    // نرجع اللينك المباشر اللي في الصورة
    return { success: true, url: data.pdf_url };

  } catch (error: any) {
    return { success: false, message: error.message };
  }
}