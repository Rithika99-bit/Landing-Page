import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import MedicalCanvas3D from '../3d/MedicalCanvas3D';
import HospitalMarqueeBackground from '../ui/HospitalMarqueeBackground';

export default function HeroSection({ hospitalName, onOpenBooking }) {
  // Magnetic Button Effect
  const primaryBtnRef = useRef(null);
  const [btnPos, setBtnPos] = useState({ x: 0, y: 0 });

  const handleBtnMouseMove = (e) => {
    if (!primaryBtnRef.current) return;
    const rect = primaryBtnRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setBtnPos({ x: x * 0.25, y: y * 0.25 });
  };

  const handleBtnMouseLeave = () => {
    setBtnPos({ x: 0, y: 0 });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden medical-mesh-bg medical-subtle-grid"
    >
      {/* 3D Medical Canvas (DNA Helix, Crystalline Rings, Floating Particles) */}
      <MedicalCanvas3D className="opacity-90" />

      {/* Hospital Name Signature Marquee Effect in the background */}
      <HospitalMarqueeBackground hospitalName={hospitalName} />

      {/* Subtle Animated Light Rays */}
      <div className="pointer-events-none absolute -top-40 left-1/3 w-[600px] h-[600px] bg-gradient-to-b from-blue-400/10 via-cyan-400/5 to-transparent rounded-full blur-3xl transform -rotate-12 animate-pulse-slow" />
      <div className="pointer-events-none absolute top-1/4 -right-20 w-[500px] h-[500px] bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-3xl" />

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
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-white/90 shadow-[0_4px_20px_rgba(47,128,237,0.1)] mb-6 text-xs sm:text-sm font-semibold text-[#0B2438]"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2F80ED] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2F80ED]"></span>
              </span>
              <span className="text-[#2F80ED] font-bold">NEXT-GEN MEDICINE</span>
              <span className="text-gray-300">|</span>
              <span className="text-[#4A6278] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#2F80ED]" />
                JCI & ISO 9001 Accredited
              </span>
            </motion.div>

            {/* Hero Headline */}
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#0B2438] leading-[1.08] mb-6">
              Advanced Care.{' '}
              <span className="bg-gradient-to-r from-[#2F80ED] via-[#1E6FD9] to-[#00C2CB] bg-clip-text text-transparent">
                Better Living.
              </span>
            </h1>

            {/* Supporting Sentence */}
            <p className="text-base sm:text-lg lg:text-xl text-[#4A6278] font-normal leading-relaxed max-w-2xl mb-8">
              Trusted healthcare powered by experienced professionals, advanced technology, and personalized patient care.
            </p>

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
                  onClick={onOpenBooking}
                  className="relative px-7 py-4 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-[#2F80ED] to-[#1E6FD9] rounded-full shadow-[0_12px_32px_rgba(47,128,237,0.35)] hover:shadow-[0_16px_40px_rgba(47,128,237,0.48)] transition-all duration-300 flex items-center gap-3 group overflow-hidden"
                >
                  <span className="absolute inset-0 w-full h-full bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></span>
                  <Calendar className="w-5 h-5 transition-transform group-hover:scale-110" />
                  <span>Book an Appointment</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </div>

              <a
                href="#services"
                className="px-7 py-4 text-sm sm:text-base font-semibold text-[#0B2438] bg-white/80 hover:bg-white backdrop-blur-md rounded-full border border-white/90 shadow-[0_4px_20px_rgba(11,36,56,0.06)] hover:shadow-[0_8px_25px_rgba(11,36,56,0.1)] transition-all duration-200 flex items-center gap-2 group"
              >
                <span>Explore Services</span>
                <span className="text-[#2F80ED] transition-transform group-hover:translate-x-1">↓</span>
              </a>
            </div>

            {/* Quick Micro Credentials Under Hero */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-blue-100/60 w-full max-w-lg">
              <div>
                <p className="text-xl sm:text-2xl font-black text-[#0B2438]">99.4%</p>
                <p className="text-xs font-medium text-[#4A6278]">Clinical Accuracy</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-[#0B2438]">Zero</p>
                <p className="text-xs font-medium text-[#4A6278]">Wait Intake</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-[#0B2438]">24/7</p>
                <p className="text-xs font-medium text-[#4A6278]">Trauma & Telehealth</p>
              </div>
            </div>
          </motion.div>

          {/* Right Hero Space: Kept completely open for the interactive 3D DNA double helix */}
          <div className="hidden lg:block lg:col-span-5 h-full pointer-events-none" />

        </div>
      </div>
    </section>
  );
}

