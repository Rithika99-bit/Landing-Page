import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Pinned SYSTEM SCROLL PROGRESS bar at the very top of viewport.
 * Glowing cyan/violet gradient line that fills 0-100% as user scrolls.
 * Styled like a military/clinical telemetry loading bar with real-time percentage readout.
 */
export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 26,
    restDelta: 0.001,
  });

  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setScrollPercent(Math.min(100, Math.max(0, Math.round(latest * 100))));
    });
  }, [scrollYProgress]);

  return (
    <>
      {/* Pinned Top Glowing Telemetry Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-black/10 dark:bg-white/5 pointer-events-none">
        <motion.div
          className="h-full bg-gradient-to-r from-[#00C2CB] via-[#2F80ED] to-[#8B5CF6] origin-left shadow-[0_0_12px_rgba(0,194,203,0.8),0_0_4px_rgba(139,92,246,0.6)]"
          style={{ scaleX }}
        />
      </div>

      {/* Dynamic Telemetry Readout Pill at Top Right (below bar) */}
      <div className="fixed top-1.5 right-4 sm:right-6 z-50 pointer-events-none select-none">
        <div className="flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#0B2438]/85 backdrop-blur-md border border-cyan-500/30 shadow-[0_0_15px_rgba(0,194,203,0.2)]">
          <span className="flex h-1.5 w-1.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400" />
          </span>
          <span className="font-sans text-[9px] sm:text-[10px] font-semibold tracking-wider text-cyan-300 antialiased">
            SCAN: {scrollPercent.toString().padStart(2, '0')}%
          </span>
        </div>
      </div>
    </>
  );
}
