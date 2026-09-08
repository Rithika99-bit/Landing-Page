import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Activity,
  Award,
  Star,
  Download,
  Share2,
  RotateCcw,
  Check,
  ChevronRight
} from 'lucide-react';
import InteractiveAnatomy3D from '../anatomy/InteractiveAnatomy3D';
import SymptomSearchBar from '../anatomy/SymptomSearchBar';
import FloatingSpecialtyCard from '../anatomy/FloatingSpecialtyCard';
import { ANATOMY_REGIONS } from '../../data/anatomyData';

/**
 * ContinuousBookingPortal:
 * Fluid single-interface appointment booking hub.
 * Transitions smoothly from interactive 3D human body selection
 * into specialization -> doctor -> date/time -> patient intake -> confirmation pass.
 */
export default function ContinuousBookingPortal({
  hospitalName = "AETHERIA HEALTH",
  onOpenAppointmentsDrawer,
  onOpenEmergencyModal,
}) {
  const [currentStep, setCurrentStep] = useState('anatomy'); // 'anatomy' | 'specialty' | 'doctor' | 'datetime' | 'patient' | 'confirmed'
  const [selectedRegion, setSelectedRegion] = useState(ANATOMY_REGIONS[3]); // default to Heart
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [selectedConcern, setSelectedConcern] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('2026-09-10');
  const [selectedTime, setSelectedTime] = useState('10:30 AM');
  const [patientData, setPatientData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [confirmationCode, setConfirmationCode] = useState('');

  // Default doctor on region change
  useEffect(() => {
    if (selectedRegion && selectedRegion.doctors?.length > 0) {
      setSelectedDoctor(selectedRegion.doctors[0]);
      setSelectedConcern(selectedRegion.commonConcerns[0] || '');
    }
  }, [selectedRegion]);

  const handleStartBookingFromRegion = (region) => {
    setSelectedRegion(region);
    setCurrentStep('specialty');
  };

  const handleConfirmBooking = (e) => {
    e.preventDefault();
    if (!patientData.name || !patientData.email) {
      alert('Please provide your name and email address to confirm your appointment.');
      return;
    }

    const code = `ATH-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmationCode(code);

    // Persist appointment to localStorage for My Appointments drawer
    const newAppointment = {
      id: code,
      hospitalName,
      regionName: selectedRegion.name,
      specialty: selectedRegion.specialty,
      doctor: selectedDoctor,
      date: selectedDate,
      time: selectedTime,
      patient: patientData,
      createdAt: new Date().toISOString(),
      status: 'Confirmed'
    };

    try {
      const existing = JSON.parse(localStorage.getItem('aetheria_appointments') || '[]');
      localStorage.setItem('aetheria_appointments', JSON.stringify([newAppointment, ...existing]));
    } catch (err) {
      console.error('Storage error:', err);
    }

    setCurrentStep('confirmed');
  };

  const handleResetToAnatomy = () => {
    setCurrentStep('anatomy');
    setConfirmationCode('');
    setPatientData({ name: '', email: '', phone: '', notes: '' });
  };

  return (
    <div className="w-full relative z-20">
      
      {/* Top Interactive Progress Breadcrumb Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-3 py-3 px-5 rounded-2xl bg-white/80 dark:bg-[#0E243A]/80 backdrop-blur-xl border border-white/90 dark:border-blue-900/50 shadow-sm text-xs font-semibold">
          
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <button
              onClick={() => setCurrentStep('anatomy')}
              className={`flex items-center gap-1.5 transition-colors ${
                currentStep === 'anatomy' ? 'text-[#2F80ED] font-black' : 'text-gray-500 hover:text-blue-600'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/60 flex items-center justify-center text-[10px]">1</span>
              <span>Body Area: {selectedRegion?.name || "Select"}</span>
            </button>

            <ChevronRight className="w-3 h-3 text-gray-300" />

            <button
              onClick={() => setCurrentStep('specialty')}
              className={`flex items-center gap-1.5 transition-colors ${
                currentStep === 'specialty' ? 'text-[#2F80ED] font-black' : 'text-gray-500 hover:text-blue-600'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/60 flex items-center justify-center text-[10px]">2</span>
              <span>{selectedRegion?.specialty || "Specialization"}</span>
            </button>

            <ChevronRight className="w-3 h-3 text-gray-300" />

            <button
              onClick={() => setCurrentStep('doctor')}
              disabled={!selectedDoctor}
              className={`flex items-center gap-1.5 transition-colors ${
                currentStep === 'doctor' ? 'text-[#2F80ED] font-black' : 'text-gray-500 hover:text-blue-600'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/60 flex items-center justify-center text-[10px]">3</span>
              <span>{selectedDoctor?.name || "Choose Doctor"}</span>
            </button>

            <ChevronRight className="w-3 h-3 text-gray-300" />

            <span className={currentStep === 'datetime' ? 'text-[#2F80ED] font-black' : 'text-gray-400'}>
              4. Date & Time
            </span>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {currentStep !== 'anatomy' && (
              <button
                onClick={() => {
                  if (currentStep === 'specialty') setCurrentStep('anatomy');
                  if (currentStep === 'doctor') setCurrentStep('specialty');
                  if (currentStep === 'datetime') setCurrentStep('doctor');
                  if (currentStep === 'patient') setCurrentStep('datetime');
                }}
                className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 flex items-center gap-1 text-[11px]"
              >
                <ArrowLeft className="w-3 h-3" />
                <span>Back</span>
              </button>
            )}
            <button
              onClick={handleResetToAnatomy}
              className="px-3 py-1 rounded-lg text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950 text-[11px] font-bold"
            >
              Explore 3D Body
            </button>
          </div>

        </div>
      </div>

      {/* CONTINUOUS INTERFACE TRANSITIONS */}
      <AnimatePresence mode="wait">
        
        {/* STEP 1: INTERACTIVE 3D ANATOMY HERO HUB */}
        {currentStep === 'anatomy' && (
          <motion.div
            key="anatomy-hub"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            {/* Top Headline for Hero Booking */}
            <div className="text-center max-w-3xl mx-auto mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/80 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800 text-xs font-bold text-[#2F80ED] dark:text-blue-300 mb-3 shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>BOOK BY BODY AREA // 3D ANATOMY NAVIGATION</span>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0B2438] dark:text-white tracking-tight leading-[1.1]">
                Hover an Organ.{' '}
                <span className="bg-gradient-to-r from-[#2F80ED] via-[#1E6FD9] to-[#00C2CB] bg-clip-text text-transparent">
                  Book Top Specialists.
                </span>
              </h2>
              <p className="text-sm sm:text-base text-[#4A6278] dark:text-gray-300 mt-3 font-normal max-w-2xl mx-auto">
                Select any anatomical region on the 3D figure or search your symptoms below to get matched directly with verified department chairs.
              </p>
            </div>

            {/* Central 3D Interactive Anatomy Showcase Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative min-h-[620px]">
              
              {/* Left Column: Interactive 3D Anatomy Model (7 Cols Desktop) */}
              <div className="lg:col-span-7 relative flex items-center justify-center rounded-[2.5rem] bg-gradient-to-b from-blue-50/40 via-white/50 to-blue-50/30 dark:from-[#0E243A]/40 dark:via-[#091A2A]/60 dark:to-[#0E243A]/40 border border-white/80 dark:border-blue-900/40 shadow-[0_16px_50px_rgba(47,128,237,0.08)] backdrop-blur-xl overflow-hidden">
                <InteractiveAnatomy3D
                  selectedRegion={selectedRegion}
                  hoveredRegion={hoveredRegion}
                  onSelectRegion={(reg) => {
                    setSelectedRegion(reg);
                  }}
                  onHoverRegion={(reg) => {
                    setHoveredRegion(reg);
                  }}
                />

                {/* Mobile Tap-to-Select Notice */}
                <div className="lg:hidden absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 dark:bg-black/60 text-[10px] font-bold text-[#2F80ED] shadow-sm">
                  Tap any node to view specialty
                </div>
              </div>

              {/* Right Column: Floating Specialty Card & Fast Region Switcher (5 Cols) */}
              <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
                
                {/* Active Floating Specialty Card */}
                <FloatingSpecialtyCard
                  region={hoveredRegion || selectedRegion}
                  onStartBooking={handleStartBookingFromRegion}
                />

                {/* Quick 12-Region Anatomical Switchboard (Mobile & Fast Desktop access) */}
                <div className="p-4 rounded-3xl bg-white/70 dark:bg-[#0E243A]/70 backdrop-blur-lg border border-white/80 dark:border-blue-900/40 shadow-sm">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#4A6278] dark:text-gray-400 block mb-2 px-1">
                    Quick Body Region Directory:
                  </span>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
                    {ANATOMY_REGIONS.map((reg) => {
                      const isSelected = selectedRegion?.id === reg.id;
                      return (
                        <button
                          key={reg.id}
                          onClick={() => {
                            setSelectedRegion(reg);
                            setHoveredRegion(reg);
                          }}
                          className={`p-2 rounded-xl text-left transition-all ${
                            isSelected
                              ? 'bg-[#2F80ED] text-white shadow-md shadow-blue-500/30 scale-102'
                              : 'bg-white/90 dark:bg-[#152F48] text-[#0B2438] dark:text-gray-200 hover:bg-blue-50 border border-gray-100 dark:border-gray-800'
                          }`}
                        >
                          <span className="text-xs font-black block leading-tight truncate">
                            {reg.name.split('&')[0]}
                          </span>
                          <span className="text-[10px] opacity-80 block truncate">
                            {reg.specialty}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

            </div>

            {/* "Where Does It Hurt?" Symptom Search Bar Below Model */}
            <div className="mt-10 mb-8">
              <SymptomSearchBar
                onSelectRegion={handleStartBookingFromRegion}
                onHoverRegion={(reg) => {
                  setSelectedRegion(reg);
                  setHoveredRegion(reg);
                }}
                activeRegion={selectedRegion}
              />
            </div>

          </motion.div>
        )}

        {/* STEP 2: SPECIALTY & CONCERN SPECIFICATION */}
        {currentStep === 'specialty' && (
          <motion.div
            key="specialty-step"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35 }}
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4"
          >
            <div className="p-8 sm:p-12 rounded-[2.5rem] bg-white/95 dark:bg-[#0E243A]/95 backdrop-blur-2xl border border-white dark:border-blue-900/60 shadow-2xl">
              
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md"
                  style={{ backgroundColor: selectedRegion.color }}
                >
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-mono text-xs font-bold text-[#2F80ED] uppercase tracking-wider">
                    Step 2 // Clinical Concern
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#0B2438] dark:text-white">
                    {selectedRegion.specialty} Assessment
                  </h3>
                </div>
              </div>

              <p className="text-sm text-[#4A6278] dark:text-gray-300 mb-8">
                Select your primary clinical reason for visiting {hospitalName}’s {selectedRegion.name} department:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {selectedRegion.commonConcerns.map((concern, idx) => {
                  const isSelected = selectedConcern === concern;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedConcern(concern)}
                      className={`p-4 rounded-2xl text-left border transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-[#2F80ED] bg-blue-50/80 dark:bg-blue-950/60 text-[#2F80ED] font-bold shadow-md shadow-blue-500/10'
                          : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-[#122B42] text-[#0B2438] dark:text-gray-200 hover:border-blue-200'
                      }`}
                    >
                      <span className="text-sm">{concern}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-[#2F80ED]" />}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-800">
                <button
                  onClick={() => setCurrentStep('anatomy')}
                  className="px-5 py-3 rounded-full text-xs font-bold text-gray-500 hover:text-[#0B2438] transition-colors"
                >
                  ← Back to Anatomy Model
                </button>

                <button
                  onClick={() => setCurrentStep('doctor')}
                  className="px-8 py-3.5 rounded-full text-xs font-black text-white bg-gradient-to-r from-[#2F80ED] to-[#1E6FD9] hover:opacity-95 shadow-lg shadow-blue-500/25 flex items-center gap-2"
                >
                  <span>Select Available Doctor</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </motion.div>
        )}

        {/* STEP 3: AVAILABLE DOCTORS SELECTION */}
        {currentStep === 'doctor' && (
          <motion.div
            key="doctor-step"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35 }}
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4"
          >
            <div className="p-8 sm:p-12 rounded-[2.5rem] bg-white/95 dark:bg-[#0E243A]/95 backdrop-blur-2xl border border-white dark:border-blue-900/60 shadow-2xl">
              
              <div className="mb-8">
                <span className="font-mono text-xs font-bold text-[#2F80ED] uppercase tracking-wider">
                  Step 3 // Specialist Selection
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#0B2438] dark:text-white mt-1">
                  Choose Your {selectedRegion.specialty} Specialist
                </h3>
                <p className="text-sm text-[#4A6278] dark:text-gray-300 mt-1">
                  Board-certified department directors and clinicians on duty for {selectedRegion.name}.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {selectedRegion.doctors.map((doc) => {
                  const isSelected = selectedDoctor?.id === doc.id;
                  return (
                    <div
                      key={doc.id}
                      onClick={() => setSelectedDoctor(doc)}
                      className={`p-5 rounded-3xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#2F80ED] bg-blue-50/50 dark:bg-blue-950/60 shadow-[0_12px_30px_rgba(47,128,237,0.18)] scale-102 ring-2 ring-blue-400/20'
                          : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-[#122B42] hover:border-blue-200'
                      }`}
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <img
                          src={doc.image}
                          alt={doc.name}
                          className="w-16 h-16 rounded-2xl object-cover shadow-sm ring-2 ring-blue-100"
                        />
                        <div>
                          <h4 className="text-base font-black text-[#0B2438] dark:text-white leading-tight">
                            {doc.name}
                          </h4>
                          <span className="text-xs font-semibold text-[#2F80ED] block mt-0.5">
                            {doc.role}
                          </span>
                          <span className="text-[11px] text-[#4A6278] dark:text-gray-400 block">
                            {doc.subSpecialty}
                          </span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gray-100 dark:border-gray-800/80 flex items-center justify-between text-xs">
                        <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {doc.nextSlot}
                        </span>
                        <span className="font-mono font-extrabold text-[#0B2438] dark:text-white">
                          Fee: {doc.fee}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-800">
                <button
                  onClick={() => setCurrentStep('specialty')}
                  className="px-5 py-3 rounded-full text-xs font-bold text-gray-500 hover:text-[#0B2438]"
                >
                  ← Back to Concern
                </button>

                <button
                  onClick={() => setCurrentStep('datetime')}
                  disabled={!selectedDoctor}
                  className="px-8 py-3.5 rounded-full text-xs font-black text-white bg-gradient-to-r from-[#2F80ED] to-[#1E6FD9] hover:opacity-95 shadow-lg shadow-blue-500/25 flex items-center gap-2"
                >
                  <span>Select Date & Time</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </motion.div>
        )}

        {/* STEP 4: DATE & TIME SLOT PICKER */}
        {currentStep === 'datetime' && (
          <motion.div
            key="datetime-step"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35 }}
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4"
          >
            <div className="p-8 sm:p-12 rounded-[2.5rem] bg-white/95 dark:bg-[#0E243A]/95 backdrop-blur-2xl border border-white dark:border-blue-900/60 shadow-2xl">
              
              <div className="mb-8">
                <span className="font-mono text-xs font-bold text-[#2F80ED] uppercase tracking-wider">
                  Step 4 // Schedule Time
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#0B2438] dark:text-white mt-1">
                  Choose Date & Time with {selectedDoctor?.name}
                </h3>
              </div>

              {/* Date Options */}
              <div className="mb-8">
                <label className="text-xs font-bold text-[#4A6278] dark:text-gray-400 block mb-3 uppercase tracking-wider">
                  Select Consultation Date:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { day: "Today", date: "Sep 08" },
                    { day: "Tomorrow", date: "Sep 09" },
                    { day: "Thursday", date: "Sep 10" },
                    { day: "Friday", date: "Sep 11" }
                  ].map((item, idx) => {
                    const isSelected = selectedDate.includes(item.date.split(' ')[1]);
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedDate(`2026-09-${item.date.split(' ')[1]}`)}
                        className={`p-3.5 rounded-2xl border text-center transition-all ${
                          isSelected
                            ? 'border-[#2F80ED] bg-blue-500 text-white font-bold shadow-md shadow-blue-500/25'
                            : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-[#122B42] text-[#0B2438] dark:text-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <span className="text-[11px] block opacity-80">{item.day}</span>
                        <span className="text-sm font-black block">{item.date}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots Options */}
              <div className="mb-8">
                <label className="text-xs font-bold text-[#4A6278] dark:text-gray-400 block mb-3 uppercase tracking-wider">
                  Select Time Slot:
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {[
                    "09:00 AM", "10:30 AM", "11:15 AM", "01:45 PM",
                    "02:30 PM", "03:45 PM", "04:30 PM", "05:15 PM"
                  ].map((slot, idx) => {
                    const isSelected = selectedTime === slot;
                    return (
                      <button
                        key={idx}
                        onClick={() => setSelectedTime(slot)}
                        className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all border ${
                          isSelected
                            ? 'border-[#00C2CB] bg-[#00C2CB] text-white shadow-md shadow-cyan-500/25'
                            : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-[#122B42] text-[#0B2438] dark:text-gray-200 hover:border-cyan-300'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-800">
                <button
                  onClick={() => setCurrentStep('doctor')}
                  className="px-5 py-3 rounded-full text-xs font-bold text-gray-500 hover:text-[#0B2438]"
                >
                  ← Back to Doctors
                </button>

                <button
                  onClick={() => setCurrentStep('patient')}
                  className="px-8 py-3.5 rounded-full text-xs font-black text-white bg-gradient-to-r from-[#2F80ED] to-[#1E6FD9] hover:opacity-95 shadow-lg shadow-blue-500/25 flex items-center gap-2"
                >
                  <span>Patient Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </motion.div>
        )}

        {/* STEP 5: PATIENT DETAILS & ONE-TOUCH INTAKE */}
        {currentStep === 'patient' && (
          <motion.div
            key="patient-step"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35 }}
            className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4"
          >
            <form
              onSubmit={handleConfirmBooking}
              className="p-8 sm:p-12 rounded-[2.5rem] bg-white/95 dark:bg-[#0E243A]/95 backdrop-blur-2xl border border-white dark:border-blue-900/60 shadow-2xl"
            >
              <div className="mb-8">
                <span className="font-mono text-xs font-bold text-[#2F80ED] uppercase tracking-wider">
                  Step 5 // Patient Intake
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#0B2438] dark:text-white mt-1">
                  Confirm Patient Details
                </h3>
                <p className="text-xs text-[#4A6278] dark:text-gray-400 mt-1">
                  Booking for {selectedRegion.specialty} with {selectedDoctor?.name} on {selectedDate} at {selectedTime}.
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <div>
                  <label className="text-xs font-bold text-[#0B2438] dark:text-gray-300 block mb-1.5">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Eleanor Vance"
                    value={patientData.name}
                    onChange={(e) => setPatientData({ ...patientData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-[#122B42] border border-gray-200 dark:border-gray-800 text-sm font-semibold text-[#0B2438] dark:text-white focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#0B2438] dark:text-gray-300 block mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. eleanor@example.com"
                      value={patientData.email}
                      onChange={(e) => setPatientData({ ...patientData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-[#122B42] border border-gray-200 dark:border-gray-800 text-sm font-semibold text-[#0B2438] dark:text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#0B2438] dark:text-gray-300 block mb-1.5">
                      Phone Number (SMS Confirmation)
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 019-2834"
                      value={patientData.phone}
                      onChange={(e) => setPatientData({ ...patientData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-[#122B42] border border-gray-200 dark:border-gray-800 text-sm font-semibold text-[#0B2438] dark:text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#0B2438] dark:text-gray-300 block mb-1.5">
                    Specific Symptoms or Prior Health Notes (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Briefly describe your symptoms or questions for the doctor..."
                    value={patientData.notes}
                    onChange={(e) => setPatientData({ ...patientData, notes: e.target.value })}
                    className="w-full px-4 py-3 rounded-2xl bg-gray-50 dark:bg-[#122B42] border border-gray-200 dark:border-gray-800 text-sm font-semibold text-[#0B2438] dark:text-white focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-800">
                <button
                  type="button"
                  onClick={() => setCurrentStep('datetime')}
                  className="px-5 py-3 rounded-full text-xs font-bold text-gray-500 hover:text-[#0B2438]"
                >
                  ← Back to Schedule
                </button>

                <button
                  type="submit"
                  className="px-9 py-4 rounded-full text-xs font-black text-white bg-gradient-to-r from-[#2F80ED] to-[#00C2CB] hover:opacity-95 shadow-xl shadow-blue-500/30 flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Appointment Now</span>
                </button>
              </div>

            </form>
          </motion.div>
        )}

        {/* STEP 6: CONFIRMATION PASS ANIMATION */}
        {currentStep === 'confirmed' && (
          <motion.div
            key="confirmed-step"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45 }}
            className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4"
          >
            <div className="p-8 sm:p-12 rounded-[2.5rem] bg-white/95 dark:bg-[#0E243A]/95 backdrop-blur-2xl border border-emerald-400/50 shadow-2xl text-center relative overflow-hidden">
              
              {/* Confetti Ambient Aura */}
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#2F80ED] via-[#00C2CB] to-emerald-400" />
              
              {/* Animated Success Badge */}
              <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950/70 border-2 border-emerald-500 text-emerald-600 dark:text-emerald-300 mx-auto flex items-center justify-center mb-6 shadow-xl animate-bounce">
                <Check className="w-10 h-10 stroke-[3]" />
              </div>

              <h3 className="text-3xl sm:text-4xl font-black text-[#0B2438] dark:text-white tracking-tight">
                Appointment Confirmed!
              </h3>
              <p className="text-sm text-[#4A6278] dark:text-gray-300 mt-2 max-w-md mx-auto">
                Your consultation pass has been generated and sent to <span className="font-bold text-[#0B2438] dark:text-white">{patientData.email}</span>.
              </p>

              {/* Digital Clinic Pass Card */}
              <div className="mt-8 p-6 rounded-3xl bg-blue-50/60 dark:bg-[#122B42] border border-blue-100 dark:border-blue-900/60 text-left space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-blue-200/60 dark:border-blue-800">
                  <span className="font-mono text-xs font-black text-[#2F80ED] uppercase">
                    PASS // {confirmationCode}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                    CONFIRMED
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-gray-400 block text-[10px]">PATIENT</span>
                    <span className="font-bold text-[#0B2438] dark:text-white">{patientData.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">SPECIALIST</span>
                    <span className="font-bold text-[#0B2438] dark:text-white">{selectedDoctor?.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">DEPARTMENT</span>
                    <span className="font-bold text-[#0B2438] dark:text-white">{selectedRegion.specialty} ({selectedRegion.name})</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">DATE & TIME</span>
                    <span className="font-bold text-[#2F80ED]">{selectedDate} @ {selectedTime}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
                <button
                  onClick={() => alert(`Appointment Pass ${confirmationCode} saved to your records.`)}
                  className="px-6 py-3 rounded-full text-xs font-bold text-[#2F80ED] bg-blue-50 hover:bg-blue-100 transition-colors flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Digital Pass</span>
                </button>

                <button
                  onClick={handleResetToAnatomy}
                  className="px-8 py-3 rounded-full text-xs font-black text-white bg-gradient-to-r from-[#2F80ED] to-[#1E6FD9] shadow-lg shadow-blue-500/25 flex items-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Book Another Consultation</span>
                </button>
              </div>

            </div>
          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}
