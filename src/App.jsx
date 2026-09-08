import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import HeroSection from './components/hero/HeroSection';
import HoverBoardsSection from './components/services/HoverBoardsSection';
import MajorServicesSection from './components/services/MajorServicesSection';
import DoctorsSection from './components/doctors/DoctorsSection';
import PatientJourneySection from './components/journey/PatientJourneySection';
import TrustStatsSection from './components/stats/TrustStatsSection';
import FinalCtaSection from './components/cta/FinalCtaSection';
import Footer from './components/layout/Footer';
import AppointmentModal from './components/modals/AppointmentModal';
import DoctorProfileModal from './components/modals/DoctorProfileModal';
import LoginPage from './components/auth/LoginPage';
import HospitalTickerBanner from './components/ui/HospitalTickerBanner';
import ScrollProgressBar from './components/ui/ScrollProgressBar';
import KineticTextScroller from './components/ui/KineticTextScroller';
import ScrollVitalsTicker from './components/ui/ScrollVitalsTicker';
import MedicalScannerCursor from './components/ui/MedicalScannerCursor';
import PersistentHealthWidget3D from './components/3d/PersistentHealthWidget3D';
import AmbientBackgroundCanvas from './components/3d/AmbientBackgroundCanvas';
import DataStreamDivider from './components/ui/DataStreamDivider';
import PageLoadIntro from './components/ui/PageLoadIntro';
import LiveECGDivider from './components/ui/LiveECGDivider';
import AIHealthAssistantOrb from './components/ui/AIHealthAssistantOrb';
import LiveVitalsTicker from './components/ui/LiveVitalsTicker';
import NeuralTraceOverlay from './components/ui/NeuralTraceOverlay';
import CursorSynapseTrail from './components/ui/CursorSynapseTrail';
import BreathingCompanion from './components/ui/BreathingCompanion';
import { useBackgroundTheme } from './store/useBackgroundTheme';
import { useSmoothScroll } from './hooks/useSmoothScroll';

import { Calendar } from 'lucide-react';
import { DEFAULT_HOSPITAL_NAME } from './data/hospitalData';

