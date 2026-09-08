import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  UserCheck,
  Cpu,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  ArrowUpRight,
  ArrowRight,
  Zap,
  Activity,
  Heart,
  Star,
  Check,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';
import HospitalMarqueeBackground from '../ui/HospitalMarqueeBackground';

const ADVANTAGE_PILLARS = [

  {
    id: "specialists",
    index: "01",
    title: "Experienced Specialists",
    badge: "World-Class Faculty",
    subtitle: "Over 25+ average years of tier-one academic hospital tenure",
    accentColor: "#2F80ED",
    themeGradient: "from-blue-600 to-indigo-700",
    bgTint: "from-blue-500/10 via-indigo-500/5 to-transparent",
    icon: Award,
    stats: [
      { label: "Avg Tenure", value: "25+ Yrs" },
      { label: "Faculty Chairs", value: "40+" },
      { label: "Board Citations", value: "99.2%" }
    ],
    highlight: "Johns Hopkins, Harvard & Oxford Trained Department Directors",
    deliverables: [
      "Peer-reviewed multi-disciplinary case conferences",
      "Direct 1-on-1 consultations with department chairs",
      "Sub-specialty diagnostic cross-verification"
    ],
    telemetryReadout: "FACULTY BOARD: 120+ CHAIRS ACTIVE"
  },
  {
    id: "personalized",
    index: "02",
    title: "Personalized Patient Care",
    badge: "Genomic Digital Twin",
    subtitle: "Every protocol mapped to your personal DNA and metabolic signature",
    accentColor: "#10B981",
    themeGradient: "from-emerald-500 to-teal-700",
    bgTint: "from-emerald-500/10 via-teal-500/5 to-transparent",
    icon: UserCheck,
    stats: [
      { label: "Care Ratio", value: "1 : 1" },
      { label: "Adherence Rate", value: "98.6%" },
      { label: "Nurse Navigators", value: "24/7" }
    ],
    highlight: "1:1 Dedicated Nurse Navigator Assigned to Every Patient",
    deliverables: [
      "Custom genomic biomarker sequencing profile",
      "Continuous lifestyle & metabolic vitality tracking",
      "Individualized recovery pathways with zero generic plans"
    ],
    telemetryReadout: "BIOMARKER ALIGNMENT: 98.6% FIT"
  },
  {
    id: "technology",
    index: "03",
    title: "Modern Healthcare Tech",
    badge: "Autonomous Robotics",
    subtitle: "Sub-millimeter surgical robotics and 7-Tesla photon analytics",
    accentColor: "#00C2CB",
    themeGradient: "from-cyan-500 to-blue-600",
    bgTint: "from-cyan-500/10 via-blue-500/5 to-transparent",
    icon: Cpu,
    stats: [
      { label: "Precision Margin", value: "±0.08mm" },
      { label: "MRI Magnet", value: "7-Tesla" },
      { label: "Diagnostic SLA", value: "< 2 Hrs" }
    ],
    highlight: "Da Vinci Xi Quad-Arm Robotic Surgery & AI Edge Telemetry",
    deliverables: [
      "Photon-counting ultra-low dose computed tomography",
      "Infrared real-time vascular micro-tracking",
      "AI-assisted anomaly detection with sub-cellular clarity"
    ],
    telemetryReadout: "DA VINCI ROBOTICS: QUAD-ARM ONLINE"
  },
  {
    id: "experience",
    index: "04",
    title: "Comfortable Experience",
    badge: "Acoustic Healing Sanctuary",
    subtitle: "Sanctuary design engineered for calm, private, and restorative healing",
    accentColor: "#8B5CF6",
    themeGradient: "from-purple-500 to-pink-600",
    bgTint: "from-purple-500/10 via-pink-500/5 to-transparent",
    icon: Sparkles,
    stats: [
      { label: "Private Suites", value: "100%" },
      { label: "Acoustic Noise", value: "22 dB" },
      { label: "Satisfaction", value: "99.8%" }
    ],
    highlight: "100% Acoustic Glass Suites with Circadian Lighting",
    deliverables: [
      "Medical-grade HEPA-14 sterilized continuous air exchange",
      "Circadian dynamic daylighting synchronized with sleep cycles",
      "Concierge patient hospitality and private family lounges"
    ],
    telemetryReadout: "SANCTUARY SUITES: 100% PRIVATE"
  }
];

