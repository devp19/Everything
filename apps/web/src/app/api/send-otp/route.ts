import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { email } = await req.json();
    console.log(email);
  // Generate a 6-digit code
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  // Save to database
  await supabase
    .from("otps")
    .insert([{ email, code, expires_at: expiresAt.toISOString() }]);

  // Send email with Resend
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "[Action Required] - Confirm Your Email Address",
    html:`<div style="font-family: Inter, Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; border-radius: 12px; background-color: #1c1f20; color: #f9fafb;">
    <!-- Header -->
    <h2 style="text-align: center; font-size: 24px; font-weight: 200; color: #ffffff; margin-bottom: 8px;">
      Everything Dashboard
    </h2>
    <p style="text-align: center; font-size: 14px; color: #9ca3af; margin-bottom: 24px;">
      The AI powered productivity suite for individuals and enterprises.
    </p>

    <!-- Divider -->
    <div style="height: 1px; background-color: #1f2937; margin: 24px 0;"></div>

    <!-- Message -->
    <p style="font-size: 16px; color: #d1d5db; margin-bottom: 16px;">
      Hi there,
    </p>
    <p style="font-size: 16px; color: #d1d5db; margin-bottom: 24px;">
      Use the code below to confirm your account:
    </p>

    <!-- OTP Code -->
    <div style="text-align: center; margin-bottom: 24px;">
      <span style="display: inline-block; font-size: 28px; font-weight: bold; letter-spacing: 8px; color: #ffffff; background-color: #1f2937; padding: 12px 20px; border-radius: 8px;">
        ${code}
      </span>
    </div>

    <!-- Expiry -->
    <p style="font-size: 12px; color: #6b7280; text-align: center; margin-top: 16px;">
      This code will expire in 10 minutes.
    </p>

    <!-- Footer -->
    <div style="margin-top: 32px; text-align: center; font-size: 12px; color: #4b5563;">
      © ${new Date().getFullYear()} Everything App
    </div>
  </div>`,
  });

  return NextResponse.json({ success: true });
}
