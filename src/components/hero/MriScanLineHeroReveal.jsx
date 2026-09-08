import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { isFeatureEnabled } from '../../config/featureFlags';
import { isReducedMotionPreferred } from '../../utils/animationTokens';

/**
 * MriScanLineHeroReveal:
 * Thin diagnostic MRI laser scan line that sweeps down the hero container on first load,
 * creating a high-tech clinical diagnostic reveal effect.
 */
export default function MriScanLineHeroReveal({ onComplete }) {
  const isEnabled = isFeatureEnabled('MRI_SCAN_HERO_REVEAL');
  const [isScanning, setIsScanning] = useState(() => {
    return !isReducedMotionPreferred();
  });

  useEffect(() => {
    if (!isEnabled || isReducedMotionPreferred()) {
      if (onComplete) onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setIsScanning(false);
      if (onComplete) onComplete();
    }, 1600);

    return () => clearTimeout(timer);
  }, [isEnabled, onComplete]);

  if (!isEnabled) return null;

  return (
    <AnimatePresence>
      {isScanning && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 pointer-events-none z-30 overflow-hidden"
          aria-hidden="true"
        >
          {/* Sweeping Laser Line with Holographic Cyan/Violet Glow */}
          <motion.div
            initial={{ top: '0%' }}
            animate={{ top: '100%' }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent shadow-[0_0_20px_#00F0FF,0_0_40px_rgba(123,92,250,0.5)]"
          >
            {/* Trailing scan shimmer */}
            <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-cyan-400/10 to-transparent -translate-y-full" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