export default function AboutUsSection({ hospitalName, onOpenBooking }) {
  const [activePillarIndex, setActivePillarIndex] = useState(0);
  const activePillar = ADVANTAGE_PILLARS[activePillarIndex];

  return (
    <section id="about" className="relative py-24 lg:py-32 bg-[#F8FBFF] overflow-hidden">
      {/* Background Text Scroller */}
      <HospitalMarqueeBackground hospitalName={hospitalName} />

      {/* Subtle Ambient Radial Glows in Background */}

      <div className="pointer-events-none absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-blue-400/15 via-cyan-300/10 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-gradient-to-br from-indigo-400/10 via-blue-300/10 to-transparent blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Split: Short, High-Density & Informative About Us */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16 lg:mb-20">

          {/* Left: Concise Informative Narrative (6 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 space-y-5"
          >
            {/* High-End Glass Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-blue-500/5 border border-blue-200/80 backdrop-blur-md shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2F80ED] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2F80ED]" />
              </span>
              <span className="font-mono text-[11px] font-bold tracking-widest text-[#1E6FD9] uppercase">
                ABOUT {hospitalName}
              </span>
            </div>

            {/* Display Headline with clipPath reveal */}
            <motion.h2
              initial={{ opacity: 0, y: 30, clipPath: 'inset(100% 0% 0% 0%)' }}
              whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-4xl sm:text-5xl lg:text-[3.25rem] font-black text-[#0B2438] tracking-tight leading-[1.12]"
            >
              Pioneering Medicine.{' '}
              <span className="bg-gradient-to-r from-[#2F80ED] via-[#1E6FD9] to-[#00C2CB] bg-clip-text text-transparent drop-shadow-sm">
                Personalized Care.
              </span>
            </motion.h2>

            {/* Narrative Paragraph */}
            <p className="text-base sm:text-lg text-[#334E68] leading-relaxed font-normal">
              <strong className="font-semibold text-[#0B2438]">{hospitalName}</strong> delivers next-generation clinical precision through AI-augmented diagnostics, minimally invasive robotic surgery, and compassionate 1-on-1 care in private acoustic healing suites.
            </p>

            {/* CTAs & Trust Badges */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={onOpenBooking}
                className="group relative inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-[#2F80ED] to-[#1E6FD9] hover:from-[#1E6FD9] hover:to-[#175bb8] transition-all duration-300 shadow-[0_10px_25px_rgba(47,128,237,0.3)] hover:shadow-[0_14px_32px_rgba(47,128,237,0.45)] hover:-translate-y-0.5 overflow-hidden"
              >
                <span className="absolute inset-0 w-full h-full bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <span>Consult Our Faculty</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold text-[#0B2438] bg-white/90 backdrop-blur-md border border-slate-200/80 shadow-sm">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                <span className="text-[#334E68]">Zero-Wait Intake</span>
                <span className="text-slate-300">•</span>
                <span className="text-[#334E68]">Direct Insurance Billing</span>
              </div>
            </div>
          </motion.div>

          {/* Right: Premium Bento Clinical Telemetry Grid (6 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {/* Metric 1 - AI Edge */}
            <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-blue-50/90 via-white to-cyan-50/40 border border-blue-100/90 shadow-[0_4px_20px_rgba(11,36,56,0.04)] hover:shadow-[0_16px_36px_rgba(47,128,237,0.12)] hover:border-blue-300 hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-[#2F80ED] group-hover:scale-110 transition-transform">
                  <Cpu className="w-4 h-4" />
                </div>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-blue-700 bg-blue-100/70 border border-blue-200/60 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                  AI Edge
                </span>
              </div>
              <span className="font-display text-3xl sm:text-4xl font-black bg-gradient-to-br from-[#2F80ED] to-[#00C2CB] bg-clip-text text-transparent block leading-tight mb-1">
                0.1s
              </span>
              <h4 className="font-display text-sm sm:text-base font-bold text-[#0B2438] mb-1">
                AI Diagnostic Speed
              </h4>
              <p className="text-xs text-[#4A6278] leading-relaxed">
                Sub-cellular neural edge analysis with immediate anomaly detection.
              </p>
            </div>

            {/* Metric 2 - HEPA-14 */}
            <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-emerald-50/90 via-white to-teal-50/40 border border-emerald-100/90 shadow-[0_4px_20px_rgba(11,36,56,0.04)] hover:shadow-[0_16px_36px_rgba(16,185,129,0.12)] hover:border-emerald-300 hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-100/70 border border-emerald-200/60 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  HEPA-14
                </span>
              </div>
              <span className="font-display text-3xl sm:text-4xl font-black bg-gradient-to-br from-emerald-600 to-teal-500 bg-clip-text text-transparent block leading-tight mb-1">
                100%
              </span>
              <h4 className="font-display text-sm sm:text-base font-bold text-[#0B2438] mb-1">
                Private Healing Suites
              </h4>
              <p className="text-xs text-[#4A6278] leading-relaxed">
                Acoustic insulation, circadian daylighting & continuous air sterilization.
              </p>
            </div>

            {/* Metric 3 - JCI Gold */}
            <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-indigo-50/90 via-white to-blue-50/40 border border-indigo-100/90 shadow-[0_4px_20px_rgba(11,36,56,0.04)] hover:shadow-[0_16px_36px_rgba(79,70,229,0.12)] hover:border-indigo-300 hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                  <Award className="w-4 h-4" />
                </div>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-indigo-700 bg-indigo-100/70 border border-indigo-200/60 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                  JCI Gold
                </span>
              </div>
              <span className="font-display text-3xl sm:text-4xl font-black bg-gradient-to-br from-[#0B2438] via-indigo-900 to-[#2F80ED] bg-clip-text text-transparent block leading-tight mb-1">
                35+
              </span>
              <h4 className="font-display text-sm sm:text-base font-bold text-[#0B2438] mb-1">
                Global Accreditations
              </h4>
              <p className="text-xs text-[#4A6278] leading-relaxed">
                Exceeding international clinical protocols, ISO 9001 & peer standards.
              </p>
            </div>

            {/* Metric 4 - Verified Satisfaction */}
            <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-amber-50/70 via-white to-blue-50/50 border border-blue-200/90 shadow-[0_4px_20px_rgba(11,36,56,0.04)] hover:shadow-[0_16px_36px_rgba(47,128,237,0.14)] hover:border-blue-400 hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                </div>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-100/70 border border-emerald-200/60 px-2.5 py-1 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  Audited
                </span>
              </div>
              <span className="font-display text-3xl sm:text-4xl font-black bg-gradient-to-br from-[#2F80ED] to-indigo-600 bg-clip-text text-transparent block leading-tight mb-1">
                99.8%
              </span>
              <h4 className="font-display text-sm sm:text-base font-bold text-[#0B2438] mb-1">
                Patient Satisfaction
              </h4>
              <p className="text-xs text-[#4A6278] leading-relaxed">
                Independently audited patient recovery outcomes and clinical satisfaction.
              </p>
            </div>
          </motion.div>

        </div>

        {/* =========================================================================
            RADICALLY UNIQUE REDESIGN: THE CLINICAL ADVANTAGE COMMAND HUB
            (Interactive Holographic Core on Left + 4 Asymmetric 3D Boards on Right)
           ========================================================================= */}
        <div>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-bold text-[#2F80ED] uppercase tracking-wider mb-3 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#2F80ED]" />
              <span>THE PATIENT ADVANTAGE</span>
            </div>
            <motion.h3
              initial={{ opacity: 0, y: 25, clipPath: 'inset(100% 0% 0% 0%)' }}
              whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B2438] tracking-tight mb-3"
            >
              Why Patients Choose {hospitalName}
            </motion.h3>
            <p className="text-xs sm:text-sm text-[#4A6278] max-w-xl mx-auto">
              Hover over or select each pillar below to explore our technological advantages, clinical metrics, and care standards.
            </p>
          </div>

          {/* Interactive Command Hub Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

            {/* LEFT: Central Holographic Core & Telemetry Console (7 Cols) */}
            <div className="lg:col-span-7 rounded-[2.5rem] p-8 sm:p-10 bg-white/90 dark:bg-[#0E2236] border border-white dark:border-gray-700 shadow-2xl backdrop-blur-2xl flex flex-col justify-between relative overflow-hidden transition-all duration-500">

              {/* Dynamic Thematic Gradient Aura */}
              <div
                className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl opacity-20 transition-all duration-700"
                style={{ backgroundColor: activePillar.accentColor }}
              />

              {/* Top Telemetry Strip */}
              <div className="flex items-center justify-between pb-6 border-b border-gray-100 dark:border-gray-800 relative z-10">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-2.5 w-2.5 relative">
                    <span
                      className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                      style={{ backgroundColor: activePillar.accentColor }}
                    />
                    <span
                      className="relative inline-flex rounded-full h-2.5 w-2.5"
                      style={{ backgroundColor: activePillar.accentColor }}
                    />
                  </span>
                  <span className="font-mono text-xs font-extrabold tracking-wider text-[#0B2438] dark:text-gray-200">
                    {activePillar.telemetryReadout}
                  </span>
                </div>

                <span className="font-mono text-xs font-bold text-[#4A6278] bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                  PILLAR {activePillar.index} / 04
                </span>
              </div>

              {/* Middle Dynamic Showcase Content with AnimatePresence */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePillar.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="py-8 relative z-10 space-y-6"
                >
                  {/* Badge & Title */}
                  <div>
                    <span
                      className="text-[11px] font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full text-white inline-block mb-3 shadow-sm"
                      style={{ backgroundColor: activePillar.accentColor }}
                    >
                      {activePillar.badge}
                    </span>
                    <h4 className="text-3xl sm:text-4xl font-extrabold text-[#0B2438] dark:text-white tracking-tight">
                      {activePillar.title}
                    </h4>
                    <p className="text-sm font-semibold text-[#4A6278] dark:text-gray-300 mt-1">
                      {activePillar.subtitle}
                    </p>
                  </div>

                  {/* 3 Metric Value Cards */}
                  <div className="grid grid-cols-3 gap-3">
                    {activePillar.stats.map((st, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-gray-50/80 dark:bg-[#122538] border border-gray-100 dark:border-gray-700/60 text-center"
                      >
                        <span
                          className="text-2xl font-mono font-black block leading-tight mb-0.5"
                          style={{ color: activePillar.accentColor }}
                        >
                          {st.value}
                        </span>
                        <span className="text-[10px] font-bold text-[#4A6278] dark:text-gray-400 uppercase tracking-wider">
                          {st.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Deliverables Checklist */}
                  <div className="p-5 rounded-2xl bg-blue-50/50 dark:bg-[#11273C] border border-blue-100/60 dark:border-blue-900/40 space-y-2.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#2F80ED] dark:text-blue-400 block mb-1">
                      Verified Clinical Commitments
                    </span>
                    {activePillar.deliverables.map((deliv, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs font-semibold text-[#0B2438] dark:text-gray-200">
                        <CheckCircle2 className="w-4 h-4 text-[#2F80ED] shrink-0" />
                        <span>{deliv}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Bottom Actions Row */}
              <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-wrap items-center justify-between gap-4 relative z-10">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#4A6278]">
                  <ShieldCheck className="w-4 h-4 text-[#2F80ED]" />
                  <span>JCI Hospital Quality Standards Guaranteed</span>
                </div>

                <button
                  onClick={onOpenBooking}
                  className="px-6 py-3 rounded-full text-xs font-bold text-white bg-[#2F80ED] hover:bg-blue-600 shadow-md shadow-blue-500/25 flex items-center gap-2 transition-all hover:scale-105"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Consultation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* RIGHT: 4 Unique Asymmetric 3D Hover Switchboards (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col gap-3.5 justify-between">
              {ADVANTAGE_PILLARS.map((pillar, index) => {
                const IconComponent = pillar.icon;
                const isSelected = activePillarIndex === index;

                return (
                  <div
                    key={pillar.id}
                    onMouseEnter={() => setActivePillarIndex(index)}
                    onClick={() => setActivePillarIndex(index)}
                    className="perspective-1000 cursor-pointer select-none"
                  >
                    <div
                      className={`p-5 rounded-[2rem] transition-all duration-300 preserve-3d relative overflow-hidden border ${isSelected
                        ? 'bg-white dark:bg-[#12283C] border-blue-400 dark:border-blue-500 shadow-[0_16px_36px_rgba(47,128,237,0.18)] translate-x-2'
                        : 'bg-white/75 dark:bg-[#0D1E2E]/80 hover:bg-white border-gray-100 dark:border-gray-800 hover:border-blue-200'
                        }`}
                      style={{
                        transform: `perspective(1000px) translateZ(${isSelected ? 14 : 0}px)`,
                      }}
                    >
                      {/* Active Left Indicator Bar */}
                      {isSelected && (
                        <div
                          className="absolute left-0 inset-y-0 w-1.5 shadow-sm"
                          style={{ backgroundColor: pillar.accentColor }}
                        />
                      )}

                      <div className="flex items-center justify-between gap-4">

                        {/* Icon & Title */}
                        <div className="flex items-center gap-3.5">
                          <div
                            className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${isSelected
                              ? 'text-white shadow-md'
                              : 'bg-gray-100 dark:bg-[#152B3E] text-gray-500'
                              }`}
                            style={{
                              backgroundColor: isSelected ? pillar.accentColor : undefined,
                            }}
                          >
                            <IconComponent className="w-5 h-5" />
                          </div>

                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-black text-gray-400">
                                {pillar.index}
                              </span>
                              <h5 className={`text-base font-extrabold tracking-tight transition-colors ${isSelected ? 'text-[#0B2438] dark:text-white' : 'text-[#4A6278] dark:text-gray-300'
                                }`}>
                                {pillar.title}
                              </h5>
                            </div>
                            <span className="text-[11px] text-[#4A6278] dark:text-gray-400 line-clamp-1">
                              {pillar.highlight}
                            </span>
                          </div>
                        </div>

                        {/* Right Arrow / Active Pill */}
                        <div className="shrink-0">
                          {isSelected ? (
                            <span
                              className="w-8 h-8 rounded-full flex items-center justify-center text-white shadow-sm"
                              style={{ backgroundColor: pillar.accentColor }}
                            >
                              <ChevronRight className="w-4 h-4" />
                            </span>
                          ) : (
                            <span className="w-8 h-8 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400">
                              <ChevronRight className="w-4 h-4" />
                            </span>
                          )}
                        </div>

                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

