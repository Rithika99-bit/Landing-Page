import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  ArrowLeft,
  Video,
  Building2
} from 'lucide-react';
import { DOCTORS_DATA } from '../../data/hospitalData';
import { audioManager } from '../../utils/audioManager';
import { createPortal } from 'react-dom';
import { useModalScrollLock } from '../../hooks/useModalScrollLock';
import AppointmentModalCanvas from '../3d/AppointmentModalCanvas';

const SPECIALITY_FACULTIES = [
  {
    id: 'cardiology',
    title: 'CARDIOLOGY & CARDIAC SCIENCES',
    doctorRole: 'Heart doctors treating chest pain, blood pressure, irregular rhythm & heart health.',
    departmentKey: 'Precision Cardiology'
  },
  {
    id: 'neurology',
    title: 'NEUROLOGY & NEUROSURGERY',
    doctorRole: 'Brain & spine specialists treating headaches, stroke, nerve issues & spinal disorders.',
    departmentKey: 'Advanced Neurosciences'
  },
  {
    id: 'orthopaedics',
    title: 'ORTHOPAEDICS & JOINT RECONSTRUCTION',
    doctorRole: 'Bone & joint doctors treating fractures, arthritis, back/knee pain & sports injuries.',
    departmentKey: 'Orthopaedics & Joint Surgery'
  },
  {
    id: 'oncology',
    title: 'COMPREHENSIVE ONCOLOGY CENTRE',
    doctorRole: 'Cancer doctors providing tumor diagnosis, chemotherapy & compassionate healing care.',
    departmentKey: 'Comprehensive Oncology'
  },
  {
    id: 'gastroenterology',
    title: 'GASTROENTEROLOGY & HEPATOLOGY',
    doctorRole: 'Stomach & liver doctors treating acid reflux, digestion problems & gut wellness.',
    departmentKey: 'Gastroenterology & Liver'
  },
  {
    id: 'obstetrics',
    title: 'OBSTETRICS & GYNAECOLOGY',
    doctorRole: 'Women’s health doctors caring for pregnancy, delivery, periods & female wellness.',
    departmentKey: 'Obstetrics & Gynaecology'
  },
  {
    id: 'paediatrics',
    title: 'PAEDIATRICS & NEONATAL CARE',
    doctorRole: 'Child & newborn specialists caring for infant health, vaccines, growth & illnesses.',
    departmentKey: 'Pediatric & Genomic Care'
  },
  {
    id: 'emergency',
    title: 'EMERGENCY & LEVEL 1 TRAUMA CARE',
    doctorRole: '24/7 emergency doctors providing immediate life-saving care for acute pain & accidents.',
    departmentKey: 'Emergency & Trauma Care'
  }
];

