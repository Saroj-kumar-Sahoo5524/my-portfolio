"use client";

import React from "react";
import { motion } from "motion/react";
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { EXPERIENCE_DATA } from "@/lib/data";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  return (
    <section id="experience" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Career Journey"
          title="Experience & Milestones"
          subtitle="A track record of engineering scalable applications, building high-performing design systems, and driving product outcomes."
          align="center"
        />

        <div className="relative max-w-4xl mx-auto mt-16">
          {/* Vertical Glowing Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-sky-500 via-indigo-500 to-transparent opacity-30 dark:opacity-30 light:opacity-40" />

          {/* Timeline Nodes */}
          <div className="space-y-12 sm:space-y-16">
            {EXPERIENCE_DATA.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Center Pulse Node */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-zinc-950 dark:bg-zinc-950 light:bg-white border-2 border-sky-400 flex items-center justify-center z-10 shadow-[0_0_15px_rgba(56,189,248,0.5)]">
                    <div className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping opacity-75" />
                  </div>

                  {/* Spacer for Alternate Desktop Layout */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Card Content */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 40 : -40, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                      isEven ? "md:pr-12" : "md:pl-12"
                    }`}
                  >
                    <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950/40 dark:bg-zinc-950/40 light:bg-white/85 backdrop-blur-xl border border-white/5 dark:border-white/5 light:border-slate-200 hover:border-sky-500/40 transition-all duration-300 shadow-xl group hover:-translate-y-1">
                      {/* Role & Period Header */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-medium text-sky-400 bg-sky-500/10 border border-sky-500/20">
                          <Calendar className="w-3 h-3" />
                          <span>{item.period}</span>
                        </span>

                        <span className="flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-400 light:text-slate-500">
                          <MapPin className="w-3 h-3 text-zinc-500" />
                          <span>{item.location}</span>
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white dark:text-white light:text-slate-900 group-hover:text-sky-400 transition-colors">
                        {item.role}
                      </h3>

                      <div className="flex items-center gap-2 text-sm font-semibold text-zinc-300 dark:text-zinc-300 light:text-slate-700 mt-1">
                        <Briefcase className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{item.company}</span>
                      </div>

                      <p className="mt-3 text-xs sm:text-sm text-zinc-400 dark:text-zinc-400 light:text-slate-600 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Key Achievements */}
                      <div className="mt-4 space-y-2">
                        {item.achievements.map((ach, aIdx) => (
                          <div
                            key={aIdx}
                            className="flex items-start gap-2 text-xs text-zinc-300 dark:text-zinc-300 light:text-slate-700"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{ach}</span>
                          </div>
                        ))}
                      </div>

                      {/* Tech stack pills */}
                      <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-white/5 dark:border-white/5 light:border-slate-100">
                        {item.technologies.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded text-[10px] font-mono text-zinc-400 dark:text-zinc-400 light:text-slate-600 bg-white/5 dark:bg-white/5 light:bg-slate-100"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
