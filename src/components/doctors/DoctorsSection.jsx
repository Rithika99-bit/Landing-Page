import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DOCTORS_DATA } from '../../data/hospitalData';
import { Star, ArrowRight, Calendar, Sparkles, GraduationCap, Award } from 'lucide-react';
import HospitalMarqueeBackground from '../ui/HospitalMarqueeBackground';
import { isReducedMotionPreferred, isTouchDevice } from '../../utils/animationTokens';

const SPECIALTY_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'cardio', label: 'Cardiology', match: 'Precision Cardiology' },
  { id: 'neuro', label: 'Neurosciences', match: 'Advanced Neurosciences' },
  { id: 'genomics', label: 'Genomics & Pediatrics', match: 'Pediatric & Genomic Care' },
  { id: 'integrative', label: 'Integrative Health', match: 'Holistic & Preventative Health' },
];

/**
 * SpecialtySignatureVisual:
 * Compact, restrained signature visual (~120px x 48px) representing the clinical focus.
 * Strictly labeled "Specialty Signature", never fictional live vitals.
 */
function SpecialtySignatureVisual({ doctorId }) {
  if (doctorId === 'dr-marcus') {
    // Cardiology: Gentle ECG wave
    return (
      <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-blue-50/80 dark:bg-cyan-950/30 border border-blue-100 dark:border-cyan-500/20 w-fit">
        <div className="w-16 h-6 flex items-center justify-center">
          <svg viewBox="0 0 80 24" className="w-full h-full stroke-rose-500 fill-none">
            <motion.path
              d="M 0 12 L 20 12 L 26 4 L 32 20 L 38 2 L 44 18 L 50 12 L 80 12"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0.2 }}
              animate={{ pathLength: [0.2, 1, 0.2] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </svg>
        </div>
        <div className="text-left">
          <span className="text-[9px] font-mono uppercase tracking-wider text-gray-400 block leading-none">Focus</span>
          <span className="text-[11px] font-bold text-[#0B2438] dark:text-cyan-200">Cardiac Care</span>
        </div>
      </div>
    );
  }

  if (doctorId === 'dr-elena') {
    // Neurosciences: Gentle neural wave
    return (
      <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-violet-50/80 dark:bg-violet-950/30 border border-violet-100 dark:border-violet-500/20 w-fit">
        <div className="w-16 h-6 flex items-center justify-center">
          <svg viewBox="0 0 80 24" className="w-full h-full stroke-violet-500 fill-none">
            <motion.path
              d="M 0 12 Q 10 4, 20 12 T 40 12 T 60 12 T 80 12"
              strokeWidth="1.75"
              strokeLinecap="round"
              initial={{ pathOffset: 0 }}
              animate={{ pathOffset: [0, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
          </svg>
        </div>
        <div className="text-left">
          <span className="text-[9px] font-mono uppercase tracking-wider text-gray-400 block leading-none">Focus</span>
          <span className="text-[11px] font-bold text-[#0B2438] dark:text-violet-200">Neural Care</span>
        </div>
      </div>
    );
  }

  if (doctorId === 'dr-sarah') {
    // Genomics: Compact DNA strand
    return (
      <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-teal-50/80 dark:bg-teal-950/30 border border-teal-100 dark:border-teal-500/20 w-fit">
        <div className="w-16 h-6 flex items-center justify-center relative">
          <svg viewBox="0 0 80 24" className="w-full h-full stroke-teal-500 fill-none">
            <path d="M 5 6 Q 20 18, 40 6 T 75 6" strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M 5 18 Q 20 6, 40 18 T 75 18" strokeWidth="1.5" strokeDasharray="3 3" />
          </svg>
        </div>
        <div className="text-left">
          <span className="text-[9px] font-mono uppercase tracking-wider text-gray-400 block leading-none">Focus</span>
          <span className="text-[11px] font-bold text-[#0B2438] dark:text-teal-200">Genomic Care</span>
        </div>
      </div>
    );
  }

  // Integrative: Balance ring
  return (
    <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-500/20 w-fit">
      <div className="w-16 h-6 flex items-center justify-center">
        <div className="relative w-5 h-5 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-emerald-400/40 animate-pulse" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
        </div>
      </div>
      <div className="text-left">
        <span className="text-[9px] font-mono uppercase tracking-wider text-gray-400 block leading-none">Focus</span>
        <span className="text-[11px] font-bold text-[#0B2438] dark:text-emerald-200">Integrated Care</span>
      </div>
    </div>
  );
}

export default function DoctorsSection({ hospitalName, onViewProfile, onOpenBooking }) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedDoctorId, setSelectedDoctorId] = useState(DOCTORS_DATA[0].id);
  const [showDetails, setShowDetails] = useState(false);
  const [isPortraitHovered, setIsPortraitHovered] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const panelRef = useRef(null);
  const isTouch = isTouchDevice();
  const prefersReducedMotion = isReducedMotionPreferred();

  // Filtered doctors list
  const filteredDoctors = selectedFilter === 'all'
    ? DOCTORS_DATA
    : DOCTORS_DATA.filter((doc) => {
        const filterObj = SPECIALTY_FILTERS.find((f) => f.id === selectedFilter);
        return filterObj ? doc.specialty === filterObj.match : true;
      });

  // Active doctor
  const currentDoctor = DOCTORS_DATA.find((doc) => doc.id === selectedDoctorId) || filteredDoctors[0] || DOCTORS_DATA[0];

  // Subtle 3D tilt handler (capped strictly at max 3deg, desktop only)
  const handleMouseMove = (e) => {
    if (isTouch || prefersReducedMotion || !panelRef.current) return;
    const rect = panelRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPct = (x / rect.width) * 2 - 1;
    const yPct = (y / rect.height) * 2 - 1;

    setRotate({
      x: -yPct * 2.5,
      y: xPct * 2.5,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsPortraitHovered(false);
  };

  const handleFilterSelect = (filterId) => {
    setSelectedFilter(filterId);
    setShowDetails(false);
    if (filterId !== 'all') {
      const targetFilter = SPECIALTY_FILTERS.find((f) => f.id === filterId);
      const matchingDoctor = DOCTORS_DATA.find((doc) => doc.specialty === targetFilter?.match);
      if (matchingDoctor) {
        setSelectedDoctorId(matchingDoctor.id);
      }
    }
  };

  return (
    <section id="doctors" className="relative pt-16 lg:pt-20 pb-6 lg:pb-8 bg-[#F8FBFF] dark:bg-[#080B1A] overflow-hidden">
      {/* Background Subtle Marquee */}
      <HospitalMarqueeBackground hospitalName={hospitalName} />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header: Compact and Focused */}
        <div className="text-center max-w-2xl mx-auto mb-7 sm:mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-cyan-950/40 border border-blue-200/60 dark:border-cyan-500/30 text-[11px] font-bold text-[#2F80ED] dark:text-cyan-300 uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3 h-3 text-[#2F80ED] dark:text-cyan-300" />
            <span>DISTINGUISHED MEDICAL LEADERS</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B2438] dark:text-white tracking-tight mb-2">
            Meet Our Distinguished Medical Leaders
          </h2>

          <p className="text-xs sm:text-sm text-[#4A6278] dark:text-gray-300 leading-relaxed">
            Meet the specialists trusted to guide your care.
          </p>

          {/* Compact Specialty Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mt-5" role="tablist" aria-label="Filter by Medical Specialty">
            {SPECIALTY_FILTERS.map((tab) => {
              const isActive = selectedFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleFilterSelect(tab.id)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'text-white shadow-sm'
                      : 'text-[#4A6278] dark:text-gray-400 hover:text-[#0B2438] dark:hover:text-white bg-white/70 dark:bg-white/5 border border-gray-200/60 dark:border-gray-800'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeSpecialtyTab"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2F80ED] to-[#00C2CB] shadow-[0_4px_14px_rgba(47,128,237,0.3)] z-0"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Showcase Panel: Compact 2-Column Presentation */}
        <div
          ref={panelRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative transition-transform duration-300 ease-out"
          style={{
            transform: !isTouch && !prefersReducedMotion
              ? `perspective(1200px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`
              : 'none',
          }}
        >
          <div className="rounded-3xl glass-panel bg-white/80 dark:bg-[#0B1528]/85 border border-white/90 dark:border-cyan-500/20 shadow-[0_16px_40px_rgba(11,36,56,0.06)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] p-5 sm:p-7 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-center">

              {/* LEFT: Doctor Portrait with Soft Glow & Restrained Laser Scan */}
              <div className="md:col-span-5 relative">
                <div
                  onMouseEnter={() => setIsPortraitHovered(true)}
                  onMouseLeave={() => setIsPortraitHovered(false)}
                  className="relative aspect-[3/3.8] max-h-[380px] w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-white/60 dark:border-cyan-500/20 shadow-md group"
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentDoctor.id}
                      src={currentDoctor.image}
                      alt={currentDoctor.name}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="w-full h-full object-cover object-top"
                    />
                  </AnimatePresence>

                  {/* Top Availability Indicator Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 dark:bg-[#080B1A]/90 backdrop-blur-md border border-white/80 dark:border-gray-700 shadow-sm text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span>Appointments Available</span>
                    </div>
                  </div>

                  {/* Restrained On-Hover Laser Scan (Single fast subtle pass) */}
                  {isPortraitHovered && !prefersReducedMotion && (
                    <motion.div
                      initial={{ top: '-10%' }}
                      animate={{ top: '110%' }}
                      transition={{ duration: 0.75, ease: 'easeInOut' }}
                      className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_10px_#00F0FF] pointer-events-none z-20"
                    />
                  )}

                  {/* Subtle Gradient Vignette at Bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0B2438]/60 to-transparent pointer-events-none" />
                </div>
              </div>

              {/* RIGHT: Doctor Information Hierarchy */}
              <div className="md:col-span-7 flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentDoctor.id + (showDetails ? '-details' : '-main')}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -12 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className="flex flex-col text-left"
                  >
                    {!showDetails ? (
                      /* Main Doctor Profile View */
                      <>
                        {/* Specialty Pill & Experience */}
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider text-[#2F80ED] dark:text-cyan-300 bg-blue-50 dark:bg-cyan-950/40 border border-blue-100 dark:border-cyan-500/30">
                            {currentDoctor.specialty}
                          </span>
                          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                            {currentDoctor.experience}
                          </span>
                        </div>

                        {/* Doctor Name */}
                        <h3 className="text-xl sm:text-2xl font-black text-[#0B2438] dark:text-white tracking-tight leading-snug mb-1">
                          {currentDoctor.name}
                        </h3>

                        {/* Official Role */}
                        <p className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 mb-3">
                          {currentDoctor.role}
                        </p>

                        {/* Short Bio (Existing Project Data) */}
                        <p className="text-xs sm:text-sm text-[#4A6278] dark:text-gray-300 leading-relaxed line-clamp-2 sm:line-clamp-3 mb-4">
                          {currentDoctor.bio}
                        </p>

                        {/* Specialty Signature Visual & Rating Row */}
                        <div className="flex flex-wrap items-center justify-between gap-3 py-3 border-y border-gray-100 dark:border-gray-800 mb-5">
                          <SpecialtySignatureVisual doctorId={currentDoctor.id} />

                          <div className="flex items-center gap-1 text-xs font-semibold text-[#0B2438] dark:text-gray-200">
                            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                            <span>{currentDoctor.rating}</span>
                          </div>
                        </div>

                        {/* Consultation Fee & Actions */}
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div className="text-left">
                            <span className="text-[10px] font-mono text-gray-400 block uppercase">Consultation</span>
                            <span className="text-base font-bold text-[#0B2438] dark:text-white font-mono">{currentDoctor.consultFee}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setShowDetails(true)}
                              className="px-3.5 py-2 rounded-full text-xs font-bold text-[#2F80ED] dark:text-cyan-300 bg-blue-50 dark:bg-cyan-950/40 hover:bg-blue-100 dark:hover:bg-cyan-900/50 transition-colors"
                            >
                              View Details
                            </button>

                            <button
                              onClick={() => onOpenBooking(currentDoctor)}
                              className="px-5 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#2F80ED] to-[#00C2CB] hover:shadow-[0_6px_20px_rgba(47,128,237,0.35)] transition-all flex items-center gap-1.5"
                            >
                              <Calendar className="w-3.5 h-3.5" />
                              <span>Book Appointment</span>
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      /* Compact Details Panel (Education & Qualifications) */
                      <>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-bold text-[#2F80ED] dark:text-cyan-300 uppercase tracking-wider">
                            Clinical Credentials
                          </span>
                          <button
                            onClick={() => setShowDetails(false)}
                            className="text-xs font-bold text-gray-500 hover:text-[#0B2438] dark:hover:text-white underline underline-offset-2"
                          >
                            Back to Overview
                          </button>
                        </div>

                        <h4 className="text-lg font-extrabold text-[#0B2438] dark:text-white mb-2">
                          {currentDoctor.name}
                        </h4>

                        {/* Education / Qualifications */}
                        <div className="space-y-3 mb-4">
                          <div className="flex items-start gap-2 text-left">
                            <GraduationCap className="w-4 h-4 text-[#2F80ED] dark:text-cyan-400 mt-0.5 shrink-0" />
                            <div>
                              <span className="text-[10px] font-mono text-gray-400 uppercase block">Education & Fellowship</span>
                              <p className="text-xs font-semibold text-[#0B2438] dark:text-gray-200">
                                {currentDoctor.education}
                              </p>
                            </div>
                          </div>

                          {/* Expertise Tags */}
                          <div className="flex items-start gap-2 text-left">
                            <Award className="w-4 h-4 text-[#00C2CB] mt-0.5 shrink-0" />
                            <div>
                              <span className="text-[10px] font-mono text-gray-400 uppercase block mb-1">Key Focus Areas</span>
                              <div className="flex flex-wrap gap-1.5">
                                {currentDoctor.tags?.map((tag, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Direct Booking CTA */}
                        <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
                          <button
                            onClick={() => onViewProfile(currentDoctor)}
                            className="text-xs font-bold text-[#2F80ED] dark:text-cyan-400 hover:underline flex items-center gap-1"
                          >
                            Full Clinical Profile
                            <ArrowRight className="w-3 h-3" />
                          </button>

                          <button
                            onClick={() => onOpenBooking(currentDoctor)}
                            className="px-5 py-2 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#2F80ED] to-[#00C2CB] hover:shadow-[0_6px_20px_rgba(47,128,237,0.35)] transition-all flex items-center gap-1.5"
                          >
                            <Calendar className="w-3.5 h-3.5" />
                            <span>Book Appointment</span>
                          </button>
                        </div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>
        </div>

        {/* Doctor Switcher: Compact Row of Circular Avatars */}
        <div className="mt-6 flex items-center justify-center gap-3 sm:gap-4 flex-wrap" aria-label="Select Doctor">
          {DOCTORS_DATA.map((doctor) => {
            const isSelected = doctor.id === currentDoctor.id;
            const firstName = doctor.name.split(' ')[1] || doctor.name;

            return (
              <button
                key={doctor.id}
                onClick={() => {
                  setSelectedDoctorId(doctor.id);
                  setShowDetails(false);
                }}
                className={`group flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-200 border text-left ${
                  isSelected
                    ? 'bg-white dark:bg-[#0E2236] border-[#2F80ED] dark:border-cyan-400 shadow-[0_4px_14px_rgba(47,128,237,0.25)]'
                    : 'bg-white/60 dark:bg-white/5 border-gray-200/70 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                }`}
                aria-pressed={isSelected}
              >
                <div className={`relative w-8 h-8 rounded-full overflow-hidden shrink-0 border ${
                  isSelected ? 'border-[#2F80ED] dark:border-cyan-400 ring-2 ring-[#2F80ED]/20' : 'border-gray-200'
                }`}>
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover object-top"
                  />
                  {isSelected && (
                    <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#00C2CB] ring-1 ring-white" />
                  )}
                </div>

                <div className="flex flex-col">
                  <span className={`text-xs font-bold leading-tight ${
                    isSelected ? 'text-[#0B2438] dark:text-cyan-300' : 'text-gray-600 dark:text-gray-400 group-hover:text-[#0B2438] dark:group-hover:text-white'
                  }`}>
                    {firstName}
                  </span>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500 line-clamp-1">
                    {doctor.specialty.split(' ')[0]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}
