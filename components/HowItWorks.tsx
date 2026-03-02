"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const STEPS = [
  {
    number: "01",
    title: "Create your trip",
    description:
      "Set your destination, dates, and invite your crew with a simple share code. Solo, couple, or group — Tripel adapts to every adventure.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
          fill="#818cf8"
        />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Plan together",
    description:
      "Coordinate flights, accommodation, and activities in one shared view. Tripel handles visa lookups, transport tickets, and daily itineraries.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"
          fill="#818cf8"
        />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Live the moment",
    description:
      "Share photos, play games, track the leaderboard, and capture every memory. When you're back, print a photo book that lasts forever.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          fill="#818cf8"
        />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="how-it-works" className="relative py-32 px-6 overflow-hidden">
      {/* Divider line top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-indigo-500/30" />

      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-indigo-300 font-medium mb-5 border border-indigo-500/20">
            Simple by design
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Up and running in{" "}
            <span className="gradient-text">minutes</span>
          </h2>
          <p className="text-white/50 text-lg max-w-lg mx-auto">
            No complicated setup. Just download, create a trip, and start exploring.
          </p>
        </motion.div>

        {/* Steps */}
        <div ref={ref} className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-10 left-[16.67%] right-[16.67%] h-px">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500/40 via-indigo-400/60 to-indigo-500/40"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
              style={{ transformOrigin: "left" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.number}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 36 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: i * 0.18,
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {/* Step circle */}
                <div className="relative mb-7">
                  <div className="w-20 h-20 rounded-full glass border border-indigo-500/30 flex items-center justify-center glow-indigo-sm">
                    {step.icon}
                  </div>
                  {/* Number badge */}
                  <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-white leading-none">
                      {i + 1}
                    </span>
                  </div>
                </div>

                <div className="text-indigo-400 text-xs font-mono font-semibold tracking-widest mb-2 uppercase">
                  Step {step.number}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-white/50 text-[15px] leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
