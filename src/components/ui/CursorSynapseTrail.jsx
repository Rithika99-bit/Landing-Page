import React, { useEffect, useRef } from 'react';
import { isFeatureEnabled } from '../../config/featureFlags';
import { isReducedMotionPreferred, isTouchDevice } from '../../utils/animationTokens';

/**
 * CursorSynapseTrail:
 * Restricted to the Hero and Specialty/Services sections only:
 * Emits a faint, quickly-fading branching neuron spark trail behind the cursor.
 * Completely disabled on touch devices and under prefers-reduced-motion.
 */
export default function CursorSynapseTrail() {
  const isEnabled = isFeatureEnabled('CURSOR_SYNAPSE_TRAIL');
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isEnabled || isReducedMotionPreferred() || isTouchDevice()) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const sparks = [];
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e) => {
      // Check if cursor is over designated synapse zones (#hero, #services, #departments)
      const el = document.elementFromPoint(e.clientX, e.clientY);
      const isOverZone = el?.closest('#hero, #services, #departments, [data-synapse-zone="true"]');
      if (!isOverZone) return;

      const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      if (dist > 12) {
        lastX = e.clientX;
        lastY = e.clientY;

        // Spawn 2-3 tiny synapse particles
        for (let i = 0; i < 2; i++) {
          sparks.push({
            x: e.clientX + (Math.random() - 0.5) * 8,
            y: e.clientY + (Math.random() - 0.5) * 8,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5,
            life: 1.0,
            decay: 0.04 + Math.random() * 0.03,
            radius: 1.5 + Math.random() * 1.2,
          });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animId;
    const render = () => {
      animId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, width, height);

      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.life -= s.decay;

        if (s.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius * s.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${s.life * 0.4})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#00F0FF';
        ctx.fill();
        ctx.restore();
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (!isEnabled || isReducedMotionPreferred() || isTouchDevice()) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-40 w-full h-full"
      aria-hidden="true"
    />
  );
}