export default function AppointmentModal({ isOpen, onClose, preselectedDoctor, hospitalName }) {
  const [step, setStep] = useState(1);
  const [selectedFacultyId, setSelectedFacultyId] = useState('cardiology');
  const [consultType, setConsultType] = useState('in-person'); // 'in-person' | 'video'

  const [formData, setFormData] = useState({
    department: 'CARDIOLOGY & CARDIAC SCIENCES',
    doctorId: DOCTORS_DATA[0]?.id || '',
    date: '2026-09-12',
    timeSlot: '10:30 AM',
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    notes: '',
  });

  const [appointmentId, setAppointmentId] = useState('');

  useEffect(() => {
    if (preselectedDoctor) {
      const match = SPECIALITY_FACULTIES.find(
        (f) => f.departmentKey.toLowerCase().includes(preselectedDoctor.specialty?.toLowerCase() || '')
      );
      if (match) {
        setSelectedFacultyId(match.id);
        setFormData((prev) => ({
          ...prev,
          department: match.title,
          doctorId: preselectedDoctor.id,
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          doctorId: preselectedDoctor.id,
          department: preselectedDoctor.specialty,
        }));
      }
    }
  }, [preselectedDoctor]);

  const handleNext = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    try {
      if (step === 1) {
        try { audioManager.playHeartbeat(0.1); } catch {}
        setStep(2);
      } else if (step === 2) {
        try { audioManager.playHeartbeat(0.1); } catch {}
        setStep(3);
      } else if (step === 3) {
        try { audioManager.playHeartbeat(0.1); } catch {}
        setStep(4);
      } else if (step === 4) {
        if (!formData.patientName?.trim() || !formData.patientEmail?.trim()) {
          alert('Please provide your name and email to proceed.');
          return;
        }
        const randomPassId = `ATH-${Math.floor(100000 + Math.random() * 900000)}`;
        setAppointmentId(randomPassId);
        try { audioManager.playConfirmation(0.12); } catch {}
        setStep(5);
      }
    } catch (err) {
      console.error('Error in handleNext:', err);
      setStep((prev) => Math.min(5, prev + 1));
    }
  };

  const handleBack = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const handleReset = () => {
    setStep(1);
    onClose();
  };

  useModalScrollLock(isOpen, handleReset);

  if (!isOpen) return null;

  const selectedDocObj = DOCTORS_DATA.find((d) => d.id === formData.doctorId) || DOCTORS_DATA[0];

  const modalContent = (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-4 bg-[#081524]/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleReset();
      }}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl sm:rounded-3xl bg-[#081322]/95 text-white shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(0,240,255,0.2)] border border-cyan-500/30 overflow-hidden animate-in zoom-in-95 duration-200"
        data-lenis-prevent
      >
        {/* 3D Medical Particle Glow Canvas Backdrop (User Requested Custom Texture Glow & DNA Canvas) */}
        <AppointmentModalCanvas />

        {/* Modal Top Header (Sticky) */}
        <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-cyan-500/20 shrink-0 sticky top-0 z-20 bg-[#081322]/90 backdrop-blur-xl">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono font-bold text-cyan-400 tracking-wider uppercase block mb-1">
                STEP 0{step} OF 05
              </span>
              <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight uppercase">
                {step === 1 && 'SELECT SPECIALITY FACULTY'}
                {step === 2 && 'SELECT SPECIALIST DOCTOR'}
                {step === 3 && 'SELECT DATE & TIME SLOT'}
                {step === 4 && 'PATIENT INFORMATION'}
                {step === 5 && 'APPOINTMENT CONFIRMED'}
              </h3>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="hidden sm:inline-block text-xs font-mono font-bold tracking-widest text-cyan-300/80 uppercase">
                SMART SCHEDULER
              </span>
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-red-500/20 text-gray-300 hover:text-white transition-colors border border-white/10 text-xs font-bold cursor-pointer group"
                aria-label="Close scheduler"
                title="Close (Esc)"
              >
                <span className="hidden sm:inline">Close</span>
                <X className="w-4 h-4 group-hover:rotate-90 transition-transform" />
              </button>
            </div>
          </div>

          {/* 5-Step Indicator Bars (Clickable Step Navigation) */}
          <div className="grid grid-cols-5 gap-2 mt-4">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStep(s)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer outline-none ${
                  s <= step ? 'bg-gradient-to-r from-[#00F0FF] to-[#2F80ED] shadow-[0_0_10px_#00F0FF]' : 'bg-gray-800 hover:bg-gray-700'
                }`}
                title={`Go to Step 0${s}`}
              />
            ))}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 overscroll-contain relative z-10" data-lenis-prevent>

          {/* STEP 1: Select Speciality Faculty */}
          {step === 1 && (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 mb-6 max-h-[56vh] overflow-y-auto pr-1">
                {SPECIALITY_FACULTIES.map((fac) => {
                  const isSelected = selectedFacultyId === fac.id;
                  return (
                    <button
                      key={fac.id}
                      type="button"
                      onClick={() => {
                        setSelectedFacultyId(fac.id);
                        setFormData((prev) => ({ ...prev, department: fac.title }));
                      }}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 relative flex items-center justify-between gap-3 cursor-pointer outline-none backdrop-blur-md ${
                        isSelected
                          ? 'bg-[#0B2438] text-white border-cyan-400 shadow-[0_0_20px_rgba(0,240,255,0.25)]'
                          : 'bg-white/90 dark:bg-[#0E1B2E]/80 hover:bg-white dark:hover:bg-[#13253F] border-gray-200/90 dark:border-cyan-500/20 text-[#0B2438] dark:text-white hover:border-cyan-400 hover:shadow-sm'
                      }`}
                    >
                      <div className="space-y-1 pr-2">
                        <h4
                          className={`text-xs sm:text-sm font-extrabold tracking-tight uppercase ${
                            isSelected ? 'text-white' : 'text-[#0B2438] dark:text-white'
                          }`}
                        >
                          {fac.title}
                        </h4>
                        <p
                          className={`text-[11px] sm:text-xs leading-relaxed ${
                            isSelected ? 'text-cyan-200 font-medium' : 'text-[#5A7184] dark:text-gray-300'
                          }`}
                        >
                          {fac.doctorRole}
                        </p>
                      </div>

                      {isSelected && (
                        <div className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full border border-emerald-400 bg-emerald-500/10">
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 sm:px-7 py-3 rounded-lg text-xs font-bold text-[#081322] bg-gradient-to-r from-[#00F0FF] to-[#2F80ED] hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] flex items-center gap-2 uppercase tracking-wider cursor-pointer font-mono relative z-30"
                >
                  <span>CONTINUE TO STEP 02</span>
                  <span className="font-bold">&gt;</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Doctor Selection & Consultation Mode */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A6278] mb-2">
                  Choose Consultation Format
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setConsultType('in-person')}
                    className={`p-3.5 rounded-xl border flex items-center gap-3 transition-all cursor-pointer ${
                      consultType === 'in-person'
                        ? 'bg-[#0B2438] text-white border-[#0B2438] shadow-sm'
                        : 'bg-white border-gray-200 text-[#0B2438] hover:border-blue-300'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-emerald-400" />
                    <div className="text-left">
                      <div className="text-xs font-bold">Hospital Clinic Visit</div>
                      <div className={`text-[10px] ${consultType === 'in-person' ? 'text-gray-300' : 'text-gray-500'}`}>
                        In-person private clinical suite
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setConsultType('video')}
                    className={`p-3.5 rounded-xl border flex items-center gap-3 transition-all cursor-pointer ${
                      consultType === 'video'
                        ? 'bg-[#0B2438] text-white border-[#0B2438] shadow-sm'
                        : 'bg-white border-gray-200 text-[#0B2438] hover:border-blue-300'
                    }`}
                  >
                    <Video className="w-4 h-4 text-cyan-400" />
                    <div className="text-left">
                      <div className="text-xs font-bold">Encrypted Telehealth</div>
                      <div className={`text-[10px] ${consultType === 'video' ? 'text-gray-300' : 'text-gray-500'}`}>
                        HD Video consultation from home
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A6278] mb-2">
                  Select Attending Physician
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[38vh] overflow-y-auto pr-1">
                  {DOCTORS_DATA.map((doc) => {
                    const isDocSelected = formData.doctorId === doc.id;
                    return (
                      <button
                        key={doc.id}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, doctorId: doc.id }))}
                        className={`p-3.5 rounded-xl border text-left flex items-center gap-3.5 transition-all cursor-pointer ${
                          isDocSelected
                            ? 'bg-[#0B2438] text-white border-[#0B2438] shadow-md'
                            : 'bg-white border-gray-200 text-[#0B2438] hover:border-[#2F80ED] hover:bg-blue-50/20'
                        }`}
                      >
                        <div className="w-11 h-11 rounded-full bg-blue-100 flex items-center justify-center shrink-0 text-[#2F80ED] font-bold text-sm">
                          {doc.name.split(' ')[1]?.[0] || 'D'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`text-xs font-bold truncate ${isDocSelected ? 'text-white' : 'text-[#0B2438]'}`}>
                            {doc.name}
                          </div>
                          <div className={`text-[10px] truncate ${isDocSelected ? 'text-cyan-300' : 'text-[#2F80ED]'}`}>
                            {doc.role}
                          </div>
                          <div className={`text-[10px] ${isDocSelected ? 'text-gray-300' : 'text-gray-500'}`}>
                            {doc.experience} · {doc.consultFee}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2 text-xs font-bold text-[#4A6278] hover:text-[#0B2438] flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-3 rounded-lg text-xs font-bold text-white bg-[#0B2438] hover:bg-black transition-all shadow-md flex items-center gap-2 uppercase tracking-wider cursor-pointer"
                >
                  <span>CONTINUE TO STEP 03</span>
                  <span className="font-bold">&gt;</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Date & Time Slot */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A6278] mb-2">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-semibold text-[#0B2438] focus:outline-none focus:ring-2 focus:ring-[#2F80ED]"
                  />
                  <p className="text-[11px] text-gray-500 mt-1.5">
                    Same-day and next-day clinical slots available.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A6278] mb-2">
                    Time Slot
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {['09:00 AM', '10:30 AM', '01:15 PM', '03:45 PM', '05:30 PM', '07:00 PM'].map((slot) => {
                      const isSlotSelected = formData.timeSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setFormData({ ...formData, timeSlot: slot })}
                          className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                            isSlotSelected
                              ? 'bg-[#0B2438] text-white border-[#0B2438]'
                              : 'bg-gray-50 text-[#0B2438] border-gray-200 hover:border-blue-300'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-100 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-[#0B2438]">Selected Appointment:</span>{' '}
                  <span className="text-[#2F80ED]">{formData.department}</span>
                </div>
                <div className="text-[#4A6278] font-semibold">
                  {formData.date} at {formData.timeSlot}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2 text-xs font-bold text-[#4A6278] hover:text-[#0B2438] flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-3 rounded-lg text-xs font-bold text-white bg-[#0B2438] hover:bg-black transition-all shadow-md flex items-center gap-2 uppercase tracking-wider cursor-pointer"
                >
                  <span>CONTINUE TO STEP 04</span>
                  <span className="font-bold">&gt;</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Patient Information */}
          {step === 4 && (
            <form onSubmit={handleNext} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A6278] mb-1.5">
                  Patient Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.patientName}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-semibold text-[#0B2438] focus:outline-none focus:ring-2 focus:ring-[#2F80ED]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A6278] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sarah@example.com"
                    value={formData.patientEmail}
                    onChange={(e) => setFormData({ ...formData, patientEmail: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-semibold text-[#0B2438] focus:outline-none focus:ring-2 focus:ring-[#2F80ED]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A6278] mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 019-2834"
                    value={formData.patientPhone}
                    onChange={(e) => setFormData({ ...formData, patientPhone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-sm font-semibold text-[#0B2438] focus:outline-none focus:ring-2 focus:ring-[#2F80ED]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4A6278] mb-1.5">
                  Health Objectives or Symptoms (Optional)
                </label>
                <textarea
                  rows="2"
                  placeholder="Brief summary of your symptoms or doctor questions..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-sm font-medium text-[#0B2438] focus:outline-none focus:ring-2 focus:ring-[#2F80ED]"
                />
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-4 py-2 text-xs font-bold text-[#4A6278] hover:text-[#0B2438] flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back
                </button>
                <button
                  type="submit"
                  className="px-7 py-3 rounded-lg text-xs font-bold text-white bg-gradient-to-r from-[#2F80ED] to-[#1E6FD9] hover:shadow-lg hover:shadow-blue-500/30 transition-all flex items-center gap-2 cursor-pointer uppercase tracking-wider"
                >
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>CONFIRM APPOINTMENT &gt;</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 5: Confirmation & Digital Arrival Passport */}
          {step === 5 && (
            <div className="text-center py-3 space-y-5 animate-in zoom-in-95 duration-300">
              <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#00C2CB] to-[#10B981] p-[2px] shadow-lg flex items-center justify-center">
                  <div className="w-full h-full bg-[#0B2438] rounded-full flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>
                </div>
              </div>

              <div>
                <span className="font-mono text-[10px] font-black uppercase tracking-widest text-[#00C2CB] bg-cyan-50 border border-cyan-200/60 px-3.5 py-1 rounded-full">
                  APPOINTMENT RESERVED // PRIORITY STATUS ACTIVE
                </span>
                <h4 className="text-2xl font-black text-[#0B2438] mt-2 mb-1">
                  You're All Set, {formData.patientName}!
                </h4>
                <p className="text-xs text-[#4A6278]">
                  A confirmation packet with hospital directions and QR intake has been sent to{' '}
                  <strong className="text-[#0B2438]">{formData.patientEmail}</strong>.
                </p>
              </div>

              {/* Digital Pass Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-blue-50/70 to-white border border-blue-200/60 shadow-sm text-left max-w-lg mx-auto">
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

                <div className="space-y-2 text-xs text-[#0B2438]">
                  <div className="flex justify-between">
                    <span className="text-[#4A6278]">Speciality Faculty:</span>
                    <strong>{formData.department}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#4A6278]">Specialist:</span>
                    <strong>{selectedDocObj.name}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#4A6278]">Format:</span>
                    <span className="capitalize">{consultType === 'in-person' ? 'In-Person Clinic Visit' : 'Encrypted Telehealth'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#4A6278]">Date & Time:</span>
                    <strong>{formData.date} at {formData.timeSlot}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#4A6278]">Location:</span>
                    <span>{hospitalName} · Pavilion Suite 400</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-7 py-2.5 rounded-lg text-xs font-bold text-white bg-[#0B2438] hover:bg-black transition-colors cursor-pointer"
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

  return typeof document !== 'undefined' ? createPortal(modalContent, document.body) : null;
}
