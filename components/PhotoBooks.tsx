"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";

const PLANS = [
  {
    name: "Short Trip",
    pages: "24–30 pages",
    price: "$50",
    suffix: "",
    description: "Perfect for a weekend getaway or a short city break.",
    features: ["11.7\" large square hardcover", "Premium gloss finish", "Worldwide shipping", "Trip stats cover page"],
    highlight: false,
  },
  {
    name: "Adventure",
    pages: "31–100 pages",
    price: "$60",
    suffix: "",
    description: "The sweet spot for a week-long trip.",
    features: ["11.7\" large square hardcover", "Premium gloss finish", "Worldwide shipping", "Trip stats cover page", "Lay-flat binding"],
    highlight: true,
  },
  {
    name: "Epic Journey",
    pages: "101–300 pages",
    price: "$150",
    suffix: "",
    description: "For the big trips that deserve every single photo.",
    features: ["11.7\" large square hardcover", "Premium gloss finish", "Worldwide shipping", "Trip stats cover page", "Lay-flat binding"],
    highlight: false,
  },
];

// Travel-themed photo book page spreads
const PAGE_SPREADS = [
  {
    label: "Day 1 · Arrival",
    left: {
      layout: "hero",
      bg: "from-cyan-400 via-sky-500 to-blue-600",
      emoji: "🏖️",
      location: "Kuta Beach",
      caption: "First swim of the trip",
    },
    right: {
      layout: "duo",
      photos: [
        { bg: "from-emerald-400 to-teal-600", emoji: "🌴", label: "Palm grove" },
        { bg: "from-amber-400 to-orange-500", emoji: "🌅", label: "Golden hour" },
      ],
      note: "Ubud, Bali",
    },
  },
  {
    label: "Day 4 · The Group",
    left: {
      layout: "trio",
      photos: [
        { bg: "from-violet-500 to-purple-700", emoji: "🛵", label: "Scooter crew" },
        { bg: "from-rose-400 to-pink-600", emoji: "🍹", label: "Cocktails" },
        { bg: "from-sky-400 to-blue-600", emoji: "🤿", label: "Snorkelling" },
      ],
      note: "Nusa Penida",
    },
    right: {
      layout: "hero",
      bg: "from-orange-400 via-rose-500 to-pink-700",
      emoji: "📸",
      location: "Group Shot",
      caption: "The whole squad at Kelingking",
    },
  },
  {
    label: "Trip Stats",
    left: {
      layout: "stats",
      stats: [
        { icon: "📍", value: "6", label: "Locations" },
        { icon: "📷", value: "847", label: "Photos" },
        { icon: "🗓️", value: "14", label: "Days" },
        { icon: "👥", value: "6", label: "Travellers" },
      ],
    },
    right: {
      layout: "hero",
      bg: "from-indigo-500 via-violet-600 to-purple-800",
      emoji: "🏆",
      location: "Best moments",
      caption: "Leaderboard winner: Ryan H.",
    },
  },
];

