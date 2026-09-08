import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { audioManager } from '../../utils/audioManager';
import { isReducedMotionPreferred } from '../../utils/animationTokens';

/**
 * LiveECGDivider:
 * Continuous animated SVG heartbeat line glowing cyan between sections.
 * Displays a traveling photon pulse that sweeps across the QRS complex.
 */
export default function LiveECGDivider({ className = "" }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (isReducedMotionPreferred()) return;

    // Periodically play subtle heartbeat sound if user enabled ECG audio
    const interval = setInterval(() => {
      if (audioManager.isEnabled) {
        audioManager.playHeartbeat(0.04);
      }
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-10 overflow-hidden flex items-center justify-center pointer-events-none select-none my-1 sm:my-2 ${className}`}
    >
      {/* Background Subtle Axis Line */}
      <div className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/25 to-transparent" />

      {/* Repeating Animated SVG Heartbeat Trace */}
      <div className="w-full max-w-5xl h-full flex items-center justify-center relative">
        <svg
          viewBox="0 0 1000 60"
          className="w-full h-full stroke-cyan-400 fill-none"
          preserveAspectRatio="none"
        >
          <path
            d="M 0 30 L 200 30 L 210 20 L 220 30 L 235 30 L 245 8 L 255 52 L 265 18 L 275 35 L 285 30 L 500 30 L 700 30 L 710 20 L 720 30 L 735 30 L 745 8 L 755 52 L 765 18 L 775 35 L 785 30 L 1000 30"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-70"
            style={{
              filter: 'drop-shadow(0 0 6px #00F0FF) drop-shadow(0 0 12px rgba(123, 92, 250, 0.5))',
            }}
          />
        </svg>

        {/* Traveling Photon Pulse Spike */}
        <motion.div
          animate={{
            x: ['-50%', '50%'],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute w-20 h-1 bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_12px_#00F0FF]"
        />
      </div>
    </div>
  );
}
