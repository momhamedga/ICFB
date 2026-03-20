import { createBrowserClient } from '@supabase/ssr'

// نستخدم نفس المسمى الموجود في ملف الـ .env الخاص بك
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;

// استخدام createBrowserClient بدلاً من createClient العادي لضمان توافق الكوكيز
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);