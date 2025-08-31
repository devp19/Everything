import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export async function POST(req: Request) {
  const { email, code } = await req.json();

  const { data, error } = await supabase
    .from("otps")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !data) {
    return Response.json({ success: false, error: "No OTP found" });
  }

  const expired = new Date(data.created_at).getTime() < Date.now() - 10 * 60 * 1000;
  if (expired) return Response.json({ success: false, error: "OTP expired" });

  if (data.code !== code) return Response.json({ success: false, error: "Invalid OTP" });

  // mark user verified (example: update profile)
  await supabase.from("profiles").update({ verified: true }).eq("email", email);

  return Response.json({ success: true });
}
