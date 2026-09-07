import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * ScrollProgressBar:
 * Pinned at the very top of the viewport.
 * Tracks user scrolling with a smooth spring-physics electric blue / cyan gradient bar
 * and an optional minimalist scroll telemetry indicator.
 */
export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001,
  });

  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setScrollPercent(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  return (
    <>
      {/* Pinned Top Glowing Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3.5px] bg-transparent pointer-events-none">
        <motion.div
          className="h-full bg-gradient-to-r from-[#2F80ED] via-[#00C2CB] to-[#38bdf8] origin-left shadow-[0_0_12px_rgba(47,128,237,0.7)]"
          style={{ scaleX }}
        />
      </div>

      {/* Floating Scroll Telemetry Pill (Visible on Desktop when scrolling) */}
      <div
        className={`fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/85 dark:bg-[#0B2438]/90 backdrop-blur-md border border-blue-200/80 dark:border-blue-800/80 shadow-[0_8px_25px_rgba(47,128,237,0.15)] transition-all duration-300 pointer-events-none ${
          scrollPercent > 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00C2CB] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00C2CB]" />
        </span>
        <span className="font-mono text-[10px] font-extrabold tracking-widest text-[#0B2438] dark:text-blue-200 uppercase">
          NAV // {scrollPercent}%
        </span>
      </div>
    </>
  );
}
