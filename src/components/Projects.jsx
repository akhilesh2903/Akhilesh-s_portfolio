import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/portfolioData';
import './Projects.css';

gsap.registerPlugin(ScrollTrigger);

/* ── Animated SVG visuals ── */
const StockVisual = () => (
  <svg className="project-visual-svg" viewBox="0 0 300 160" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.4"/>
        <stop offset="100%" stopColor="#00e5ff" stopOpacity="0"/>
      </linearGradient>
    </defs>
    {/* Grid lines */}
    {[0,1,2,3].map(i => (
      <line key={i} x1="0" y1={40*i+20} x2="300" y2={40*i+20} stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
    ))}
    {/* Area fill */}
    <path d="M0 120 L30 100 L70 110 L110 60 L150 80 L180 40 L220 55 L260 30 L300 50 L300 160 L0 160Z" fill="url(#chartGrad)"/>
    {/* Line */}
    <path d="M0 120 L30 100 L70 110 L110 60 L150 80 L180 40 L220 55 L260 30 L300 50"
      stroke="var(--cyan)" strokeWidth="2" strokeLinecap="round" className="chart-line"/>
    {/* Dots */}
    {[[30,100],[110,60],[180,40],[260,30]].map(([x,y],i) => (
      <circle key={i} cx={x} cy={y} r="4" fill="var(--cyan)" className="chart-dot" style={{animationDelay: `${i*0.3}s`}}/>
    ))}
    {/* Floating numbers */}
    {['+2.4%', '₹1,240', '+0.8%'].map((t, i) => (
      <text key={i} x={60 + i*90} y={30} fill="rgba(0,229,255,0.6)" fontSize="9" fontFamily="monospace">{t}</text>
    ))}
  </svg>
);

const NetworkVisual = () => (
  <svg className="project-visual-svg" viewBox="0 0 300 160" fill="none" aria-hidden="true">
    {/* Connecting lines */}
    {[[150,80,50,40],[150,80,250,40],[150,80,50,120],[150,80,250,120],[150,80,80,80],[150,80,220,80]].map(([x1,y1,x2,y2],i) => (
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(61,142,248,0.3)" strokeWidth="1" strokeDasharray="4 4"/>
    ))}
    {/* Center node */}
    <circle cx="150" cy="80" r="18" fill="var(--blue-dim)" stroke="var(--blue)" strokeWidth="1.5"/>
    <circle cx="150" cy="80" r="10" fill="var(--blue)" opacity="0.7" className="pulse-node"/>
    {/* Satellite nodes */}
    {[[50,40],[250,40],[50,120],[250,120],[80,80],[220,80]].map(([cx,cy],i) => (
      <g key={i}>
        <circle cx={cx} cy={cy} r="12" fill="rgba(0,229,255,0.08)" stroke="rgba(0,229,255,0.3)" strokeWidth="1"/>
        <circle cx={cx} cy={cy} r="5" fill="rgba(0,229,255,0.6)" style={{animationDelay: `${i*0.2}s`}} className="pulse-node"/>
      </g>
    ))}
    {/* Labels */}
    {[['AIET',50,28],['AIMSRC',250,28],['Homeo',50,140],['Pragati',250,140]].map(([t,x,y]) => (
      <text key={t} x={x} y={y} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="7" fontFamily="monospace">{t}</text>
    ))}
  </svg>
);

