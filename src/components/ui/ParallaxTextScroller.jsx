import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * ParallaxTextScroller:
 * Interactive multi-lane background text scroller with soft typography and smooth spring motion.
 */
export default function ParallaxTextScroller({
  hospitalName = "AETHERIA HEALTH",
  phrasesTop = null,
  phrasesBottom = null,
  opacity = 0.9,
  speed = 1,
  className = "",
  showDualLane = true,
}) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const rawXTop = useTransform(scrollYProgress, [0, 1], [-220 * speed, 220 * speed]);
  const rawXBottom = useTransform(scrollYProgress, [0, 1], [220 * speed, -220 * speed]);

  const xTop = useSpring(rawXTop, { stiffness: 80, damping: 24, mass: 0.5 });
  const xBottom = useSpring(rawXBottom, { stiffness: 80, damping: 24, mass: 0.5 });

  const cleanName = hospitalName.replace(/[\[\]]/g, '').trim().toUpperCase();

  const defaultPhrasesTop = [
    cleanName,
    "ADVANCED ROBOTIC SURGERY",
    "GENOMIC DIGITAL TWIN",
    "SUB-CELLULAR AI DIAGNOSTICS",
    cleanName,
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

  const topItems = (phrasesTop || defaultPhrasesTop).map(t => typeof t === 'string' ? t.replace(/[\[\]]/g, '').trim() : t);
  const bottomItems = (phrasesBottom || defaultPhrasesBottom).map(t => typeof t === 'string' ? t.replace(/[\[\]]/g, '').trim() : t);

  const repeatedTop = [...topItems, ...topItems, ...topItems];
  const repeatedBottom = [...bottomItems, ...bottomItems, ...bottomItems];

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none select-none absolute inset-0 overflow-hidden flex flex-col justify-center gap-8 sm:gap-14 z-0 ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    >
      <div className="absolute inset-y-0 left-0 w-28 sm:w-56 bg-gradient-to-r from-[#F8FBFF] dark:from-[#080B1A] via-[#F8FBFF]/85 dark:via-[#080B1A]/85 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-28 sm:w-56 bg-gradient-to-l from-[#F8FBFF] dark:from-[#080B1A] via-[#F8FBFF]/85 dark:via-[#080B1A]/85 to-transparent z-10 pointer-events-none" />

      <motion.div
        style={{ x: xTop }}
        className="w-max flex items-center will-change-transform"
      >
        <div className="flex items-center whitespace-nowrap animate-marquee-slow py-2">
          {repeatedTop.map((text, idx) => (
            <span
              key={`top-${idx}`}
              className="inline-flex items-center gap-6 sm:gap-8 px-8 text-5xl sm:text-7xl lg:text-8xl font-bold uppercase tracking-wider soft-watermark-text leading-none font-display select-none"
            >
              <span>{text}</span>
              <span className="text-blue-400/40 text-2xl sm:text-4xl font-light">✦</span>
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
                className="inline-flex items-center gap-6 sm:gap-8 px-8 text-4xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-wider soft-watermark-cyan leading-none font-display select-none"
              >
                <span>{text}</span>
                <span className="text-cyan-400/40 text-xl sm:text-3xl font-light">✦</span>
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
