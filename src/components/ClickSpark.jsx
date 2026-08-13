import React, { useEffect } from 'react';
import './ClickSpark.css';

const ClickSpark = () => {
  useEffect(() => {
    const handleClick = (e) => {
      // Check if clicked element is a button, link, or has button-like classes
      const target = e.target.closest('button, a, .btn, .project-btn, .project-institution-link, .nav-link, .hero-stat');
      
      if (!target) return;

      const spark = document.createElement('div');
      spark.className = 'click-spark-container';
      spark.style.left = `${e.clientX}px`;
      spark.style.top = `${e.clientY}px`;
      document.body.appendChild(spark);

      // Create multiple particles
      for (let i = 0; i < 8; i++) {
        const particle = document.createElement('div');
        particle.className = 'click-spark-particle';
        const angle = (i / 8) * 360;
        particle.style.setProperty('--angle', `${angle}deg`);
        spark.appendChild(particle);
      }

      // Create a central ripple/burst
      const ripple = document.createElement('div');
      ripple.className = 'click-spark-ripple';
      spark.appendChild(ripple);

      setTimeout(() => {
        if (spark.parentNode) {
          spark.parentNode.removeChild(spark);
        }
      }, 600);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
};

export default ClickSpark;
