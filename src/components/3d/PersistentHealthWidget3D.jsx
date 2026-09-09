import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X } from 'lucide-react';
import { isReducedMotionPreferred, isTouchDevice } from '../../utils/animationTokens';

/**
 * Unified Single-Line Clinical HUD Bar:
 * Combines 3D Hologram, Telemetry Stats, Dynamic LED Equalizer Bars,
 * and Calm Breathing into a single horizontal glass pill bar.
 */
export default function PersistentHealthWidget3D() {
  const [visible, setVisible] = useState(false);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [ledHeights, setLedHeights] = useState([40, 60, 80, 45, 65]);
  const [breathingOpen, setBreathingOpen] = useState(false);
  const [breathingPhase, setBreathingPhase] = useState('Inhale');
  const [countdown, setCountdown] = useState(4);

  const canvasRef = useRef(null);
  const velocityRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const lastTimeRef = useRef(performance.now());

  // Breathing 4-7-8 timer
  useEffect(() => {
    if (!breathingOpen || isReducedMotionPreferred()) return;

    let timer;
    if (breathingPhase === 'Inhale') {
      timer = setTimeout(() => {
        setBreathingPhase('Hold');
        setCountdown(7);
      }, 4000);
    } else if (breathingPhase === 'Hold') {
      timer = setTimeout(() => {
        setBreathingPhase('Exhale');
        setCountdown(8);
      }, 7000);
    } else if (breathingPhase === 'Exhale') {
      timer = setTimeout(() => {
        setBreathingPhase('Inhale');
        setCountdown(4);
      }, 8000);
    }

    return () => clearTimeout(timer);
  }, [breathingPhase, breathingOpen]);

  useEffect(() => {
    if (!breathingOpen) return;
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 1 ? prev - 1 : 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [breathingOpen]);

  useEffect(() => {
    if (isReducedMotionPreferred() || isTouchDevice()) return;

    let animFrameId;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;

      const afterHero = scrollY > 500;
      const beforeFooter = scrollY + winHeight < docHeight - 650;

      setVisible(afterHero && beforeFooter);

      const now = performance.now();
      const dt = Math.max(1, now - lastTimeRef.current);
      const dy = Math.abs(scrollY - lastScrollYRef.current);
      const speed = (dy / dt) * 50;

      velocityRef.current = Math.min(100, velocityRef.current + speed);
      lastScrollYRef.current = scrollY;
      lastTimeRef.current = now;
    };

    const updateLoop = () => {
      velocityRef.current *= 0.92;
      if (velocityRef.current < 0.1) velocityRef.current = 0;
      setScrollVelocity(velocityRef.current);

      const t = Date.now() / 150;
      const v = velocityRef.current;
      setLedHeights([
        Math.min(100, 25 + Math.sin(t) * 20 + v * 0.75),
        Math.min(100, 45 + Math.sin(t + 1.2) * 30 + v * 0.9),
        Math.min(100, 70 + Math.sin(t + 2.4) * 25 + v * 1.1),
        Math.min(100, 35 + Math.sin(t + 3.6) * 25 + v * 0.8),
        Math.min(100, 55 + Math.sin(t + 4.8) * 35 + v * 1.0),
      ]);

      animFrameId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    animFrameId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  useEffect(() => {
    if (!visible || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 5.6;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(56, 56);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x00c2cb, 2.5);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const group = new THREE.Group();
    scene.add(group);

    const torusGeo = new THREE.TorusGeometry(1.4, 0.15, 16, 32);
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0x2f80ed,
      metalness: 0.4,
      roughness: 0.2,
      wireframe: true,
    });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    group.add(torus);

    const coreGeo = new THREE.SphereGeometry(0.65, 16, 16);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x00c2cb,
      roughness: 0.1,
      metalness: 0.6,
      emissive: 0x005577,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const speedBoost = velocityRef.current * 0.0012;

      group.rotation.x += 0.015 + speedBoost;
      group.rotation.y += 0.025 + speedBoost * 1.5;
      torus.rotation.z += 0.01 + speedBoost;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      renderer.dispose();
      torusGeo.dispose();
      torusMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 hidden lg:block select-none">
      <AnimatePresence>
        {breathingOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 15 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="w-72 p-5 mb-3 rounded-3xl bg-[#050C17]/95 text-white border border-cyan-400/40 shadow-[0_16px_40px_rgba(0,0,0,0.7),0_0_30px_rgba(0,240,255,0.25)] backdrop-blur-2xl relative"
          >
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono font-bold tracking-wider text-cyan-300 uppercase">
                  4-7-8 Breathing
                </span>
              </div>
              <button
                onClick={() => setBreathingOpen(false)}
                className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Close"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex flex-col items-center justify-center py-4">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <motion.div
                  animate={{
                    scale: breathingPhase === 'Inhale' ? 1.35 : breathingPhase === 'Hold' ? 1.35 : 0.85,
                    opacity: breathingPhase === 'Inhale' ? 0.6 : breathingPhase === 'Hold' ? 0.8 : 0.3,
                  }}
                  transition={{
                    duration: breathingPhase === 'Inhale' ? 4 : breathingPhase === 'Hold' ? 0.5 : 8,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#00F0FF]/30 to-[#7B5CFA]/30 blur-md pointer-events-none"
                />

                <motion.div
                  animate={{
                    scale: breathingPhase === 'Inhale' ? 1.25 : breathingPhase === 'Hold' ? 1.25 : 0.8,
                    borderColor:
                      breathingPhase === 'Inhale'
                        ? '#00F0FF'
                        : breathingPhase === 'Hold'
                          ? '#10B981'
                          : '#7B5CFA',
                  }}
                  transition={{
                    duration: breathingPhase === 'Inhale' ? 4 : breathingPhase === 'Hold' ? 0.5 : 8,
                    ease: 'easeInOut',
                  }}
                  className="w-24 h-24 rounded-full border-2 border-cyan-400 bg-gradient-to-b from-[#00F0FF]/15 to-transparent flex flex-col items-center justify-center text-center shadow-[0_0_25px_rgba(0,240,255,0.3)]"
                >
                  <span className="text-sm font-bold tracking-wide font-mono text-white">
                    {breathingPhase}
                  </span>
                  <span className="text-xs font-mono text-cyan-300 font-black">
                    {countdown}s
                  </span>
                </motion.div>
              </div>

              <p className="text-[11px] text-gray-400 font-sans text-center mt-3 leading-relaxed">
                {breathingPhase === 'Inhale' && 'Slowly breathe in through your nose...'}
                {breathingPhase === 'Hold' && 'Hold your breath calmly and relax your shoulders.'}
                {breathingPhase === 'Exhale' && 'Gently release all air through your mouth...'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <aside
        aria-label="Health status indicator"
        className="flex items-center gap-3 py-1.5 px-3.5 pr-4 rounded-full bg-[#050C17]/90 text-white backdrop-blur-2xl border border-cyan-500/40 shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_25px_rgba(0,240,255,0.2)] hover:border-cyan-400 hover:shadow-[0_8px_40px_rgba(0,240,255,0.35)] transition-all duration-300 animate-in fade-in slide-in-from-bottom-3 relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

        <div className="w-7 h-7 rounded-full bg-gradient-to-b from-cyan-950/80 to-blue-950/60 flex items-center justify-center overflow-hidden border border-cyan-400/50 relative shrink-0 shadow-[0_0_12px_rgba(0,240,255,0.4)]">
          <canvas ref={canvasRef} className="w-full h-full block" />
          <span
            className={`absolute inset-0 rounded-full border border-cyan-400/50 transition-opacity duration-300 ${scrollVelocity > 5 ? 'opacity-100 animate-ping' : 'opacity-0'
              }`}
          />
        </div>

        <div className="flex items-center gap-1.5 bg-cyan-950/70 px-2 py-0.5 rounded-full border border-cyan-500/40 shadow-[inset_0_0_8px_rgba(0,240,255,0.2)]">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#10B981]" />
          <span className="font-mono text-[9px] font-extrabold tracking-wider text-cyan-300 uppercase">
            {scrollVelocity > 20 ? 'SYNCING...' : 'HUD ACTIVE'}
          </span>
        </div>

        <div className="flex items-center gap-1.5 font-mono text-[11px]">
          <span className="font-semibold text-white">99.4%</span>
          <span className="text-cyan-400/60">•</span>
          <span className="text-cyan-300 font-medium">
            {Math.round(72 + scrollVelocity * 0.15)} BPM
          </span>
        </div>

        <div className="flex items-end gap-[3px] h-3.5 border-l border-cyan-500/30 pl-2.5">
          {ledHeights.map((val, idx) => (
            <div
              key={idx}
              className="w-1 rounded-full bg-cyan-950/80 overflow-hidden flex flex-col justify-end h-full"
            >
              <div
                className={`w-full transition-all duration-75 rounded-full ${val > 75
                    ? 'bg-gradient-to-t from-cyan-400 via-emerald-400 to-amber-300 shadow-[0_0_8px_#10B981]'
                    : val > 45
                      ? 'bg-gradient-to-t from-cyan-500 to-emerald-400 shadow-[0_0_6px_#00F0FF]'
                      : 'bg-gradient-to-t from-blue-600 to-cyan-400 shadow-[0_0_4px_#00C2CB]'
                  }`}
                style={{ height: `${val}%` }}
              />
            </div>
          ))}
        </div>

        <div className="border-l border-cyan-500/30 pl-2.5">
          <button
            onClick={() => setBreathingOpen(!breathingOpen)}
            className="flex items-center gap-1.5 text-xs text-gray-300 hover:text-white transition-colors group/btn"
            title="Take a calm moment with the 4-7-8 Breathing Companion"
          >
            <Heart className="w-3.5 h-3.5 text-cyan-400 group-hover/btn:scale-110 transition-transform" />
            <span className="font-sans text-[11px] font-medium">Calm Breathing</span>
          </button>
        </div>
      </aside>
    </div>
  );
}
