import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './Loader.css';

const Loader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const nameRef = useRef(null);
  const subtitleRef = useRef(null);
  const progressRef = useRef(null);
  const progressBarRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline();
    let counterObj = { val: 0 };

    // Animate counter
    tl.to(counterObj, {
      val: 100,
      duration: 2.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        const v = Math.round(counterObj.val);
        setCount(v);
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${v}%`;
        }
      },
    });

    // Name reveal
    tl.from(nameRef.current?.querySelectorAll('.char') || [], {
      opacity: 0,
      y: 40,
      stagger: 0.06,
      duration: 0.8,
      ease: 'power3.out',
    }, 0.3);

    tl.from(subtitleRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power2.out',
    }, 1.0);

    // Exit
    tl.to(loaderRef.current, {
      opacity: 0,
      scale: 1.04,
      duration: 0.8,
      ease: 'power2.inOut',
      delay: 0.3,
      onComplete: () => {
        if (loaderRef.current) loaderRef.current.style.display = 'none';
        document.body.classList.remove('loading');
        onComplete?.();
      },
    }, 2.6);

    return () => tl.kill();
  }, [onComplete]);

  const splitName = "AKHILESH BHAT".split('').map((char, i) => (
    <span key={i} className="char" style={{ display: 'inline-block' }}>
      {char === ' ' ? '\u00A0' : char}
    </span>
  ));

  return (
    <div className="loader" ref={loaderRef}>
      {/* Background grid */}
      <div className="loader-grid" />

      {/* Scanline */}
      <div className="loader-scanline" />

      {/* Corner decorations */}
      <div className="loader-corner loader-corner--tl" />
      <div className="loader-corner loader-corner--tr" />
      <div className="loader-corner loader-corner--bl" />
      <div className="loader-corner loader-corner--br" />

      <div className="loader-content">
        <div className="loader-eyebrow mono uppercase">INITIALIZING EXPERIENCE</div>

        <h1 className="loader-name" ref={nameRef}>
          {splitName}
        </h1>

        <p className="loader-subtitle" ref={subtitleRef}>
          Full-Stack Developer &amp; AI Enthusiast
        </p>

        <div className="loader-progress-wrap">
          <div className="loader-progress-track" ref={progressRef}>
            <div className="loader-progress-bar" ref={progressBarRef} />
            <div className="loader-progress-glow" />
          </div>
          <div className="loader-counter mono">{String(count).padStart(2, '0')}%</div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
