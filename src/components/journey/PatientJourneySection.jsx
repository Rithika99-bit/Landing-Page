import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PATIENT_JOURNEY_STEPS } from '../../data/hospitalData';
import {
  Calendar,
  Activity,
  CheckCircle2,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Check
} from 'lucide-react';
import HospitalMarqueeBackground from '../ui/HospitalMarqueeBackground';
import { isReducedMotionPreferred } from '../../utils/animationTokens';

gsap.registerPlugin(ScrollTrigger);

const STEP_METRICS = [
  { time: "< 2 Mins", telemetry: "Instant Digital Intake & Slot Lock", color: "from-blue-500 to-cyan-400" },
  { time: "45 Mins", telemetry: "Private Acoustic Suite or HD Telehealth", color: "from-cyan-500 to-blue-600" },
  { time: "Same Day", telemetry: "Sub-cellular 7T MRI & Molecular Scan", color: "from-indigo-500 to-blue-500" },
  { time: "Personalized", telemetry: "Robotic Multi-Quadrant Precision", color: "from-blue-600 to-teal-500" },
  { time: "Continuous", telemetry: "Real-time Biometric Vitals Monitoring", color: "from-emerald-500 to-teal-400" }
];

export default function PatientJourneySection({ onOpenBooking }) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [scrubProgress, setScrubProgress] = useState(0); // 0 to 1
  const sectionRef = useRef(null);

  // GSAP ScrollTrigger Pinned Scrollytelling Setup
  useEffect(() => {
    if (isReducedMotionPreferred()) return;

    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const isDesktop = window.innerWidth >= 1024;
    if (!isDesktop) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionEl,
        start: 'top top',
        end: '+=140%',
        pin: true,
        pinSpacing: true,
        scrub: 0.6,
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress; // 0.0 to 1.0
          setScrubProgress(progress);

          const stepCount = PATIENT_JOURNEY_STEPS.length;
          const currentIdx = Math.min(stepCount - 1, Math.floor(progress * stepCount));
          setActiveStepIndex(currentIdx);
        },
      });
    }, sectionEl);

    return () => ctx.revert();
  }, []);

  const currentStep = PATIENT_JOURNEY_STEPS[activeStepIndex];
  const currentMetric = STEP_METRICS[activeStepIndex];

  // Pipeline laser fill percent based on scrub or active step
  const pipelinePercent = scrubProgress > 0
    ? scrubProgress * 100
    : (activeStepIndex / (PATIENT_JOURNEY_STEPS.length - 1)) * 100;

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative pt-2 sm:pt-4 pb-20 lg:pt-6 lg:pb-28 bg-gradient-to-b from-[#F8FBFF] via-white to-[#F8FBFF] dark:from-[#07131E] dark:via-[#091B2C] dark:to-[#07131E] overflow-hidden transition-colors duration-300"
    >
      {/* Background Text Scroller */}
      <HospitalMarqueeBackground reverse={false} />

      {/* Dynamic 3D Ambient Medical Orbs in Background */}
      <div className="pointer-events-none absolute top-1/4 left-10 w-96 h-96 rounded-full bg-blue-400/10 dark:bg-blue-600/10 blur-3xl animate-float-gentle" />
      <div className="pointer-events-none absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-cyan-400/10 dark:bg-cyan-600/10 blur-3xl animate-float-gentle" style={{ animationDelay: '-3s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800 text-xs font-extrabold text-[#2F80ED] dark:text-blue-400 uppercase tracking-wider mb-3 shadow-sm"
          >
            <Activity className="w-4 h-4 text-[#2F80ED] dark:text-blue-400 animate-pulse" />
            <span>SCROLL-CONTROLLED CLINICAL PATHWAY</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold text-[#0B2438] dark:text-white tracking-tight leading-tight mb-3"
          >
            Your Seamless Patient Journey
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-[#4A6278] dark:text-gray-300 leading-relaxed max-w-2xl mx-auto"
          >
            Select or scroll through our 5-phase precision roadmap. Each clinical milestone synchronizes real-time deliverables and verified recovery standards.
          </motion.p>
        </div>

        {/* Continuous Animated Connecting Pipeline with Stepper Milestone Indicators */}
        <div className="relative mb-8 lg:mb-10 max-w-4xl mx-auto">

          {/* Desktop Glowing Laser Tube */}
          <div className="hidden sm:block absolute top-[18px] left-[8%] right-[8%] h-2 bg-gray-100 dark:bg-gray-800 rounded-full z-0 overflow-hidden shadow-inner border border-blue-100 dark:border-gray-700">
            {/* Scroll-scrubbed Laser Progress Fill */}
            <div
              className="h-full bg-gradient-to-r from-[#2F80ED] via-[#00C2CB] to-[#38bdf8] shadow-[0_0_16px_#00C2CB,0_0_8px_#2F80ED] transition-all duration-100 ease-out"
              style={{ width: `${pipelinePercent}%` }}
            />

            {/* Scroll-Scrubbed Travelling Photon Pulse */}
            <div
              className="absolute top-0 bottom-0 w-16 bg-white blur-[3px] transition-all duration-75 ease-out shadow-[0_0_12px_#ffffff]"
              style={{ left: `calc(${pipelinePercent}% - 32px)` }}
            />
          </div>

          {/* Stepper Milestone Indicators on Top of the Pipe */}
          <div className="flex justify-between items-center px-2 sm:px-6 relative z-10">
            {PATIENT_JOURNEY_STEPS.map((s, idx) => {
              const isPastOrActive = idx <= activeStepIndex;
              const isCurrent = idx === activeStepIndex;

              return (
                <button
                  key={s.step}
                  onClick={() => setActiveStepIndex(idx)}
                  className="flex flex-col items-center group focus:outline-none cursor-pointer"
                  title={`Jump to Phase ${s.step}: ${s.title}`}
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-mono font-bold text-xs transition-all duration-300 border-2 ${
                      isCurrent
                        ? 'bg-[#2F80ED] text-white border-white dark:border-[#07131E] shadow-[0_0_20px_#2F80ED] scale-110'
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
                  <span className={`text-[11px] font-bold mt-2 transition-colors ${
                    isCurrent ? 'text-[#2F80ED] dark:text-blue-400 font-extrabold' : 'text-gray-400'
                  }`}>
                    Phase {s.step}
                  </span>
                  <span className={`text-[10px] hidden md:block max-w-[105px] text-center truncate ${
                    isCurrent ? 'text-[#0B2438] dark:text-white font-bold' : 'text-gray-400'
                  }`}>
                    {s.title}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Selected Phase 3D Expanded Telemetry Showcase Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStepIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="p-6 sm:p-8 lg:p-9 rounded-[2.25rem] bg-gradient-to-r from-blue-50/90 via-white/95 to-cyan-50/80 dark:from-[#0E2236] dark:via-[#10273F] dark:to-[#0B1E30] border border-white dark:border-gray-700 shadow-xl max-w-5xl mx-auto backdrop-blur-2xl relative overflow-hidden"
          >
            {/* Top Glowing Laser Border Line */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#2F80ED] to-transparent shadow-[0_0_12px_#2F80ED]" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">

              {/* Left Details (8 Cols) */}
              <div className="lg:col-span-8 space-y-3.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-xs font-black uppercase tracking-widest text-white bg-[#2F80ED] px-3 py-1 rounded-full shadow-sm">
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

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#0B2438] dark:text-white tracking-tight">
                  {currentStep.title} — Clinical Deliverables
                </h3>

                <p className="text-xs sm:text-sm text-[#4A6278] dark:text-gray-300 leading-relaxed font-normal">
                  {currentStep.description} Supported by multidisciplinary case reviews, AI predictive analytics, and seamless electronic medical record synchronization.
                </p>

                {/* Key Deliverables Checkpoints */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#0B2438] dark:text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-[#2F80ED] shrink-0" />
                    <span>Turnaround Window: {currentMetric.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#0B2438] dark:text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-[#2F80ED] shrink-0" />
                    <span>Encrypted Telemetry & Records Access</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#0B2438] dark:text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-[#2F80ED] shrink-0" />
                    <span>Direct Access to Dedicated Care Navigator</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#0B2438] dark:text-gray-200">
                    <CheckCircle2 className="w-4 h-4 text-[#2F80ED] shrink-0" />
                    <span>Zero Bureaucracy Direct Billing</span>
                  </div>
                </div>
              </div>

              {/* Right Interactive Actions & Stepper Controls (4 Cols) */}
              <div className="lg:col-span-4 flex flex-col gap-3 justify-center border-t lg:border-t-0 lg:border-l border-gray-200/80 dark:border-gray-700/80 lg:pl-8 pt-4 lg:pt-0">

                {/* Stepper Navigation Buttons */}
                <div className="flex items-center justify-between gap-2 mb-1">
                  <button
                    disabled={activeStepIndex === 0}
                    onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                    className="p-2 rounded-xl bg-white dark:bg-[#122538] border border-gray-200 dark:border-gray-700 text-[#0B2438] dark:text-white disabled:opacity-30 hover:border-blue-400 transition-all flex items-center gap-1 text-xs font-bold cursor-pointer"
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
                    className="p-2 rounded-xl bg-white dark:bg-[#122538] border border-gray-200 dark:border-gray-700 text-[#0B2438] dark:text-white disabled:opacity-30 hover:border-blue-400 transition-all flex items-center gap-1 text-xs font-bold cursor-pointer"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Primary Booking Trigger */}
                <button
                  onClick={onOpenBooking}
                  className="w-full py-3.5 px-6 rounded-2xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#2F80ED] to-[#1E6FD9] hover:from-blue-600 hover:to-blue-700 shadow-[0_10px_25px_rgba(47,128,237,0.35)] hover:shadow-[0_14px_30px_rgba(47,128,237,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <Calendar className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span>Start at Phase 0{activeStepIndex + 1}</span>
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
