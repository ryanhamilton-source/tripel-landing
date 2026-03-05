"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const FEATURES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="4" stroke="#818cf8" strokeWidth="1.5" />
        <circle cx="12" cy="11" r="3" stroke="#818cf8" strokeWidth="1.5" />
        <path d="M6 21c0-2.21 2.69-4 6-4s6 1.79 6 4" stroke="#818cf8" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M15 6l4 4" stroke="#a5b4fc" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Photo Feed & Stories",
    description:
      "Share moments in real-time with your crew. A curated feed of trip photos, stories, and memories that everyone can contribute to.",
    accent: "from-indigo-500/20 to-violet-500/10",
    border: "border-indigo-500/20",
    glow: "rgba(99,102,241,0.15)",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="9" y="3" width="6" height="4" rx="1" stroke="#34d399" strokeWidth="1.5" />
        <path d="M9 12h6M9 16h4" stroke="#6ee7b7" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Smart Trip Planning",
    description:
      "Organise accommodations, transport, and activities in one place. Keep the whole group informed with shared itineraries and daily plans.",
    accent: "from-emerald-500/20 to-teal-500/10",
    border: "border-emerald-500/20",
    glow: "rgba(52,211,153,0.15)",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="#f59e0b" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    title: "Games & Leaderboard",
    description:
      "Keep the fun alive with built-in group games, a points system, and a live leaderboard. Friendly competition makes every trip legendary.",
    accent: "from-amber-500/20 to-orange-500/10",
    border: "border-amber-500/20",
    glow: "rgba(245,158,11,0.15)",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="14" rx="2" stroke="#e879f9" strokeWidth="1.5" />
        <path d="M3 9h18" stroke="#e879f9" strokeWidth="1.5" />
        <path d="M7 13h2M11 13h2M15 13h2" stroke="#f0abfc" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M7 16h4" stroke="#f0abfc" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: "Printed Photo Books",
    description:
      "Turn your best travel photos into a beautifully printed photo book. Professional quality, delivered to your door as a forever keepsake.",
    accent: "from-pink-500/20 to-fuchsia-500/10",
    border: "border-pink-500/20",
    glow: "rgba(232,121,249,0.15)",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

export default function Features() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="features" className="relative py-32 px-6 overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(99,102,241,0.06),transparent)] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-indigo-300 font-medium mb-5 border border-indigo-500/20">
            Everything you need
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Built for how you <span className="gradient-text">actually travel</span>
          </h2>
          <p className="text-white/50 text-lg max-w-lg mx-auto">
            From the first plan to the final print, Tripel keeps your whole group connected.
          </p>
        </motion.div>

        {/* Feature cards grid */}
        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {FEATURES.map((feature) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className={`group relative rounded-2xl glass border ${feature.border} p-7 overflow-hidden cursor-default`}
              whileHover={{ scale: 1.015, transition: { duration: 0.2 } }}
            >
              {/* Card background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.accent} opacity-60 pointer-events-none`}
              />
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                style={{
                  boxShadow: `inset 0 0 40px ${feature.glow}`,
                }}
              />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl glass flex items-center justify-center mb-5">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2.5">
                  {feature.title}
                </h3>
                <p className="text-white/55 text-[15px] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
