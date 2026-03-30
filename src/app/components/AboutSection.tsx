"use client";

import { motion } from "framer-motion";
import { Figma, Palette, Layers, Sparkles } from "lucide-react";
import aboutImage from "@/assets/about.png";

export function AboutSection() {
  const skills = [
    {
      icon: <Figma size={28} />,
      title: "UI/UX Design",
      description: "Creating beautiful and intuitive user experiences",
    },
    {
      icon: <Palette size={28} />,
      title: "Visual Design",
      description: "Crafting compelling visual identities and brands",
    },
    {
      icon: <Layers size={28} />,
      title: "Design Systems",
      description: "Building scalable and consistent design frameworks",
    },
    {
      icon: <Sparkles size={28} />,
      title: "Prototyping",
      description: "Bringing ideas to life with interactive prototypes",
    },
  ];

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center py-20 px-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: false }} // 👈 FIX: allow animation every view
        className="relative w-full max-w-7xl p-10"
      >
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* LEFT SIDE - ABOUT IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }} // 👈 FIX
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <motion.div
              className="relative w-full max-w-xl"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.4 }}
            >
              <div className="absolute inset-0 bg-[#FF8C00]/10 blur-3xl rounded-3xl -z-10 scale-105" />

              <motion.img
                src={aboutImage}
                alt="About"
                className="w-full object-contain rounded-3xl"
                style={{ transform: "perspective(1200px) rotateY(-6deg)" }}
                whileHover={{ rotateY: 0 }}
                transition={{ duration: 0.4 }}
              />

              <div className="absolute bottom-0 left-0 w-full h-48 pointer-events-none bg-gradient-to-t from-[#02070A] via-[#02070A]/80 to-transparent rounded-b-3xl" />
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE - ABOUT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }} // 👈 FIX
            transition={{ duration: 0.8 }}
          >
            <div className="mb-4">
              <span className="text-[#FF8C00] font-semibold text-lg">
                Get to know me
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              About <span className="text-[#FF8C00]">Me</span>
            </h2>

            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              I'm a passionate UI/UX designer with a love for creating
              exceptional digital experiences. With expertise in user research,
              interaction design, and visual communication, I transform complex
              problems into elegant, user-friendly solutions.
            </p>

            {/* SKILLS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }} // 👈 FIX
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="rounded-2xl p-6 transition-all duration-300 border border-white/5"
                  style={{
                    background: "linear-gradient(180deg, #1A2636 0%, #02070A 100%)",
                  }}
                >
                  <div className="text-[#FF8C00] mb-3">{skill.icon}</div>
                  <h3 className="text-white font-semibold text-lg mb-2">
                    {skill.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{skill.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}