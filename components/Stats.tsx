"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "motion/react";
import { PERSONAL_CONFIG } from "@/lib/data";

function CounterItem({
  value,
  suffix,
  label,
  description,
  delay = 0,
}: {
  value: number;
  suffix: string;
  label: string;
  description: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1600; // ms
    const stepTime = 25;
    const steps = duration / stepTime;
    const increment = value / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay }}
      className="relative p-6 sm:p-8 rounded-2xl bg-zinc-950/40 dark:bg-zinc-950/40 light:bg-white/70 backdrop-blur-xl border border-white/5 dark:border-white/5 light:border-slate-200/80 hover:border-sky-500/40 transition-all duration-300 group hover:-translate-y-1"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 rounded-full blur-2xl group-hover:bg-sky-500/10 transition-colors pointer-events-none" />
      
      <div className="flex items-baseline gap-1">
        <span className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white dark:text-white light:text-slate-900">
          {displayValue}
        </span>
        <span className="text-2xl sm:text-3xl font-bold text-sky-400">
          {suffix}
        </span>
      </div>

      <h3 className="mt-3 text-base sm:text-lg font-semibold text-zinc-200 dark:text-zinc-200 light:text-slate-800">
        {label}
      </h3>

      <p className="mt-1 text-xs sm:text-sm text-zinc-400 dark:text-zinc-400 light:text-slate-500 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="py-12 sm:py-16 relative border-y border-white/5 dark:border-white/5 light:border-slate-200/60 bg-black/30 dark:bg-black/30 light:bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PERSONAL_CONFIG.stats.map((stat, idx) => (
            <CounterItem
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              description={stat.description}
              delay={idx * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
