import React, { useState } from 'react';
import { 
  Activity, 
  ShieldCheck, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Check, 
  Globe, 
  Moon, 
  Sun, 
  ArrowLeft, 
  Stethoscope, 
  Heart, 
  Building2, 
  UserCheck, 
  Shield, 
  Sparkles,
  Users,
  Clock,
  Server
} from 'lucide-react';

const DEMO_ACCOUNTS = {
  Doctor: {
    role: 'Doctor',
    email: 'dr.anya.sharma@medicare.health',
    password: 'ClinicalDoctor2026!',
    badge: 'Senior Attending Physician',
    icon: Stethoscope,
    color: 'blue'
  },
  Nurse: {
    role: 'Nurse',
    email: 'nurse.elena@medicare.health',
    password: 'NurseCare2026!',
    badge: 'Critical Care Lead',
    icon: Heart,
    color: 'cyan'
  },
  Admin: {
    role: 'Admin',
    email: 'system.admin@medicare.health',
    password: 'AdminMaster2026!',
    badge: 'Hospital IT Operations',
    icon: Shield,
    color: 'indigo'
  },
  Staff: {
    role: 'Staff',
    email: 'triage.staff@medicare.health',
    password: 'StaffAccess2026!',
    badge: 'Patient Admitting & Intake',
    icon: UserCheck,
    color: 'emerald'
  }
};

const LANGUAGES = [
  { code: 'en', label: 'English (US)' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'hi', label: 'हिन्दी' },
];

