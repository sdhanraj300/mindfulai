"use client";

import { BackgroundLines } from "@/components/ui/background-lines";
import { GradientBackground } from "@/components/ui/gradient-background";
import { Sidebar } from "@/components/Sidebar";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState } from "react";
import { HeroSection } from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import ResourcesSection from "@/components/home/ResourcesSection";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="relative min-h-screen overflow-hidden">
        {/* Background layers with proper z-index */}
        <GradientBackground className="fixed inset-0 z-0" />
        <BackgroundLines className="fixed inset-0 z-10 pointer-events-none" />

        {/* Main content */}
        <div className="relative z-20 font-mono">
          {/* Floating theme toggle */}
          <div className="fixed top-4 right-4 z-50">
            <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg p-1 shadow-lg border border-purple-100 dark:border-purple-800">
              <ThemeToggle />
            </div>
          </div>

          <HeroSection />
          <FeaturesSection />
          <ResourcesSection />
          <CTASection />
          <Footer />
        </div>
      </div>
    </>
  );
}
