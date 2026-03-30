"use client";

import {
  motion,
  useInView,
  useAnimation,
  animate,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

import firebaseIcon from "@/assets/firebase.png";
import framerIcon from "@/assets/framer-motion.png";
import laravelIcon from "@/assets/laravel.png";
import pythonIcon from "@/assets/python.png";
import reactIcon from "@/assets/react.png";
import tailwindIcon from "@/assets/tailwind.png";
import viteIcon from "@/assets/vite.png";
import vueIcon from "@/assets/vue.png";

/* -------------------- TYPES -------------------- */

interface TechItem {
  name: string;
  level: number;
  icon: string;
  description: string;
  gradient: string;
}

interface TechCardProps {
  tech: TechItem;
  index: number;
  isInView: boolean;
}

/* -------------------- MAIN SECTION -------------------- */

export function TechStackSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(sectionRef, { once: false }); // 👈 allow re-trigger

  const techStack: TechItem[] = [
    { name: "Laravel", level: 65, icon: laravelIcon, description: "MVC & Backend Systems", gradient: "linear-gradient(90deg, #ff416c, #ff4b2b)" },
    { name: "React", level: 90, icon: reactIcon, description: "Component-Based UI", gradient: "linear-gradient(90deg, #00c6ff, #0072ff)" },
    { name: "Vue", level: 80, icon: vueIcon, description: "Reactive Interfaces", gradient: "linear-gradient(90deg, #42e695, #3bb2b8)" },
    { name: "Vite", level: 85, icon: viteIcon, description: "Fast Frontend Tooling", gradient: "linear-gradient(90deg, #f7971e, #ffd200)" },
    { name: "Tailwind", level: 92, icon: tailwindIcon, description: "Utility-First CSS", gradient: "linear-gradient(90deg, #06beb6, #48b1bf)" },
    { name: "Firebase", level: 75, icon: firebaseIcon, description: "Auth & Firestore", gradient: "linear-gradient(90deg, #f7971e, #ff6a00)" },
    { name: "Python", level: 88, icon: pythonIcon, description: "Backend & Automation", gradient: "linear-gradient(90deg, #32066d, #7a37ff)" },
    { name: "Framer Motion", level: 85, icon: framerIcon, description: "UI Animations", gradient: "linear-gradient(90deg, #ff008c, #7928ca)" },
  ];

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="min-h-screen flex items-center justify-center py-16 px-6"
    >
      <div className="max-w-7xl w-full mx-auto">
        <div className="text-center mb-12">
          <span className="text-[#FF8C00] font-semibold text-lg">
            Development Stack
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
            My <span className="text-[#FF8C00]">Toolkit</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {techStack.map((tech, index) => (
            <TechCard
              key={tech.name}
              tech={tech}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- TECH CARD -------------------- */

function TechCard({ tech, index, isInView }: TechCardProps) {
  const controls = useAnimation();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 1.5;
    const delay = index * 0.1;

    // Reset before animation (for re-trigger)
    controls.set({ width: "0%" });
    setCount(0);

    // Progress bar animation
    controls.start({
      width: `${tech.level}%`,
      transition: {
        duration,
        delay,
        ease: "easeOut",
      },
    });

    // Counter animation
    const counter = animate(0, tech.level, {
      duration,
      delay,
      ease: "easeOut",
      onUpdate(value) {
        setCount(Math.round(value));
      },
    });

    return () => counter.stop();
  }, [isInView, tech.level, index, controls]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      viewport={{ once: false }}
      whileHover={{ y: -6 }}
      className="group rounded-2xl p-5 border border-white/10"
      style={{
        background: "linear-gradient(135deg, #122143, #000105)",
        boxShadow: "12px 12px 30px rgba(0, 0, 0, 0.6)",
      }}
    >
      <div className="flex items-center justify-between mb-4">
        {/* Icon container (fixed alignment) */}
        <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#02070A] via-[#02070A] to-[#1A2636] border border-white/10">
          <img
            src={tech.icon}
            alt={tech.name}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-125"
          />
        </div>

        <h3 className="text-lg font-semibold text-white text-right">
          {tech.name}
        </h3>
      </div>

      {/* Efficiency */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-300 text-sm">Efficiency</span>
        <span className="text-gray-200 text-sm font-semibold">
          {count}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-[#1a2a4a] rounded-full overflow-hidden mb-4">
        <motion.div
          initial={{ width: 0 }}
          animate={controls}
          className="h-full rounded-full"
          style={{ background: tech.gradient }}
        />
      </div>

      <p className="text-gray-400 text-xs">
        {tech.description}
      </p>
    </motion.div>
  );
}