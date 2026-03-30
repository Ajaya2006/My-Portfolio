import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Loader from "./components/ui/Loader";
import Particles from "../imports/Particles";

import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { AboutSection } from "./components/AboutSection";
import { TechStackSection } from "./components/TechStackSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { ContactSection } from "./components/ContactSection";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setShowContent(true), 150);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-transparent">

      {/* 🌈 RGB PARTICLES BACKGROUND */}
      <Particles className="z-0" />

      {/* Main Content */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            key="content"
            className="relative z-10"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <Navigation />
            <HeroSection />
            <AboutSection />
            <TechStackSection />
            <ExperienceSection />
            <ProjectsSection />
            <ContactSection />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loader Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[9999]"
            style={{
              background: 'linear-gradient(135deg, #0f172a, #1e293b)', // matches Loader background
            }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Loader />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}