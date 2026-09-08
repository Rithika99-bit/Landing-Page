import React, { useState, useEffect } from 'react';
import { Activity, Wind, UserCheck, Stethoscope } from 'lucide-react';
import { isFeatureEnabled } from '../../config/featureFlags';
import { isReducedMotionPreferred } from '../../utils/animationTokens';

/**
 * LiveVitalsTicker:
 * Slim persistent clinical telemetry strip showing soft-updating simulated hospital metrics.
 * Designed to feel like an ambient medical operations dashboard.
 */
export default function LiveVitalsTicker() {
  const isEnabled = isFeatureEnabled('LIVE_VITALS_TICKER');

  const [surgeries, setSurgeries] = useState(24);
  const [patients, setPatients] = useState(148);
  const [aqi, setAqi] = useState(99.4);

  useEffect(() => {
    if (!isEnabled || isReducedMotionPreferred()) return;

    // Gently increment metrics at calm, realistic intervals
    const surgeryInterval = setInterval(() => {
      setSurgeries((prev) => prev + 1);
    }, 18000);

    const patientInterval = setInterval(() => {
      setPatients((prev) => prev + (Math.random() > 0.4 ? 1 : 0));
    }, 7500);

    const aqiInterval = setInterval(() => {
      setAqi((prev) => +(99.2 + Math.random() * 0.6).toFixed(1));
    }, 12000);

    return () => {
      clearInterval(surgeryInterval);
      clearInterval(patientInterval);
      clearInterval(aqiInterval);
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  return (
    <div
      className="w-full bg-[#080B1A]/80 dark:bg-[#04060E]/90 backdrop-blur-md border-b border-cyan-500/15 py-1.5 px-4 text-[11px] font-sans text-cyan-300/85 tracking-wide select-none z-30 relative overflow-hidden antialiased"
      aria-label="Ambient Hospital Telemetry"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 sm:gap-6">
        {/* Live Indicator */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <span className="font-semibold tracking-wider text-white uppercase text-[10px]">AETHERIA LIVE TELEMETRY</span>
        </div>

        {/* Dynamic Soft-updating Vitals */}
        <div className="flex items-center gap-4 sm:gap-8 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <Stethoscope className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-gray-400">Surgeries Today:</span>
            <span className="font-bold text-cyan-200 transition-all duration-500">{surgeries}</span>
          </div>

          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-gray-400">Triaged Intake:</span>
            <span className="font-bold text-emerald-200 transition-all duration-500">{patients}</span>
          </div>

          <div className="flex items-center gap-1.5 whitespace-nowrap">
            <Wind className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-gray-400">Surgical Air Index:</span>
            <span className="font-bold text-violet-200">{aqi}% ISO-5</span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 whitespace-nowrap">
            <Activity className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
            <span className="text-gray-400">Trauma Response:</span>
            <span className="font-bold text-rose-300">0s STANDBY</span>
          </div>
        </div>
      </div>
    </div>
  );
}
