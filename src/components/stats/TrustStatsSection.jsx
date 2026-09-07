import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TRUST_STATS } from '../../data/hospitalData';
import { ShieldCheck, Sparkles, Building2, Users } from 'lucide-react';

function StatCounterItem({ stat, index }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = stat.numeric;
    const duration = 1500;
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = end / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [stat.numeric]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="p-8 rounded-3xl glass-panel text-center hover:shadow-xl transition-all duration-300 border border-white/90 relative group overflow-hidden"
    >
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#2F80ED]/40 to-transparent group-hover:via-[#2F80ED] transition-all" />

      {/* Large Typography Value */}
      <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0B2438] tracking-tight font-mono mb-2">
        <span className="text-[#2F80ED]">{count}</span>
        <span>{stat.suffix}</span>
      </div>

      {/* Metric Label */}
      <h4 className="text-base sm:text-lg font-bold text-[#0B2438] mb-1">
        {stat.label}
      </h4>

      {/* Minimal Supporting Text */}
      <p className="text-xs text-[#4A6278] leading-relaxed">
        {stat.detail}
      </p>
    </motion.div>
  );
}

export default function TrustStatsSection() {
  return (
    <section className="relative py-20 lg:py-28 bg-[#F8FBFF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Subtle section label */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/60 text-xs font-bold text-[#2F80ED] uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>GLOBAL TRUST BENCHMARK</span>
          </div>
        </div>

        {/* Minimal Floating Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_STATS.map((stat, idx) => (
            <StatCounterItem key={stat.label} stat={stat} index={idx} />
          ))}
        </div>

      </div>
    </section>
  );
}
