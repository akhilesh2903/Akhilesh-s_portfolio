import React, { useState, Suspense, lazy } from 'react';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import Loader from './components/Loader';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import ClickSpark from './components/ClickSpark';

import Hero from './components/Hero';

// Lazy load heavy sections
const LetterGlitch = lazy(() => import('./components/LetterGlitch'));
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Experience = lazy(() => import('./components/Experience'));
const Achievements = lazy(() => import('./components/Achievements'));
const CurrentlyBuilding = lazy(() => import('./components/CurrentlyBuilding'));
const CodingProfiles = lazy(() => import('./components/CodingProfiles'));
const Contact = lazy(() => import('./components/Contact'));
const Footer = lazy(() => import('./components/Footer'));

// Section divider
const SectionDivider = () => (
  <div style={{
    width: '100%',
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
    margin: '0',
    position: 'relative',
    zIndex: 2,
  }} aria-hidden="true" />
);

// Subtle section glow transition
const SectionGlow = ({ color = 'rgba(0,229,255,0.03)' }) => (
  <div style={{
    position: 'relative',
    height: '120px',
    background: `radial-gradient(ellipse at 50% 50%, ${color} 0%, transparent 70%)`,
    marginBlock: '-60px',
    zIndex: 1,
    pointerEvents: 'none',
  }} aria-hidden="true" />
);

function App() {
  const [loaded, setLoaded] = useState(false);
  useSmoothScroll();

  return (
    <>
      {/* Grain overlay (fixed, z-index 9999) */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Cinematic loader */}
      {!loaded && (
        <Loader onComplete={() => {
          setLoaded(true);
          document.body.classList.remove('loading');
        }} />
      )}

      {/* Click Spark Effect */}
      <ClickSpark />

      {/* Scroll indicator */}
      {loaded && <ScrollProgress />}

      {/* Navigation */}
      {loaded && <Navbar />}

      {/* Main content */}
      <main id="main-content" role="main">
        {/* Letter Glitch Background */}
        {loaded && (
          <Suspense fallback={null}>
            <LetterGlitch />
          </Suspense>
        )}

        {/* Hero is eagerly loaded so it never suspends */}
        <Hero />
        <SectionDivider />

        {/* Rest of the sections in their own Suspense */}
        <Suspense fallback={null}>

          <About />
          <SectionGlow color="rgba(61,142,248,0.04)" />

          <SectionDivider />
          <Skills />
          <SectionGlow color="rgba(0,229,255,0.03)" />

          <SectionDivider />
          <Projects />
          <SectionGlow color="rgba(124,58,237,0.04)" />

          <SectionDivider />
          <Experience />
          <SectionGlow color="rgba(0,229,255,0.03)" />

          <SectionDivider />
          <Achievements />
          <SectionGlow color="rgba(61,142,248,0.04)" />

          <SectionDivider />
          <CurrentlyBuilding />
          <SectionGlow color="rgba(16,185,129,0.03)" />

          <SectionDivider />
          <CodingProfiles />
          <SectionGlow color="rgba(0,229,255,0.04)" />

          <SectionDivider />
          <Contact />

          <Footer />
        </Suspense>
      </main>
    </>
  );
}

export default App;
