import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import HeroSection from './components/hero/HeroSection';
import HoverBoardsSection from './components/services/HoverBoardsSection';
import AboutUsSection from './components/about/AboutUsSection';
import MajorServicesSection from './components/services/MajorServicesSection';
import DoctorsSection from './components/doctors/DoctorsSection';
import PatientJourneySection from './components/journey/PatientJourneySection';
import TrustStatsSection from './components/stats/TrustStatsSection';
import FinalCtaSection from './components/cta/FinalCtaSection';
import Footer from './components/layout/Footer';
import AppointmentModal from './components/modals/AppointmentModal';
import DoctorProfileModal from './components/modals/DoctorProfileModal';
import EmergencyCareModal from './components/modals/EmergencyCareModal';
import MyAppointmentsDrawer from './components/modals/MyAppointmentsDrawer';
import LoginPage from './components/auth/LoginPage';
import HospitalTickerBanner from './components/ui/HospitalTickerBanner';
import ScrollProgressBar from './components/ui/ScrollProgressBar';
import KineticTextScroller from './components/ui/KineticTextScroller';

import { Calendar } from 'lucide-react';
import { DEFAULT_HOSPITAL_NAME } from './data/hospitalData';


export default function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'login'
  const [theme, setTheme] = useState('light'); // 'light' | 'dark'
  const [hospitalName, setHospitalName] = useState(DEFAULT_HOSPITAL_NAME);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);
  const [appointmentsDrawerOpen, setAppointmentsDrawerOpen] = useState(false);
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState(null);
  const [selectedDoctorForProfile, setSelectedDoctorForProfile] = useState(null);

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
    <div className="min-h-screen bg-[#F8FBFF] text-[#0B2438] relative selection:bg-[#2F80ED]/20 selection:text-[#2F80ED]">
      {/* Real-time Scroll Progress Bar & Telemetry HUD */}
      <ScrollProgressBar />

      {/* 1. Floating Glass Navigation */}
      <Navbar
        hospitalName={hospitalName}
        onOpenBooking={() => {
          const el = document.getElementById('hero');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenLogin={() => setCurrentView('login')}
        onOpenEmergency={() => setEmergencyModalOpen(true)}
        onOpenAppointments={() => setAppointmentsDrawerOpen(true)}
        onChangeHospitalName={setHospitalName}
      />

      {/* 2. Central Futuristic 3D Anatomy Hero & Continuous Booking Stream */}
      <HeroSection
        hospitalName={hospitalName}
        onOpenBooking={() => {
          const el = document.getElementById('hero');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenAppointmentsDrawer={() => setAppointmentsDrawerOpen(true)}
        onOpenEmergencyModal={() => setEmergencyModalOpen(true)}
      />

      {/* Hospital Name Scrolling Ticker Banner Under Hero Bar */}
      <HospitalTickerBanner
        hospitalName={hospitalName}
      />

      {/* 3. 3D Interactive Hover Boards (6 Core Services) */}
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
          `[ ${hospitalName.toUpperCase()} ]`,
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

      {/* 4. Concise About Us & Why Choose Us */}
      <AboutUsSection
        hospitalName={hospitalName}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* 5. Major Clinical Departments */}
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
          `[ ${hospitalName.toUpperCase()} ]`,
          "✦",
          "24/7 ADVANCED CLINICAL CARE",
          "✦",
        ]}
      />

      {/* 6. AI-Generated Doctors Section with 3D Tilt & Profiles */}
      <DoctorsSection
        hospitalName={hospitalName}
        onViewProfile={handleOpenProfile}
        onOpenBooking={handleOpenBooking}
      />

      {/* 7. Patient Journey Timeline */}
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
          `[ ${hospitalName.toUpperCase()} ]`,
          "✦",
        ]}
      />

      {/* 8. Trust & Floating Statistics Section */}
      <TrustStatsSection />


      {/* 9. Final Appointment CTA */}
      <FinalCtaSection
        hospitalName={hospitalName}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* 10. Minimalist Luxury Footer */}
      <Footer
        hospitalName={hospitalName}
      />

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

      {/* 24/7 Emergency Care Rapid Response Modal */}
      <EmergencyCareModal
        isOpen={emergencyModalOpen}
        onClose={() => setEmergencyModalOpen(false)}
        hospitalName={hospitalName}
      />

      {/* My Appointments Slide-Over Drawer */}
      <MyAppointmentsDrawer
        isOpen={appointmentsDrawerOpen}
        onClose={() => setAppointmentsDrawerOpen(false)}
        onBookNew={() => {
          setAppointmentsDrawerOpen(false);
          const el = document.getElementById('hero');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        hospitalName={hospitalName}
      />

    </div>
  );
}
