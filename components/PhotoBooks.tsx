"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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
    name: "Group Adventure",
    pages: "31–100 pages",
    price: "$60",
    suffix: "",
    description: "The sweet spot for a week-long group trip.",
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

function BookMockup() {
  return (
    <div className="relative w-64 h-80 mx-auto" style={{ perspective: "900px" }}>
      {/* Book shadow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-6 bg-black/40 blur-xl rounded-full" />

      {/* Book group — slight 3D tilt */}
      <div
        className="relative w-full h-full"
        style={{ transform: "rotateY(-18deg) rotateX(4deg)", transformStyle: "preserve-3d" }}
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
          style={{
            transform: "translateZ(-6px)",
            background: "#312e81",
          }}
        />

        {/* Pages stack */}
        <div
          className="absolute inset-y-1 left-7 right-0"
          style={{
            transform: "translateZ(-2px)",
            background: "repeating-linear-gradient(to bottom, #f8f8f0 0px, #f8f8f0 1px, #e8e8e0 1px, #e8e8e0 2px)",
          }}
        />

        {/* Front cover */}
        <div
          className="absolute inset-0 rounded-r-md rounded-l-sm overflow-hidden"
          style={{ transform: "translateZ(0px)" }}
        >
          {/* Cover gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-900" />

          {/* Cover image collage — photo grid */}
          <div className="absolute inset-3 grid grid-cols-2 grid-rows-3 gap-1 opacity-80">
            {[
              "from-amber-400/70 to-orange-500/70",
              "from-emerald-400/70 to-teal-500/70",
              "from-sky-400/70 to-blue-500/70",
              "from-pink-400/70 to-rose-500/70",
              "from-violet-400/70 to-purple-500/70",
              "from-yellow-400/70 to-amber-500/70",
            ].map((grad, i) => (
              <div key={i} className={`rounded-sm bg-gradient-to-br ${grad}`} />
            ))}
          </div>

          {/* Cover overlay + title */}
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-3 right-3">
            <p className="text-white/50 text-[8px] uppercase tracking-widest font-medium mb-0.5">Bali 2025</p>
            <p className="text-white font-bold text-sm leading-tight">The Squad's</p>
            <p className="text-white font-bold text-sm leading-tight">Epic Adventure</p>
          </div>

          {/* Tripel badge */}
          <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-white/15 backdrop-blur-sm">
            <span className="text-white text-[7px] font-semibold tracking-wide">TRIPEL</span>
          </div>
        </div>
      </div>
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
            <BookMockup />

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
                href="#download"
                className={`relative z-10 mt-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-95 ${
                  plan.highlight
                    ? "bg-indigo-500 hover:bg-indigo-600 text-white hover:shadow-lg hover:shadow-indigo-500/30"
                    : "glass border border-white/10 text-white hover:bg-white/[0.06]"
                }`}
              >
                Order in app
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
