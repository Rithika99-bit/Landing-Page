/**
 * Aurelia Healthcare — Feature Flags
 * Easily toggle any signature 3D background or interactive detail on or off.
 */

export const FEATURE_FLAGS = {
  // Part 1: Persistent Full-Page 3D WebGL Background Layer
  AMBIENT_3D_BACKGROUND: true,

  // Part 2: Signature Interactive Details
  LIVE_VITALS_TICKER: true,          // Soft-updating ambient vitals strip
  CIRCADIAN_HERO_GRADIENT: true,     // Time-of-day dynamic hero backdrop
  MRI_SCAN_HERO_REVEAL: true,        // Diagnostic MRI sweep line on initial load
  NEURAL_TRACE_OVERLAY: true,        // Light trail from AI chat to organ atlas / cards
  CURSOR_SYNAPSE_TRAIL: true,        // Localized neuron-style cursor trail (hero & services)
  BREATHING_COMPANION: true,         // 4-7-8 calm breathing companion widget
  HEARTBEAT_EASTER_EGG: true,        // 5-click defibrillator charging easter egg
};

export const isFeatureEnabled = (flagKey) => {
  return Boolean(FEATURE_FLAGS[flagKey]);
};
