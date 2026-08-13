import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalInfo, education } from '../data/portfolioData';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const cgpaRef = useRef(null);
  const [cgpaDisplay, setCgpaDisplay] = useState('0.00');

  // Mouse tilt on card
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, {
        rotateY: x * 8,
        rotateX: -y * 8,
        duration: 0.6,
        ease: 'power2.out',
        transformPerspective: 1000,
      });
    };
    const onLeave = () => {
      gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.8, ease: 'power2.out' });
    };

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
    return () => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  // ScrollTrigger animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section reveal
      gsap.from('.about-label, .about-heading, .about-bio', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.9,
        ease: 'power3.out',
      });

      gsap.from(cardRef.current, {
        scrollTrigger: { trigger: cardRef.current, start: 'top 80%' },
        opacity: 0,
        y: 60,
        scale: 0.97,
        duration: 1,
        ease: 'power3.out',
      });

      // CGPA count-up
      const obj = { val: 0 };
      ScrollTrigger.create({
        trigger: cgpaRef.current,
        start: 'top 85%',
        onEnter: () => {
          gsap.to(obj, {
            val: parseFloat(education.cgpa),
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => setCgpaDisplay(obj.val.toFixed(2)),
          });
        },
        once: true,
      });

      gsap.from('.about-chip', {
        scrollTrigger: { trigger: '.about-chips', start: 'top 85%' },
        opacity: 0,
        scale: 0.85,
        stagger: 0.06,
        duration: 0.5,
        ease: 'back.out(1.5)',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="container">
        <div className="about-layout">
          {/* Left text */}
          <div className="about-text">
            <div className="section-label about-label">About Me</div>
            <h2 className="section-title about-heading">
              Crafting <span className="gradient-text">Digital</span> Intelligence
            </h2>
            <p className="about-bio">{personalInfo.about}</p>

            <div className="about-meta">
              <div className="about-meta-item">
                <span className="about-meta-label mono uppercase">Location</span>
                <span className="about-meta-value">{personalInfo.location}</span>
              </div>
              <div className="about-meta-item">
                <span className="about-meta-label mono uppercase">Email</span>
                <a href={`mailto:${personalInfo.email}`} className="about-meta-value about-meta-link" data-cursor="contact">
                  {personalInfo.email}
                </a>
              </div>
            </div>
          </div>

          {/* Right card */}
          <div className="glass-heavy about-card" ref={cardRef} style={{ transformStyle: 'preserve-3d' }}>
            {/* Glow orb */}
            <div className="about-card-glow" aria-hidden="true" />

            <div className="about-card-header">
              <div className="about-card-icon" aria-hidden="true">🎓</div>
              <div>
                <div className="about-card-degree">{education.degree}</div>
                <div className="about-card-institution">{education.institution}</div>
                <div className="about-card-duration mono">{education.duration}</div>
              </div>
            </div>

            {/* CGPA */}
            <div className="about-cgpa" ref={cgpaRef}>
              <div className="about-cgpa-ring" aria-hidden="true">
                <svg viewBox="0 0 100 100" className="about-cgpa-svg">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6"/>
                  <circle
                    cx="50" cy="50" r="42"
                    fill="none"
                    stroke="url(#cgpaGrad)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={`${(parseFloat(education.cgpa) / 10) * 264} 264`}
                    strokeDashoffset="66"
                    transform="rotate(-90 50 50)"
                  />
                  <defs>
                    <linearGradient id="cgpaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00e5ff"/>
                      <stop offset="100%" stopColor="#3d8ef8"/>
                    </linearGradient>
                  </defs>
                </svg>
                <div className="about-cgpa-text">
                  <span className="about-cgpa-val">{cgpaDisplay}</span>
                  <span className="about-cgpa-max">/ {education.cgpaMax}</span>
                </div>
              </div>
              <div className="about-cgpa-label mono uppercase">CGPA</div>
            </div>

            {/* Coursework */}
            <div className="about-section-title mono uppercase">Relevant Coursework</div>
            <div className="about-chips">
              {education.coursework.map((c) => (
                <span key={c} className="about-chip tech-chip">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
