import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { DOCTORS_DATA } from '../../data/hospitalData';
import { UserCheck, Star, ArrowRight, ShieldCheck, Sparkles, Calendar } from 'lucide-react';
import HospitalMarqueeBackground from '../ui/HospitalMarqueeBackground';

function DoctorCard({ doctor, index, onViewProfile, onQuickBook }) {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xPct = (x / rect.width) * 2 - 1;
    const yPct = (y / rect.height) * 2 - 1;

    setRotate({
      x: -yPct * 8,
      y: xPct * 8,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setRotate({ x: 0, y: 0 });
      }}
      className="perspective-1000 group"
    >
      <div
        className="rounded-3xl overflow-hidden glass-panel border border-white/90 relative transition-all duration-300 preserve-3d"
        style={{
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateZ(${isHovered ? 12 : 0}px)`,
          boxShadow: isHovered
            ? '0 25px 60px -15px rgba(47, 128, 237, 0.25), 0 0 0 1px rgba(47, 128, 237, 0.2)'
            : '0 16px 40px 0 rgba(11, 36, 56, 0.05)',
        }}
      >
        {/* Doctor Portrait Container with Zoom Effect */}
        <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
          <img
            src={doctor.image}
            alt={doctor.name}
            className={`w-full h-full object-cover object-top transition-transform duration-700 ease-out ${isHovered ? 'scale-108' : 'scale-100'
              }`}
          />

          {/* Top Specialty Tag Badge */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#0B2438] bg-white/90 backdrop-blur-md shadow-sm border border-white">
              {doctor.specialty}
            </span>
          </div>

          {/* Rating Badge */}
          <div className="absolute top-4 right-4 z-10 flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold text-[#0B2438] bg-white/90 backdrop-blur-md shadow-sm border border-white">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span>5.0</span>
          </div>

          {/* Soft Glass Gradient Overlay on Hover that rises up */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-[#0B2438]/90 via-[#0B2438]/40 to-transparent transition-opacity duration-300 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-60'
              }`}
          />

          {/* Doctor Information Sliding Upward on Hover */}
          <div
            className={`absolute bottom-0 inset-x-0 p-5 text-white transition-all duration-300 z-10 ${isHovered ? 'translate-y-0' : 'translate-y-3'
              }`}
          >
            <span className="text-[10px] font-semibold text-blue-300 uppercase tracking-wider block mb-1">
              {doctor.experience}
            </span>
            <h4 className="text-xl font-bold tracking-tight text-white mb-1 drop-shadow-sm">
              {doctor.name}
            </h4>
            <p className="text-xs text-white/80 line-clamp-1 mb-3">
              {doctor.role}
            </p>

            {/* Hidden Action Row that reveals on hover */}
            <div
              className={`flex items-center gap-2 pt-2 border-t border-white/20 transition-all duration-300 ${isHovered ? 'opacity-100 max-h-12' : 'opacity-0 max-h-0 overflow-hidden'
                }`}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onViewProfile(doctor);
                }}
                className="flex-1 py-2 px-3 rounded-full text-[11px] font-bold text-[#0B2438] bg-white hover:bg-blue-50 transition-colors flex items-center justify-center gap-1 shadow-md"
              >
                <span>View Profile</span>
                <ArrowRight className="w-3 h-3" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onQuickBook(doctor);
                }}
                className="p-2 rounded-full text-white bg-[#2F80ED] hover:bg-blue-600 transition-colors shadow-md"
                title="Book with this doctor"
              >
                <Calendar className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Card Footer Bar */}
        <div className="p-4 bg-white/95 border-t border-gray-100 flex items-center justify-between">
          <span className="text-[11px] font-semibold text-[#4A6278]">
            Verified Specialist
          </span>
          <button
            onClick={() => onViewProfile(doctor)}
            className="text-xs font-bold text-[#2F80ED] hover:text-blue-700 flex items-center gap-1"
          >
            Profile
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function DoctorsSection({ hospitalName, onViewProfile, onOpenBooking }) {
  return (
    <section id="doctors" className="relative py-24 lg:py-32 bg-[#F8FBFF] overflow-hidden">
      {/* Signature Hospital Name Background Marquee */}
      <HospitalMarqueeBackground hospitalName={hospitalName} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-xs font-bold text-[#2F80ED] uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>WORLD-CLASS FACULTY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B2438] tracking-tight mb-4">
            Meet Our Distinguished Medical Leaders
          </h2>
          <p className="text-base text-[#4A6278] leading-relaxed">
            World-renowned department chairs and pioneer researchers bringing academic precision and compassionate bedside care to every patient.
          </p>
        </div>

        {/* 4 Doctor Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
          {DOCTORS_DATA.map((doctor, index) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              index={index}
              onViewProfile={onViewProfile}
              onQuickBook={(doc) => onOpenBooking(doc)}
            />
          ))}
        </div>

        {/* Trust Bottom Notice */}
        <div className="p-4 sm:p-5 rounded-2xl glass-panel max-w-2xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#2F80ED] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#0B2438]">Over 120+ International Faculty Specialists</p>
              <p className="text-[11px] text-[#4A6278]">Need assistance selecting the right specialist for your condition?</p>
            </div>
          </div>
          <button
            onClick={() => onOpenBooking()}
            className="px-4 py-2 rounded-full text-xs font-bold text-[#2F80ED] bg-blue-50 hover:bg-blue-100 transition-colors whitespace-nowrap"
          >
            Find a Doctor
          </button>
        </div>

      </div>
    </section>
  );
}

