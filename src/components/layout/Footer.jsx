import React from 'react';
import { Activity, ShieldCheck, Heart, ArrowUp } from 'lucide-react';
import { NAV_LINKS } from '../../data/hospitalData';

export default function Footer({ hospitalName }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-gray-100 text-[#0B2438] pt-16 pb-12 relative overflow-hidden">
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

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#4A6278]">
          <p>© {new Date().getFullYear()} {hospitalName}. All rights reserved. Medical emergency services operate 24/7/365.</p>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 text-[#2F80ED] hover:text-blue-700 font-semibold p-2 rounded-full hover:bg-blue-50 transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
