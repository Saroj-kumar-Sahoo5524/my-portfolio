import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center text-white font-bold text-base animate-pulse">
          SKS
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
            Loading Workspace...
          </span>
        </div>
      </div>
    </div>
  );
}
