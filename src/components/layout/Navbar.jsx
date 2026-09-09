import React, { useState, useEffect } from 'react';
import { NAV_LINKS } from '../../data/hospitalData';
import { Menu, X, Calendar, Activity, ChevronRight, Volume2, VolumeX } from 'lucide-react';
import { audioManager } from '../../utils/audioManager';

export default function Navbar({ hospitalName, onOpenBooking, onOpenLogin, onChangeHospitalName }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(hospitalName);
  const [audioEnabled, setAudioEnabled] = useState(false);

  useEffect(() => {
    return audioManager.subscribe((enabled) => setAudioEnabled(enabled));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active section detection
      const sections = ['hero', 'about', 'services', 'doctors', 'patient-reviews', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSaveName = (e) => {
    e.preventDefault();
    if (tempName.trim()) {
      onChangeHospitalName(tempName.trim());
    }
    setIsEditingName(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        <nav
          className={`relative flex items-center justify-between px-5 sm:px-7 py-3.5 rounded-full transition-all duration-300 ${scrolled
              ? 'bg-white/85 dark:bg-[#080B1A]/90 backdrop-blur-xl border border-cyan-400/30 shadow-[0_12px_40px_rgba(0,240,255,0.1)]'
              : 'bg-white/70 dark:bg-[#080B1A]/75 backdrop-blur-md border border-cyan-400/20 shadow-[0_8px_30px_rgba(11,36,56,0.04)]'
            }`}
        >
          {/* Animated Cyan/Violet HUD Charging Border */}
          <div className="absolute inset-0 rounded-full p-[1.5px] bg-gradient-to-r from-[#00F0FF] via-[#7B5CFA] to-[#00F0FF] hud-charging-border pointer-events-none opacity-40 shadow-[0_0_15px_rgba(0,240,255,0.25)]" />
          {/* Brand Logo & Name */}
          <a
            href="#hero"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Aetheria Health Home"
          >
            <div className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-[#2F80ED] to-[#00C2CB] p-0.5 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                <Activity className="w-4 h-4 text-[#2F80ED] transition-transform duration-300 group-hover:rotate-12" />
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full animate-pulse"></span>
            </div>

            <div className="flex flex-col">
              {isEditingName ? (
                <form onSubmit={handleSaveName} className="flex items-center gap-1">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="text-sm font-bold tracking-tight text-[#0B2438] bg-white border border-blue-400 rounded px-1.5 py-0.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    autoFocus
                    onBlur={() => setIsEditingName(false)}
                  />
                </form>
              ) : (
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold tracking-tight text-[#0B2438] text-base sm:text-lg">
                    {hospitalName}
                  </span>
                  <button
                    onClick={() => setIsEditingName(true)}
                    title="Click to rename hospital"
                    className="opacity-0 group-hover:opacity-60 hover:!opacity-100 text-[10px] text-blue-600 bg-blue-50 px-1 py-0.5 rounded transition-opacity"
                  >
                    Edit
                  </button>
                </div>
              )}
              <span className="text-[10px] font-medium tracking-wider text-[#4A6278] uppercase">
                Future Medicine Institute
              </span>
            </div>
          </a>

          {/* Center Navigation Links: HOME, ABOUT, SERVICES, DOCTORS, CONTACT */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-1.5 text-xs lg:text-sm font-semibold tracking-wide rounded-full transition-all duration-200 ${isActive
                      ? 'text-[#2F80ED] bg-blue-50/80 font-bold'
                      : 'text-[#4A6278] hover:text-[#0B2438] hover:bg-white/60'
                    }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-[#2F80ED] rounded-full"></span>
                  )}
                </a>
              );
            })}
          </div>

          {/* Right CTA Buttons: AUDIO TOGGLE + PORTAL LOGIN + BOOK APPOINTMENT */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Ambient ECG Heartbeat Audio Opt-in Toggle */}
            <button
              onClick={() => audioManager.toggle()}
              title={audioEnabled ? "Mute ambient ECG audio" : "Enable subtle ambient ECG audio (opt-in)"}
              className={`p-2 rounded-full transition-all duration-200 border flex items-center gap-1.5 text-xs font-bold ${
                audioEnabled
                  ? 'bg-emerald-50 text-emerald-600 border-emerald-300 shadow-sm'
                  : 'bg-white/80 text-gray-400 hover:text-gray-600 border-gray-200/80'
              }`}
            >
              {audioEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                  <span className="text-[10px] text-emerald-600">ECG ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span className="text-[10px]">ECG OFF</span>
                </>
              )}
            </button>

            <button
              onClick={onOpenLogin}
              className="px-4 py-2 text-xs font-bold tracking-wide text-[#2F80ED] hover:text-blue-700 bg-blue-50/90 hover:bg-blue-100 rounded-full transition-all duration-200 border border-blue-200/60"
            >
              Portal Login
            </button>
            <button
              onClick={onOpenBooking}
              className="relative inline-flex items-center gap-2 px-5 py-2.5 text-xs lg:text-sm font-bold tracking-wide text-white bg-gradient-to-r from-[#2F80ED] to-[#1E6FD9] rounded-full shadow-[0_8px_20px_rgba(47,128,237,0.25)] hover:shadow-[0_12px_28px_rgba(47,128,237,0.38)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 group overflow-hidden cursor-pointer z-20"
            >
              <span className="absolute inset-0 w-full h-full bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none"></span>
              <Calendar className="w-4 h-4 transition-transform duration-200 group-hover:scale-110 pointer-events-none" />
              <span className="pointer-events-none">BOOK APPOINTMENT</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={onOpenBooking}
              className="px-3 py-1.5 text-xs font-bold text-white bg-[#2F80ED] rounded-full shadow-sm"
              aria-label="Book"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#0B2438] hover:text-[#2F80ED] bg-white/80 rounded-full border border-gray-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Glass Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 p-4 rounded-2xl bg-white/95 backdrop-blur-2xl border border-white shadow-[0_20px_50px_rgba(11,36,56,0.15)] animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold text-[#0B2438] hover:bg-blue-50 hover:text-[#2F80ED] transition-colors"
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </a>
              ))}
              <div className="pt-2 mt-2 border-t border-gray-100 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenLogin();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold text-[#2F80ED] bg-blue-50 hover:bg-blue-100"
                >
                  <span>PORTAL LOGIN</span>
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#2F80ED] to-[#1E6FD9] shadow-md shadow-blue-500/20"
                >
                  <Calendar className="w-4 h-4" />
                  <span>BOOK APPOINTMENT</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
