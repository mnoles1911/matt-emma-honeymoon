import { useRef, useEffect } from 'react';

export function Stars() {
  const ref = useRef();
  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    const resize = () => {
      c.width = c.offsetWidth;
      c.height = c.offsetHeight;
    };
    resize();
    const stars = Array.from({ length: 210 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.5 + 0.2,
      a: Math.random() * 0.75 + 0.15,
      s: Math.random() * 0.35 + 0.08,
      ph: Math.random() * Math.PI * 2,
    }));
    let t = 0;
    let frame;
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      stars.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x * c.width, s.y * c.height, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(185,220,255,${s.a * (0.45 + 0.55 * Math.sin(t * s.s + s.ph))})`;
        ctx.fill();
      });
      t += 0.018;
      frame = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, []);
  return <canvas ref={ref} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />;
}
