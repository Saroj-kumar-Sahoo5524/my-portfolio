"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowRight, Sparkles, Terminal, ChevronDown, Code2, Layers, Zap } from "lucide-react";
import { PERSONAL_CONFIG } from "@/lib/data";
import MagneticButton from "./MagneticButton";

const CYCLING_WORDS = ["Alive", "Real", "Bold", "Fluid", "Vivid", "Human"];

const FLOAT_BADGES = [
  { icon: Code2, label: "Full-Stack", top: "8%", left: "-18%", delay: 0 },
  { icon: Layers, label: "UI/UX", top: "42%", left: "-22%", delay: 0.4 },
  { icon: Zap, label: "Node.js", top: "75%", left: "-14%", delay: 0.8 },
];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse tilt values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % CYCLING_WORDS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden"
    >
      {/* Subtle radial background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-7 flex flex-col items-start z-10">
            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium text-sky-400 bg-sky-500/10 border border-sky-500/25 mb-6 shadow-sm backdrop-blur-md"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-semibold uppercase tracking-wider text-[11px]">
                {PERSONAL_CONFIG.displayRole}
              </span>
              <span className="text-zinc-500">|</span>
              <span className="text-zinc-300 dark:text-zinc-300 light:text-slate-700 hidden sm:inline">
                {PERSONAL_CONFIG.status}
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white dark:text-white light:text-slate-900 leading-[1.1]"
            >
              Building Digital Experiences That{" "}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400">
                  Feel{" "}
                </span>
                {/* Animated cycling word */}
                <span
                  className="relative inline-block overflow-hidden"
                  style={{ minWidth: "4ch", verticalAlign: "bottom" }}
                >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={CYCLING_WORDS[wordIndex]}
                      initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -30, filter: "blur(6px)" }}
                      transition={{ duration: 0.45, ease: "easeInOut" }}
                      className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400"
                    >
                      {CYCLING_WORDS[wordIndex]}.
                    </motion.span>
                  </AnimatePresence>
                </span>
                <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-sky-400 to-indigo-500 opacity-60 rounded-full" />
              </span>
            </motion.h1>

            {/* Subtitle / Bio */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg sm:text-xl text-zinc-400 dark:text-zinc-400 light:text-slate-600 max-w-2xl leading-relaxed"
            >
              {PERSONAL_CONFIG.bioShort}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <MagneticButton strength={20}>
                <button
                  id="hero-view-work-btn"
                  onClick={() => scrollTo("projects")}
                  className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-semibold text-black bg-sky-400 hover:bg-sky-300 shadow-[0_0_30px_rgba(56,189,248,0.35)] hover:shadow-[0_0_40px_rgba(56,189,248,0.55)] transition-all"
                >
                  <span>View Selected Work</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </MagneticButton>

              <MagneticButton strength={15}>
                <button
                  id="hero-let-talk-btn"
                  onClick={() => scrollTo("contact")}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-medium text-white dark:text-white light:text-slate-900 bg-zinc-900/80 dark:bg-zinc-900/80 light:bg-slate-100 hover:bg-zinc-800 border border-white/10 dark:border-white/10 light:border-slate-200 backdrop-blur-md transition-all hover:border-white/25"
                >
                  <Sparkles className="w-4 h-4 text-sky-400" />
                  <span>Let&apos;s Talk</span>
                </button>
              </MagneticButton>
            </motion.div>

            {/* Tech Stack Pills / Ticker */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-12 pt-6 border-t border-white/10 dark:border-white/10 light:border-slate-200/80 w-full"
            >
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-zinc-500 mb-3 font-mono">
                <Terminal className="w-3.5 h-3.5 text-sky-400" />
                <span>Engineered with precision:</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {[
                  "Html 5",
                  "Css 3",
                  "Tailwind CSS",
                  "Bootstrap",
                  "JavaScript",
                  "Wordpress",
                  "Digital Marketing",
                  "SEO",
                  "Python",
                  "Next.js 15",
                  "TypeScript",
                  "React 19",
                  "Node.js",
                  "MySQL",
                  "Git",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md text-xs font-mono text-zinc-300 dark:text-zinc-300 light:text-slate-700 bg-zinc-900/60 dark:bg-zinc-900/60 light:bg-slate-200/60 border border-white/5 dark:border-white/5 light:border-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Photo Display */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              initial={{ opacity: 0, scale: 0.88, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
              className="relative w-full max-w-sm mx-auto cursor-none select-none"
            >
              {/* Floating skill badges */}
              {FLOAT_BADGES.map(({ icon: Icon, label, top, left, delay }) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + delay }}
                  style={{ top, left }}
                  className="absolute z-20 hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-zinc-950/80 backdrop-blur-md border border-white/10 text-[11px] font-medium text-zinc-300 shadow-lg"
                >
                  <Icon className="w-3 h-3 text-sky-400" />
                  {label}
                </motion.div>
              ))}

              {/* Outer spinning gradient ring */}
              <div className="absolute inset-0 rounded-3xl" style={{ padding: 3 }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-3px] rounded-3xl"
                  style={{
                    background: "conic-gradient(from 0deg, #38bdf8, #818cf8, #6366f1, #0ea5e9, #38bdf8)",
                    filter: "blur(1px)",
                  }}
                />
              </div>

              {/* Card container */}
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-sky-500/20 bg-zinc-950">
                {/* Ambient top glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-sky-400/20 blur-2xl rounded-full -z-0" />

                {/* Photo */}
                <div className="relative w-full aspect-[3/4]">
                  <Image
                    src="/assets/saroj.png"
                    alt="Saroj — Full-Stack Developer"
                    fill
                    className="object-cover object-top"
                    priority
                    sizes="(max-width: 768px) 90vw, 400px"
                  />
                  {/* Bottom gradient fade */}
                  <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
                </div>

                {/* Name badge at bottom of card */}
                <div className="relative px-6 pb-6 -mt-12 z-10">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[11px] font-mono uppercase tracking-widest text-sky-400 mb-0.5">Available for work</p>
                      <h2 className="text-xl font-bold text-white tracking-tight">{PERSONAL_CONFIG.name}</h2>
                      <p className="text-xs text-zinc-400 mt-0.5">{PERSONAL_CONFIG.displayRole}</p>
                    </div>
                    {/* Live indicator */}
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400">OPEN</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom floating XP badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="absolute -bottom-5 right-4 z-20 flex items-center gap-2 px-3 py-2 rounded-xl bg-zinc-950/90 backdrop-blur-md border border-white/10 shadow-xl"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center">
                  <Zap className="w-3.5 h-3.5 text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-mono text-zinc-500">Experience</p>
                  <p className="text-xs font-bold text-white">3+ Years</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
