"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");

  const navItems = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Tools", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  // Scroll navbar effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section detection
  useEffect(() => {
    const sections = navItems.map((item) =>
      document.querySelector(item.href)
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      {
        threshold: 0.6,
      }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    setActiveSection(href);

    const section = document.querySelector(href);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center">
      <div className="relative w-full flex justify-center">
        {/* Main Navbar */}
        <div
          className={`
            transition-all duration-500 ease-out
            rounded-[10px]
            flex items-center justify-between
            w-[92%] max-w-7xl
            ${
              isScrolled
                ? "px-8 py-3 scale-[0.92] backdrop-blur-md bg-white/10 border border-white/20 shadow-xl"
                : "px-10 py-4 scale-100 bg-gradient-to-br from-[#1A2636] to-[#02070A]"
            }
          `}
        >
          {/* Logo */}
          <div className="flex items-center shrink-0">
            <img
              src={logo}
              alt="Ajaya Logo"
              className="h-9 w-auto object-contain"
            />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = activeSection === item.href;

              return (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`relative text-sm whitespace-nowrap transition-colors duration-300 ${
                    isActive
                      ? "text-[#FF8C00]"
                      : "text-gray-300 hover:text-[#FF8C00]"
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-[#FF8C00] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-[#FF8C00] transition-colors shrink-0 relative w-8 h-8 flex items-center justify-center"
          >
            <Menu
              size={22}
              className={`absolute transition-all duration-300 ease-in-out ${
                isOpen
                  ? "opacity-0 rotate-90 scale-50"
                  : "opacity-100 rotate-0 scale-100"
              }`}
            />
            <X
              size={22}
              className={`absolute transition-all duration-300 ease-in-out ${
                isOpen
                  ? "opacity-100 rotate-0 scale-100"
                  : "opacity-0 -rotate-90 scale-50"
              }`}
            />
          </button>
        </div>

        {/* Mobile Dropdown */}
        <div className="absolute top-full mt-3 w-full flex justify-center md:hidden">
          <div
            className={`
              w-[92%] rounded-[10px] backdrop-blur-md bg-white/10 border border-white/20
              overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
              ${isOpen ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0 py-0"}
            `}
          >
            <div
              className={`transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              {navItems.map((item) => {
                const isActive = activeSection === item.href;

                return (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className={`block w-full py-3 text-center transition-colors duration-300 ${
                      isActive
                        ? "text-[#FF8C00] font-medium"
                        : "text-gray-300 hover:text-[#FF8C00]"
                    }`}
                  >
                    {item.name}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}