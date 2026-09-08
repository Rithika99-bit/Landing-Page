import React, { useState } from 'react';
import { X, PhoneCall, AlertTriangle, ShieldAlert, Clock, Navigation, Activity, CheckCircle2 } from 'lucide-react';

/**
 * EmergencyCareModal:
 * Immediate 24/7 Trauma Hotline, Emergency Ambulance dispatch,
 * ER triage wait times, and hospital trauma navigation.
 */
export default function EmergencyCareModal({ isOpen, onClose, hospitalName = "AETHERIA HEALTH" }) {
  const [ambulanceDispatched, setAmbulanceDispatched] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B2438]/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-[2.5rem] bg-white/95 dark:bg-[#0E243A]/95 backdrop-blur-2xl border border-red-200 dark:border-red-900/60 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Urgent Header Banner */}
        <div className="px-6 py-5 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center">
              <ShieldAlert className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight">
                Emergency & Trauma Center
              </h3>
              <span className="text-[11px] font-semibold text-red-100 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                24/7 Level-1 Trauma Active · Zero Wait Triage
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-5">
          
          {/* Direct Hotline One-Tap Call */}
          <a
            href="tel:911"
            className="w-full py-4 px-6 rounded-2xl text-base font-black text-white bg-gradient-to-r from-red-600 to-rose-700 shadow-[0_12px_30px_rgba(239,68,68,0.35)] hover:shadow-[0_16px_40px_rgba(239,68,68,0.5)] transition-all flex items-center justify-center gap-3 group hover:scale-102"
          >
            <PhoneCall className="w-5 h-5 animate-bounce" />
            <span>Call 24/7 Emergency Hotline: 911 / (800) 432-5884</span>
          </a>

          {/* Rapid Mobile ICU Ambulance Dispatcher */}
          <div className="p-4 rounded-2xl bg-red-50/70 dark:bg-red-950/40 border border-red-100 dark:border-red-900/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-red-900 dark:text-red-300 uppercase tracking-wider">
                Mobile ICU Ambulance Dispatch
              </span>
              <span className="text-[10px] font-bold text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/80 px-2 py-0.5 rounded-full">
                Avg Response: 4.8 Mins
              </span>
            </div>
            <p className="text-xs text-[#4A6278] dark:text-gray-300 mb-3">
              Transmit your current GPS location directly to {hospitalName}’s rapid-response ambulance squad with onboard cardiac telemetry.
            </p>

            {ambulanceDispatched ? (
              <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Unit #ATH-4 dispatched to your location. Stay calm.</span>
              </div>
            ) : (
              <button
                onClick={() => setAmbulanceDispatched(true)}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-red-700 dark:text-red-200 bg-white dark:bg-gray-800 border border-red-200 dark:border-red-800 hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Dispatch Nearest Ambulance to My Location</span>
              </button>
            )}
          </div>

          {/* Current Hospital Emergency Department Status */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700">
              <span className="text-gray-400 block text-[10px]">ER INTAKE WAIT</span>
              <span className="text-base font-black text-emerald-600">0 - 2 Mins</span>
            </div>
            <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/80 border border-gray-100 dark:border-gray-700">
              <span className="text-gray-400 block text-[10px]">ON-DUTY SURGEONS</span>
              <span className="text-base font-black text-[#0B2438] dark:text-white">12 Specialists</span>
            </div>
          </div>

          {/* Physical Address */}
          <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-[#4A6278] dark:text-gray-400">
            <span>Hospital Trauma Bay: Gate 1, Medical Boulevard</span>
            <button
              onClick={onClose}
              className="text-blue-600 font-bold hover:underline"
            >
              Close
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
