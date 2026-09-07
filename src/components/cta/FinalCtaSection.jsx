import React from 'react';
import { motion } from 'framer-motion';
import { HeartPulse } from 'lucide-react';
import HospitalMarqueeBackground from '../ui/HospitalMarqueeBackground';

export default function FinalCtaSection({ hospitalName }) {
  return (
    <section id="contact" className="relative py-24 lg:py-36 overflow-hidden bg-white">
      {/* Background Ambient Aura & Grid */}
      <div className="pointer-events-none absolute inset-0 medical-mesh-bg opacity-70" />

      {/* Background Text Scroller */}
      <HospitalMarqueeBackground hospitalName={hospitalName} reverse={true} />


      {/* Subtle Animated 3D Floating Medical Cross & Rings in background */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-blue-400/10 via-cyan-300/10 to-transparent blur-3xl animate-pulse-slow" />

      {/* Floating 3D Geometric Medical Cross SVG */}
      <div className="pointer-events-none absolute -right-12 top-1/4 w-72 h-72 opacity-15 rotate-12 animate-float-gentle">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#2F80ED]">
          <path d="M70 20H130V70H180V130H130V180H70V130H20V70H70V20Z" fill="currentColor" fillOpacity="0.4" stroke="#2F80ED" strokeWidth="4" />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/70 text-xs font-bold text-[#2F80ED] uppercase tracking-wider mb-6 shadow-sm"
        >
          <HeartPulse className="w-4 h-4 text-[#2F80ED]" />
          <span>BEGIN YOUR HEALING JOURNEY</span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B2438] tracking-tight leading-[1.12] mb-6"
        >
          Your Health Deserves{' '}
          <span className="bg-gradient-to-r from-[#2F80ED] via-[#1E6FD9] to-[#00C2CB] bg-clip-text text-transparent">
            Better Care.
          </span>
        </motion.h2>

        {/* Supporting text */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-base sm:text-lg lg:text-xl text-[#4A6278] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Connect with our healthcare team and take the next step toward better health.
        </motion.p>

        {/* Quick Contact & Emergency Strip */}
        <div className="p-6 rounded-3xl glass-panel border border-white max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6 text-left">
          <div>
            <span className="text-[10px] font-bold uppercase text-[#2F80ED] tracking-wider block mb-1">
              Immediate Assistance
            </span>
            <p className="text-sm font-bold text-[#0B2438]">+1 (800) 555-CARE</p>
            <p className="text-[11px] text-[#4A6278]">24/7 Clinical Emergency Line</p>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase text-[#2F80ED] tracking-wider block mb-1">
              Global Patient Care
            </span>
            <p className="text-sm font-bold text-[#0B2438]">care@{hospitalName.toLowerCase().replace(/\s+/g, '')}.com</p>
            <p className="text-[11px] text-[#4A6278]">Encrypted Medical Enquiries</p>
          </div>

          <div>
            <span className="text-[10px] font-bold uppercase text-[#2F80ED] tracking-wider block mb-1">
              Campus Location
            </span>
            <p className="text-sm font-bold text-[#0B2438]">100 Medical Plaza Way</p>
            <p className="text-[11px] text-[#4A6278]">Valence Pavilion, Suite 500</p>
          </div>
        </div>

      </div>
    </section>
  );
}

