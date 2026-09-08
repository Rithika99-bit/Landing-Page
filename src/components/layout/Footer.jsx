import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, ArrowUp, Volume2, VolumeX } from 'lucide-react';
import { NAV_LINKS } from '../../data/hospitalData';
import { audioManager } from '../../utils/audioManager';

export default function Footer({ hospitalName }) {
  const [audioEnabled, setAudioEnabled] = useState(false);

  useEffect(() => {
    return audioManager.subscribe((enabled) => setAudioEnabled(enabled));
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white dark:bg-[#080B1A] border-t border-gray-100 dark:border-cyan-500/20 text-[#0B2438] dark:text-white pt-12 pb-12 relative overflow-hidden">
      {/* Footer "Signal" Animation: Thin Heart Monitor Wave concluding in a harmonic pulse */}
      <div className="w-full h-8 flex items-center justify-center relative overflow-hidden mb-8 select-none pointer-events-none">
        <div className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
        <svg viewBox="0 0 600 30" className="w-full max-w-2xl h-full stroke-cyan-400 fill-none opacity-80" preserveAspectRatio="none">
          <path
            d="M 0 15 L 220 15 L 230 15 L 240 5 L 250 25 L 260 2 L 270 28 L 280 15 L 300 15 Q 350 15, 450 15 L 600 15"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              filter: 'drop-shadow(0 0 6px #00F0FF)',
            }}
          />
        </svg>
        <div className="absolute w-2.5 h-2.5 rounded-full bg-[#00F0FF] shadow-[0_0_12px_#00F0FF] animate-ping" style={{ left: 'calc(50% - 20px)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-gray-100">

          {/* Brand Info (5 Cols) */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#2F80ED] to-[#00C2CB] p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                  <Activity className="w-4 h-4 text-[#2F80ED]" />
                </div>
              </div>
              <span className="font-extrabold text-lg tracking-tight text-[#0B2438]">
                {hospitalName}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#4A6278] leading-relaxed max-w-sm mb-6">
              Pioneering the intersection of artificial intelligence, robotic surgery, and human-centered clinical compassion.
            </p>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5" />
                JCI Gold Seal Certified
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200">
                HIPAA & GDPR Compliant
              </span>
            </div>
          </div>

          {/* Quick Links (3 Cols) */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B2438] mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-[#4A6278]">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-[#2F80ED] transition-colors font-medium"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Centers of Excellence (4 Cols) */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0B2438] mb-4">
              Centers of Excellence
            </h4>
            <ul className="space-y-2 text-xs text-[#4A6278]">
              <li>Precision Cardiology & Hemodynamics</li>
              <li>Advanced Neurosciences & Radiosurgery</li>
              <li>Da Vinci Robotic Minimally Invasive Center</li>
              <li>Pediatric & Genomic Medicine Institute</li>
              <li>Integrative Constitutional Health</li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Back to Top & Audio Toggle */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#4A6278]">
          <p>© {new Date().getFullYear()} {hospitalName}. All rights reserved. Medical emergency services operate 24/7/365.</p>

          <div className="flex items-center gap-3">
            <button
              onClick={() => audioManager.toggle()}
              title={audioEnabled ? "Mute ambient ECG audio" : "Enable subtle ambient ECG audio (opt-in)"}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                audioEnabled
                  ? 'bg-emerald-50 text-emerald-600 border-emerald-300'
                  : 'bg-gray-50 text-gray-400 hover:text-gray-600 border-gray-200'
              }`}
            >
              {audioEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                  <span>ECG AUDIO: ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>ECG AUDIO: OFF</span>
                </>
              )}
            </button>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-[#2F80ED] hover:text-blue-700 font-semibold p-2 rounded-full hover:bg-blue-50 transition-colors"
            >
              <span>Back to top</span>
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
