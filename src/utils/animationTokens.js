/**
 * Global Animation Tokens for Aetheria Health
 * Standardized motion tokens ensuring visual harmony and choreography site-wide.
 */

export const EASE_PRIMARY = "power3.out";
export const EASE_ENTRANCE = "back.out(1.2)";
export const EASE_SMOOTH = "power2.out";
export const EASE_EXPONENTIAL = "expo.out";

export const STAGGER_UNIT = 0.08; // 0.08s
export const STAGGER_UNIT_STR = "0.08s";

export const DURATION_SHORT = 0.4;
export const DURATION_MED = 0.8;
export const DURATION_LONG = 1.2;

export const DURATION_SHORT_STR = "0.4s";
export const DURATION_MED_STR = "0.8s";
export const DURATION_LONG_STR = "1.2s";

// Helper for prefers-reduced-motion check
export const isReducedMotionPreferred = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

// Helper for touch device detection
export const isTouchDevice = () => {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
};
