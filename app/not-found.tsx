"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-6 shadow-2xl shadow-sky-500/20">
        <Compass className="w-8 h-8 animate-spin" style={{ animationDuration: "12s" }} />
      </div>

      <div className="text-xs font-mono text-sky-400 uppercase tracking-widest mb-2">
        Error 404
      </div>

      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
        Coordinates Not Found
      </h1>

      <p className="text-zinc-400 text-sm sm:text-base max-w-md mb-8 leading-relaxed">
        The route or resource you requested does not exist or has been shifted in digital spacetime.
      </p>

      <MagneticButton strength={20}>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold text-black bg-sky-400 hover:bg-sky-300 shadow-[0_0_25px_rgba(56,189,248,0.4)] transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Headquarters</span>
        </Link>
      </MagneticButton>
    </div>
  );
}
