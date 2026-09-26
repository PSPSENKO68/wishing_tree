import { useEffect, useRef } from 'react';

interface FallingLeaf {
  x: number;
  y: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  shape: 'leaf' | 'petal' | 'small';
  swayPhase: number;
  swaySpeed: number;
}

const LEAF_COLORS = [
  '#7C9070', '#8FA078', '#6B8055', // greens
  '#9CAF88', '#A8B895',           // light greens
  '#D98E4A', '#C97E3A',           // amber/autumn
  '#B8966A', '#C9A876',           // warm yellows
  '#E0A060',                       // golden
];

const WIND_COLORS = [
  'rgba(255,255,255,0.06)',
  'rgba(156,175,136,0.04)',
  'rgba(200,190,170,0.05)',
];

export function FallingLeavesEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const leavesRef = useRef<FallingLeaf[]>([]);
  const windLinesRef = useRef<{ x: number; y: number; length: number; speed: number; opacity: number; color: string }[]>([]);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize falling leaves
    const createLeaf = (): FallingLeaf => ({
      x: Math.random() * canvas.width * 1.2 - canvas.width * 0.1,
      y: -20 - Math.random() * 100,
      size: 6 + Math.random() * 12,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.03,
      speedX: 0.3 + Math.random() * 0.8,
      speedY: 0.4 + Math.random() * 0.8,
      opacity: 0.3 + Math.random() * 0.5,
      color: LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)],
      shape: (['leaf', 'petal', 'small'] as const)[Math.floor(Math.random() * 3)],
      swayPhase: Math.random() * Math.PI * 2,
      swaySpeed: 0.01 + Math.random() * 0.02,
    });

    // Start with some leaves already on screen
    for (let i = 0; i < 15; i++) {
      const leaf = createLeaf();
      leaf.y = Math.random() * canvas.height;
      leaf.x = Math.random() * canvas.width;
      leavesRef.current.push(leaf);
    }

    // Initialize wind streaks
    const createWindLine = () => ({
      x: -100,
      y: Math.random() * canvas.height,
      length: 60 + Math.random() * 120,
      speed: 3 + Math.random() * 5,
      opacity: 0.03 + Math.random() * 0.06,
      color: WIND_COLORS[Math.floor(Math.random() * WIND_COLORS.length)],
    });

    for (let i = 0; i < 6; i++) {
      const line = createWindLine();
      line.x = Math.random() * canvas.width;
      windLinesRef.current.push(line);
    }

    // Draw leaf shape
    const drawLeaf = (ctx: CanvasRenderingContext2D, leaf: FallingLeaf) => {
      ctx.save();
      ctx.translate(leaf.x, leaf.y);
      ctx.rotate(leaf.rotation);
      ctx.globalAlpha = leaf.opacity;
      ctx.fillStyle = leaf.color;

      if (leaf.shape === 'leaf') {
        // Classic leaf shape
        ctx.beginPath();
        ctx.moveTo(0, -leaf.size);
        ctx.bezierCurveTo(leaf.size * 0.6, -leaf.size * 0.6, leaf.size * 0.6, leaf.size * 0.3, 0, leaf.size);
        ctx.bezierCurveTo(-leaf.size * 0.6, leaf.size * 0.3, -leaf.size * 0.6, -leaf.size * 0.6, 0, -leaf.size);
        ctx.fill();
        // Vein
        ctx.strokeStyle = 'rgba(255,255,255,0.2)';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(0, -leaf.size * 0.8);
        ctx.lineTo(0, leaf.size * 0.8);
        ctx.stroke();
      } else if (leaf.shape === 'petal') {
        // Rounded petal shape
        ctx.beginPath();
        ctx.ellipse(0, 0, leaf.size * 0.4, leaf.size * 0.7, 0, 0, Math.PI * 2);
        ctx.fill();
      } else {
        // Small dot / seed
        ctx.beginPath();
        ctx.arc(0, 0, leaf.size * 0.3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.016;

      // Global wind oscillation
      const windForce = Math.sin(time * 0.5) * 0.5 + Math.sin(time * 0.17) * 0.3;

      // Update & draw wind streaks
      windLinesRef.current.forEach((line, i) => {
        line.x += line.speed;
        line.y += Math.sin(time + i) * 0.3;

        ctx.save();
        ctx.globalAlpha = line.opacity;
        ctx.strokeStyle = line.color;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(line.x + line.length, line.y + Math.sin(time * 2 + i) * 5);
        ctx.stroke();
        ctx.restore();

        // Reset when off screen
        if (line.x > canvas.width + 200) {
          Object.assign(line, createWindLine());
        }
      });

      // Update & draw falling leaves
      leavesRef.current.forEach((leaf) => {
        leaf.swayPhase += leaf.swaySpeed;
        leaf.x += leaf.speedX + windForce + Math.sin(leaf.swayPhase) * 0.8;
        leaf.y += leaf.speedY + Math.cos(leaf.swayPhase * 0.7) * 0.2;
        leaf.rotation += leaf.rotationSpeed + windForce * 0.01;

        drawLeaf(ctx, leaf);

        // Reset when off screen
        if (leaf.y > canvas.height + 30 || leaf.x > canvas.width + 50) {
          leaf.x = -20 + Math.random() * canvas.width * 0.3;
          leaf.y = -20 - Math.random() * 60;
          leaf.speedX = 0.3 + Math.random() * 0.8;
          leaf.speedY = 0.4 + Math.random() * 0.8;
          leaf.opacity = 0.3 + Math.random() * 0.5;
          leaf.color = LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)];
        }
      });

      // Occasionally spawn a new leaf
      if (Math.random() < 0.008 && leavesRef.current.length < 25) {
        leavesRef.current.push(createLeaf());
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[5]"
      aria-hidden="true"
    />
  );
}
