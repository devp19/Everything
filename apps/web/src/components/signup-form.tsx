"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GalleryVerticalEnd } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import { supabase } from "@/lib/supabaseClient";

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [step, setStep] = useState<"form" | "otp">("form");
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  // form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // otp fields
  const [otp, setOtp] = useState(Array(6).fill(""));
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // handle signup
  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!showPasswordFields) {
      setShowPasswordFields(true);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    // call our API to send OTP
    await fetch("/api/send-otp", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });

    setStep("otp");
    setError("");
  };

  // handle OTP input with auto-focus
  const handleOtpChange = (index: number, value: string) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        otpRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  // verify OTP
// verify OTP
const handleVerifyOtp = async (e: React.FormEvent) => {
  e.preventDefault();
  const code = otp.join("");

  const res = await fetch("/api/verify-otp", {
    method: "POST",
    body: JSON.stringify({ email, code }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();
  if (data.success) {

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError("Account verified but login failed.");
      return;
    }

    setSuccess("You are now verified! Let's start personalizing your dashboard!");
    setError("");
  } else {
    setError(data.error || "Invalid OTP");
  }
};

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      {step === "form" && (
        <form onSubmit={handleContinue}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <a
                href="#"
                className="flex flex-col items-center gap-2 font-medium"
              >
                <div className="flex size-8 items-center justify-center rounded-md">
                  <GalleryVerticalEnd className="size-6" />
                </div>
                <span className="sr-only">Everything App</span>
              </a>
              <h1 className="text-xl font-regular">Create your account</h1>
            </div>

            <div className="flex flex-col gap-6 max-w-md mx-auto w-full">
              {/* Full Name */}
              <div className="grid gap-3">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              {/* Email */}
              <div className="grid gap-3">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Animate password fields */}
              <AnimatePresence>
                {showPasswordFields && (
                  <>
                    <motion.div
                      className="grid gap-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </motion.div>
                    <motion.div
                      className="grid gap-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    >
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Re-enter your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </motion.div>
                  </>
                )}
              </AnimatePresence>

              {error && <p className="text-white text-sm">{error}</p>}

              <Button type="submit" className="w-full group transition-all">
                {showPasswordFields ? "Sign Up" : "Continue"}
                <span className="transition-all group-hover:ml-2">
                  <LiaLongArrowAltRightSolid />
                </span>
              </Button>
            </div>
          </div>
        </form>
      )}

      {step === "otp" && (
        <form
          onSubmit={handleVerifyOtp}
          className="flex flex-col gap-6 max-w-md mx-auto w-full"
        >
          <h2 className="text-lg font-medium text-center">Verify your email</h2>
          <p className="text-sm text-muted-foreground text-center">
            We've sent an email to <strong>{email}</strong> with a 6-digit code.
            Please enter it below to verify your account.
          </p>

          <div className="flex justify-center gap-2">
            {otp.map((digit, idx) => (
              <Input
                key={idx}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(idx, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                ref={(el) => {
                  otpRefs.current[idx] = el;
                }}
                className="w-12 h-12 text-center text-lg"
              />
            ))}
          </div>

          {error && <p className="text-white text-sm text-center">{error}</p>}
          {success && (
            <p className="text-white text-sm text-center">{success}</p>
          )}

          <Button type="submit" className="w-full group transition-all">
            Verify
            <span className="transition-all group-hover:ml-2">
              <LiaLongArrowAltRightSolid />
            </span>
          </Button>
        </form>
      )}

      {/* Footer */}
      {step === "form" && (
        <div className="text-muted-foreground text-center text-sm *:[a]:hover:text-primary">
          Already have an account?{" "}
          <a href="/login" className="underline underline-offset-4">
            Log in
          </a>
        </div>
      )}
    </div>
  );
}
