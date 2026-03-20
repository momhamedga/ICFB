// src/lib/supabase.ts
import { createBrowserClient } from '@supabase/ssr';

// بنستخدم Fallback string فاضي عشان نمنع الـ Library إنها ترمي Error وقت الـ Build
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// صمام أمان: بننشئ الـ client بـ strings حتى لو فاضية
// الـ Error مش هيحصل غير لو الـ URL فعلاً مش موجود وقت التشغيل الحقيقي (Runtime)
export const supabase = createBrowserClient(
  supabaseUrl, 
  supabaseAnonKey
);

// تحذير للمطور فقط في الـ Console
if (!supabaseUrl || !supabaseAnonKey) {
  if (process.env.NODE_ENV === 'development') {
    console.warn("⚠️ Supabase: Environment variables are missing!");
  }
}