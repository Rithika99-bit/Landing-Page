import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { isReducedMotionPreferred } from '../../utils/animationTokens';

/**
 * SystemsOnlineReveal:
 * Wraps major section intros with a brief futuristic UI boot sequence upon scroll into view:
 * a brief scan-line sweep and stabilization effect that mimics clinical systems booting online.
 */
export default function SystemsOnlineReveal({ children, className = "", delay = 0 }) {
  const [hasTriggered, setHasTriggered] = useState(false);

  if (isReducedMotionPreferred()) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay }}
      onViewportEnter={() => setHasTriggered(true)}
      className={`relative ${className}`}
    >
      {/* Sci-Fi Laser Scan Line Sweep on Boot */}
      {hasTriggered && (
        <motion.div
          initial={{ top: '0%', opacity: 1 }}
          animate={{ top: '100%', opacity: 0 }}
          transition={{ duration: 0.85, ease: 'easeInOut' }}
          className="pointer-events-none absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent shadow-[0_0_12px_#00F0FF] z-20"
        />
      )}

      {children}
    </motion.div>
  );
}