export default function LoginPage({ onBackToLanding, theme, onToggleTheme }) {
  const [email, setEmail] = useState('dr.anya.sharma@medicare.health');
  const [password, setPassword] = useState('ClinicalDoctor2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [activeDemoRole, setActiveDemoRole] = useState('Doctor');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [infoModal, setInfoModal] = useState(null); // 'forgot' | 'create' | null

  // Handle Quick Demo Access Selection
  const handleSelectDemo = (roleKey) => {
    const acc = DEMO_ACCOUNTS[roleKey];
    if (acc) {
      setActiveDemoRole(roleKey);
      setEmail(acc.email);
      setPassword(acc.password);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setLoginSuccess(true);
    }, 1200);
  };

  const handleGoogleLogin = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail('google.workspace.user@medicare.health');
      setPassword('••••••••••••');
      setLoginSuccess(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between bg-[#F8FBFF] dark:bg-[#07131E] text-[#0B2438] dark:text-[#F0F6FF] transition-colors duration-300">
      
      {/* Top Header Bar: Brand Link, Language Selector, Theme Toggle */}
      <header className="w-full px-4 sm:px-8 py-4 flex items-center justify-between border-b border-gray-200/60 dark:border-gray-800/80 bg-white/70 dark:bg-[#0A1A2A]/70 backdrop-blur-md z-20">
        
        {/* Left: Return to Public Website */}
        <button
          onClick={onBackToLanding}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#4A6278] dark:text-gray-300 hover:text-[#2F80ED] dark:hover:text-[#3B82F6] transition-colors py-1.5 px-3 rounded-full hover:bg-blue-50 dark:hover:bg-blue-950/40"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Hospital Website</span>
        </button>

        {/* Right: Language Selector & Theme Toggle */}
        <div className="flex items-center gap-3">
          
          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-[#122538] border border-gray-200 dark:border-gray-700 text-[#0B2438] dark:text-gray-200 hover:border-blue-400 shadow-sm transition-all"
            >
              <Globe className="w-3.5 h-3.5 text-[#2F80ED]" />
              <span>{LANGUAGES.find(l => l.code === selectedLanguage)?.label}</span>
              <span className="text-[10px] text-gray-400">▼</span>
            </button>

            {isLangOpen && (
              <div className="absolute right-0 mt-2 w-36 rounded-2xl bg-white dark:bg-[#122538] border border-gray-200 dark:border-gray-700 shadow-xl py-1.5 z-50">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLanguage(lang.code);
                      setIsLangOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-1.5 text-xs font-medium transition-colors flex items-center justify-between ${
                      selectedLanguage === lang.code
                        ? 'text-[#2F80ED] font-bold bg-blue-50/80 dark:bg-blue-900/30'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <span>{lang.label}</span>
                    {selectedLanguage === lang.code && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-full bg-white dark:bg-[#122538] border border-gray-200 dark:border-gray-700 text-[#0B2438] dark:text-gray-200 hover:text-[#2F80ED] dark:hover:text-[#3B82F6] shadow-sm transition-all"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-blue-600" />
            )}
          </button>
        </div>

      </header>

      {/* Main Split Layout: Left Healthcare Branding/Illustration & Right Login Section */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-10 flex items-center justify-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 rounded-[2.5rem] overflow-hidden bg-white/80 dark:bg-[#0D1E2E]/90 backdrop-blur-2xl border border-white dark:border-gray-800 shadow-[0_25px_70px_rgba(11,36,56,0.08)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.5)]">
          
          {/* =========================================================================
              LEFT SIDE: Healthcare Illustration, MediCare Branding, Status & Stats
             ========================================================================= */}
          <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 bg-gradient-to-br from-[#F0F6FF] via-[#E8F2FF] to-[#DCEEFF] dark:from-[#0B1A28] dark:via-[#0F243A] dark:to-[#0B1724] flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-blue-100/60 dark:border-gray-800">
            
            {/* Ambient Background Aura */}
            <div className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full bg-blue-400/20 dark:bg-blue-600/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-cyan-400/20 dark:bg-cyan-600/10 blur-3xl" />

            <div className="relative z-10">
              
              {/* MediCare Logo & Hospital Branding */}
              <div className="flex items-center gap-3.5 mb-6">
                <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#2F80ED] to-[#00C2CB] p-0.5 flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <div className="w-full h-full bg-white dark:bg-[#0B1A28] rounded-[14px] flex items-center justify-center">
                    <Activity className="w-6 h-6 text-[#2F80ED]" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-extrabold tracking-tight text-[#0B2438] dark:text-white">
                      MediCare
                    </span>
                    <span className="text-[10px] font-bold text-white bg-[#2F80ED] px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Health OS
                    </span>
                  </div>
                  <p className="text-[11px] font-semibold text-[#4A6278] dark:text-gray-400 tracking-wider uppercase">
                    Integrated Clinical Systems
                  </p>
                </div>
              </div>

              {/* Status Badge: "Hospital Core v4.8 • Online" */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-[#122538]/90 backdrop-blur-md border border-emerald-200/80 dark:border-emerald-800/60 shadow-sm mb-8">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-bold text-[#0B2438] dark:text-gray-200">
                  Hospital Core v4.8 • Online
                </span>
                <span className="text-[10px] font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded">
                  99.98% Healthy
                </span>
              </div>

              {/* Central Clinical Graphic / Illustration Card */}
              <div className="p-6 rounded-3xl bg-white/80 dark:bg-[#102438]/80 backdrop-blur-xl border border-white/90 dark:border-gray-700/60 shadow-xl mb-8 relative group overflow-hidden">
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-950 text-[#2F80ED] flex items-center justify-center">
                      <Heart className="w-4 h-4 fill-[#2F80ED]" />
                    </div>
                    <span className="text-xs font-bold text-[#0B2438] dark:text-white">Live Clinical Telemetry</span>
                  </div>
                  <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                    Synchronized
                  </span>
                </div>

                {/* Animated ECG Pulse Waveform SVG */}
                <div className="w-full h-12 flex items-center justify-center overflow-hidden py-1">
                  <svg viewBox="0 0 400 60" className="w-full h-full text-[#2F80ED] stroke-current" fill="none">
                    <path
                      d="M0 30 Q 30 30, 50 30 L 60 10 L 70 50 L 80 20 L 90 40 L 100 30 L 170 30 L 180 5 L 190 55 L 200 15 L 210 45 L 220 30 L 290 30 L 300 12 L 310 48 L 320 18 L 330 38 L 340 30 L 400 30"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-gray-100 dark:border-gray-800 text-center">
                  <div>
                    <span className="text-[10px] text-[#4A6278] dark:text-gray-400 block">Avg Response</span>
                    <span className="text-xs font-bold text-[#0B2438] dark:text-white font-mono">1.2 ms</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#4A6278] dark:text-gray-400 block">Encrypted</span>
                    <span className="text-xs font-bold text-[#2F80ED] font-mono">AES-256</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#4A6278] dark:text-gray-400 block">Active Nodes</span>
                    <span className="text-xs font-bold text-[#0B2438] dark:text-white font-mono">128 Clusters</span>
                  </div>
                </div>
              </div>

              {/* Healthcare Statistics Section (Exact values required):
                  - 2.4k+ Doctors & Specialists
                  - 99.98% Clinical SLA Uptime
                  - 450k+ Patients Served */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3.5 sm:p-4 rounded-2xl bg-white/70 dark:bg-[#122538]/70 backdrop-blur-md border border-white/80 dark:border-gray-700/60 shadow-sm text-left">
                  <div className="text-xl sm:text-2xl font-black text-[#2F80ED] font-mono leading-tight">
                    2.4k+
                  </div>
                  <div className="text-[11px] font-bold text-[#0B2438] dark:text-gray-200 leading-snug mt-0.5">
                    Doctors & Specialists
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl bg-white/70 dark:bg-[#122538]/70 backdrop-blur-md border border-white/80 dark:border-gray-700/60 shadow-sm text-left">
                  <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 font-mono leading-tight">
                    99.98%
                  </div>
                  <div className="text-[11px] font-bold text-[#0B2438] dark:text-gray-200 leading-snug mt-0.5">
                    Clinical SLA Uptime
                  </div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-2xl bg-white/70 dark:bg-[#122538]/70 backdrop-blur-md border border-white/80 dark:border-gray-700/60 shadow-sm text-left">
                  <div className="text-xl sm:text-2xl font-black text-[#0B2438] dark:text-white font-mono leading-tight">
                    450k+
                  </div>
                  <div className="text-[11px] font-bold text-[#0B2438] dark:text-gray-200 leading-snug mt-0.5">
                    Patients Served
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Security Credentials */}
            <div className="pt-6 mt-6 border-t border-blue-200/50 dark:border-gray-800 flex items-center justify-between text-[11px] text-[#4A6278] dark:text-gray-400 relative z-10">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#2F80ED]" />
                HIPAA Tier-4 Verified
              </span>
              <span>SOC2 Type II Certified</span>
            </div>

          </div>

          {/* =========================================================================
              RIGHT SIDE: Authentication Form & Quick Demo Access Options
             ========================================================================= */}
          <div className="lg:col-span-6 p-8 sm:p-12 lg:p-14 flex flex-col justify-center bg-white dark:bg-[#0D1E2E]">
            
            <div className="max-w-md w-full mx-auto">
              
              {/* Heading: Welcome Back */}
              <div className="mb-6">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B2438] dark:text-white tracking-tight mb-2">
                  Welcome Back
                </h1>
                <p className="text-xs sm:text-sm text-[#4A6278] dark:text-gray-400 leading-relaxed">
                  Enter your clinical credentials to access your hospital console.
                </p>
              </div>

              {/* Quick Demo Access Options: Doctor, Nurse, Admin, Staff */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#4A6278] dark:text-gray-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#2F80ED]" />
                    Quick Demo Access
                  </span>
                  <span className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold">
                    1-Click Autofill
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {Object.keys(DEMO_ACCOUNTS).map((roleKey) => {
                    const isSelected = activeDemoRole === roleKey;
                    return (
                      <button
                        key={roleKey}
                        type="button"
                        onClick={() => handleSelectDemo(roleKey)}
                        className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex flex-col items-center gap-1 border ${
                          isSelected
                            ? 'bg-[#2F80ED] text-white border-[#2F80ED] shadow-md shadow-blue-500/25 scale-[1.03]'
                            : 'bg-gray-50 dark:bg-[#122538] text-[#0B2438] dark:text-gray-200 border-gray-200 dark:border-gray-700 hover:border-blue-400'
                        }`}
                      >
                        <span>{roleKey}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Main Login Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Work Email Address Field */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#4A6278] dark:text-gray-300 mb-1.5">
                    Work Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="physician@medicare.health"
                      className="w-full pl-10 pr-4 py-3 rounded-2xl bg-gray-50 dark:bg-[#122538] border border-gray-200 dark:border-gray-700 text-sm font-semibold text-[#0B2438] dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2F80ED] transition-all"
                    />
                  </div>
                </div>

                {/* Password Field with Show/Hide Toggle */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#4A6278] dark:text-gray-300">
                      Password
                    </label>
                    
                    {/* Forgot Password Link */}
                    <button
                      type="button"
                      onClick={() => setInfoModal('forgot')}
                      className="text-xs font-bold text-[#2F80ED] hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-11 py-3 rounded-2xl bg-gray-50 dark:bg-[#122538] border border-gray-200 dark:border-gray-700 text-sm font-semibold text-[#0B2438] dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2F80ED] transition-all font-mono"
                    />
                    
                    {/* Show/Hide Password Toggle Button */}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Keep Me Signed In Checkbox */}
                <div className="flex items-center gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded-md text-[#2F80ED] border-gray-300 dark:border-gray-600 focus:ring-[#2F80ED] bg-gray-50 dark:bg-[#122538]"
                  />
                  <label
                    htmlFor="rememberMe"
                    className="text-xs font-semibold text-[#4A6278] dark:text-gray-300 select-none cursor-pointer"
                  >
                    Keep me signed in on this clinical workstation
                  </label>
                </div>

                {/* Sign In to Dashboard Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-[#2F80ED] to-[#1E6FD9] hover:from-blue-600 hover:to-blue-700 shadow-[0_10px_25px_rgba(47,128,237,0.3)] hover:shadow-[0_14px_30px_rgba(47,128,237,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                      <span>Authenticating Credentials...</span>
                    </span>
                  ) : (
                    <>
                      <span>Sign In to Dashboard</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* Divider */}
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200 dark:border-gray-800" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white dark:bg-[#0D1E2E] px-3 text-gray-400 font-semibold tracking-wider">
                      Or continue with
                    </span>
                  </div>
                </div>

                {/* Google Workspace Login Button */}
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="w-full py-3 px-4 rounded-2xl text-xs sm:text-sm font-bold text-[#0B2438] dark:text-gray-200 bg-white dark:bg-[#122538] hover:bg-gray-50 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow transition-all flex items-center justify-center gap-3"
                >
                  {/* Google SVG Logo */}
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <span>Sign in with Google Workspace</span>
                </button>

              </form>

              {/* Create Account Link */}
              <div className="mt-8 text-center">
                <p className="text-xs text-[#4A6278] dark:text-gray-400">
                  Don't have hospital clinical access?{' '}
                  <button
                    onClick={() => setInfoModal('create')}
                    className="font-bold text-[#2F80ED] hover:underline"
                  >
                    Request Clinical Account
                  </button>
                </p>
              </div>

            </div>

          </div>

        </div>
      </main>

      {/* Footer Strip */}
      <footer className="w-full py-4 text-center text-xs text-[#4A6278] dark:text-gray-500 border-t border-gray-200/50 dark:border-gray-800">
        © {new Date().getFullYear()} MediCare Hospital Systems · Autonomous Clinical Operations Platform
      </footer>

      {/* Interactive Modal for Successful Login Simulation */}
      {loginSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B2438]/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md p-7 rounded-3xl bg-white dark:bg-[#0D1E2E] border border-white dark:border-gray-700 shadow-2xl text-center space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center shadow-lg shadow-emerald-500/15">
              <Check className="w-8 h-8" />
            </div>
            
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#2F80ED] bg-blue-50 dark:bg-blue-950 px-3 py-1 rounded-full">
                AUTHENTICATION VERIFIED
              </span>
              <h3 className="text-2xl font-extrabold text-[#0B2438] dark:text-white mt-2">
                Welcome, {DEMO_ACCOUNTS[activeDemoRole]?.role || 'Clinician'}!
              </h3>
              <p className="text-xs text-[#4A6278] dark:text-gray-400 mt-1">
                Connected to MediCare Core v4.8 workstation with role privileges for{' '}
                <strong className="text-[#0B2438] dark:text-white">{email}</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-[#122538] text-left text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[#4A6278] dark:text-gray-400">Access Role:</span>
                <span className="font-bold text-[#0B2438] dark:text-white">{DEMO_ACCOUNTS[activeDemoRole]?.badge}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#4A6278] dark:text-gray-400">Station IP:</span>
                <span className="font-mono text-gray-700 dark:text-gray-300">10.240.18.92 (Secure Subnet)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#4A6278] dark:text-gray-400">Encryption:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">TLS 1.3 Active</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setLoginSuccess(false)}
                className="flex-1 py-3 rounded-full text-xs font-bold text-[#4A6278] dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200"
              >
                Log Out
              </button>
              <button
                onClick={onBackToLanding}
                className="flex-1 py-3 rounded-full text-xs font-bold text-white bg-[#2F80ED] hover:bg-blue-600 shadow-md shadow-blue-500/25"
              >
                Go to Hospital Site
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Info Dialog for Forgot Password / Request Account */}
      {infoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B2438]/50 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-sm p-6 rounded-3xl bg-white dark:bg-[#0D1E2E] border border-white dark:border-gray-700 shadow-2xl text-center space-y-4">
            <h3 className="text-lg font-extrabold text-[#0B2438] dark:text-white">
              {infoModal === 'forgot' ? 'Reset Hospital Password' : 'Request Clinical Account'}
            </h3>
            <p className="text-xs text-[#4A6278] dark:text-gray-400 leading-relaxed">
              {infoModal === 'forgot'
                ? 'Clinical staff password recovery requires two-factor biometric verification or contact with hospital IT operations desk at ext. 4400.'
                : 'New medical credentialing requires department director endorsement and hospital accreditation verification.'}
            </p>
            <button
              onClick={() => setInfoModal(null)}
              className="w-full py-2.5 rounded-full text-xs font-bold text-white bg-[#2F80ED] hover:bg-blue-600"
            >
              Understood
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
