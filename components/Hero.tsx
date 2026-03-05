"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const WorldMap = dynamic(() => import("./WorldMap"), { ssr: false });

// Exact projected coordinates computed with geoNaturalEarth1, scale=185,
// center=[10,10], translate=[400,300] (800×600 default SVG space)
const CITIES = [
  { name: "New York", x: 180.7, y: 199.7 },
  { name: "London",   x: 371.8, y: 165.2 },
  { name: "Rome",     x: 404.2, y: 195.8 },
  { name: "Tokyo",    x: 740.7, y: 216.0 },
  { name: "Bali",     x: 694.8, y: 360.8 },
  { name: "Sydney",   x: 773.7, y: 443.2 },
];

// Each arc segment with quadratic bezier control points arching above great-circle paths
const ARC_SEGMENTS = [
  "M 180.7 199.7 Q 276 100, 371.8 165.2",   // NY → London
  "M 371.8 165.2 Q 388 138, 404.2 195.8",   // London → Rome
  "M 404.2 195.8 Q 572  95, 740.7 216.0",   // Rome → Tokyo
  "M 740.7 216.0 Q 750 285, 694.8 360.8",   // Tokyo → Bali
  "M 694.8 360.8 Q 754 398, 773.7 443.2",   // Bali → Sydney
];

const FULL_PATH =
  "M 180.7 199.7 Q 276 100, 371.8 165.2 Q 388 138, 404.2 195.8 Q 572 95, 740.7 216.0 Q 750 285, 694.8 360.8 Q 754 398, 773.7 443.2";

const ARC_DURATION = 0.65;
const ARC_STAGGER  = 0.5;
const ARC_OFFSET   = 0.8;
const PLANE_DURATION_MS = 3400;
const PLANE_DELAY_MS    = 900;

// Label widths (px in SVG space) — used to size the pill background
const LABEL_W: Record<string, number> = {
  "New York": 50, London: 36, Rome: 26, Tokyo: 30, Bali: 22, Sydney: 32,
};

