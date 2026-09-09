import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Stethoscope,
  Zap,
  HeartHandshake,
  Activity,
  ShieldAlert,
  CalendarCheck,
  Sparkles,
  CheckCircle2,
  X,
  Calendar,
  Play,
  Pause,
  ArrowLeftRight,
  LayoutGrid,
  Columns3
} from 'lucide-react';
import HospitalMarqueeBackground from '../ui/HospitalMarqueeBackground';
import { STAGGER_UNIT } from '../../utils/animationTokens';

const CATEGORY_TABS = [
  { id: 'all', label: 'All Services', icon: Sparkles, count: 6 },
  { id: 'clinical', label: 'Doctor Care', icon: Stethoscope, count: 2 },
  { id: 'tech', label: 'Smart Tech & Scans', icon: Zap, count: 2 },
  { id: 'experience', label: 'Comfort & Speed', icon: HeartHandshake, count: 2 },
];

const USER_FRIENDLY_BOARDS = [
  {
    id: "01",
    number: "01",
    category: "clinical",
    title: "Top Doctors",
    plainText: "Experienced specialists ready to listen, diagnose, and care for your health.",
    benefit: "40+ Medical Specialties",
    patientPill: "Verified Specialists",
    icon: Stethoscope,
    gradient: "from-blue-500 to-indigo-600",
    accentGlow: "rgba(47, 128, 237, 0.28)",
    borderColor: "rgba(47, 128, 237, 0.35)",
    tag: "Care You Can Trust"
  },
  {
    id: "02",
    number: "02",
    category: "tech",
    title: "Modern Treatments",
    plainText: "Gentle robotic-guided therapies designed for minimal discomfort and faster recovery.",
    benefit: "60% Faster Healing",
    patientPill: "Robotic Surgery",
    icon: Zap,
    gradient: "from-cyan-500 to-blue-600",
    accentGlow: "rgba(0, 194, 203, 0.28)",
    borderColor: "rgba(0, 194, 203, 0.35)",
    tag: "Gentle & Precise"
  },
  {
    id: "03",
    number: "03",
    category: "clinical",
    title: "Personalized Care",
    plainText: "Custom wellness and treatment plans created specifically for your body and needs.",
    benefit: "1:1 Dedicated Nurse",
    patientPill: "Personal Roadmap",
    icon: HeartHandshake,
    gradient: "from-emerald-500 to-teal-600",
    accentGlow: "rgba(16, 185, 129, 0.28)",
    borderColor: "rgba(16, 185, 129, 0.35)",
    tag: "Made for You"
  },
  {
    id: "04",
    number: "04",
    category: "tech",
    title: "Fast Diagnostics",
    plainText: "Ultra-clear scans and blood tests delivered with rapid, accurate same-day results.",
    benefit: "Same-Day Results",
    patientPill: "High-Res 7T Imaging",
    icon: Activity,
    gradient: "from-blue-600 to-indigo-600",
    accentGlow: "rgba(59, 130, 246, 0.28)",
    borderColor: "rgba(59, 130, 246, 0.35)",
    tag: "Quick & Accurate"
  },
  {
    id: "05",
    number: "05",
    category: "experience",
    title: "24/7 Patient Support",
    plainText: "Immediate emergency help and friendly healthcare guidance whenever you need it.",
    benefit: "Zero Waiting Lines",
    patientPill: "Always Open 24/7",
    icon: ShieldAlert,
    gradient: "from-rose-500 to-orange-500",
    accentGlow: "rgba(244, 63, 94, 0.28)",
    borderColor: "rgba(244, 63, 94, 0.35)",
    tag: "Always Here for You"
  },
  {
    id: "06",
    number: "06",
    category: "experience",
    title: "Easy Appointments",
    plainText: "Pick your preferred doctor and time slot online in under 60 seconds with instant confirmation.",
    benefit: "Instant Booking",
    patientPill: "Digital Arrival Pass",
    icon: CalendarCheck,
    gradient: "from-purple-500 to-blue-600",
    accentGlow: "rgba(168, 85, 247, 0.28)",
    borderColor: "rgba(168, 85, 247, 0.35)",
    tag: "Book in 60 Seconds"
  }
];