const MedicalVisual = () => (
  <svg className="project-visual-svg" viewBox="0 0 300 160" fill="none" aria-hidden="true">
    <defs>
      <radialGradient id="scanGrad" cx="50%" cy="50%">
        <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.2"/>
        <stop offset="70%" stopColor="#3d8ef8" stopOpacity="0.1"/>
        <stop offset="100%" stopColor="transparent"/>
      </radialGradient>
    </defs>
    {/* Ultrasound circles */}
    {[30,50,70,90,110].map((r, i) => (
      <circle key={i} cx="150" cy="80" r={r} fill="none"
        stroke={`rgba(0,229,255,${0.08 - i*0.01})`} strokeWidth="1"
        className="scan-ring" style={{animationDelay: `${i*0.4}s`}}/>
    ))}
    <circle cx="150" cy="80" r="115" fill="url(#scanGrad)"/>
    {/* Brain/blob shape */}
    <ellipse cx="150" cy="80" rx="40" ry="35" fill="rgba(124,58,237,0.15)" stroke="rgba(124,58,237,0.5)" strokeWidth="1" className="blob-pulse"/>
    {/* Neural connections */}
    {[[130,60,165,95],[165,95,140,115],[140,115,160,100]].map(([x1,y1,x2,y2],i) => (
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(0,229,255,0.5)" strokeWidth="1.5" strokeLinecap="round" className="neural-line"/>
    ))}
    {[[130,60],[165,95],[140,115],[160,100],[150,70]].map(([cx,cy],i) => (
      <circle key={i} cx={cx} cy={cy} r="4" fill="var(--cyan)" opacity="0.8" style={{animationDelay: `${i*0.2}s`}} className="pulse-node"/>
    ))}
    {/* Scan line sweep */}
    <line x1="35" y1="80" x2="265" y2="80" stroke="rgba(0,229,255,0.3)" strokeWidth="1" strokeDasharray="3 6" className="scan-sweep"/>
    {/* XAI tags */}
    {[['U-Net',20,25],['CNN',240,25],['RAG',20,145],['XAI',240,145]].map(([t,x,y]) => (
      <g key={t}>
        <rect x={x} y={y-10} width={28} height={14} rx="3" fill="rgba(0,229,255,0.1)" stroke="rgba(0,229,255,0.3)" strokeWidth="0.5"/>
        <text x={x+14} y={y} textAnchor="middle" fill="rgba(0,229,255,0.8)" fontSize="7" fontFamily="monospace">{t}</text>
      </g>
    ))}
  </svg>
);

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, {
        rotateY: x * 6,
        rotateX: -y * 6,
        duration: 0.5,
        ease: 'power2.out',
        transformPerspective: 1200,
      });
    };
    const onLeave = () => gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.7, ease: 'power3.out' });

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
    return () => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const visual = project.visual === 'stockmarket' ? <StockVisual /> :
                 project.visual === 'network' ? <NetworkVisual /> : <MedicalVisual />;

  return (
    <div
      ref={cardRef}
      className={`glass-heavy project-card ${project.type === 'featured' ? 'project-card--featured' : ''}`}
      style={{ transformStyle: 'preserve-3d' }}
      data-cursor="project"
    >
      {/* Project number */}
      <div className="project-num mono">{`//${project.id}`}</div>

      {/* Featured badge */}
      {project.type === 'featured' && (
        <div className="project-featured-badge">
          <span className="project-featured-dot" />
          FEATURED PROJECT
        </div>
      )}

      {/* Visual */}
      <div className="project-visual">
        {visual}
        <div className="project-visual-overlay" />
      </div>

      {/* Info */}
      <div className="project-info">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>

        {/* Institution live website links (Project 02) */}
        {project.institutions && (
          <div className="project-institutions">
            <div className="project-institutions__label mono uppercase">Live Websites</div>
            <div className="project-institutions__list">
              {project.institutions.map((inst) => (
                <a
                  key={inst.url}
                  href={inst.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-institution-link"
                  data-cursor="link"
                  title={inst.name}
                >
                  <span className="project-institution-dot" />
                  <span className="project-institution-name">{inst.name}</span>
                  <span className="project-institution-url mono">{inst.label}</span>
                  <svg className="project-institution-arrow" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 10L10 2M10 2H5M10 2v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Highlights for featured */}
        {project.highlights && (
          <div className="project-highlights">
            {project.highlights.map((h) => (
              <span key={h} className="project-highlight-chip">{h}</span>
            ))}
          </div>
        )}

        {/* Tech stack */}
        <div className="project-tech">
          {project.tech.map((t) => (
            <span key={t} className="tech-chip">{t}</span>
          ))}
        </div>

        {/* Actions */}
        <div className="project-actions">
          <a href={project.github} target="_blank" rel="noopener noreferrer"
            className="project-btn project-btn--outline" data-cursor="github">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </a>
          {project.demo ? (
            <a href={project.demo} target="_blank" rel="noopener noreferrer"
              className="project-btn project-btn--primary" data-cursor="link">
              Live Demo →
            </a>
          ) : (
            <span className="project-btn project-btn--disabled">In Progress</span>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from('.projects-header', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out',
      });

      // Simple fade in for cards as they appear
      gsap.from('.project-card', {
        scrollTrigger: { trigger: '.projects-stack', start: 'top 80%' },
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="projects" ref={sectionRef}>
      <div className="container">
        <div className="projects-header">
          <div className="section-label">Portfolio</div>
          <h2 className="section-title">
            Selected <span className="gradient-text">Work</span>
          </h2>
          <p className="projects-sub">A curated collection of projects at the intersection of engineering, AI, and immersive technology.</p>
        </div>
        <div className="projects-stack">
          {projects.map((p, i) => (
            <div key={p.id} className="project-card-wrapper" style={{ top: `calc(70px + ${i * 20}px)`, zIndex: i }}>
              <ProjectCard project={p} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
