"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Send,
  Mail,
  Copy,
  Check,
  Github,
  Linkedin,
  Twitter,
  MessageSquare,
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Instagram,
  Facebook,
} from "lucide-react";
import confetti from "canvas-confetti";
import { PERSONAL_CONFIG } from "@/lib/data";
import SectionHeading from "./SectionHeading";
import MagneticButton from "./MagneticButton";

const WHATSAPP_NUMBER = "918457875524";
const WHATSAPP_MESSAGE = encodeURIComponent(
  "👋 Hi Saroj! I came across your portfolio and I'm really impressed with your work. I'd love to discuss a potential project with you. Are you available for a quick chat? 😊"
);
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

// --------------- Validation helpers ---------------
type FormField = "name" | "email" | "subject" | "message";

function validateField(field: FormField, value: string): string {
  switch (field) {
    case "name":
      if (!value.trim()) return "Name is required.";
      if (value.trim().length < 2) return "Name must be at least 2 characters.";
      return "";
    case "email":
      if (!value.trim()) return "Email is required.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address.";
      return "";
    case "message":
      if (!value.trim()) return "Message is required.";
      if (value.trim().length < 20) return `At least 20 characters needed (${value.trim().length}/20).`;
      return "";
    default:
      return "";
  }
}

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [touched, setTouched] = useState<Record<FormField, boolean>>({
    name: false,
    email: false,
    subject: false,
    message: false,
  });

  const fieldErrors: Record<FormField, string> = {
    name: validateField("name", formData.name),
    email: validateField("email", formData.email),
    subject: "",
    message: validateField("message", formData.message),
  };

  const isFormValid = !fieldErrors.name && !fieldErrors.email && !fieldErrors.message;

  const handleChange = (field: FormField, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (!touched[field]) setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: FormField) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PERSONAL_CONFIG.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Mark all required fields as touched so errors surface
    setTouched({ name: true, email: true, subject: true, message: true });
    if (!isFormValid) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Failed to send message. Please try again.");
        return;
      }

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTouched({ name: false, email: false, subject: false, message: false });

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ["#38bdf8", "#818cf8", "#34d399"],
        });
      } catch {
        // Safe if canvas not available
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMessage("Network error. Please check your connection or reach out directly.");
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32 relative">
      {/* Background soft ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Get In Touch"
          title="Have an Idea? Let's Build It."
          subtitle="Whether you have a product idea, freelance project or something experimental in mind, let's create something remarkable."
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-start">
          {/* Left Column: Direct channels & Quick Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950/40 dark:bg-zinc-950/40 light:bg-white/85 backdrop-blur-xl border border-white/5 dark:border-white/5 light:border-slate-200 shadow-xl space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white dark:text-white light:text-slate-900">
                  Direct Communication
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-zinc-400 dark:text-zinc-400 light:text-slate-600 leading-relaxed">
                  I typically respond within 24 hours. Feel free to copy my direct email or connect through professional networks.
                </p>
              </div>

              {/* Copy Email Button Card */}
              <div className="p-4 rounded-2xl bg-zinc-900/60 dark:bg-zinc-900/60 light:bg-slate-100 border border-white/10 dark:border-white/10 light:border-slate-200 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center text-sky-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="truncate">
                    <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                      Primary Email
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-white dark:text-white light:text-slate-900 truncate">
                      {PERSONAL_CONFIG.email}
                    </div>
                  </div>
                </div>

                <button
                  id="copy-email-btn"
                  onClick={handleCopyEmail}
                  aria-label="Copy email address"
                  className="px-3 py-2 rounded-xl text-xs font-medium text-sky-300 dark:text-sky-300 light:text-sky-700 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 flex items-center gap-1.5 transition-colors shrink-0"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Toast Feedback */}
              <AnimatePresence>
                {copiedEmail && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Email address copied to clipboard!</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Social Channels List */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Online Profiles
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <a
                    href={PERSONAL_CONFIG.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-zinc-900/40 dark:bg-zinc-900/40 light:bg-slate-100 hover:bg-zinc-800/60 border border-white/5 dark:border-white/5 light:border-slate-200 flex items-center gap-2.5 text-xs text-zinc-300 dark:text-zinc-300 light:text-slate-700 hover:text-sky-400 transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                    <span>Instagram</span>
                  </a>

                  <a
                    href={PERSONAL_CONFIG.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-zinc-900/40 dark:bg-zinc-900/40 light:bg-slate-100 hover:bg-zinc-800/60 border border-white/5 dark:border-white/5 light:border-slate-200 flex items-center gap-2.5 text-xs text-zinc-300 dark:text-zinc-300 light:text-slate-700 hover:text-sky-400 transition-colors"
                  >
                    <Linkedin className="w-4 h-4 text-sky-400" />
                    <span>LinkedIn</span>
                  </a>

                  <a
                    href={PERSONAL_CONFIG.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-zinc-900/40 dark:bg-zinc-900/40 light:bg-slate-100 hover:bg-zinc-800/60 border border-white/5 dark:border-white/5 light:border-slate-200 flex items-center gap-2.5 text-xs text-zinc-300 dark:text-zinc-300 light:text-slate-700 hover:text-sky-400 transition-colors"
                  >
                    <Facebook className="w-4 h-4 text-sky-400" />
                    <span>Facebook</span>
                  </a>

                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 flex items-center gap-2.5 text-xs text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-4 h-4"
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="p-6 sm:p-8 md:p-10 rounded-3xl bg-zinc-950/40 dark:bg-zinc-950/40 light:bg-white/85 backdrop-blur-xl border border-white/5 dark:border-white/5 light:border-slate-200 shadow-xl">
              {status === "success" ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white dark:text-white light:text-slate-900">
                    Message Dispatched Successfully
                  </h3>
                  <p className="text-sm text-zinc-400 dark:text-zinc-400 light:text-slate-600 max-w-md mx-auto">
                    Thank you for reaching out! Your note has landed safely in my inbox, and I will review it and reply shortly.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="px-6 py-2.5 rounded-full text-xs font-semibold text-sky-400 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 transition-colors"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2"
                      >
                        Your Name <span className="text-sky-400">*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="contact-name"
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          onBlur={() => handleBlur("name")}
                          placeholder="Alex Parker"
                          className={`w-full px-4 py-3 pr-10 rounded-xl bg-zinc-900/70 dark:bg-zinc-900/70 light:bg-slate-50 border text-white dark:text-white light:text-slate-900 placeholder:text-zinc-600 text-sm focus:outline-none transition-colors ${touched.name && fieldErrors.name
                            ? "border-rose-500/70 focus:border-rose-500"
                            : touched.name && !fieldErrors.name
                              ? "border-emerald-500/60 focus:border-emerald-500"
                              : "border-white/10 dark:border-white/10 light:border-slate-300 focus:border-sky-500/60"
                            }`}
                        />
                        {touched.name && !fieldErrors.name && (
                          <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400 pointer-events-none" />
                        )}
                      </div>
                      <AnimatePresence>
                        {touched.name && fieldErrors.name && (
                          <motion.p
                            key="name-err"
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.2 }}
                            className="mt-1.5 flex items-center gap-1 text-[11px] text-rose-400 font-mono"
                          >
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            {fieldErrors.name}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2"
                      >
                        Email Address <span className="text-sky-400">*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="contact-email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleChange("email", e.target.value)}
                          onBlur={() => handleBlur("email")}
                          placeholder="alex@company.com"
                          className={`w-full px-4 py-3 pr-10 rounded-xl bg-zinc-900/70 dark:bg-zinc-900/70 light:bg-slate-50 border text-white dark:text-white light:text-slate-900 placeholder:text-zinc-600 text-sm focus:outline-none transition-colors ${touched.email && fieldErrors.email
                            ? "border-rose-500/70 focus:border-rose-500"
                            : touched.email && !fieldErrors.email
                              ? "border-emerald-500/60 focus:border-emerald-500"
                              : "border-white/10 dark:border-white/10 light:border-slate-300 focus:border-sky-500/60"
                            }`}
                        />
                        {touched.email && !fieldErrors.email && (
                          <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400 pointer-events-none" />
                        )}
                      </div>
                      <AnimatePresence>
                        {touched.email && fieldErrors.email && (
                          <motion.p
                            key="email-err"
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.2 }}
                            className="mt-1.5 flex items-center gap-1 text-[11px] text-rose-400 font-mono"
                          >
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            {fieldErrors.email}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2"
                    >
                      Subject / Project Scope
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => handleChange("subject", e.target.value)}
                      onBlur={() => handleBlur("subject")}
                      placeholder="e.g. Next.js 15 Web Platform / Freelance Contract"
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900/70 dark:bg-zinc-900/70 light:bg-slate-50 border border-white/10 dark:border-white/10 light:border-slate-300 text-white dark:text-white light:text-slate-900 placeholder:text-zinc-600 text-sm focus:outline-none focus:border-sky-500/60 transition-colors"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-mono uppercase tracking-wider text-zinc-400"
                      >
                        Project Description <span className="text-sky-400">*</span>
                      </label>
                      <span className={`text-[11px] font-mono tabular-nums transition-colors ${formData.message.trim().length >= 20 ? "text-emerald-400" : "text-zinc-500"
                        }`}>
                        {formData.message.trim().length}/20
                      </span>
                    </div>
                    <div className="relative">
                      <textarea
                        id="contact-message"
                        rows={5}
                        value={formData.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        onBlur={() => handleBlur("message")}
                        placeholder="Tell me about your project, timeline, budget, or architectural goals..."
                        className={`w-full px-4 py-3 rounded-xl bg-zinc-900/70 dark:bg-zinc-900/70 light:bg-slate-50 border text-white dark:text-white light:text-slate-900 placeholder:text-zinc-600 text-sm focus:outline-none transition-colors resize-none ${touched.message && fieldErrors.message
                          ? "border-rose-500/70 focus:border-rose-500"
                          : touched.message && !fieldErrors.message
                            ? "border-emerald-500/60 focus:border-emerald-500"
                            : "border-white/10 dark:border-white/10 light:border-slate-300 focus:border-sky-500/60"
                          }`}
                      />
                    </div>
                    <AnimatePresence>
                      {touched.message && fieldErrors.message && (
                        <motion.p
                          key="msg-err"
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.2 }}
                          className="mt-1.5 flex items-center gap-1 text-[11px] text-rose-400 font-mono"
                        >
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          {fieldErrors.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Error banner */}
                  {status === "error" && (
                    <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-mono flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Submit CTA */}
                  <MagneticButton strength={15} className="w-full sm:w-auto">
                    <button
                      id="contact-submit-btn"
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold text-black bg-sky-400 hover:bg-sky-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_30px_rgba(56,189,248,0.35)] transition-all"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Dispatching Message...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </MagneticButton>
                  {/* Hint when form has been touched but is still invalid */}
                  <AnimatePresence>
                    {Object.values(touched).some(Boolean) && !isFormValid && (
                      <motion.p
                        key="form-hint"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-[11px] font-mono text-zinc-500 mt-1"
                      >
                        Please fix the errors above before sending.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
