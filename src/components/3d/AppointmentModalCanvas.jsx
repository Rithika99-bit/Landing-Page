import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { isReducedMotionPreferred, isTouchDevice } from '../../utils/animationTokens';

/**
 * AppointmentModalCanvas:
 * Embedded 3D ambient medical particle & floating DNA helix background canvas
 * rendered directly inside the Book Appointment wizard modal.
 */
export default function AppointmentModalCanvas({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = isReducedMotionPreferred();
    const isTouch = isTouchDevice();

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const width = canvas.parentElement?.clientWidth || canvas.clientWidth || window.innerWidth;
    const height = canvas.parentElement?.clientHeight || canvas.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 16;

    // 2. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: !isTouch,
      powerPreference: isTouch ? 'low-power' : 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isTouch ? 1 : Math.min(window.devicePixelRatio, 2));

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xdceeff, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x2f80ed, 2.2);
    keyLight.position.set(10, 15, 12);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x00c2cb, 1.6);
    rimLight.position.set(-10, -10, -8);
    scene.add(rimLight);

    // Main 3D Group
    const modalGroup = new THREE.Group();
    scene.add(modalGroup);

    // 4. Subtle Ambient Floating DNA Helix Strand
    const dnaGroup = new THREE.Group();
    const numPairs = isTouch ? 12 : 20;
    const helixRadius = 2.0;
    const helixLength = 12;

    const rungGeometry = new THREE.CylinderGeometry(0.035, 0.035, helixRadius * 2, 8);
    const nodeGeometry = new THREE.SphereGeometry(0.15, 12, 12);

    const nodeMaterialA = new THREE.MeshStandardMaterial({
      color: 0x2f80ed,
      roughness: 0.2,
      metalness: 0.4,
      transparent: true,
      opacity: 0.65,
    });

    const nodeMaterialB = new THREE.MeshStandardMaterial({
      color: 0x00c2cb,
      roughness: 0.2,
      metalness: 0.4,
      transparent: true,
      opacity: 0.65,
    });

    const rungMaterial = new THREE.MeshStandardMaterial({
      color: 0xe2edff,
      roughness: 0.4,
      metalness: 0.2,
      transparent: true,
      opacity: 0.45,
    });

    for (let i = 0; i < numPairs; i++) {
      const t = (i / numPairs) * Math.PI * 3.5;
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

    dnaGroup.position.set(4.2, -1, -2.5);
    dnaGroup.scale.set(0.9, 0.9, 0.9);
    dnaGroup.rotation.z = 0.3;
    modalGroup.add(dnaGroup);

    // 5. Custom Glow Particle Canvas Texture & Points System (As Highlighted by User)
    const particleCount = isTouch ? 40 : 85;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 28;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Dynamic 2D Radial Gradient Texture Creation for Soft Glowing Orbs
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext('2d');
    const pGrad = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
    pGrad.addColorStop(0, 'rgba(47, 128, 237, 0.95)');
    pGrad.addColorStop(0.45, 'rgba(0, 194, 203, 0.4)');
    pGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    pCtx.fillStyle = pGrad;
    pCtx.fillRect(0, 0, 32, 32);

    const pTexture = new THREE.CanvasTexture(pCanvas);
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.5,
      map: pTexture,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    modalGroup.add(particles);

    // 6. Interactive Mouse Parallax inside Modal
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseX = (x / rect.width - 0.5) * 2;
      mouseY = (y / rect.height - 0.5) * 2;
    };

    if (!isTouch) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      const w = canvas.parentElement.clientWidth;
      const h = canvas.parentElement.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // 7. Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Continuous gentle DNA helix rotation
        dnaGroup.rotation.y += delta * 0.3;
        dnaGroup.position.y = -1 + Math.sin(time * 0.9) * 0.25;

        // Particle field rotation & floating
        particles.rotation.y = time * 0.03;
        particles.rotation.x = Math.sin(time * 0.02) * 0.05;

        // Smooth mouse lerping inside modal
        if (!isTouch) {
          targetX += (mouseX * 0.6 - targetX) * 0.05;
          targetY += (-mouseY * 0.4 - targetY) * 0.05;
          modalGroup.rotation.y = targetX * 0.25;
          modalGroup.rotation.x = targetY * 0.18;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (!isTouch) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      rungGeometry.dispose();
      nodeGeometry.dispose();
      particleGeometry.dispose();
      nodeMaterialA.dispose();
      nodeMaterialB.dispose();
      rungMaterial.dispose();
      particleMaterial.dispose();
      pTexture.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none select-none z-0 ${className}`}
      style={{ opacity: 0.9 }}
    />
  );
}
