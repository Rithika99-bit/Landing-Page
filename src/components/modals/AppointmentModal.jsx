import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Phone, Mail, CheckCircle2, ShieldCheck, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { DOCTORS_DATA, MAJOR_SERVICES } from '../../data/hospitalData';

export default function AppointmentModal({ isOpen, onClose, preselectedDoctor, hospitalName }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    department: 'Precision Cardiology',
    doctorId: DOCTORS_DATA[0]?.id || '',
    date: '2026-09-10',
    timeSlot: '10:30 AM',
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    notes: '',
  });
  const [appointmentId, setAppointmentId] = useState('');

  useEffect(() => {
    if (preselectedDoctor) {
      setFormData((prev) => ({
        ...prev,
        doctorId: preselectedDoctor.id,
        department: preselectedDoctor.specialty,
      }));
    }
  }, [preselectedDoctor]);

  if (!isOpen) return null;

  const selectedDocObj = DOCTORS_DATA.find((d) => d.id === formData.doctorId) || DOCTORS_DATA[0];

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      // Validate inputs
      if (!formData.patientName || !formData.patientEmail) {
        alert('Please provide your name and email to proceed.');
        return;
      }
      const randomPassId = `ATH-${Math.floor(100000 + Math.random() * 900000)}`;
      setAppointmentId(randomPassId);
      setStep(3);
    }
  };

  const handleReset = () => {
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B2438]/50 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl rounded-3xl bg-white/95 backdrop-blur-2xl border border-white shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Modal Top Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-blue-50/50 to-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#2F80ED] text-white flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-[#0B2438]">
                Book an Appointment
              </h3>
              <p className="text-[11px] text-[#4A6278]">
                {hospitalName} · Instant Confirmation
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 font-bold transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Indicator */}
        {step < 3 && (
          <div className="px-6 pt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                  step === 1 ? 'bg-[#2F80ED] text-white' : 'bg-emerald-100 text-emerald-700'
                }`}
              >
                1
              </span>
              <span className="text-xs font-semibold text-[#0B2438]">Specialist & Time</span>
            </div>
            <div className="w-12 h-0.5 bg-gray-200" />
            <div className="flex items-center gap-2">
              <span
                className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                  step === 2 ? 'bg-[#2F80ED] text-white' : 'bg-gray-100 text-gray-400'
                }`}
              >
                2
              </span>
              <span className="text-xs font-semibold text-[#4A6278]">Patient Details</span>
            </div>
          </div>
        )}

        {/* Modal Form Body */}
        <div className="p-6">
          {step === 1 && (
            <form onSubmit={handleNext} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A6278] mb-1.5">
                  Select Department
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-sm font-semibold text-[#0B2438] focus:outline-none focus:ring-2 focus:ring-[#2F80ED]"
                >
                  <option value="Precision Cardiology">Precision Cardiology</option>
                  <option value="Advanced Neurosciences">Advanced Neurosciences</option>
                  <option value="Pediatric & Genomic Care">Pediatric & Genomic Care</option>
                  <option value="Holistic & Preventative Health">Holistic & Preventative Health</option>
                  <option value="Robotic Surgery">Robotic Surgery</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A6278] mb-1.5">
                  Assigned Specialist
                </label>
                <select
                  value={formData.doctorId}
                  onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-sm font-semibold text-[#0B2438] focus:outline-none focus:ring-2 focus:ring-[#2F80ED]"
                >
                  {DOCTORS_DATA.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.name} — {doc.specialty}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A6278] mb-1.5">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-sm font-semibold text-[#0B2438] focus:outline-none focus:ring-2 focus:ring-[#2F80ED]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A6278] mb-1.5">
                    Time Slot
                  </label>
                  <select
                    value={formData.timeSlot}
                    onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-sm font-semibold text-[#0B2438] focus:outline-none focus:ring-2 focus:ring-[#2F80ED]"
                  >
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:30 AM">10:30 AM (Recommended)</option>
                    <option value="01:15 PM">01:15 PM</option>
                    <option value="03:45 PM">03:45 PM</option>
                    <option value="05:30 PM">05:30 PM</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full text-xs font-bold text-white bg-[#2F80ED] hover:bg-blue-600 transition-colors shadow-md shadow-blue-500/25 flex items-center gap-2"
                >
                  <span>Continue to Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleNext} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A6278] mb-1.5">
                  Patient Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Connor"
                  value={formData.patientName}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                  className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-sm font-semibold text-[#0B2438] focus:outline-none focus:ring-2 focus:ring-[#2F80ED]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A6278] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@domain.com"
                    value={formData.patientEmail}
                    onChange={(e) => setFormData({ ...formData, patientEmail: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-sm font-semibold text-[#0B2438] focus:outline-none focus:ring-2 focus:ring-[#2F80ED]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A6278] mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.patientPhone}
                    onChange={(e) => setFormData({ ...formData, patientPhone: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-sm font-semibold text-[#0B2438] focus:outline-none focus:ring-2 focus:ring-[#2F80ED]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A6278] mb-1.5">
                  Symptoms or Health Objectives (Optional)
                </label>
                <textarea
                  rows="2"
                  placeholder="Brief summary of symptoms or previous medical history..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 text-sm font-medium text-[#0B2438] focus:outline-none focus:ring-2 focus:ring-[#2F80ED]"
                />
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs font-bold text-[#4A6278] hover:text-[#0B2438] flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back
                </button>
                <button
                  type="submit"
                  className="px-7 py-3 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#2F80ED] to-[#1E6FD9] hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Priority Booking</span>
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="text-center py-4 space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/15 border-2 border-emerald-100">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#2F80ED] bg-blue-50 px-3 py-1 rounded-full">
                  APPOINTMENT RESERVED
                </span>
                <h4 className="text-2xl font-extrabold text-[#0B2438] mt-2 mb-1">
                  You're Confirmed, {formData.patientName}!
                </h4>
                <p className="text-xs text-[#4A6278]">
                  A confirmation packet with encrypted arrival directions has been dispatched to{' '}
                  <strong className="text-[#0B2438]">{formData.patientEmail}</strong>.
                </p>
              </div>

              {/* Digital Pass Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50/80 to-white border border-blue-200/60 shadow-sm text-left max-w-md mx-auto">
                <div className="flex items-center justify-between pb-3 border-b border-blue-100 mb-3">
                  <div>
                    <span className="text-[9px] font-bold uppercase text-[#4A6278] tracking-wider block">
                      Booking Reference
                    </span>
                    <span className="font-mono text-base font-extrabold text-[#2F80ED]">
                      {appointmentId}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] font-bold uppercase text-[#4A6278] tracking-wider block">
                      Status
                    </span>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      Confirmed
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-[#0B2438]">
                  <div className="flex justify-between">
                    <span className="text-[#4A6278]">Specialist:</span>
                    <strong>{selectedDocObj.name}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#4A6278]">Department:</span>
                    <span>{formData.department}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#4A6278]">Date & Time:</span>
                    <strong>{formData.date} at {formData.timeSlot}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#4A6278]">Location:</span>
                    <span>Valence Pavilion, Suite 500</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 rounded-full text-xs font-bold text-[#0B2438] bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
