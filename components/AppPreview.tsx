"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function PhoneMockup({
  gradient,
  delay,
  rotate,
  translateY,
  screen,
}: {
  gradient: string;
  delay: number;
  rotate: number;
  translateY: number;
  screen: React.ReactNode;
}) {
  return (
    <motion.div
      className="relative shrink-0"
      initial={{ opacity: 0, y: 60, rotate: rotate - 4 }}
      whileInView={{ opacity: 1, y: translateY, rotate }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotate }}
    >
      {/* Phone shell */}
      <div className="relative w-48 h-96 rounded-[2.4rem] bg-[#1a1a2e] border-[2px] border-white/10 shadow-2xl shadow-black/50 overflow-hidden">
        {/* Notch */}
        <div className="absolute top-3.5 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#0d0d14] rounded-full z-10" />

        {/* Screen content */}
        <div
          className={`absolute inset-0 ${gradient} flex flex-col overflow-hidden`}
        >
          {screen}
        </div>

        {/* Screen glare */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Phone glow */}
      <div
        className="absolute inset-0 rounded-[2.4rem] opacity-30 blur-xl -z-10 scale-95"
        style={{ background: gradient.replace("bg-gradient-to-b", "") }}
      />
    </motion.div>
  );
}

const SCREEN_FEED = (
  <div className="pt-14 px-4 flex flex-col gap-3">
    <div className="text-white text-xs font-semibold mb-1 opacity-80">Trip Feed</div>
    {/* Photo cards */}
    {[
      { bg: "from-indigo-600/80 to-violet-800/80", label: "Sunset in Bali 🌅", likes: "24" },
      { bg: "from-emerald-600/70 to-teal-800/80", label: "Rice terraces 🌿", likes: "18" },
      { bg: "from-amber-600/70 to-orange-800/80", label: "Street food 🍜", likes: "31" },
    ].map((card) => (
      <div key={card.label} className={`w-full h-20 rounded-xl bg-gradient-to-br ${card.bg} flex flex-col justify-end p-2.5`}>
        <div className="text-white text-[10px] font-medium">{card.label}</div>
        <div className="text-white/50 text-[9px]">♥ {card.likes} likes</div>
      </div>
    ))}
  </div>
);

const SCREEN_PLANNING = (
  <div className="pt-14 px-4 flex flex-col gap-2">
    <div className="text-white text-xs font-semibold mb-1 opacity-80">Trip Plan</div>
    {/* Planning items */}
    {[
      { icon: "✈️", label: "SYD → DPS", sub: "Mar 15 · Emirates", color: "bg-indigo-500/20 border-indigo-500/30" },
      { icon: "🏨", label: "Four Seasons Bali", sub: "5 nights · Confirmed", color: "bg-emerald-500/20 border-emerald-500/30" },
      { icon: "🗺️", label: "Visa: Indonesia", sub: "30 days on arrival", color: "bg-amber-500/20 border-amber-500/30" },
      { icon: "🎯", label: "Surfing lesson", sub: "Mar 16 · 9:00 AM", color: "bg-pink-500/20 border-pink-500/30" },
    ].map((item) => (
      <div
        key={item.label}
        className={`flex items-center gap-2.5 px-2.5 py-2 rounded-lg border ${item.color}`}
      >
        <span className="text-base">{item.icon}</span>
        <div>
          <div className="text-white text-[10px] font-semibold leading-tight">{item.label}</div>
          <div className="text-white/40 text-[9px]">{item.sub}</div>
        </div>
      </div>
    ))}
  </div>
);

const SCREEN_LEADERBOARD = (
  <div className="pt-14 px-4 flex flex-col">
    <div className="text-white text-xs font-semibold mb-3 opacity-80">Leaderboard 🏆</div>
    {/* Players */}
    {[
      { rank: "1", name: "Ryan H.", pts: "420", medal: "🥇" },
      { rank: "2", name: "Jake M.", pts: "385", medal: "🥈" },
      { rank: "3", name: "Emma K.", pts: "310", medal: "🥉" },
      { rank: "4", name: "Sophie T.", pts: "280", medal: "" },
    ].map((player, i) => (
      <div
        key={player.name}
        className={`flex items-center gap-2 py-2.5 ${i < 3 ? "border-b border-white/[0.06]" : ""}`}
      >
        <span className="text-sm w-5">{player.medal || `${player.rank}.`}</span>
        <div className="w-6 h-6 rounded-full bg-indigo-500/30 flex items-center justify-center text-[9px] text-indigo-300 font-bold">
          {player.name[0]}
        </div>
        <span className="text-white text-[11px] flex-1 font-medium">{player.name}</span>
        <span className="text-indigo-300 text-[11px] font-bold">{player.pts} pts</span>
      </div>
    ))}
  </div>
);

export default function AppPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(99,102,241,0.08),transparent)] pointer-events-none" />

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
            See it in action
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Beautiful on every{" "}
            <span className="gradient-text">screen</span>
          </h2>
          <p className="text-white/50 text-lg max-w-lg mx-auto">
            Designed from the ground up for mobile. Smooth, fast, and delightful to use.
          </p>
        </motion.div>

        {/* Phone mockups */}
        <div
          ref={ref}
          className="flex items-end justify-center gap-4 md:gap-6 py-8"
        >
          <PhoneMockup
            gradient="bg-gradient-to-b from-[#1e1b4b] to-[#0d0d14]"
            delay={0}
            rotate={-6}
            translateY={20}
            screen={SCREEN_FEED}
          />
          <PhoneMockup
            gradient="bg-gradient-to-b from-[#0f172a] to-[#0d0d14]"
            delay={0.12}
            rotate={0}
            translateY={0}
            screen={SCREEN_PLANNING}
          />
          <PhoneMockup
            gradient="bg-gradient-to-b from-[#1e1b4b] to-[#0d0d14]"
            delay={0.24}
            rotate={6}
            translateY={20}
            screen={SCREEN_LEADERBOARD}
          />
        </div>

        {/* Stats row */}
        <motion.div
          className="flex flex-wrap justify-center gap-10 mt-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {[
            { value: "10k+", label: "Trips created" },
            { value: "4.9★", label: "App Store rating" },
            { value: "50k+", label: "Photos shared" },
            { value: "120+", label: "Countries explored" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
              <div className="text-white/40 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
