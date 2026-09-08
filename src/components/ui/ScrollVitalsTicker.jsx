import React, { useState, useEffect } from 'react';
import { Activity } from 'lucide-react';

const VITALS_DATA = [
  "PATIENT INTAKE: ACTIVE",
  "✦",
  "OR-3: IN PROCEDURE",
  "✦",
  "LAB RESULTS: PROCESSING",
  "✦",
  "BED AVAILABILITY: 14%",
  "✦",
  "7T MRI: SCANNING",
  "✦",
  "DA VINCI ROBOTIC SUITE: CALIBRATED",
  "✦",
  "ICU VITALS: OPTIMAL (99.8%)",
  "✦",
  "TRAUMA BAY: ON STANDBY",
  "✦",
  "CARDIAC TELEMETRY: NORMAL SINUS RHYTHM",
  "✦"
];

export default function ScrollVitalsTicker() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Appear once scrolled past initial hero threshold (~260px)
      const shouldShow = window.scrollY > 260;
      if (shouldShow !== visible) {
        setVisible(shouldShow);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visible]);

  if (!visible) return null;

  const repeatedItems = [...VITALS_DATA, ...VITALS_DATA, ...VITALS_DATA, ...VITALS_DATA];

  return (
    <div
      className={`fixed top-[66px] sm:top-[74px] left-0 right-0 z-40 transition-all duration-500 pointer-events-none select-none ${
        visible ? 'opacity-90 translate-y-0' : 'opacity-0 -translate-y-2'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-7 rounded-full bg-[#0B2438]/90 dark:bg-[#07131E]/95 backdrop-blur-md border border-cyan-500/20 shadow-[0_4px_20px_rgba(0,194,203,0.1)] flex items-center overflow-hidden pointer-events-auto">
          {/* Static Left Badge */}
          <div className="shrink-0 flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-cyan-600/25 to-transparent text-cyan-300 font-sans text-[10px] font-semibold tracking-wider border-r border-cyan-500/20 antialiased">
            <Activity className="w-3 h-3 text-cyan-400 animate-pulse" />
            <span className="hidden sm:inline">LIVE TELEMETRY:</span>
            <span className="sm:hidden">LIVE:</span>
          </div>

          {/* Marquee Content */}
          <div className="overflow-hidden whitespace-nowrap flex-1 flex items-center">
            <div className="animate-ticker-marquee flex items-center gap-6 font-sans text-[10px] sm:text-[11px] font-medium tracking-wide text-cyan-200/90 antialiased">
              {repeatedItems.map((item, idx) => (
                <span
                  key={idx}
                  className={
                    item === "✦"
                      ? "text-cyan-400/50 font-light"
                      : item.includes("ACTIVE") || item.includes("OPTIMAL") || item.includes("CALIBRATED")
                      ? "text-emerald-300 font-medium"
                      : "text-cyan-100/90"
                  }
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
