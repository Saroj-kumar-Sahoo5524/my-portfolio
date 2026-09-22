"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowUpRight,
  Github,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { PROJECTS_DATA } from "@/lib/data";
import SectionHeading from "./SectionHeading";

/* ══════════════════════════════════════════════════════
   TYPES
══════════════════════════════════════════════════════ */
export interface CarouselItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
}

export interface CylinderCarouselProps {
  items?: CarouselItem[];
  radius?: number;
  perspective?: number;
  autoRotateSpeed?: number;   // deg / second
  dragSensitivity?: number;   // deg / px
}

/* ══════════════════════════════════════════════════════
   CARD GEOMETRY  — portrait 2 : 3
══════════════════════════════════════════════════════ */
const CARD_W = 200;
const CARD_H = 290;   // compact portrait

/* ══════════════════════════════════════════════════════
   PHYSICS CONSTANTS
══════════════════════════════════════════════════════ */
const FRICTION = 0.955;   // per 16 ms frame
const HOVER_LERP = 0.055;
const SNAP_LERP = 0.10;
const SNAP_DONE = 0.04;    // deg
const MIN_INERTIA_VEL = 0.004;   // deg / ms
const DRAG_PX = 5;       // activation threshold

/* ══════════════════════════════════════════════════════
   MATH
══════════════════════════════════════════════════════ */
const mod = (n: number, m: number) => ((n % m) + m) % m;
const norm360 = (a: number) => mod(a, 360);
const shortDelta = (from: number, to: number) => {
  let d = norm360(to - from);
  if (d > 180) d -= 360;
  return d;
};
const clamp = (v: number, lo: number, hi: number) =>
  v < lo ? lo : v > hi ? hi : v;

/* ══════════════════════════════════════════════════════
   PER-CARD GRADIENT BACKGROUNDS
   Each card gets a unique colour mood so logos, icons,
   and photos all look beautiful without cropping.
══════════════════════════════════════════════════════ */
const CARD_GRADIENTS = [
  "linear-gradient(145deg, #020d1a 0%, #053352 45%, #020d1a 100%)",   // deep ocean
  "linear-gradient(145deg, #0d0622 0%, #2a1060 45%, #0d0622 100%)",   // royal violet
  "linear-gradient(145deg, #010e08 0%, #063320 45%, #010e08 100%)",   // emerald night
  "linear-gradient(145deg, #1a0a00 0%, #4a2000 45%, #1a0a00 100%)",   // ember amber
  "linear-gradient(145deg, #120008 0%, #3b0022 45%, #120008 100%)",   // deep crimson
  "linear-gradient(145deg, #00101a 0%, #002d4a 45%, #00101a 100%)",   // steel navy
  "linear-gradient(145deg, #0a0a00 0%, #2a2800 45%, #0a0a00 100%)",   // dark gold
  "linear-gradient(145deg, #001010 0%, #002e2e 45%, #001010 100%)",   // teal abyss
];

/* ══════════════════════════════════════════════════════
   IMAGE-ONLY CARD
   Full image shown without any cropping — object-contain
   with a styled gradient background makes every image type
   (logo, screenshot, photo) look intentional and polished.
══════════════════════════════════════════════════════ */
interface CardProps {
  item: CarouselItem;
  index: number;    // used for gradient selection
  offset: number;   // shortest distance from active: 0 = center
  isActive: boolean;
  onClick: () => void;
}

function CurveCard({ item, index, offset, isActive, onClick }: CardProps) {
  const [imgErr, setImgErr] = useState(false);
  const abs = Math.abs(offset);

  // Visual weight – fade & dim outer cards
  const opacity = [1, 0.84, 0.54, 0.24, 0.08][Math.min(abs, 4)];
  const brightness = [1, 0.82, 0.54, 0.30, 0.10][Math.min(abs, 4)];
  const interactive = abs <= 3;
  const bg = CARD_GRADIENTS[index % CARD_GRADIENTS.length];

  return (
    <div
      onClick={!isActive ? onClick : undefined}
      style={{
        width: CARD_W,
        height: CARD_H,
        opacity,
        filter: `brightness(${brightness})`,
        transition: "opacity 0.45s ease, filter 0.45s ease",
        cursor: isActive ? "default" : "pointer",
        pointerEvents: interactive ? "auto" : "none",
        userSelect: "none",
        WebkitUserSelect: "none",
        borderRadius: 20,
        overflow: "hidden",
        position: "relative",
        /* Gradient background visible around/behind contained image */
        background: bg,
        /* Active card: white rim glow */
        boxShadow: isActive
          ? "0 0 0 1px rgba(255,255,255,0.20), 0 0 70px rgba(255,255,255,0.09), 0 32px 90px rgba(0,0,0,0.75)"
          : "0 20px 60px rgba(0,0,0,0.6)",
      }}
    >
      {/* Image — object-contain so the full image is always visible */}
      {!imgErr ? (
        <img
          src={item.image}
          alt={item.title}
          draggable={false}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            /* contain = show 100 % of the image; gradient bg fills the rest */
            objectFit: "contain",
            /* slight inset padding so the image breathes inside the card */
            padding: "16px",
            boxSizing: "border-box",
            display: "block",
            transform: isActive ? "scale(1.03)" : "scale(1)",
            transition: "transform 0.7s ease",
          }}
          onError={() => setImgErr(true)}
        />
      ) : (
        /* Fallback: large initial letter on gradient */
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: "5rem",
              fontWeight: 900,
              background: "linear-gradient(135deg,#38bdf8,#6366f1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              userSelect: "none",
            }}
          >
            {item.title.charAt(0)}
          </span>
        </div>
      )}

      {/* Subtle vignette around the edges to frame the image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 20,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Bottom gradient so the info panel below reads well */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "35%",
          pointerEvents: "none",
          borderRadius: "0 0 20px 20px",
          background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.5))",
        }}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   MAIN CAROUSEL
