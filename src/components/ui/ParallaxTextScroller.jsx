import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * ParallaxTextScroller:
 * Interactive multi-lane background text scroller that animates continuously AND
 * dynamically shifts with the user's scroll speed and direction!
 * Styled with hollow futuristic stroke text, subtle ambient glows, and high-end hospital aesthetics.
 */
export default function ParallaxTextScroller({
  hospitalName = "AETHERIA HEALTH",
  phrasesTop = null,
  phrasesBottom = null,
  opacity = 0.9,
  speed = 1.2,
  className = "",
  showDualLane = true,
}) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const xTop = useTransform(scrollYProgress, [0, 1], [-350 * speed, 350 * speed]);
  const xBottom = useTransform(scrollYProgress, [0, 1], [350 * speed, -350 * speed]);

  const defaultPhrasesTop = [
    `[ ${hospitalName.toUpperCase()} ]`,
    "ADVANCED ROBOTIC SURGERY",
    "GENOMIC DIGITAL TWIN",
    "SUB-CELLULAR AI DIAGNOSTICS",
    `[ ${hospitalName.toUpperCase()} ]`,
    "24/7 TRAUMA & TELEHEALTH",
    "JCI GOLD EXCELLENCE",
  ];

  const defaultPhrasesBottom = [
    "ACOUSTIC HEALING SANCTUARY",
    "7-TESLA HIGH FIELD MRI",
    "WORLD-RENOWNED FACULTY",
    "PRECISION GENE THERAPY",
    "ZERO-WAIT EMERGENCY INTAKE",
    "100% PRIVATE SUITES",
  ];

  const topItems = phrasesTop || defaultPhrasesTop;
  const bottomItems = phrasesBottom || defaultPhrasesBottom;

  const repeatedTop = [...topItems, ...topItems, ...topItems];
  const repeatedBottom = [...bottomItems, ...bottomItems, ...bottomItems];

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none select-none absolute inset-0 overflow-hidden flex flex-col justify-center gap-8 sm:gap-14 z-0 ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <div className="absolute inset-y-0 left-0 w-20 sm:w-40 bg-gradient-to-r from-[#F8FBFF] dark:from-[#07131E] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 sm:w-40 bg-gradient-to-l from-[#F8FBFF] dark:from-[#07131E] to-transparent z-10 pointer-events-none" />

      <motion.div
        style={{ x: xTop }}
        className="w-max flex items-center will-change-transform"
      >
        <div className="flex items-center whitespace-nowrap animate-marquee-slow py-2">
          {repeatedTop.map((text, idx) => (
            <span
              key={`top-${idx}`}
              className="inline-flex items-center gap-6 px-8 text-6xl sm:text-8xl lg:text-9xl font-black uppercase tracking-[0.16em] stroke-text-medical leading-none font-display select-none"
            >
              <span>{text}</span>
              <span className="text-[#2F80ED]/60 text-3xl sm:text-4xl font-normal">✦</span>
            </span>
          ))}
        </div>
      </motion.div>

      {showDualLane && (
        <motion.div
          style={{ x: xBottom }}
          className="w-max flex items-center will-change-transform"
        >
          <div
            className="flex items-center whitespace-nowrap py-2"
            style={{
              animation: 'marquee-scroll 55s linear infinite reverse',
            }}
          >
            {repeatedBottom.map((text, idx) => (
              <span
                key={`bot-${idx}`}
                className="inline-flex items-center gap-6 px-8 text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-[0.18em] stroke-text-medical-cyan leading-none font-display select-none"
              >
                <span>{text}</span>
                <span className="text-[#00C2CB]/60 text-2xl sm:text-3xl font-normal">✦</span>
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
