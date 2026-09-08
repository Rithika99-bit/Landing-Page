import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { isReducedMotionPreferred } from '../../utils/animationTokens';
import { audioManager } from '../../utils/audioManager';
import { ShieldCheck, Activity, Zap } from 'lucide-react';

/**
 * PageLoadIntro:
 * "Biometric Holographic Aperture & Quantum Optic Unveiling"
 *
 * Replaces typical sliding door preloaders with a futuristic optical iris lens:
 * 1. Concentric counter-rotating holographic dials & optical reticle.
 * 2. Rapid 0% -> 100% biometric calibration counter with diagnostic logs.
 * 3. Expansive radial iris wipe (circle clip-path) with cyan/violet photon refraction.
 * 4. Click-anywhere-to-skip, Esc/Space keydown support, reduced-motion bypass.
 */
export default function PageLoadIntro({ onComplete }) {
  const [stage, setStage] = useState('calibrating'); // 'calibrating' | 'dilating' | 'done'
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING SPECTRAL SENSORS...');
  const isSkippedRef = useRef(false);

  const handleSkip = () => {
    if (isSkippedRef.current) return;
    isSkippedRef.current = true;
    audioManager.playConfirmation(0.1);
    setStage('done');
    if (onComplete) onComplete();
  };

  useEffect(() => {
    // Immediate bypass for users with reduced motion preferences
    if (isReducedMotionPreferred()) {
      setStage('done');
      if (onComplete) onComplete();
      return;
    }

    // High-speed telemetry calibration countdown (0 -> 100 in ~950ms)
    const startTime = performance.now();
    const duration = 950;

    let animFrame;
    const updateProgress = (now) => {
      if (isSkippedRef.current) return;
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct < 30) {
        setStatusText('CALIBRATING 7-TESLA OPTICAL ARRAY...');
      } else if (pct < 65) {
        setStatusText('SYNCHRONIZING GENOMIC BIOMETRIC TWIN...');
      } else if (pct < 95) {
        setStatusText('ENGAGING AURELIA CLINICAL COMMAND OS...');
      } else {
        setStatusText('SYSTEMS 100% NOMINAL // READY');
      }

      if (pct < 100) {
        animFrame = requestAnimationFrame(updateProgress);
      } else {
        // Trigger optical iris dilatation
        setTimeout(() => {
          if (isSkippedRef.current) return;
          audioManager.playConfirmation(0.12);
          setStage('dilating');

          // Finish and reveal page
          setTimeout(() => {
            if (isSkippedRef.current) return;
            setStage('done');
            if (onComplete) onComplete();
          }, 550);
        }, 120);
      }
    };

    animFrame = requestAnimationFrame(updateProgress);

    // Keyboard shortcuts (Escape or Space)
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === ' ') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Safety failsafe timer (under no circumstance blocks longer than 1.8s)
    const failsafe = setTimeout(() => {
      if (!isSkippedRef.current) {
        handleSkip();
      }
    }, 1800);

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(failsafe);
    };
  }, [onComplete]);

  if (stage === 'done') return null;

  return (
    <AnimatePresence>
      <div
        onClick={handleSkip}
        className="fixed inset-0 z-[100] cursor-pointer pointer-events-auto select-none overflow-hidden flex items-center justify-center bg-[#04060E]"
        aria-label="Aurelia Healthcare System Initialization"
        title="Click anywhere to enter immediately"
      >
        {/* Expanding Circular Optical Iris Mask */}
        <motion.div
          initial={{ clipPath: 'circle(150% at 50% 50%)' }}
          animate={{
            clipPath: stage === 'dilating' ? 'circle(0% at 50% 50%)' : 'circle(150% at 50% 50%)',
          }}
          transition={{ duration: 0.55, ease: [0.77, 0, 0.175, 1] }}
          className="absolute inset-0 bg-[#04060E] flex flex-col items-center justify-center"
        >
          {/* Subtle Ambient Cosmic Grid & Glow */}
          <div className="absolute inset-0 circuit-grid-bg opacity-30 pointer-events-none" />
          <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-cyan-500/10 via-violet-500/10 to-transparent blur-3xl pointer-events-none animate-pulse-slow" />

          {/* Holographic Concentric Lens Reticle */}
          <div className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center">
            {/* 1. Outermost Segmented Calibration Dial (Clockwise rotation) */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full border border-cyan-500/20"
            >
              <svg viewBox="0 0 400 400" className="w-full h-full stroke-cyan-400/40 fill-none">
                {/* Micro tick marks around perimeter */}
                {Array.from({ length: 24 }).map((_, i) => {
                  const angle = (i * 360) / 24;
                  return (
                    <line
                      key={i}
                      x1="200"
                      y1="10"
                      x2="200"
                      y2={i % 6 === 0 ? "24" : "18"}
                      strokeWidth={i % 6 === 0 ? "2" : "1"}
                      transform={`rotate(${angle} 200 200)`}
                    />
                  );
                })}
              </svg>
            </motion.div>

            {/* 2. Secondary Counter-Rotating Ring (Counter-clockwise) */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-5 rounded-full border border-dashed border-violet-400/30"
            />

            {/* 3. High-Tech Angle Segment Arc */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-10 rounded-full border-2 border-transparent border-t-cyan-400 border-r-cyan-400/40"
            />

            {/* 4. Center Bio-Crystalline Core */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-[#080B1A]/90 backdrop-blur-2xl border border-cyan-400/50 shadow-[0_0_40px_rgba(0,240,255,0.35)] flex flex-col items-center justify-center overflow-hidden">
              {/* Inner Pulsing Radar Sweep */}
              <div className="absolute inset-0 animate-radar-sweep bg-gradient-to-tr from-transparent via-cyan-500/10 to-transparent rounded-full" />

              {/* Dynamic ECG Waveform */}
              <div className="w-24 h-12 relative flex items-center justify-center">
                <svg viewBox="0 0 100 40" className="w-full h-full stroke-cyan-300 fill-none">
                  <motion.path
                    d="M 0 20 L 25 20 L 32 8 L 40 32 L 48 5 L 56 28 L 62 18 L 68 22 L 74 20 L 100 20"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                      filter: 'drop-shadow(0 0 6px #00F0FF)',
                    }}
                  />
                </svg>
              </div>

              {/* Real-time Percentage Surge */}
              <div className="flex items-baseline gap-0.5 mt-1 z-10">
                <span className="font-mono text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {progress}
                </span>
                <span className="font-mono text-xs font-bold text-cyan-400">%</span>
              </div>

              <span className="text-[9px] font-mono tracking-widest text-cyan-400/80 uppercase mt-0.5 z-10">
                CALIBRATED
              </span>
            </div>

            {/* Orbiting Quantum Synapse Particle */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 pointer-events-none"
            >
              <div className="w-3 h-3 rounded-full bg-cyan-300 shadow-[0_0_15px_#00F0FF] absolute -top-1.5 left-1/2 -translate-x-1/2" />
            </motion.div>
          </div>

          {/* Diagnostic Status & Clinical OS Telemetry */}
          <div className="mt-8 flex flex-col items-center text-center px-4 max-w-md z-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-[11px] font-mono text-cyan-300 mb-2.5 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
              </span>
              <span className="font-bold tracking-wider uppercase">AURELIA OS · v4.8</span>
              <span className="text-gray-500">|</span>
              <span className="text-gray-300 flex items-center gap-1 font-medium">
                <ShieldCheck className="w-3 h-3 text-cyan-300" />
                7-Tesla Quantum Node
              </span>
            </div>

            {/* Active Clinical Diagnostic Step Log */}
            <p className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-gray-200 uppercase min-h-[20px]">
              {statusText}
            </p>

            {/* Progress Micro-Bar */}
            <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mt-3">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 shadow-[0_0_10px_#00F0FF]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Click to Enter Prompt */}
          <div className="absolute bottom-8 inset-x-0 flex justify-center z-20">
            <button
              onClick={handleSkip}
              className="group px-4 py-1.5 rounded-full bg-[#080B1A]/80 hover:bg-cyan-950/60 border border-cyan-500/30 hover:border-cyan-400 text-[11px] font-mono text-cyan-300/80 hover:text-cyan-200 transition-all flex items-center gap-2 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
            >
              <Zap className="w-3 h-3 text-cyan-400 group-hover:scale-125 transition-transform" />
              <span>CLICK ANYWHERE TO ENGAGE</span>
              <span className="text-gray-500">[ESC]</span>
            </button>
          </div>
        </motion.div>

        {/* Shockwave Photon Ring Flash on Dilatation */}
        {stage === 'dilating' && (
          <motion.div
            initial={{ scale: 0.2, opacity: 1 }}
            animate={{ scale: 3.5, opacity: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="absolute w-80 h-80 rounded-full border-4 border-[#00F0FF] shadow-[0_0_80px_#00F0FF,0_0_140px_#7B5CFA] pointer-events-none"
          />
        )}
      </div>
    </AnimatePresence>
  );
}
