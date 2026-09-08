import { describe, it, expect } from 'vitest';
import { FEATURE_FLAGS, isFeatureEnabled } from './featureFlags';
import { useBackgroundTheme, THEME_PALETTES } from '../store/useBackgroundTheme';

describe('Feature Flags', () => {
  it('has all core Part 1 and Part 2 features enabled by default', () => {
    expect(isFeatureEnabled('AMBIENT_3D_BACKGROUND')).toBe(true);
    expect(isFeatureEnabled('LIVE_VITALS_TICKER')).toBe(true);
    expect(isFeatureEnabled('CIRCADIAN_HERO_GRADIENT')).toBe(true);
    expect(isFeatureEnabled('MRI_SCAN_HERO_REVEAL')).toBe(true);
    expect(isFeatureEnabled('NEURAL_TRACE_OVERLAY')).toBe(true);
    expect(isFeatureEnabled('CURSOR_SYNAPSE_TRAIL')).toBe(true);
    expect(isFeatureEnabled('BREATHING_COMPANION')).toBe(true);
    expect(isFeatureEnabled('HEARTBEAT_EASTER_EGG')).toBe(true);
  });

  it('returns false for unknown flags', () => {
    expect(isFeatureEnabled('NON_EXISTENT_FEATURE')).toBe(false);
  });
});

describe('Background Theme Store', () => {
  it('initializes with hero palette', () => {
    const state = useBackgroundTheme.getState();
    expect(state.activeTheme).toBe('hero');
    expect(state.palette.primaryColor).toBe('#00F0FF');
  });

  it('correctly transitions palette across medical sections', () => {
    const { setTheme } = useBackgroundTheme.getState();

    setTheme('cardiology');
    expect(useBackgroundTheme.getState().activeTheme).toBe('cardiology');
    expect(useBackgroundTheme.getState().palette.primaryColor).toBe(THEME_PALETTES.cardiology.primaryColor);

    setTheme('neurology');
    expect(useBackgroundTheme.getState().activeTheme).toBe('neurology');

    setTheme('oncology');
    expect(useBackgroundTheme.getState().activeTheme).toBe('oncology');

    setTheme('emergency');
    expect(useBackgroundTheme.getState().activeTheme).toBe('emergency');

    // Reset back to hero
    setTheme('hero');
    expect(useBackgroundTheme.getState().activeTheme).toBe('hero');
  });
});
