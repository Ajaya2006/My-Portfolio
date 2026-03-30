"use client";

import { motion, useInView } from "framer-motion";
import { CheckCircle, GraduationCap } from "lucide-react";
import { useRef } from "react";

export function ExperienceSection() {
  const experiences = [
    {
      type: "education",
      title: "Higher Secondary Education",
      subtitle: "Science & Technology",
      institution: "Vidyarthee Residential Higher Secondary Education",
      period: "2021 - 2023",
      description:
        "Built a foundation in analytical thinking and problem solving in science and technology.",
      completed: true,
    },
    {
      type: "education",
      title: "Bachelor Degree",
      subtitle: "Computer Science & Engineering",
      institution: "Nalanda Institute Of Technology",
      period: "2023 - Present",
      description:
        "Currently pursuing software development and modern web technologies.",
      completed: false,
    },
  ];

  const timelineRef = useRef(null);

  // 👇 FIX: once:false to allow re-trigger when revisiting section
  const inView = useInView(timelineRef, {
    once: false,
    margin: "-100px",
  });

  return (
    <section
      id="experience"
      className="min-h-screen flex items-center justify-center py-20 px-4 relative"
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: false }} // 👈 FIX
        className="relative max-w-5xl w-full mx-auto rounded-3xl p-8 md:p-12"
      >
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-[#FF8C00] font-semibold text-base">
            My Education
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
            Academic <span className="text-[#FF8C00]">Journey</span>
          </h2>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Base Timeline */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-[#2b2b2b]" />

          {/* Filling Timeline */}
          <motion.div
            className="hidden md:block absolute left-1/2 top-0 w-0.5 bg-gradient-to-b from-[#FF8C00] to-green-500"
            initial={{ height: 0 }}
            animate={inView ? { height: "75%" } : { height: 0 }} // 👈 re-triggers
            transition={{ duration: 2, ease: "easeInOut" }}
          />

          <div className="space-y-10">
            {experiences.map((exp, index) => {
              const isFirst = index === 0;

              return (
                <motion.div
                  key={exp.title}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }} // 👈 FIX
                  transition={{ delay: index * 0.2 }}
                  className={`flex flex-col md:flex-row gap-6 items-center ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Content Card */}
                  <div className="flex-1 w-full">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="bg-gradient-to-br from-[#1A2636] to-[#02070A] rounded-xl p-6 transition-all duration-300"
                    >
                      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#FF8C00]/20 mb-3">
                        <span className="text-[#FF8C00] text-xs font-semibold">
                          {exp.period}
                        </span>
                      </div>

                      <h3 className="text-white text-xl font-bold mb-1">
                        {exp.title}
                      </h3>
                      <h4 className="text-[#FF8C00] text-base font-semibold mb-2">
                        {exp.subtitle}
                      </h4>
                      <p className="text-gray-400 text-sm mb-2">
                        {exp.institution}
                      </p>
                      <p className="text-gray-500 text-sm leading-relaxed">
                        {exp.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Timeline Node */}
                  <div className="relative flex items-center justify-center">
                    {isFirst ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: false }} // 👈 FIX
                        transition={{ duration: 0.5 }}
                        className="w-9 h-9 rounded-full bg-green-500 flex items-center justify-center"
                      >
                        <CheckCircle size={16} className="text-white" />
                      </motion.div>
                    ) : (
                      <motion.div
                        className="w-9 h-9 rounded-full bg-white flex items-center justify-center"
                        animate={
                          inView
                            ? {
                                boxShadow: [
                                  "0 0 0 0 rgba(34,197,94,0.8)",
                                  "0 0 0 12px rgba(34,197,94,0)",
                                ],
                              }
                            : {}
                        }
                        transition={{
                          repeat: Infinity,
                          duration: 1.4,
                        }}
                      >
                        <GraduationCap size={16} className="text-black" />
                      </motion.div>
                    )}

                    {/* Mobile Line */}
                    {index < experiences.length - 1 && (
                      <div className="md:hidden absolute top-9 left-1/2 w-0.5 h-10 bg-gradient-to-b from-[#FF8C00] to-[#2b2b2b] transform -translate-x-1/2" />
                    )}
                  </div>

                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}