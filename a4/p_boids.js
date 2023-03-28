/* globals Vector2D, Particle, ParticleSystem, p */

/*
 * Basic particles with an attraction force
 */

class BoidSystem extends ParticleSystem {
  static label = "Boids"; // Ignore the Glitch parse error
  static desc = "hover the mouse over the canvas"; // Ignore the Glitch parse error

  constructor() {
    // Make what particle, and how many?
    // Try different numbers of particles
    super(BoidParticle, 40);
    
    this.flockCenter = new Vector2D()
    this.flockVelocity = new Vector2D()
  }
  
  beforeMove(p, dt) {
//     Calculate the flock's center and average direction
    
    this.flockCenter.mult(0)
    this.flockVelocity.mult(0)
    this.particles.forEach(pt => {
      this.flockCenter.add(pt.pos)
      this.flockVelocity.add(pt.v)
    })
    this.flockVelocity.div(this.particles.length)
    this.flockCenter.div(this.particles.length)
  }
  
  
  mousePressed(p) {
    super.mousePressed(p)
    if (!this.held) {
      let pt = new BoidParticle(this)
      pt.pos.setTo(p.mouseX, p.mouseY)
      this.particles.push(pt)
    }
  }

  draw(p) {
    // A little bit of trails!
    p.background(0, 0, 50, 0.5);
     
    p.noFill()
    p.stroke(100, 0, 100, .4)
    p.circle(...this.flockCenter, 100)

    // The "super-class" draws the particles
    super.draw(p);
  }
}

//=========================================================================
//=========================================================================
//=========================================================================

class BoidParticle extends Particle {
  constructor(ps, index) {
    // ps: the particle system this particle belongs to
    // index: of all the particles in that system, this one's index
    super(ps, index);
    
    this.draggable = true

    this.pos.setToRandom(0, p.width, 0, p.height);
    this.radius = 10
    this.angle = Math.random()*100
    this.v.setToPolar(10, this.angle)
  }

  calculateForces(p, dt) {
    this.angle = this.v.angle
    let center = new Vector2D(p.width/2, p.height/2)
    // Add a border force
    this.f.add(this.pos.getForceTowardsPoint(center, 1, {startRadius: 120, falloff: 1.2}))
    
    // Add boids force
  }
  
  // move(p, dt) {
  //   super.move(p, dt)
  //    this.pos.wrapX(0, p.width);
  //   this.pos.wrapY(0, p.height);
  // }

  draw(p, drawDebug = false) {
    
    let t = p.millis() * 0.001;
  
    p.noStroke();
    p.fill(100)
    p.push()
    p.translate(...this.pos)
    p.rotate(this.angle)
    
    p.beginShape()
    p.vertex(this.radius, 0)
    p.vertex(-this.radius, -this.radius)
     p.vertex(0, 0)
    p.vertex(-this.radius, this.radius)
    
    
    p.endShape()
    
    p.pop()
  }
}
