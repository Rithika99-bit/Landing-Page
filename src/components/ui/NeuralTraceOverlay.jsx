import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { isFeatureEnabled } from '../../config/featureFlags';
import { isReducedMotionPreferred } from '../../utils/animationTokens';
import { Zap } from 'lucide-react';

/**
 * NeuralTraceOverlay:
 * Renders an animated photon light arc traveling from the AI triage copilot
 * towards the designated department card or organ section when a symptom is queried.
 */
export default function NeuralTraceOverlay() {
  const isEnabled = isFeatureEnabled('NEURAL_TRACE_OVERLAY');
  const [activeTrace, setActiveTrace] = useState(null);

  useEffect(() => {
    if (!isEnabled) return;
    const handleTraceEvent = (e) => {
      if (isReducedMotionPreferred()) return;
      const { symptom = 'Biometric Telemetry', targetSelector = '#services' } = e.detail || {};

      const startX = window.innerWidth - 60;
      const startY = window.innerHeight - 60;

      let endX = window.innerWidth * 0.45;
      let endY = window.innerHeight * 0.45;

      const targetEl = document.querySelector(targetSelector);
      if (targetEl) {
        const rect = targetEl.getBoundingClientRect();
        endX = rect.left + rect.width / 2;
        endY = Math.max(80, rect.top + rect.height / 3);
      }

      const traceId = Date.now();
      setActiveTrace({
        id: traceId,
        symptom,
        startX,
        startY,
        endX,
        endY,
      });

      // Highlight target card if possible
      if (targetEl) {
        targetEl.classList.add('ring-2', 'ring-cyan-400', 'shadow-[0_0_30px_rgba(0,240,255,0.4)]');
        setTimeout(() => {
          targetEl.classList.remove('ring-2', 'ring-cyan-400', 'shadow-[0_0_30px_rgba(0,240,255,0.4)]');
        }, 2200);
      }

      setTimeout(() => {
        setActiveTrace((current) => (current && current.id === traceId ? null : current));
      }, 2200);
    };

    window.addEventListener('aurelia:neural-trace', handleTraceEvent);
    return () => window.removeEventListener('aurelia:neural-trace', handleTraceEvent);
  }, []);

  if (!isEnabled || !activeTrace) return null;

  // Bezier curve control points
  const midX = (activeTrace.startX + activeTrace.endX) / 2 + 80;
  const midY = (activeTrace.startY + activeTrace.endY) / 2 - 120;
  const pathD = `M ${activeTrace.startX} ${activeTrace.startY} Q ${midX} ${midY} ${activeTrace.endX} ${activeTrace.endY}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
        {/* Animated Curved Energy Filament */}
        <svg className="w-full h-full absolute inset-0">
          <defs>
            <linearGradient id="neuralGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7B5CFA" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#00F0FF" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#00C2CB" stopOpacity="0.95" />
            </linearGradient>
            <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background Trace Guide */}
          <path
            d={pathD}
            fill="none"
            stroke="url(#neuralGlow)"
            strokeWidth="2.5"
            strokeDasharray="6 6"
            className="opacity-70"
          />

          {/* Traveling Photon Pulse Head */}
          <motion.circle
            r="6"
            fill="#00F0FF"
            filter="url(#glowFilter)"
            initial={{ offsetDistance: '0%' }}
            animate={{ offsetDistance: '100%' }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              offsetPath: `path("${pathD}")`,
            }}
          />
        </svg>

        {/* Small floating HUD Pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          style={{ left: Math.min(window.innerWidth - 320, Math.max(20, activeTrace.endX - 120)), top: Math.max(30, activeTrace.endY - 60) }}
          className="absolute px-3 py-1.5 rounded-full bg-[#080B1A]/95 text-white border border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.4)] backdrop-blur-xl flex items-center gap-2 text-xs font-mono font-bold"
        >
          <Zap className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
          <span>NEURAL ROUTE: {activeTrace.symptom.toUpperCase()}</span>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
