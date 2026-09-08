import React, { useRef, useEffect } from 'react';
import { isReducedMotionPreferred } from '../../utils/animationTokens';

/**
 * DataStreamDivider:
 * A subtle, glowing cyan data stream transition effect between major sections.
 * Plays delicate falling streams of clinical data bits/particles when entering view.
 */
export default function DataStreamDivider({ height = "h-16" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (isReducedMotionPreferred()) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 1200);
    let height = (canvas.height = 64);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || 1200;
      height = canvas.height = 64;
    };

    window.addEventListener('resize', handleResize);

    const characters = "010189XYAZ✦ΔΩ";
    const columns = Math.floor(width / 32);
    const drops = Array.from({ length: columns }, () => Math.random() * -30);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle horizontal connector beam
      const gradient = ctx.createLinearGradient(0, height / 2, width, height / 2);
      gradient.addColorStop(0, 'rgba(0, 194, 203, 0)');
      gradient.addColorStop(0.5, 'rgba(0, 194, 203, 0.25)');
      gradient.addColorStop(1, 'rgba(0, 194, 203, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, height / 2 - 0.5, width, 1);

      ctx.fillStyle = 'rgba(0, 194, 203, 0.45)';
      ctx.font = '10px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        const x = i * 32 + 16;
        const y = drops[i];

        if (y > 0 && y < height) {
          ctx.fillText(text, x, y);
          // Glow particle at tip
          ctx.beginPath();
          ctx.arc(x + 3, y - 2, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
          ctx.fill();
          ctx.fillStyle = 'rgba(0, 194, 203, 0.45)';
        }

        drops[i] += 1.2;

        if (drops[i] > height + 20) {
          drops[i] = Math.random() * -20;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`relative w-full ${height} overflow-hidden pointer-events-none opacity-60`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
