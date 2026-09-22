"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const WHATSAPP_NUMBER = "918457875524";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "👋 Hi Saroj! I came across your portfolio and I'm really impressed with your work. I'd love to discuss a potential project with you. Are you available for a quick chat? 😊"
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showBadge, setShowBadge] = useState(true);

  // Delay entrance so it doesn't clash with the loading screen
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 2200);
    return () => clearTimeout(t);
  }, []);

  // Auto-show tooltip once after 4 s to attract attention
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 3500);
    }, 4000);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 40 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
          className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3"
        >
          {/* ── Tooltip bubble ── */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: 12, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 12, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="relative max-w-[220px] px-4 py-2.5 rounded-2xl rounded-br-sm bg-zinc-900 border border-emerald-500/30 shadow-xl shadow-emerald-900/20"
              >
                <p className="text-xs font-medium text-white leading-snug">
                  💬 Let&apos;s talk! Send me a message on WhatsApp ⚡
                </p>
                {/* Arrow pointing to button */}
                <span className="absolute -bottom-2 right-4 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-zinc-900" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Main button ── */}
          <div className="relative">
            {/* Outer slow pulse ring */}
            <span className="absolute inset-0 rounded-full bg-emerald-500/30 animate-ping" />
            {/* Second faster ring */}
            <motion.span
              className="absolute inset-[-6px] rounded-full border-2 border-emerald-400/25"
              animate={{ scale: [1, 1.18, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              id="whatsapp-float-btn"
              aria-label="Chat on WhatsApp"
              onClick={() => setShowBadge(false)}
              onHoverStart={() => setShowTooltip(true)}
              onHoverEnd={() => setShowTooltip(false)}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.93 }}
              className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-emerald-400 to-green-600 shadow-[0_8px_32px_rgba(16,185,129,0.55)] hover:shadow-[0_8px_40px_rgba(16,185,129,0.75)] transition-shadow"
            >
              {/* WhatsApp SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                className="w-7 h-7"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>

              {/* Notification badge */}
              <AnimatePresence>
                {showBadge && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 border-2 border-[#050505] flex items-center justify-center text-[9px] font-bold text-white"
                  >
                    1
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
