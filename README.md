# Aurelia Healthcare — Signature 3D Background System & Interactive Features

Aurelia Healthcare features an ambient, full-page 3D WebGL background layer running behind every section, paired with subtle, high-craft interactive details designed to evoke an advanced medical command center while maintaining clinical usability, accessibility, and high performance.

---

## 🚀 Part 1: Persistent Full-Page 3D Background System

Mounted once at the application root (`src/components/3d/AmbientBackgroundCanvas.jsx`) with `fixed inset-0 -z-10 pointer-events-none`:

1. **Ambient Neural / Synapse Field**:
   - Sparse network of 60–110 glowing nodes connected by faint animated line segments (opacity 0.08–0.15).
   - Occasional traveling action-potential light pulse firing along random edges every few seconds.
2. **Particle DNA Helix Drift**:
   - Diagonal double-helix particle points drifting slowly (~90s full rotation).
   - Subtle scroll parallax for depth cues behind glassmorphic cards.
3. **Volumetric Depth Fog**:
   - Soft, large, low-contrast atmospheric planes drifting in teal/cyan.
4. **Section-Reactive Background Shader / Tint**:
   - Driven by Zustand (`src/store/useBackgroundTheme.js`).
   - Smooth 2–3s crossfades based on in-viewport section:
     - **Hero / General**: Teal / Cyan (`#00F0FF`)
     - **Cardiology / Services**: Warm red-tinted pulse (`#FF4D6D`)
     - **Neurology / About**: Cyan synapse emphasis (`#00F0FF` / `#7B5CFA`)
     - **Oncology / Faculty**: Soft violet tint (`#9D4EDD`)
     - **Emergency / Intake**: Crimson undertone (`#EF4444`)
5. **Floating 3D Medical Iconography**:
   - Wireframe models (molecule, DNA, pulse torus, caduceus) drifting in the deepest z-plane.

---

## 🎛️ Part 2: Signature Interactive Details & How to Disable Them

All features are independently toggleable via **`src/config/featureFlags.js`**. You can turn any individual effect off without altering any component code:

```javascript
// src/config/featureFlags.js
export const FEATURE_FLAGS = {
  AMBIENT_3D_BACKGROUND: true,    // Persistent 3D WebGL Canvas
  LIVE_VITALS_TICKER: true,       // Top soft-updating clinical vitals strip
  CIRCADIAN_HERO_GRADIENT: true,  // Time-of-day dynamic hero backdrop
  MRI_SCAN_HERO_REVEAL: true,     // Initial page load MRI laser sweep reveal
  NEURAL_TRACE_OVERLAY: true,     // Light arc from AI chat to organ atlas / cards
  CURSOR_SYNAPSE_TRAIL: true,     // Synapse spark trail in #hero & #services
  BREATHING_COMPANION: true,      // 4-7-8 calming breathing circle widget
  HEARTBEAT_EASTER_EGG: true,     // 5-click defibrillator charging easter egg
};
```

### Feature Details:
- **`LiveVitalsTicker.jsx`**: Slim persistent strip with simulated real-time hospital operations metrics ("Surgeries Completed Today", "Triaged Intake", "Surgical Air Index").
- **`CircadianHeroGradient.jsx`**: Client-side `Date().getHours()` mapping to local circadian lighting: Sunrise gold (5–9), Daylight teal (9–17), Dusk rose (17–21), Midnight indigo (21–5).
- **`MriScanLineHeroReveal.jsx`**: Sweeps a diagnostic MRI laser line from top to bottom on initial entrance.
- **`NeuralTraceOverlay.jsx`**: When symptoms are sent in `AIHealthAssistantOrb`, fires an energetic photon arc across the viewport into the matching specialist card.
- **`CursorSynapseTrail.jsx`**: Localized neuron spark particles in `#hero` and `#services`. Disabled on touch devices.
- **`BreathingCompanion.jsx`**: Collapsible floating widget near emergency CTA with calibrated 4-7-8 rhythm (Inhale 4s, Hold 7s, Exhale 8s).
- **`Heartbeat Easter Egg`**: Clicking the hero's "HEART RATE: 72 BPM" HUD tag 5 times triggers a `DEFIBRILLATOR: CHARGING... CLEAR! ⚡` visual discharge and thank-you confirmation.

---

## ⚡ Performance Budget Assumptions

- **Single Canvas Instance**: Runs a single WebGL context across the entire page rather than per-section canvases.
- **Particle & Geometry Budget**:
  - Desktop: ~110 neural nodes, ~320 DNA particles, 4 low-poly wireframes.
  - Mobile / Touch: Automatically scaled down to 60 nodes and lower geometry complexity.
- **Tab Visibility Pause**: Listens to `document.visibilitychange` to halt `requestAnimationFrame` loops when the user switches tabs, dropping CPU/GPU usage to 0%.
- **LCP Protection**: Canvas is lazily mounted after the first paint (60ms delay) so hero text and primary CTAs render instantly without blocking First Contentful Paint.
- **Touch-Device Guard**: Hardware touch detection (`isTouchDevice()`) disables heavy cursor spark tracking and enables low-power WebGL flags.

---

## ♿ Accessibility & `prefers-reduced-motion`

All new components strictly respect the user's OS-level motion preference (`prefers-reduced-motion: reduce`):
- `AmbientBackgroundCanvas.jsx`: Bypasses WebGL animation loops entirely and renders a static, soft radial gradient.
- `MriScanLineHeroReveal.jsx`: Instantly completes without running the laser sweep.
- `CursorSynapseTrail.jsx`: Completely disabled.
- `NeuralTraceOverlay.jsx`: Bypasses animation and applies static focus highlighting.
- `LiveVitalsTicker.jsx`: Renders static baseline numbers without ticking intervals.
- `BreathingCompanion.jsx`: Disables pulsing motion rings.
- Real medical information and emergency CTAs are never obscured or delayed.