══════════════════════════════════════════════════════ */
export default function ProjectCarousel({
  items = PROJECTS_DATA as unknown as CarouselItem[],
  radius,
  perspective = 1150,
  autoRotateSpeed = 13,
  dragSensitivity = 0.38,
}: CylinderCarouselProps) {
  const N = items.length;
  const ANGLE_STEP = 360 / N;

  // Auto-compute radius: tight enough to see the curve, wide enough cards don't overlap
  const R = radius ?? Math.max(
    Math.ceil(CARD_W / (2 * Math.sin(Math.PI / N)) * 1.25),
    320
  );

  /* ── Physics refs ──────────────────────────────── */
  const rotRef = useRef(0);
  const velRef = useRef(0);
  const snapTargetRef = useRef(0);
  type Phase = "auto" | "drag" | "inertia" | "snap";
  const phaseRef = useRef<Phase>("auto");
  const isHoveredRef = useRef(false);
  const autoSpeedRef = useRef(0);
  const lastTsRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  /* ── Drag refs ─────────────────────────────────── */
  const ptrDownRef = useRef(false);
  const dragActiveRef = useRef(false);
  const ptrStartXRef = useRef(0);
  const rotAtDragRef = useRef(0);
  const ptrPrevXRef = useRef(0);
  const ptrPrevTsRef = useRef(0);
  const dragVelRef = useRef(0);

  /* ── DOM refs ──────────────────────────────────── */
  const cylinderRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  /* ── React state ───────────────────────────────── */
  const [activeIndex, setActiveIndex] = useState(0);

  /* ── Helpers ───────────────────────────────────── */
  const getActiveIndex = useCallback((rot: number) => {
    const rn = norm360(rot);
    let best = 0, bestDist = Infinity;
    for (let i = 0; i < N; i++) {
      let dist = Math.abs(norm360(i * ANGLE_STEP) - rn);
      if (dist > 180) dist = 360 - dist;
      if (dist < bestDist) { bestDist = dist; best = i; }
    }
    return best;
  }, [N, ANGLE_STEP]);

  const applyRotation = useCallback((rot: number) => {
    rotRef.current = rot;
    if (cylinderRef.current) {
      cylinderRef.current.style.transform = `rotateY(${-rot}deg)`;
    }
    const idx = getActiveIndex(rot);
    setActiveIndex(prev => prev !== idx ? idx : prev);
  }, [getActiveIndex]);

  const nearestSnap = useCallback((rot: number) => {
    const i = getActiveIndex(rot);
    return rot + shortDelta(rot, i * ANGLE_STEP);
  }, [getActiveIndex, ANGLE_STEP]);

  /* ── rAF physics loop ──────────────────────────── */
  // Use a ref so the loop can schedule itself without a TDZ self-reference
  const mainLoopRef = useRef<FrameRequestCallback | null>(null);

  const mainLoop = useCallback((ts: number) => {
    const dt = lastTsRef.current !== null
      ? clamp(ts - lastTsRef.current, 0, 50)
      : 16;
    lastTsRef.current = ts;

    switch (phaseRef.current) {
      case "drag": break;

      case "inertia":
        velRef.current *= Math.pow(FRICTION, dt / 16);
        applyRotation(rotRef.current + velRef.current * dt);
        if (Math.abs(velRef.current) < MIN_INERTIA_VEL) {
          snapTargetRef.current = nearestSnap(rotRef.current);
          phaseRef.current = "snap";
        }
        break;

      case "snap": {
        const delta = shortDelta(rotRef.current, snapTargetRef.current);
        if (Math.abs(delta) < SNAP_DONE) {
          applyRotation(snapTargetRef.current);
          phaseRef.current = "auto";
          autoSpeedRef.current = 0;
        } else {
          applyRotation(rotRef.current + delta * SNAP_LERP);
        }
        break;
      }

      default: {
        const targetMs = isHoveredRef.current ? 0 : autoRotateSpeed / 1000;
        autoSpeedRef.current += (targetMs - autoSpeedRef.current) * HOVER_LERP;
        applyRotation(rotRef.current + autoSpeedRef.current * dt);
        break;
      }
    }

    if (mainLoopRef.current) {
      rafRef.current = requestAnimationFrame(mainLoopRef.current);
    }
  }, [applyRotation, nearestSnap, autoRotateSpeed]);

  // Keep the ref in sync with the latest stable callback (inside effect, not during render)
  useEffect(() => {
    mainLoopRef.current = mainLoop;
  }, [mainLoop]);

  useEffect(() => {
    lastTsRef.current = null;
    if (mainLoopRef.current) {
      rafRef.current = requestAnimationFrame(mainLoopRef.current);
    }
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [mainLoop]);

  /* ── Wheel (non-passive) ───────────────────────── */
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (phaseRef.current === "drag") return;
      const raw = Math.abs(e.deltaX) >= Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      velRef.current = clamp(raw * 0.007, -0.6, 0.6);
      phaseRef.current = "inertia";
      lastTsRef.current = null;
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  /* ── Navigate ──────────────────────────────────── */
  const goTo = useCallback((idx: number) => {
    const i = mod(idx, N);
    snapTargetRef.current = rotRef.current + shortDelta(rotRef.current, i * ANGLE_STEP);
    phaseRef.current = "snap";
  }, [N, ANGLE_STEP]);

  /* ── Keyboard ──────────────────────────────────── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goTo(activeIndex - 1);
      if (e.key === "ArrowRight") goTo(activeIndex + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  /* ── Pointer events ────────────────────────────── */
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    ptrDownRef.current = true;
    dragActiveRef.current = false;
    ptrStartXRef.current = e.clientX;
    rotAtDragRef.current = rotRef.current;
    ptrPrevXRef.current = e.clientX;
    ptrPrevTsRef.current = performance.now();
    dragVelRef.current = 0;
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!ptrDownRef.current) return;
    const dx = e.clientX - ptrStartXRef.current;
    if (!dragActiveRef.current) {
      if (Math.abs(dx) < DRAG_PX) return;
      dragActiveRef.current = true;
      phaseRef.current = "drag";
    }
    const now = performance.now();
    const ddx = e.clientX - ptrPrevXRef.current;
    const dt = now - ptrPrevTsRef.current;
    if (dt > 0) dragVelRef.current = (ddx * dragSensitivity) / dt;
    ptrPrevXRef.current = e.clientX;
    ptrPrevTsRef.current = now;
    applyRotation(rotAtDragRef.current + dx * dragSensitivity);
  }, [applyRotation, dragSensitivity]);

  const finishDrag = useCallback(() => {
    if (!ptrDownRef.current) return;
    ptrDownRef.current = false;
    if (!dragActiveRef.current) {
      phaseRef.current = "auto";
      lastTsRef.current = null;
      return;
    }
    dragActiveRef.current = false;
    const v = dragVelRef.current;
    if (Math.abs(v) > MIN_INERTIA_VEL) {
      velRef.current = v;
      phaseRef.current = "inertia";
      lastTsRef.current = null;
    } else {
      snapTargetRef.current = nearestSnap(rotRef.current);
      phaseRef.current = "snap";
    }
  }, [nearestSnap]);



  /* ── Relative offsets for visual weight ─────────── */
  const offsets = items.map((_, i) => {
    let off = i - activeIndex;
    if (off > N / 2) off -= N;
    if (off < -N / 2) off += N;
    return off;
  });

  const active = items[activeIndex];

  /* ══════════════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════════════ */
  return (
    <section
      id="project-showcase"
      style={{ background: "#000" }}
      className="py-6 relative overflow-hidden"
    >
      {/* Heading */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Portfolio Showcase"
          title="Completed Projects"
          subtitle="A curation of enterprise web applications, real-time engines, and immersive 3D digital products built with modern stacks."
          align="center"
        />
      </div>

      {/* ══ 3-D Stage ══════════════════════════════ */}
      <div className="relative mt-5">

        {/* Outer clip (hides DOM overflow while keeping 3D visible) */}
        <div
          className="relative overflow-hidden"
          style={{ height: CARD_H + 40 }}
        >
          {/* Left edge fade */}
          <div
            className="absolute inset-y-0 left-0 z-30 pointer-events-none"
            style={{
              width: "18%",
              background: "linear-gradient(to right, #000 0%, rgba(0,0,0,0.88) 30%, transparent 100%)",
            }}
          />
          {/* Right edge fade */}
          <div
            className="absolute inset-y-0 right-0 z-30 pointer-events-none"
            style={{
              width: "18%",
              background: "linear-gradient(to left, #000 0%, rgba(0,0,0,0.88) 30%, transparent 100%)",
            }}
          />

          {/* Perspective viewport */}
          <div
            ref={stageRef}
            className="absolute inset-0 overflow-visible"
            style={{
              perspective: perspective,
              perspectiveOrigin: "50% 50%",
              cursor: "grab",
            }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={finishDrag}
            onPointerCancel={finishDrag}
            onMouseEnter={() => { isHoveredRef.current = true; }}
            onMouseLeave={() => { isHoveredRef.current = false; finishDrag(); }}
          >
            {/* Rotating cylinder */}
            <div
              ref={cylinderRef}
              style={{
                position: "absolute",
                inset: 0,
                transformStyle: "preserve-3d",
                willChange: "transform",
              }}
            >
              {items.map((item, i) => (
                <div
                  key={item.id}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: -CARD_H / 2,
                    marginLeft: -CARD_W / 2,
                    width: CARD_W,
                    height: CARD_H,
                    transformStyle: "preserve-3d",
                    transform: `rotateY(${i * ANGLE_STEP}deg) translateZ(${R}px)`,
                  }}
                >
                  <CurveCard
                    item={item}
                    index={i}
                    offset={offsets[i]}
                    isActive={i === activeIndex}
                    onClick={() => goTo(i)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ Project info panel — compact, fits same viewport ══════ */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="flex flex-col items-center text-center gap-2"
            >
              {/* Category + Title on same visual row */}
              <div className="flex items-center gap-2 flex-wrap justify-center">
                <span
                  className="px-2 py-0.5 rounded-full text-[9px] font-black font-mono tracking-[0.14em] uppercase"
                  style={{
                    background: "rgba(56,189,248,0.1)",
                    border: "1px solid rgba(56,189,248,0.2)",
                    color: "#38bdf8",
                  }}
                >
                  {active.category}
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight">
                  {active.title}
                </h3>
              </div>

              {/* Subtitle — single line */}
              <p className="text-xs text-zinc-400 max-w-lg leading-snug line-clamp-1">
                {active.subtitle}
              </p>

              {/* Tags + CTAs on one row */}
              <div className="flex items-center justify-center flex-wrap gap-1.5 mt-1">
                {active.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded text-[9px] font-mono"
                    style={{
                      background: "rgba(99,102,241,0.1)",
                      border: "1px solid rgba(99,102,241,0.18)",
                      color: "#818cf8",
                    }}
                  >
                    {tag}
                  </span>
                ))}
                <span className="w-px h-3.5 bg-white/10 mx-1" />
                <a
                  href={active.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-1 rounded-lg text-[10px] font-bold transition-all duration-200 hover:scale-105 hover:brightness-110"
                  style={{
                    background: "linear-gradient(135deg,rgba(56,189,248,0.16),rgba(99,102,241,0.16))",
                    border: "1px solid rgba(56,189,248,0.28)",
                    color: "#38bdf8",
                  }}
                >
                  <ArrowUpRight className="w-2.5 h-2.5" />
                  Live
                </a>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ══ Nav controls ══════════════════════════ */}
          <div className="flex items-center justify-center gap-5 mt-4">
            <motion.button
              whileHover={{ scale: 1.13 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => goTo(activeIndex - 1)}
              aria-label="Previous project"
              className="flex items-center justify-center w-10 h-10 rounded-full group"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.09)",
              }}
            >
              <ChevronLeft className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
            </motion.button>

            {/* Dot rail */}
            <div className="flex items-center gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Project ${i + 1}`}
                  style={{
                    height: 6,
                    width: i === activeIndex ? 26 : 6,
                    borderRadius: 99,
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    background: i === activeIndex
                      ? "linear-gradient(90deg,#38bdf8,#6366f1)"
                      : "rgba(255,255,255,0.14)",
                    boxShadow: i === activeIndex
                      ? "0 0 10px rgba(56,189,248,0.5)"
                      : "none",
                    transition: "all 0.35s cubic-bezier(0.25,0.46,0.45,0.94)",
                  }}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.13 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => goTo(activeIndex + 1)}
              aria-label="Next project"
              className="flex items-center justify-center w-10 h-10 rounded-full group"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.09)",
              }}
            >
              <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
            </motion.button>
          </div>

          {/* Counter */}
          <div className="flex justify-center mt-1.5">
            <span className="text-xs font-mono" style={{ color: "#1e293b" }}>
              <span style={{ color: "#38bdf8", fontWeight: 700 }}>
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              {" / "}
              {String(N).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
