import React, { useState, useEffect } from 'react';
import {
  Activity,
  Calendar,
  PhoneCall,
  Search,
  User,
  ShieldAlert,
  FileText,
  Clock,
  Menu,
  X,
  ChevronRight,
  Sparkles,
  HeartPulse
} from 'lucide-react';

/**
 * Navbar:
 * Compact, futuristic top navigation bar with quick-access action pills.
 * Navigation: Logo | Find Doctor | Departments | Appointments | Medical Records | Emergency | Profile
 * Quick-Access Actions: Book Appointment | Find a Doctor | Emergency Care | My Appointments
 */
export default function Navbar({
  hospitalName = "AETHERIA HEALTH",
  onOpenBooking,
  onOpenLogin,
  onOpenEmergency,
  onOpenAppointments,
  onChangeHospitalName
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(hospitalName);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
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
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 lg:px-8 pt-3 transition-all duration-300">
      <div className="max-w-7xl mx-auto">
        <nav
          className={`relative flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 rounded-full transition-all duration-300 ${
            scrolled
              ? 'bg-white/90 dark:bg-[#07131E]/90 backdrop-blur-2xl border border-white/95 dark:border-blue-900/60 shadow-[0_12px_40px_rgba(11,36,56,0.09)]'
              : 'bg-white/70 dark:bg-[#07131E]/75 backdrop-blur-md border border-white/80 dark:border-blue-900/40 shadow-[0_6px_25px_rgba(11,36,56,0.04)]'
          }`}
        >
          {/* 1. BRAND LOGO */}
          <a href="#hero" className="flex items-center gap-2.5 group focus:outline-none shrink-0">
            <div className="relative w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-gradient-to-tr from-[#2F80ED] to-[#00C2CB] p-0.5 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-white dark:bg-[#07131E] rounded-full flex items-center justify-center">
                <HeartPulse className="w-4 h-4 text-[#2F80ED] group-hover:scale-110 transition-transform" />
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-500 border-2 border-white rounded-full animate-ping" />
            </div>

            <div className="flex flex-col">
              {isEditingName ? (
                <form onSubmit={handleSaveName} className="flex items-center gap-1">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    className="text-xs sm:text-sm font-bold tracking-tight text-[#0B2438] bg-white border border-blue-400 rounded px-1.5 py-0.5 focus:outline-none"
                    autoFocus
                    onBlur={() => setIsEditingName(false)}
                  />
                </form>
              ) : (
                <div className="flex items-center gap-1">
                  <span className="font-unbounded font-black tracking-tight text-[#0B2438] dark:text-white text-xs sm:text-sm">
                    {hospitalName}
                  </span>
                  <button
                    onClick={() => setIsEditingName(true)}
                    title="Edit Name"
                    className="opacity-0 group-hover:opacity-60 text-[9px] text-blue-600 bg-blue-50 px-1 rounded"
                  >
                    Edit
                  </button>
                </div>
              )}
              <span className="text-[9px] font-mono font-semibold tracking-wider text-[#4A6278] dark:text-gray-400 uppercase hidden sm:block">
                Center of Excellence
              </span>
            </div>
          </a>

          {/* 2. COMPACT TOP NAVIGATION LINKS */}
          <div className="hidden lg:flex items-center gap-1 text-xs font-semibold text-[#4A6278] dark:text-gray-300">
            <a
              href="#doctors"
              className="px-3 py-1.5 rounded-full hover:text-[#2F80ED] hover:bg-blue-50/70 dark:hover:bg-blue-950/60 transition-colors"
            >
              Find Doctor
            </a>
            <a
              href="#services"
              className="px-3 py-1.5 rounded-full hover:text-[#2F80ED] hover:bg-blue-50/70 dark:hover:bg-blue-950/60 transition-colors"
            >
              Departments
            </a>
            <a
              href="#hero"
              className="px-3 py-1.5 rounded-full hover:text-[#2F80ED] hover:bg-blue-50/70 dark:hover:bg-blue-950/60 transition-colors font-bold text-[#2F80ED]"
            >
              Appointments
            </a>
            <button
              onClick={onOpenLogin}
              className="px-3 py-1.5 rounded-full hover:text-[#2F80ED] hover:bg-blue-50/70 dark:hover:bg-blue-950/60 transition-colors"
            >
              Medical Records
            </button>
            <button
              onClick={onOpenEmergency}
              className="px-3 py-1.5 rounded-full text-red-600 dark:text-red-400 font-bold hover:bg-red-50 dark:hover:bg-red-950/50 transition-colors flex items-center gap-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              Emergency
            </button>
            <button
              onClick={onOpenLogin}
              className="px-3 py-1.5 rounded-full hover:text-[#2F80ED] hover:bg-blue-50/70 dark:hover:bg-blue-950/60 transition-colors flex items-center gap-1"
            >
              <User className="w-3.5 h-3.5" />
              <span>Profile</span>
            </button>
          </div>

          {/* 3. QUICK-ACCESS ACTIONS BAR */}
          <div className="hidden sm:flex items-center gap-2">
            
            {/* Quick Action: Emergency Care */}
            <button
              onClick={onOpenEmergency}
              className="px-3 py-1.5 rounded-full text-[11px] font-black text-red-600 dark:text-red-400 bg-red-50/90 dark:bg-red-950/50 hover:bg-red-100 border border-red-200/70 dark:border-red-800 transition-all flex items-center gap-1 shadow-sm"
              title="24/7 Trauma Emergency Center"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Emergency Care</span>
            </button>

            {/* Quick Action: My Appointments */}
            <button
              onClick={onOpenAppointments}
              className="px-3 py-1.5 rounded-full text-[11px] font-bold text-[#2F80ED] dark:text-blue-300 bg-blue-50/90 dark:bg-blue-950/60 hover:bg-blue-100 border border-blue-200/70 dark:border-blue-800 transition-all flex items-center gap-1 shadow-sm"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>My Appointments</span>
            </button>

            {/* Primary Action: Book Appointment */}
            <button
              onClick={onOpenBooking}
              className="relative inline-flex items-center gap-1.5 px-4 py-2 text-xs font-black text-white bg-gradient-to-r from-[#2F80ED] to-[#00C2CB] rounded-full shadow-[0_6px_20px_rgba(47,128,237,0.3)] hover:shadow-[0_10px_26px_rgba(47,128,237,0.45)] hover:scale-102 transition-all group overflow-hidden"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </button>

          </div>

          {/* 4. MOBILE MENU BUTTONS */}
          <div className="flex items-center gap-1.5 sm:hidden">
            <button
              onClick={onOpenEmergency}
              className="p-2 text-red-600 bg-red-50 dark:bg-red-950 rounded-full"
              title="Emergency"
            >
              <PhoneCall className="w-4 h-4 animate-bounce" />
            </button>

            <button
              onClick={onOpenBooking}
              className="px-3 py-1.5 text-xs font-black text-white bg-[#2F80ED] rounded-full shadow-sm"
            >
              Book
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#0B2438] dark:text-white bg-gray-100 dark:bg-gray-800 rounded-full"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </nav>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-2 p-4 rounded-3xl bg-white/95 dark:bg-[#0E243A]/95 backdrop-blur-2xl border border-white shadow-2xl space-y-2 animate-in fade-in duration-200">
            <a
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-xl font-bold text-xs text-[#2F80ED] bg-blue-50 dark:bg-blue-950"
            >
              <span>Book by 3D Anatomy</span>
              <Calendar className="w-4 h-4" />
            </a>

            <a
              href="#doctors"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-[#0B2438] dark:text-white hover:bg-gray-50"
            >
              <span>Find Doctor</span>
              <Search className="w-4 h-4 text-gray-400" />
            </a>

            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-[#0B2438] dark:text-white hover:bg-gray-50"
            >
              <span>Departments</span>
              <Activity className="w-4 h-4 text-gray-400" />
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAppointments();
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-[#0B2438] dark:text-white hover:bg-gray-50"
            >
              <span>My Appointments</span>
              <Clock className="w-4 h-4 text-gray-400" />
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEmergency();
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-black text-red-600 bg-red-50 dark:bg-red-950"
            >
              <span>24/7 Emergency Care</span>
              <ShieldAlert className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLogin();
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold text-gray-600 dark:text-gray-300"
            >
              <span>Staff & Patient Portal Login</span>
              <User className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </header>
  );
}
