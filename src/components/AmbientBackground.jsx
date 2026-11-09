import React, { useEffect, useRef, useState } from 'react';

/**
 * Apple Light Glass Ambient Background System - Rich Spatial Atmosphere
 * 
 * Provides:
 * - Soft Alabaster base canvas with vibrant emerald, sage, and mint ambient mesh gradients
 * - Cursor-responsive ambient light spotlight with smooth requestAnimationFrame lerping
 * - Noticeable scroll parallax shifting atmospheric layers
 * - Tactile micro-grain texture
 * - Completely hardware-accelerated with zero performance penalty
 */
export function AmbientBackground() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const targetPosRef = useRef({ x: 0.5, y: 0.3 });
  const currentPosRef = useRef({ x: 0.5, y: 0.3 });
  const [scrollY, setScrollY] = useState(0);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);

    if (mediaQuery.matches) {
      return () => mediaQuery.removeEventListener('change', handleChange);
    }

    const handlePointerMove = (e) => {
      const { innerWidth, innerHeight } = window;
      targetPosRef.current = {
        x: Math.max(0, Math.min(1, e.clientX / innerWidth)),
        y: Math.max(0, Math.min(1, e.clientY / innerHeight))
      };
    };

    const handleScroll = () => {
      const mainWrapper = document.querySelector('.main-wrapper');
      const offset = mainWrapper ? mainWrapper.scrollTop : window.scrollY;
      setScrollY(offset);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    const mainWrapper = document.querySelector('.main-wrapper');
    if (mainWrapper) {
      mainWrapper.addEventListener('scroll', handleScroll, { passive: true });
    }

    const animate = () => {
      currentPosRef.current.x += (targetPosRef.current.x - currentPosRef.current.x) * 0.08;
      currentPosRef.current.y += (targetPosRef.current.y - currentPosRef.current.y) * 0.08;

      if (canvasRef.current) {
        const xPercent = (currentPosRef.current.x * 100).toFixed(2);
        const yPercent = (currentPosRef.current.y * 100).toFixed(2);
        canvasRef.current.style.setProperty('--cursor-x', `${xPercent}%`);
        canvasRef.current.style.setProperty('--cursor-y', `${yPercent}%`);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      if (mainWrapper) {
        mainWrapper.removeEventListener('scroll', handleScroll);
      }
      mediaQuery.removeEventListener('change', handleChange);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Noticeable yet elegant parallax offsets
  const parallaxY1 = isReducedMotion ? 0 : Math.min(22, scrollY * 0.045);
  const parallaxY2 = isReducedMotion ? 0 : Math.min(26, scrollY * -0.038);

  return (
    <div
      ref={canvasRef}
      className="apple-ambient-canvas"
      aria-hidden="true"
      style={{
        '--cursor-x': '50%',
        '--cursor-y': '30%'
      }}
    >
      {/* 1. Multi-Layer Vibrant Ambient Mesh Glows */}
      <div
        className="apple-glow-orb apple-glow-top-left"
        style={{ transform: `translate3d(0, ${parallaxY1}px, 0)` }}
      />
      <div
        className="apple-glow-orb apple-glow-top-right"
        style={{ transform: `translate3d(0, ${parallaxY2}px, 0)` }}
      />
      <div
        className="apple-glow-orb apple-glow-bottom-right"
        style={{ transform: `translate3d(0, ${parallaxY1 * -0.7}px, 0)` }}
      />
      <div
        className="apple-glow-orb apple-glow-bottom-left"
        style={{ transform: `translate3d(0, ${parallaxY2 * -0.7}px, 0)` }}
      />

      {/* 2. Cursor-Responsive Ambient Spotlight */}
      {!isReducedMotion && (
        <div className="apple-cursor-spotlight" />
      )}

      {/* 3. Subtle Ambient Light Grid Matrix */}
      <div className="apple-ambient-grid" />

      {/* 4. Tactile Micro-Grain Texture */}
      <div className="apple-ambient-grain" />
    </div>
  );
}

export default AmbientBackground;