export default function Hero() {
  const [started,     setStarted]     = useState(false);
  const [showPlane,   setShowPlane]   = useState(false);
  const [showHeadline,setShowHeadline]= useState(false);
  const [planePos,    setPlanePos]    = useState({ x: 180.7, y: 199.7 });
  const [planeAngle,  setPlaneAngle]  = useState(0);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setStarted(true), 600);
    const t2 = setTimeout(() => setShowPlane(true), PLANE_DELAY_MS);
    const t3 = setTimeout(
      () => setShowHeadline(true),
      PLANE_DELAY_MS + PLANE_DURATION_MS + 300
    );
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  // Animate plane along the full path in 800×600 SVG space
  useEffect(() => {
    if (!showPlane) return;
    const path = document.getElementById("full-flight-path") as unknown as SVGPathElement | null;
    if (!path) return;

    const totalLength = path.getTotalLength();
    let startTime: number | null = null;

    const animate = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / PLANE_DURATION_MS, 1);
      const e = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      const pt     = path.getPointAtLength(e * totalLength);
      const ptAhead= path.getPointAtLength(Math.min((e + 0.008) * totalLength, totalLength));
      const angle  = (Math.atan2(ptAhead.y - pt.y, ptAhead.x - pt.x) * 180) / Math.PI;

      setPlanePos({ x: pt.x, y: pt.y });
      setPlaneAngle(angle);

      if (progress < 1) animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => { if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current); };
  }, [showPlane]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(99,102,241,0.18),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_75%_55%,rgba(99,102,241,0.07),transparent)]" />

      {/* ── Map + flight layer ── */}
      <div className="absolute inset-0">
        {/* World map — 800×600 viewBox, xMidYMid meet */}
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        >
          <WorldMap />
        </motion.div>

        {/*
          Overlay SVG uses the SAME 800×600 viewBox as ComposableMap so all
          coordinates line up perfectly on every screen size.
        */}
        <svg
          viewBox="0 0 800 600"
          style={{ width: "100%", height: "100%" }}
          className="absolute inset-0 overflow-visible pointer-events-none"
        >
          {/* Hidden path for plane getPointAtLength */}
          <path id="full-flight-path" d={FULL_PATH} fill="none" stroke="transparent" />

          {/* Arc segments — staggered draw-in */}
          {ARC_SEGMENTS.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              fill="none"
              stroke="rgba(129,140,248,0.72)"
              strokeWidth={1.2}
              strokeDasharray="5 3.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={started ? { pathLength: 1, opacity: 1 } : {}}
              transition={{
                pathLength: { delay: ARC_OFFSET + i * ARC_STAGGER, duration: ARC_DURATION, ease: "easeInOut" },
                opacity:    { delay: ARC_OFFSET + i * ARC_STAGGER, duration: 0.2 },
              }}
            />
          ))}

          {/* City dots + label pills */}
          {CITIES.map((city, i) => {
            const lw = LABEL_W[city.name] ?? 36;
            const lh = 14;
            const px = 5; // horizontal text padding inside pill
            return (
              <motion.g
                key={city.name}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={started ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: ARC_OFFSET + i * ARC_STAGGER + 0.25, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: `${city.x}px ${city.y}px` }}
              >
                {/* Glow ring */}
                <circle cx={city.x} cy={city.y} r={5} fill="rgba(99,102,241,0.15)" />
                {/* Dot */}
                <circle cx={city.x} cy={city.y} r={2.5} fill="#6366f1" />
                {/* Label pill — positioned above the dot */}
                <rect
                  x={city.x - lw / 2 - px}
                  y={city.y - lh - 10}
                  width={lw + px * 2}
                  height={lh}
                  rx={7}
                  fill="rgba(13,13,20,0.72)"
                  stroke="rgba(99,102,241,0.35)"
                  strokeWidth={0.6}
                />
                {/* Indicator dot inside pill */}
                <circle cx={city.x - lw / 2 - px + 6} cy={city.y - lh - 10 + lh / 2} r={1.6} fill="#818cf8" />
                {/* City name */}
                <text
                  x={city.x - lw / 2 - px + 12}
                  y={city.y - lh - 10 + lh / 2}
                  fill="rgba(165,180,252,0.95)"
                  fontSize={7.5}
                  dominantBaseline="middle"
                  fontFamily="Inter, system-ui, sans-serif"
                  fontWeight="500"
                  letterSpacing="0.3"
                >
                  {city.name}
                </text>
              </motion.g>
            );
          })}

          {/* Plane — single-path ✈ silhouette, rotates to face direction of travel */}
          {showPlane && (
            <g
              transform={`translate(${planePos.x}, ${planePos.y}) rotate(${planeAngle})`}
              style={{ filter: "drop-shadow(0 0 4px rgba(129,140,248,0.9))" }}
            >
              <path
                d="M0,-8 L1.5,0 L8,3 L1.5,1.5 L1,6 L3,7.5 L0,7 L-3,7.5 L-1,6 L-1.5,1.5 L-8,3 L-1.5,0 Z"
                fill="#818cf8"
              />
            </g>
          )}
        </svg>
      </div>

      {/* Fades */}
      <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-[#0d0d14] via-[#0d0d14]/75 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#0d0d14] to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#0d0d14] to-transparent pointer-events-none" />

      {/* ── Headline + CTA ── */}
      <div className="relative z-10 text-center px-6 mt-[40vh]">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={showHeadline ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-indigo-300 font-medium mb-6 border border-indigo-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Group travel, reimagined
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-5">
            Your trips,{" "}
            <span className="gradient-text">elevated.</span>
          </h1>

          <p className="text-white/55 text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-10">
            Plan together, share memories, play games, and print photo books
            all in one beautifully designed app.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#download" className="flex items-center gap-3 px-7 py-3.5 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold transition-all duration-200 hover:shadow-xl hover:shadow-indigo-500/30 active:scale-95 glow-indigo">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              App Store
            </a>
            <a
              href="https://tripel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-7 py-3.5 rounded-2xl glass border border-white/10 text-white font-semibold hover:bg-white/[0.06] transition-all duration-200 active:scale-95"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              Tripel
            </a>
          </div>
        </motion.div>

        <motion.div
          className="mt-16 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={showHeadline ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <span className="text-white/30 text-xs uppercase tracking-widest font-medium">Scroll to explore</span>
          <motion.div
            className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <div className="w-1 h-2 rounded-full bg-indigo-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
