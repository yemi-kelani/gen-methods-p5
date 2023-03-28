class FlowerBoidSystem extends ParticleSystem {
  static label = "Boids"; // Ignore the Glitch parse error
  static desc = "hover the mouse over the canvas"; // Ignore the Glitch parse error

  constructor() {
    // Make what particle, and how many?
    // Try different numbers of particles
    super(FlowerBoidParticle, 100);
    this.mouse = new Vector2D(p.mouseX, p.mouseY)
    this.pos = new Vector2D(p.mouseX, p.mouseY)
    this.prevpos = new Vector2D(p.mouseX, p.mouseY)
    let ratio = document.getElementById("mix-slider").value;
    this.rflower = p.loadImage("https://cdn.glitch.global/5446e88e-e954-471e-94f3-6ca8eeaee958/flower.png?v=1665932529614")
    this.bflower = p.loadImage("https://cdn.glitch.global/5446e88e-e954-471e-94f3-6ca8eeaee958/b-flower.png?v=1665932533011")
    this.flower = Math.random() < ratio ? this.bflower : this.rflower;
    
    this.flockCenter = new Vector2D()
    this.flockVelocity = new Vector2D()
  }

   beforeMove(p, dt) {
    this.flockCenter.mult(0)
    this.flockVelocity.mult(0)
    this.particles.forEach(pt => {
      this.flockCenter.add(pt.pos)
      this.flockVelocity.add(pt.v)
    })
    this.flockVelocity.div(this.particles.length)
    this.flockCenter.div(this.particles.length)
  }
  
  draw(p) {
    this.pos[0] = p.mouseX;
    this.pos[1] = p.mouseY;
    this.t = p.millis() * 0.001;
    this.pp = (this.t % this.loopTime) / this.loopTime;
    this.pct = Math.PI * 2 * this.pp;
    p.background(255,255,255);
    
    p.push()
    p.noFill()
    p.stroke(0, 0, 0)
    p.circle(p.mouseX, p.mouseY, 60)
    p.pop()
    
    const size = 25;
    this.pos[0] = p.mouseX-12
    this.pos[1] = p.mouseY-12
  
    p.image(this.flower, this.pos[0], this.pos[1], 25, 25);

    p.noFill()
    p.stroke(0, 0, 0)
    p.circle(...this.flockCenter, 50)
    
    // p.strokeWeight(1)
    // let dest = new Vector2D(p.mouseX, p.mouseY)
    // this.pos.drawArrow(p, this.flockCenter, {
    //   m: 0.4,
    //   color: [200, 100, 50],
    // })
    // The "super-class" draws the particles
    super.draw(p);
    
  }
}

//=========================================================================
//=========================================================================
//=========================================================================

class FlowerBoidParticle extends Particle {
  constructor(ps, index) {
    // ps: the particle system this particle belongs to
    // index: of all the particles in that system, this one's index
    super(ps, index);
    let ratio = document.getElementById("mix-slider").value;
    this.rflower = p.loadImage("https://cdn.glitch.global/5446e88e-e954-471e-94f3-6ca8eeaee958/flower.png?v=1665932529614")
    this.bflower = p.loadImage("https://cdn.glitch.global/5446e88e-e954-471e-94f3-6ca8eeaee958/b-flower.png?v=1665932533011")
    this.flower = Math.random() > ratio ? this.bflower : this.rflower;
    // Here's a new Vector2D we can store a force in so we can visualize it later
    this.attractionForce = new Vector2D()
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
    this.f.add(this.pos.getForceTowardsPoint(this.mouse, 1, {startRadius: 120, falloff: 1.1}))
    
    this.prevpos = this.mouse
    this.mouse = new Vector2D(p.mouseX, p.mouseY)
    this.attractionForce = this.pos.getForceTowardsPoint(this.mouse, .1, { falloff:1.25 } )
    this.f.add(this.attractionForce)
    
    if (this.inPerimeter(...this.pos,60)) {
      this.v.mult(0);
    }
    
    if (this.outOfBorder(...this.pos)) {
      this.v.setToPolar(10, this.angle)
      this.attractionForce = this.pos.getForceTowardsPoint(this.mouse, .1, { falloff:1.25 } )
      this.f.add(this.attractionForce)
    }
  }
  
  inPerimeter(x,y,r) {
    if (x < this.mouse[0]+r && x > this.mouse[0]-r) {
      if (y < this.mouse[1]+r && y > this.mouse[1]-r) {
        return true;
      }
    }
    return false;
  }
  
  outOfBorder(x,y) {
    if (x > p.width || x < 0) {
      if (y > p.height || y < 0) {
        return true;
      }
    }
    return false;
  }
  
  // move(p, dt) {
  //   super.move(p, dt)
  //    this.pos.wrapX(0, p.width);
  //   this.pos.wrapY(0, p.height);
  // }

  draw(p, drawDebug = false) {
    
    let t = p.millis() * 0.001;
  
    const size = 20;
    
    // p.noStroke();
    p.push()
    p.translate(...this.pos)
    // p.rotate(this.v.angle + this.angle);
    p.imageMode(p.CENTER);
    p.image(this.flower, 0, 0, size, size);
    p.pop()
  }
}
