import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { TRUST_STATS } from '../../data/hospitalData';
import { ShieldCheck, Activity } from 'lucide-react';
import { STAGGER_UNIT } from '../../utils/animationTokens';
import { audioManager } from '../../utils/audioManager';

function StatCounterItem({ stat, index }) {
  const [count, setCount] = useState(0);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [flashGlow, setFlashGlow] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const itemRef = useRef(null);

  // Trigger counting ONLY when element is scrolled into view
  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasTriggered]);

  useEffect(() => {
    if (!hasTriggered) return;

    let start = 0;
    const end = stat.numeric;
    const duration = 1500;
    const stepTime = 25;
    const steps = duration / stepTime;
    const increment = end / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        setFlashGlow(true);
        audioManager.playConfirmation(0.04);
        setTimeout(() => setFlashGlow(false), 800);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [hasTriggered, stat.numeric]);

  const handleMouseMove = (e) => {
    if (!itemRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const yPct = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    setTilt({ x: -yPct * 8, y: xPct * 8 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * STAGGER_UNIT, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-1000 select-none group"
    >
      <div
        className={`p-8 rounded-[2.25rem] text-center transition-all duration-300 preserve-3d border relative overflow-hidden ${flashGlow
            ? 'bg-white/95 dark:bg-[#0E2236] border-cyan-400 shadow-[0_0_35px_rgba(0,240,255,0.6)] scale-[1.03]'
            : 'glass-panel dark:bg-[#080B1A]/85 border-white/90 dark:border-cyan-500/20 hover:border-cyan-400/60 hover:shadow-[0_20px_50px_rgba(0,240,255,0.15)]'
          }`}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        }}
      >
        {/* Top Laser Accent Line */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#00F0FF]/60 to-transparent group-hover:via-[#00F0FF] transition-all" />

        {/* Telemetry Micro Node */}
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[9px] font-bold text-cyan-500/80 tracking-widest uppercase">
            CHNL // 0{index + 1}
          </span>
          <span className={`w-1.5 h-1.5 rounded-full ${flashGlow ? 'bg-[#00F0FF] animate-ping' : 'bg-emerald-400'}`} />
        </div>

        {/* Large Typography Value with Flash Glow Effect */}
        <div className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight font-mono mb-2 transition-colors duration-300 ${flashGlow ? 'text-[#00F0FF] drop-shadow-[0_0_15px_#00F0FF]' : 'text-[#0B2438] dark:text-white'
          }`}>
          <span className="text-[#2F80ED] dark:text-cyan-400">{count}</span>
          <span>{stat.suffix}</span>
        </div>

        {/* Metric Label */}
        <h4 className="text-base sm:text-lg font-bold text-[#0B2438] dark:text-white mb-1">
          {stat.label}
        </h4>

        {/* Minimal Supporting Text */}
        <p className="text-xs text-[#4A6278] dark:text-gray-400 leading-relaxed">
          {stat.detail}
        </p>
      </div>
    </motion.div>
  );
}

export default function TrustStatsSection() {
  return (
    <section className="relative pt-16 lg:pt-24 pb-8 lg:pb-12 bg-[#F8FBFF] dark:bg-[#060814] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Subtle section label */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 dark:bg-cyan-950/60 border border-blue-200/60 dark:border-cyan-800 text-xs font-bold text-[#2F80ED] dark:text-cyan-400 uppercase tracking-wider mb-2 shadow-sm"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>GLOBAL TRUST BENCHMARK // AUDITED</span>
          </motion.div>
        </div>

        {/* Minimal Floating Statistics Cards with Scroll-triggered counters and flash glow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_STATS.map((stat, idx) => (
            <StatCounterItem key={stat.label} stat={stat} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}
