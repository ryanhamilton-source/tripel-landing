"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0d0d14]/80 backdrop-blur-xl border-b border-white/[0.06] shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <Image src="/icon.png" alt="Tripel" width={100} height={100} className="transition-transform duration-200 group-hover:scale-110 shrink-0" />
          <span className="text-white font-bold text-3xl tracking-tight">
            Tripel
          </span>
        </a>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          {["Features", "How it works", "Photo Books", "Download"].map((item) => (
            <a
              key={item}
              href={item === "Photo Books" ? "#photo-books" : `#${item.toLowerCase().replace(/ /g, "-")}`}
              className={`text-sm font-medium transition-colors duration-200 ${
                item === "Download"
                  ? "text-white"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {item === "Download" ? null : item}
            </a>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          <a
            href="https://tripel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:block text-sm font-medium text-white/60 hover:text-white transition-colors duration-200"
          >
            Log in ↗
          </a>
          <a
            href="#download"
            className="group relative px-5 py-2 rounded-full bg-indigo-500 text-white text-sm font-semibold overflow-hidden transition-all duration-200 hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/30 active:scale-95"
          >
            <span className="relative z-10">Download App</span>
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
