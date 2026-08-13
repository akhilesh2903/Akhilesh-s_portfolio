import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills } from '../data/portfolioData';
import './Skills.css';

gsap.registerPlugin(ScrollTrigger);

const categoryColors = {
  Programming: { color: '#00e5ff', bg: 'rgba(0,229,255,0.08)', border: 'rgba(0,229,255,0.25)' },
  'Web Development': { color: '#3d8ef8', bg: 'rgba(61,142,248,0.08)', border: 'rgba(61,142,248,0.25)' },
  Databases: { color: '#7c3aed', bg: 'rgba(124,58,237,0.08)', border: 'rgba(124,58,237,0.25)' },
  Tools: { color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.25)' },
  'Areas of Interest': { color: '#10b981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.25)' },
};

const SkillChip = ({ name, category }) => {
  const ref = useRef(null);
  const colors = categoryColors[category] || categoryColors.Programming;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onEnter = () => {
      gsap.to(el, {
        scale: 1.12,
        y: -4,
        boxShadow: `0 8px 30px ${colors.color}30, 0 0 0 1px ${colors.color}50`,
        duration: 0.3,
        ease: 'power2.out',
      });
    };
    const onLeave = () => {
      gsap.to(el, { scale: 1, y: 0, boxShadow: 'none', duration: 0.4, ease: 'power2.out' });
    };

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [colors]);

  return (
    <span
      ref={ref}
      className="skill-chip"
      style={{
        color: colors.color,
        background: colors.bg,
        borderColor: colors.border,
      }}
    >
      {name}
    </span>
  );
};

const Skills = () => {
  const sectionRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...Object.keys(skills)];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.skills-header', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out',
      });

      gsap.from('.skill-category-block', {
        scrollTrigger: { trigger: '.skills-grid', start: 'top 80%' },
        opacity: 0,
        y: 50,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const filteredSkills = activeCategory === 'All'
    ? Object.entries(skills)
    : [[activeCategory, skills[activeCategory]]].filter(([k]) => skills[k]);

  return (
    <section id="skills" className="skills" ref={sectionRef}>
      <div className="container">
        <div className="skills-header">
          <div className="section-label">Technical Arsenal</div>
          <h2 className="section-title">
            Skills &amp; <span className="gradient-text">Expertise</span>
          </h2>
        </div>

        {/* Filter pills */}
        <div className="skills-filter" role="tablist" aria-label="Filter skills by category">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`skills-filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
              role="tab"
              aria-selected={activeCategory === cat}
              data-cursor="button"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills grid */}
        <div className="skills-grid">
          {filteredSkills.map(([category, items]) => {
            const colors = categoryColors[category] || categoryColors.Programming;
            return (
              <div key={category} className="glass skill-category-block" style={{ '--cat-color': colors.color }}>
                {/* Category header */}
                <div className="skill-cat-header">
                  <div className="skill-cat-dot" style={{ background: colors.color, boxShadow: `0 0 10px ${colors.color}` }} />
                  <span className="skill-cat-name mono uppercase">{category}</span>
                </div>

                {/* Chips */}
                <div className="skill-chips">
                  {items.map((skill) => (
                    <SkillChip key={skill} name={skill} category={category} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating constellation decoration */}
        <div className="skills-constellation" aria-hidden="true">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="skills-star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                width: `${Math.random() * 3 + 2}px`,
                height: `${Math.random() * 3 + 2}px`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
