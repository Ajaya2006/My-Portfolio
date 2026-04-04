"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Eye, X } from "lucide-react";

import profile from "@/assets/profile.png";
import githubIcon from "@/assets/Github.png";
import linkedinIcon from "@/assets/Linkedin.png";
import facebookIcon from "@/assets/Facebook.png";
import instagramIcon from "@/assets/Instagram.png";

export function HeroSection() {
  const [openResume, setOpenResume] = useState(false);

  const socialLinks = [
    { id: "github", icon: githubIcon, url: "https://github.com/Ajaya2006", alt: "GitHub" },
    { id: "linkedin", icon: linkedinIcon, url: "https://www.linkedin.com/in/ajaya-kumar-sahoo-066a18321", alt: "LinkedIn" },
    { id: "facebook", icon: facebookIcon, url: "https://www.facebook.com/share/1BFU1vfwa8", alt: "Facebook" },
    { id: "instagram", icon: instagramIcon, url: "https://www.instagram.com/_.ajaya._.45?igsh=bWV5YWJiZDBtdXpv", alt: "Instagram" },
  ];

  return (
    <>
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center pt-24 px-6"
      >
        {/* Frosted Glass Container */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative w-full max-w-7xl p-10"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* LEFT CONTENT */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-4 py-2 mb-6 bg-[#1A2636] rounded-full">
                <span className="text-[#FF8C00]">👋 Welcome to my Portfolio</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
                Hi, I'm <span className="text-[#FF8C00]">Ajaya</span>
              </h1>

              <h2 className="text-2xl md:text-3xl text-gray-300 mb-6">
                UI/UX Designer & Creative Strategist
              </h2>

              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                I craft beautiful, intuitive digital experiences. Specializing in
                user-centered design and beautiful interfaces.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <a
                  href="#projects"
                  className="px-8 py-3 bg-[#FF8C00] text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                >
                  View Portfolio
                </a>

                {/* Combined Resume Button */}
                <div className="flex items-center overflow-hidden rounded-lg border-2 border-[#FF8C00] text-[#FF8C00]">
                  {/* View Resume */}
                  <button
                    onClick={() => setOpenResume(true)}
                    className="px-4 py-3 hover:bg-[#FF8C00] hover:text-white transition-all duration-300 flex items-center justify-center"
                    aria-label="Preview Resume"
                  >
                    <Eye size={20} />
                  </button>

                  {/* Divider */}
                  <div className="h-6 w-px bg-gradient-to-b from-transparent via-[#FF8C00]/60 to-transparent" />

                  {/* Download Resume */}
                  <a
                    href="/Resume.pdf"
                    download="Resume.pdf"
                    className="px-6 py-3 font-semibold hover:bg-[#FF8C00] hover:text-white transition-all duration-300"
                  >
                    Download Resume
                  </a>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                  >
                    <img
                      src={social.icon}
                      alt={social.alt}
                      className="w-9 h-9 transition-transform duration-300 hover:scale-110"
                    />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* RIGHT CONTENT - PROFILE IMAGE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="relative w-full max-w-xl"
              >
                {/* Glow Background */}
                <div className="absolute inset-0 bg-[#FF8C00]/10 blur-3xl rounded-full scale-110 -z-10" />

                {/* Profile Image */}
                <img
                  src={profile}
                  alt="Ajaya Profile"
                  className="w-full h-auto object-contain"
                />

                {/* Bottom Vignette Fade */}
                <div className="absolute bottom-0 left-0 w-full h-48 pointer-events-none bg-gradient-to-t from-[#02070A] via-[#02070A]/80 to-transparent rounded-b-3xl" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Resume Popup Modal */}
      {openResume && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md px-4"
          onClick={() => setOpenResume(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl h-[90vh] bg-[#0B1118] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          >
            {/* Close Button */}
            <button
              onClick={() => setOpenResume(false)}
              className="absolute top-4 right-4 z-10 bg-black/60 text-white p-2 rounded-full hover:bg-[#FF8C00] transition-all duration-300"
              aria-label="Close Resume Preview"
            >
              <X size={22} />
            </button>

            {/* PDF Viewer */}
            <iframe
              src="/Resume.pdf"
              title="Resume Preview"
              className="w-full h-full rounded-2xl"
            />
          </motion.div>
        </div>
      )}
    </>
  );
}