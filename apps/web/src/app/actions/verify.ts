"use server";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function verifyOtp(userId: string, code: string) {
  const { data, error } = await supabase
    .from("profiles")
    .select("otp_code")
    .eq("id", userId)
    .single();

  if (error) throw error;

  if (data.otp_code === code) {
    await supabase
      .from("profiles")
      .update({ is_verified: true, otp_code: null })
      .eq("id", userId);

    return { success: true };
  }

  return { success: false, message: "Invalid OTP" };
}
