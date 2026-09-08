import React from 'react';
import { ArrowRight, Users, Clock, ShieldCheck, Sparkles, CheckCircle, Calendar } from 'lucide-react';

/**
 * FloatingSpecialtyCard:
 * High-end animated card displayed beside hovered or selected anatomical body regions.
 * Displays body area, specialization, doctors count, clinical summary, and direct Booking CTA.
 */
export default function FloatingSpecialtyCard({
  region,
  onStartBooking,
  onClose,
  className = "",
}) {
  if (!region) return null;

  return (
    <div
      className={`w-full max-w-sm sm:max-w-md p-6 rounded-3xl bg-white/95 dark:bg-[#0E243A]/95 backdrop-blur-2xl border border-white/90 dark:border-blue-800/80 shadow-[0_20px_60px_rgba(47,128,237,0.22)] animate-in fade-in zoom-in-95 duration-300 relative z-30 ${className}`}
    >
      {/* Top Header Badge & Close Button */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-full shadow-sm animate-pulse"
            style={{ backgroundColor: region.color }}
          />
          <span className="font-mono text-[11px] font-black uppercase tracking-widest text-[#2F80ED] dark:text-blue-400">
            {region.departmentCode} // AREA: {region.name}
          </span>
        </div>

        <span className="px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-200/60 dark:border-blue-800 text-[11px] font-bold text-[#2F80ED] dark:text-blue-300">
          {region.avgWaitTime} Wait
        </span>
      </div>

      {/* Specialty Title & Clinical Bio */}
      <h3 className="text-2xl sm:text-3xl font-black text-[#0B2438] dark:text-white tracking-tight leading-tight mb-2">
        {region.specialty}
      </h3>
      <p className="text-xs sm:text-sm text-[#4A6278] dark:text-gray-300 leading-relaxed mb-5">
        {region.description}
      </p>

      {/* Available Doctors & Fast Telemetry Row */}
      <div className="p-3.5 rounded-2xl bg-blue-50/60 dark:bg-[#122B42] border border-blue-100/70 dark:border-blue-900/40 mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex -space-x-2 overflow-hidden">
            {region.doctors.map((doc, idx) => (
              <img
                key={idx}
                src={doc.image}
                alt={doc.name}
                className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800 object-cover"
              />
            ))}
          </div>
          <div>
            <span className="text-xs font-black text-[#0B2438] dark:text-white block">
              {region.availableDoctorsCount} Certified Specialists
            </span>
            <span className="text-[10px] text-[#4A6278] dark:text-gray-400 font-semibold">
              Earliest: {region.doctors[0]?.nextSlot || "Today"}
            </span>
          </div>
        </div>

        <span className="text-xs font-mono font-bold text-[#2F80ED] dark:text-cyan-400">
          ★ {region.doctors[0]?.rating || "4.98"}
        </span>
      </div>

      {/* Common Symptoms / Concerns Tags */}
      <div className="mb-6 space-y-1.5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#4A6278] dark:text-gray-400 block">
          Frequent Clinical Concerns:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {region.commonConcerns.slice(0, 3).map((concern, idx) => (
            <span
              key={idx}
              className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-[#152F48] text-[#0B2438] dark:text-gray-200"
            >
              • {concern}
            </span>
          ))}
        </div>
      </div>

      {/* Primary Action Button */}
      <button
        onClick={() => onStartBooking(region)}
        className="w-full py-4 px-6 rounded-2xl text-sm font-extrabold text-white bg-gradient-to-r from-[#2F80ED] to-[#00C2CB] hover:opacity-95 shadow-[0_12px_32px_rgba(47,128,237,0.35)] hover:shadow-[0_16px_40px_rgba(47,128,237,0.48)] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
      >
        <Calendar className="w-4 h-4 transition-transform group-hover:scale-110" />
        <span>Book {region.specialty} Appointment</span>
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </button>

    </div>
  );
}
