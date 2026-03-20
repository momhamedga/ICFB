// src/lib/supabase.ts
import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// بننشئ العميل حتى لو القيم فاضية، الـ Build هيعدي والـ Error هيظهر فقط وقت التنفيذ الفعلي
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("⚠️ Supabase: Missing environment variables.");
}