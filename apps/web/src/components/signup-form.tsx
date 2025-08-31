"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GalleryVerticalEnd } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showPasswordFields) {
      setShowPasswordFields(true);
    } else {
      // submit signup logic here when all fields are filled
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
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
              <span className="sr-only">Acme Inc.</span>
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
                      required
                    />
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            <Button type="submit" className="w-full group transition-all">
              {showPasswordFields ? "Sign Up" : "Continue"}
              <span className="transition-all group-hover:ml-2">
                <LiaLongArrowAltRightSolid />
              </span>
            </Button>
          </div>
        </div>
      </form>

      {/* Footer */}
      <div className="text-muted-foreground text-center text-sm *:[a]:hover:text-primary">
        Already have an account?{" "}
        <a href="#" className="underline underline-offset-4">
          Log in
        </a>
      </div>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our{" "}
        <a href="#">Terms of Service</a> and{" "}
        <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
