import React, { useRef, useEffect } from 'react';

export default function ParticleSphere({
  width = 380,
  height = 160,
  isThinking = false,
  isSpeaking = false,
  interactive = true,
  numParticles = 1400,
  baseRadius = 52,
  colorScheme = 'green'
}) {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const stateRef = useRef({
    rotX: 0.3,
    rotY: 0,
    targetRotX: 0.3,
    targetRotY: 0,
    time: 0,
    isHovered: false
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI displays
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Pre-calculate Fibonacci points on sphere
    const points = [];
    for (let i = 0; i < numParticles; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / numParticles);
      const theta = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
      points.push({ phi, theta, id: i });
    }

    const render = () => {
      const state = stateRef.current;
      const speed = isSpeaking ? 0.032 : (isThinking ? 0.035 : 0.015);
      state.time += speed;

      // Auto-rotation + smooth mouse lerp
      if (!state.isHovered) {
        state.targetRotY += 0.008;
      }
      state.rotX += (state.targetRotX - state.rotX) * 0.08;
      state.rotY += (state.targetRotY - state.rotY) * 0.08;

      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const fov = 240;

      // Dynamic breathing / expansion & contraction pulse ("bada chota")
      let dynamicRadius = baseRadius;
      if (isSpeaking) {
        // Active multi-frequency voice pulse: expands and contracts dynamically like a sentient voice orb
        const speechPulse = Math.sin(state.time * 4.2) * 16 + Math.cos(state.time * 7.5) * 8;
        dynamicRadius = baseRadius + speechPulse;
      } else if (isThinking) {
        const thinkPulse = Math.sin(state.time * 5.5) * 10;
        dynamicRadius = baseRadius + thinkPulse;
      } else {
        // Gentle idle breath
        dynamicRadius = baseRadius + Math.sin(state.time * 1.6) * 3;
      }

      const waveAmp = isSpeaking ? 1.85 : (isThinking ? 1.55 : 1.0);

      // Transform and project particles
      const projected = [];
      const cosY = Math.cos(state.rotY);
      const sinY = Math.sin(state.rotY);
      const cosX = Math.cos(state.rotX);
      const sinX = Math.sin(state.rotX);

      for (let i = 0; i < points.length; i++) {
        const { phi, theta } = points[i];

        // 3D glitch wave deformation formula matching "05_sphere_glitch_Dents_01_02"
        const wave1 = Math.sin(theta * 5 + state.time * 1.8) * Math.cos(phi * 4 + state.time * 1.3);
        const wave2 = Math.sin(phi * 7 - state.time * 2.1) * Math.sin(theta * 3 + state.time * 1.0);
        const dentWave = Math.sin(theta * 2 + phi * 3 + state.time * 1.4);
        const glitch = Math.sin(theta * 8 + state.time * 3.5) * Math.cos(phi * 6 - state.time * 2.8) * 0.45;

        // Radius with undulating surface displacement and dynamic speech scale
        const r = dynamicRadius + (wave1 * 6.8 + wave2 * 4.6 + dentWave * 3.8 + glitch * 3.2) * waveAmp;

        // Spherical to Cartesian
        const sinPhi = Math.sin(phi);
        const x = r * sinPhi * Math.cos(theta);
        const y = r * sinPhi * Math.sin(theta);
        const z = r * Math.cos(phi);

        // Rotation around Y
        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;

        // Rotation around X
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;

        // Perspective Projection
        const scale = fov / (fov + z2 + 80);
        const px = centerX + x1 * scale;
        const py = centerY + y2 * scale;

        projected.push({
          x: px,
          y: py,
          z: z2,
          scale
        });
      }

      // Sort by Z for proper depth ordering
      projected.sort((a, b) => a.z - b.z);

      // Subtle soft ambient volumetric sphere presence for light backgrounds
      if (colorScheme === 'green') {
        const innerGlow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, dynamicRadius * 0.92);
        innerGlow.addColorStop(0, 'rgba(16, 185, 129, 0.08)');
        innerGlow.addColorStop(0.6, 'rgba(5, 150, 105, 0.04)');
        innerGlow.addColorStop(1, 'rgba(4, 120, 87, 0)');
        ctx.fillStyle = innerGlow;
        ctx.beginPath();
        ctx.arc(centerX, centerY, dynamicRadius * 0.92, 0, Math.PI * 2);
        ctx.fill();
      }

      // Render dots in high-contrast dark green / emerald tones for clear visibility
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        // Depth factor: 0 (far) to 1 (near)
        const depth = (p.z + baseRadius * 1.5) / (baseRadius * 3.0);
        const clampedDepth = Math.max(0.12, Math.min(1, depth));

        if (colorScheme === 'green') {
          // Solid, darker green particles for high visibility on light glass
          const size = Math.max(0.95, clampedDepth * 2.2 * (isThinking ? 1.25 : 1.0));
          const alpha = Math.max(0.45, clampedDepth * 0.98);

          if (clampedDepth > 0.72) {
            // Front highlight dots: deep rich emerald
            ctx.fillStyle = isThinking
              ? `rgba(16, 185, 129, ${alpha})`
              : `rgba(4, 120, 87, ${alpha})`;
          } else if (clampedDepth > 0.42) {
            // Mid depth: dark forest emerald green
            ctx.fillStyle = `rgba(6, 95, 70, ${alpha})`;
          } else {
            // Back depth: deep hunter pine green for strong definition on white
            ctx.fillStyle = `rgba(2, 44, 34, ${alpha * 0.92})`;
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const size = Math.max(0.65, clampedDepth * 2.0 * (isThinking ? 1.2 : 1.0));
          const alpha = Math.max(0.18, clampedDepth * 0.96);

          if (clampedDepth > 0.72) {
            ctx.fillStyle = isThinking
              ? `rgba(255, 255, 200, ${alpha})`
              : `rgba(254, 240, 138, ${alpha})`;
          } else if (clampedDepth > 0.42) {
            ctx.fillStyle = `rgba(251, 191, 36, ${alpha})`;
          } else {
            ctx.fillStyle = `rgba(245, 158, 11, ${alpha * 0.85})`;
          }

          ctx.beginPath();
          ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [width, height, isThinking, isSpeaking, numParticles, baseRadius, colorScheme]);

  const handleMouseMove = (e) => {
    if (!interactive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    stateRef.current.targetRotY = (mouseX / (width / 2)) * 0.8;
    stateRef.current.targetRotX = 0.3 - (mouseY / (height / 2)) * 0.6;
    stateRef.current.isHovered = true;
  };

  const handleMouseLeave = () => {
    stateRef.current.isHovered = false;
    stateRef.current.targetRotX = 0.3;
  };

  return (
    <div
      style={{
        position: 'relative',
        width: `${width}px`,
        height: `${height}px`,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: interactive ? 'grab' : 'default',
        userSelect: 'none'
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          display: 'block'
        }}
      />
    </div>
  );
}
