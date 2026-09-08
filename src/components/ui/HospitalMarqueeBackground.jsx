import React, { useEffect, useState, useRef } from 'react';

/**
 * HospitalMarqueeBackground:
 * Giant, ultra-soft luxury background text scroller with buttery-smooth GPU-accelerated motion.
 * Uses decoupled parent-parallax & child-marquee architecture so scrolling and infinite drift never stutter.
 */
export default function HospitalMarqueeBackground({
  hospitalName = "AETHERIA HEALTH",
  reverse = false,
  showDualLane = true,
  className = "",
}) {
  const [scrollParallax, setScrollParallax] = useState(0);
  const targetScrollRef = useRef(0);
  const currentScrollRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      targetScrollRef.current = window.scrollY;
    };

    // Smooth lerp loop for silky scroll inertia (matches Lenis 60-120fps)
    const updateMotion = () => {
      const diff = targetScrollRef.current - currentScrollRef.current;
      currentScrollRef.current += diff * 0.08;
      setScrollParallax(currentScrollRef.current);
      rafRef.current = requestAnimationFrame(updateMotion);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    rafRef.current = requestAnimationFrame(updateMotion);

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const cleanHospitalName = hospitalName.replace(/[\[\]]/g, '').trim().toUpperCase();

  const topItems = [
    cleanHospitalName,
    "ADVANCED ROBOTIC SURGERY",
    "GENOMIC DIGITAL TWIN",
    cleanHospitalName,
    "SUB-CELLULAR AI DIAGNOSTICS",
    "24/7 EMERGENCY TRIAGE",
    "JCI GOLD EXCELLENCE",
  ];

  const bottomItems = [
    "ACOUSTIC HEALING SUITES",
    "7-TESLA PRECISION MRI",
    "WORLD-CLASS MEDICAL FACULTY",
    "ZERO-WAIT EMERGENCY INTAKE",
    "100% PRIVATE RECOVERY SUITES",
    "PRECISION GENE THERAPY",
  ];

  const repeatedTop = [...topItems, ...topItems, ...topItems];
  const repeatedBottom = [...bottomItems, ...bottomItems, ...bottomItems];

  // Parallax translation applied to the PARENT layer (never conflicts with child CSS marquee)
  const offsetTop = (scrollParallax * 0.22 * (reverse ? -1 : 1)) % 600;
  const offsetBottom = (scrollParallax * 0.22 * (reverse ? 1 : -1)) % 600;

  return (
    <div
      className={`pointer-events-none select-none absolute inset-0 overflow-hidden w-full h-full flex flex-col justify-center gap-6 sm:gap-12 z-0 ${className}`}
      aria-hidden="true"
    >
      {/* Soft edge gradient masks with mist-like gradual falloff */}
      <div className="absolute inset-y-0 left-0 w-32 sm:w-64 bg-gradient-to-r from-[#F8FBFF] dark:from-[#080B1A] via-[#F8FBFF]/85 dark:via-[#080B1A]/85 to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 sm:w-64 bg-gradient-to-l from-[#F8FBFF] dark:from-[#080B1A] via-[#F8FBFF]/85 dark:via-[#080B1A]/85 to-transparent z-10 pointer-events-none" />

      {/* Lane 1: Parent handles gentle scroll parallax, Child handles infinite 60fps marquee */}
      <div
        className="w-full flex whitespace-nowrap overflow-visible will-change-transform"
        style={{
          transform: `translate3d(-${offsetTop}px, 0, 0)`,
        }}
      >
        <div className="flex whitespace-nowrap will-change-transform animate-marquee-slow">
          {repeatedTop.map((item, idx) => {
            const isName = item === cleanHospitalName;
            return (
              <span
                key={`top-${idx}`}
                className={`inline-flex items-center gap-6 sm:gap-8 px-6 sm:px-10 text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider uppercase font-display select-none leading-none ${
                  isName ? 'soft-watermark-text font-extrabold' : 'soft-watermark-text opacity-85'
                }`}
              >
                <span>{item}</span>
                <span className="text-blue-400/40 dark:text-blue-300/30 text-2xl sm:text-4xl font-light">✦</span>
              </span>
            );
          })}
        </div>
      </div>

      {/* Lane 2: Reverse drift with complementary cyan softness */}
      {showDualLane && (
        <div
          className="w-full flex whitespace-nowrap overflow-visible will-change-transform"
          style={{
            transform: `translate3d(${offsetBottom}px, 0, 0)`,
          }}
        >
          <div
            className="flex whitespace-nowrap will-change-transform"
            style={{
              animation: 'marquee-scroll 55s linear infinite reverse',
            }}
          >
            {repeatedBottom.map((item, idx) => (
              <span
                key={`bot-${idx}`}
                className="inline-flex items-center gap-6 sm:gap-8 px-6 sm:px-10 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-wider uppercase font-display select-none leading-none soft-watermark-cyan opacity-80"
              >
                <span>{item}</span>
                <span className="text-cyan-400/40 dark:text-cyan-300/30 text-xl sm:text-3xl font-light">✦</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
