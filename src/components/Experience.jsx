import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experience } from '../data/portfolioData';
import './Experience.css';

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
        opacity: 0,
        x: 100, // Slide in from right
        duration: 1,
        ease: 'power3.out',
      });

      gsap.from('.exp-header', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out',
      });

      gsap.from('.exp-item', {
        scrollTrigger: { trigger: '.exp-timeline', start: 'top 80%' },
        opacity: 0,
        x: -50,
        stagger: 0.2,
        duration: 0.9,
        ease: 'power3.out',
      });

      // Timeline line draw
      gsap.from('.exp-timeline-line', {
        scrollTrigger: { trigger: '.exp-timeline', start: 'top 80%', end: 'bottom 80%', scrub: 1 },
        scaleY: 0,
        transformOrigin: 'top',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" className="experience" ref={sectionRef}>
      <div className="container">
        <div className="exp-header">
          <div className="section-label">Professional Experience</div>
          <h2 className="section-title">
            Where I've <span className="gradient-text">Built</span>
          </h2>
        </div>

        <div className="exp-timeline">
          <div className="exp-timeline-track">
            <div className="exp-timeline-line" />
          </div>

          {experience.map((exp, i) => (
            <div key={i} className="exp-item">
              {/* Dot */}
              <div className="exp-dot">
                <div className="exp-dot-inner" />
                <div className="exp-dot-ring" />
              </div>

              {/* Card */}
              <div className="glass-heavy exp-card">
                <div className="exp-card-glow" aria-hidden="true" />

                <div className="exp-card-top">
                  <div>
                    <div className="exp-duration mono uppercase">{exp.duration}</div>
                    <h3 className="exp-title">{exp.title}</h3>
                    <div className="exp-org">{exp.organization}</div>
                  </div>
                  <div className="exp-status">
                    <span className="exp-status-dot" />
                    Active
                  </div>
                </div>

                <div className="exp-responsibilities">
                  {exp.responsibilities.map((r, ri) => (
                    <div key={ri} className="exp-responsibility">
                      <div className="exp-responsibility-bullet" />
                      <span>{r}</span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="exp-tags">
                  {['Frontend', 'Deployment', 'DNS', 'Security', 'Maintenance'].map(tag => (
                    <span key={tag} className="tech-chip exp-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
