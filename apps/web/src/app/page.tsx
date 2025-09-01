"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LiaLongArrowAltRightSolid } from "react-icons/lia";
import { createClient } from "@supabase/supabase-js";
import {
  Announcement,
  AnnouncementTag,
  AnnouncementTitle,
} from "@/components/ui/kibo-ui/announcement";
import { ArrowUpRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { TextAnimate } from "@/components/magicui/text-animate";
import { motion } from "framer-motion"; // ✅ import motion

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [showAnnouncement2, setShowAnnouncement2] = useState(false);
  const [session, setSession] = useState<any>(null);

  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setShowAnnouncement(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowAnnouncement2(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // check session on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="frosty flex flex-col min-h-screen items-center justify-center relative overflow-hidden">
      <motion.main
        className="flex flex-col items-center justify-center w-full text-white text-center text-3xl mb-9"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        {/* Announcement */}
        <div
          className={`transition-opacity duration-700 ${
            showAnnouncement ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <Announcement>
            <AnnouncementTag>Latest update</AnnouncementTag>
            <AnnouncementTitle>
              v1.0.0 is live!{" "}
              <ArrowUpRightIcon
                className="shrink-0 text-muted-foreground"
                size={16}
              />
            </AnnouncementTitle>
          </Announcement>
        </div>

        {/* Hero */}
        <div className="text-4xl">
          <div className="mt-6 text-4xl flex flex-row flex-wrap items-center gap-2 justify-center">
            <TextAnimate animation="blurInUp" by="word" delay={0.2}>
              Stop
            </TextAnimate>
            <TextAnimate animation="slideUp" by="character" delay={0.4}>
              flipping
            </TextAnimate>
            <TextAnimate animation="blurInUp" by="word" delay={0.8}>
              through apps.
            </TextAnimate>
          </div>
          <TextAnimate animation="blurInUp" delay={1.5}>
            Everything you need, all in one place.
          </TextAnimate>
        </div>

        {/* Subtext */}
        <div
          className={`mt-6 text-sm text-muted-foreground transition-opacity duration-700 ${
            showAnnouncement2 ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          The AI powered productivity suite for individuals and enterprises.
        </div>

        {/* Continue button */}
        <div className="gap-2 flex flex-row flex-wrap items-center justify-center mt-9">
          <Button
            onClick={() => router.push("/login")}
            variant={"ghost"}
            className="group inline-flex text-sm transition-all cursor-pointer text-muted-foreground hover:text-primary"
          >
            <span className="inline-flex items-center justify-center transition-all group-hover:pr-2 gap-2">
              Continue <LiaLongArrowAltRightSolid />
            </span>
          </Button>
        </div>

        {/* Session info under button */}
<div className="mt-4 text-sm text-muted-foreground text-center">
  {session ? (
    <div className="flex flex-col gap-2 items-center">
      <p>Logged in as {session.user.email}</p>
      {/* temp log out button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={async () => {
          await supabase.auth.signOut();
          setSession(null);
        }}
      >
        Log out
      </Button>
    </div>
  ) : (
    <p>Not logged in</p>
  )}
</div>


        
      </motion.main>
    </div>
  );
}
