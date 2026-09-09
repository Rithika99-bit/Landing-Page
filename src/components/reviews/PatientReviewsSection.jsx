import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star,
  CheckCircle2,
  Quote,
  ShieldCheck,
  Sparkles,
  Heart,
  Play,
  Pause,
  Columns3,
  LayoutGrid,
  X,
  Calendar,
  UserCheck,
  Stethoscope,
  Activity,
  Award
} from 'lucide-react';
import HospitalMarqueeBackground from '../ui/HospitalMarqueeBackground';
import { STAGGER_UNIT } from '../../utils/animationTokens';

const PATIENT_REVIEWS = [
  {
    id: "rev-01",
    name: "Elena Rostova",
    location: "Zurich, Switzerland",
    procedure: "Aortic Valve Reconstruction",
    department: "cardio",
    deptLabel: "Cardiology",
    rating: 5,
    quote: "Walked out of the hospital in 48 hours. Dr. Marcus and the cardiac team gave me my life back without open-heart trauma.",
    fullStory: "After experiencing worsening shortness of breath for two years, three surgeons told me only high-risk open-heart surgery was possible. At this center, Dr. Marcus performed a minimally invasive transcatheter valve reconstruction. I was standing without pain the next morning, and discharged on day two. The acoustic recovery suite felt more like a wellness retreat than a clinical room.",
    doctor: "Dr. Marcus Vance",
    milestone: "Discharged in 48h",
    initials: "ER",
    gradient: "from-blue-500 to-indigo-600",
    accentGlow: "rgba(47, 128, 237, 0.28)",
    borderColor: "rgba(47, 128, 237, 0.35)",
    verified: true,
  },
  {
    id: "rev-02",
    name: "David K. Chen",
    location: "San Francisco, USA",
    procedure: "Robotic Micro-Discectomy",
    department: "robotics",
    deptLabel: "Robotic Surgery",
    rating: 5,
    quote: "Zero pain after 6 years of chronic sciatica. The robotic sub-millimeter precision and same-day mobility protocol felt like science fiction.",
    fullStory: "Chronic L5-S1 disc compression had made sitting impossible. The robotic-assisted navigation allowed Dr. Elena to decompress the nerve with a 12mm micro-incision. Within four hours post-op, the debilitating nerve fire was completely gone. I was walking the hospital grounds that afternoon.",
    doctor: "Dr. Elena Rostova",
    milestone: "Zero Pain in 24h",
    initials: "DC",
    gradient: "from-cyan-500 to-blue-600",
    accentGlow: "rgba(0, 194, 203, 0.28)",
    borderColor: "rgba(0, 194, 203, 0.35)",
    verified: true,
  },
  {
    id: "rev-03",
    name: "Dr. Amara Okafor",
    location: "London, UK",
    procedure: "Endovascular Aneurysm Mapping",
    department: "neuro",
    deptLabel: "Neurosciences",
    rating: 5,
    quote: "Diagnosed within 30 minutes of intake. Flawless micro-catheter intervention and the recovery care was deeply reassuring.",
    fullStory: "As a physician myself, I knew the stakes when an unruptured cerebral aneurysm was discovered during routine imaging. The neurovascular team mapped the vessel architecture in 3D holographic detail before executing the coil embolization. Zero neurological deficit, home in 36 hours. The pinnacle of neuro-intervention.",
    doctor: "Dr. Elena Rostova",
    milestone: "Same-Day Precision",
    initials: "AO",
    gradient: "from-purple-500 to-indigo-600",
    accentGlow: "rgba(139, 92, 246, 0.28)",
    borderColor: "rgba(139, 92, 246, 0.35)",
    verified: true,
  },
  {
    id: "rev-04",
    name: "Michael Gallagher",
    location: "Boston, USA",
    procedure: "Sub-Cellular Targeted Immunotherapy",
    department: "oncology",
    deptLabel: "Oncology",
    rating: 5,
    quote: "Targeted genomic therapy cleared my lymphoma with minimal fatigue. The 1:1 dedicated nurse checked on me every single day.",
    fullStory: "Facing stage III lymphoma, the thought of systemic chemotherapy was terrifying. Dr. Sarah mapped my tumor's genetic mutations and tailored an antibody-drug conjugate. Two months in, PET scans showed zero metabolic activity. The oncology navigators treated my entire family with dignity and immense warmth.",
    doctor: "Dr. Sarah Lin",
    milestone: "In Full Remission",
    initials: "MG",
    gradient: "from-rose-500 to-orange-500",
    accentGlow: "rgba(244, 63, 94, 0.28)",
    borderColor: "rgba(244, 63, 94, 0.35)",
    verified: true,
  },
  {
    id: "rev-05",
    name: "Sarah Jenkins",
    location: "Sydney, Australia",
    procedure: "Zero-Incision Knee Arthroplasty",
    department: "ortho",
    deptLabel: "Orthopedics",
    rating: 5,
    quote: "Back playing tennis with my daughter in 3 weeks. The computer-guided alignment made recovery so much faster than I ever hoped.",
    fullStory: "Years of competitive squash had destroyed my medial cartilage. The team used custom 3D-printed titanium implants matched to my bone geometry down to 0.1mm. Physical therapy started 2 hours post-surgery. Three weeks later, I was walking 5 miles a day with complete stability.",
    doctor: "Dr. Marcus Vance",
    milestone: "Active in 3 Weeks",
    initials: "SJ",
    gradient: "from-emerald-500 to-teal-600",
    accentGlow: "rgba(16, 185, 129, 0.28)",
    borderColor: "rgba(16, 185, 129, 0.35)",
    verified: true,
  },
  {
    id: "rev-06",
    name: "Julian Al-Mansoor",
    location: "Dubai, UAE",
    procedure: "Pediatric Precision Care",
    department: "pediatrics",
    deptLabel: "Pediatrics",
    rating: 5,
    quote: "The kindness shown to our 7-year-old was unbelievable. Child-friendly holographic scans and doctors who truly listened.",
    fullStory: "Our daughter required corrective chest wall surgery. From the pediatric playroom to the sedation masks infused with lavender scents, every detail eased her anxiety. The surgical outcome was flawless, and she was giggling and drawing with the nursing staff by evening. An exceptional institution.",
    doctor: "Dr. Sarah Lin",
    milestone: "Full Vitality Restored",
    initials: "JA",
    gradient: "from-amber-500 to-pink-500",
    accentGlow: "rgba(245, 158, 11, 0.28)",
    borderColor: "rgba(245, 158, 11, 0.35)",
    verified: true,
  },
  {
    id: "rev-07",
    name: "Claire Beauchamp",
    location: "Paris, France",
    procedure: "7-Tesla Diagnostic Screening",
    department: "diagnostics",
    deptLabel: "Diagnostics",
    rating: 5,
    quote: "Immediate 2-hour scan results revealed what three previous clinics missed. The clinical speed and clarity changed everything.",
    fullStory: "I suffered from mysterious micro-seizures for 18 months that standard 1.5T MRIs couldn't detect. The 7-Tesla imaging at this hospital caught a minute focal cortical dysplasia in 20 minutes. We had a surgical cure roadmap prepared that same afternoon.",
    doctor: "Dr. Sarah Lin",
    milestone: "2-Hour Rapid Catch",
    initials: "CB",
    gradient: "from-cyan-600 to-teal-600",
    accentGlow: "rgba(0, 194, 203, 0.28)",
    borderColor: "rgba(0, 194, 203, 0.35)",
    verified: true,
  },
  {
    id: "rev-08",
    name: "Robert Kowalski",
    location: "Chicago, USA",
    procedure: "Emergency Cardiac Stenting",
    department: "cardio",
    deptLabel: "Cardiology",
    rating: 5,
    quote: "Arrived at 2 AM with acute chest discomfort; catheter team cleared the blockage in under 18 minutes. Lifesaving mastery.",
    fullStory: "A sudden coronary blockage struck while I was traveling on business. From ambulance arrival to balloon inflation took only 18 minutes—well below national benchmarks. The team's clinical precision saved my myocardium from irreversible damage. Eternally grateful.",
    doctor: "Dr. Marcus Vance",
    milestone: "18-Min Door-to-Balloon",
    initials: "RK",
    gradient: "from-blue-600 to-violet-600",
    accentGlow: "rgba(37, 99, 235, 0.28)",
    borderColor: "rgba(37, 99, 235, 0.35)",
    verified: true,
  }
];

