import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { ANATOMY_REGIONS } from '../../data/anatomyData';
import { RotateCw, Maximize2, Compass, Sparkles, Activity, ShieldCheck } from 'lucide-react';

/**
 * InteractiveAnatomy3D:
 * Central 3D anatomical human figure navigation element.
 * - Procedural holographic human anatomy with glowing internal organ nodes
 * - Beating heart pulse, breathing lungs, neural cranial glow
 * - Vertical animated laser medical scan line
 * - 360° orbital rotation, drag controls, and view presets
 * - Click & hover raycasting mapping 12 body regions to specialties
 * - Responsive mobile anatomical switchboard
 */
export default function InteractiveAnatomy3D({
  selectedRegion,
  hoveredRegion,
  onSelectRegion,
  onHoverRegion,
}) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const bodyGroupRef = useRef(null);
  const hotspotsMapRef = useRef([]);
  const organMeshesRef = useRef({});
  const scanLineRef = useRef(null);
  const isDraggingRef = useRef(false);
  const previousMousePosRef = useRef({ x: 0, y: 0 });
  const autoRotateRef = useRef(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const [viewAngle, setViewAngle] = useState('front'); // 'front' | 'back' | 'iso'

  // Sync ref with state
  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  // Handle 3D Scene Initialization
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 640;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.8, 11.5);
    cameraRef.current = camera;

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lights: High-tech soft clinical illumination
    const ambientLight = new THREE.AmbientLight(0xdceeff, 1.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x2f80ed, 2.4);
    keyLight.position.set(5, 8, 8);
    scene.add(keyLight);

    const cyanRim = new THREE.DirectionalLight(0x00c2cb, 2.0);
    cyanRim.position.set(-6, -4, -6);
    scene.add(cyanRim);

    const backGlow = new THREE.PointLight(0x3b82f6, 1.5, 20);
    backGlow.position.set(0, 2, -4);
    scene.add(backGlow);

    // 5. Main Anatomical Body Group
    const bodyGroup = new THREE.Group();
    bodyGroupRef.current = bodyGroup;
    scene.add(bodyGroup);

    // Human Holographic Silhouette Materials
    const glassBodyMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x99ccff,
      transparent: true,
      opacity: 0.18,
      roughness: 0.1,
      metalness: 0.2,
      transmission: 0.6,
      ior: 1.3,
      thickness: 0.8,
      wireframe: false,
    });

    const wireframeBodyMaterial = new THREE.MeshBasicMaterial({
      color: 0x2f80ed,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });

    const innerSkeletonMaterial = new THREE.MeshStandardMaterial({
      color: 0x00c2cb,
      roughness: 0.3,
      metalness: 0.4,
      transparent: true,
      opacity: 0.45,
    });

    // --- Build Procedural Anatomical Human Form ---
    const addBodyPart = (geometry, pos, material = glassBodyMaterial, addWireframe = true) => {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(pos.x, pos.y, pos.z);
      bodyGroup.add(mesh);

      if (addWireframe) {
        const wireMesh = new THREE.Mesh(geometry, wireframeBodyMaterial);
        wireMesh.position.copy(mesh.position);
        wireMesh.scale.multiplyScalar(1.002);
        bodyGroup.add(wireMesh);
      }
      return mesh;
    };

    // Head (Cranium)
    const headGeom = new THREE.SphereGeometry(0.72, 32, 24);
    headGeom.scale(1, 1.25, 1.1);
    addBodyPart(headGeom, { x: 0, y: 3.35, z: 0 });

    // Neck
    const neckGeom = new THREE.CylinderGeometry(0.32, 0.38, 0.65, 20);
    addBodyPart(neckGeom, { x: 0, y: 2.5, z: 0 });

    // Chest / Thorax
    const thoraxGeom = new THREE.CylinderGeometry(1.25, 0.95, 1.5, 24);
    thoraxGeom.scale(1.2, 1, 0.7);
    addBodyPart(thoraxGeom, { x: 0, y: 1.6, z: 0 });

    // Abdomen / Lumbar
    const abdomenGeom = new THREE.CylinderGeometry(0.95, 1.05, 1.3, 24);
    abdomenGeom.scale(1.15, 1, 0.65);
    addBodyPart(abdomenGeom, { x: 0, y: 0.4, z: 0 });

    // Pelvis
    const pelvisGeom = new THREE.CylinderGeometry(1.05, 0.85, 0.9, 24);
    pelvisGeom.scale(1.18, 1, 0.75);
    addBodyPart(pelvisGeom, { x: 0, y: -0.5, z: 0 });

    // Spinal Column (Central Nervous Core)
    const spineGeom = new THREE.CylinderGeometry(0.08, 0.08, 4.2, 12);
    addBodyPart(spineGeom, { x: 0, y: 1.2, z: -0.15 }, innerSkeletonMaterial, false);

    // Left Arm
    const shoulderL = addBodyPart(new THREE.SphereGeometry(0.32, 16, 16), { x: -1.45, y: 2.1, z: 0 });
    const upperArmL = addBodyPart(new THREE.CylinderGeometry(0.25, 0.22, 1.3, 16), { x: -1.6, y: 1.35, z: 0 });
    upperArmL.rotation.z = -0.15;
    const forearmL = addBodyPart(new THREE.CylinderGeometry(0.2, 0.16, 1.3, 16), { x: -1.8, y: 0.15, z: 0.05 });
    forearmL.rotation.z = -0.12;

    // Right Arm
    const shoulderR = addBodyPart(new THREE.SphereGeometry(0.32, 16, 16), { x: 1.45, y: 2.1, z: 0 });
    const upperArmR = addBodyPart(new THREE.CylinderGeometry(0.25, 0.22, 1.3, 16), { x: 1.6, y: 1.35, z: 0 });
    upperArmR.rotation.z = 0.15;
    const forearmR = addBodyPart(new THREE.CylinderGeometry(0.2, 0.16, 1.3, 16), { x: 1.8, y: 0.15, z: 0.05 });
    forearmR.rotation.z = 0.12;

    // Left Leg
    const upperLegL = addBodyPart(new THREE.CylinderGeometry(0.42, 0.32, 1.9, 20), { x: -0.55, y: -1.75, z: 0 });
    upperLegL.rotation.z = 0.04;
    const kneeL = addBodyPart(new THREE.SphereGeometry(0.26, 16, 16), { x: -0.58, y: -2.75, z: 0.05 });
    const lowerLegL = addBodyPart(new THREE.CylinderGeometry(0.3, 0.22, 2.0, 20), { x: -0.6, y: -3.8, z: 0.05 });

    // Right Leg
    const upperLegR = addBodyPart(new THREE.CylinderGeometry(0.42, 0.32, 1.9, 20), { x: 0.55, y: -1.75, z: 0 });
    upperLegR.rotation.z = -0.04;
    const kneeR = addBodyPart(new THREE.SphereGeometry(0.26, 16, 16), { x: 0.58, y: -2.75, z: 0.05 });
    const lowerLegR = addBodyPart(new THREE.CylinderGeometry(0.3, 0.22, 2.0, 20), { x: 0.6, y: -3.8, z: 0.05 });

    // Feet
    const footL = addBodyPart(new THREE.BoxGeometry(0.35, 0.2, 0.75), { x: -0.62, y: -4.85, z: 0.2 });
    const footR = addBodyPart(new THREE.BoxGeometry(0.35, 0.2, 0.75), { x: 0.62, y: -4.85, z: 0.2 });

    // --- Internal Glowing Organ Nodes ---
    // 1. Brain Neural Core
    const brainGeom = new THREE.SphereGeometry(0.45, 20, 20);
    const brainMat = new THREE.MeshStandardMaterial({
      color: 0x2f80ed,
      emissive: 0x2f80ed,
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.85,
      roughness: 0.2,
    });
    const brainMesh = new THREE.Mesh(brainGeom, brainMat);
    brainMesh.position.set(0, 3.4, 0.05);
    bodyGroup.add(brainMesh);
    organMeshesRef.current.brain = brainMesh;

    // 2. Cardiac Heart Core (Beating animation in loop)
    const heartGeom = new THREE.DodecahedronGeometry(0.32, 2);
    const heartMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0xff3b30,
      emissiveIntensity: 1.2,
      transparent: true,
      opacity: 0.9,
    });
    const heartMesh = new THREE.Mesh(heartGeom, heartMat);
    heartMesh.position.set(-0.28, 1.65, 0.35);
    bodyGroup.add(heartMesh);
    organMeshesRef.current.heart = heartMesh;

    // 3. Bilateral Lungs (Breathing expansion)
    const lungL = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.28, 0.65, 12, 16),
      new THREE.MeshStandardMaterial({
        color: 0x06b6d4,
        emissive: 0x06b6d4,
        emissiveIntensity: 0.7,
        transparent: true,
        opacity: 0.7,
      })
    );
    lungL.position.set(-0.55, 1.55, 0.15);
    lungL.rotation.z = 0.12;
    bodyGroup.add(lungL);

    const lungR = lungL.clone();
    lungR.position.set(0.55, 1.55, 0.15);
    lungR.rotation.z = -0.12;
    bodyGroup.add(lungR);
    organMeshesRef.current.lungs = { left: lungL, right: lungR };

    // 4. Stomach / Gastric
    const stomachMesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.35, 16, 16),
      new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        emissive: 0xf59e0b,
        emissiveIntensity: 0.6,
        transparent: true,
        opacity: 0.75,
      })
    );
    stomachMesh.position.set(0.12, 0.75, 0.25);
    bodyGroup.add(stomachMesh);
    organMeshesRef.current.stomach = stomachMesh;

    // 5. Kidneys
    const kidneyL = new THREE.Mesh(
      new THREE.SphereGeometry(0.18, 12, 12),
      new THREE.MeshStandardMaterial({
        color: 0x10b981,
        emissive: 0x10b981,
        emissiveIntensity: 0.7,
        transparent: true,
        opacity: 0.8,
      })
    );
    kidneyL.position.set(-0.35, 0.45, -0.15);
    bodyGroup.add(kidneyL);

    const kidneyR = kidneyL.clone();
    kidneyR.position.set(0.35, 0.45, -0.15);
    bodyGroup.add(kidneyR);
    organMeshesRef.current.kidneys = { left: kidneyL, right: kidneyR };

    // --- Interactive Clickable / Hoverable Hotspot Pins ---
    const hotspots = [];
    ANATOMY_REGIONS.forEach((region) => {
      const pinGroup = new THREE.Group();
      pinGroup.position.set(region.coords3D.x, region.coords3D.y, region.coords3D.z);

      // Center glowing beacon sphere
      const beaconGeom = new THREE.SphereGeometry(0.11, 16, 16);
      const beaconMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(region.color),
        transparent: true,
        opacity: 0.95,
      });
      const beaconMesh = new THREE.Mesh(beaconGeom, beaconMat);
      pinGroup.add(beaconMesh);

      // Pulsing telemetry outer ring
      const ringGeom = new THREE.RingGeometry(0.14, 0.19, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(region.color),
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide,
      });
      const ringMesh = new THREE.Mesh(ringGeom, ringMat);
      pinGroup.add(ringMesh);

      // Invisible larger hit-test sphere for generous click area
      const hitGeom = new THREE.SphereGeometry(0.42, 12, 12);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitMesh = new THREE.Mesh(hitGeom, hitMat);
      hitMesh.userData = { regionId: region.id };
      pinGroup.add(hitMesh);

      bodyGroup.add(pinGroup);

      hotspots.push({
        regionId: region.id,
        group: pinGroup,
        beacon: beaconMesh,
        ring: ringMesh,
        hitMesh,
        baseColor: new THREE.Color(region.color),
      });
    });
    hotspotsMapRef.current = hotspots;

    // --- Vertical Laser Medical Scan Beam ---
    const scanGeom = new THREE.PlaneGeometry(3.5, 0.08);
    const scanMat = new THREE.MeshBasicMaterial({
      color: 0x00c2cb,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide,
    });
    const scanMesh = new THREE.Mesh(scanGeom, scanMat);
    scanMesh.position.set(0, 4.0, 0.4);
    bodyGroup.add(scanMesh);
    scanLineRef.current = scanMesh;

    // --- Floating Medical Data Particles (Telemetry Field) ---
    const particleCount = 75;
    const particleGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 6;
      positions[i + 1] = (Math.random() - 0.5) * 8;
      positions[i + 2] = (Math.random() - 0.5) * 4;
    }
    particleGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x3b82f6,
      size: 0.06,
      transparent: true,
      opacity: 0.5,
    });
    const particleSystem = new THREE.Points(particleGeom, particleMat);
    scene.add(particleSystem);

    // --- Animation Frame Loop ---
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // 1. Slow Auto-Rotation when user is not dragging
      if (autoRotateRef.current && !isDraggingRef.current && bodyGroupRef.current) {
        bodyGroupRef.current.rotation.y = Math.sin(elapsedTime * 0.45) * 0.35;
      }

      // 2. Cardiac Heart Beating Pulse (lub-dub rhythm)
      if (organMeshesRef.current.heart) {
        const beat = 1 + 0.18 * Math.pow(Math.sin(elapsedTime * 4.5), 6);
        organMeshesRef.current.heart.scale.set(beat, beat, beat);
      }

      // 3. Respiratory Lung Breathing
      if (organMeshesRef.current.lungs) {
        const breath = 1 + 0.08 * Math.sin(elapsedTime * 1.6);
        organMeshesRef.current.lungs.left.scale.set(breath, breath, breath);
        organMeshesRef.current.lungs.right.scale.set(breath, breath, breath);
      }

      // 4. Neural Cranial Sparkle in Brain
      if (organMeshesRef.current.brain) {
        organMeshesRef.current.brain.material.emissiveIntensity =
          0.7 + 0.35 * Math.sin(elapsedTime * 3.2);
      }

      // 5. Vertical Medical Laser Scanning Line
      if (scanLineRef.current) {
        const scanY = 4.2 - ((elapsedTime * 1.8) % 9.2);
        scanLineRef.current.position.y = scanY;
        scanLineRef.current.material.opacity = 0.5 + 0.4 * Math.sin(elapsedTime * 8);
      }

      // 6. Pulse Hotspot Rings
      hotspotsMapRef.current.forEach((spot, i) => {
        const wave = 1 + 0.3 * Math.sin(elapsedTime * 3.5 + i * 0.5);
        spot.ring.scale.set(wave, wave, 1);
        spot.ring.rotation.z += 0.01;
      });

      // 7. Subtle floating particle drift
      particleSystem.rotation.y = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    // --- Resize Observer ---
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
      const newWidth = mountRef.current.clientWidth;
      const newHeight = mountRef.current.clientHeight;
      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.domElement.remove();
      }
      renderer.dispose();
    };
  }, []);

  // Update selected & hovered visual states on 3D pins
  useEffect(() => {
    if (!hotspotsMapRef.current) return;

    hotspotsMapRef.current.forEach((spot) => {
      const isSelected = selectedRegion?.id === spot.regionId;
      const isHovered = hoveredRegion?.id === spot.regionId;

      if (isSelected) {
        spot.beacon.scale.set(1.7, 1.7, 1.7);
        spot.ring.scale.set(2.2, 2.2, 2.2);
        spot.ring.material.opacity = 1.0;
        spot.beacon.material.color.setHex(0xffffff);
      } else if (isHovered) {
        spot.beacon.scale.set(1.4, 1.4, 1.4);
        spot.ring.scale.set(1.6, 1.6, 1.6);
        spot.ring.material.opacity = 0.9;
        spot.beacon.material.color.copy(spot.baseColor);
      } else {
        spot.beacon.scale.set(1.0, 1.0, 1.0);
        spot.ring.material.opacity = 0.55;
        spot.beacon.material.color.copy(spot.baseColor);
      }
    });
  }, [selectedRegion, hoveredRegion]);

  // Raycasting for Mouse Interaction
  const handlePointerMove = useCallback((e) => {
    if (!mountRef.current || !cameraRef.current || !sceneRef.current) return;
    const rect = mountRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    // If dragging to rotate 3D body
    if (isDraggingRef.current && bodyGroupRef.current) {
      const deltaX = e.clientX - previousMousePosRef.current.x;
      bodyGroupRef.current.rotation.y += deltaX * 0.008;
      previousMousePosRef.current = { x: e.clientX, y: e.clientY };
      return;
    }

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), cameraRef.current);

    const hitTargets = hotspotsMapRef.current.map(h => h.hitMesh);
    const intersects = raycaster.intersectObjects(hitTargets);

    if (intersects.length > 0) {
      const regionId = intersects[0].object.userData.regionId;
      const targetRegion = ANATOMY_REGIONS.find(r => r.id === regionId);
      if (targetRegion) {
        onHoverRegion(targetRegion);
      }
    } else {
      if (hoveredRegion && !selectedRegion) {
        onHoverRegion(null);
      }
    }
  }, [hoveredRegion, selectedRegion, onHoverRegion]);

  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    previousMousePosRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = (e) => {
    isDraggingRef.current = false;

    // Check click for selection
    if (!mountRef.current || !cameraRef.current) return;
    const rect = mountRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(x, y), cameraRef.current);
    const hitTargets = hotspotsMapRef.current.map(h => h.hitMesh);
    const intersects = raycaster.intersectObjects(hitTargets);

    if (intersects.length > 0) {
      const regionId = intersects[0].object.userData.regionId;
      const targetRegion = ANATOMY_REGIONS.find(r => r.id === regionId);
      if (targetRegion) {
        onSelectRegion(targetRegion);
      }
    }
  };

  const setPresetAngle = (angle) => {
    setViewAngle(angle);
    setAutoRotate(false);
    if (!bodyGroupRef.current) return;

    if (angle === 'front') {
      bodyGroupRef.current.rotation.y = 0;
    } else if (angle === 'back') {
      bodyGroupRef.current.rotation.y = Math.PI;
    } else if (angle === 'iso') {
      bodyGroupRef.current.rotation.y = 0.6;
    }
  };

  return (
    <div className="relative w-full h-[520px] sm:h-[620px] lg:h-[680px] flex items-center justify-center select-none">
      {/* 3D WebGL Canvas Mount Container */}
      <div
        ref={mountRef}
        onPointerMove={handlePointerMove}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        className="w-full h-full cursor-grab active:cursor-grabbing relative z-10 touch-none"
      />

      {/* Subtle Ambient Telemetry Grid Rings Behind Model */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="w-[340px] sm:w-[480px] h-[340px] sm:h-[480px] rounded-full border border-blue-400/15 dark:border-blue-500/20 animate-spin-slow" />
        <div className="w-[260px] sm:w-[380px] h-[260px] sm:h-[380px] rounded-full border border-cyan-400/15 dark:border-cyan-500/20 border-dashed animate-spin-reverse-slow" />
        <div className="w-[180px] sm:w-[260px] h-[180px] sm:h-[260px] rounded-full bg-gradient-to-b from-blue-400/5 via-cyan-400/10 to-transparent blur-2xl" />
      </div>

      {/* Floating 3D Anatomy Controls HUD */}
      <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 bg-white/80 dark:bg-[#0E243A]/80 backdrop-blur-md p-1.5 rounded-2xl border border-white/90 dark:border-blue-900/60 shadow-lg text-xs font-semibold">
        <button
          onClick={() => setAutoRotate(prev => !prev)}
          title="Toggle 360° Auto-Rotation"
          className={`p-2 rounded-xl flex items-center gap-1.5 transition-all ${
            autoRotate
              ? 'bg-[#2F80ED] text-white shadow-md shadow-blue-500/25'
              : 'text-[#4A6278] hover:bg-blue-50 dark:hover:bg-gray-800'
          }`}
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">360° Orbit</span>
        </button>

        <div className="flex gap-1 border-t border-gray-100 dark:border-gray-800 pt-1.5">
          <button
            onClick={() => setPresetAngle('front')}
            className={`px-2.5 py-1 rounded-lg text-[11px] transition-all ${
              viewAngle === 'front' && !autoRotate
                ? 'bg-blue-100 text-blue-700 font-bold'
                : 'text-gray-500 hover:text-blue-600'
            }`}
          >
            Front
          </button>
          <button
            onClick={() => setPresetAngle('back')}
            className={`px-2.5 py-1 rounded-lg text-[11px] transition-all ${
              viewAngle === 'back' && !autoRotate
                ? 'bg-blue-100 text-blue-700 font-bold'
                : 'text-gray-500 hover:text-blue-600'
            }`}
          >
            Back
          </button>
        </div>
      </div>

      {/* Bottom Floating Telemetry Indicator */}
      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/85 dark:bg-[#0E243A]/85 backdrop-blur-md border border-white/90 dark:border-blue-900/60 shadow-md text-[11px] font-mono text-[#0B2438] dark:text-gray-200">
        <span className="w-2 h-2 rounded-full bg-[#00C2CB] animate-ping" />
        <span>ANATOMICAL 3D SCAN: 12 SPECIALTIES ONLINE</span>
      </div>
    </div>
  );
}
