import { describe, it, expect } from 'vitest';
import { EASE_PRIMARY, EASE_ENTRANCE, STAGGER_UNIT, DURATION_SHORT, DURATION_MED, DURATION_LONG } from './animationTokens';
import { audioManager } from './audioManager';

describe('Global Animation Tokens', () => {
  it('defines correct easing and timing tokens', () => {
    expect(EASE_PRIMARY).toBe('power3.out');
    expect(EASE_ENTRANCE).toBe('back.out(1.2)');
    expect(STAGGER_UNIT).toBe(0.08);
    expect(DURATION_SHORT).toBe(0.4);
    expect(DURATION_MED).toBe(0.8);
    expect(DURATION_LONG).toBe(1.2);
  });
});

describe('AudioManager', () => {
  it('initializes muted by default (strictly opt-in)', () => {
    expect(audioManager.isEnabled).toBe(false);
  });

  it('toggles audio enabled state correctly', () => {
    const newState = audioManager.toggle();
    expect(newState).toBe(true);
    expect(audioManager.isEnabled).toBe(true);
    // toggle back to off
    audioManager.toggle();
    expect(audioManager.isEnabled).toBe(false);
  });
});
