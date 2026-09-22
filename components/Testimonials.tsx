"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { Star, BadgeCheck } from "lucide-react";
import { TESTIMONIALS_DATA } from "@/lib/data";
import SectionHeading from "./SectionHeading";

/* ─── Data ─────────────────────────────────────────────────────────────────── */
const ALL_REVIEWS = [
  ...TESTIMONIALS_DATA,
  {
    id: "test-4",
    name: "Rupesh Kumar Sahoo",
    role: "Founder",
    company: "Sai tech Academy",
    avatar: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect width='80' height='80' rx='40' fill='%230ea5e9'/%3E%3Ctext x='40' y='52' font-family='Arial' font-size='28' font-weight='bold' text-anchor='middle' fill='white'%3ERK%3C/text%3E%3C/svg%3E",
    quote:
      "Saroj is a dedicated developer who is always eager to learn and improve. He is a team player and always willing to go the extra mile to ensure that the project is completed on time and to the best of his ability.",
  },
  {
    id: "test-5",
    name: "Chiranjeeb Behera",
    role: "Founder & CEO",
    company: "Gargi Group",
    avatar: "/assets/final-logo-gargigroup.png",
    quote:
      "We hired Saroj to overhaul our investor portal and he completely transformed it. The new interface increased engagement by 60% within the first month.",
    relationship: "Built LaunchPad Investor Portal",
  },
];

/* Per-card colour themes — each card gets a completely different palette */
const THEMES = [
  {
    // Card 1 — Sky / Indigo
    cardBg: "linear-gradient(155deg,rgba(8,14,32,0.97) 0%,rgba(14,20,48,0.99) 100%)",
    rightBg: "linear-gradient(135deg,#0ea5e9 0%,#4f46e5 60%,#7c3aed 100%)",
    blob1: "#38bdf8",
    blob2: "#818cf8",
    accent: "#38bdf8",
    border: "rgba(56,189,248,0.35)",
    starColor: "fill-sky-400 text-sky-400",
    badgeColor: "text-sky-400",
  },
  {
    // Card 2 — Pink / Fuchsia
    cardBg: "linear-gradient(155deg,rgba(28,8,28,0.97) 0%,rgba(40,10,40,0.99) 100%)",
    rightBg: "linear-gradient(135deg,#ec4899 0%,#d946ef 55%,#a21caf 100%)",
    blob1: "#f472b6",
    blob2: "#e879f9",
    accent: "#f472b6",
    border: "rgba(244,114,182,0.35)",
    starColor: "fill-pink-400 text-pink-400",
    badgeColor: "text-pink-400",
  },
  {
    // Card 3 — Emerald / Teal
    cardBg: "linear-gradient(155deg,rgba(6,22,18,0.97) 0%,rgba(8,32,26,0.99) 100%)",
    rightBg: "linear-gradient(135deg,#10b981 0%,#0d9488 55%,#0891b2 100%)",
    blob1: "#34d399",
    blob2: "#2dd4bf",
    accent: "#34d399",
    border: "rgba(52,211,153,0.35)",
    starColor: "fill-emerald-400 text-emerald-400",
    badgeColor: "text-emerald-400",
  },
  {
    // Card 4 — Violet / Purple
    cardBg: "linear-gradient(155deg,rgba(18,8,36,0.97) 0%,rgba(26,10,50,0.99) 100%)",
    rightBg: "linear-gradient(135deg,#8b5cf6 0%,#7c3aed 55%,#6d28d9 100%)",
    blob1: "#a78bfa",
    blob2: "#c084fc",
    accent: "#a78bfa",
    border: "rgba(167,139,250,0.35)",
    starColor: "fill-violet-400 text-violet-400",
    badgeColor: "text-violet-400",
  },
  {
    // Card 5 — Amber / Orange
    cardBg: "linear-gradient(155deg,rgba(28,16,4,0.97) 0%,rgba(40,22,4,0.99) 100%)",
    rightBg: "linear-gradient(135deg,#f59e0b 0%,#f97316 55%,#ef4444 100%)",
    blob1: "#fbbf24",
    blob2: "#fb923c",
    accent: "#fbbf24",
    border: "rgba(251,191,36,0.35)",
    starColor: "fill-amber-400 text-amber-400",
    badgeColor: "text-amber-400",
  },
] as const;

