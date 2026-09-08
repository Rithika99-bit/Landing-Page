import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Activity, ShieldCheck } from 'lucide-react';
import { isReducedMotionPreferred, isTouchDevice } from '../../utils/animationTokens';

/**
 * PersistentHealthWidget3D:
 * When the user scrolls past the Hero into subsequent sections, the 3D hologram
 * migrates into a persistent mini clinical health-status widget in the corner.
 * Dissolves cleanly near the footer.
 */
export default function PersistentHealthWidget3D() {
  const [visible, setVisible] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Disable on reduced motion or small mobile screens for performance
    if (isReducedMotionPreferred() || isTouchDevice()) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;

      // Appears after hero (~500px) and dissolves near footer (~800px from bottom)
      const afterHero = scrollY > 500;
      const beforeFooter = scrollY + winHeight < docHeight - 650;

      setVisible(afterHero && beforeFooter);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!visible || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(72, 72);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x00c2cb, 2.5);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    // Mini DNA core / Crystalline Torus
    const group = new THREE.Group();
    scene.add(group);

    const torusGeo = new THREE.TorusGeometry(1.5, 0.16, 16, 32);
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0x2f80ed,
      metalness: 0.4,
      roughness: 0.2,
      wireframe: true,
    });
    const torus = new THREE.Mesh(torusGeo, torusMat);
    group.add(torus);

    const coreGeo = new THREE.SphereGeometry(0.7, 16, 16);
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
      group.rotation.x += 0.015;
      group.rotation.y += 0.025;
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
    <aside
      aria-label="Health status indicator"
      className="fixed bottom-6 left-6 z-40 hidden lg:flex items-center gap-3 p-2.5 pr-4 rounded-2xl bg-[#0B2438]/90 text-white backdrop-blur-xl border border-cyan-500/30 shadow-[0_12px_35px_rgba(0,194,203,0.25)] transition-all duration-500 animate-in fade-in slide-in-from-bottom-4"
    >
      <div className="w-12 h-12 rounded-xl bg-blue-950/60 flex items-center justify-center overflow-hidden border border-cyan-500/20 relative">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[10px] font-black tracking-wider text-cyan-300">
            BIOMETRIC HUD // ACTIVE
          </span>
        </div>
        <span className="text-[11px] font-semibold text-gray-200">
          Sync: 99.4% · 72 BPM
        </span>
      </div>
    </aside>
  );
}