// Minimized & Sleek Hover Board Card
function MinimizedHoverBoardCard({ item, index, onSelectBoard, isCarousel = true }) {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current || isFlipped) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPct = (x / rect.width) * 2 - 1;
    const yPct = (y / rect.height) * 2 - 1;

    setRotate({
      x: -yPct * 6,
      y: xPct * 6,
    });

    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsFlipped(false);
    setRotate({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  const IconComponent = item.icon;

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, scale: 0.94, y: 14 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: -14 }}
      transition={{ duration: 0.4, delay: index * STAGGER_UNIT, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`perspective-1000 cursor-pointer select-none group relative ${
        isCarousel ? 'w-[290px] sm:w-[325px] flex-shrink-0' : 'w-full'
      }`}
      style={{ height: '210px' }}
    >
      <div
        className="w-full h-full rounded-[1.6rem] transition-all duration-450 preserve-3d relative"
        style={{
          transform: `perspective(1000px) rotateY(${isFlipped ? 180 : rotate.y}deg) rotateX(${isFlipped ? 0 : rotate.x}deg) translateZ(${isHovered ? 8 : 0}px)`,
        }}
      >
        {/* FRONT FACE: MINIMIZED SLEEK CARD */}
        <div
          onClick={() => onSelectBoard(item)}
          className={`w-full h-full rounded-[1.6rem] p-4 sm:p-4.5 backface-hidden flex flex-col justify-between relative overflow-hidden border transition-all duration-300 ${
            isHovered
              ? 'bg-gradient-to-br from-white/95 via-blue-50/90 to-cyan-50/40 dark:from-[#0E2236] dark:to-[#0B1E30]'
              : 'bg-white/90 dark:bg-[#0D1E2E]/85 border-slate-100 dark:border-slate-800/80 shadow-[0_8px_24px_rgba(11,36,56,0.04)]'
          }`}
          style={{
            boxShadow: isHovered
              ? `0 20px 38px -10px ${item.accentGlow}, 0 0 0 1.5px ${item.borderColor}`
              : '0 8px 24px -4px rgba(11, 36, 56, 0.04), 0 0 0 1px rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
          }}
        >
          {/* Dynamic Light Sweep Shimmer Animation on Hover */}
          <div className="pointer-events-none absolute inset-0 w-full h-full overflow-hidden rounded-[1.6rem]">
            <div className="w-[140%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-800 ease-out" />
          </div>

          {/* Dynamic Glass Reflection Glare */}
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300 rounded-[1.6rem]"
            style={{
              opacity: glare.opacity,
              background: `radial-gradient(circle 180px at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.6) 0%, transparent 75%)`,
            }}
          />

          {/* Ambient Corner Aura Glow */}
          <div
            className={`absolute -top-10 -right-10 w-28 h-28 rounded-full bg-gradient-to-br ${item.gradient} blur-xl transition-all duration-500 ${
              isHovered ? 'opacity-35 scale-125' : 'opacity-10 scale-100'
            }`}
          />

          {/* Top Header Row */}
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-2.5">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  isHovered
                    ? `bg-gradient-to-tr ${item.gradient} text-white shadow-md scale-105 rotate-2`
                    : 'bg-blue-50 text-[#2F80ED]'
                }`}
              >
                <IconComponent className="w-4.5 h-4.5" />
              </div>
              <span className="text-[10px] font-bold text-[#2F80ED] bg-blue-50/90 border border-blue-100/90 px-2 py-0.5 rounded-full shadow-2xs">
                {item.tag}
              </span>
            </div>

            <span className="font-mono text-xl font-black text-slate-200 dark:text-slate-700 group-hover:text-[#2F80ED] transition-colors duration-300">
              {item.number}
            </span>
          </div>

          {/* Middle Content */}
          <div className="my-1 relative z-10 flex-1 flex flex-col justify-center">
            <h3 className="font-display text-[15px] sm:text-base font-bold text-[#0B2438] dark:text-white mb-1 tracking-tight group-hover:text-[#2F80ED] transition-colors line-clamp-1">
              {item.title}
            </h3>
            <p className="text-[11.5px] sm:text-xs text-[#4A6278] dark:text-gray-400 leading-relaxed font-normal line-clamp-2">
              {item.plainText}
            </p>
          </div>

          {/* Bottom Key Benefit & Action Row */}
          <div className="pt-2 border-t border-slate-100 dark:border-gray-800 flex items-center justify-between relative z-10">
            <span className="text-[10px] sm:text-[10.5px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/60 dark:border-emerald-800 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 shadow-2xs">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              {item.benefit}
            </span>

            {/* Interactive Hologram Flip Trigger */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(true);
              }}
              className="text-[10px] font-mono font-bold text-cyan-600 dark:text-cyan-400 hover:text-blue-600 px-2 py-0.5 rounded-md bg-cyan-50 dark:bg-cyan-950/50 border border-cyan-200/60 transition-colors flex items-center gap-1 group/holo"
              title="View holographic telemetry"
            >
              <span>Hologram</span>
              <Sparkles className="w-2.5 h-2.5 group-hover/holo:rotate-12 transition-transform" />
            </button>
          </div>
        </div>

        {/* BACK FACE: COMPACT HOLOGRAPHIC SCI-FI DATA MATRIX */}
        <div
          onClick={() => setIsFlipped(false)}
          className="absolute inset-0 w-full h-full rounded-[1.6rem] p-4 backface-hidden bg-[#080B1A]/95 text-white border border-cyan-400/50 shadow-[0_20px_45px_rgba(0,240,255,0.25)] flex flex-col justify-between overflow-hidden"
          style={{
            transform: 'rotateY(180deg)',
          }}
        >
          {/* Particle grid background */}
          <div className="absolute inset-0 circuit-grid-bg opacity-25 pointer-events-none" />

          {/* Header */}
          <div className="flex items-center justify-between relative z-10">
            <span className="font-mono text-[9px] font-extrabold text-[#00F0FF] tracking-widest uppercase">
              HOLOGRAPHIC SPEC // #{item.number}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
          </div>

          {/* Hologram Middle Spec Details */}
          <div className="my-1 relative z-10 space-y-1.5">
            <h4 className="font-mono text-sm font-black text-white line-clamp-1">
              {item.title} // TELEMETRY
            </h4>
            <div className="p-1.5 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-between text-[10px] font-mono">
              <span className="text-gray-400">STATUS:</span>
              <span className="text-[#00F0FF] font-bold">ONLINE · VERIFIED</span>
            </div>
            <p className="text-[10.5px] text-cyan-200/85 leading-relaxed line-clamp-2">
              {item.plainText} Real-time biometric feedback & clinical verification enabled.
            </p>
          </div>

          {/* Flip Return Action */}
          <div className="pt-1.5 border-t border-cyan-500/30 flex items-center justify-between relative z-10">
            <span className="text-[9px] font-mono text-gray-400">
              Click to flip back
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectBoard(item);
              }}
              className="px-2.5 py-1 rounded-lg bg-[#00F0FF] text-[#080B1A] font-mono text-[10.5px] font-black shadow-sm hover:bg-white transition-colors"
            >
              Examine
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const ROTATING_WORDS = [
  { text: 'Simplified', gradient: 'from-[#2F80ED] via-[#1E6FD9] to-[#00C2CB]', glow: 'rgba(47, 128, 237, 0.28)' },
  { text: 'Comfortable', gradient: 'from-[#00C2CB] via-[#0284C7] to-[#2F80ED]', glow: 'rgba(0, 194, 203, 0.28)' },
  { text: 'Effortless', gradient: 'from-[#6366F1] via-[#2F80ED] to-[#00C2CB]', glow: 'rgba(99, 102, 241, 0.28)' },
];

export default function HoverBoardsSection({ hospitalName, onOpenBooking }) {
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [wordIndex, setWordIndex] = useState(0);
  const [layoutMode, setLayoutMode] = useState('side-by-side'); // 'side-by-side' | 'grid'
  
  // Continuous Scrolling Animation State
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHoveredOverTrack, setIsHoveredOverTrack] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('forward'); // 'forward' | 'reverse'

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const filteredBoards = activeTab === 'all'
    ? USER_FRIENDLY_BOARDS
    : USER_FRIENDLY_BOARDS.filter(b => b.category === activeTab);

  // Repeat boards list to create a seamless, uninterrupted infinite scrolling loop
  const displayBoards = filteredBoards.length <= 2
    ? [...filteredBoards, ...filteredBoards, ...filteredBoards, ...filteredBoards]
    : [...filteredBoards, ...filteredBoards];

  return (
    <section
      id="services"
      className="relative py-16 lg:py-24 overflow-hidden bg-[#F8FBFF]"
    >
      {/* Hospital Name Background Marquee */}
      <HospitalMarqueeBackground hospitalName={hospitalName} reverse={true} />

      {/* Subtle Ambient Radial Glow */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-blue-400/10 via-cyan-300/10 to-transparent blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          {/* Animated Category Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/70 text-xs font-bold text-[#2F80ED] uppercase tracking-wider mb-3 shadow-sm backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2F80ED] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2F80ED]" />
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#2F80ED]" />
            <span>HOW WE CARE FOR YOU</span>
          </motion.div>

          {/* Shortened, Premium Animated Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B2438] tracking-tight mb-2.5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5"
          >
            <span>Healthcare,</span>
            <button
              type="button"
              onClick={() => setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length)}
              className="relative inline-flex items-center justify-center min-w-[200px] sm:min-w-[260px] lg:min-w-[295px] text-center cursor-pointer select-none group focus:outline-none"
              title="Click to switch word"
            >
              {/* Dynamic glowing aura backdrop */}
              <motion.span
                animate={{
                  boxShadow: `0 0 50px 14px ${ROTATING_WORDS[wordIndex].glow}`,
                }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0 rounded-full pointer-events-none opacity-60"
              />

              {/* 3D Perspective Word Flip Animation */}
              <AnimatePresence mode="wait">
                <motion.span
                  key={ROTATING_WORDS[wordIndex].text}
                  initial={{ opacity: 0, y: 18, filter: 'blur(8px)', rotateX: -30 }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)', rotateX: 0 }}
                  exit={{ opacity: 0, y: -18, filter: 'blur(8px)', rotateX: 30 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className={`inline-block font-black bg-gradient-to-r ${ROTATING_WORDS[wordIndex].gradient} bg-clip-text text-transparent group-hover:scale-[1.03] transition-transform duration-200`}
                >
                  {ROTATING_WORDS[wordIndex].text}
                </motion.span>
              </AnimatePresence>

              {/* Animated SVG Swoop Underline */}
              <svg
                className="absolute -bottom-1 sm:-bottom-1.5 left-1/2 -translate-x-1/2 w-4/5 max-w-[230px] h-3 overflow-visible pointer-events-none"
                viewBox="0 0 240 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M4 8C60 2 180 2 236 8"
                  stroke="url(#swoop-gradient)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  key={wordIndex}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
                <defs>
                  <linearGradient id="swoop-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#2F80ED" />
                    <stop offset="50%" stopColor="#00C2CB" />
                    <stop offset="100%" stopColor="#1E6FD9" />
                  </linearGradient>
                </defs>
              </svg>
            </button>
          </motion.h2>

          {/* Interactive Word Indicator Pills */}
          <div className="flex items-center justify-center gap-1.5 mb-2.5">
            {ROTATING_WORDS.map((item, idx) => (
              <button
                key={item.text}
                onClick={() => setWordIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === wordIndex
                    ? 'w-6 bg-[#2F80ED] shadow-[0_0_8px_rgba(47,128,237,0.5)]'
                    : 'w-1.5 bg-blue-200/80 hover:bg-blue-300'
                }`}
                aria-label={`Switch to ${item.text}`}
              />
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xs sm:text-sm text-[#4A6278] leading-relaxed max-w-xl mx-auto"
          >
            Explore our minimized care boards scrolling side-by-side. Hover over any board to pause and inspect clinical details.
          </motion.p>
        </div>

        {/* Controls Bar: Category Tabs + Scrolling Controls + View Switcher */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-7">
          {/* Animated Category Tabs */}
          <div className="flex items-center justify-center overflow-x-auto py-1 px-1 max-w-full no-scrollbar">
            <div className="inline-flex items-center gap-1.5 p-1 rounded-full bg-white/85 backdrop-blur-xl border border-white/90 shadow-[0_6px_24px_rgba(11,36,56,0.05)]">
              {CATEGORY_TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-[13px] font-bold transition-all duration-300 flex items-center gap-1.5 select-none outline-none ${
                      isActive ? 'text-white' : 'text-[#4A6278] hover:text-[#0B2438] hover:bg-white/60'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeHoverBoardTab"
                        transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2F80ED] to-[#1E6FD9] shadow-[0_4px_14px_rgba(47,128,237,0.35)]"
                      />
                    )}

                    <span className="relative z-10 flex items-center gap-1.5">
                      <Icon className={`w-3.5 h-3.5 transition-transform duration-300 ${isActive ? 'scale-110 rotate-3' : ''}`} />
                      <span>{tab.label}</span>
                      <span
                        className={`text-[9.5px] px-1.5 py-0.2 rounded-full font-mono font-bold transition-colors ${
                          isActive ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {tab.count}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Controls: Auto-Scroll Status, Play/Pause, Direction, View Switch */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
            {/* Scrolling Animation Status Indicator */}
            {layoutMode === 'side-by-side' && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 border border-slate-200/80 shadow-2xs backdrop-blur-md text-xs font-semibold">
                <span className="relative flex h-2 w-2">
                  {isAutoPlay && !isHoveredOverTrack ? (
                    <>
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </>
                  ) : (
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400" />
                  )}
                </span>
                <span className="text-[#0B2438]">
                  {isHoveredOverTrack
                    ? 'Paused on Hover'
                    : isAutoPlay
                    ? 'Auto-Scrolling'
                    : 'Paused'}
                </span>

                {/* Play / Pause Toggle Button */}
                <button
                  onClick={() => setIsAutoPlay(prev => !prev)}
                  className="ml-1 p-1 rounded-full hover:bg-blue-50 text-[#2F80ED] transition-colors"
                  title={isAutoPlay ? "Pause scrolling" : "Resume scrolling"}
                >
                  {isAutoPlay ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                </button>

                {/* Direction Switch Button */}
                <button
                  onClick={() => setScrollDirection(prev => prev === 'forward' ? 'reverse' : 'forward')}
                  className="p-1 rounded-full hover:bg-blue-50 text-[#2F80ED] transition-colors"
                  title="Reverse scroll direction"
                >
                  <ArrowLeftRight className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* View Mode Toggle: Side-by-Side Scrolling vs Compact Grid */}
            <div className="inline-flex items-center p-1 rounded-full bg-white/80 border border-slate-200/80 shadow-2xs backdrop-blur-md">
              <button
                onClick={() => setLayoutMode('side-by-side')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  layoutMode === 'side-by-side'
                    ? 'bg-[#2F80ED] text-white shadow-xs'
                    : 'text-[#4A6278] hover:text-[#0B2438]'
                }`}
                title="Continuous horizontal scrolling animation"
              >
                <Columns3 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Scrolling Track</span>
              </button>

              <button
                onClick={() => setLayoutMode('grid')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  layoutMode === 'grid'
                    ? 'bg-[#2F80ED] text-white shadow-xs'
                    : 'text-[#4A6278] hover:text-[#0B2438]'
                }`}
                title="Compact grid layout"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Grid</span>
              </button>
            </div>
          </div>
        </div>

        {/* CONTINUOUS SCROLLING ANIMATION TRACK (Default) */}
        {layoutMode === 'side-by-side' ? (
          <div
            className="relative w-full py-4 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 overflow-hidden group/marquee"
            onMouseEnter={() => setIsHoveredOverTrack(true)}
            onMouseLeave={() => setIsHoveredOverTrack(false)}
          >
            {/* Soft Edge Gradient Fog / Luxury Mist Masks */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#F8FBFF] to-transparent z-20" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#F8FBFF] to-transparent z-20" />

            {/* Seamless Infinite Scrolling Animation Track */}
            <div
              className="flex items-center gap-5 will-change-transform"
              style={{
                width: 'max-content',
                animation: `marquee-scroll ${filteredBoards.length <= 2 ? '24s' : '36s'} linear infinite ${scrollDirection === 'reverse' ? 'reverse' : 'normal'}`,
                animationPlayState: (!isAutoPlay || isHoveredOverTrack) ? 'paused' : 'running',
              }}
            >
              {displayBoards.map((item, index) => (
                <MinimizedHoverBoardCard
                  key={`${item.id}-${index}`}
                  item={item}
                  index={index % filteredBoards.length}
                  isCarousel={true}
                  onSelectBoard={(board) => setSelectedBoard(board)}
                />
              ))}
            </div>

            {/* Interaction Helper Notice */}
            <div className="text-center pt-4 pb-1">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-400 bg-white/70 px-3 py-1 rounded-full border border-slate-100 shadow-2xs">
                <span>✦ Hover over any board to pause scrolling & explore holograms</span>
              </span>
            </div>
          </div>
        ) : (
          /* COMPACT GRID VIEW (For users who toggle to Grid) */
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
          >
            <AnimatePresence mode="popLayout">
              {filteredBoards.map((item, index) => (
                <MinimizedHoverBoardCard
                  key={item.id}
                  item={item}
                  index={index}
                  isCarousel={false}
                  onSelectBoard={(board) => setSelectedBoard(board)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Friendly Quick-Details Modal */}
        <AnimatePresence>
          {selectedBoard && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B2438]/40 backdrop-blur-md animate-in fade-in duration-200">
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 15 }}
                className="relative w-full max-w-lg p-6 sm:p-7 rounded-[2.25rem] bg-white/95 backdrop-blur-2xl border border-white shadow-2xl space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-2xl font-black text-[#2F80ED]">
                      {selectedBoard.number}
                    </span>
                    <span className="text-xs font-bold text-[#2F80ED] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                      {selectedBoard.tag}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedBoard(null)}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 font-bold"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div>
                  <h3 className="font-display text-2xl font-extrabold text-[#0B2438] mb-1">
                    {selectedBoard.title}
                  </h3>
                  <p className="text-sm font-semibold text-emerald-600 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    {selectedBoard.benefit}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-[#4A6278] leading-relaxed">
                  {selectedBoard.plainText} Our dedicated healthcare team ensures you experience warm hospitality, clear answers to your questions, and zero unnecessary waiting.
                </p>

                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#2F80ED] block">
                    What This Means for You
                  </span>
                  <div className="space-y-1 text-xs text-[#0B2438] font-medium">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2F80ED]" />
                      <span>Friendly doctors who take time to answer all your questions</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2F80ED]" />
                      <span>Direct digital booking with zero waiting rooms</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    onClick={() => setSelectedBoard(null)}
                    className="px-4 py-2 text-xs font-semibold text-[#4A6278] hover:text-[#0B2438]"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setSelectedBoard(null);
                      if (onOpenBooking) onOpenBooking();
                    }}
                    className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-[#2F80ED] hover:bg-blue-600 shadow-md shadow-blue-500/20 flex items-center gap-1.5"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Appointment</span>
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}


