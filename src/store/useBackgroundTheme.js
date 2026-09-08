import { create } from 'zustand';

export const THEME_PALETTES = {
  hero: {
    name: 'hero',
    primaryColor: '#00F0FF',
    secondaryColor: '#00C2CB',
    fogColor: '#002B36',
    pulseIntensity: 1.0,
    synapseBrightness: 0.12,
  },
  cardiology: {
    name: 'cardiology',
    primaryColor: '#FF4D6D',
    secondaryColor: '#FF758F',
    fogColor: '#2B0E14',
    pulseIntensity: 1.6,
    synapseBrightness: 0.15,
  },
  neurology: {
    name: 'neurology',
    primaryColor: '#00F0FF',
    secondaryColor: '#7B5CFA',
    fogColor: '#0D1B2A',
    pulseIntensity: 1.4,
    synapseBrightness: 0.22,
  },
  oncology: {
    name: 'oncology',
    primaryColor: '#9D4EDD',
    secondaryColor: '#C77DFF',
    fogColor: '#1A0B2E',
    pulseIntensity: 0.9,
    synapseBrightness: 0.14,
  },
  emergency: {
    name: 'emergency',
    primaryColor: '#EF4444',
    secondaryColor: '#F87171',
    fogColor: '#2E0C0C',
    pulseIntensity: 1.8,
    synapseBrightness: 0.18,
  },
};

export const useBackgroundTheme = create((set) => ({
  activeTheme: 'hero',
  palette: THEME_PALETTES.hero,
  setTheme: (themeName) => {
    if (THEME_PALETTES[themeName]) {
      set({
        activeTheme: themeName,
        palette: THEME_PALETTES[themeName],
      });
    }
  },
}));
