"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, FileDown, ArrowUpRight } from "lucide-react";
import { PERSONAL_CONFIG } from "@/lib/data";
import MagneticButton from "./MagneticButton";

const NAV_LINKS = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Scroll listener for sticky glass state & active section tracking
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      // Detect active section
      const sections = NAV_LINKS.map((link) => link.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith("#")) {
      const el = document.getElementById(href.substring(1));
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? "py-3" : "py-6"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            id="main-desktop-navbar"
            className={`flex items-center justify-between px-5 py-3 rounded-full transition-all duration-300 ${isScrolled
              ? "bg-zinc-950/80 dark:bg-zinc-950/80 light:bg-white/85 backdrop-blur-xl border border-white/10 dark:border-white/10 light:border-slate-200/80 shadow-2xl shadow-black/30"
              : "bg-transparent border border-transparent"
              }`}
          >
            {/* Left: Developer Logo */}
            <Link
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#hero");
              }}
              className="group flex items-center gap-2.5 focus:outline-none"
              id="navbar-logo-btn"
            >
              <div className="relative h-9 w-auto group-hover:scale-105 transition-transform">
                <Image
                  src="/assets/saroj-logo.png"
                  alt="Saroj Logo"
                  height={100}
                  width={120}
                  className="h-9 w-auto object-contain"
                  priority
                />
              </div>
            </Link>

            {/* Center: Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1 bg-zinc-900/60 dark:bg-zinc-900/60 light:bg-slate-100/90 px-3 py-1.5 rounded-full border border-white/5 dark:border-white/5 light:border-slate-200">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <button
                    key={link.name}
                    onClick={() => scrollTo(link.href)}
                    className={`relative px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${isActive
                      ? "text-sky-400 font-semibold"
                      : "text-zinc-400 hover:text-white dark:text-zinc-400 dark:hover:text-white light:text-slate-600 light:hover:text-slate-900"
                      }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavPill"
                        className="absolute inset-0 bg-sky-500/15 border border-sky-500/30 rounded-full -z-10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {link.name}
                  </button>
                );
              })}
            </div>

            {/* Right: Actions */}
            <div className="hidden md:flex items-center gap-3">

              {/* Resume download */}
              <a
                href={PERSONAL_CONFIG.resumeUrl}
                download
                id="navbar-resume-btn"
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:text-white dark:text-zinc-300 dark:hover:text-white light:text-slate-700 light:hover:text-slate-900 bg-zinc-900/60 dark:bg-zinc-900/60 light:bg-slate-100 rounded-full border border-white/10 dark:border-white/10 light:border-slate-200 transition-all hover:border-white/20"
              >
                <FileDown className="w-3.5 h-3.5 text-sky-400" />
                <span>Resume</span>
              </a>

              {/* Let's Talk CTA */}
              <MagneticButton strength={15}>
                <button
                  id="navbar-contact-cta"
                  onClick={() => scrollTo("#contact")}
                  className="group relative inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-black bg-sky-400 hover:bg-sky-300 shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:shadow-[0_0_25px_rgba(56,189,248,0.6)] transition-all"
                >
                  <span>Let&apos;s Talk</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </MagneticButton>
            </div>

            {/* Mobile Actions & Hamburger Toggle */}
            <div className="flex md:hidden items-center gap-2">
              <button
                id="mobile-menu-toggle-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Open mobile navigation"
                className="w-10 h-10 rounded-full flex items-center justify-center text-white bg-zinc-900/80 border border-white/10"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            id="mobile-nav-drawer"
            className="fixed inset-x-4 top-20 z-50 p-6 rounded-3xl bg-zinc-950/95 dark:bg-zinc-950/95 light:bg-white/95 backdrop-blur-2xl border border-white/15 dark:border-white/15 light:border-slate-200 shadow-2xl md:hidden"
          >
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <button
                    key={link.name}
                    onClick={() => scrollTo(link.href)}
                    className={`flex items-center justify-between p-3 rounded-xl text-left text-sm font-medium transition-colors ${isActive
                      ? "bg-sky-500/15 text-sky-400 font-semibold"
                      : "text-zinc-300 hover:text-white dark:text-zinc-300 dark:hover:text-white light:text-slate-700 light:hover:text-slate-900 hover:bg-white/5"
                      }`}
                  >
                    <span>{link.name}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />}
                  </button>
                );
              })}

              <div className="pt-4 mt-2 border-t border-white/10 dark:border-white/10 light:border-slate-200 flex flex-col gap-2.5">
                <a
                  href={PERSONAL_CONFIG.resumeUrl}
                  download
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium text-white bg-zinc-900 hover:bg-zinc-800 border border-white/10"
                >
                  <FileDown className="w-4 h-4 text-sky-400" />
                  Download Resume
                </a>

                <button
                  onClick={() => scrollTo("#contact")}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold text-black bg-sky-400 hover:bg-sky-300 shadow-lg shadow-sky-500/25"
                >
                  <span>Let&apos;s Build Together</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
