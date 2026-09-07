import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Brain, 
  Dna, 
  Activity, 
  Scan, 
  Sparkles, 
  ShieldCheck, 
  Volume2, 
  VolumeX, 
  ArrowRight, 
  Calendar,
  Zap,
  CheckCircle2,
  Sliders,
  Maximize2
} from 'lucide-react';

// Web Audio API Heartbeat Synthesizer
class HeartbeatAudioEngine {
  constructor() {
    this.ctx = null;
    this.intervalId = null;
    this.isPlaying = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playThump(frequency = 55, duration = 0.12, gainLevel = 0.25) {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.value = 140;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(gainLevel, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  start(bpm = 72) {
    this.init();
    this.stop();
    this.isPlaying = true;
    const intervalMs = (60 / bpm) * 1000;

    // Heart produces two distinct thumps: 'Lub' (S1) and 'Dub' (S2)
    const beat = () => {
      if (!this.isPlaying) return;
      this.playThump(60, 0.11, 0.22); // S1 Lub
      setTimeout(() => {
        if (!this.isPlaying) return;
        this.playThump(52, 0.09, 0.16); // S2 Dub
      }, 160);
    };

    beat();
    this.intervalId = setInterval(beat, intervalMs);
  }

  stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  updateBpm(bpm) {
    if (this.isPlaying) {
      this.start(bpm);
    }
  }
}

const audioEngine = new HeartbeatAudioEngine();

export default function BioTwinSection({ onOpenBooking, hospitalName = "Aetheria Health" }) {
  const [activeModel, setActiveModel] = useState('heart'); // 'heart' | 'brain' | 'dna'
  const [bpm, setBpm] = useState(72);
  const [isSoundOn, setIsSoundOn] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [diagnosticReport, setDiagnosticReport] = useState(null);

  const canvasRef = useRef(null);
  const animFrameIdRef = useRef(null);
  const threeStateRef = useRef({
    scene: null,
    renderer: null,
    camera: null,
    objectsGroup: null,
    heartMesh: null,
    brainPoints: null,
    dnaGroup: null,
    particles: null,
    clock: new THREE.Clock()
  });

  // Handle Audio toggle
  const toggleSound = () => {
    if (isSoundOn) {
      audioEngine.stop();
      setIsSoundOn(false);
    } else {
      audioEngine.start(bpm);
      setIsSoundOn(true);
    }
  };

  // Sync Audio when BPM changes
  useEffect(() => {
    if (isSoundOn) {
      audioEngine.updateBpm(bpm);
    }
  }, [bpm, isSoundOn]);

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      audioEngine.stop();
    };
  }, []);

  // Trigger Interactive Holographic Laser Scan
  const triggerLaserScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    setScanProgress(0);
    setDiagnosticReport(null);

    // Audio chime if enabled
    if (audioEngine.ctx) {
      audioEngine.playThump(90, 0.25, 0.3);
    }

    const duration = 2400; // 2.4s
    const startTime = performance.now();

    const updateScan = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setScanProgress(progress);

      if (progress < 1) {
        requestAnimationFrame(updateScan);
      } else {
        setIsScanning(false);
        setDiagnosticReport({
          status: "Optimal Alignment",
          accuracy: "99.8% Precision",
          findings: activeModel === 'heart'
            ? "Sinus rhythm regular. Hemodynamic aortic ejection fraction: 68% (Optimal). Zero arterial calcification detected."
            : activeModel === 'brain'
            ? "Neural synaptic latency: 1.2ms. Alpha wave synchronization at 10.4Hz. Frontal cortex perfusion balanced."
            : "Genomic telomere integrity: 94%. DNA repair response active. Zero oncogenic mutations detected across 320 loci.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        });
      }
    };

    requestAnimationFrame(updateScan);
  };

