// p5.js hero background — drifting generative particles in the tropical palette.
const PALETTE = ["#FF4D4D", "#00A896", "#FFBA08", "#1A1A2E"];

const heroSketch = (p) => {
  let particles = [];
  let host;

  const size = () => {
    host = document.getElementById("hero-canvas");
    return { w: host.offsetWidth, h: host.offsetHeight };
  };

  class Particle {
    constructor(w, h) { this.reset(w, h, true); }
    reset(w, h, anywhere) {
      this.x = p.random(w);
      this.y = anywhere ? p.random(h) : h + 20;
      this.r = p.random(6, 22);
      this.speed = p.random(0.2, 0.9);
      this.drift = p.random(0.4, 1.4);
      this.phase = p.random(p.TWO_PI);
      this.col = p.color(p.random(PALETTE));
      this.shape = p.floor(p.random(3)); // 0 circle, 1 ring, 2 diamond
      this.col.setAlpha(p.random(60, 170));
    }
    update(w, h) {
      this.y -= this.speed;
      this.x += Math.sin(p.frameCount * 0.01 + this.phase) * this.drift * 0.5;
      // mouse repulsion
      const dx = this.x - p.mouseX, dy = this.y - p.mouseY;
      const d = Math.hypot(dx, dy);
      if (d < 90 && d > 0) { this.x += (dx / d) * 1.5; this.y += (dy / d) * 1.5; }
      if (this.y < -30) this.reset(w, h, false);
    }
    draw() {
      p.noStroke();
      if (this.shape === 1) { p.noFill(); p.stroke(this.col); p.strokeWeight(2); }
      else p.fill(this.col);
      if (this.shape === 2) {
        p.push(); p.translate(this.x, this.y); p.rotate(p.QUARTER_PI);
        p.rectMode(p.CENTER); p.rect(0, 0, this.r, this.r); p.pop();
      } else {
        p.circle(this.x, this.y, this.r);
      }
    }
  }

  p.setup = () => {
    const { w, h } = size();
    p.createCanvas(w, h);
    particles = Array.from({ length: 70 }, () => new Particle(w, h));
  };
  p.draw = () => {
    p.clear();
    const w = p.width, h = p.height;
    particles.forEach((pt) => { pt.update(w, h); pt.draw(); });
  };
  p.windowResized = () => { const { w, h } = size(); p.resizeCanvas(w, h); };
};

new p5(heroSketch, document.getElementById("hero-canvas"));
