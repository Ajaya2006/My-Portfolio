"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { FastAverageColor } from "fast-average-color";

import bankingImg from "@/assets/banking.png";
import ecomImg from "@/assets/ecom.png";
import weatherImg from "@/assets/weather.png";
import portfolioImg from "@/assets/portfolio.png";
import originOSImg from "@/assets/originos.png";

export function ProjectsSection() {
  const projects = [
    {
      id: 1,
      title: "Mobile Banking App",
      description:
        "Secure banking experience with intuitive dashboard and transaction tracking.",
      image: bankingImg,
      demo: "#",
      code: "#",
      tech: ["React", "Tailwind", "Framer Motion"],
    },
    {
      id: 2,
      title: "ShopX",
      description:
        "Smart filtering, cart system, and optimized checkout experience.",
      image: ecomImg,
      demo: "https://shop-x-sage.vercel.app/",
      code: "https://github.com/Ajaya2006/shopX",
      tech: ["Next.js", "Stripe", "Node.js"],
    },
    {
      id: 3,
      title: "Weather Forecast Site",
      description:
        "Real-time weather updates with animated forecast and location-based data.",
      image: weatherImg,
      demo: "https://weather-site-skyline-ui.vercel.app",
      code: "https://github.com/Ajaya2006/weather-site",
      tech: ["React", "Weather API", "Charts"],
    },
    {
      id: 4,
      title: "My Portfolio",
      description:
        "Personal portfolio built with React, Tailwind, and Framer Motion showcasing interactive UI and animations.",
      image: portfolioImg,
      demo: "#",
      code: "#",
      tech: ["React", "Tailwind", "Framer Motion"],
    },
    {
      id: 5,
      title: "OriginWEB OS",
      description:
        "Secure banking experience with intuitive dashboard and transaction tracking.",
      image: originOSImg,
      demo: "https://origin-os-sage.vercel.app/",
      code: "https://github.com/Ajaya2006/OriginOS",
      tech: ["HTML", "CSS", "JavaScript"],
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [accentColor, setAccentColor] = useState("rgb(255,255,255)");

  const imgRef = useRef<HTMLImageElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const inView = useInView(sectionRef, { once: false });
  const active = projects[activeIndex];

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const fac = new FastAverageColor();

    const handleLoad = async () => {
      const color = await fac.getColorAsync(img);
      const [r, g, b] = color.value;
      setAccentColor(`rgb(${r},${g},${b})`);
    };

    if (img.complete) handleLoad();
    else img.addEventListener("load", handleLoad);

    return () => img?.removeEventListener("load", handleLoad);
  }, [activeIndex]);

  return (
    <section
      ref={sectionRef}
      id ="projects"
      className="relative min-h-[90vh] flex flex-col justify-center px-6 py-16"
    >
      {/* Section Header (re-animates on revisit) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-white">
            Featured <span className="text-orange-400">Projects</span>
          </h2>
          <p className="text-white/70 mt-5 max-w-xl mx-auto">
            Selected works crafted with focus on performance, design, and immersive interaction.
          </p>
        </div>
      </motion.div>

      {/* Main container (re-animates on revisit) */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto w-full grid md:grid-cols-3 gap-8"
      >
        {/* LEFT SELECTOR */}
        <div className="space-y-3">
          {projects.map((project, index) => {
            const isActive = activeIndex === index;

            return (
              <motion.button
                key={project.id}
                onClick={() => setActiveIndex(index)}
                whileHover={{ scale: 1.02 }}
                className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-white/10 backdrop-blur-md border border-white/20 text-white"
                    : "bg-white/5 hover:bg-white/10 text-white/60"
                }`}
              >
                {project.title}
              </motion.button>
            );
          })}
        </div>

        {/* RIGHT CONTENT */}
        <div className="md:col-span-2 max-w-[680px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4 }}
              className="relative backdrop-blur-2xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl"
              style={{
                boxShadow: `0 15px 45px ${accentColor}35`,
              }}
            >
              {/* Image */}
              <div className="rounded-2xl overflow-hidden mb-5">
                <img
                  ref={imgRef}
                  src={active.image}
                  alt={active.title}
                  className="w-full h-[240px] object-cover"
                />
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white mb-3">
                {active.title}
              </h3>

              {/* Description */}
              <p className="text-white/70 mb-5 text-sm">
                {active.description}
              </p>

              {/* Buttons */}
              <div className="flex gap-3 mb-5">
                <a
                  href={active.demo}
                  className="px-5 py-2 text-sm rounded-lg font-semibold flex items-center gap-2 transition hover:scale-105"
                  style={{
                    background: accentColor,
                    color: "#000",
                  }}
                >
                  <ExternalLink size={15} />
                  Live Demo
                </a>

                <a
                  href={active.code}
                  className="px-5 py-2 text-sm rounded-lg font-semibold flex items-center gap-2 border transition hover:scale-105 text-white"
                  style={{
                    borderColor: accentColor,
                  }}
                >
                  <Github size={15} />
                  Source Code
                </a>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-2">
                {active.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs rounded-full border backdrop-blur-md"
                    style={{
                      borderColor: accentColor,
                      color: accentColor,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}