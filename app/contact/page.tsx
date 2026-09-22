import React from "react";
import Link from "next/link";
import { ArrowLeft, Mail, MapPin, Calendar, Clock, Sparkles } from "lucide-react";
import { PERSONAL_CONFIG } from "@/lib/data";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import CustomCursor from "@/components/CustomCursor";

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-[#f5f5f5] selection:bg-sky-500/30 selection:text-white">
      <CustomCursor />
      <Navbar />

      <main className="pt-32 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-sky-400 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Main Portfolio</span>
        </Link>

        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider text-sky-400 bg-sky-500/10 border border-sky-500/20 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Consultation & Contracts</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white dark:text-white light:text-slate-900 tracking-tight">
            Let&apos;s Discuss Your Next Product
          </h1>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 dark:text-zinc-400 light:text-slate-600 leading-relaxed">
            I partner with founders, venture-backed startups, and creative agencies to engineer high-velocity digital experiences.
          </p>
        </div>

        {/* Quick Details Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-16">
          <div className="p-5 rounded-2xl bg-zinc-950/40 border border-white/5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-zinc-400 font-mono">Response Time</div>
              <div className="text-sm font-semibold text-white">&lt; 24 Hours</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950/40 border border-white/5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-zinc-400 font-mono">Next Availability</div>
              <div className="text-sm font-semibold text-white">{PERSONAL_CONFIG.availabilityPeriod}</div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-zinc-950/40 border border-white/5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-zinc-400 font-mono">Base Location</div>
              <div className="text-sm font-semibold text-white">{PERSONAL_CONFIG.location}</div>
            </div>
          </div>
        </div>

        {/* Contact Form Component */}
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
