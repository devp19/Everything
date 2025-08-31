"use client";
import { useState, useEffect } from "react";
import { LoginForm } from "@/components/login-form";
import { Button } from "@/components/ui/button";
import { LiaLongArrowAltLeftSolid } from "react-icons/lia";
import { HyperText } from "@/components/magicui/hyper-text";

import {
  Announcement,
  AnnouncementTag,
  AnnouncementTitle,
} from "@/components/ui/kibo-ui/announcement";
import { ArrowUpRightIcon } from "lucide-react";

import { TextAnimate } from "@/components/magicui/text-animate";

export default function Home() {
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [showAnnouncement2, setShowAnnouncement2] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnnouncement(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnnouncement2(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="frosty flex flex-col min-h-screen items-center justify-center relative overflow-hidden">
      <main className="flex flex-col items-center justify-center w-full text-white text-center text-3xl mb-9">
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
        <div className="mt-6 text-sm text-muted-foreground">
          <div
          className={`transition-opacity duration-700 ${
            showAnnouncement2 ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >

            The AI powered productivity suite for individuals and enterprises.

        </div>
        </div>
      </main>
    </div>
  );
}
