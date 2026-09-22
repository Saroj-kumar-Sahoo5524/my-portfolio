import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Skills from "@/components/Skills";

import Experience from "@/components/Experience";
import ProjectCarousel from "@/components/ProjectCarousel";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import WhatsAppFloat from "@/components/WhatsAppFloat";

import ThreeBackground from "@/components/ThreeBackground";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-[#f5f5f5] selection:bg-sky-500/30 selection:text-white transition-colors duration-300">
      {/* Fast Minimal Preloader */}
      <LoadingScreen />

      {/* Interactive Custom Cursor (Desktop Only) */}
      <CustomCursor />

      {/* Global 3D Ambient WebGL Background */}
      <ThreeBackground />

      {/* Subtle Futuristic Grid Texture */}
      <div className="fixed inset-0 pointer-events-none bg-cyber-grid opacity-70 -z-10" />

      {/* Navigation Header */}
      <Navbar />

      {/* Page Content Sections */}
      <main id="main-content">
        <Hero />
        <Stats />
        <About />
        <Skills />

        <Experience />
        <ProjectCarousel />
        <Testimonials />
        <Contact />
      </main>

      {/* Floating WhatsApp Button */}
      <WhatsAppFloat />

      {/* Footer */}
      <Footer />
    </div>
  );
}
