import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

/**
 * KineticTextScroller:
 * High-end kinetic scrolling text ribbon with soft rounded typography.
 * Smoothly synchronizes with scroll inertia using spring damping and GPU translate3d.
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

  // Soft spring cushioning for fluid scroll parallax
  const rawX = useTransform(
    scrollYProgress,
    [0, 1],
    reverse ? [160 * speed, -160 * speed] : [-160 * speed, 160 * speed]
  );
  const x = useSpring(rawX, {
    stiffness: 85,
    damping: 22,
    mass: 0.5,
  });

  const cleanHospitalName = hospitalName.replace(/[\[\]]/g, '').trim().toUpperCase();

  const defaultItems = [
    cleanHospitalName,
    "✦",
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
  // Duplicate sufficiently for seamless looping
  const repeatedItems = [...streamItems, ...streamItems, ...streamItems, ...streamItems];

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden py-3.5 sm:py-4 border-y border-blue-100/70 dark:border-blue-900/40 bg-gradient-to-r from-blue-50/70 via-white/90 to-blue-50/70 dark:from-[#080E1A]/90 dark:via-[#0D1829]/90 dark:to-[#080E1A]/90 backdrop-blur-xl shadow-[0_4px_20px_rgba(47,128,237,0.04)] select-none z-20 ${
        variant === "angled" ? "-rotate-1 sm:-rotate-1.5 my-8 scale-105" : ""
      } ${className}`}
      aria-hidden="true"
    >
      {/* Soft edge gradient fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 sm:w-36 bg-gradient-to-r from-[#F8FBFF] dark:from-[#080B1A] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 sm:w-36 bg-gradient-to-l from-[#F8FBFF] dark:from-[#080B1A] to-transparent z-10" />

      <motion.div style={{ x }} className="w-max flex items-center will-change-transform">
        <div
          className="flex items-center whitespace-nowrap py-1 will-change-transform group hover:[animation-play-state:paused]"
          style={{
            animation: `ticker-slide ${reverse ? 46 : 42}s linear infinite ${
              reverse ? "reverse" : "normal"
            }`,
          }}
        >
          {repeatedItems.map((rawItem, index) => {
            const item = typeof rawItem === 'string' ? rawItem.replace(/[\[\]]/g, '').trim() : rawItem;
            const isHospitalBrand = item.toUpperCase() === cleanHospitalName;
            const isStar = item === '✦' || item === '✛' || item === '◈' || item === '•';

            if (isStar) {
              return (
                <span
                  key={index}
                  className="px-4 text-blue-400/50 dark:text-cyan-400/40 text-xs sm:text-sm font-light select-none"
                >
                  ✦
                </span>
              );
            }

            if (isHospitalBrand) {
              return (
                <span
                  key={index}
                  className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 dark:bg-blue-400/15 border border-blue-500/20 dark:border-blue-400/30 mx-3 shadow-xs"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2F80ED] opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2F80ED]" />
                  </span>
                  <span className="font-sans text-xs sm:text-sm font-semibold tracking-wider text-[#1E6FD9] dark:text-blue-300 uppercase antialiased">
                    {item}
                  </span>
                </span>
              );
            }

            return (
              <span
                key={index}
                className="font-sans font-medium text-xs sm:text-sm tracking-wide text-slate-600 dark:text-slate-300 uppercase px-3.5 antialiased"
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
