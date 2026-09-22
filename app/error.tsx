"use client";

import React, { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Runtime application error caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-6">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <div className="text-xs font-mono text-rose-400 uppercase tracking-widest mb-2">
        System Runtime Exception
      </div>

      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
        Something Interrupted Execution
      </h1>

      <p className="text-zinc-400 text-sm max-w-md mb-8 leading-relaxed">
        {error.message || "An unexpected rendering fault occurred. The state has been isolated."}
      </p>

      <MagneticButton strength={20}>
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold text-white bg-zinc-900 hover:bg-zinc-800 border border-white/15 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Reinitialize Application</span>
        </button>
      </MagneticButton>
    </div>
  );
}
