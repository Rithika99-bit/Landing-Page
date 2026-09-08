import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * HospitalMarqueeBackground:
 * Ultra-luxury, futuristic dual-lane background typography scroller.
 * Styled with bespoke 'Unbounded' & 'Syne' avant-garde typography,
 * iridescent dual-tone text gradient fills, cyber telemetry capsules,
 * and seamless decoupled 60fps infinite marquee with scroll parallax.
 */
export default function HospitalMarqueeBackground({
  hospitalName = "AETHERIA HEALTH",
  reverse = false,
  showDualLane = true,
  className = "",
}) {
  const containerRef = useRef(null);

  // Measure scroll progress for responsive parallax drift
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth scroll-driven horizontal parallax offset
  const xOffsetTop = useTransform(
    scrollYProgress,
    [0, 1],
    reverse ? [180, -180] : [-180, 180]
  );
  const xOffsetBottom = useTransform(
    scrollYProgress,
    [0, 1],
    reverse ? [-180, 180] : [180, -180]
  );

  const cleanName = (hospitalName || "AETHERIA HEALTH").toUpperCase();

  // Lane 1: Unbounded Geometric Cyber Architecture
  const lane1Items = [
    { type: 'hospital', text: cleanName },
    { type: 'star', text: '✦' },
    { type: 'sub', text: 'NEXT-GEN MEDICINE' },
    { type: 'star', text: '◈' },
    { type: 'hospital', text: cleanName },
    { type: 'star', text: '✦' },
    { type: 'sub', text: 'ROBOTIC SURGERY' },
    { type: 'star', text: '✦' },
    { type: 'hospital', text: cleanName },
    { type: 'star', text: '◈' },
    { type: 'sub', text: 'GENOMIC TWIN' },
    { type: 'star', text: '✦' },
    { type: 'hospital', text: cleanName },
    { type: 'star', text: '✦' },
    { type: 'sub', text: 'JCI ACCREDITED' },
    { type: 'star', text: '✦' },
  ];

  // Lane 2: Syne High-Fashion Precision Medicine
  const lane2Items = [
    { type: 'hospital', text: cleanName },
    { type: 'cross', text: '✚' },
    { type: 'sub', text: 'SUB-CELLULAR AI' },
    { type: 'cross', text: '✦' },
    { type: 'hospital', text: cleanName },
    { type: 'cross', text: '✚' },
    { type: 'sub', text: '7-TESLA MRI' },
    { type: 'cross', text: '✦' },
    { type: 'hospital', text: cleanName },
    { type: 'cross', text: '✚' },
    { type: 'sub', text: 'ZERO-WAIT INTAKE' },
    { type: 'cross', text: '✦' },
    { type: 'hospital', text: cleanName },
    { type: 'cross', text: '✚' },
    { type: 'sub', text: 'HEALING SANCTUARY' },
    { type: 'cross', text: '✦' },
  ];

  // Duplicate for seamless 0% -> -50% CSS infinite loop
  const repeatedLane1 = [...lane1Items, ...lane1Items];
  const repeatedLane2 = [...lane2Items, ...lane2Items];

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none select-none absolute inset-0 overflow-hidden w-full h-full flex flex-col justify-around py-4 z-0 ${className}`}
      aria-hidden="true"
    >
      {/* Edge gradient fade masks for smooth infinite blending */}
      <div className="absolute inset-y-0 left-0 w-24 sm:w-56 bg-gradient-to-r from-[#F8FBFF] dark:from-[#07131E] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 sm:w-56 bg-gradient-to-l from-[#F8FBFF] dark:from-[#07131E] to-transparent z-10 pointer-events-none" />

      {/* LANE 1: UNBOUNDED GEOMETRIC CYBER SCROLLER */}
      <motion.div
        style={{ x: xOffsetTop }}
        className="w-max flex will-change-transform opacity-95"
      >
        <div
          className={`flex items-center whitespace-nowrap py-2 ${
            reverse ? 'animate-marquee-continuous-reverse' : 'animate-marquee-continuous'
          }`}
          style={{ animationDuration: '40s' }}
        >
          {repeatedLane1.map((item, idx) => {
            // Star or Diamond Separator
            if (item.type === 'star') {
              return (
                <span
                  key={`l1-sym-${idx}`}
                  className="px-6 sm:px-10 text-[#2F80ED]/75 dark:text-[#3B82F6]/90 text-2xl sm:text-4xl drop-shadow-[0_0_12px_rgba(47,128,237,0.5)] select-none"
                >
                  {item.text}
                </span>
              );
            }

            // High-Impact Hospital Name with Unbounded Font & Iridescent Glow Pill
            if (item.type === 'hospital') {
              return (
                <div
                  key={`l1-hosp-${idx}`}
                  className="inline-flex items-center gap-3 sm:gap-5 px-5 sm:px-8 py-2 sm:py-3 rounded-full border border-blue-400/25 dark:border-blue-500/35 bg-blue-500/[0.03] dark:bg-blue-400/[0.06] backdrop-blur-[2px] shadow-[0_0_35px_rgba(47,128,237,0.12)] mx-3 sm:mx-6 group"
                >
                  {/* Glowing Medical Pulse Dot */}
                  <span className="flex h-2 sm:h-3 w-2 sm:w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2F80ED] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 sm:h-3 w-2 sm:w-3 bg-[#2F80ED]" />
                  </span>

                  {/* Hospital Name Typography */}
                  <span className="stroke-text-unbounded text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] font-black uppercase tracking-[0.18em] leading-none select-none">
                    {item.text}
                  </span>

                  {/* Micro telemetry tag */}
                  <span className="hidden sm:inline-block font-mono text-[10px] font-black text-[#2F80ED]/60 tracking-widest border-l border-blue-300/40 pl-3">
                    CORE // 01
                  </span>
                </div>
              );
            }

            // Supporting Specialty Terms in Hollow Wireframe
            return (
              <span
                key={`l1-sub-${idx}`}
                className="inline-block font-unbounded text-3xl sm:text-5xl md:text-6xl lg:text-[5rem] font-bold uppercase tracking-[0.14em] leading-none stroke-text-hollow-blue select-none px-4"
              >
                {item.text}
              </span>
            );
          })}
        </div>
      </motion.div>

      {/* LANE 2: SYNE HIGH-FASHION PRECISION MEDICINE SCROLLER */}
      {showDualLane && (
        <motion.div
          style={{ x: xOffsetBottom }}
          className="w-max flex will-change-transform opacity-90"
        >
          <div
            className={`flex items-center whitespace-nowrap py-2 ${
              reverse ? 'animate-marquee-continuous' : 'animate-marquee-continuous-reverse'
            }`}
            style={{ animationDuration: '46s' }}
          >
            {repeatedLane2.map((item, idx) => {
              // Medical Cross Separator
              if (item.type === 'cross') {
                return (
                  <span
                    key={`l2-sym-${idx}`}
                    className="px-6 sm:px-10 text-[#00C2CB]/75 dark:text-[#06B6D4]/90 text-2xl sm:text-4xl drop-shadow-[0_0_12px_rgba(0,194,203,0.5)] select-none"
                  >
                    {item.text}
                  </span>
                );
              }

              // High-Fashion Precision Hospital Name with Syne Font
              if (item.type === 'hospital') {
                return (
                  <div
                    key={`l2-hosp-${idx}`}
                    className="inline-flex items-center gap-3 sm:gap-4 px-5 sm:px-7 py-1.5 sm:py-2.5 rounded-2xl border border-cyan-400/25 dark:border-cyan-500/35 bg-cyan-500/[0.03] dark:bg-cyan-400/[0.05] shadow-[0_0_30px_rgba(0,194,203,0.1)] mx-3 sm:mx-5"
                  >
                    {/* Cyan Beacon */}
                    <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#00C2CB] shadow-[0_0_8px_#00C2CB]" />

                    {/* Hospital Name in Syne */}
                    <span className="stroke-text-syne text-4xl sm:text-6xl md:text-7xl lg:text-[6.2rem] font-extrabold uppercase tracking-[0.2em] leading-none select-none">
                      {item.text}
                    </span>

                    {/* Micro telemetry tag */}
                    <span className="hidden sm:inline-block font-mono text-[9px] font-black text-[#00C2CB]/60 tracking-widest border-l border-cyan-300/40 pl-2.5">
                      BIO // 24/7
                    </span>
                  </div>
                );
              }

              // Supporting Specialty Terms in Hollow Wireframe
              return (
                <span
                  key={`l2-sub-${idx}`}
                  className="inline-block font-syne text-3xl sm:text-4xl md:text-5xl lg:text-[4.5rem] font-bold uppercase tracking-[0.16em] leading-none stroke-text-hollow-cyan select-none px-4"
                >
                  {item.text}
                </span>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}
