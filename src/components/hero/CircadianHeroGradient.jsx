import React, { useMemo } from 'react';
import { isFeatureEnabled } from '../../config/featureFlags';

/**
 * CircadianHeroGradient:
 * Shifts hero ambient backdrop hue based on visitor's local time of day:
 * - Sunrise (5:00 - 8:59): Gold / Warm Amber
 * - Daylight (9:00 - 16:59): Crisp Clinical Teal / Cyan
 * - Dusk (17:00 - 20:59): Sunset Amber / Rose
 * - Midnight (21:00 - 4:59): Deep Space Navy / Indigo
 */
export default function CircadianHeroGradient() {
  const isEnabled = isFeatureEnabled('CIRCADIAN_HERO_GRADIENT');

  const circadianState = useMemo(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 9) {
      return {
        label: 'Sunrise Golden Hour',
        colorA: 'rgba(245, 158, 11, 0.12)', // gold
        colorB: 'rgba(234, 88, 12, 0.08)',  // warm amber
        accent: '#F59E0B',
      };
    } else if (hour >= 9 && hour < 17) {
      return {
        label: 'Daylight Clinical Focus',
        colorA: 'rgba(0, 240, 255, 0.12)', // teal / cyan
        colorB: 'rgba(47, 128, 237, 0.08)', // blue
        accent: '#00F0FF',
      };
    } else if (hour >= 17 && hour < 21) {
      return {
        label: 'Dusk Transition',
        colorA: 'rgba(244, 63, 94, 0.10)',  // rose
        colorB: 'rgba(217, 70, 239, 0.08)', // magenta
        accent: '#F43F5E',
      };
    } else {
      return {
        label: 'Midnight Recovery Mode',
        colorA: 'rgba(123, 92, 250, 0.12)', // violet
        colorB: 'rgba(30, 27, 75, 0.18)',   // indigo
        accent: '#7B5CFA',
      };
    }
  }, []);

  if (!isEnabled) return null;

  return (
    <div
      className="absolute inset-0 pointer-events-none transition-all duration-1000 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Dynamic Circadian Radial Glow */}
      <div
        className="absolute -top-32 left-1/4 w-[750px] h-[750px] rounded-full blur-3xl opacity-75 transform -rotate-12 transition-colors duration-1000"
        style={{
          background: `radial-gradient(circle, ${circadianState.colorA} 0%, ${circadianState.colorB} 60%, transparent 80%)`,
        }}
      />
      {/* Subtly labeled time badge for craft detail */}
      <div className="absolute top-4 right-6 text-[9px] font-mono text-gray-400/60 hidden xl:flex items-center gap-1.5 z-10">
        <span
          className="inline-block w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: circadianState.accent }}
        />
        <span>CIRCADIAN: {circadianState.label.toUpperCase()}</span>
      </div>
    </div>
  );
}
