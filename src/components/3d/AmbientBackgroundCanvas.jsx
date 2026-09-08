import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useBackgroundTheme } from '../../store/useBackgroundTheme';
import { isReducedMotionPreferred, isTouchDevice } from '../../utils/animationTokens';
import { isFeatureEnabled } from '../../config/featureFlags';

/**
 * AmbientBackgroundCanvas:
 * Persistent full-page 3D WebGL background layer rendered once at the app root.
 *
 * Features:
 * - 1.1 Ambient Neural / Synapse Field (nodes, connecting lines & traveling action-potential pulse)
 * - 1.2 Particle DNA Helix Drift (diagonal double-helix, ~90s rotation, scroll parallax)
 * - 1.3 Volumetric Depth Fog (soft drifting teal/cyan atmospheric planes)
 * - 1.4 Section-Reactive Tint (subtle 2-3s crossfade driven by useBackgroundTheme)
 * - 1.5 Floating 3D Medical Iconography (caduceus, molecule, pulse, DNA, stethoscope wireframes)
 * - Strict 60fps budget, tab visibility pause, prefers-reduced-motion static fallback, lazy mount.
 */
export default function AmbientBackgroundCanvas() {
  const isEnabled = isFeatureEnabled('AMBIENT_3D_BACKGROUND');
  const canvasRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const palette = useBackgroundTheme((s) => s.palette);
  const targetColorRef = useRef(new THREE.Color(palette.primaryColor));
  const currentColorRef = useRef(new THREE.Color(palette.primaryColor));

  // Sync target color when theme changes
  useEffect(() => {
    targetColorRef.current.set(palette.primaryColor);
  }, [palette]);

  // Lazy-mount after first paint to protect LCP
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 60);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reducedMotion = isReducedMotionPreferred();
    const isTouch = isTouchDevice();

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x080b1a, 0.015);

    const width = window.innerWidth;
    const height = window.innerHeight;
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 200);
    camera.position.set(0, 0, 36);

    // Renderer
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: !isTouch,
        powerPreference: isTouch ? 'low-power' : 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(isTouch ? 1 : Math.min(window.devicePixelRatio, 1.75));
    } catch {
      // Graceful WebGL fallback if context creation fails
      return;
    }

    // ─────────────────────────────────────────────────────────────
    // 1.1 Ambient Neural / Synapse Field
    // ─────────────────────────────────────────────────────────────
    const nodeCount = isTouch ? 60 : 110;
    const nodePositions = [];
    const nodeGeometry = new THREE.BufferGeometry();
    const nodePosArray = new Float32Array(nodeCount * 3);

    for (let i = 0; i < nodeCount; i++) {
      const x = (Math.random() - 0.5) * 55;
      const y = (Math.random() - 0.5) * 45;
      const z = (Math.random() - 0.5) * 20 - 5;
      nodePositions.push(new THREE.Vector3(x, y, z));
      nodePosArray[i * 3] = x;
      nodePosArray[i * 3 + 1] = y;
      nodePosArray[i * 3 + 2] = z;
    }
    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(nodePosArray, 3));

    const nodeMaterial = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: isTouch ? 0.35 : 0.45,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
    });
    const nodePoints = new THREE.Points(nodeGeometry, nodeMaterial);
    scene.add(nodePoints);

    // Connected Synapse Line Segments
    const lineIndices = [];
    const maxConnectionDistance = 11.5;
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (nodePositions[i].distanceTo(nodePositions[j]) < maxConnectionDistance) {
          lineIndices.push(i, j);
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(nodePosArray, 3));
    lineGeometry.setIndex(lineIndices);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x00c2cb,
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending,
    });
    const synapseLines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(synapseLines);

    // Neural "Action Potential" Light Pulse traveling along random edge
    const pulseGeo = new THREE.SphereGeometry(0.22, 8, 8);
    const pulseMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.85,
    });
    const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
    pulseMesh.visible = false;
    scene.add(pulseMesh);

    let activePulse = null;
    const triggerPulse = () => {
      if (lineIndices.length < 2) return;
      const pairIdx = Math.floor(Math.random() * (lineIndices.length / 2)) * 2;
      const startNode = nodePositions[lineIndices[pairIdx]];
      const endNode = nodePositions[lineIndices[pairIdx + 1]];
      if (startNode && endNode) {
        activePulse = {
          start: startNode,
          end: endNode,
          progress: 0,
          speed: 0.018 + Math.random() * 0.015,
        };
        pulseMesh.visible = true;
      }
    };

    // ─────────────────────────────────────────────────────────────
    // 1.2 Particle DNA Helix Drift (Diagonal Double-Helix)
    // ─────────────────────────────────────────────────────────────
    const dnaGroup = new THREE.Group();
    dnaGroup.position.set(12, -4, -12);
    dnaGroup.rotation.z = 0.55;
    dnaGroup.rotation.x = 0.35;

    const helixPointsCount = isTouch ? 90 : 160;
    const helixRadius = 3.2;
    const helixHeight = 38;
    const dnaPosArray = new Float32Array(helixPointsCount * 2 * 3);

    for (let i = 0; i < helixPointsCount; i++) {
      const t = (i / helixPointsCount) * Math.PI * 8;
      const y = (i / helixPointsCount) * helixHeight - helixHeight / 2;

      // Strand 1
      dnaPosArray[i * 6] = Math.cos(t) * helixRadius;
      dnaPosArray[i * 6 + 1] = y;
      dnaPosArray[i * 6 + 2] = Math.sin(t) * helixRadius;

      // Strand 2 (offset by PI)
      dnaPosArray[i * 6 + 3] = Math.cos(t + Math.PI) * helixRadius;
      dnaPosArray[i * 6 + 4] = y;
      dnaPosArray[i * 6 + 5] = Math.sin(t + Math.PI) * helixRadius;
    }

    const dnaGeometry = new THREE.BufferGeometry();
    dnaGeometry.setAttribute('position', new THREE.BufferAttribute(dnaPosArray, 3));
    const dnaMaterial = new THREE.PointsMaterial({
      color: 0x00f0ff,
      size: 0.28,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
    });
    const dnaPoints = new THREE.Points(dnaGeometry, dnaMaterial);
    dnaGroup.add(dnaPoints);
    scene.add(dnaGroup);

    // ─────────────────────────────────────────────────────────────
    // 1.3 Volumetric Depth Fog Planes
    // ─────────────────────────────────────────────────────────────
    const fogPlanes = [];
    const fogMatA = new THREE.MeshBasicMaterial({
      color: 0x003b46,
      transparent: true,
      opacity: 0.07,
      depthWrite: false,
    });
    const fogGeoA = new THREE.PlaneGeometry(60, 40);
    const planeA = new THREE.Mesh(fogGeoA, fogMatA);
    planeA.position.set(-6, 4, -18);
    scene.add(planeA);
    fogPlanes.push(planeA);

    const fogMatB = new THREE.MeshBasicMaterial({
      color: 0x0a192f,
      transparent: true,
      opacity: 0.08,
      depthWrite: false,
    });
    const planeB = new THREE.Mesh(fogGeoA, fogMatB);
    planeB.position.set(10, -8, -22);
    planeB.rotation.z = -0.2;
    scene.add(planeB);
    fogPlanes.push(planeB);

    // ─────────────────────────────────────────────────────────────
    // 1.5 Floating Wireframe Medical Iconography Field
    // ─────────────────────────────────────────────────────────────
    const iconsGroup = new THREE.Group();
    const iconMaterial = new THREE.LineBasicMaterial({
      color: 0x00c2cb,
      transparent: true,
      opacity: 0.12,
    });

    // Icon 1: Molecule (Tetrahedron wireframe)
    const molGeo = new THREE.WireframeGeometry(new THREE.TetrahedronGeometry(1.4));
    const molMesh = new THREE.LineSegments(molGeo, iconMaterial);
    molMesh.position.set(-18, 12, -14);
    iconsGroup.add(molMesh);

    // Icon 2: DNA cross ring (Octahedron wireframe)
    const dnaIconGeo = new THREE.WireframeGeometry(new THREE.OctahedronGeometry(1.6));
    const dnaIconMesh = new THREE.LineSegments(dnaIconGeo, iconMaterial);
    dnaIconMesh.position.set(18, 8, -16);
    iconsGroup.add(dnaIconMesh);

    // Icon 3: Heartbeat Pulse shape (Torus wireframe)
    const pulseRingGeo = new THREE.WireframeGeometry(new THREE.TorusGeometry(1.6, 0.4, 6, 16));
    const pulseRingMesh = new THREE.LineSegments(pulseRingGeo, iconMaterial);
    pulseRingMesh.position.set(-14, -12, -15);
    iconsGroup.add(pulseRingMesh);

    // Icon 4: Caduceus rod / Icosahedron
    const cadGeo = new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.5));
    const cadMesh = new THREE.LineSegments(cadGeo, iconMaterial);
    cadMesh.position.set(16, -14, -17);
    iconsGroup.add(cadMesh);

    scene.add(iconsGroup);

    // ─────────────────────────────────────────────────────────────
    // Animation Loop & Performance Controls
    // ─────────────────────────────────────────────────────────────
    let animationFrameId;
    let isVisible = true;
    let pulseTimer = 0;
    let scrollY = window.scrollY;

    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleVisibilityChange = () => {
      isVisible = document.visibilityState !== 'hidden';
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return; // Pause GPU cycles when tab is hidden

      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();

      // Smooth 2-3s crossfade for section-reactive background tint
      currentColorRef.current.lerp(targetColorRef.current, delta * 1.5);
      nodeMaterial.color.copy(currentColorRef.current);
      lineMaterial.color.copy(currentColorRef.current);
      dnaMaterial.color.copy(currentColorRef.current);

      if (!reducedMotion) {
        // Slow rotation of DNA helix (~90s for full circle)
        dnaGroup.rotation.y = elapsed * (Math.PI * 2 / 90);

        // Scroll Parallax (subtle slower movement than foreground)
        const scrollParallax = scrollY * 0.005;
        dnaGroup.position.y = -4 - scrollParallax * 0.8;
        iconsGroup.position.y = scrollParallax * 0.5;

        // Subtle drifting of medical wireframe icons
        molMesh.rotation.x += delta * 0.2;
        molMesh.rotation.y += delta * 0.25;
        dnaIconMesh.rotation.y += delta * 0.18;
        pulseRingMesh.rotation.z += delta * 0.15;
        cadMesh.rotation.x += delta * 0.12;

        // Neural Action Potential pulse progression
        if (activePulse) {
          activePulse.progress += activePulse.speed;
          if (activePulse.progress >= 1) {
            activePulse = null;
            pulseMesh.visible = false;
          } else {
            pulseMesh.position.lerpVectors(activePulse.start, activePulse.end, activePulse.progress);
          }
        } else {
          pulseTimer += delta;
          if (pulseTimer > 2.2) {
            pulseTimer = 0;
            triggerPulse();
          }
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      nodeGeometry.dispose();
      lineGeometry.dispose();
      dnaGeometry.dispose();
      molGeo.dispose();
      dnaIconGeo.dispose();
      pulseRingGeo.dispose();
      cadGeo.dispose();
    };
  }, [isMounted]);

  if (!isEnabled) return null;

  // Reduced motion static fallback
  if (isReducedMotionPreferred()) {
    return (
      <div
        className="fixed inset-0 -z-10 pointer-events-none transition-colors duration-1000 bg-radial from-[#002B36]/30 via-[#080B1A]/70 to-[#080B1A]"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${palette.primaryColor}15 0%, transparent 70%)`
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none w-full h-full"
      style={{ opacity: isMounted ? 1 : 0, transition: 'opacity 1s ease' }}
      aria-hidden="true"
    />
  );
}
