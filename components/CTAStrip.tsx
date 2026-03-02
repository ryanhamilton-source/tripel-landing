"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function CTAStrip() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="download" className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          className="relative rounded-3xl overflow-hidden"
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-600" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_30%_40%,rgba(255,255,255,0.12),transparent)]" />
          {/* Subtle noise */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg%20viewBox%3D%220%200%20256%20256%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cfilter%20id%3D%22n%22%3E%3CfeTurbulence%20type%3D%22fractalNoise%22%20baseFrequency%3D%220.9%22%20numOctaves%3D%224%22%20stitchTiles%3D%22stitch%22/%3E%3C/filter%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20filter%3D%22url(%23n)%22%20opacity%3D%221%22/%3E%3C/svg%3E')]" />

          {/* Floating orbs */}
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-violet-400/20 blur-3xl pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 text-center px-8 py-16 md:py-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-white/70 text-sm font-medium uppercase tracking-widest mb-4">
                Available now
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4 leading-[1.1]">
                Ready to travel
                <br />
                together?
              </h2>
              <p className="text-white/70 text-lg mb-10 max-w-md mx-auto">
                Download Tripel and start your next group adventure today.
                It&apos;s free to get started.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#"
                  className="group flex items-center gap-3 px-7 py-3.5 rounded-2xl bg-white text-indigo-600 font-semibold hover:bg-white/90 transition-all duration-200 hover:shadow-xl active:scale-95 text-sm"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                  Download on App Store
                </a>

                <a
                  href="#"
                  className="flex items-center gap-3 px-7 py-3.5 rounded-2xl bg-white/15 border border-white/25 text-white font-semibold hover:bg-white/20 transition-all duration-200 active:scale-95 text-sm backdrop-blur-sm"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3.18 23.76c.3.17.64.24.99.2l12.7-7.34-2.78-2.78-10.91 9.92zM20.49 10.28L17.3 8.43l-3.12 3.13 3.12 3.12 3.21-1.87c.92-.53.92-1.99-.02-2.53zM1.89.29C1.67.5 1.54.82 1.54 1.24v21.52c0 .42.13.74.36.95l.05.04 12.06-12.06v-.28L1.94.25l-.05.04zM13.07 15.37l-3.63-3.63-7.55 8.7 11.18-5.07z" />
                  </svg>
                  Get it on Google Play
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
