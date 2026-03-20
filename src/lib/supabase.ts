// src/lib/supabase.ts
import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// التحقق من وجود القيم قبل محاولة إنشاء الـ Client
// ده بيمنع الـ Build من الانهيار (Crash) لو القيم مش موجودة مؤقتاً
export const supabase = (typeof window !== 'undefined' || (supabaseUrl && supabaseAnonKey)) 
  ? createBrowserClient(
      supabaseUrl || '', 
      supabaseAnonKey || ''
    )
  : null as any;

if (!supabaseUrl || !supabaseAnonKey) {
  if (process.env.NODE_ENV === 'development') {
    console.warn("⚠️ Supabase: Missing environment variables. Check your .env.local file.");
  }
}