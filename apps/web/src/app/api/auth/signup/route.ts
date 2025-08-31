"use server";

import { createClient } from "@supabase/supabase-js";
import { randomInt } from "crypto";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // server-only!
);

export async function signUpWithOtp(fullName: string, email: string, password: string) {
  // 1. Create user in supabase.auth
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // skip default confirm email
  });

  if (error) throw error;
  const user = data.user;

  // 2. Generate 6-digit OTP
  const otp = randomInt(100000, 999999).toString();

  // 3. Save OTP in profiles
  await supabase.from("profiles").update({
    otp_code: otp,
    is_verified: false,
    full_name: fullName,
  }).eq("id", user.id);

  // 4. Send email (you’d plug in Resend, SendGrid, etc.)
  console.log("Send OTP to user:", otp);

  return { user };
}
