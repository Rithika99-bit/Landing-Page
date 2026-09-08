import React from 'react';
import { Sparkles, Activity, ShieldCheck, HeartPulse } from 'lucide-react';

export default function HospitalTickerBanner({ hospitalName = "AETHERIA HEALTH" }) {
  const tickerItems = [
    { text: hospitalName.toUpperCase(), highlight: true },
    { text: "ADVANCED ROBOTIC SURGERY & GENOMIC MEDICINE", highlight: false },
    { text: hospitalName.toUpperCase(), highlight: true },
    { text: "24/7 ZERO-WAIT EMERGENCY CLINICAL TRIAGE", highlight: false },
    { text: hospitalName.toUpperCase(), highlight: true },
    { text: "JCI GOLD SEAL & ISO 9001 ACCREDITED EXCELLENCE", highlight: false },
    { text: hospitalName.toUpperCase(), highlight: true },
    { text: "PIONEERING SUB-CELLULAR AI DIAGNOSTICS", highlight: false },
    { text: hospitalName.toUpperCase(), highlight: true },
    { text: "40+ WORLD-RENOWNED ACADEMIC FACULTY CHAIRS", highlight: false },
  ];

  // Repeat for continuous seamless loop
  const repeatedItems = [...tickerItems, ...tickerItems];

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-blue-50/90 via-white/95 to-blue-50/90 border-y border-blue-100 shadow-[0_4px_20px_rgba(47,128,237,0.06)] py-3 sm:py-3.5 z-20 backdrop-blur-lg select-none">
      
      {/* Subtle edge fade masks for smooth infinite transition */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#F8FBFF] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#F8FBFF] to-transparent z-10" />

      {/* Infinite scrolling ticker track */}
      <div className="flex items-center animate-ticker-marquee w-max group hover:[animation-play-state:paused]">
        {repeatedItems.map((item, index) => (
          <div key={index} className="inline-flex items-center gap-4 sm:gap-6 px-4 sm:px-6">
            
            {item.highlight ? (
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2F80ED]/10 border border-[#2F80ED]/20 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#2F80ED] animate-ping" />
                <span className="font-black text-xs sm:text-sm tracking-wider text-[#2F80ED] font-unbounded">
                  [ {item.text} ]
                </span>
              </span>
            ) : (
              <span className="font-semibold text-xs sm:text-sm tracking-widest text-[#0B2438]/85 uppercase">
                {item.text}
              </span>
            )}

            {/* Separator Symbol */}
            <span className="text-blue-300 font-bold text-sm">✦</span>
          </div>
        ))}
      </div>

    </div>
  );
}
