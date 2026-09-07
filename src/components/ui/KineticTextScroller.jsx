import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * KineticTextScroller:
 * High-visibility, continuous kinetic scrolling text ribbon.
 * Reacts to user scroll position & velocity while continuously looping!
 */
export default function KineticTextScroller({
  items = null,
  hospitalName = "AETHERIA HEALTH",
  variant = "ribbon",
  reverse = false,
  speed = 1,
  className = "",
}) {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    reverse ? [250 * speed, -250 * speed] : [-250 * speed, 250 * speed]
  );

  const defaultItems = [
    `[ ${hospitalName.toUpperCase()} ]`,
    "ADVANCED ROBOTIC SURGERY",
    "✦",
    "GENOMIC DIGITAL TWIN",
    "✦",
    "SUB-CELLULAR AI DIAGNOSTICS",
    "✦",
    "24/7 EMERGENCY INTAKE",
    "✦",
    "JCI GOLD EXCELLENCE",
    "✦",
    "ACOUSTIC HEALING SUITES",
    "✦",
    "7-TESLA PRECISION MRI",
    "✦",
  ];

  const streamItems = items || defaultItems;
  const repeatedItems = [...streamItems, ...streamItems, ...streamItems];

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden py-4 sm:py-5 border-y border-blue-100/90 dark:border-blue-900/60 bg-gradient-to-r from-blue-50/95 via-white to-blue-50/95 dark:from-[#0B1E32]/95 dark:via-[#0E243A] dark:to-[#0B1E32]/95 backdrop-blur-xl shadow-[0_4px_24px_rgba(47,128,237,0.08)] select-none z-20 ${
        variant === "angled" ? "-rotate-1 sm:-rotate-1.5 my-8 scale-105" : ""
      } ${className}`}
      aria-hidden="true"
    >
      {/* Edge gradient fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#F8FBFF] dark:from-[#07131E] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#F8FBFF] dark:from-[#07131E] to-transparent z-10" />

      <motion.div style={{ x }} className="w-max flex items-center will-change-transform">
        <div
          className="flex items-center whitespace-nowrap py-1 group hover:[animation-play-state:paused]"
          style={{
            animation: `ticker-slide ${reverse ? 38 : 34}s linear infinite ${
              reverse ? "reverse" : "normal"
            }`,
          }}
        >
          {repeatedItems.map((item, index) => {
            const isBracket = typeof item === 'string' && item.startsWith('[');
            const isStar = item === '✦' || item === '✛' || item === '◈';

            if (isStar) {
              return (
                <span key={index} className="px-4 text-[#2F80ED] text-base sm:text-lg animate-pulse">
                  {item}
                </span>
              );
            }

            if (isBracket) {
              return (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2F80ED]/15 dark:bg-[#2F80ED]/25 border border-[#2F80ED]/30 mx-3 shadow-sm"
                >
                  <span className="w-2 h-2 rounded-full bg-[#2F80ED] animate-ping" />
                  <span className="font-mono text-xs sm:text-sm font-black tracking-widest text-[#1E6FD9] dark:text-blue-300 uppercase">
                    {item}
                  </span>
                </span>
              );
            }

            return (
              <span
                key={index}
                className="font-display font-extrabold text-xs sm:text-sm tracking-[0.16em] text-[#0B2438] dark:text-slate-200 uppercase px-3"
              >
                {item}
              </span>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
