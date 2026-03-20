// src/lib/supabase.ts
import { createBrowserClient } from '@supabase/ssr';

// 1. استخراج القيم مع Fallback لسلسلة فارغة عشان الـ Client م يضربش Error
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// 2. التحقق من صحة القيم (فقط للتنبيه في الـ Console)
const isConfigured = supabaseUrl.startsWith('https://') && supabaseAnonKey.length > 0;

if (!isConfigured && process.env.NODE_ENV !== 'production') {
  console.warn("⚠️ Supabase: Environment variables are missing or invalid.");
}

// 3. إنشاء الـ Client (دلوقتي الـ Build هيعدي بسلام لأن القيم بقت Strings حتى لو فاضية)
export const supabase = createBrowserClient(
  supabaseUrl,
  supabaseAnonKey
);