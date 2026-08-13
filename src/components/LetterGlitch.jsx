import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

const LetterGlitch = () => {
  const canvasRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=<>?[]{}|;:',.ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ";
    
    const fontSize = 14;
    let columns = 0;
    let rows = 0;
    let grid = [];
    
    const resize = () => {
      // Handle high DPI displays for sharper text
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      
      ctx.scale(dpr, dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      columns = Math.ceil(window.innerWidth / fontSize);
      rows = Math.ceil(window.innerHeight / fontSize);
      
      grid = [];
      for (let i = 0; i < columns * rows; i++) {
        grid.push({
          char: chars[Math.floor(Math.random() * chars.length)],
          opacity: Math.random() * 0.1, // very low initial opacity
          targetOpacity: Math.random() * 0.12,
          glitching: Math.random() > 0.98
        });
      }
    };
    
    window.addEventListener('resize', resize);
    resize();
    
    let lastTime = 0;
    const fps = 24; // Cinematic/glitchy framerate
    const interval = 1000 / fps;
    
    const draw = (time) => {
      animationFrameId = requestAnimationFrame(draw);
      
      if (time - lastTime < interval) return;
      lastTime = time;
      
      // Clear with slight transparency for a subtle trailing effect
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      const isLight = theme === 'light';
      
      for (let i = 0; i < grid.length; i++) {
        const col = i % columns;
        const row = Math.floor(i / columns);
        const cell = grid[i];
        
        // Randomly trigger glitch state
        if (Math.random() > 0.995) cell.glitching = true;
        if (cell.glitching && Math.random() > 0.6) cell.glitching = false;
        
        if (cell.glitching) {
          cell.char = chars[Math.floor(Math.random() * chars.length)];
          cell.opacity = 0.3; // subtle spike in opacity when glitching
        } else {
          // smoothly approach target opacity
          if (Math.random() > 0.98) cell.targetOpacity = Math.random() * 0.12;
          cell.opacity += (cell.targetOpacity - cell.opacity) * 0.05;
        }
        
        if (cell.opacity > 0.01) {
          const colorVal = isLight ? `0, 0, 0` : `0, 229, 255`; // Cyan for dark, black for light
          ctx.fillStyle = `rgba(${colorVal}, ${cell.opacity})`;
          ctx.fillText(cell.char, col * fontSize + fontSize/2, row * fontSize + fontSize/2);
        }
      }
    };
    
    animationFrameId = requestAnimationFrame(draw);
    
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);
  
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      pointerEvents: 'none',
      opacity: 0.7, // Overall opacity to make it subtle
    }} aria-hidden="true">
      <canvas ref={canvasRef} style={{ display: 'block' }} />
      {/* Subtle vignette to blend edges */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: theme === 'light' 
          ? 'radial-gradient(ellipse at center, transparent 40%, rgba(250, 246, 240, 0.8) 100%)'
          : 'radial-gradient(ellipse at center, transparent 40%, rgba(8, 8, 15, 0.8) 100%)'
      }} />
    </div>
  );
};

export default LetterGlitch;
