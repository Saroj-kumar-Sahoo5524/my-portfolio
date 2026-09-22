"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorType, setCursorType] = useState<"default" | "hover" | "card">("default");

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on non-touch devices with fine pointer
    const isTouch = window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("button, a, input, textarea, select, [data-cursor='hover']");
      const card = target.closest("[data-cursor='card'], .project-card");

      if (card) {
        setCursorType("card");
      } else if (interactive) {
        setCursorType("hover");
      } else {
        setCursorType("default");
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousemove", handleElementHover, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousemove", handleElementHover);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden" aria-hidden="true">
      {/* Central dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-sky-400 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(56,189,248,0.8)]"
        style={{
          x: mouseX,
          y: mouseY,
        }}
      />

      {/* Trailing Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-sky-400/40 -translate-x-1/2 -translate-y-1/2 transition-colors duration-200"
        style={{
          x: smoothX,
          y: smoothY,
        }}
        animate={{
          width: cursorType === "card" ? 64 : cursorType === "hover" ? 44 : 26,
          height: cursorType === "card" ? 64 : cursorType === "hover" ? 44 : 26,
          backgroundColor: cursorType === "card" ? "rgba(56, 189, 248, 0.08)" : cursorType === "hover" ? "rgba(56, 189, 248, 0.12)" : "transparent",
          borderColor: cursorType === "hover" || cursorType === "card" ? "rgba(56, 189, 248, 0.75)" : "rgba(56, 189, 248, 0.35)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      >
        {cursorType === "card" && (
          <span className="absolute inset-0 flex items-center justify-center text-[9px] font-semibold tracking-wider text-sky-300 uppercase">
            View
          </span>
        )}
      </motion.div>
    </div>
  );
}
