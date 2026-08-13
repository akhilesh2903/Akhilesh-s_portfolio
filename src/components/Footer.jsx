import React from 'react';
import { personalInfo, socialLinks } from '../data/portfolioData';
import './Footer.css';

const SocialLink = ({ href, label, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="footer-social-link"
    aria-label={label}
    data-cursor="link"
  >
    {children}
  </a>
);

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-top-line" aria-hidden="true" />

      <div className="container">
        <div className="footer-inner">
          {/* Left */}
          <div className="footer-left">
            <div className="footer-name gradient-text-white">{personalInfo.name}</div>
            <p className="footer-tagline">"Engineering ideas into digital experiences."</p>

            {/* Availability badge */}
            {personalInfo.availableForOpportunities && (
              <div className="footer-avail">
                <span className="footer-avail-dot" />
                <span className="mono uppercase">Available for Opportunities</span>
              </div>
            )}
          </div>

          {/* Right */}
          <div className="footer-right">
            <div className="footer-social-label mono uppercase">Connect</div>
            <div className="footer-socials">
              <SocialLink href={socialLinks.linkedin} label="LinkedIn profile">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </SocialLink>
              <SocialLink href={socialLinks.github} label="GitHub profile">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                GitHub
              </SocialLink>
              <SocialLink href={socialLinks.leetcode} label="LeetCode profile">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
                  <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
                </svg>
                LeetCode
              </SocialLink>
              <SocialLink href={socialLinks.codechef} label="CodeChef profile">
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
                  <path d="M11.257.004C5.963.17.855 4.617.04 9.89c-.562 3.59.588 7.228 3.131 9.846 2.543 2.617 6.143 3.87 9.762 3.388 3.619-.482 6.798-2.609 8.656-5.74 1.857-3.13 2.136-6.985.742-10.35C20.852 3.603 16.551.168 11.257.004m-.288 1.65c.102.002.204.006.306.012 2.85.15 5.553 1.59 7.25 3.89 1.695 2.3 2.24 5.302 1.463 8.04-.776 2.738-2.837 5.018-5.46 6.093-2.62 1.074-5.643.882-8.1-.511-2.456-1.393-4.23-3.845-4.73-6.62-.5-2.772.31-5.694 2.162-7.755C5.712 2.742 8.33 1.634 10.969 1.654m-.3 2.197c-2.09.013-4.133.986-5.494 2.666-1.36 1.681-1.885 3.945-1.394 6.072.491 2.127 2.038 3.987 4.054 4.851 2.016.864 4.413.718 6.3-.38 1.888-1.099 3.137-3.08 3.325-5.252.189-2.172-.7-4.365-2.326-5.762-1.18-1.012-2.66-1.585-4.175-1.706a7.5 7.5 0 0 0-.29-.006m.3 2.1c2.553 0 4.625 2.095 4.625 4.68s-2.072 4.68-4.625 4.68c-2.554 0-4.626-2.095-4.626-4.68s2.072-4.68 4.626-4.68"/>
                </svg>
                CodeChef
              </SocialLink>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <span className="footer-copy mono">© {year} {personalInfo.name}</span>
          <span className="footer-divider">·</span>
          <span className="footer-copy mono">Built with React, GSAP &amp; Three.js</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
