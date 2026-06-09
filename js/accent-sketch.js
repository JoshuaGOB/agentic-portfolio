// p5.js section accents: pulsing radial bursts, gated by IntersectionObserver.
const PALETTE = ["#FF4D4D", "#00A896", "#FFBA08"];

function makeAccent(host) {
  const sketch = (p) => {
    const W = () => host.offsetWidth;
    const H = 60;
    p.setup = () => { p.createCanvas(W(), H); p.noLoop(); };
    p.windowResized = () => p.resizeCanvas(W(), H);
    p.draw = () => {
      p.clear();
      const cy = H / 2;
      const cols = PALETTE.map((c) => p.color(c));
      const count = Math.max(8, Math.floor(W() / 70));
      for (let i = 0; i < count; i++) {
        const cx = (i + 0.5) * (W() / count);
        const t = p.frameCount * 0.05 + i * 0.6;
        const len = 8 + Math.abs(Math.sin(t)) * 16;
        p.stroke(cols[i % cols.length]); p.strokeWeight(2);
        for (let a = 0; a < 4; a++) {
          const ang = (p.PI / 2) * a + p.frameCount * 0.01;
          p.line(cx, cy, cx + Math.cos(ang) * len, cy + Math.sin(ang) * len);
        }
        p.noStroke(); p.fill(cols[(i + 1) % cols.length]);
        p.circle(cx, cy, 4 + Math.abs(Math.sin(t)) * 4);
      }
    };
    // gate animation to visibility
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) p.loop(); else p.noLoop();
    }, { threshold: 0 });
    io.observe(host);
  };
  new p5(sketch, host);
}

export function initAccents() {
  document.querySelectorAll(".accent-canvas").forEach(makeAccent);
}
