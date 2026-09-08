import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PATIENT_JOURNEY_STEPS } from '../../data/hospitalData';
import {
  Calendar,
  MessageSquare,
  Search,
  ShieldCheck,
  Sparkles,
  Activity,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Clock,
  Check
} from 'lucide-react';
import HospitalMarqueeBackground from '../ui/HospitalMarqueeBackground';

const ICON_MAP = {

  Calendar,
  MessageSquare,
  Search,
  ShieldCheck,
  Sparkles,
};

const STEP_METRICS = [
  { time: "< 2 Mins", telemetry: "Instant Digital Intake & Slot Lock", color: "from-blue-500 to-cyan-400" },
  { time: "45 Mins", telemetry: "Private Acoustic Suite or HD Telehealth", color: "from-cyan-500 to-blue-600" },
  { time: "Same Day", telemetry: "Sub-cellular 7T MRI & Molecular Scan", color: "from-indigo-500 to-blue-500" },
  { time: "Personalized", telemetry: "Robotic Multi-Quadrant Precision", color: "from-blue-600 to-teal-500" },
  { time: "Continuous", telemetry: "Real-time Biometric Vitals Monitoring", color: "from-emerald-500 to-teal-400" }
];

function Journey3DCard({ step, idx, isActive, onClick, onHover }) {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPct = (x / rect.width) * 2 - 1;
    const yPct = (y / rect.height) * 2 - 1;

    setRotate({
      x: -yPct * 12,
      y: xPct * 12,
    });

    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.4,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (onHover) onHover(idx);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  const Icon = ICON_MAP[step.icon] || Sparkles;
  const metric = STEP_METRICS[idx] || STEP_METRICS[0];

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="perspective-1000 cursor-pointer relative group flex-1 select-none"
      style={{ minHeight: '350px' }}
    >
      <div
        className={`w-full h-full rounded-[2rem] p-6 transition-all duration-300 preserve-3d flex flex-col justify-between relative overflow-hidden border ${isActive
            ? 'bg-gradient-to-b from-white via-blue-50/70 to-white dark:from-[#0E2236] dark:via-[#132E4A] dark:to-[#0E2236] border-[#2F80ED] dark:border-[#3B82F6] shadow-[0_25px_50px_-12px_rgba(47,128,237,0.3),0_0_0_2px_rgba(47,128,237,0.3)]'
            : isHovered
              ? 'bg-white/95 dark:bg-[#112538] border-blue-300 dark:border-blue-700 shadow-xl'
              : 'bg-white/75 dark:bg-[#0D1E2E]/80 border-gray-100 dark:border-gray-800 shadow-sm'
          }`}
        style={{
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateZ(${isActive ? 16 : isHovered ? 10 : 0
            }px)`,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        {/* Dynamic Specular Glare Reflection Layer */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 rounded-[2rem]"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(circle 200px at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.8) 0%, transparent 80%)`,
          }}
        />

        {/* Ambient Top Glow Light */}
        <div
          className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${metric.color} blur-2xl transition-all duration-500 ${isActive ? 'opacity-40 scale-125' : isHovered ? 'opacity-25 scale-110' : 'opacity-0'
            }`}
        />

        {/* Top Header with 3D Depth Layer */}
        <div
          className="flex items-start justify-between relative z-10"
          style={{ transform: 'translateZ(35px)' }}
        >
          {/* Luminous 3D Floating Icon Box */}
          <div
            className={`w-13 h-13 p-3.5 rounded-2xl flex items-center justify-center transition-all duration-300 ${isActive
                ? 'bg-gradient-to-tr from-[#2F80ED] to-[#00C2CB] text-white shadow-[0_8px_25px_rgba(47,128,237,0.4)] scale-110 rotate-1'
                : isHovered
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-blue-50 dark:bg-[#152C42] text-[#2F80ED] dark:text-[#3B82F6]'
              }`}
          >
            <Icon className={`w-6 h-6 transition-transform duration-300 ${isActive ? 'scale-110 animate-pulse' : ''}`} />
          </div>

          {/* Holographic Step Number */}
          <span className="font-mono text-3xl sm:text-4xl font-black text-gray-200 dark:text-gray-700/80 group-hover:text-[#2F80ED]/70 transition-colors">
            {step.step}
          </span>
        </div>

        {/* Center Content with translateZ */}
        <div
          className="my-4 relative z-10 flex-1 flex flex-col justify-center"
          style={{ transform: 'translateZ(25px)' }}
        >
          {/* Protocol Tag Badge */}
          <div className="mb-2">
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full inline-flex items-center gap-1 border ${isActive
                  ? 'bg-blue-100/80 dark:bg-blue-900/50 text-[#2F80ED] dark:text-blue-300 border-blue-300/50'
                  : 'bg-gray-100/80 dark:bg-gray-800 text-[#4A6278] dark:text-gray-300 border-transparent'
                }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#2F80ED] animate-ping' : 'bg-gray-400'}`} />
              {step.tag}
            </span>
          </div>

          {/* Step Title */}
          <h3 className="text-lg sm:text-xl font-extrabold text-[#0B2438] dark:text-white tracking-tight mb-2 group-hover:text-[#2F80ED] transition-colors">
            {step.title}
          </h3>

          {/* Step Description */}
          <p className="text-xs text-[#4A6278] dark:text-gray-400 leading-relaxed line-clamp-3">
            {step.description}
          </p>

          {/* Micro Telemetry Indicator */}
          <div className="mt-3 pt-2.5 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[10px] font-medium text-[#4A6278] dark:text-gray-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-[#2F80ED]" />
              {metric.time}
            </span>
            <span className="font-semibold text-[#0B2438] dark:text-gray-300 truncate max-w-[120px]">
              {metric.telemetry}
            </span>
          </div>
        </div>

        {/* Bottom Phase Status Bar with translateZ */}
        <div
          className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs font-bold relative z-10"
          style={{ transform: 'translateZ(30px)' }}
        >
          <span className={isActive ? 'text-[#2F80ED] dark:text-blue-400' : 'text-gray-400'}>
            Phase {step.step}
          </span>

          {isActive ? (
            <span className="inline-flex items-center gap-1 text-[11px] text-white bg-[#2F80ED] px-2.5 py-0.5 rounded-full shadow-sm">
              <Check className="w-3 h-3 stroke-[3]" />
              Active
            </span>
          ) : (
            <span className="text-[11px] text-gray-400 group-hover:text-[#2F80ED] flex items-center gap-1 transition-colors">
              Explore
              <ChevronRight className="w-3 h-3" />
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PatientJourneySection({ onOpenBooking }) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  // Auto progression toggle for demonstration
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % PATIENT_JOURNEY_STEPS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const currentStep = PATIENT_JOURNEY_STEPS[activeStepIndex];
  const currentMetric = STEP_METRICS[activeStepIndex];

  return (
    <section id="journey" className="relative py-24 lg:py-36 bg-gradient-to-b from-[#F8FBFF] via-white to-[#F8FBFF] dark:from-[#07131E] dark:via-[#091B2C] dark:to-[#07131E] overflow-hidden transition-colors duration-300">
      {/* Background Text Scroller */}
      <HospitalMarqueeBackground reverse={false} />

      {/* Dynamic 3D Ambient Medical Orbs in Background */}

      <div className="pointer-events-none absolute top-1/4 left-10 w-96 h-96 rounded-full bg-blue-400/10 dark:bg-blue-600/10 blur-3xl animate-float-gentle" />
      <div className="pointer-events-none absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-cyan-400/10 dark:bg-cyan-600/10 blur-3xl animate-float-gentle" style={{ animationDelay: '-3s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800 text-xs font-extrabold text-[#2F80ED] dark:text-blue-400 uppercase tracking-wider mb-4 shadow-sm"
          >
            <Activity className="w-4 h-4 text-[#2F80ED] dark:text-blue-400 animate-pulse" />
            <span>INTERACTIVE CLINICAL PATHWAY</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-[#0B2438] dark:text-white tracking-tight leading-tight mb-4"
          >
            Your Seamless Patient Journey
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-[#4A6278] dark:text-gray-300 leading-relaxed max-w-2xl mx-auto"
          >
            Experience our 5-phase precision roadmap. Hover or click any phase to explore specialized protocols, diagnostic turnaround times, and clinical care milestones.
          </motion.p>
        </div>

        {/* Continuous Animated Connecting Pipeline with Progress Indicator */}
        <div className="relative mb-14">

          {/* Desktop Glowing Laser Tube */}
          <div className="hidden lg:block absolute top-[5.25rem] left-[6%] right-[6%] h-2 bg-gray-100 dark:bg-gray-800 rounded-full z-0 overflow-hidden shadow-inner">
            {/* Animated Progress Fill to Current Active Step */}
            <motion.div
              className="h-full bg-gradient-to-r from-[#2F80ED] via-[#00C2CB] to-[#2F80ED] shadow-[0_0_15px_#2F80ED]"
              animate={{
                width: `${(activeStepIndex / (PATIENT_JOURNEY_STEPS.length - 1)) * 100}%`,
              }}
              transition={{ type: 'spring', stiffness: 120, damping: 20 }}
            />

            {/* Travelling Light Spark */}
            <motion.div
              className="absolute top-0 bottom-0 w-24 bg-white/80 blur-[2px]"
              animate={{
                x: ['-100%', '1000%'],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </div>

          {/* Stepper Milestone Indicators on Top of the Pipe */}
          <div className="hidden lg:flex justify-between items-center px-[5%] mb-6 relative z-10">
            {PATIENT_JOURNEY_STEPS.map((s, idx) => {
              const isPastOrActive = idx <= activeStepIndex;
              const isCurrent = idx === activeStepIndex;

              return (
                <button
                  key={s.step}
                  onClick={() => setActiveStepIndex(idx)}
                  className="flex flex-col items-center group focus:outline-none"
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-mono font-bold text-xs transition-all duration-300 border-2 ${isCurrent
                        ? 'bg-[#2F80ED] text-white border-white dark:border-[#07131E] shadow-[0_0_20px_#2F80ED] scale-125'
                        : isPastOrActive
                          ? 'bg-emerald-500 text-white border-white dark:border-[#07131E] scale-100'
                          : 'bg-white dark:bg-[#122538] text-gray-400 border-gray-200 dark:border-gray-700 group-hover:border-blue-400'
                      }`}
                  >
                    {isPastOrActive && !isCurrent ? (
                      <Check className="w-4 h-4 stroke-[3]" />
                    ) : (
                      s.step
                    )}
                  </div>
                  <span className={`text-[11px] font-bold mt-2 transition-colors ${isCurrent ? 'text-[#2F80ED] dark:text-blue-400' : 'text-gray-400'
                    }`}>
                    Phase {s.step}
                  </span>
                </button>
              );
            })}
          </div>

          {/* 5 Physical Floating 3D Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 lg:gap-6 relative z-10">
            {PATIENT_JOURNEY_STEPS.map((step, idx) => (
              <Journey3DCard
                key={step.step}
                step={step}
                idx={idx}
                isActive={activeStepIndex === idx}
                onClick={() => setActiveStepIndex(idx)}
              />
            ))}
          </div>

        </div>

        {/* Selected Phase 3D Expanded Telemetry Showcase Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStepIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="p-8 sm:p-10 rounded-[2.5rem] bg-gradient-to-r from-blue-50/90 via-white/95 to-cyan-50/80 dark:from-[#0E2236] dark:via-[#10273F] dark:to-[#0B1E30] border border-white dark:border-gray-700 shadow-2xl max-w-5xl mx-auto backdrop-blur-2xl relative overflow-hidden"
          >
            {/* Top Glowing Laser Border Line */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#2F80ED] to-transparent shadow-[0_0_12px_#2F80ED]" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

              {/* Left Details (8 Cols) */}
              <div className="lg:col-span-8 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-black uppercase tracking-widest text-white bg-[#2F80ED] px-3.5 py-1 rounded-full shadow-sm">
                    PHASE {currentStep.step} OF 05
                  </span>
                  <span className="text-xs font-bold text-[#2F80ED] dark:text-blue-400 bg-white/90 dark:bg-[#122A42] px-3 py-1 rounded-full border border-blue-200/60 dark:border-blue-800">
                    {currentStep.tag}
                  </span>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                    Standard Protocol
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B2438] dark:text-white tracking-tight">
                  {currentStep.title} — Clinical Deliverables
                </h3>

                <p className="text-sm sm:text-base text-[#4A6278] dark:text-gray-300 leading-relaxed font-normal">
                  {currentStep.description} Supported by multidisciplinary case reviews, AI predictive analytics, and seamless electronic medical record synchronization.
                </p>

                {/* Key Deliverables Checkpoints */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-center gap-2.5 text-xs font-semibold text-[#0B2438] dark:text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-[#2F80ED] shrink-0" />
                    <span>Turnaround Window: {currentMetric.time}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs font-semibold text-[#0B2438] dark:text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-[#2F80ED] shrink-0" />
                    <span>Encrypted Telemetry & Records Access</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs font-semibold text-[#0B2438] dark:text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-[#2F80ED] shrink-0" />
                    <span>Direct Access to Dedicated Care Navigator</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs font-semibold text-[#0B2438] dark:text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-[#2F80ED] shrink-0" />
                    <span>Zero Bureaucracy Direct Billing</span>
                  </div>
                </div>
              </div>

              {/* Right Interactive Actions & Stepper Controls (4 Cols) */}
              <div className="lg:col-span-4 flex flex-col gap-3 justify-center border-t lg:border-t-0 lg:border-l border-gray-200/80 dark:border-gray-700/80 lg:pl-8 pt-6 lg:pt-0">

                {/* Stepper Navigation Buttons */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <button
                    disabled={activeStepIndex === 0}
                    onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                    className="p-2 rounded-xl bg-white dark:bg-[#122538] border border-gray-200 dark:border-gray-700 text-[#0B2438] dark:text-white disabled:opacity-30 hover:border-blue-400 transition-all flex items-center gap-1 text-xs font-bold"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Prev</span>
                  </button>

                  <span className="text-xs font-bold text-[#4A6278] dark:text-gray-400 font-mono">
                    {activeStepIndex + 1} / 5
                  </span>

                  <button
                    disabled={activeStepIndex === PATIENT_JOURNEY_STEPS.length - 1}
                    onClick={() => setActiveStepIndex((prev) => Math.min(PATIENT_JOURNEY_STEPS.length - 1, prev + 1))}
                    className="p-2 rounded-xl bg-white dark:bg-[#122538] border border-gray-200 dark:border-gray-700 text-[#0B2438] dark:text-white disabled:opacity-30 hover:border-blue-400 transition-all flex items-center gap-1 text-xs font-bold"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Primary Booking Trigger */}
                <button
                  onClick={onOpenBooking}
                  className="w-full py-3.5 px-6 rounded-2xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#2F80ED] to-[#1E6FD9] hover:from-blue-600 hover:to-blue-700 shadow-[0_10px_25px_rgba(47,128,237,0.35)] hover:shadow-[0_14px_30px_rgba(47,128,237,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 group"
                >
                  <Calendar className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span>Start at Phase 01</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <p className="text-[11px] text-center text-[#4A6278] dark:text-gray-400">
                  Instant scheduling with zero wait times.
                </p>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}

