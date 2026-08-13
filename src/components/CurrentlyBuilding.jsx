import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { currentlyBuilding } from '../data/portfolioData';
import './CurrentlyBuilding.css';

gsap.registerPlugin(ScrollTrigger);

const CurrentlyBuilding = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.lab-header', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out',
      });

      gsap.from('.lab-main-card', {
        scrollTrigger: { trigger: '.lab-main-card', start: 'top 80%' },
        opacity: 0,
        scale: 0.97,
        duration: 1,
        ease: 'power3.out',
      });

      gsap.from('.lab-explore-item', {
        scrollTrigger: { trigger: '.lab-explore-grid', start: 'top 85%' },
        opacity: 0,
        y: 30,
        stagger: 0.08,
        duration: 0.6,
        ease: 'power2.out',
      });

      // Progress bar animation
      gsap.from('.lab-progress-fill', {
        scrollTrigger: { trigger: '.lab-main-card', start: 'top 80%' },
        scaleX: 0,
        transformOrigin: 'left',
        duration: 1.5,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="lab" className="lab" ref={sectionRef}>
      <div className="container">
        <div className="lab-header">
          <div className="section-label">Research Lab</div>
          <h2 className="section-title">
            Currently <span className="gradient-text">Building</span>
          </h2>
          <p className="lab-sub">An inside look at what's on the workbench right now.</p>
        </div>

        {/* Main build */}
        <div className="glass-heavy lab-main-card">
          <div className="lab-main-glow" aria-hidden="true" />

          {/* Status */}
          <div className="lab-status">
            <span className="lab-status-dot" />
            <span className="mono uppercase">{currentlyBuilding.mainProject.status}</span>
          </div>

          <h3 className="lab-main-title">{currentlyBuilding.mainProject.title}</h3>

          {/* Progress */}
          <div className="lab-progress-wrap">
            <div className="lab-progress-label">
              <span className="mono">Build Progress</span>
              <span className="mono lab-progress-pct gradient-text">{currentlyBuilding.mainProject.progress}%</span>
            </div>
            <div className="lab-progress-track">
              <div
                className="lab-progress-fill"
                style={{ width: `${currentlyBuilding.mainProject.progress}%` }}
              />
              <div className="lab-progress-glow" style={{ left: `${currentlyBuilding.mainProject.progress}%` }} />
            </div>
          </div>

          {/* Data stream animation */}
          <div className="lab-datastream" aria-hidden="true">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="lab-stream-line" style={{ animationDelay: `${i * 0.3}s` }} />
            ))}
          </div>

          {/* Tech chips */}
          <div className="lab-tech-chips">
            {['React', 'Flask', 'MongoDB', 'U-Net', 'CNN', 'RAG', 'Explainable AI'].map((t) => (
              <span key={t} className="tech-chip">{t}</span>
            ))}
          </div>
        </div>

        {/* Exploring section */}
        <div className="lab-exploring">
          <div className="lab-exploring-title mono uppercase">Currently Exploring</div>
          <div className="lab-explore-grid">
            {currentlyBuilding.exploring.map((item, i) => (
              <div key={item} className="glass lab-explore-item">
                <div className="lab-explore-num mono">{String(i + 1).padStart(2, '0')}</div>
                <div className="lab-explore-text">{item}</div>
                <div className="lab-explore-arrow">→</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentlyBuilding;
