import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, Minus, ChevronUp } from 'lucide-react';
import { isFeatureEnabled } from '../../config/featureFlags';
import { isReducedMotionPreferred } from '../../utils/animationTokens';

/**
 * BreathingCompanion:
 * Calm 4-7-8 breathing circle near the Emergency & Clinical care section.
 * Provides an optional, soothing rhythm (Inhale 4s, Hold 7s, Exhale 8s) for patients
 * or visitors seeking a moment to settle.
 * Opt-in, dismissible, accessible.
 */
export default function BreathingCompanion() {
  const isEnabled = isFeatureEnabled('BREATHING_COMPANION');

  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [phase, setPhase] = useState('Inhale'); // 'Inhale' | 'Hold' | 'Exhale'
  const [countdown, setCountdown] = useState(4);

  useEffect(() => {
    if (!isOpen || isDismissed || isReducedMotionPreferred()) return;

    let timer;
    if (phase === 'Inhale') {
      timer = setTimeout(() => {
        setPhase('Hold');
        setCountdown(7);
      }, 4000);
    } else if (phase === 'Hold') {
      timer = setTimeout(() => {
        setPhase('Exhale');
        setCountdown(8);
      }, 7000);
    } else if (phase === 'Exhale') {
      timer = setTimeout(() => {
        setPhase('Inhale');
        setCountdown(4);
      }, 8000);
    }

    return () => clearTimeout(timer);
  }, [phase, isOpen, isDismissed]);

  // Second-by-second countdown
  useEffect(() => {
    if (!isOpen || isDismissed) return;
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 1 ? prev - 1 : 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, isDismissed]);

  if (!isEnabled || isDismissed) return null;

  return (
    <div className="fixed bottom-7 left-7 z-40 select-none">
      <AnimatePresence>
        {!isOpen ? (
          /* Minimized Floating Trigger Pill */
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#080B1A]/85 text-white border border-cyan-400/30 shadow-[0_4px_20px_rgba(0,240,255,0.2)] backdrop-blur-xl hover:border-cyan-400 transition-all text-xs font-mono group"
            title="Take a calm moment with the 4-7-8 Breathing Companion"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping group-hover:bg-emerald-400" />
            <Heart className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-gray-300 group-hover:text-white">Calm Breathing</span>
            <ChevronUp className="w-3.5 h-3.5 text-gray-400" />
          </motion.button>
        ) : (
          /* Expanded Breathing Circle Card */
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 15 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="w-72 p-5 rounded-3xl bg-[#080B1A]/95 text-white border border-cyan-400/40 shadow-[0_16px_40px_rgba(0,0,0,0.6),0_0_30px_rgba(0,240,255,0.25)] backdrop-blur-2xl relative"
          >
            {/* Header controls */}
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono font-bold tracking-wider text-cyan-300 uppercase">
                  4-7-8 Breathing
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                  title="Minimize"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsDismissed(true)}
                  className="p-1 rounded-lg text-gray-400 hover:text-rose-400 hover:bg-white/10 transition-colors"
                  title="Dismiss"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Breathing Animation Circle */}
            <div className="flex flex-col items-center justify-center py-4">
              <div className="relative w-32 h-32 flex items-center justify-center">
                {/* Outer animated halo ring */}
                <motion.div
                  animate={{
                    scale: phase === 'Inhale' ? 1.35 : phase === 'Hold' ? 1.35 : 0.85,
                    opacity: phase === 'Inhale' ? 0.6 : phase === 'Hold' ? 0.8 : 0.3,
                  }}
                  transition={{
                    duration: phase === 'Inhale' ? 4 : phase === 'Hold' ? 0.5 : 8,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#00F0FF]/30 to-[#7B5CFA]/30 blur-md pointer-events-none"
                />

                {/* Main Pulsing Core */}
                <motion.div
                  animate={{
                    scale: phase === 'Inhale' ? 1.25 : phase === 'Hold' ? 1.25 : 0.8,
                    borderColor:
                      phase === 'Inhale'
                        ? '#00F0FF'
                        : phase === 'Hold'
                        ? '#10B981'
                        : '#7B5CFA',
                  }}
                  transition={{
                    duration: phase === 'Inhale' ? 4 : phase === 'Hold' ? 0.5 : 8,
                    ease: 'easeInOut',
                  }}
                  className="w-24 h-24 rounded-full border-2 border-cyan-400 bg-gradient-to-b from-[#00F0FF]/15 to-transparent flex flex-col items-center justify-center text-center shadow-[0_0_25px_rgba(0,240,255,0.3)]"
                >
                  <span className="text-sm font-bold tracking-wide font-mono text-white">
                    {phase}
                  </span>
                  <span className="text-xs font-mono text-cyan-300 font-black">
                    {countdown}s
                  </span>
                </motion.div>
              </div>

              <p className="text-[11px] text-gray-400 font-sans text-center mt-3 leading-relaxed">
                {phase === 'Inhale' && 'Slowly breathe in through your nose...'}
                {phase === 'Hold' && 'Hold your breath calmly and relax your shoulders.'}
                {phase === 'Exhale' && 'Gently release all air through your mouth...'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
