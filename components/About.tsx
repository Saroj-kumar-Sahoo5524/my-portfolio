"use client";

import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import {
  Code,
  Coffee,
  Sparkles,
  MapPin,
  Clock,
  Terminal,
  Cpu,
  Layers,
  CheckCircle2,
  FileDown,
} from "lucide-react";
import { PERSONAL_CONFIG } from "@/lib/data";
import SectionHeading from "./SectionHeading";

export default function About() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    const centerX = width / 2;
    const centerY = height / 2;

    const rX = ((y - centerY) / centerY) * -10; // max 10 deg tilt
    const rY = ((x - centerX) / centerX) * 10;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <section id="about" className="py-24 sm:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="About Me"
          title="Turning Ideas Into Digital Products."
          subtitle="I'm a passionate full-stack web developer who enjoys transforming complex ideas into fast, scalable and visually engaging digital experiences."
          align="left"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Story & Philosophy */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="prose prose-invert max-w-none text-zinc-300 dark:text-zinc-300 light:text-slate-700 text-base sm:text-lg leading-relaxed space-y-4">
              <p>
                {PERSONAL_CONFIG.bioLong}
              </p>
              <p>
                My focus spans across the entire digital product cycle: from designing high-conversion,
                accessible interfaces with <span className="text-sky-400 font-medium">React 19 & Next.js 15</span>,
                to writing mission-critical backend microservices in <span className="text-sky-400 font-medium">Node.js, TypeScript & PostgreSQL</span>.
              </p>
            </div>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              <div className="p-4 rounded-xl bg-zinc-950/40 dark:bg-zinc-950/40 light:bg-white/80 border border-white/5 dark:border-white/5 light:border-slate-200">
                <Layers className="w-5 h-5 text-sky-400 mb-2" />
                <h4 className="text-sm font-semibold text-white dark:text-white light:text-slate-900">
                  Clean Architecture
                </h4>
                <p className="text-xs text-zinc-400 dark:text-zinc-400 light:text-slate-500 mt-1">
                  Modular, type-safe, maintainable patterns built to scale effortlessly.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/40 dark:bg-zinc-950/40 light:bg-white/80 border border-white/5 dark:border-white/5 light:border-slate-200">
                <Cpu className="w-5 h-5 text-indigo-400 mb-2" />
                <h4 className="text-sm font-semibold text-white dark:text-white light:text-slate-900">
                  Sub-100ms Speed
                </h4>
                <p className="text-xs text-zinc-400 dark:text-zinc-400 light:text-slate-500 mt-1">
                  Obsessed with zero-CLS, instant TTFB, and minimal bundle sizes.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-zinc-950/40 dark:bg-zinc-950/40 light:bg-white/80 border border-white/5 dark:border-white/5 light:border-slate-200">
                <Sparkles className="w-5 h-5 text-cyan-400 mb-2" />
                <h4 className="text-sm font-semibold text-white dark:text-white light:text-slate-900">
                  Tactile Aesthetics
                </h4>
                <p className="text-xs text-zinc-400 dark:text-zinc-400 light:text-slate-500 mt-1">
                  3D WebGL depth, fluid micro-interactions, and visual harmony.
                </p>
              </div>
            </div>

            {/* Quick action button */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href={PERSONAL_CONFIG.resumeUrl}
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-white/20 transition-all shadow-sm"
              >
                <FileDown className="w-4 h-4 text-sky-400" />
                <span>Download Full CV / Resume</span>
              </a>

              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Verified Clean Code & Production Ready</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Tilt Developer Profile Card */}
          <div className="lg:col-span-5 flex justify-center [perspective:1000px]">
            <motion.div
              ref={cardRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              animate={{
                rotateX,
                rotateY,
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="w-full max-w-md p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-zinc-900/90 to-zinc-950/90 dark:from-zinc-900/90 dark:to-zinc-950/90 light:from-white light:to-slate-100 backdrop-blur-2xl border border-white/10 dark:border-white/10 light:border-slate-300 shadow-2xl relative overflow-hidden transition-shadow group hover:shadow-sky-500/10"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Glass glare effect */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-sky-500/20 transition-colors" />

              {/* Header: Developer badge & Terminal dots */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 dark:border-white/10 light:border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-sky-400">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>developer.config.ts</span>
                </div>
              </div>

              {/* Profile Card Body */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-white dark:text-white light:text-slate-900 tracking-tight">
                    {PERSONAL_CONFIG.name}
                  </h3>
                  <p className="text-xs font-mono text-sky-400 uppercase tracking-wider mt-0.5">
                    {PERSONAL_CONFIG.displayRole}
                  </p>
                </div>

                {/* Identity tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {["Full Stack", "Problem Solver", "UI Enthusiast", "Coffee + Code"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full text-xs font-medium bg-sky-500/10 text-sky-300 dark:text-sky-300 light:text-sky-800 border border-sky-500/20"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>

                {/* Simulated Code snippet */}
                <div className="p-3.5 rounded-xl bg-black/60 dark:bg-black/60 light:bg-slate-900 text-zinc-300 font-mono text-xs leading-relaxed border border-white/5 overflow-x-auto">
                  <div className="text-zinc-500">{"// Developer telemetry"}</div>
                  <div>
                    <span className="text-purple-400">const</span> developer = {"{"}
                  </div>
                  <div className="pl-4">
                    name: <span className="text-emerald-300">&quot;{PERSONAL_CONFIG.name}&quot;</span>,
                  </div>
                  <div className="pl-4">
                    stack: [<span className="text-sky-300">&quot;TypeScript&quot;</span>, <span className="text-sky-300">&quot;Next.js&quot;</span>, <span className="text-sky-300">&quot;Node&quot;</span>],
                  </div>
                  <div className="pl-4">
                    status: <span className="text-amber-300">&quot;Shipping Great Software&quot;</span>,
                  </div>
                  <div className="pl-4">
                    caffeine: <span className="text-rose-400">Infinity</span>,
                  </div>
                  <div>{"}"};</div>
                </div>

                {/* Location & Time info */}
                <div className="pt-2 border-t border-white/10 dark:border-white/10 light:border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-sky-400" />
                    <span>{PERSONAL_CONFIG.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Coffee className="w-3.5 h-3.5 text-amber-400" />
                    <span>Fueled by Specialty Espresso</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
