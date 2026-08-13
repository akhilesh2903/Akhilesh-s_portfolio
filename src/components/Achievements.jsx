import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { achievements } from '../data/portfolioData';
import './Achievements.css';

gsap.registerPlugin(ScrollTrigger);

const Achievements = () => {
  const sectionRef = useRef(null);
  const [udemyCount, setUdemyCount] = useState(0);
  const [courseraCount, setCourseraCount] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ach-header', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out',
      });

      gsap.from('.ach-card', {
        scrollTrigger: { trigger: '.ach-grid', start: 'top 80%' },
        opacity: 0,
        y: 50,
        stagger: 0.15,
        scale: 0.97,
        duration: 0.9,
        ease: 'power3.out',
      });

      // Count-ups
      const udemyObj = { val: 0 };
      const courseraObj = { val: 0 };

      ScrollTrigger.create({
        trigger: '.ach-grid',
        start: 'top 85%',
        onEnter: () => {
          gsap.to(udemyObj, {
            val: achievements.certifications.udemy,
            duration: 1.5,
            ease: 'power2.out',
            onUpdate: () => setUdemyCount(Math.round(udemyObj.val)),
          });
          gsap.to(courseraObj, {
            val: achievements.certifications.coursera,
            duration: 1.5,
            ease: 'power2.out',
            onUpdate: () => setCourseraCount(Math.round(courseraObj.val)),
          });
        },
        once: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="achievements" className="achievements" ref={sectionRef}>
      <div className="container">
        <div className="ach-header">
          <div className="section-label">Recognition</div>
          <h2 className="section-title">
            Achievements &amp; <span className="gradient-text">Certifications</span>
          </h2>
        </div>

        <div className="ach-grid">
          {/* Udemy */}
          <div className="glass-heavy ach-card">
            <div className="ach-card-bg ach-card-bg--udemy" aria-hidden="true" />
            <div className="ach-icon">🎓</div>
            <div className="ach-count gradient-text">{udemyCount}+</div>
            <div className="ach-platform">Udemy</div>
            <div className="ach-label">Certifications</div>
            <div className="ach-sub">Verified professional courses</div>
          </div>

          {/* Coursera */}
          <div className="glass-heavy ach-card">
            <div className="ach-card-bg ach-card-bg--coursera" aria-hidden="true" />
            <div className="ach-icon">🏅</div>
            <div className="ach-count gradient-text">{courseraCount}+</div>
            <div className="ach-platform">Coursera</div>
            <div className="ach-label">Certifications</div>
            <div className="ach-sub">University & industry-backed</div>
          </div>

          {/* Other platforms */}
          <div className="glass-heavy ach-card ach-card--platforms">
            <div className="ach-card-bg ach-card-bg--others" aria-hidden="true" />
            <div className="ach-platforms-label mono uppercase">Additional Platforms</div>
            <div className="ach-platform-list">
              {achievements.certifications.others.map((platform) => (
                <div key={platform} className="ach-platform-item">
                  <div className="ach-platform-dot" />
                  {platform}
                </div>
              ))}
            </div>
            <div className="ach-areas">
              {achievements.certifications.areas.map((area) => (
                <span key={area} className="tech-chip ach-area-chip">{area}</span>
              ))}
            </div>
          </div>

          {/* Research paper */}
          <a
            href={achievements.research.link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-heavy ach-card ach-card--research"
            style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
          >
            <div className="ach-card-bg ach-card-bg--research" aria-hidden="true" />
            <div className="ach-research-badge mono uppercase">
              <span className="ach-research-dot" />
              {achievements.research.status}
            </div>
            <div className="ach-icon">📄</div>
            <div className="ach-research-title">Review Paper</div>
            <div className="ach-research-topic gradient-text">{achievements.research.title.split(' on ')[1]}</div>
            <p className="ach-research-desc">{achievements.research.description}</p>
            <div className="ach-research-ring" aria-hidden="true">
              <svg viewBox="0 0 100 100" width="80" height="80">
                <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(0,229,255,0.1)" strokeWidth="2"/>
                <circle cx="50" cy="50" r="40" fill="none" stroke="url(#researchGrad)" strokeWidth="2"
                  strokeDasharray="180 252" strokeDashoffset="63" transform="rotate(-90 50 50)">
                  <animateTransform attributeName="transform" type="rotate" from="-90 50 50" to="270 50 50" dur="4s" repeatCount="indefinite"/>
                </circle>
                <defs>
                  <linearGradient id="researchGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--cyan)"/>
                    <stop offset="100%" stopColor="var(--violet)"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
