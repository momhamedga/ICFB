"use server";

import { supabase } from "@/lib/supabase";
import { Certificate } from "@/types/certificate";

export async function verifyCertificateAction(code: string) {
  if (!code.trim()) return { error: "Please enter a valid code." };

  try {
    const { data, error } = await supabase
      .from("certificates")
      .select("*")
      .eq("cert_code", code.trim())
      .returns<Certificate>()
      .single();

    if (error || !data) return { error: "Invalid credential. Not found in records." };
    return { data };
  } catch {
    return { error: "Network error. Connection failed." };
  }
}