import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * HospitalMarqueeBackground:
 * Giant, high-visibility dual-lane background hospital name scroller.
 * Moves continuously with seamless infinite marquee animation
 * AND shifts gracefully with user scroll position for rich parallax depth!
 */
export default function HospitalMarqueeBackground({
  hospitalName = "AETHERIA HEALTH",
  reverse = false,
  showDualLane = true,
  className = "",
}) {
  const containerRef = useRef(null);

  // Measure scroll progress across the container for responsive parallax drift
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth scroll-driven horizontal parallax offset
  const xOffsetTop = useTransform(
    scrollYProgress,
    [0, 1],
    reverse ? [160, -160] : [-160, 160]
  );
  const xOffsetBottom = useTransform(
    scrollYProgress,
    [0, 1],
    reverse ? [-160, 160] : [160, -160]
  );

  const cleanName = (hospitalName || "AETHERIA HEALTH").toUpperCase();

  // Lane 1 Items - Hospital Name Centric
  const lane1Items = [
    cleanName,
    "✦",
    "NEXT-GEN MEDICINE",
    "✦",
    cleanName,
    "✦",
    "ADVANCED ROBOTIC SURGERY",
    "✦",
    cleanName,
    "✦",
    "GENOMIC DIGITAL TWIN",
    "✦",
    cleanName,
    "✦",
    "JCI GOLD EXCELLENCE",
    "✦",
  ];

  // Lane 2 Items - Hospital Name Centric with Alternate Accents
  const lane2Items = [
    cleanName,
    "✚",
    "SUB-CELLULAR AI DIAGNOSTICS",
    "✚",
    cleanName,
    "✚",
    "7-TESLA HIGH FIELD MRI",
    "✚",
    cleanName,
    "✚",
    "ZERO-WAIT EMERGENCY INTAKE",
    "✚",
    cleanName,
    "✚",
    "ACOUSTIC HEALING SANCTUARY",
    "✚",
  ];

  // Duplicate for seamless 0% -> -50% CSS infinite loop
  const repeatedLane1 = [...lane1Items, ...lane1Items];
  const repeatedLane2 = [...lane2Items, ...lane2Items];

  return (
    <div
      ref={containerRef}
      className={`pointer-events-none select-none absolute inset-0 overflow-hidden w-full h-full flex flex-col justify-around py-6 z-0 ${className}`}
      aria-hidden="true"
    >
      {/* Edge gradient fade masks for smooth infinite flow */}
      <div className="absolute inset-y-0 left-0 w-20 sm:w-44 bg-gradient-to-r from-[#F8FBFF] dark:from-[#07131E] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 sm:w-44 bg-gradient-to-l from-[#F8FBFF] dark:from-[#07131E] to-transparent z-10 pointer-events-none" />

      {/* Lane 1: Scrolling Left with Scroll Parallax */}
      <motion.div
        style={{ x: xOffsetTop }}
        className="w-max flex will-change-transform opacity-90"
      >
        <div
          className={`flex items-center whitespace-nowrap py-1 ${
            reverse ? 'animate-marquee-continuous-reverse' : 'animate-marquee-continuous'
          }`}
          style={{ animationDuration: '42s' }}
        >
          {repeatedLane1.map((item, idx) => {
            if (item === "✦" || item === "✚") {
              return (
                <span
                  key={`l1-sym-${idx}`}
                  className="px-6 sm:px-10 text-[#2F80ED]/70 dark:text-[#3B82F6]/80 text-2xl sm:text-4xl select-none"
                >
                  {item}
                </span>
              );
            }

            const isHospital = item === cleanName;

            return (
              <span
                key={`l1-txt-${idx}`}
                className={`inline-block text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-[0.14em] leading-none font-display select-none ${
                  isHospital
                    ? 'stroke-text-medical'
                    : 'stroke-text-medical opacity-50'
                }`}
              >
                {item}
              </span>
            );
          })}
        </div>
      </motion.div>

      {/* Lane 2: Scrolling Right with Opposite Scroll Parallax */}
      {showDualLane && (
        <motion.div
          style={{ x: xOffsetBottom }}
          className="w-max flex will-change-transform opacity-80"
        >
          <div
            className={`flex items-center whitespace-nowrap py-1 ${
              reverse ? 'animate-marquee-continuous' : 'animate-marquee-continuous-reverse'
            }`}
            style={{ animationDuration: '48s' }}
          >
            {repeatedLane2.map((item, idx) => {
              if (item === "✦" || item === "✚") {
                return (
                  <span
                    key={`l2-sym-${idx}`}
                    className="px-6 sm:px-10 text-[#00C2CB]/70 dark:text-[#06B6D4]/80 text-2xl sm:text-4xl select-none"
                  >
                    {item}
                  </span>
                );
              }

              const isHospital = item === cleanName;

              return (
                <span
                  key={`l2-txt-${idx}`}
                  className={`inline-block text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-[0.15em] leading-none font-display select-none ${
                    isHospital
                      ? 'stroke-text-medical-cyan'
                      : 'stroke-text-medical-cyan opacity-50'
                  }`}
                >
                  {item}
                </span>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}
