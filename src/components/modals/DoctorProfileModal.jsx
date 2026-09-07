import React from 'react';
import { X, Calendar, Star, Award, GraduationCap, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function DoctorProfileModal({ doctor, isOpen, onClose, onBookDoctor }) {
  if (!isOpen || !doctor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B2438]/50 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white/95 backdrop-blur-2xl border border-white shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-gray-500 hover:text-gray-800 flex items-center justify-center shadow-md transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          
          {/* Doctor Image & Quick Stats (5 Cols) */}
          <div className="md:col-span-5 bg-blue-50/50 p-6 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-blue-100/60">
            <div className="w-36 h-44 rounded-2xl overflow-hidden shadow-lg mb-4 border-2 border-white">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center gap-1 text-amber-500 mb-1">
              <Star className="w-4 h-4 fill-amber-400" />
              <span className="text-xs font-bold text-[#0B2438]">{doctor.rating}</span>
            </div>

            <span className="text-[11px] font-bold text-[#2F80ED] bg-blue-100/70 px-2.5 py-1 rounded-full uppercase tracking-wider mb-2">
              {doctor.experience}
            </span>

            <span className="text-xs font-medium text-[#4A6278]">
              Consultation: <strong className="text-[#0B2438]">{doctor.consultFee}</strong>
            </span>
          </div>

          {/* Doctor Details (7 Cols) */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-[#2F80ED] text-xs font-bold uppercase tracking-wider mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>{doctor.specialty}</span>
              </div>

              <h3 className="text-2xl font-extrabold text-[#0B2438] mb-1">
                {doctor.name}
              </h3>
              <p className="text-xs font-semibold text-[#4A6278] mb-4">
                {doctor.role}
              </p>

              <div className="mb-4">
                <h4 className="text-xs font-bold uppercase text-[#0B2438] tracking-wider mb-1 flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4 text-[#2F80ED]" />
                  Education & Credentials
                </h4>
                <p className="text-xs text-[#4A6278] leading-relaxed">
                  {doctor.education}
                </p>
              </div>

              <div className="mb-5">
                <h4 className="text-xs font-bold uppercase text-[#0B2438] tracking-wider mb-1 flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-[#2F80ED]" />
                  Clinical Focus
                </h4>
                <p className="text-xs text-[#4A6278] leading-relaxed mb-2">
                  {doctor.bio}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {doctor.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-semibold text-blue-800 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-4 border-t border-gray-100 flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-[#4A6278] hover:text-[#0B2438]"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  onBookDoctor(doctor);
                }}
                className="flex-1 py-3 px-4 rounded-full text-xs font-bold text-white bg-[#2F80ED] hover:bg-blue-600 shadow-md shadow-blue-500/25 flex items-center justify-center gap-2 transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Book with {doctor.name.split(',')[0]}</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
