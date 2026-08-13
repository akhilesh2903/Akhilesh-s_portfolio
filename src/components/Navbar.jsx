import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Profiles', href: '#profiles' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const navRef = useRef(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 80);
      
      if (y < 300) {
        setHidden(false);
        lastY.current = y;
      } else if (y > lastY.current + 15) {
        setHidden(true);
        lastY.current = y;
      } else if (y < lastY.current - 15) {
        setHidden(false);
        lastY.current = y;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // Section detection
    const sections = navItems.map(({ href }) => ({
      id: href.slice(1),
      el: document.querySelector(href),
    })).filter(({ el }) => el);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3, rootMargin: '-10% 0px -60% 0px' }
    );

    sections.forEach(({ el }) => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${hidden ? 'navbar--hidden' : ''}`}
      ref={navRef}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="navbar-inner">
        {/* Logo */}
        <a href="#hero" className="navbar-logo" onClick={(e) => handleNavClick(e, '#hero')} data-cursor="link">
          <span className="navbar-logo__text">AB</span>
          <span className="navbar-logo__dot" />
        </a>

        {/* Nav links */}
        <ul className="navbar-links" role="list">
          {navItems.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                className={`navbar-link ${activeSection === href.slice(1) ? 'navbar-link--active' : ''}`}
                onClick={(e) => handleNavClick(e, href)}
                data-cursor="link"
                aria-current={activeSection === href.slice(1) ? 'page' : undefined}
              >
                {label}
                <span className="navbar-link__underline" />
              </a>
            </li>
          ))}
        </ul>

        <div className="navbar-actions">
          {/* Theme Toggle */}
          <button
            className="navbar-theme-toggle"
            onClick={toggleTheme}
            data-cursor="link"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          >
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            )}
          </button>

          {/* CTA */}
          <a
            href="mailto:akhileshbhat13@gmail.com"
            className="navbar-cta"
            data-cursor="contact"
          >
            Hire Me
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
