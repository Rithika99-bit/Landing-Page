import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Trash2, CheckCircle2, ShieldCheck, ArrowRight, Download, Plus } from 'lucide-react';

/**
 * MyAppointmentsDrawer:
 * Slide-over drawer allowing patients to review, manage, and download
 * their confirmed appointments and clinical passes.
 */
export default function MyAppointmentsDrawer({
  isOpen,
  onClose,
  onBookNew,
  hospitalName = "AETHERIA HEALTH"
}) {
  const [appointments, setAppointments] = useState([]);

  const loadAppointments = () => {
    try {
      const stored = JSON.parse(localStorage.getItem('aetheria_appointments') || '[]');
      setAppointments(stored);
    } catch (e) {
      setAppointments([]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadAppointments();
    }
  }, [isOpen]);

  const handleCancelAppointment = (id) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      const updated = appointments.filter(a => a.id !== id);
      setAppointments(updated);
      localStorage.setItem('aetheria_appointments', JSON.stringify(updated));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#0B2438]/50 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Slide-in Panel */}
      <div className="relative w-full max-w-md h-full bg-white dark:bg-[#0E243A] shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300 border-l border-gray-100 dark:border-blue-900/60">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-gradient-to-r from-blue-50/60 via-white to-blue-50/40 dark:from-[#0E243A] dark:to-[#122B42]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#2F80ED] text-white flex items-center justify-center shadow-md shadow-blue-500/20">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-black text-[#0B2438] dark:text-white">
                My Appointments
              </h3>
              <span className="text-[11px] text-[#4A6278] dark:text-gray-400">
                {hospitalName} Patient Portal
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 text-gray-500 dark:text-gray-300 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Drawer Body List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {appointments.length === 0 ? (
            <div className="py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#2F80ED] flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 opacity-70" />
              </div>
              <h4 className="text-base font-bold text-[#0B2438] dark:text-white mb-1">
                No Scheduled Appointments
              </h4>
              <p className="text-xs text-[#4A6278] dark:text-gray-400 max-w-xs mx-auto mb-6">
                You haven't scheduled any consultations yet. Explore the 3D anatomical body to match with top specialists.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onBookNew();
                }}
                className="px-6 py-3 rounded-full text-xs font-black text-white bg-gradient-to-r from-[#2F80ED] to-[#00C2CB] shadow-lg shadow-blue-500/25 inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Book First Appointment</span>
              </button>
            </div>
          ) : (
            appointments.map((apt) => (
              <div
                key={apt.id}
                className="p-5 rounded-3xl bg-blue-50/50 dark:bg-[#122B42]/70 border border-blue-100/80 dark:border-blue-900/60 shadow-sm space-y-3 relative group"
              >
                {/* Status Bar */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-black text-[#2F80ED] tracking-wider">
                    {apt.id}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Confirmed
                  </span>
                </div>

                {/* Doctor & Specialty */}
                <div>
                  <h4 className="text-sm font-black text-[#0B2438] dark:text-white">
                    {apt.doctor?.name || "Department Specialist"}
                  </h4>
                  <span className="text-xs font-semibold text-[#2F80ED] block">
                    {apt.specialty} ({apt.regionName})
                  </span>
                </div>

                {/* Date & Time */}
                <div className="flex items-center gap-4 text-xs font-bold text-[#4A6278] dark:text-gray-300 pt-1 border-t border-blue-100 dark:border-gray-800">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#2F80ED]" />
                    <span>{apt.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#00C2CB]" />
                    <span>{apt.time}</span>
                  </div>
                </div>

                {/* Patient Name */}
                <div className="text-[11px] text-[#4A6278] dark:text-gray-400">
                  Patient: <span className="font-bold text-[#0B2438] dark:text-gray-200">{apt.patient?.name}</span>
                </div>

                {/* Cancel Action */}
                <div className="pt-2 flex items-center justify-between text-[11px]">
                  <button
                    onClick={() => alert(`Showing Pass ${apt.id} for ${apt.patient?.name}.`)}
                    className="text-blue-600 font-bold hover:underline flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    <span>Pass Info</span>
                  </button>

                  <button
                    onClick={() => handleCancelAppointment(apt.id)}
                    className="text-rose-500 hover:text-rose-700 font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>Cancel</span>
                  </button>
                </div>

              </div>
            ))
          )}
        </div>

        {/* Drawer Bottom CTA */}
        {appointments.length > 0 && (
          <div className="p-6 border-t border-gray-100 dark:border-gray-800 bg-gray-50/70 dark:bg-[#102438]">
            <button
              onClick={() => {
                onClose();
                onBookNew();
              }}
              className="w-full py-3.5 rounded-2xl text-xs font-black text-white bg-gradient-to-r from-[#2F80ED] to-[#1E6FD9] hover:opacity-95 shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Book Another Appointment</span>
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
