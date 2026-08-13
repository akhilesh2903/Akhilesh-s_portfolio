import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalInfo } from '../data/portfolioData';
import { useMagneticButton } from '../hooks/useMagneticButton';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const emailBtn = useMagneticButton(0.4, 100);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-eyebrow, .contact-title, .contact-bio', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
        opacity: 0,
        y: 60,
        stagger: 0.15,
        duration: 1.0,
        ease: 'power3.out',
      });

      gsap.from('.contact-info-item', {
        scrollTrigger: { trigger: '.contact-info', start: 'top 80%' },
        opacity: 0,
        x: -30,
        stagger: 0.12,
        duration: 0.8,
        ease: 'power2.out',
      });

      gsap.from('.contact-cta-wrap', {
        scrollTrigger: { trigger: '.contact-cta-wrap', start: 'top 85%' },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" className="contact" ref={sectionRef}>
      {/* Cinematic background */}
      <div className="contact-bg" aria-hidden="true">
        <div className="contact-bg-glow contact-bg-glow--1" />
        <div className="contact-bg-glow contact-bg-glow--2" />
        <div className="contact-grid" />
      </div>

      <div className="container">
        <div className="contact-inner">
          <div className="section-label contact-eyebrow">Get In Touch</div>

          <h2 className="contact-title">
            Let's Build Something <span className="gradient-text">Extraordinary.</span>
          </h2>

          <p className="contact-bio">
            Open to collaboration, opportunities, and conversations about technology,
            AI, and building meaningful digital experiences.
          </p>

          {/* Info items */}
          <div className="contact-info">
            <div className="glass contact-info-item">
              <div className="contact-info-icon" aria-hidden="true">✉</div>
              <div>
                <div className="contact-info-label mono uppercase">Email</div>
                <a href={`mailto:${personalInfo.email}`} className="contact-info-value" data-cursor="contact">
                  {personalInfo.email}
                </a>
              </div>
            </div>

            <div className="glass contact-info-item">
              <div className="contact-info-icon" aria-hidden="true">📞</div>
              <div>
                <div className="contact-info-label mono uppercase">Phone</div>
                <a href={`tel:${personalInfo.phone}`} className="contact-info-value" data-cursor="link">
                  {personalInfo.phone}
                </a>
              </div>
            </div>

            <div className="glass contact-info-item">
              <div className="contact-info-icon" aria-hidden="true">📍</div>
              <div>
                <div className="contact-info-label mono uppercase">Location</div>
                <span className="contact-info-value">{personalInfo.location}</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="contact-cta-wrap">
            <a
              ref={emailBtn}
              href={`mailto:${personalInfo.email}`}
              className="btn-magnetic btn-primary contact-cta"
              data-cursor="contact"
            >
              <span>Let's Connect</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
