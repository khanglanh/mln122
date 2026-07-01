import React, { useEffect, useRef } from 'react';

export default function CanvasParticles({ stage = 0 }) {
  const canvasRef = useRef(null);
  const stageRef = useRef(stage);

  // Sync stage to ref so loop can read it without re-running useEffect
  useEffect(() => {
    stageRef.current = stage;
  }, [stage]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (canvas) {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    const particles = [];
    const maxParticlesCount = 90; // total pool

    for (let i = 0; i < maxParticlesCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? 'rgba(59, 130, 246, 0.4)' : 'rgba(168, 85, 247, 0.4)', // blue or purple
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const currentStage = stageRef.current;
      
      // Determine active particle count, connection lines, and speed based on stage
      let activeCount = 25; // Sparse beginning
      if (currentStage >= 2 && currentStage < 6) {
        activeCount = 50;   // More particles
      } else if (currentStage >= 6) {
        activeCount = 80;   // Full network
      }

      let maxDist = 0;
      let opacityMultiplier = 0.12;
      
      if (currentStage >= 2 && currentStage < 6) {
        maxDist = 100;
        opacityMultiplier = 0.15;
      } else if (currentStage >= 6) {
        maxDist = 140;
        opacityMultiplier = 0.28; // Brighter connections
      }

      let speedMultiplier = 1.0;
      if (currentStage >= 7) {
        speedMultiplier = 0.35; // Stable network feeling
      } else if (currentStage === 6) {
        speedMultiplier = 0.6;  // Slowing down
      }

      // Draw faint connections (only between active particles)
      if (maxDist > 0) {
        ctx.lineWidth = 0.5;
        for (let i = 0; i < activeCount; i++) {
          for (let j = i + 1; j < activeCount; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxDist) {
              const alpha = (1 - dist / maxDist) * opacityMultiplier;
              // If stage >= 6, let connections be a bit purple/indigo
              if (currentStage >= 6) {
                ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
              } else {
                ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
              }
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
      }

      // Draw active particles
      for (let i = 0; i < activeCount; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * (currentStage >= 6 ? 1.25 : 1.0), 0, Math.PI * 2);
        
        if (currentStage >= 6) {
          // Glow effect for dark scene and onwards
          ctx.fillStyle = p.color.replace('0.4', '0.7');
          ctx.shadowBlur = 6;
          ctx.shadowColor = p.color.replace('0.4', '0.7');
        } else {
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 0;
        }
        
        ctx.fill();
        ctx.shadowBlur = 0; // reset

        // Move particle
        p.x += p.vx * speedMultiplier;
        p.y += p.vy * speedMultiplier;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />;
}