function BookMockup() {
  const [isOpen, setIsOpen] = useState(false);
  const [spreadIdx, setSpreadIdx] = useState(0);

  const handleOpen = () => {
    setIsOpen(true);
    setSpreadIdx(0);
  };
  const handleClose = () => setIsOpen(false);
  const nextSpread = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSpreadIdx((i) => (i + 1) % PAGE_SPREADS.length);
  };

  const spread = PAGE_SPREADS[spreadIdx];

  return (
    <div
      className="relative mx-auto cursor-pointer select-none"
      style={{ perspective: "1000px", width: isOpen ? "340px" : "260px", height: "320px", transition: "width 0.6s cubic-bezier(0.22,1,0.36,1)" }}
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      onClick={() => setIsOpen((v) => !v)}
    >
      {/* Hint label */}
      <motion.div
        className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-white/30 text-xs whitespace-nowrap pointer-events-none"
        animate={{ opacity: isOpen ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        hover to open ↗
      </motion.div>

      {/* Dynamic shadow */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-black/40 blur-xl rounded-full h-5"
        animate={{ width: isOpen ? "280px" : "180px", opacity: isOpen ? 0.5 : 0.4 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Book group */}
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: isOpen ? -4 : -18, rotateX: isOpen ? 1 : 4 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Spine */}
        <div
          className="absolute left-0 top-0 h-full w-8 rounded-l-sm"
          style={{
            transform: "rotateY(-90deg) translateZ(4px) translateX(-16px)",
            background: "linear-gradient(180deg, #4338ca 0%, #3730a3 100%)",
          }}
        />

        {/* Back cover */}
        <div
          className="absolute inset-0 rounded-r-md rounded-l-sm"
          style={{ transform: "translateZ(-6px)", background: "#312e81" }}
        />

        {/* Pages stack */}
        <div
          className="absolute inset-y-1 left-7 right-0"
          style={{
            transform: "translateZ(-2px)",
            background: "repeating-linear-gradient(to bottom, #f8f8f0 0px, #f8f8f0 1px, #e8e8e0 1px, #e8e8e0 2px)",
          }}
        />

        {/* ── Inner spread (visible when open) ── */}
        <motion.div
          className="absolute inset-0 rounded-r-md overflow-hidden flex flex-col"
          style={{ transform: "translateZ(-1px)" }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3, delay: isOpen ? 0.25 : 0 }}
        >
          {/* Spread day label */}
          <div className="bg-[#f5f4f0] border-b border-gray-200 px-2 py-0.5 flex items-center justify-between shrink-0">
            <span className="text-[7px] font-semibold text-gray-400 uppercase tracking-widest">{spread.label}</span>
            <button
              onClick={nextSpread}
              className="flex items-center gap-0.5 text-[7px] text-indigo-400 font-semibold hover:text-indigo-600 transition-colors"
            >
              next
              <svg width="8" height="8" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Pages */}
          <div className="flex flex-1 overflow-hidden">
            {/* Left page */}
            <div className="w-1/2 h-full bg-[#fafaf8] border-r border-gray-200 p-1.5 flex flex-col gap-1">
              {spread.left.layout === "hero" && (() => {
                const p = spread.left as { layout: "hero"; bg: string; emoji: string; location: string; caption: string };
                return (
                  <div className={`flex-1 rounded-sm bg-gradient-to-br ${p.bg} flex flex-col justify-between p-2`}>
                    <span className="text-lg leading-none">{p.emoji}</span>
                    <div>
                      <p className="text-white/60 text-[7px] font-medium uppercase tracking-wider">{p.location}</p>
                      <p className="text-white text-[8px] font-semibold leading-tight">{p.caption}</p>
                    </div>
                  </div>
                );
              })()}
              {spread.left.layout === "trio" && (() => {
                const p = spread.left as { layout: "trio"; photos: { bg: string; emoji: string; label: string }[]; note: string };
                return (
                  <>
                    <div className="flex gap-1 flex-1">
                      {p.photos.slice(0, 2).map((ph, i) => (
                        <div key={i} className={`flex-1 rounded-sm bg-gradient-to-br ${ph.bg} flex flex-col justify-between p-1`}>
                          <span className="text-sm leading-none">{ph.emoji}</span>
                          <p className="text-white/80 text-[6px] font-medium">{ph.label}</p>
                        </div>
                      ))}
                    </div>
                    <div className={`h-16 rounded-sm bg-gradient-to-br ${p.photos[2].bg} flex items-end justify-between p-1`}>
                      <span className="text-sm leading-none">{p.photos[2].emoji}</span>
                      <p className="text-white/80 text-[6px] font-medium">{p.photos[2].label}</p>
                    </div>
                    <p className="text-gray-300 text-[6px] text-right font-medium">{p.note}</p>
                  </>
                );
              })()}
              {spread.left.layout === "stats" && (() => {
                const p = spread.left as { layout: "stats"; stats: { icon: string; value: string; label: string }[] };
                return (
                  <div className="flex-1 flex flex-col justify-center gap-1.5 px-1">
                    <p className="text-[7px] font-bold text-gray-500 uppercase tracking-widest mb-1">Trip summary</p>
                    {p.stats.map((s, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <span className="text-sm w-5 text-center leading-none">{s.icon}</span>
                        <div>
                          <p className="text-[10px] font-bold text-gray-700 leading-none">{s.value}</p>
                          <p className="text-[6px] text-gray-400 font-medium">{s.label}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>

            {/* Right page */}
            <div className="w-1/2 h-full bg-[#fafaf8] p-1.5 flex flex-col gap-1">
              {spread.right.layout === "hero" && (() => {
                const p = spread.right as { layout: "hero"; bg: string; emoji: string; location: string; caption: string };
                return (
                  <div className={`flex-1 rounded-sm bg-gradient-to-br ${p.bg} flex flex-col justify-between p-2`}>
                    <span className="text-lg leading-none">{p.emoji}</span>
                    <div>
                      <p className="text-white/60 text-[7px] font-medium uppercase tracking-wider">{p.location}</p>
                      <p className="text-white text-[8px] font-semibold leading-tight">{p.caption}</p>
                    </div>
                  </div>
                );
              })()}
              {spread.right.layout === "duo" && (() => {
                const p = spread.right as { layout: "duo"; photos: { bg: string; emoji: string; label: string }[]; note: string };
                return (
                  <>
                    {p.photos.map((ph, i) => (
                      <div key={i} className={`flex-1 rounded-sm bg-gradient-to-br ${ph.bg} flex items-end justify-between p-1.5`}>
                        <span className="text-sm leading-none">{ph.emoji}</span>
                        <p className="text-white/80 text-[6px] font-medium">{ph.label}</p>
                      </div>
                    ))}
                    <p className="text-gray-300 text-[6px] text-right font-medium">{p.note}</p>
                  </>
                );
              })()}
            </div>
          </div>
        </motion.div>

        {/* ── Front cover — swings open on hover ── */}
        <motion.div
          className="absolute inset-0 rounded-r-md rounded-l-sm overflow-hidden"
          style={{ transformOrigin: "left center", transformStyle: "preserve-3d" }}
          animate={{ rotateY: isOpen ? -145 : 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Cover face */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-900">
            {/* Photo collage grid */}
            <div className="absolute inset-3 grid grid-cols-2 grid-rows-3 gap-1 opacity-80">
              {[
                "from-amber-400/70 to-orange-500/70",
                "from-emerald-400/70 to-teal-500/70",
                "from-sky-400/70 to-blue-500/70",
                "from-pink-400/70 to-rose-500/70",
                "from-violet-400/70 to-purple-500/70",
                "from-yellow-400/70 to-amber-500/70",
              ].map((g, i) => (
                <div key={i} className={`rounded-sm bg-gradient-to-br ${g}`} />
              ))}
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/85 via-transparent to-indigo-900/20" />

            {/* Tripel logo + name — top left */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-md overflow-hidden">
                <Image src="/icon.png" alt="Tripel" width={24} height={24} className="w-full h-full object-cover" />
              </div>
              <span className="text-white text-[9px] font-bold tracking-wide drop-shadow">Tripel</span>
            </div>

            {/* Trip details — bottom */}
            <div className="absolute bottom-4 left-3 right-3">
              <p className="text-white/55 text-[8px] uppercase tracking-widest font-medium mb-0.5">Bali 2025</p>
            </div>
          </div>

          {/* Cover back face (visible when swung open) */}
          <div
            className="absolute inset-0 bg-[#e8e8e0]"
            style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function PhotoBooks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="photo-books" className="relative py-32 px-6 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(99,102,241,0.1),transparent)] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent to-indigo-500/30" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-indigo-300 font-medium mb-5 border border-indigo-500/20">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-indigo-400">
              <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
            </svg>
            Printed memories
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Your trip. Printed.{" "}
            <span className="gradient-text">Forever.</span>
          </h2>
          <p className="text-white/50 text-lg max-w-lg mx-auto">
            Turn your Tripel photos into a professional hardcover photo book, printed and shipped directly to your door.
          </p>
        </motion.div>

        {/* Two-column: book mockup + features */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Book mockup */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-8"
          >
            {/* Extra space so the book has room to open rightward */}
            <div className="relative w-full flex justify-center pb-8" style={{ minHeight: "360px" }}>
              <div className="absolute" style={{ top: "20px" }}>
                <BookMockup />
              </div>
            </div>

            {/* Quality badges */}
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { icon: "🖨️", label: "11.7\" large square" },
                { icon: "📦", label: "Worldwide shipping" },
                { icon: "🔒", label: "Lay-flat binding" },
                { icon: "✨", label: "Premium gloss" },
              ].map((badge) => (
                <div key={badge.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass border border-white/[0.07] text-xs text-white/60 font-medium">
                  <span>{badge.icon}</span>
                  {badge.label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* How it works */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6"
          >
            <h3 className="text-2xl font-bold text-white">
              From camera roll to coffee table
            </h3>
            <p className="text-white/50 leading-relaxed">
              Tripel automatically curates the best photos from your trip. You pick your favourites, we handle the rest — layout, printing, and delivery.
            </p>

            <div className="flex flex-col gap-5 mt-2">
              {[
                {
                  step: "01",
                  title: "Select your photos",
                  desc: "Pick from your trip's shared photo feed — or let Tripel suggest the highlights.",
                },
                {
                  step: "02",
                  title: "We lay it out",
                  desc: "A trip stats cover page is auto-generated, followed by your photos in chronological order.",
                },
                {
                  step: "03",
                  title: "Printed & shipped",
                  desc: "Your 11.7\" large square hardcover is printed by Prodigi's global network and delivered in 5–10 days.",
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="shrink-0 w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center">
                    <span className="text-indigo-400 text-xs font-mono font-bold">{item.step}</span>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm mb-0.5">{item.title}</p>
                    <p className="text-white/45 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Pricing cards */}
        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              className={`relative rounded-2xl p-7 flex flex-col gap-5 overflow-hidden ${
                plan.highlight
                  ? "bg-indigo-500/[0.12] border border-indigo-500/40"
                  : "glass border border-white/[0.07]"
              }`}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {plan.highlight && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-violet-500/5 pointer-events-none" />
                  <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-indigo-500 text-white text-[10px] font-bold uppercase tracking-wide">
                    Most popular
                  </div>
                </>
              )}

              <div className="relative z-10">
                <p className="text-white/40 text-xs font-medium uppercase tracking-widest mb-1">{plan.pages}</p>
                <h3 className="text-white font-bold text-xl mb-0.5">{plan.name}</h3>
                <p className="text-white/45 text-sm">{plan.description}</p>
              </div>

              <div className="relative z-10 flex items-end gap-0.5">
                <span className="text-white/50 text-lg font-medium self-start mt-1">from</span>
                <span className="text-white font-bold text-5xl leading-none ml-1.5">{plan.price}</span>
                <span className="text-white/70 font-semibold text-xl mb-0.5">{plan.suffix}</span>
              </div>

              <ul className="relative z-10 flex flex-col gap-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-white/60">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0 text-indigo-400">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="https://tripel.app"
                target="_blank"
                rel="noopener noreferrer"
                className={`relative z-10 mt-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-95 ${
                  plan.highlight
                    ? "bg-indigo-500 hover:bg-indigo-600 text-white hover:shadow-lg hover:shadow-indigo-500/30"
                    : "glass border border-white/10 text-white hover:bg-white/[0.06]"
                }`}
              >
                Order at Tripel
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Fine print */}
        <motion.p
          className="text-center text-white/25 text-xs mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Prices in USD, per book, and exclude shipping. Minimum 24 photos required. Printed by Prodigi's global print network. Delivery in 5–10 business days.
        </motion.p>
      </div>
    </section>
  );
}
