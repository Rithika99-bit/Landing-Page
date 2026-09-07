import React, { useEffect, useState, useRef } from 'react';

/**
 * HospitalMarqueeBackground:
 * Giant, high-visibility dual-lane background text scroller.
 * Moves continuously with marquee animation AND speeds up/shifts with page scrolling!
 */
export default function HospitalMarqueeBackground({
  hospitalName = "AETHERIA HEALTH",
  reverse = false,
  showDualLane = true,
  className = "",
}) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const topItems = [
    `[ ${hospitalName.toUpperCase()} ]`,
    "ADVANCED ROBOTIC SURGERY",
    "GENOMIC DIGITAL TWIN",
    `[ ${hospitalName.toUpperCase()} ]`,
    "SUB-CELLULAR AI DIAGNOSTICS",
    "24/7 EMERGENCY TRIAGE",
    "JCI GOLD EXCELLENCE",
  ];

  const bottomItems = [
    "ACOUSTIC HEALING SANCTUARY",
    "7-TESLA HIGH FIELD MRI",
    "WORLD-CLASS MEDICAL FACULTY",
    "ZERO-WAIT EMERGENCY INTAKE",
    "100% PRIVATE HEALING SUITES",
    "PRECISION GENE THERAPY",
  ];

  const repeatedTop = [...topItems, ...topItems, ...topItems];
  const repeatedBottom = [...bottomItems, ...bottomItems, ...bottomItems];

  // Dynamic parallax offset based on scroll
  const scrollOffsetTop = (scrollY * 0.35 * (reverse ? -1 : 1)) % 1000;
  const scrollOffsetBottom = (scrollY * 0.35 * (reverse ? 1 : -1)) % 1000;

  return (
    <div
      className={`pointer-events-none select-none absolute inset-0 overflow-hidden w-full h-full flex flex-col justify-center gap-6 sm:gap-10 z-0 ${className}`}
      aria-hidden="true"
    >
      {/* Edge gradient masks */}
      <div className="absolute inset-y-0 left-0 w-24 sm:w-48 bg-gradient-to-r from-[#F8FBFF] dark:from-[#07131E] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 sm:w-48 bg-gradient-to-l from-[#F8FBFF] dark:from-[#07131E] to-transparent z-10 pointer-events-none" />

      {/* Lane 1: Left-to-Right drift with scroll parallax */}
      <div
        className="flex whitespace-nowrap will-change-transform animate-marquee-slow"
        style={{
          transform: `translateX(-${scrollOffsetTop}px)`,
          transition: 'transform 0.05s linear',
        }}
      >
        {repeatedTop.map((item, idx) => (
          <span
            key={`top-${idx}`}
            className="inline-flex items-center gap-6 px-8 text-6xl sm:text-8xl md:text-9xl font-black tracking-[0.14em] uppercase stroke-text-medical leading-none font-display"
          >
            <span>{item}</span>
            <span className="text-[#2F80ED]/70 text-3xl sm:text-5xl font-normal">✦</span>
          </span>
        ))}
      </div>

      {/* Lane 2: Right-to-Left drift with opposite scroll parallax */}
      {showDualLane && (
        <div
          className="flex whitespace-nowrap will-change-transform"
          style={{
            transform: `translateX(${scrollOffsetBottom}px)`,
            transition: 'transform 0.05s linear',
            animation: 'marquee-scroll 50s linear infinite reverse',
          }}
        >
          {repeatedBottom.map((item, idx) => (
            <span
              key={`bot-${idx}`}
              className="inline-flex items-center gap-6 px-8 text-5xl sm:text-7xl md:text-8xl font-black tracking-[0.16em] uppercase stroke-text-medical-cyan leading-none font-display"
            >
              <span>{item}</span>
              <span className="text-[#00C2CB]/70 text-2xl sm:text-4xl font-normal">✦</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
