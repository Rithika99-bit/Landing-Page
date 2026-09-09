import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Pinned SYSTEM SCROLL PROGRESS bar at the very top of viewport.
 * Glowing cyan/emerald/violet gradient segmented LED bar that fills 0-100% as user scrolls.
 * Styled like an advanced clinical/military telemetry bar with real-time LED ticks & readout.
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
      {/* Pinned Top Glowing Segmented LED Telemetry Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[4px] bg-[#050C17]/90 backdrop-blur-md pointer-events-none overflow-hidden border-b border-cyan-500/20">
        {/* Main Gradient Filling Bar */}
        <motion.div
          className="h-full bg-gradient-to-r from-[#00C2CB] via-[#2F80ED] via-[#10B981] to-[#8B5CF6] origin-left shadow-[0_0_15px_rgba(0,240,255,0.9),0_0_8px_rgba(16,185,129,0.7)] relative"
          style={{ scaleX }}
        >
          {/* Leading Glowing LED Spark Head */}
          <div className="absolute right-0 top-0 bottom-0 w-3 bg-white shadow-[0_0_12px_#FFFFFF,0_0_20px_#00F0FF] rounded-r-full" />
        </motion.div>

        {/* LED Grid Ticks Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#000_1px,transparent_1px)] bg-[size:10px_100%] opacity-40 mix-blend-overlay pointer-events-none" />
      </div>

      {/* Dynamic Telemetry Readout Pill at Top Right (below bar) */}
      <div className="fixed top-2.5 right-4 sm:right-6 z-50 pointer-events-none select-none">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#050C17]/90 backdrop-blur-xl border border-cyan-500/40 shadow-[0_0_20px_rgba(0,240,255,0.25)]">
          {/* Segmented Micro LED Level Blocks */}
          <div className="flex items-center gap-0.5">
            <span className="w-1 h-2 rounded-[1px] bg-cyan-400 animate-pulse shadow-[0_0_4px_#00F0FF]" />
            <span
              className={`w-1 h-2 rounded-[1px] ${
                scrollPercent > 33
                  ? 'bg-emerald-400 shadow-[0_0_4px_#10B981]'
                  : 'bg-cyan-950/80'
              }`}
            />
            <span
              className={`w-1 h-2 rounded-[1px] ${
                scrollPercent > 66
                  ? 'bg-purple-400 shadow-[0_0_4px_#C084FC]'
                  : 'bg-cyan-950/80'
              }`}
            />
          </div>

          <span className="font-mono text-[10px] font-bold tracking-wider text-cyan-300 antialiased">
            TELEMETRY SCAN: <span className="text-white">{scrollPercent.toString().padStart(3, '0')}%</span>
          </span>
        </div>
      </div>
    </>
  );
}
