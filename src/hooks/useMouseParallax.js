import { useEffect, useRef } from 'react';

/**
 * useMouseParallax
 * Returns normalized mouse position {x, y} in range [-1, 1]
 * and attaches depth-based parallax to provided layer refs.
 *
 * @param {Array<{ref, depth}>} layers - each layer has a ref and a depth (0-1)
 * @param {number} strength - overall strength multiplier (default: 30)
 */
export function useMouseParallax(layers = [], strength = 30) {
  const mouse = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const rafId = useRef(null);

  useEffect(() => {
    const handleMove = (e) => {
      const { innerWidth: w, innerHeight: h } = window;
      mouse.current.x = (e.clientX / w - 0.5) * 2;
      mouse.current.y = (e.clientY / h - 0.5) * 2;
    };

    const animate = () => {
      // Lerp toward target
      current.current.x += (mouse.current.x - current.current.x) * 0.06;
      current.current.y += (mouse.current.y - current.current.y) * 0.06;

      layers.forEach(({ ref, depth }) => {
        if (!ref?.current) return;
        const x = current.current.x * strength * depth;
        const y = current.current.y * strength * depth;
        ref.current.style.transform = `translate(${x}px, ${y}px)`;
      });

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [layers, strength]);

  return mouse;
}
