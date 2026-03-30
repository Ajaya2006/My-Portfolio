"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Tools", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center pointer-events-none">
      <div
        className={`
          pointer-events-auto
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
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-gray-300 hover:text-[#FF8C00] transition-colors duration-300 relative group text-sm whitespace-nowrap"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF8C00] group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </div>

        {/* Mobile Menu Button with Morph Animation */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white hover:text-[#FF8C00] transition-colors shrink-0 relative w-8 h-8 flex items-center justify-center"
        >
          {/* Hamburger Icon */}
          <Menu
            size={22}
            className={`absolute transition-all duration-300 ease-in-out ${
              isOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
            }`}
          />

          {/* X Icon */}
          <X
            size={22}
            className={`absolute transition-all duration-300 ease-in-out ${
              isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
            }`}
          />
        </button>
      </div>

      {/* Mobile Dropdown with Smooth Height + Fade Animation */}
      <div className="absolute top-full mt-3 w-full flex justify-center md:hidden">
        <div
          className={`
            w-[92%] rounded-[10px] backdrop-blur-md bg-white/10 border border-white/20
            overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
            ${isOpen ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0 py-0"}
          `}
        >
          <div
            className={`
              transition-opacity duration-300
              ${isOpen ? "opacity-100" : "opacity-0"}
            `}
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block py-2 text-gray-300 hover:text-[#FF8C00] transition-colors text-center"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}