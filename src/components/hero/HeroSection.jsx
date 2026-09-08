import React from 'react';
import HospitalMarqueeBackground from '../ui/HospitalMarqueeBackground';
import ContinuousBookingPortal from '../booking/ContinuousBookingPortal';

/**
 * HeroSection:
 * Central Futuristic Healthcare Hub featuring:
 * - Interactive 3D Human Body Anatomy Navigation Element ("Book by Body Area")
 * - Laser medical scanning line & organ pulse animations
 * - "Where does it hurt?" symptom triage search bar
 * - Continuous single-interface multi-step appointment booking flow
 * - Ethereal background hospital marquee watermark
 */
export default function HeroSection({
  hospitalName = "AETHERIA HEALTH",
  onOpenBooking,
  onOpenAppointmentsDrawer,
  onOpenEmergencyModal,
}) {
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-24 pb-16 lg:pt-28 lg:pb-24 overflow-hidden medical-mesh-bg medical-subtle-grid"
    >
      {/* Background Soft-Light Hospital Name Scrolling Watermark */}
      <HospitalMarqueeBackground hospitalName={hospitalName} />

      {/* Subtle Ethereal Ambient Glows */}
      <div className="pointer-events-none absolute -top-40 left-1/3 w-[650px] h-[650px] bg-gradient-to-b from-blue-400/10 via-cyan-400/5 to-transparent rounded-full blur-3xl transform -rotate-12" />
      <div className="pointer-events-none absolute top-1/4 -right-20 w-[550px] h-[550px] bg-gradient-to-tr from-cyan-400/10 via-blue-500/5 to-transparent rounded-full blur-3xl" />

      {/* Main Interactive 3D Anatomy & Booking Hub */}
      <div className="relative z-10 w-full">
        <ContinuousBookingPortal
          hospitalName={hospitalName}
          onOpenAppointmentsDrawer={onOpenAppointmentsDrawer}
          onOpenEmergencyModal={onOpenEmergencyModal}
        />
      </div>
    </section>
  );
}
