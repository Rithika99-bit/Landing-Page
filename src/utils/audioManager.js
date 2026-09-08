/**
 * Ambient ECG Heartbeat & Clinical Audio Manager
 * Generates synthetic acoustic pulses via HTML5 Web Audio API.
 * Zero external audio assets (100% reliable, zero 404 risk).
 * Strictly opt-in (defaults to OFF). Never autoplays.
 */

class AudioManager {
  constructor() {
    this.audioCtx = null;
    this.isEnabled = false;
    this.listeners = new Set();
  }

  initContext() {
    if (!this.audioCtx && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioCtx = new AudioContextClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  toggle() {
    this.isEnabled = !this.isEnabled;
    if (this.isEnabled) {
      this.initContext();
      this.playHeartbeat(0.12);
    }
    this.notifyListeners();
    return this.isEnabled;
  }

  setEnabled(state) {
    this.isEnabled = !!state;
    if (this.isEnabled) {
      this.initContext();
    }
    this.notifyListeners();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notifyListeners() {
    this.listeners.forEach((fn) => fn(this.isEnabled));
  }

  /**
   * Play an authentic bi-phasic subtle ECG heartbeat blip ("lub-dub")
   */
  playHeartbeat(volume = 0.08) {
    if (!this.isEnabled) return;
    this.initContext();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;

      // 1. "Lub" - Lower frequency thump
      this.createPulse(now, 58, 0.09, volume * 0.9);

      // 2. "Dub" - Slightly higher frequency follow-up ~120ms later
      this.createPulse(now + 0.12, 76, 0.08, volume * 0.7);
    } catch {
      // Audio playback failsafe
    }
  }

  /**
   * Subtle high-tech confirmation chime (e.g. Booking confirmed / Step complete)
   */
  playConfirmation(volume = 0.08) {
    if (!this.isEnabled) return;
    this.initContext();
    if (!this.audioCtx) return;

    try {
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.15);

      gain.gain.setValueAtTime(volume * 0.8, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.26);
    } catch {
      // Audio failsafe
    }
  }

  createPulse(startTime, frequency, duration, gainLevel) {
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();
    const filter = this.audioCtx.createBiquadFilter();

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(140, startTime);

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(frequency, startTime);
    osc.frequency.exponentialRampToValueAtTime(frequency * 0.6, startTime + duration);

    gain.gain.setValueAtTime(0.0001, startTime);
    gain.gain.linearRampToValueAtTime(gainLevel, startTime + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.02);
  }
}

export const audioManager = new AudioManager();
