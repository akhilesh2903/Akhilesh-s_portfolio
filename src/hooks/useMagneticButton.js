import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * useMagneticButton
 * Attaches magnetic hover behaviour to a button element.
 * When the cursor is within the activation radius the button slides toward the cursor.
 *
 * @param {number} strength - how far the button moves (default: 0.4)
 * @param {number} radius   - activation distance in px (default: 80)
 */
export function useMagneticButton(strength = 0.4, radius = 80) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power2.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power2.out' });

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < radius) {
        xTo(dx * strength);
        yTo(dy * strength);
      } else {
        xTo(0);
        yTo(0);
      }
    };

    const handleLeave = () => {
      xTo(0);
      yTo(0);
    };

    window.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, [strength, radius]);

  return ref;
}
