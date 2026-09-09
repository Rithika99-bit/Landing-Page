import { useEffect } from 'react';

let activeLockCount = 0;

/**
 * useModalScrollLock:
 * Prevents background scrolling when any modal or overlay is open.
 * - Sets document.body.style.overflow = 'hidden'
 * - Stops Lenis smooth scroller to prevent wheel event propagation
 * - Restores overflow and resumes Lenis when all modals are closed
 * - Optionally binds Escape key to trigger modal close callback
 */
export function useModalScrollLock(isOpen, onClose) {
  useEffect(() => {
    if (!isOpen) return;

    activeLockCount++;
    if (activeLockCount === 1) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      if (window.__lenis) {
        window.__lenis.stop();
      }
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      activeLockCount = Math.max(0, activeLockCount - 1);
      if (activeLockCount === 0) {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        if (window.__lenis) {
          window.__lenis.start();
        }
      }
    };
  }, [isOpen, onClose]);
}
