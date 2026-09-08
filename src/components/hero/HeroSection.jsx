import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, ShieldCheck, Activity, Heart, Cpu } from 'lucide-react';
import MedicalCanvas3D from '../3d/MedicalCanvas3D';
import HospitalMarqueeBackground from '../ui/HospitalMarqueeBackground';
import CircadianHeroGradient from './CircadianHeroGradient';
import MriScanLineHeroReveal from './MriScanLineHeroReveal';
import { audioManager } from '../../utils/audioManager';
import { isFeatureEnabled } from '../../config/featureFlags';

export default function HeroSection({ hospitalName, onOpenBooking }) {
  // Easter Egg: 5 clicks on Heart / 3D Canvas
  const [clickCount, setClickCount] = useState(0);
  const [easterEggActive, setEasterEggActive] = useState(false);
  const clickResetTimeout = useRef(null);

  const handleEasterEggClick = () => {
    if (!isFeatureEnabled('HEARTBEAT_EASTER_EGG')) return;

    audioManager.playHeartbeat(0.12);
    setClickCount((prev) => {
      const next = prev + 1;
      if (next >= 5) {
        setEasterEggActive(true);
        audioManager.playConfirmation(0.2);
        setTimeout(() => setEasterEggActive(false), 3800);
        return 0;
      }
      return next;
    });

    if (clickResetTimeout.current) clearTimeout(clickResetTimeout.current);
    clickResetTimeout.current = setTimeout(() => {
      setClickCount(0);
    }, 2500);
  };
  // Magnetic Button Effect
  const primaryBtnRef = useRef(null);
  const [btnPos, setBtnPos] = useState({ x: 0, y: 0 });
  const [isScanningClick, setIsScanningClick] = useState(false);

  const handleBtnMouseMove = (e) => {
    if (!primaryBtnRef.current) return;
    const rect = primaryBtnRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setBtnPos({ x: x * 0.28, y: y * 0.28 });
  };

  const handleBtnMouseLeave = () => {
    setBtnPos({ x: 0, y: 0 });
  };

  const handlePrimaryClick = () => {
    setIsScanningClick(true);
    audioManager.playConfirmation(0.1);
    setTimeout(() => setIsScanningClick(false), 600);
    onOpenBooking();
  };

  return (
    <section
      id="hero"
      className="relative min-h-[94vh] lg:min-h-screen flex items-center justify-center pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden medical-mesh-bg medical-subtle-grid circuit-grid-bg"
    >
      {/* Dynamic Circadian Time-of-Day Gradient Backdrop */}
      <CircadianHeroGradient />

      {/* Initial Page Entrance Diagnostic MRI Scan Line Reveal */}
      <MriScanLineHeroReveal />

      {/* Hidden Heartbeat Easter Egg Flash Overlay */}
      {easterEggActive && (
        <div className="fixed inset-0 z-50 pointer-events-none flex flex-col items-center justify-center bg-white/25 backdrop-blur-sm animate-pulse transition-all duration-300">
          <div className="p-6 rounded-3xl bg-[#080B1A]/95 text-white border-2 border-cyan-400 shadow-[0_0_50px_rgba(0,240,255,0.8)] text-center max-w-lg mx-4">
            <span className="text-3xl mb-2 block animate-bounce">⚡</span>
            <h3 className="text-lg sm:text-xl font-mono font-black text-cyan-300 tracking-wider">
              DEFIBRILLATOR: CHARGING... CLEAR!
            </h3>
            <p className="text-xs sm:text-sm font-sans text-gray-300 mt-2 leading-relaxed">
              Cardiac Resynchronization 100% Achieved. Thank you for exploring Aurelia Healthcare's advanced clinical systems!
            </p>
          </div>
        </div>
      )}

      {/* 3D Medical Canvas (DNA Helix, Crystalline Rings, Floating Particles) */}
      <MedicalCanvas3D className="opacity-95" />

      {/* Futuristic Horizontal Laser Scan Sweep Line */}
      <div className="pointer-events-none absolute inset-x-0 h-32 overflow-hidden z-10">
        <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent animate-laser-sweep shadow-[0_0_15px_#00F0FF]" />
      </div>

      {/* Hospital Name Signature Marquee Effect in the background */}
      <HospitalMarqueeBackground hospitalName={hospitalName} />

      {/* Subtle Animated Sci-Fi Light Rays */}
      <div className="pointer-events-none absolute -top-40 left-1/3 w-[600px] h-[600px] bg-gradient-to-b from-cyan-400/15 via-blue-500/10 to-transparent rounded-full blur-3xl transform -rotate-12 animate-pulse-slow" />
      <div className="pointer-events-none absolute top-1/4 -right-20 w-[500px] h-[500px] bg-gradient-to-tr from-violet-500/15 to-transparent rounded-full blur-3xl" />

      {/* Main Hero Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Hero Content (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Technological Trust Pill Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-[#0B2438]/80 backdrop-blur-md border border-cyan-400/40 shadow-[0_0_20px_rgba(0,240,255,0.18)] mb-6 text-xs sm:text-sm font-semibold text-[#0B2438] dark:text-white"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00F0FF] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00F0FF]"></span>
              </span>
              <span className="text-[#00C2CB] dark:text-[#00F0FF] font-bold font-mono">COMMAND // NEXT-GEN</span>
              <span className="text-gray-300">|</span>
              <span className="text-[#4A6278] dark:text-gray-300 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00C2CB]" />
                JCI & ISO 9001 Accredited
              </span>
            </motion.div>

            {/* Hero Headline with Clip-Path Reveal */}
            <motion.h1
              initial={{ opacity: 0, y: 35, clipPath: 'inset(100% 0% 0% 0%)' }}
              animate={{ opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#0B2438] dark:text-white leading-[1.08] mb-6"
            >
              Advanced Care.{' '}
              <span className="bg-gradient-to-r from-[#00F0FF] via-[#2F80ED] to-[#7B5CFA] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(0,240,255,0.25)]">
                Better Living.
              </span>
            </motion.h1>

            {/* Supporting Sentence */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-base sm:text-lg lg:text-xl text-[#4A6278] dark:text-gray-300 font-normal leading-relaxed max-w-2xl mb-8"
            >
              Trusted healthcare powered by experienced professionals, advanced technology, and personalized patient care.
            </motion.p>

            {/* CTAs with Magnetic Effect on Primary */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <div
                ref={primaryBtnRef}
                onMouseMove={handleBtnMouseMove}
                onMouseLeave={handleBtnMouseLeave}
                className="relative inline-block"
              >
                <motion.button
                  animate={{ x: btnPos.x, y: btnPos.y }}
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  onClick={handlePrimaryClick}
                  className="relative px-7 py-4 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-[#00C2CB] via-[#2F80ED] to-[#7B5CFA] rounded-full shadow-[0_12px_32px_rgba(0,194,203,0.35)] hover:shadow-[0_16px_45px_rgba(0,240,255,0.55)] transition-all duration-300 flex items-center gap-3 group overflow-hidden border border-white/20"
                >
                  {/* Fingerprint / Scan Ripple Effect on Click */}
                  {isScanningClick && (
                    <span className="absolute inset-0 rounded-full bg-[#00F0FF]/30 animate-ping" />
                  )}

                  <span className="absolute inset-0 w-full h-full bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                  <Calendar className="w-5 h-5 transition-transform group-hover:scale-110" />
                  <span>Book an Appointment</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </div>

              <a
                href="#services"
                className="px-7 py-4 text-sm sm:text-base font-semibold text-[#0B2438] dark:text-white bg-white/80 dark:bg-[#0E2236]/80 hover:bg-white dark:hover:bg-[#132A44] backdrop-blur-md rounded-full border border-white/90 dark:border-cyan-500/20 shadow-[0_4px_20px_rgba(11,36,56,0.06)] hover:shadow-[0_8px_25px_rgba(0,240,255,0.15)] transition-all duration-200 flex items-center gap-2 group"
              >
                <span>Explore Services</span>
                <span className="text-[#00C2CB] transition-transform group-hover:translate-x-1">↓</span>
              </a>
            </div>

            {/* Quick Micro Credentials Under Hero with Stagger */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.7 }}
              className="grid grid-cols-3 gap-6 pt-6 border-t border-blue-100/60 dark:border-gray-800 w-full max-w-lg"
            >
              <div>
                <p className="text-xl sm:text-2xl font-black text-[#0B2438] dark:text-white font-mono">99.4%</p>
                <p className="text-xs font-medium text-[#4A6278] dark:text-gray-400">Clinical Accuracy</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-[#0B2438] dark:text-white font-mono">Zero</p>
                <p className="text-xs font-medium text-[#4A6278] dark:text-gray-400">Wait Intake</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-[#0B2438] dark:text-white font-mono">24/7</p>
                <p className="text-xs font-medium text-[#4A6278] dark:text-gray-400">Trauma & Telehealth</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Hero Space: Orbiting Holographic HUD Telemetry Badges around 3D DNA Canvas */}
          <div className="hidden lg:block lg:col-span-5 relative h-96 pointer-events-none select-none">
            {/* HUD Tag 1: Heart Rate (Easter Egg Trigger: Click 5 times) */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              onClick={handleEasterEggClick}
              className="absolute top-4 left-4 p-3 rounded-2xl bg-[#080B1A]/85 text-white backdrop-blur-xl border border-cyan-400/40 shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:border-rose-400/80 cursor-pointer flex items-center gap-2.5 z-20 pointer-events-auto transition-colors group"
              title="Click to monitor telemetry (Hint: 5 quick clicks activate cardiac test)"
            >
              <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30 group-hover:scale-110 transition-transform">
                <Heart className="w-4 h-4 animate-pulse text-rose-400" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[9px] text-gray-400 uppercase tracking-wider block">Telemetry HUD</span>
                  {clickCount > 0 && (
                    <span className="text-[9px] font-mono text-cyan-300 font-bold">[{clickCount}/5]</span>
                  )}
                </div>
                <span className="font-mono text-xs font-black text-[#00F0FF]">HEART RATE: 72 BPM</span>
              </div>
            </motion.div>

            {/* HUD Tag 2: Oxygen Saturation */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute top-28 right-0 p-3 rounded-2xl bg-[#080B1A]/85 text-white backdrop-blur-xl border border-violet-400/40 shadow-[0_0_20px_rgba(123,92,250,0.25)] flex items-center gap-2.5 z-20 pointer-events-auto"
            >
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30">
                <Activity className="w-4 h-4 text-cyan-300" />
              </div>
              <div>
                <span className="font-mono text-[9px] text-gray-400 uppercase tracking-wider block">Bio-Oximetry</span>
                <span className="font-mono text-xs font-black text-[#7B5CFA]">O2: 98% · STABLE</span>
              </div>
            </motion.div>

            {/* HUD Tag 3: Neural AI Sync */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              className="absolute bottom-6 left-12 p-3 rounded-2xl bg-[#080B1A]/85 text-white backdrop-blur-xl border border-cyan-400/40 shadow-[0_0_20px_rgba(0,240,255,0.25)] flex items-center gap-2.5 z-20 pointer-events-auto"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <Cpu className="w-4 h-4 text-emerald-300" />
              </div>
              <div>
                <span className="font-mono text-[9px] text-gray-400 uppercase tracking-wider block">AI Core Sync</span>
                <span className="font-mono text-xs font-black text-emerald-300">NEURAL: 99.4% VERIFIED</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
