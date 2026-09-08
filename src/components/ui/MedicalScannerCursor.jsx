import React, { useEffect, useState, useRef } from 'react';
import { isTouchDevice, isReducedMotionPreferred } from '../../utils/animationTokens';

/**
 * MedicalScannerCursor:
 * Sci-Fi medical reticle crosshair cursor with heartbeat-pulsing ring,
 * soft trailing particle luminescence, and morphing into a '+' precision crosshair
 * over clickable buttons and links.
 * Auto-disabled on mobile touch devices.
 */
export default function MedicalScannerCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [trail, setTrail] = useState([]);
  const trailRef = useRef([]);

  useEffect(() => {
    // Disable completely on touch devices or reduced motion
    if (isTouchDevice() || isReducedMotionPreferred()) {
      return;
    }

    let frameId;
    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      setPos({ x, y });
      if (!isVisible) setIsVisible(true);

      // Check if cursor is over interactive elements
      const target = e.target;
      const clickable = target && (target.closest('button, a, input, select, textarea, [role="button"], .cursor-pointer') !== null);
      setIsHoveringClickable(clickable);

      // Add to trailing buffer
      trailRef.current = [
        { x, y, id: Math.random() },
        ...trailRef.current.slice(0, 4)
      ];
      setTrail([...trailRef.current]);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible || isTouchDevice() || isReducedMotionPreferred()) {
    return null;
  }

  return (
    <>
      {/* Soft Glowing Trail Particles */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="fixed pointer-events-none z-[9998] rounded-full transition-opacity"
          style={{
            left: `${point.x}px`,
            top: `${point.y}px`,
            width: `${Math.max(4, 10 - index * 2)}px`,
            height: `${Math.max(4, 10 - index * 2)}px`,
            transform: 'translate(-50%, -50%)',
            backgroundColor: index % 2 === 0 ? '#00F0FF' : '#7B5CFA',
            opacity: (0.4 - index * 0.08),
            filter: 'blur(1.5px)',
          }}
        />
      ))}

      {/* Main Reticle Scanner */}
      <div
        className="fixed pointer-events-none z-[9999] transition-transform duration-75 ease-out select-none"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {isHoveringClickable ? (
          /* Morphed into Precision '+' Medical Crosshair over clickable elements */
          <div className="relative w-8 h-8 flex items-center justify-center animate-pulse">
            <div className="w-5 h-[1.5px] bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
            <div className="h-5 w-[1.5px] bg-[#00F0FF] shadow-[0_0_8px_#00F0FF] absolute" />
            <div className="w-8 h-8 rounded-full border border-cyan-400/40 absolute scale-110" />
          </div>
        ) : (
          /* Normal Medical Scanner Reticle with Heartbeat Pulse */
          <div className="relative flex items-center justify-center">
            {/* Heartbeat Pulsing Outer Ring */}
            <div
              className={`rounded-full border border-cyan-400/60 transition-all duration-200 ${
                isClicking
                  ? 'w-9 h-9 bg-cyan-400/25 scale-90 border-[#00F0FF]'
                  : 'w-7 h-7 scale-100 shadow-[0_0_10px_rgba(0,240,255,0.4)]'
              }`}
            />

            {/* Corner Crosshair Ticks */}
            <div className="absolute w-1 h-1 top-0 left-0 border-t-2 border-l-2 border-cyan-300" />
            <div className="absolute w-1 h-1 top-0 right-0 border-t-2 border-r-2 border-cyan-300" />
            <div className="absolute w-1 h-1 bottom-0 left-0 border-b-2 border-l-2 border-cyan-300" />
            <div className="absolute w-1 h-1 bottom-0 right-0 border-b-2 border-r-2 border-cyan-300" />

            {/* Center Core Dot */}
            <div className="absolute w-1.5 h-1.5 rounded-full bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]" />
          </div>
        )}
      </div>
    </>
  );
}