  // ===========================================================================
  // THREE.JS 3D PROCEDURAL MEDICAL VISUALIZER
  // ===========================================================================
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.clientWidth || 600;
    const height = canvas.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00c2cb, 3, 20);
    cyanLight.position.set(5, 5, 5);
    scene.add(cyanLight);

    const blueLight = new THREE.PointLight(0x2f80ed, 3.5, 20);
    blueLight.position.set(-5, -3, 4);
    scene.add(blueLight);

    const objectsGroup = new THREE.Group();
    scene.add(objectsGroup);

    // -------------------------------------------------------------
    // 1. PROCEDURAL 3D WIREFRAME & LATTICE HEART
    // -------------------------------------------------------------
    const heartShape = new THREE.Shape();
    // Mathematical heart parametric curve
    const x = 0, y = 0;
    heartShape.moveTo(x + 0.25, y + 0.25);
    heartShape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.2, y, x, y);
    heartShape.bezierCurveTo(x - 0.3, y, x - 0.3, y + 0.35, x - 0.3, y + 0.35);
    heartShape.bezierCurveTo(x - 0.3, y + 0.55, x - 0.1, y + 0.77, x + 0.25, y + 0.95);
    heartShape.bezierCurveTo(x + 0.6, y + 0.77, x + 0.8, y + 0.55, x + 0.8, y + 0.35);
    heartShape.bezierCurveTo(x + 0.8, y + 0.35, x + 0.8, y, x + 0.5, y);
    heartShape.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25);

    const extrudeSettings = {
      depth: 0.6,
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 2,
      bevelSize: 0.2,
      bevelThickness: 0.2
    };

    const heartGeo = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    heartGeo.center();
    const heartMat = new THREE.MeshStandardMaterial({
      color: 0x2f80ed,
      metalness: 0.2,
      roughness: 0.3,
      wireframe: true,
      transparent: true,
      opacity: 0.85
    });
    const heartInnerMat = new THREE.MeshPhongMaterial({
      color: 0x00c2cb,
      transparent: true,
      opacity: 0.45,
      shininess: 100
    });
    const heartMesh = new THREE.Group();
    const heartWire = new THREE.Mesh(heartGeo, heartMat);
    const heartSolid = new THREE.Mesh(heartGeo, heartInnerMat);
    heartSolid.scale.set(0.88, 0.88, 0.88);
    heartMesh.add(heartWire);
    heartMesh.add(heartSolid);
    heartMesh.scale.set(2.4, 2.4, 2.4);
    heartMesh.rotation.z = Math.PI; // Flip heart upright

    // -------------------------------------------------------------
    // 2. PROCEDURAL 3D NEURAL BRAIN NETWORK
    // -------------------------------------------------------------
    const brainGroup = new THREE.Group();
    const nodeCount = 180;
    const brainGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(nodeCount * 3);
    const colors = new Float32Array(nodeCount * 3);

    const col1 = new THREE.Color(0x2f80ed);
    const col2 = new THREE.Color(0x00c2cb);

    for (let i = 0; i < nodeCount; i++) {
      // Create double hemisphere distribution
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 1.8 + Math.random() * 0.35;

      const hemi = i % 2 === 0 ? 0.45 : -0.45;
      positions[i * 3] = (r * Math.sin(phi) * Math.cos(theta)) * 0.9 + hemi;
      positions[i * 3 + 1] = r * Math.cos(phi) * 1.1;
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta) * 1.3;

      const c = i % 2 === 0 ? col1 : col2;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    brainGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    brainGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pMaterial = new THREE.PointsMaterial({
      size: 0.16,
      vertexColors: true,
      transparent: true,
      opacity: 0.9
    });
    const brainPoints = new THREE.Points(brainGeo, pMaterial);
    brainGroup.add(brainPoints);

    // Neural connecting axon lines
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x2f80ed,
      transparent: true,
      opacity: 0.35
    });
    const lineGeo = new THREE.BufferGeometry();
    const linePos = [];
    for (let i = 0; i < nodeCount; i += 2) {
      for (let j = i + 1; j < Math.min(i + 4, nodeCount); j++) {
        linePos.push(
          positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
          positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
        );
      }
    }
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3));
    const axonLines = new THREE.LineSegments(lineGeo, lineMat);
    brainGroup.add(axonLines);

    // -------------------------------------------------------------
    // 3. PROCEDURAL 3D DNA DOUBLE HELIX
    // -------------------------------------------------------------
    const dnaGroup = new THREE.Group();
    const pairs = 24;
    const radius = 1.3;
    const length = 5.5;

    for (let i = 0; i < pairs; i++) {
      const t = (i / pairs) * Math.PI * 3.5;
      const py = ((i / pairs) - 0.5) * length;
      const px1 = Math.cos(t) * radius;
      const pz1 = Math.sin(t) * radius;
      const px2 = -px1;
      const pz2 = -pz1;

      // Base pair connector bar
      const barGeo = new THREE.CylinderGeometry(0.04, 0.04, radius * 2, 8);
      const barMat = new THREE.MeshPhongMaterial({
        color: i % 2 === 0 ? 0x2f80ed : 0x00c2cb,
        transparent: true,
        opacity: 0.6
      });
      const bar = new THREE.Mesh(barGeo, barMat);
      bar.position.set(0, py, 0);
      bar.rotation.z = Math.PI / 2;
      bar.rotation.y = -t;
      dnaGroup.add(bar);

      // Strand Node 1
      const sphereGeo = new THREE.SphereGeometry(0.14, 16, 16);
      const sphereMat1 = new THREE.MeshStandardMaterial({
        color: 0x2f80ed,
        metalness: 0.3,
        roughness: 0.2
      });
      const s1 = new THREE.Mesh(sphereGeo, sphereMat1);
      s1.position.set(px1, py, pz1);
      dnaGroup.add(s1);

      // Strand Node 2
      const sphereMat2 = new THREE.MeshStandardMaterial({
        color: 0x00c2cb,
        metalness: 0.3,
        roughness: 0.2
      });
      const s2 = new THREE.Mesh(sphereGeo, sphereMat2);
      s2.position.set(px2, py, pz2);
      dnaGroup.add(s2);
    }

    // Save refs for dynamic animation
    threeStateRef.current = {
      scene,
      renderer,
      camera,
      objectsGroup,
      heartMesh,
      brainGroup,
      dnaGroup,
      clock: new THREE.Clock()
    };

    // Responsive resize listener
    const handleResize = () => {
      if (!canvas) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      renderer.dispose();
    };
  }, []);

  // Switch active Three.js model in scene
  useEffect(() => {
    const { objectsGroup, heartMesh, brainGroup, dnaGroup } = threeStateRef.current;
    if (!objectsGroup) return;

    // Clear previous children
    while (objectsGroup.children.length > 0) {
      objectsGroup.remove(objectsGroup.children[0]);
    }

    if (activeModel === 'heart' && heartMesh) {
      objectsGroup.add(heartMesh);
    } else if (activeModel === 'brain' && brainGroup) {
      objectsGroup.add(brainGroup);
    } else if (activeModel === 'dna' && dnaGroup) {
      objectsGroup.add(dnaGroup);
    }
  }, [activeModel]);

  // Main Render Animation Loop with Dynamic BPM Expansion
  useEffect(() => {
    const animate = () => {
      animFrameIdRef.current = requestAnimationFrame(animate);

      const { renderer, scene, camera, objectsGroup, heartMesh, brainGroup, dnaGroup, clock } = threeStateRef.current;
      if (!renderer || !scene || !camera) return;

      const elapsedTime = clock.getElapsedTime();

      // Continuous gentle rotation
      if (objectsGroup) {
        objectsGroup.rotation.y = elapsedTime * 0.35;
      }

      // Dynamic Cardiac Contraction: Pulsing scaled to current BPM!
      if (activeModel === 'heart' && heartMesh) {
        const beatFrequency = (bpm / 60) * Math.PI * 2;
        // Systolic double contraction wave
        const systolic = Math.sin(elapsedTime * beatFrequency);
        const pulse = systolic > 0 ? Math.pow(systolic, 3) * 0.18 : 0;
        const baseScale = 2.4;
        heartMesh.scale.set(baseScale + pulse, baseScale + pulse, baseScale + pulse);
      }

      // Brain synaptic glow oscillation
      if (activeModel === 'brain' && brainGroup) {
        brainGroup.rotation.x = Math.sin(elapsedTime * 0.4) * 0.15;
      }

      // DNA continuous vertical progression
      if (activeModel === 'dna' && dnaGroup) {
        dnaGroup.rotation.z = Math.sin(elapsedTime * 0.5) * 0.1;
      }

      renderer.render(scene, camera);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [bpm, activeModel]);

  return (
    <section className="relative py-20 lg:py-28 bg-[#F8FBFF] dark:bg-[#07131E] overflow-hidden border-y border-blue-100/70 dark:border-gray-800 transition-colors">
      
      {/* Background Ambience & Grid */}
      <div className="pointer-events-none absolute inset-0 medical-mesh-bg opacity-50 dark:opacity-20" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-blue-500/10 via-cyan-400/10 to-transparent blur-3xl rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200/80 dark:border-blue-800 text-xs font-bold text-[#2F80ED] dark:text-blue-400 uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>EXCLUSIVE HOSPITAL 3D TELEMETRY LAB</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B2438] dark:text-white tracking-tight leading-tight mb-4">
            Interactive 3D Bio-Twin & Real-Time Vitals
          </h2>

          <p className="text-base text-[#4A6278] dark:text-gray-300 leading-relaxed">
            Experience our hospital’s digital twin diagnostic station. Explore real-time 3D anatomical models, adjust physiological rhythms, and test holographic laser triage in real time.
          </p>
        </div>

        {/* =====================================================================
            MAIN INTERACTIVE WORKSPACE
           ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* ===================================================================
              LEFT: 3D VIEWPORT STAGE WITH HOLOGRAPHIC SCANNER (7 cols)
             =================================================================== */}
          <div className="lg:col-span-7 relative">
            
            {/* Model Selector Pill Tabs */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/90 dark:bg-[#0D1E2E] border border-blue-100 dark:border-gray-800 shadow-sm backdrop-blur-md">
                <button
                  onClick={() => setActiveModel('heart')}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all ${
                    activeModel === 'heart'
                      ? 'bg-[#2F80ED] text-white shadow-md shadow-blue-500/25 scale-105'
                      : 'text-[#4A6278] dark:text-gray-300 hover:text-[#0B2438] dark:hover:text-white'
                  }`}
                >
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span>Cardiovascular Heart</span>
                </button>

                <button
                  onClick={() => setActiveModel('brain')}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all ${
                    activeModel === 'brain'
                      ? 'bg-[#2F80ED] text-white shadow-md shadow-blue-500/25 scale-105'
                      : 'text-[#4A6278] dark:text-gray-300 hover:text-[#0B2438] dark:hover:text-white'
                  }`}
                >
                  <Brain className="w-3.5 h-3.5" />
                  <span>Neural Synapses</span>
                </button>

                <button
                  onClick={() => setActiveModel('dna')}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all ${
                    activeModel === 'dna'
                      ? 'bg-[#2F80ED] text-white shadow-md shadow-blue-500/25 scale-105'
                      : 'text-[#4A6278] dark:text-gray-300 hover:text-[#0B2438] dark:hover:text-white'
                  }`}
                >
                  <Dna className="w-3.5 h-3.5" />
                  <span>Genomic DNA</span>
                </button>
              </div>

              <button
                onClick={toggleSound}
                className={`p-2.5 rounded-2xl border transition-all flex items-center gap-1.5 text-xs font-bold ${
                  isSoundOn
                    ? 'bg-rose-50 dark:bg-rose-950 text-rose-600 border-rose-200 dark:border-rose-800 shadow-sm animate-pulse'
                    : 'bg-white dark:bg-[#0D1E2E] text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-800 hover:border-blue-300'
                }`}
                title="Toggle Stethoscope Heartbeat Sound"
              >
                {isSoundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                <span className="hidden sm:inline">{isSoundOn ? 'Audio Pulse Active' : 'Stethoscope Audio'}</span>
              </button>
            </div>

            {/* 3D Canvas Stage Container with Specular Glass Frame */}
            <div className="relative rounded-[2.5rem] overflow-hidden bg-gradient-to-b from-white/95 via-blue-50/40 to-white/95 dark:from-[#0D1E2E] dark:via-[#091724] dark:to-[#0D1E2E] border-2 border-blue-200/80 dark:border-gray-700 shadow-2xl aspect-[4/3] flex items-center justify-center group">
              
              {/* Actual Three.js WebGL Canvas */}
              <canvas
                ref={canvasRef}
                className="w-full h-full cursor-grab active:cursor-grabbing block"
              />

              {/* Holographic Concentric Target Rings in Background */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="w-72 h-72 rounded-full border border-blue-400/20 border-dashed animate-spin" style={{ animationDuration: '24s' }} />
                <div className="absolute w-96 h-96 rounded-full border border-cyan-400/15 animate-spin" style={{ animationDuration: '36s', animationDirection: 'reverse' }} />
              </div>

              {/* Laser Scanning Holographic Plane Overlay */}
              {isScanning && (
                <div 
                  className="pointer-events-none absolute inset-x-0 z-30 transition-all duration-75"
                  style={{ top: `${scanProgress * 100}%` }}
                >
                  <div className="w-full h-1 bg-gradient-to-r from-transparent via-[#00C2CB] to-transparent shadow-[0_0_20px_#00C2CB,0_0_40px_#2F80ED]" />
                  <div className="w-full h-24 bg-gradient-to-b from-[#00C2CB]/20 to-transparent pointer-events-none" />
                </div>
              )}

              {/* Live Top-Left Vitals Pill (Inspired by the Reference Image!) */}
              <div className="absolute top-5 left-5 z-20 px-4 py-2.5 rounded-2xl bg-white/95 dark:bg-[#0D1E2E]/95 backdrop-blur-xl border border-white/90 dark:border-gray-700 shadow-lg shadow-blue-500/10 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-rose-50 dark:bg-rose-950 text-rose-500 flex items-center justify-center">
                  <Heart className={`w-5 h-5 fill-rose-500 ${bpm > 90 ? 'animate-ping' : 'animate-pulse'}`} />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-black text-[#0B2438] dark:text-white font-mono">
                      {bpm} BPM
                    </span>
                    <span className={`text-[10px] font-extrabold px-1.5 py-0.2 rounded-md ${
                      bpm <= 85 
                        ? 'text-emerald-700 bg-emerald-50 dark:bg-emerald-950' 
                        : 'text-amber-700 bg-amber-50 dark:bg-amber-950'
                    }`}>
                      {bpm <= 85 ? 'Normal' : 'Elevated'}
                    </span>
                  </div>
                  <div className="text-[10px] font-semibold text-[#4A6278] dark:text-gray-400">
                    Real-Time Vitals Active
                  </div>
                </div>
              </div>

              {/* Live Bottom-Right Hospital Telemetry Pill */}
              <div className="absolute bottom-5 right-5 z-20 px-4 py-2.5 rounded-2xl bg-white/95 dark:bg-[#0D1E2E]/95 backdrop-blur-xl border border-white/90 dark:border-gray-700 shadow-lg shadow-blue-500/10 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-900 text-[#2F80ED] flex items-center justify-center">
                  <Activity className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <span className="text-xs font-black text-[#0B2438] dark:text-white block font-mono">
                    {activeModel === 'heart' ? 'SpO2: 99.4%' : activeModel === 'brain' ? 'EEG: 10.4 Hz' : 'Codons: 3.2B'}
                  </span>
                  <span className="text-[10px] text-emerald-600 font-semibold">
                    Telemetry: Calibrated
                  </span>
                </div>
              </div>

              {/* Interactive Laser Scan Trigger Button */}
              <button
                type="button"
                onClick={triggerLaserScan}
                disabled={isScanning}
                className="absolute bottom-5 left-5 z-20 px-5 py-2.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-[#2F80ED] to-[#00C2CB] hover:shadow-lg hover:shadow-cyan-500/30 transition-all flex items-center gap-2 shadow-md hover:scale-105 active:scale-95 disabled:opacity-50"
              >
                <Scan className="w-4 h-4 animate-spin-slow" />
                <span>{isScanning ? `Scanning (${Math.round(scanProgress * 100)}%)...` : 'Run Holographic Scan'}</span>
              </button>

            </div>

            {/* Diagnostic Findings Banner if generated */}
            <AnimatePresence>
              {diagnosticReport && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 p-4 rounded-3xl bg-gradient-to-r from-emerald-50 via-white to-blue-50 dark:from-[#0E2A28] dark:via-[#0D1E2E] dark:to-[#0E2236] border-2 border-emerald-400 dark:border-emerald-600 shadow-xl flex items-start gap-3.5"
                >
                  <div className="w-9 h-9 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/20">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
                        {diagnosticReport.status} • {diagnosticReport.accuracy}
                      </h4>
                      <span className="text-[10px] font-mono text-gray-400">{diagnosticReport.timestamp}</span>
                    </div>
                    <p className="text-xs text-[#0B2438] dark:text-gray-200 mt-1 leading-relaxed font-medium">
                      {diagnosticReport.findings}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* ===================================================================
              RIGHT: INTERACTIVE TELEMETRY CONTROLS & HOSPITAL INTEGRATION (5 cols)
             =================================================================== */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Control Panel Box */}
            <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#0D1E2E] border-2 border-blue-200/80 dark:border-gray-700 shadow-xl space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-900 text-[#2F80ED] flex items-center justify-center">
                    <Sliders className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-[#0B2438] dark:text-white">
                      Physiological Telemetry Engine
                    </h3>
                    <span className="text-[11px] text-[#4A6278] dark:text-gray-400">
                      Live sync with hospital bedside monitors
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                  LIVE STREAM
                </span>
              </div>

              {/* Interactive Heart Rate / BPM Slider */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#0B2438] dark:text-white flex items-center gap-2">
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                    <span>Target Heart Rate Simulation</span>
                  </label>
                  <span className="text-sm font-mono font-black text-[#2F80ED] bg-blue-50 dark:bg-blue-950 px-2.5 py-0.5 rounded-xl border border-blue-200 dark:border-blue-800">
                    {bpm} BPM
                  </span>
                </div>

                <input
                  type="range"
                  min="55"
                  max="135"
                  value={bpm}
                  onChange={(e) => setBpm(Number(e.target.value))}
                  className="w-full h-2.5 bg-gray-100 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#2F80ED]"
                />

                <div className="flex justify-between text-[10px] font-bold text-[#4A6278] dark:text-gray-400 font-mono">
                  <span>55 BPM (Resting)</span>
                  <span>72 BPM (Optimal)</span>
                  <span>135 BPM (Exertion)</span>
                </div>
              </div>

              {/* Dynamic Live ECG Monitor Waveform Display */}
              <div className="p-4 rounded-2xl bg-[#091724] border border-gray-800 text-white space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400">
                  <span>LEAD II ECG TELEMETRY</span>
                  <span>SWEEP: 25mm/s</span>
                </div>

                {/* Animated ECG Waveform */}
                <div className="h-14 w-full relative overflow-hidden flex items-center">
                  <svg viewBox="0 0 400 60" className="w-full h-full text-emerald-400 stroke-current fill-none">
                    {/* Background medical grid */}
                    <defs>
                      <pattern id="ecg-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#ecg-grid)" />
                    
                    {/* Pulsing P-Q-R-S-T cardiac waveform */}
                    <path
                      d="M 0 30 L 50 30 L 60 25 L 70 30 L 85 30 L 95 8 L 105 52 L 115 28 L 125 32 L 135 30 L 155 18 L 175 30 L 250 30 L 260 25 L 270 30 L 285 30 L 295 8 L 305 52 L 315 28 L 325 32 L 335 30 L 355 18 L 375 30 L 400 30"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="animate-pulse"
                      style={{ filter: 'drop-shadow(0 0 6px #10b981)' }}
                    />
                  </svg>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-gray-400">P-R Interval: <strong className="text-white">160ms</strong></span>
                  <span className="text-gray-400">QRS Duration: <strong className="text-white">88ms</strong></span>
                  <span className="text-emerald-400 font-bold">Rhythm: Sinus</span>
                </div>
              </div>

              {/* Real-time Multi-Metric Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-[#122538] border border-gray-200 dark:border-gray-800">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Arterial Pressure</span>
                  <span className="text-sm font-black font-mono text-[#0B2438] dark:text-white">118 / 76 mmHg</span>
                  <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">Normotensive</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-gray-50 dark:bg-[#122538] border border-gray-200 dark:border-gray-800">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Cardiac Output</span>
                  <span className="text-sm font-black font-mono text-[#0B2438] dark:text-white">5.4 L / min</span>
                  <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">Ejection Frac: 68%</span>
                </div>
              </div>

              {/* Direct Booking Link for this organ */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onOpenBooking}
                  className="w-full py-3.5 rounded-2xl text-xs font-extrabold text-white bg-gradient-to-r from-[#2F80ED] to-[#1E6FD9] hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 group"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Telemetry Consultation with Specialist</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>

            {/* Department Leadership Trust Badge */}
            <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-[#0D1E2E] border border-blue-100 dark:border-gray-800 flex items-center gap-3 text-xs">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
              <p className="text-[#4A6278] dark:text-gray-300 text-[11px] leading-relaxed">
                Supervised by <strong className="text-[#0B2438] dark:text-white">Dr. Arthur Vance</strong> (Chair of Cardiovascular Innovation) & <strong className="text-[#0B2438] dark:text-white">Dr. Anya Sharma</strong> (Chief of Neurosciences).
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
