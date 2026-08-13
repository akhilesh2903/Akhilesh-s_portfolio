import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useMagneticButton } from '../hooks/useMagneticButton';
import { personalInfo } from '../data/portfolioData';
import './Hero.css';

const Hero = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const bioRef = useRef(null);
  const ctaRef = useRef(null);
  const bg1Ref = useRef(null);
  const bg2Ref = useRef(null);
  const bg3Ref = useRef(null);
  const photoWrapRef = useRef(null);
  const withoutJacketRef = useRef(null);
  const withJacketRef = useRef(null);

  const exploreBtn = useMagneticButton(0.35, 90);
  const connectBtn = useMagneticButton(0.35, 90);

  // Mouse parallax
  useEffect(() => {
    const handleMove = (e) => {
      const { innerWidth: w, innerHeight: h } = window;
      const x = (e.clientX / w - 0.5);
      const y = (e.clientY / h - 0.5);

      gsap.to(bg1Ref.current, { x: x * 40, y: y * 30, duration: 1.2, ease: 'power2.out' });
      gsap.to(bg2Ref.current, { x: x * 25, y: y * 20, duration: 1.4, ease: 'power2.out' });
      gsap.to(bg3Ref.current, { x: x * 10, y: y * 8, duration: 1.6, ease: 'power2.out' });

      // Subtle photo tilt with mouse
      if (photoWrapRef.current) {
        gsap.to(photoWrapRef.current, {
          rotateY: x * 8,
          rotateX: -y * 6,
          duration: 0.8,
          ease: 'power2.out',
          transformPerspective: 1000,
        });
      }
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  // Photo hover — swap without→with jacket (pixel-perfect)
  useEffect(() => {
    const wrap = photoWrapRef.current;
    const noJacket = withoutJacketRef.current;
    const jacket = withJacketRef.current;
    if (!wrap || !noJacket || !jacket) return;

    let isHovered = false;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    canvas.width = 1;
    canvas.height = 1;

    const checkAlpha = (x, y) => {
      // Use offsetWidth/Height which give the true dimensions before 3D transforms
      const cw = noJacket.offsetWidth;
      const ch = noJacket.offsetHeight;
      const nw = noJacket.naturalWidth;
      const nh = noJacket.naturalHeight;
      
      if (!nw || !nh || !cw || !ch) return false;

      const ir = nw / nh;
      const cr = cw / ch;
      
      let drawnW, drawnH;
      if (cr > ir) {
        // height-bound
        drawnH = ch;
        drawnW = ch * ir;
      } else {
        // width-bound
        drawnW = cw;
        drawnH = cw / ir;
      }
      
      // object-position: bottom center
      const offsetX = (cw - drawnW) / 2;
      const offsetY = ch - drawnH;
      
      // If mouse is outside the drawn image area, it's not on the person
      if (x < offsetX || x > offsetX + drawnW || y < offsetY || y > offsetY + drawnH) {
        return false;
      }
      
      // Map mouse coordinate to natural image coordinate
      const mappedX = ((x - offsetX) / drawnW) * nw;
      const mappedY = ((y - offsetY) / drawnH) * nh;
      
      try {
        // Draw just that 1 pixel onto our 1x1 canvas
        ctx.clearRect(0, 0, 1, 1);
        ctx.drawImage(noJacket, mappedX, mappedY, 1, 1, 0, 0, 1, 1);
        
        const pixel = ctx.getImageData(0, 0, 1, 1).data;
        return pixel[3] > 10; // Check alpha channel
      } catch (err) {
        return false;
      }
    };

    const triggerEnter = () => {
      if (isHovered) return;
      isHovered = true;
      gsap.to(noJacket, { opacity: 0, scale: 1.04, duration: 0.08, ease: 'power2.inOut' });
      gsap.to(jacket, { opacity: 1, scale: 1, duration: 0.08, ease: 'power2.inOut' });
    };

    const triggerLeave = () => {
      if (!isHovered) return;
      isHovered = false;
      gsap.to(jacket, { opacity: 0, scale: 0.97, duration: 0.08, ease: 'power2.inOut' });
      gsap.to(noJacket, { opacity: 1, scale: 1, duration: 0.08, ease: 'power2.inOut' });
    };

    let ticking = false;
    const onMouseMove = (e) => {
      // e.offsetX/Y are in the local coordinate space of the target
      const x = e.offsetX;
      const y = e.offsetY;
      
      if (!ticking) {
        requestAnimationFrame(() => {
          if (checkAlpha(x, y)) {
            triggerEnter();
          } else {
            triggerLeave();
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    wrap.addEventListener('mousemove', onMouseMove);
    wrap.addEventListener('mouseleave', triggerLeave);
    
    return () => {
      wrap.removeEventListener('mousemove', onMouseMove);
      wrap.removeEventListener('mouseleave', triggerLeave);
    };
  }, []);

  // Entrance animation
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    const nameEl = titleRef.current?.querySelector('.hero-name');
    if (nameEl) {
      const chars = nameEl.querySelectorAll('.hero-char');
      gsap.set(chars, { opacity: 0, y: 80, rotateX: -40 });
      tl.to(chars, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.04,
        duration: 1.0,
        ease: 'power4.out',
      }, 0);
    }

    gsap.set(subtitleRef.current, { opacity: 0, y: 30 });
    gsap.set(bioRef.current, { opacity: 0, y: 20 });
    if (ctaRef.current?.children) {
      gsap.set(Array.from(ctaRef.current.children), { opacity: 0, y: 20 });
    }
    gsap.set(photoWrapRef.current, { opacity: 0, x: 40, scale: 0.96 });

    tl.to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.5);
    tl.to(bioRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }, 0.7);
    if (ctaRef.current?.children) {
      tl.to(Array.from(ctaRef.current.children), {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power2.out',
      }, 0.9);
    }
    tl.to(photoWrapRef.current, {
      opacity: 1,
      x: 0,
      scale: 1,
      duration: 1.0,
      ease: 'power3.out',
    }, 0.4);

    return () => tl.kill();
  }, []);

  const nameParts = personalInfo.name.split(' ');

  return (
    <section id="hero" className="hero" ref={sectionRef}>
      {/* Ambient gradient layers */}
      <div className="hero-bg-layer hero-bg--1" ref={bg1Ref} />
      <div className="hero-bg-layer hero-bg--2" ref={bg2Ref} />
      <div className="hero-bg-layer hero-bg--3" ref={bg3Ref} />

      {/* Grid */}
      <div className="hero-grid" aria-hidden="true" />

      {/* Corner brackets */}
      <div className="hero-bracket hero-bracket--tl" aria-hidden="true" />
      <div className="hero-bracket hero-bracket--br" aria-hidden="true" />

      {/* Two-column layout */}
      <div className="hero-layout">

        {/* ── LEFT: Text content ── */}
        <div className="hero-left">
          {/* Eyebrow */}
          <div className="hero-eyebrow mono uppercase" ref={subtitleRef}>
            <span className="hero-eyebrow__dot" />
            Computer Science Engineering Student
          </div>

          {/* Main title */}
          <div className="hero-title-wrap" ref={titleRef}>
            <h1 className="hero-name" aria-label={personalInfo.name}>
              {nameParts.map((word, wi) => (
                <span key={wi} className="hero-word">
                  {word.split('').map((char, ci) => (
                    <span key={ci} className="hero-char" style={{ display: 'inline-block' }}>
                      {char}
                    </span>
                  ))}
                  {wi < nameParts.length - 1 && <span className="hero-word-space">&nbsp;</span>}
                </span>
              ))}
            </h1>

            <div className="hero-subtitle gradient-text">
              Full-Stack Developer &amp; AI Enthusiast
            </div>
          </div>

          {/* Bio */}
          <p className="hero-bio" ref={bioRef}>
            {personalInfo.bio}
          </p>

          {/* CTAs */}
          <div className="hero-cta" ref={ctaRef}>
            <button
              ref={exploreBtn}
              className="btn-magnetic btn-primary"
              data-cursor="project"
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span>Explore My Work</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            <button
              ref={connectBtn}
              className="btn-magnetic btn-secondary"
              data-cursor="contact"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span>Let's Connect</span>
            </button>
          </div>

          {/* Floating stat chips */}
          <div className="hero-stats">
            <div className="glass hero-stat">
              <span className="hero-stat__val">8.86</span>
              <span className="hero-stat__label">CGPA</span>
            </div>
            <div className="glass hero-stat">
              <span className="hero-stat__val">18+</span>
              <span className="hero-stat__label">Certifications</span>
            </div>
            <div className="glass hero-stat">
              <span className="hero-stat__val">3+</span>
              <span className="hero-stat__label">Projects</span>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Photo with hover swap ── */}
        <div className="hero-right" aria-label="Photo of Akhilesh Bhat">
          <div
            className="hero-photo-wrap"
            ref={photoWrapRef}
            style={{ transformStyle: 'preserve-3d' }}
            data-cursor="project"
          >
            {/* Without jacket — visible by default */}
            <img
              ref={withoutJacketRef}
              src="/withoutjacket.png"
              alt="Akhilesh Bhat"
              className="hero-photo hero-photo--default"
              draggable="false"
            />

            {/* With jacket — revealed on hover */}
            <img
              ref={withJacketRef}
              src="/withjacket.png"
              alt="Akhilesh Bhat wearing jacket"
              className="hero-photo hero-photo--hover"
              draggable="false"
            />

          </div>
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-hint" aria-hidden="true">
        <div className="hero-scroll-hint__line" />
        <span className="hero-scroll-hint__text mono">SCROLL</span>
      </div>
    </section>
  );
};

export default Hero;
