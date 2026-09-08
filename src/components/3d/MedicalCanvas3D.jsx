import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { isReducedMotionPreferred, isTouchDevice } from '../../utils/animationTokens';

export default function MedicalCanvas3D({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = isReducedMotionPreferred();
    const isTouch = isTouchDevice();

    // Scene setup
    const scene = new THREE.Scene();

    const width = canvas.clientWidth || window.innerWidth;
    const height = canvas.clientHeight || window.innerHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 18;

    // Renderer setup with mobile optimization
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !isTouch,
      powerPreference: isTouch ? 'low-power' : 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isTouch ? 1 : Math.min(window.devicePixelRatio, 2));

    // Ambient & Directional Lights
    const ambientLight = new THREE.AmbientLight(0xdceeff, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x2f80ed, 2.2);
    keyLight.position.set(10, 15, 12);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x00c2cb, 1.6);
    rimLight.position.set(-10, -10, -8);
    scene.add(rimLight);

    // Group for all medical structures
    const medicalGroup = new THREE.Group();
    scene.add(medicalGroup);

    // 1. DNA Double Helix Structure
    const dnaGroup = new THREE.Group();
    // Reduce geometry complexity on touch/mobile for smooth 60fps
    const numPairs = isTouch ? 16 : 28;
    const helixRadius = 2.4;
    const helixLength = 14;
    const rungGeometry = new THREE.CylinderGeometry(0.04, 0.04, helixRadius * 2, isTouch ? 6 : 8);
    const nodeGeometry = new THREE.SphereGeometry(0.18, isTouch ? 10 : 16, isTouch ? 10 : 16);

    const nodeMaterialA = new THREE.MeshStandardMaterial({
      color: 0x2f80ed,
      roughness: 0.2,
      metalness: 0.3,
      transparent: true,
      opacity: 0.88,
    });

    const nodeMaterialB = new THREE.MeshStandardMaterial({
      color: 0x00c2cb,
      roughness: 0.2,
      metalness: 0.3,
      transparent: true,
      opacity: 0.88,
    });

    const rungMaterial = new THREE.MeshStandardMaterial({
      color: 0xe2edff,
      roughness: 0.4,
      metalness: 0.1,
      transparent: true,
      opacity: 0.65,
    });

    for (let i = 0; i < numPairs; i++) {
      const t = (i / numPairs) * Math.PI * 4;
      const y = (i / numPairs) * helixLength - helixLength / 2;
      const x1 = Math.cos(t) * helixRadius;
      const z1 = Math.sin(t) * helixRadius;
      const x2 = -x1;
      const z2 = -z1;

      const nodeA = new THREE.Mesh(nodeGeometry, nodeMaterialA);
      nodeA.position.set(x1, y, z1);
      dnaGroup.add(nodeA);

      const nodeB = new THREE.Mesh(nodeGeometry, nodeMaterialB);
      nodeB.position.set(x2, y, z2);
      dnaGroup.add(nodeB);

      const rung = new THREE.Mesh(rungGeometry, rungMaterial);
      rung.position.set(0, y, 0);
      rung.rotation.z = Math.PI / 2;
      rung.rotation.y = -t;
      dnaGroup.add(rung);
    }

    dnaGroup.position.set(3.8, 0, -1.0);
    dnaGroup.scale.set(1.15, 1.15, 1.15);
    dnaGroup.rotation.z = 0.35;
    dnaGroup.rotation.x = 0.2;
    medicalGroup.add(dnaGroup);

    // 2. Floating Liquid Glass Crystalline Rings
    const ringGeometry = new THREE.TorusGeometry(3.4, 0.08, 12, isTouch ? 32 : 64);
    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0x2f80ed,
      roughness: 0.1,
      metalness: 0.5,
      transparent: true,
      opacity: 0.5,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.position.set(3.8, 0, -1.0);
    ring.rotation.x = Math.PI / 3;
    medicalGroup.add(ring);

    // 3. Floating Ambient Medical Glow Particles
    const particleCount = isTouch ? 30 : 70;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const pCanvas = document.createElement('canvas');
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext('2d');
    const pGrad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
    pGrad.addColorStop(0, 'rgba(47, 128, 237, 0.9)');
    pGrad.addColorStop(0.5, 'rgba(0, 194, 203, 0.3)');
    pGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    pCtx.fillStyle = pGrad;
    pCtx.fillRect(0, 0, 32, 32);

    const pTexture = new THREE.CanvasTexture(pCanvas);
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.4,
      map: pTexture,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Scroll interaction: track scroll to shrink & rotate model smoothly
    let currentScroll = 0;
    const handleScroll = () => {
      currentScroll = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (e.clientX - windowHalfX) / windowHalfX;
      mouseY = (e.clientY - windowHalfY) / windowHalfY;
    };

    if (!isTouch) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    const handleResize = () => {
      if (!canvas) return;
      const w = canvas.parentElement?.clientWidth || window.innerWidth;
      const h = canvas.parentElement?.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Continuous rotation speed adjusted by scroll
        const scrollBoost = Math.min(2, 1 + currentScroll * 0.002);
        dnaGroup.rotation.y += delta * 0.25 * scrollBoost;
        ring.rotation.z += delta * 0.15 * scrollBoost;
        ring.rotation.y += delta * 0.1;

        // Vertical float
        dnaGroup.position.y = Math.sin(time * 0.8) * 0.35;
        ring.position.y = Math.sin(time * 0.8) * 0.35;

        // Scroll reactivity: model rotates and tilts as user scrolls down
        const scrollOffset = Math.min(currentScroll * 0.0015, 0.6);
        medicalGroup.rotation.z = scrollOffset * 0.4;
        medicalGroup.position.z = -scrollOffset * 3;

        // Mouse Parallax Lerping (desktop only)
        if (!isTouch) {
          targetX += (mouseX * 0.8 - targetX) * 0.05;
          targetY += (-mouseY * 0.6 - targetY) * 0.05;
          medicalGroup.rotation.y = targetX * 0.35;
          medicalGroup.rotation.x = targetY * 0.25;
        }

        particles.rotation.y = time * 0.02;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
      if (!isTouch) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      rungGeometry.dispose();
      nodeGeometry.dispose();
      ringGeometry.dispose();
      particleGeometry.dispose();
      nodeMaterialA.dispose();
      nodeMaterialB.dispose();
      rungMaterial.dispose();
      ringMaterial.dispose();
      particleMaterial.dispose();
      pTexture.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ opacity: 1.0 }}
    />
  );
}
