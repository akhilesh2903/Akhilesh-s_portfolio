import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollProgress.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollProgress = () => {
  const lineRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const update = () => {
      const progress = ScrollTrigger.getScrollFunc(window)() /
        (document.body.scrollHeight - window.innerHeight);
      if (lineRef.current) {
        lineRef.current.style.transform = `scaleY(${Math.min(1, progress)})`;
      }
      if (dotRef.current) {
        const pct = Math.min(100, progress * 100);
        dotRef.current.style.top = `${pct}%`;
      }
    };

    ScrollTrigger.addEventListener('scrollEnd', update);
    window.addEventListener('scroll', update, { passive: true });
    return () => {
      ScrollTrigger.removeEventListener('scrollEnd', update);
      window.removeEventListener('scroll', update);
    };
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div className="scroll-progress__track">
        <div className="scroll-progress__line" ref={lineRef} />
      </div>
      <div className="scroll-progress__dot" ref={dotRef} />
    </div>
  );
};

export default ScrollProgress;