export default function App() {
  // Activate GSAP + Lenis inertia scroll choreography site-wide
  useSmoothScroll();

  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'login'
  const [theme, setTheme] = useState('light'); // 'light' | 'dark'
  const [hospitalName, setHospitalName] = useState(DEFAULT_HOSPITAL_NAME);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState(null);
  const [selectedDoctorForProfile, setSelectedDoctorForProfile] = useState(null);

  // Section-Reactive 3D Background Theme Driver
  const setBgTheme = useBackgroundTheme((s) => s.setTheme);

  useEffect(() => {
    const handleScrollTheme = () => {
      const height = window.innerHeight;
      const heroEl = document.getElementById('hero');
      const servicesEl = document.getElementById('services');
      const doctorsEl = document.getElementById('doctors');
      const ctaEl = document.getElementById('final-cta');

      const isElementInView = (el) => {
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= height * 0.55 && rect.bottom >= height * 0.25;
      };

      if (isElementInView(heroEl)) {
        setBgTheme('hero');
      } else if (isElementInView(servicesEl)) {
        setBgTheme('cardiology');
      } else if (isElementInView(doctorsEl)) {
        setBgTheme('oncology');
      } else if (isElementInView(ctaEl)) {
        setBgTheme('emergency');
      }
    };

    window.addEventListener('scroll', handleScrollTheme, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollTheme);
  }, [setBgTheme]);

  // Sync dark class on root document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Sync with URL hash if #login is visited
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#login') {
        setCurrentView('login');
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleOpenBooking = (doctor = null) => {
    setSelectedDoctorForBooking(doctor);
    setBookingModalOpen(true);
  };

  const handleCloseBooking = () => {
    setBookingModalOpen(false);
    setSelectedDoctorForBooking(null);
  };

  const handleOpenProfile = (doctor) => {
    setSelectedDoctorForProfile(doctor);
  };

  const handleCloseProfile = () => {
    setSelectedDoctorForProfile(null);
  };

  // Render Login Portal View if user clicked "Portal Login" or navigated to #login
  if (currentView === 'login') {
    return (
      <LoginPage
        onBackToLanding={() => {
          setCurrentView('landing');
          if (window.location.hash === '#login') {
            window.history.replaceState(null, '', ' ');
          }
        }}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />
    );
  }

  // Render Public Hospital Landing Page
  return (
    <div className="min-h-screen bg-[#F8FBFF] text-[#0B2438] relative selection:bg-[#2F80ED]/20 selection:text-[#2F80ED] circuit-grid-bg">
      {/* Persistent Full-Page 3D WebGL Background Layer */}
      <AmbientBackgroundCanvas />

      {/* Part 2: Ambient Soft-Updating Clinical Telemetry Strip */}
      <LiveVitalsTicker />

      {/* Part 2: Symptom -> Specialist Neural Light Trace Overlay */}
      <NeuralTraceOverlay />

      {/* Part 2: Localized Cursor Synapse Spark Trail */}
      <CursorSynapseTrail />

      {/* 0. Command Center Boot Sequence (1.5s skippable HUD reveal) */}
      <PageLoadIntro />

      {/* 1. Real-time Scroll Progress Bar & Telemetry HUD */}
      <ScrollProgressBar />

      {/* 2. Scroll-Linked Live Vitals Ticker Strip (Appears below Navbar when scrolling) */}
      <ScrollVitalsTicker />

      {/* 3. Non-touch Desktop Medical Scanner Target Cursor */}
      <MedicalScannerCursor />

      {/* 4. Scroll-Reactive Migrating 3D Health Status HUD Widget */}
      <PersistentHealthWidget3D />

      {/* 5. Floating Glass Navigation */}
      <Navbar
        hospitalName={hospitalName}
        onOpenBooking={() => handleOpenBooking()}
        onOpenLogin={() => setCurrentView('login')}
        onChangeHospitalName={setHospitalName}
      />

      {/* 6. Immersive Hero Section with 3D Medical Canvas & AI Doctor */}
      <HeroSection
        hospitalName={hospitalName}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Hospital Name Scrolling Ticker Banner Under Hero Bar */}
      <HospitalTickerBanner
        hospitalName={hospitalName}
      />

      {/* Section Transition Data Stream */}
      <DataStreamDivider />

      {/* 7. 3D Interactive Hover Boards (6 Core Services) */}
      <HoverBoardsSection
        hospitalName={hospitalName}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Background Text Scroller Ribbon 1 */}
      <KineticTextScroller
        hospitalName={hospitalName}
        variant="ribbon"
        reverse={false}
        speed={1.2}
        items={[
          hospitalName.toUpperCase(),
          "40+ CLINICAL SPECIALTIES",
          "✦",
          "SUB-MILLIMETER ROBOTIC SURGERY",
          "✦",
          "JCI GOLD EXCELLENCE",
          "✦",
          "ZERO-WAIT EMERGENCY INTAKE",
          "✦",
          "GENOMIC DIGITAL TWIN",
          "✦",
        ]}
      />



      {/* Continuous Live ECG Heartbeat Divider */}
      <LiveECGDivider />

      {/* 9. Major Clinical Departments */}
      <MajorServicesSection
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Background Text Scroller Ribbon 2 (Reverse Stream) */}
      <KineticTextScroller
        hospitalName={hospitalName}
        variant="ribbon"
        reverse={true}
        speed={1.1}
        items={[
          "WORLD-CLASS FACULTY CHAIRS",
          "✦",
          "HARVARD, HOPKINS & OXFORD ALUMNI",
          "✦",
          "99.8% AUDITED SATISFACTION",
          "✦",
          "100% PRIVATE ACOUSTIC SUITES",
          "✦",
          hospitalName.toUpperCase(),
          "✦",
          "24/7 ADVANCED CLINICAL CARE",
          "✦",
        ]}
      />

      {/* 10. AI-Generated Doctors Section with 3D Tilt & Profiles */}
      <DoctorsSection
        hospitalName={hospitalName}
        onViewProfile={handleOpenProfile}
        onOpenBooking={handleOpenBooking}
      />

      {/* Continuous Live ECG Heartbeat Divider */}
      <LiveECGDivider />

      {/* 11. Hero "Scrollytelling" Patient Journey Timeline (Pinned & Scrubbed) */}
      <PatientJourneySection
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Background Text Scroller Ribbon 3 */}
      <KineticTextScroller
        hospitalName={hospitalName}
        variant="ribbon"
        reverse={false}
        speed={1.3}
        items={[
          "REAL-TIME BIOMETRIC TELEMETRY",
          "✦",
          "7-TESLA HIGH-FIELD MRI",
          "✦",
          "SUB-CELLULAR 2-HOUR DIAGNOSTICS",
          "✦",
          "1:1 DEDICATED NURSE NAVIGATOR",
          "✦",
          hospitalName.toUpperCase(),
          "✦",
        ]}
      />

      {/* 12. Trust & Floating Statistics Section (Scroll-Triggered Counting) */}
      <TrustStatsSection />

      {/* Section Transition Data Stream */}
      <DataStreamDivider />

      {/* 13. Final Appointment CTA with Rotational Parallax */}
      <FinalCtaSection
        hospitalName={hospitalName}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* 14. Minimalist Luxury Footer */}
      <Footer
        hospitalName={hospitalName}
      />

      {/* 15. AI Health Assistant Living Orb & Clinical Copilot HUD */}
      <AIHealthAssistantOrb
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Part 2: Calm 4-7-8 Breathing Companion Widget */}
      <BreathingCompanion />

      {/* Sticky Mobile Quick-Appointment Button */}
      <div className="md:hidden fixed bottom-5 inset-x-5 z-40 flex gap-2">
        <button
          onClick={() => setCurrentView('login')}
          className="flex-1 py-3 px-4 rounded-full text-xs font-bold text-[#2F80ED] bg-white/95 backdrop-blur-md shadow-lg border border-blue-100"
        >
          Staff Portal
        </button>
        <button
          onClick={() => handleOpenBooking()}
          className="flex-[2] py-3 px-5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#2F80ED] to-[#1E6FD9] shadow-[0_12px_30px_rgba(47,128,237,0.4)] flex items-center justify-center gap-2 border border-white/20"
        >
          <Calendar className="w-4 h-4" />
          <span>Book Appointment</span>
        </button>
      </div>

      {/* Interactive Appointment Scheduler Modal */}
      <AppointmentModal
        isOpen={bookingModalOpen}
        onClose={handleCloseBooking}
        preselectedDoctor={selectedDoctorForBooking}
        hospitalName={hospitalName}
      />

      {/* Doctor Profile Details Modal */}
      <DoctorProfileModal
        doctor={selectedDoctorForProfile}
        isOpen={!!selectedDoctorForProfile}
        onClose={handleCloseProfile}
        onBookDoctor={(doc) => handleOpenBooking(doc)}
      />

    </div>
  );
}
