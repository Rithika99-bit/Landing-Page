import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MAJOR_SERVICES, DOCTORS_DATA } from '../../data/hospitalData';
import {
  Heart,
  Brain,
  Crosshair,
  Microscope,
  ArrowRight,
  Sparkles,
  Activity,
  Zap,
  ShieldCheck,
  Clock,
  CheckCircle2,
  X,
  Calendar,
  Layers,
  Cpu
} from 'lucide-react';
import HospitalMarqueeBackground from '../ui/HospitalMarqueeBackground';

const ICON_MAP = {

  Heart,
  Brain,
  Crosshair,
  Microscope,
};

const DEPARTMENT_THEMES = {
  cardio: {
    color: 'from-rose-500 to-blue-600',
    accent: '#FF3B5C',
    glow: 'rgba(255, 59, 92, 0.25)',
    borderGlow: 'rgba(255, 59, 92, 0.4)',
    bgGradient: 'from-rose-50/60 via-white to-blue-50/40',
    doctorRef: 'dr-marcus',
    metrics: [
      { label: "Survival Index", val: "99.4%" },
      { label: "Catheter Accuracy", val: "99.9%" },
      { label: "Aortic Recovery", val: "24h" }
    ],
    techStack: ["AI Hemodynamic Mapping", "Transcatheter Valve", "Robotic Angioplasty"]
  },
  neuro: {
    color: 'from-cyan-500 to-indigo-600',
    accent: '#00C2CB',
    glow: 'rgba(0, 194, 203, 0.25)',
    borderGlow: 'rgba(0, 194, 203, 0.4)',
    bgGradient: 'from-cyan-50/60 via-white to-indigo-50/40',
    doctorRef: 'dr-elena',
    metrics: [
      { label: "Surgical Margin", val: "Sub-mm" },
      { label: "Conduction Speed", val: "0.2ms" },
      { label: "Neural Plasticity", val: "94.8%" }
    ],
    techStack: ["Stereotactic Radiosurgery", "Micro-Craniotomy", "Neural Mapping"]
  },
  surgery: {
    color: 'from-emerald-500 to-blue-600',
    accent: '#10B981',
    glow: 'rgba(16, 185, 129, 0.25)',
    borderGlow: 'rgba(16, 185, 129, 0.4)',
    bgGradient: 'from-emerald-50/60 via-white to-blue-50/40',
    doctorRef: 'dr-elena',
    metrics: [
      { label: "Faster Recovery", val: "60%" },
      { label: "Blood Loss Reduction", val: "85%" },
      { label: "Same-Day Discharge", val: "92%" }
    ],
    techStack: ["Da Vinci Xi Quad-Arm", "Infrared Vessel Tracking", "Zero-Incision Laparoscopy"]
  },
  diagnostics: {
    color: 'from-purple-500 to-blue-600',
    accent: '#8B5CF6',
    glow: 'rgba(139, 92, 246, 0.25)',
    borderGlow: 'rgba(139, 92, 246, 0.4)',
    bgGradient: 'from-purple-50/60 via-white to-blue-50/40',
    doctorRef: 'dr-sarah',
    metrics: [
      { label: "Turnaround Window", val: "2-Hours" },
      { label: "MRI Resolution", val: "7-Tesla" },
      { label: "Biomarker Discovery", val: "99.8%" }
    ],
    techStack: ["Liquid Biopsy Multi-Cancer", "Photon-Counting CT", "7T Clinical MRI"]
  }
};

