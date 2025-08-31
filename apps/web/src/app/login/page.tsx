"use client";
import { LoginForm } from "@/components/login-form"
import { Button } from "@/components/ui/button"
import { LiaLongArrowAltLeftSolid } from "react-icons/lia";

export default function Login() {
  return (
    <div className="frosty flex flex-col min-h-screen relative overflow-hidden">
      {/* Top Right Gradient Glow */}
  {/* <div
    className="pointer-events-none absolute top-[-10%] right-[-15%] w-[50vw] h-[30vw]"
    style={{
      background: 'radial-gradient(ellipse at top right, rgba(255, 255, 255, 0.25) 0%, transparent 80%)',
      filter: 'blur(64px)',
    }}
  /> */}

  {/* Bottom Left Gradient Glow */}
  {/* <div
    className="pointer-events-none absolute bottom-[-15%] left-[-20%] w-[45vw] h-[30vw]"
    style={{
      background: 'radial-gradient(ellipse at bottom left, rgba(255, 255, 255, 0.29) 0%, transparent 80%)',
      filter: 'blur(64px)',
    }}
  /> */}

      {/* Content */}
      <main className="flex-1 flex items-center justify-center text-white">
        <button
        className="w-full group text-sm transition-all absolute top-4 left-4 cursor-pointer text-muted-foreground hover:text-primary flex items-center gap-1"
      >
        <span className="transition-all group-hover:ml-2">
            <LiaLongArrowAltLeftSolid />
          </span>Back
      </button>
        <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
        {/* <div className="inline-flex text-center items-center gap-4">
          <h1 className="font-regular text-2xl">Everything Dashboard</h1>
        </div> */}
      </main>
    </div>
  );
}
