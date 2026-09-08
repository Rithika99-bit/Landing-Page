import React from 'react';

/**
 * HospitalTickerBanner:
 * Sleek, soft-scrolling hospital branding ticker beneath the hero section.
 * Replaces harsh monospace text and brackets with soft, rounded typography and modern pill badges.
 */
export default function HospitalTickerBanner({ hospitalName = "AETHERIA HEALTH" }) {
  const cleanName = hospitalName.replace(/[\[\]]/g, '').trim().toUpperCase();

  const tickerItems = [
    { text: cleanName, highlight: true },
    { text: "ADVANCED ROBOTIC SURGERY & GENOMIC MEDICINE", highlight: false },
    { text: cleanName, highlight: true },
    { text: "24/7 ZERO-WAIT EMERGENCY CLINICAL TRIAGE", highlight: false },
    { text: cleanName, highlight: true },
    { text: "JCI GOLD SEAL & ISO 9001 ACCREDITED EXCELLENCE", highlight: false },
    { text: cleanName, highlight: true },
    { text: "PIONEERING SUB-CELLULAR AI DIAGNOSTICS", highlight: false },
    { text: cleanName, highlight: true },
    { text: "40+ WORLD-RENOWNED ACADEMIC FACULTY CHAIRS", highlight: false },
  ];

  // Tripled for seamless uninterrupted loop on all screen widths
  const repeatedItems = [...tickerItems, ...tickerItems, ...tickerItems];

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-r from-blue-50/70 via-white/90 to-blue-50/70 dark:from-[#080E1A]/90 dark:via-[#0D1829]/90 dark:to-[#080E1A]/90 border-y border-blue-100/70 dark:border-blue-900/40 shadow-[0_4px_20px_rgba(47,128,237,0.04)] py-2.5 sm:py-3 z-20 backdrop-blur-lg select-none">
      
      {/* Soft edge fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#F8FBFF] dark:from-[#080B1A] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#F8FBFF] dark:from-[#080B1A] to-transparent z-10" />

      {/* Infinite scrolling ticker track */}
      <div className="flex items-center animate-ticker-marquee w-max will-change-transform group hover:[animation-play-state:paused]">
        {repeatedItems.map((item, index) => (
          <div key={index} className="inline-flex items-center gap-4 sm:gap-6 px-4 sm:px-6">
            {item.highlight ? (
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/10 dark:bg-blue-400/15 border border-blue-500/20 dark:border-blue-400/30 shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2F80ED] opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2F80ED]" />
                </span>
                <span className="font-sans font-semibold text-xs sm:text-sm tracking-wider text-[#1E6FD9] dark:text-blue-300 uppercase antialiased">
                  {item.text}
                </span>
              </span>
            ) : (
              <span className="font-sans font-medium text-xs sm:text-sm tracking-wide text-slate-600 dark:text-slate-300 uppercase antialiased">
                {item.text}
              </span>
            )}

            {/* Subtle soft separator */}
            <span className="text-blue-400/50 dark:text-cyan-400/40 font-light text-xs sm:text-sm select-none">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
