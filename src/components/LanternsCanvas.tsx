import React, { useEffect, useRef } from 'react';

interface Lantern {
  x: number;
  y: number;
  speedY: number;
  swaySpeed: number;
  swayAmplitude: number;
  swayOffset: number;
  size: number;
  opacity: number;
  pulseSpeed: number;
  pulsePhase: number;
  glowColor: string;
  isSpecial?: boolean;
}

interface Sparkle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speedY: number;
  speedX: number;
  life: number;
  maxLife: number;
}

export const LanternsCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Initial Lanterns Pool
    const lanternCount = Math.min(26, Math.max(16, Math.floor(width / 35)));
    const lanterns: Lantern[] = [];
    const sparkles: Sparkle[] = [];

    const createLantern = (initialY?: number, isSpecial = false): Lantern => {
      const size = isSpecial ? 22 + Math.random() * 10 : 12 + Math.random() * 16;
      return {
        x: Math.random() * width,
        y: initialY !== undefined ? initialY : height + Math.random() * 150,
        speedY: isSpecial ? 0.7 + Math.random() * 0.6 : 0.28 + Math.random() * 0.55,
        swaySpeed: 0.015 + Math.random() * 0.02,
        swayAmplitude: 0.5 + Math.random() * 1.4,
        swayOffset: Math.random() * Math.PI * 2,
        size,
        opacity: 0.35 + Math.random() * 0.6,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        pulsePhase: Math.random() * Math.PI * 2,
        glowColor: Math.random() > 0.3 ? '#f6ebbd' : '#ffcf66',
        isSpecial,
      };
    };

    // Populate initial spread so they don't all appear from the bottom simultaneously
    for (let i = 0; i < lanternCount; i++) {
      lanterns.push(createLantern(Math.random() * height));
    }

    // Function to add click/touch sparkles
    const addSparkles = (x: number, y: number, count = 12) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.5 + Math.random() * 2.2;
        sparkles.push({
          x,
          y,
          size: 1 + Math.random() * 2.5,
          opacity: 0.9,
          speedX: Math.cos(angle) * speed,
          speedY: Math.sin(angle) * speed - 0.5,
          life: 0,
          maxLife: 40 + Math.random() * 40,
        });
      }
    };

    // Draw an iconic Rapunzel / Tangled golden lantern
    const drawLantern = (l: Lantern) => {
      ctx.save();
      const currentOpacity = l.opacity * (0.85 + Math.sin(l.pulsePhase) * 0.15);
      ctx.globalAlpha = Math.min(1, Math.max(0, currentOpacity));

      // 1. Outer Warm Aura / Corona Glow
      const glowRadius = l.size * 2.4;
      const glowGrad = ctx.createRadialGradient(l.x, l.y, 0, l.x, l.y, glowRadius);
      glowGrad.addColorStop(0, 'rgba(255, 238, 170, 0.95)');
      glowGrad.addColorStop(0.25, 'rgba(245, 175, 55, 0.55)');
      glowGrad.addColorStop(0.65, 'rgba(180, 80, 20, 0.18)');
      glowGrad.addColorStop(1, 'rgba(42, 13, 54, 0)');

      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(l.x, l.y, glowRadius, 0, Math.PI * 2);
      ctx.fill();

      // 2. Lantern Body (warm translucent cylinder with rounded corners)
      const w = l.size;
      const h = l.size * 1.35;
      const rx = l.x - w / 2;
      const ry = l.y - h / 2;

      const bodyGrad = ctx.createLinearGradient(rx, ry, rx + w, ry + h);
      bodyGrad.addColorStop(0, '#fff4cc');
      bodyGrad.addColorStop(0.4, '#fcd34d');
      bodyGrad.addColorStop(0.8, '#f59e0b');
      bodyGrad.addColorStop(1, '#b45309');

      ctx.fillStyle = bodyGrad;
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(rx, ry, w, h, [4, 4, 3, 3]);
      } else {
        ctx.rect(rx, ry, w, h);
      }
      ctx.fill();

      // 3. Inner Rapunzel Sun Motif Silhouette (warm golden orange)
      ctx.fillStyle = 'rgba(180, 83, 9, 0.55)';
      ctx.beginPath();
      ctx.arc(l.x, l.y, l.size * 0.22, 0, Math.PI * 2);
      ctx.fill();

      // Tiny rays for sun motif if large enough
      if (l.size > 16) {
        ctx.strokeStyle = 'rgba(180, 83, 9, 0.45)';
        ctx.lineWidth = 1;
        for (let r = 0; r < 8; r++) {
          const a = (r * Math.PI) / 4;
          ctx.beginPath();
          ctx.moveTo(l.x + Math.cos(a) * (l.size * 0.24), l.y + Math.sin(a) * (l.size * 0.24));
          ctx.lineTo(l.x + Math.cos(a) * (l.size * 0.38), l.y + Math.sin(a) * (l.size * 0.38));
          ctx.stroke();
        }
      }

      // 4. Subtle lantern top and bottom rim lines
      ctx.strokeStyle = 'rgba(120, 53, 15, 0.6)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(rx, ry + 2);
      ctx.lineTo(rx + w, ry + 2);
      ctx.moveTo(rx, ry + h - 2);
      ctx.lineTo(rx + w, ry + h - 2);
      ctx.stroke();

      ctx.restore();
    };

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Render & update lanterns
      for (let i = 0; i < lanterns.length; i++) {
        const l = lanterns[i];
        l.y -= l.speedY;
        l.x += Math.sin(l.swayOffset) * l.swayAmplitude;
        l.swayOffset += l.swaySpeed;
        l.pulsePhase += l.pulseSpeed;

        // Occasional faint golden dust trail behind rising lanterns
        if (Math.random() < 0.08) {
          sparkles.push({
            x: l.x + (Math.random() - 0.5) * (l.size * 0.8),
            y: l.y + l.size * 0.6,
            size: 0.8 + Math.random() * 1.5,
            opacity: 0.6,
            speedX: (Math.random() - 0.5) * 0.3,
            speedY: 0.2 + Math.random() * 0.4,
            life: 0,
            maxLife: 25 + Math.random() * 20,
          });
        }

        drawLantern(l);

        // Reset if float off top
        if (l.y < -60) {
          lanterns[i] = createLantern(height + 30);
        }
      }

      // Render & update sparkles
      for (let s = sparkles.length - 1; s >= 0; s--) {
        const sp = sparkles[s];
        sp.x += sp.speedX;
        sp.y += sp.speedY;
        sp.life++;

        const progress = sp.life / sp.maxLife;
        const currentAlpha = sp.opacity * (1 - progress);

        if (progress >= 1) {
          sparkles.splice(s, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = currentAlpha;
        ctx.fillStyle = '#fef08a';
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Listen for custom trigger to release a lantern from user wish
    const handleLaunchLantern = (e: CustomEvent<{ name: string }>) => {
      const newL = createLantern(height + 20, true);
      newL.x = width * 0.3 + Math.random() * (width * 0.4);
      lanterns.push(newL);
      addSparkles(newL.x, height - 80, 24);
    };

    window.addEventListener('launch-wish-lantern' as any, handleLaunchLantern as any);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('launch-wish-lantern' as any, handleLaunchLantern as any);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      id="lanternsCanvas"
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};