/* ─── Card UI ────────────────────────────────────────────────────────────────── */
function CardUI({
  item,
  index,
}: {
  item: (typeof ALL_REVIEWS)[0];
  index: number;
}) {
  const theme = THEMES[index % THEMES.length];

  return (
    <div
      className="flex rounded-3xl overflow-hidden shadow-2xl"
      style={{
        minHeight: "340px",
        border: `1px solid ${theme.border}`,
      }}
    >
      {/* ── LEFT – text panel ── */}
      <div
        className="flex-1 flex flex-col justify-between p-8 sm:p-10 relative overflow-hidden"
        style={{ background: theme.cardBg, backdropFilter: "blur(28px)" }}
      >
        {/* Top accent stripe */}
        <div
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{ background: `linear-gradient(90deg,${theme.blob1},${theme.blob2},transparent)` }}
        />

        {/* Subtle corner blob */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 -left-20 w-56 h-56 rounded-full opacity-[0.12] blur-3xl"
          style={{ background: `radial-gradient(circle,${theme.blob1},${theme.blob2})` }}
        />

        <div className="relative z-10">
          {/* Badge */}
          <span
            className={`inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-widest uppercase mb-5 ${theme.badgeColor}`}
          >
            <BadgeCheck className="w-3.5 h-3.5" />
            Verified Client
          </span>

          {/* Stars — accent coloured */}
          <div className="flex gap-1 mb-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${theme.starColor}`} />
            ))}
          </div>

          <blockquote className="text-base sm:text-[17px] leading-relaxed text-zinc-100 font-light mb-8">
            &ldquo;{item.quote}&rdquo;
          </blockquote>
        </div>

        {/* Author */}
        <div
          className="relative z-10 flex items-center gap-3 pt-6"
          style={{ borderTop: `1px solid ${theme.border}` }}
        >
          <div
            className="relative w-11 h-11 rounded-xl overflow-hidden shrink-0"
            style={{ border: `2px solid ${theme.accent}55`, boxShadow: `0 0 14px ${theme.accent}33` }}
          >
            <Image
              src={item.avatar}
              alt={item.name}
              fill
              unoptimized
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-white leading-tight">{item.name}</p>
            <p className="text-xs mt-0.5" style={{ color: theme.accent }}>
              {item.role} · {item.company}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/*
 * Each sticky card pins at:  NAV_OFFSET + index * CARD_STEP
 *
 * NAV_OFFSET  – clears the fixed navbar so cards don't hide under it
 * CARD_STEP   – how many px lower each successive card pins, giving
 *               the visible "stacked edge" between cards
 */
const NAV_OFFSET = 80;  // px
const CARD_STEP = 20;  // px per card in the stack



/* ─── Sticky card wrapper ─────────────────────────────────────────────────────
 *
 * Each card:
 *  • is position:sticky at  top = NAV_OFFSET + index * CARD_STEP
 *  • has a z-index that grows with index so new cards layer ON TOP
 *  • slides up via a motion.div entrance (scrollYProgress-driven y + scale)
 *    from the moment it enters the viewport bottom until it reaches its pin.
 */
function StickyCard({
  item,
  index,
  total,
}: {
  item: (typeof ALL_REVIEWS)[0];
  index: number;
  total: number;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);

  /*
   * Track progress from when this card enters the viewport bottom ("start end")
   * to when it hits its sticky pin position ("start start").
   * This drives the entrance slide + scale animation.
   */
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start end", "start start"],
  });

  // Card enters from below with a subtle upward slide
  const y = useTransform(scrollYProgress, [0, 1], ["60px", "0px"]);
  // Slight scale-up for a "coming to front" feel
  const scale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);

  // Cards below the current active one appear a touch dimmer
  const brightness = useTransform(
    scrollYProgress,
    [0, 1],
    [index === 0 ? 1 : 0.75, 1]
  );

  const stickyTop = NAV_OFFSET + index * CARD_STEP;

  return (
    <div
      ref={wrapRef}
      style={{
        position: "sticky",
        top: `${stickyTop}px`,
        zIndex: index + 1,
      }}
    >
      <motion.div
        style={{ y, scale, filter: brightness ? undefined : undefined }}
      >
        {/* Subtle shadow to separate stacked cards */}
        <div
          style={{ boxShadow: `0 -${4 + index * 3}px 40px rgba(0,0,0,0.55)` }}
          className="rounded-3xl"
        >
          <CardUI item={item} index={index} />
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────────── */
export default function Testimonials() {
  const total = ALL_REVIEWS.length;

  return (
    <section id="testimonials" className="relative py-24 sm:py-32">
      {/* Ambient background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 70% 45% at 50% 0%,rgba(99,102,241,0.07) 0%,transparent 65%)",
        }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <SectionHeading
          badge="Client Reviews"
          title="What Clients Say"
          subtitle="Here’s what the people I’ve worked with say about our collaboration."
          align="center"
        />

        {/*
         * Card stack.
         * Between every two cards there is a "scroll spacer" div that gives
         * the user ~60 vh of scroll before the next card arrives and pins.
         * The last card gets a smaller spacer so the section ends cleanly.
         */}
        <div className="relative mt-4">
          {ALL_REVIEWS.map((item, index) => (
            <React.Fragment key={item.id}>
              <StickyCard item={item} index={index} total={total} />

              {/* Scroll room between cards */}
              {index < total - 1 ? (
                <div style={{ height: "55vh" }} aria-hidden />
              ) : (
                /* Extra space so the full stack is visible before section ends */
                <div style={{ height: "40vh" }} aria-hidden />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