// Interactive 3D Visual Simulator inside each department card
function DepartmentVisualSimulator({ serviceId, isHovered }) {
  if (serviceId === 'cardio') {
    return (
      <div className="w-full h-20 rounded-2xl bg-gradient-to-r from-rose-500/10 via-blue-500/10 to-rose-500/5 p-3 flex items-center justify-between relative overflow-hidden border border-rose-200/50">
        <div className="flex items-center gap-2 z-10">
          <div className="w-8 h-8 rounded-xl bg-rose-500 text-white flex items-center justify-center shadow-md shadow-rose-500/30">
            <Heart className={`w-4 h-4 ${isHovered ? 'animate-ping' : 'animate-pulse'}`} />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 block">Hemodynamic Rhythm</span>
            <span className="text-xs font-mono font-extrabold text-[#0B2438]">72 BPM · Regular</span>
          </div>
        </div>
        {/* Animated ECG Wave */}
        <div className="w-24 h-8">
          <svg viewBox="0 0 120 30" className="w-full h-full text-rose-500 stroke-current" fill="none">
            <path
              d="M0 15 Q 15 15, 25 15 L 30 5 L 35 25 L 40 10 L 45 20 L 50 15 L 80 15 L 85 2 L 90 28 L 95 8 L 100 22 L 105 15 L 120 15"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={isHovered ? 'opacity-100' : 'opacity-80'}
            />
          </svg>
        </div>
      </div>
    );
  }

  if (serviceId === 'neuro') {
    return (
      <div className="w-full h-20 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-indigo-500/10 to-cyan-500/5 p-3 flex items-center justify-between relative overflow-hidden border border-cyan-200/50">
        <div className="flex items-center gap-2 z-10">
          <div className="w-8 h-8 rounded-xl bg-cyan-500 text-white flex items-center justify-center shadow-md shadow-cyan-500/30">
            <Brain className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-700 block">Neural Conduction</span>
            <span className="text-xs font-mono font-extrabold text-[#0B2438]">0.2 ms · 40Hz Gamma</span>
          </div>
        </div>
        {/* Synaptic nodes */}
        <div className="flex items-center gap-1.5 z-10">
          <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" />
        </div>
      </div>
    );
  }

  if (serviceId === 'surgery') {
    return (
      <div className="w-full h-20 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-blue-500/10 to-emerald-500/5 p-3 flex items-center justify-between relative overflow-hidden border border-emerald-200/50">
        <div className="flex items-center gap-2 z-10">
          <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/30">
            <Crosshair className={`w-4 h-4 ${isHovered ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">Da Vinci Xi Alignment</span>
            <span className="text-xs font-mono font-extrabold text-[#0B2438]">±0.08 mm Sub-mm</span>
          </div>
        </div>
        <div className="text-right z-10">
          <span className="text-[9px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
            Active Arms: 4/4
          </span>
        </div>
      </div>
    );
  }

  // Diagnostics
  return (
    <div className="w-full h-20 rounded-2xl bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-purple-500/5 p-3 flex items-center justify-between relative overflow-hidden border border-purple-200/50">
      <div className="flex items-center gap-2 z-10">
        <div className="w-8 h-8 rounded-xl bg-purple-500 text-white flex items-center justify-center shadow-md shadow-purple-500/30">
          <Microscope className="w-4 h-4 animate-bounce" style={{ animationDuration: '2.5s' }} />
        </div>
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 block">7T Molecular Scan</span>
          <span className="text-xs font-mono font-extrabold text-[#0B2438]">2-Hr Assay · Zero Invasive</span>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <span className="text-[9px] font-bold text-purple-800 bg-purple-100 px-2 py-0.5 rounded-full">
          Liquid Biopsy
        </span>
      </div>
    </div>
  );
}

function FuturisticServiceCard({ service, index, onOpenDetails }) {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const theme = DEPARTMENT_THEMES[service.id] || DEPARTMENT_THEMES.cardio;
  const IconComponent = ICON_MAP[service.icon] || Heart;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPct = (x / rect.width) * 2 - 1;
    const yPct = (y / rect.height) * 2 - 1;

    setRotate({
      x: -yPct * 10,
      y: xPct * 10,
    });

    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.5,
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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpenDetails(service)}
      className="perspective-1000 cursor-pointer group select-none relative"
      style={{ minHeight: '440px' }}
    >
      <div
        className="w-full h-full rounded-[2.25rem] p-7 transition-all duration-300 preserve-3d flex flex-col justify-between relative overflow-hidden border"
        style={{
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateZ(${isHovered ? 14 : 0
            }px)`,
          background: isHovered
            ? `linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(240, 248, 255, 0.92) 100%)`
            : 'rgba(255, 255, 255, 0.75)',
          boxShadow: isHovered
            ? `0 30px 60px -15px ${theme.glow}, 0 0 0 1.5px ${theme.borderGlow}`
            : '0 16px 40px 0 rgba(11, 36, 56, 0.05), 0 0 0 1px rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        {/* Specular Glare Reflection Layer */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300 rounded-[2.25rem]"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(circle 220px at ${glare.x}% ${glare.y}%, rgba(255, 255, 255, 0.75) 0%, transparent 80%)`,
          }}
        />

        {/* Ambient Corner Aura */}
        <div
          className={`absolute -top-16 -right-16 w-36 h-36 rounded-full bg-gradient-to-br ${theme.color} blur-2xl transition-all duration-500 ${isHovered ? 'opacity-40 scale-125' : 'opacity-15 scale-100'
            }`}
        />

        {/* Laser Scan Line on Hover */}
        {isHovered && (
          <div className="pointer-events-none absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#2F80ED] to-transparent animate-scan-line shadow-[0_0_10px_#2F80ED]" />
        )}

        {/* Top Header Row with translateZ(35px) */}
        <div
          className="flex items-start justify-between relative z-10 mb-4"
          style={{ transform: 'translateZ(35px)' }}
        >
          {/* Floating Department Icon */}
          <div
            className={`w-13 h-13 p-3.5 rounded-2xl flex items-center justify-center transition-all duration-300 ${isHovered
                ? `bg-gradient-to-tr ${theme.color} text-white shadow-lg scale-110 rotate-3`
                : 'bg-blue-50/90 text-[#2F80ED] shadow-sm'
              }`}
          >
            <IconComponent className="w-6 h-6" />
          </div>

          {/* Benchmark Pill Tag */}
          <span
            className="text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm border border-blue-200/50 bg-white/90 text-[#2F80ED]"
          >
            {service.stat}
          </span>
        </div>

        {/* Interactive 3D Visual Simulator Widget */}
        <div
          className="mb-4 relative z-10 transition-transform duration-300"
          style={{ transform: 'translateZ(30px)' }}
        >
          <DepartmentVisualSimulator serviceId={service.id} isHovered={isHovered} />
        </div>

        {/* Typography Content with translateZ(24px) */}
        <div
          className="my-2 relative z-10 flex-1 flex flex-col justify-center"
          style={{ transform: 'translateZ(24px)' }}
        >
          <span className="text-[10px] font-bold text-[#4A6278] uppercase tracking-wider block mb-1">
            {service.category}
          </span>
          <h4 className="text-xl sm:text-2xl font-black text-[#0B2438] mb-2 tracking-tight group-hover:text-[#2F80ED] transition-colors">
            {service.title}
          </h4>
          <p className="text-xs text-[#4A6278] leading-relaxed line-clamp-2 mb-3 font-normal">
            {service.description}
          </p>

          {/* Technology Badges */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {theme.techStack.slice(0, 2).map((tech, i) => (
              <span
                key={i}
                className="text-[9px] font-semibold text-[#0B2438]/80 bg-gray-100/90 px-2 py-0.5 rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Explore Action with translateZ(35px) */}
        <div
          className="pt-4 border-t border-gray-100/80 flex items-center justify-between relative z-10 mt-2"
          style={{ transform: 'translateZ(35px)' }}
        >
          <span className="text-[11px] font-bold text-[#4A6278] tracking-wider uppercase">
            Clinical Console
          </span>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#2F80ED] group-hover:translate-x-1 transition-transform">
            <span>Explore Department</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

      </div>
    </motion.div>
  );
}

export default function MajorServicesSection({ onOpenBooking }) {
  const [selectedService, setSelectedService] = useState(null);
  const [activeCategory, setActiveCategory] = useState('ALL');

  const categories = ['ALL', 'HEART & VASCULAR', 'BRAIN & SPINE', 'SURGICAL SUITES', 'CLINICAL ANALYTICS'];

  const filteredServices = activeCategory === 'ALL'
    ? MAJOR_SERVICES
    : MAJOR_SERVICES.filter(s => s.category.toUpperCase() === activeCategory);

  const selectedTheme = selectedService ? (DEPARTMENT_THEMES[selectedService.id] || DEPARTMENT_THEMES.cardio) : null;
  const leadDoctor = selectedService ? DOCTORS_DATA.find(d => d.id === selectedTheme.doctorRef) || DOCTORS_DATA[0] : null;

  return (
    <section id="major-services" className="py-24 lg:py-32 bg-[#F8FBFF] relative overflow-hidden">
      {/* Background Text Scroller */}
      <HospitalMarqueeBackground reverse={true} />

      {/* Subtle Background Glows */}

      <div className="pointer-events-none absolute -top-40 right-1/4 w-[600px] h-[600px] bg-gradient-to-b from-blue-400/5 via-cyan-400/5 to-transparent rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header with Title & Subtext */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-bold text-[#2F80ED] uppercase tracking-wider mb-3 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#2F80ED]" />
              <span>SPECIALIZED CLINICAL HUBS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B2438] tracking-tight">
              Major Clinical Services
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#4A6278] max-w-md leading-relaxed">
            Proprietary sub-specialty centers equipped with real-time AI telemetry, 7-Tesla diagnostic imaging, and robotic surgical suites.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 border ${activeCategory === cat
                  ? 'bg-[#2F80ED] text-white border-[#2F80ED] shadow-md shadow-blue-500/20 scale-[1.02]'
                  : 'bg-white text-[#4A6278] border-gray-200 hover:border-blue-300 hover:text-[#0B2438]'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 4 Interactive 3D Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
          {filteredServices.map((service, index) => (
            <FuturisticServiceCard
              key={service.id}
              service={service}
              index={index}
              onOpenDetails={(s) => setSelectedService(s)}
            />
          ))}
        </div>

        {/* Interactive 3D Department Inspection Console Dialog */}
        <AnimatePresence>
          {selectedService && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B2438]/50 backdrop-blur-md animate-in fade-in duration-200">
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                className="relative w-full max-w-2xl rounded-[2.5rem] bg-white/95 backdrop-blur-2xl border border-white shadow-2xl overflow-hidden"
              >
                {/* Header Strip with Thematic Gradient */}
                <div className={`p-7 bg-gradient-to-r ${selectedTheme.bgGradient} border-b border-gray-100 flex items-start justify-between relative`}>
                  <div>
                    <div className="flex items-center gap-2.5 mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#2F80ED] bg-white px-2.5 py-1 rounded-full shadow-sm border border-blue-100">
                        {selectedService.category}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {selectedService.stat}
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B2438]">
                      {selectedService.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => setSelectedService(null)}
                    className="w-9 h-9 rounded-full bg-white/90 hover:bg-white text-gray-500 hover:text-gray-800 flex items-center justify-center shadow-md transition-colors font-bold"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-7 sm:p-8 space-y-6">
                  {/* Visual Simulator in Modal */}
                  <DepartmentVisualSimulator serviceId={selectedService.id} isHovered={true} />

                  <p className="text-sm text-[#4A6278] leading-relaxed font-normal">
                    {selectedService.description} Every case is managed under rigorous peer-reviewed clinical pathways with direct multidisciplinary board oversight.
                  </p>

                  {/* 3 Metric Pillars */}
                  <div className="grid grid-cols-3 gap-3">
                    {selectedTheme.metrics.map((m, idx) => (
                      <div key={idx} className="p-3.5 rounded-2xl bg-gray-50 border border-gray-100 text-center">
                        <span className="text-lg font-black text-[#2F80ED] font-mono block">
                          {m.val}
                        </span>
                        <span className="text-[10px] font-bold text-[#4A6278] uppercase">
                          {m.label}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Lead Specialist Row */}
                  {leadDoctor && (
                    <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={leadDoctor.image}
                          alt={leadDoctor.name}
                          className="w-12 h-12 rounded-xl object-cover border-2 border-white shadow-sm"
                        />
                        <div>
                          <span className="text-[10px] font-bold text-[#2F80ED] uppercase tracking-wider block">
                            Department Chair
                          </span>
                          <h5 className="text-sm font-bold text-[#0B2438]">
                            {leadDoctor.name}
                          </h5>
                          <p className="text-[11px] text-[#4A6278]">
                            {leadDoctor.role}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-[#2F80ED]">
                        Available Today
                      </span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => setSelectedService(null)}
                      className="px-5 py-2.5 text-xs font-bold text-[#4A6278] hover:text-[#0B2438]"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => {
                        setSelectedService(null);
                        onOpenBooking();
                      }}
                      className="px-7 py-3 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#2F80ED] to-[#1E6FD9] hover:shadow-lg hover:shadow-blue-500/25 transition-all flex items-center gap-2"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Book Consultation in {selectedService.title.split('&')[0]}</span>
                    </button>
                  </div>

                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}