const DEPARTMENT_FILTERS = [
  { id: 'all', label: 'All Reviews' },
  { id: 'cardio', label: 'Cardiology' },
  { id: 'robotics', label: 'Robotic Surgery' },
  { id: 'neuro', label: 'Neurosciences' },
  { id: 'oncology', label: 'Oncology' },
  { id: 'ortho', label: 'Orthopedics' },
];

// 3D Tiltable, Minimized Patient Review Board
function PatientReviewBoard({ review, index, onSelectReview }) {
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
    setRotate({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, scale: 0.94, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: -12 }}
      transition={{ duration: 0.4, delay: (index % 4) * STAGGER_UNIT }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelectReview(review)}
      className="perspective-1000 cursor-pointer select-none group relative w-[320px] sm:w-[365px] flex-shrink-0"
      style={{ height: '225px' }}
    >
      <div
        className="w-full h-full rounded-[1.75rem] transition-all duration-400 preserve-3d relative p-4 sm:p-5 flex flex-col justify-between overflow-hidden border"
        style={{
          transform: `perspective(1000px) rotateY(${rotate.y}deg) rotateX(${rotate.x}deg) translateZ(${isHovered ? 8 : 0}px)`,
          background: isHovered
            ? 'linear-gradient(135deg, rgba(255,255,255,0.98) 0%, rgba(240,248,255,0.95) 100%)'
            : 'rgba(255, 255, 255, 0.88)',
          boxShadow: isHovered
            ? `0 20px 40px -10px ${review.accentGlow}, 0 0 0 1.5px ${review.borderColor}`
            : '0 8px 25px -4px rgba(11, 36, 56, 0.04), 0 0 0 1px rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        {/* Dynamic Light Sweep Shimmer Animation on Hover */}
        <div className="pointer-events-none absolute inset-0 w-full h-full overflow-hidden rounded-[1.75rem]">
          <div className="w-[140%] h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-800 ease-out" />
        </div>

        {/* Dynamic Specular Glare */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 rounded-[1.75rem]"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(circle 180px at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.65) 0%, transparent 75%)`,
          }}
        />

        {/* Ambient Corner Aura */}
        <div
          className={`absolute -top-10 -right-10 w-24 h-24 rounded-full bg-gradient-to-br ${review.gradient} blur-xl transition-all duration-500 ${
            isHovered ? 'opacity-30 scale-125' : 'opacity-10 scale-100'
          }`}
        />

        {/* Top Header Row: Patient Info & 5-Star Rating */}
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2.5">
            {/* Avatar Pill with Gradient */}
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs text-white bg-gradient-to-tr ${review.gradient} shadow-sm`}
            >
              {review.initials}
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="font-display text-sm font-bold text-[#0B2438] tracking-tight group-hover:text-[#2F80ED] transition-colors line-clamp-1">
                  {review.name}
                </h4>
                {review.verified && (
                  <span className="inline-flex items-center text-emerald-600" title="Verified Patient">
                    <CheckCircle2 className="w-3.5 h-3.5 fill-emerald-100" />
                  </span>
                )}
              </div>
              <p className="text-[10.5px] text-slate-400 font-medium line-clamp-1">
                {review.location}
              </p>
            </div>
          </div>

          {/* 5 Golden Stars */}
          <div className="flex items-center gap-0.5 bg-amber-50/90 border border-amber-200/60 px-2 py-0.5 rounded-full shadow-2xs">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
            ))}
          </div>
        </div>

        {/* Middle Body: Procedure Tag & Clamped Heartfelt Quote */}
        <div className="my-1 relative z-10 flex-1 flex flex-col justify-center">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[9.5px] font-bold text-[#2F80ED] bg-blue-50/90 border border-blue-100 px-2 py-0.5 rounded-md">
              {review.deptLabel}
            </span>
            <span className="text-[10px] font-medium text-slate-400 truncate">
              {review.procedure}
            </span>
          </div>

          <p className="text-[11.5px] sm:text-xs text-[#2A4356] leading-relaxed italic line-clamp-2">
            "{review.quote}"
          </p>
        </div>

        {/* Bottom Row: Doctor Tag, Recovery Milestone & Read Action */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between relative z-10 text-[10.5px]">
          <span className="font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 shadow-2xs">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            {review.milestone}
          </span>

          <span className="font-semibold text-[#2F80ED] group-hover:underline flex items-center gap-1">
            <span>Read Story</span>
            <span className="group-hover:translate-x-0.5 transition-transform">→</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function PatientReviewsSection({ hospitalName, onOpenBooking }) {
  const [selectedReview, setSelectedReview] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHoveredOverTrack, setIsHoveredOverTrack] = useState(false);
  const [layoutMode, setLayoutMode] = useState('streaming'); // 'streaming' | 'grid'

  const filteredReviews = activeFilter === 'all'
    ? PATIENT_REVIEWS
    : PATIENT_REVIEWS.filter(r => r.department === activeFilter);

  // Divide into two streams for a cinematic dual-lane scrolling flow
  const lane1 = filteredReviews.slice(0, Math.ceil(filteredReviews.length / 2));
  const lane2 = filteredReviews.slice(Math.ceil(filteredReviews.length / 2));

  // Infinite duplicate arrays for zero-gap marquee flow
  const stream1 = lane1.length < 3 ? [...lane1, ...lane1, ...lane1, ...lane1] : [...lane1, ...lane1];
  const stream2 = (lane2.length > 0 ? lane2 : lane1).length < 3
    ? [...(lane2.length > 0 ? lane2 : lane1), ...(lane2.length > 0 ? lane2 : lane1), ...(lane2.length > 0 ? lane2 : lane1), ...(lane2.length > 0 ? lane2 : lane1)]
    : [...(lane2.length > 0 ? lane2 : lane1), ...(lane2.length > 0 ? lane2 : lane1)];

  return (
    <section
      id="patient-reviews"
      className="relative py-16 lg:py-24 overflow-hidden bg-[#F8FBFF]"
    >
      {/* Background Watermark Marquee */}
      <HospitalMarqueeBackground hospitalName="PATIENT EXPERIENCES & VOICES" reverse={false} />

      {/* Ambient Radial Lighting */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-cyan-400/8 via-blue-500/8 to-transparent blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          {/* Section Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50/90 border border-emerald-200/70 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-3 shadow-sm backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            <span>HEALING STORIES FROM REAL PATIENTS</span>
          </motion.div>

          {/* Section Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B2438] tracking-tight mb-2.5"
          >
            Loved by{' '}
            <span className="bg-gradient-to-r from-[#2F80ED] via-[#00C2CB] to-[#1E6FD9] bg-clip-text text-transparent">
              50,000+ Patients
            </span>{' '}
            Across the World
          </motion.h2>

          {/* Trust Metric Strip */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-[#4A6278] mb-3">
            <span className="inline-flex items-center gap-1 text-emerald-600">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>99.8% Audited Satisfaction</span>
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1 text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span>4.99 / 5.0 Rating (4,200+ Reviews)</span>
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1 text-[#2F80ED]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>JCI Gold Accredited Hospital</span>
            </span>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xs sm:text-sm text-[#4A6278] leading-relaxed max-w-xl mx-auto"
          >
            Explore clinical recovery stories flowing continuously below. Hover over any board to pause and read their complete healing journey.
          </motion.p>
        </div>

        {/* Controls Bar: Department Filter Tabs + Status Indicator + View Switch */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-7">
          {/* Department Tabs */}
          <div className="flex items-center justify-center overflow-x-auto py-1 px-1 max-w-full no-scrollbar">
            <div className="inline-flex items-center gap-1.5 p-1 rounded-full bg-white/85 backdrop-blur-xl border border-white/90 shadow-[0_6px_24px_rgba(11,36,56,0.05)]">
              {DEPARTMENT_FILTERS.map((tab) => {
                const isActive = activeFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveFilter(tab.id)}
                    className={`relative px-3.5 sm:px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 select-none outline-none ${
                      isActive ? 'text-white' : 'text-[#4A6278] hover:text-[#0B2438] hover:bg-white/60'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activePatientReviewTab"
                        transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2F80ED] to-[#00C2CB] shadow-[0_4px_14px_rgba(47,128,237,0.35)]"
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Controls: Auto-Scroll Status, Play/Pause, View Mode Switch */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
            {/* Live Scrolling Status Indicator */}
            {layoutMode === 'streaming' && (
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
                    ? 'Reviews Scrolling Live'
                    : 'Paused'}
                </span>

                {/* Play/Pause Button */}
                <button
                  onClick={() => setIsAutoPlay(prev => !prev)}
                  className="ml-1 p-1 rounded-full hover:bg-blue-50 text-[#2F80ED] transition-colors"
                  title={isAutoPlay ? "Pause scrolling" : "Resume scrolling"}
                >
                  {isAutoPlay ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                </button>
              </div>
            )}

            {/* Layout Mode Toggle: Streaming Dual-Lane vs Grid */}
            <div className="inline-flex items-center p-1 rounded-full bg-white/80 border border-slate-200/80 shadow-2xs backdrop-blur-md">
              <button
                onClick={() => setLayoutMode('streaming')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  layoutMode === 'streaming'
                    ? 'bg-[#2F80ED] text-white shadow-xs'
                    : 'text-[#4A6278] hover:text-[#0B2438]'
                }`}
                title="Continuous dual-lane scrolling animation"
              >
                <Columns3 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Scrolling Stream</span>
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

        {/* DUAL-LANE CONTINUOUS SCROLLING ANIMATION STREAMS */}
        {layoutMode === 'streaming' ? (
          <div
            className="relative w-full py-2 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 overflow-hidden space-y-5 group/reviews"
            onMouseEnter={() => setIsHoveredOverTrack(true)}
            onMouseLeave={() => setIsHoveredOverTrack(false)}
          >
            {/* Soft Edge Gradient Fog / Luxury Mist Masks */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-36 bg-gradient-to-r from-[#F8FBFF] to-transparent z-20" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-36 bg-gradient-to-l from-[#F8FBFF] to-transparent z-20" />

            {/* Lane 1: Smooth Forward Stream */}
            <div
              className="flex items-center gap-5 will-change-transform"
              style={{
                width: 'max-content',
                animation: 'marquee-scroll 45s linear infinite',
                animationPlayState: (!isAutoPlay || isHoveredOverTrack) ? 'paused' : 'running',
              }}
            >
              {stream1.map((review, idx) => (
                <PatientReviewBoard
                  key={`lane1-${review.id}-${idx}`}
                  review={review}
                  index={idx}
                  onSelectReview={(r) => setSelectedReview(r)}
                />
              ))}
            </div>

            {/* Lane 2: Smooth Reverse Drift Stream */}
            <div
              className="flex items-center gap-5 will-change-transform"
              style={{
                width: 'max-content',
                animation: 'marquee-scroll 50s linear infinite reverse',
                animationPlayState: (!isAutoPlay || isHoveredOverTrack) ? 'paused' : 'running',
              }}
            >
              {stream2.map((review, idx) => (
                <PatientReviewBoard
                  key={`lane2-${review.id}-${idx}`}
                  review={review}
                  index={idx}
                  onSelectReview={(r) => setSelectedReview(r)}
                />
              ))}
            </div>

            {/* Interaction helper banner */}
            <div className="text-center pt-3 pb-1">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-400 bg-white/70 px-3.5 py-1 rounded-full border border-slate-100 shadow-2xs">
                <Sparkles className="w-3 h-3 text-[#2F80ED]" />
                <span>Hover over any review to pause the stream & click to read their full recovery story</span>
              </span>
            </div>
          </div>
        ) : (
          /* COMPACT GRID VIEW (When switched to Grid) */
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            <AnimatePresence mode="popLayout">
              {filteredReviews.map((review, index) => (
                <PatientReviewBoard
                  key={`grid-${review.id}`}
                  review={review}
                  index={index}
                  onSelectReview={(r) => setSelectedReview(r)}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Detailed Patient Story Inspection Modal */}
        <AnimatePresence>
          {selectedReview && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B2438]/40 backdrop-blur-md animate-in fade-in duration-200">
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 15 }}
                className="relative w-full max-w-lg p-6 sm:p-7 rounded-[2.25rem] bg-white/95 backdrop-blur-2xl border border-white shadow-2xl space-y-4"
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm text-white bg-gradient-to-tr ${selectedReview.gradient} shadow-md`}
                    >
                      {selectedReview.initials}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-display text-lg font-extrabold text-[#0B2438]">
                          {selectedReview.name}
                        </h3>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Verified</span>
                        </span>
                      </div>
                      <p className="text-xs text-slate-400">
                        {selectedReview.location} • Treated by {selectedReview.doctor}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedReview(null)}
                    className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 font-bold"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Procedure & 5-Star Banner */}
                <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#2F80ED] block">
                      Clinical Procedure
                    </span>
                    <span className="text-xs font-bold text-[#0B2438]">
                      {selectedReview.procedure} ({selectedReview.deptLabel})
                    </span>
                  </div>
                  <div className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-full border border-amber-200 shadow-2xs">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                    <span className="text-[10px] font-mono font-bold text-[#0B2438] ml-1">5.0</span>
                  </div>
                </div>

                {/* Full Patient Narrative */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-[#0B2438] flex items-center gap-1.5">
                    <Quote className="w-3.5 h-3.5 text-[#2F80ED]" />
                    <span>Patient Testament & Recovery Journey</span>
                  </span>
                  <p className="text-xs sm:text-sm text-[#4A6278] leading-relaxed">
                    {selectedReview.fullStory}
                  </p>
                </div>

                {/* Clinical Milestone Pill */}
                <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Outcome Milestone:</span>
                  <span className="font-bold text-emerald-700">{selectedReview.milestone}</span>
                </div>

                {/* Modal Footer Actions */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    onClick={() => setSelectedReview(null)}
                    className="px-4 py-2 text-xs font-semibold text-[#4A6278] hover:text-[#0B2438]"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setSelectedReview(null);
                      if (onOpenBooking) onOpenBooking();
                    }}
                    className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-[#2F80ED] hover:bg-blue-600 shadow-md shadow-blue-500/20 flex items-center gap-1.5"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book with {selectedReview.doctor}</span>
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
