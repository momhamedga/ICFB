import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// صمام أمان احترافي
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("❌ Supabase Bridge Error: Missing Environment Variables");
}

export const supabase = createBrowserClient(
  supabaseUrl!,
  supabaseAnonKey!
);