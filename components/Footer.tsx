"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUp, Github, Linkedin, Twitter, Heart, Instagram, Facebook } from "lucide-react";
import { PERSONAL_CONFIG } from "@/lib/data";

export default function Footer() {
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/10 dark:border-white/10 light:border-slate-200 bg-zinc-950/80 dark:bg-zinc-950/80 light:bg-white/90 backdrop-blur-xl pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/5 dark:border-white/5 light:border-slate-100 items-start">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center">
              <Image
                src="/assets/saroj-logo.png"
                alt="Saroj Logo"
                height={36}
                width={130}
                className="h-9 w-auto object-contain"
              />
            </div>

            <p className="text-xs sm:text-sm text-zinc-400 dark:text-zinc-400 light:text-slate-600 max-w-sm leading-relaxed">
              Full-Stack Web Developer & Creative Technologist crafting modern,
              high-performance web apps, scalable microservices, and immersive 3D digital experiences.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Bhubaneswar (IST): {timeString || "09:42:15 AM"}</span>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              {["Home", "About", "Skills", "Projects", "Experience", "Contact"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="text-zinc-400 hover:text-sky-400 dark:text-zinc-400 dark:hover:text-sky-400 light:text-slate-600 light:hover:text-sky-600 transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Connect Column */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
              Connect & Source
            </h4>
            <div className="flex items-center gap-3">
              <a
                href={PERSONAL_CONFIG.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="w-9 h-9 rounded-xl bg-zinc-900 dark:bg-zinc-900 light:bg-slate-100 flex items-center justify-center text-zinc-400 hover:text-white dark:hover:text-white light:hover:text-slate-900 border border-white/10 dark:border-white/10 light:border-slate-200 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={PERSONAL_CONFIG.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="w-9 h-9 rounded-xl bg-zinc-900 dark:bg-zinc-900 light:bg-slate-100 flex items-center justify-center text-zinc-400 hover:text-white dark:hover:text-white light:hover:text-slate-900 border border-white/10 dark:border-white/10 light:border-slate-200 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={PERSONAL_CONFIG.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter profile"
                className="w-9 h-9 rounded-xl bg-zinc-900 dark:bg-zinc-900 light:bg-slate-100 flex items-center justify-center text-zinc-400 hover:text-white dark:hover:text-white light:hover:text-slate-900 border border-white/10 dark:border-white/10 light:border-slate-200 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>

            <div className="pt-2 text-xs text-zinc-500">
              Open to contracts, technical leadership roles, and ambitious product collaborations.
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            &copy; {new Date().getFullYear()} SKS . All Rights Reserved. Designed & Crafted by Saroj Kumar Sahoo.
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Crafted with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> Code. Create. Innovate
            </span>

            <button
              onClick={scrollToTop}
              aria-label="Scroll back to top"
              className="w-8 h-8 rounded-full bg-zinc-900/80 dark:bg-zinc-900/80 light:bg-slate-100 flex items-center justify-center text-zinc-400 hover:text-sky-400 border border-white/10 dark:border-white/10 light:border-slate-200 transition-colors"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
