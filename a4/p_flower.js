/* globals Vector2D, Particle, ParticleSystem, p */

/*
 * Wind-driven particles that respond to different kinds of wander forces
 * Which looks the most like "leaves"?
 */

class Flower extends ParticleSystem {
  static label = "✿ ❁"; // Ignore the Glitch parse error
  static desc = "wind system particles with flowers";
  constructor() {
    // Make wind particles
    super(FlowerParticle, 200);
    this.windScale = 0.001;
  }
  
  draw(p) {
    p.background(255, 255, 255);
    super.draw(p)
  }

  getWindAt(x, y) {
    let windTheta = 10 * p.noise(x * this.windScale, y * this.windScale);
    let windSpeed = 10;
    return Vector2D.polar(windSpeed, windTheta);
  }
}

//=========================================================================
//=========================================================================
//=========================================================================

class FlowerParticle extends Particle {
  constructor(ps, index) {
    super(ps, index);
    let ratio = document.getElementById("mix-slider").value;
    this.rflower = p.loadImage("https://cdn.glitch.global/5446e88e-e954-471e-94f3-6ca8eeaee958/flower.png?v=1665932529614")
    this.bflower = p.loadImage("https://cdn.glitch.global/5446e88e-e954-471e-94f3-6ca8eeaee958/b-flower.png?v=1665932533011")
    this.flower = Math.random() > ratio ? this.bflower : this.rflower;
    this.angle = Math.random()*200
    this.hue = Math.random()*60

    // Put these particles somewhere randomly on screen
    this.pos.setToRandom(0, p.width, 0, p.height); // Set to a random (x0,x1,y0,y1)
    this.v.setTo(0, 100);

    // Store a wind force so we can visualize it
    this.windForce = new Vector2D();
  }

  calculateForces(p, dt) {
    let t = p.millis() * 0.001;

    // Apply some "drag" by making the velocity smaller
    this.v.mult(0.99);

    this.f.add(0, 40);

    //     Different "wander forces"

    let windX = this.ps.windScale * this.pos[0];
    let windY = this.ps.windScale * this.pos[1];

    // Which way to go?
    // Set the wind from just the time (note how they synchronize)
    let windDir = 20 * p.noise(t * 0.1);
    windDir = 20*p.noise(windX, windY, t*.1)
    
    // Spin with the wind!
    this.angle += Math.sin(windDir)*.1

    this.windForce.setToPolar(100, windDir);
    this.f.add(this.windForce);
  }

  move(p, dt) {
    // Call the original move function
    super.move(p, dt);
    this.pos.wrapX(0, p.width);
    this.pos.wrapY(0, p.height);
    
  }

  draw(p, drawDebug = false) {
    
    this.t = p.millis() * 0.001;
    this.pct = this.t % 2*Math.PI;
    
    this.width = p.map(Math.sin(this.pct), -1, 1, 16, 24)
    this.height = p.map(Math.cos(this.pct + Math.PI/2), -1, 1, 16, 24)

    
    p.push();
    p.translate(this.pos[0],this.pos[1]);
    // p.rotate(this.angle);
    p.rotate(this.v.angle + this.angle);
    p.imageMode(p.CENTER);
    p.image(this.flower, 0, 0, this.width, this.height);
    p.pop();

    if (drawDebug) {
      this.pos.drawArrow(p, this.windForce, { m: 0.2 });
    }
  }
}
