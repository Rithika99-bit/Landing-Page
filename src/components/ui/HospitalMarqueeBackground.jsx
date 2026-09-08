import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * HospitalMarqueeBackground:
 * Minimalist, ethereal background typography scroller.
 * - Visible very lightly (calm, non-intrusive watermark opacity).
 * - Animated with gentle, soft-light pastel color shimmers.
 * - Unique 'Syne' & 'Unbounded' avant-garde typography with spacious tracking.
 * - Decoupled 60fps infinite marquee with subtle scroll-responsive parallax.
 */
export default function HospitalMarqueeBackground({
  hospitalName = "AETHERIA HEALTH",
  reverse = false,
  showDualLane = true,
  className = "",
}) {
  const containerRef = useRef(null);

  // Subtle scroll parallax tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const xOffsetTop = useTransform(
    scrollYProgress,
    [0, 1],
    reverse ? [140, -140] : [-140, 140]
  );
  const xOffsetBottom = useTransform(
    scrollYProgress,
    [0, 1],
    reverse ? [-140, 140] : [140, -140]
  );

  const cleanName = (hospitalName || "AETHERIA HEALTH").toUpperCase();

  // Lane 1: Ethereal Syne Typography (Soft Sky & Lavender Light Shimmer)
  const lane1Items = [
    { type: 'hospital', text: cleanName },
    { type: 'sep', text: '✦' },
    { type: 'sub', text: 'ADVANCED CARE' },
    { type: 'sep', text: '✧' },
    { type: 'hospital', text: cleanName },
    { type: 'sep', text: '✦' },
    { type: 'sub', text: 'PRECISION MEDICINE' },
    { type: 'sep', text: '✧' },
    { type: 'hospital', text: cleanName },
    { type: 'sep', text: '✦' },
    { type: 'sub', text: 'NEXT-GEN HEALTH' },
    { type: 'sep', text: '✧' },
    { type: 'hospital', text: cleanName },
    { type: 'sep', text: '✦' },
    { type: 'sub', text: 'JCI EXCELLENCE' },
    { type: 'sep', text: '✧' },
  ];

  // Lane 2: Refined Unbounded Typography (Soft Cyan & Ice Blue Light Shimmer)
  const lane2Items = [
    { type: 'hospital', text: cleanName },
    { type: 'sep', text: '✛' },
    { type: 'sub', text: 'ROBOTIC SURGERY' },
    { type: 'sep', text: '✧' },
    { type: 'hospital', text: cleanName },
    { type: 'sep', text: '✛' },
    { type: 'sub', text: 'GENOMIC DIGITAL TWIN' },
    { type: 'sep', text: '✧' },
    { type: 'hospital', text: cleanName },
    { type: 'sep', text: '✛' },
    { type: 'sub', text: 'HEALING SANCTUARY' },
    { type: 'sep', text: '✧' },
    { type: 'hospital', text: cleanName },
    { type: 'sep', text: '✛' },
    { type: 'sub', text: 'ZERO-WAIT INTAKE' },
    { type: 'sep', text: '✧' },
  ];

  const repeatedLane1 = [...lane1Items, ...lane1Items];
  const repeatedLane2 = [...lane2Items, ...lane2Items];

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none select-none absolute inset-0 overflow-hidden w-full h-full flex flex-col justify-around py-6 z-0 ${className}`}
      aria-hidden="true"
    >
      {/* Edge gradient masks for seamless soft boundary fading */}
      <div className="absolute inset-y-0 left-0 w-28 sm:w-64 bg-gradient-to-r from-[#F8FBFF] dark:from-[#07131E] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-28 sm:w-64 bg-gradient-to-l from-[#F8FBFF] dark:from-[#07131E] to-transparent z-10 pointer-events-none" />

      {/* LANE 1: SYNE LUXURY TYPOGRAPHY WITH SOFT LIGHT SHIMMER */}
      <motion.div
        style={{ x: xOffsetTop }}
        className="w-max flex will-change-transform opacity-30 sm:opacity-35 dark:opacity-35 hover:opacity-50 transition-opacity duration-700"
      >
        <div
          className={`flex items-center whitespace-nowrap py-2 ${
            reverse ? 'animate-marquee-continuous-reverse' : 'animate-marquee-continuous'
          }`}
          style={{ animationDuration: '50s' }}
        >
          {repeatedLane1.map((item, idx) => {
            if (item.type === 'sep') {
              return (
                <span
                  key={`l1-sep-${idx}`}
                  className="px-8 sm:px-14 text-cyan-400/50 dark:text-cyan-300/60 text-xl sm:text-3xl font-light select-none"
                >
                  {item.text}
                </span>
              );
            }

            const isHospital = item.type === 'hospital';

            return (
              <span
                key={`l1-txt-${idx}`}
                className={`inline-block font-syne uppercase leading-none select-none text-soft-light-shimmer ${
                  isHospital
                    ? 'text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-semibold tracking-[0.24em]'
                    : 'text-3xl sm:text-5xl md:text-6xl lg:text-[5.5rem] font-light tracking-[0.2em] opacity-65'
                }`}
              >
                {item.text}
              </span>
            );
          })}
        </div>
      </motion.div>

      {/* LANE 2: UNBOUNDED GEOMETRIC TYPOGRAPHY WITH SOFT CYAN SHIMMER */}
      {showDualLane && (
        <motion.div
          style={{ x: xOffsetBottom }}
          className="w-max flex will-change-transform opacity-25 sm:opacity-30 dark:opacity-30 hover:opacity-45 transition-opacity duration-700"
        >
          <div
            className={`flex items-center whitespace-nowrap py-2 ${
              reverse ? 'animate-marquee-continuous' : 'animate-marquee-continuous-reverse'
            }`}
            style={{ animationDuration: '56s' }}
          >
            {repeatedLane2.map((item, idx) => {
              if (item.type === 'sep') {
                return (
                  <span
                    key={`l2-sep-${idx}`}
                    className="px-8 sm:px-14 text-blue-400/50 dark:text-blue-300/60 text-xl sm:text-3xl font-light select-none"
                  >
                    {item.text}
                  </span>
                );
              }

              const isHospital = item.type === 'hospital';

              return (
                <span
                  key={`l2-txt-${idx}`}
                  className={`inline-block font-unbounded uppercase leading-none select-none text-soft-cyan-shimmer ${
                    isHospital
                      ? 'text-4xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-medium tracking-[0.22em]'
                      : 'text-2xl sm:text-4xl md:text-5xl lg:text-[4.5rem] font-light tracking-[0.18em] opacity-65'
                  }`}
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
