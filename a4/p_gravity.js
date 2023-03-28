class GravitySystem extends ParticleSystem {
  static label = "\"Gravity\""; // Ignore the Glitch parse error
  static desc = "particle creates particles. (not sure why this isn't breaking)."; // Ignore the Glitch parse error

  constructor() {
    // Make what particle, and how many?
    // Try different numbers of particles
    super(GravityParticle);
    this.mouse = new Vector2D(p.mouseX-12, p.mouseY-12)
    this.pos = new Vector2D(p.mouseX-12, p.mouseY-12)
    this.startpos = new Vector2D(p.mouseX, p.mouseY)
    let ratio = document.getElementById("mix-slider").value;
    this.rflower = p.loadImage("https://cdn.glitch.global/5446e88e-e954-471e-94f3-6ca8eeaee958/flower.png?v=1665932529614")
    this.bflower = p.loadImage("https://cdn.glitch.global/5446e88e-e954-471e-94f3-6ca8eeaee958/b-flower.png?v=1665932533011")
    this.flower = Math.random() > ratio ? this.bflower : this.rflower;
    
  }
  
   mousePressed(p) {
    super.mousePressed(p)
    if (!this.held) {
      let pt = new GravityParticle(this)
      pt.pos.setTo(p.mouseX-12, p.mouseY-12)
      this.particles.push(pt)
    }
  }
  
  mouseDragged(p) {
    super.mouseDragged(p)
    if (!this.held) {
      let pt = new GravityParticle(this)
      pt.pos.setTo(p.mouseX-12, p.mouseY-12)
      this.particles.push(pt)
    }
  }
  
  draw(p) {
    this.t = p.millis() * 0.001;
    this.pp = (this.t % this.loopTime) / this.loopTime;
    this.pct = Math.PI * 2 * this.pp;
    p.background(255,255,255);
    
    p.textSize(20);
    p.text("click or drag the mouse", p.width/2-100, p.height/2);
    
    const size = 25;
    p.image(this.flower, p.mouseX-12, p.mouseY-12, size, size);

    // The "super-class" draws the particles
    super.draw(p);
  }
}

class GravityParticle extends Particle {
  constructor(ps, index) {
    super(ps, index);
    this.skip = false;
    this.movingdown = true;
    this.dest = this.height;
    this.madeParticle = false;
    
    this.halfpos = p.mouseY/2;
    this.mouse = new Vector2D(p.mouseX-12, p.mouseY-12)
    this.pos = new Vector2D(p.mouseX-12, p.mouseY-12)
    this.direction = new Vector2D(this.pos[0], p.height)
    
    let ratio = document.getElementById("mix-slider").value;
    this.rflower = p.loadImage("https://cdn.glitch.global/5446e88e-e954-471e-94f3-6ca8eeaee958/flower.png?v=1665932529614")
    this.bflower = p.loadImage("https://cdn.glitch.global/5446e88e-e954-471e-94f3-6ca8eeaee958/b-flower.png?v=1665932533011")
    this.flower = Math.random() > ratio ? this.bflower : this.rflower;
    this.attractionForce = new Vector2D()
  }

  calculateForces(p, dt) {
    if (!this.skip) {
      if (this.movingdown) {
        this.direction[1] = p.height;
        if (this.pos[1] > p.height-25) {
          this.v.mult(-0.5);
          this.movingdown = false;
        }
      } else {
        if (this.pos[1] > this.halfpos) {
          this.movingdown =true;
          this.halfpos = this.halfpos/2;
          if (!this.madeParticle) {
            let pt = new ReverseGravityParticle(this.ps);
            pt.pos.setTo(p.mouseX-12, p.mouseY-12);
            this.ps.particles.push(pt);
            this.madeParticle = true;
          }
        }
      }
      
      this.attractionForce = this.pos.getForceTowardsPoint(this.direction, .2, { falloff:1.5 } )
      this.f.add(this.attractionForce)
    }
    
    if (p.height - this.halfpos < 100) {
      console.log(p.height - this.halfpos);
      this.v.mult(0);
      this.pos[1] = p.height - 25;
      this.skip = true;
    }
  }


  draw(p, drawDebug = false) {
    const size = 25;
    p.image(this.flower, this.pos[0], this.pos[1], size, size);
    if (drawDebug) {
      this.pos.drawArrow(p, this.attractionForce, {m: 1})
    }
    
  }
}

class ReverseGravityParticle extends Particle {
  constructor(ps, index) {
    super(ps, index);
    this.skip = false;
    this.movingdown = true;
    this.dest = this.height;
    
    this.halfpos = p.mouseY/2;
    this.mouse = new Vector2D(p.mouseX-12, p.mouseY-12)
    this.pos = new Vector2D(p.mouseX-12, p.mouseY-12)
    this.direction = new Vector2D(this.pos[0], p.height)
    
    let ratio = document.getElementById("mix-slider").value;
    this.rflower = p.loadImage("https://cdn.glitch.global/5446e88e-e954-471e-94f3-6ca8eeaee958/flower.png?v=1665932529614")
    this.bflower = p.loadImage("https://cdn.glitch.global/5446e88e-e954-471e-94f3-6ca8eeaee958/b-flower.png?v=1665932533011")
    this.flower = Math.random() < ratio ? this.bflower : this.rflower;
    this.attractionForce = new Vector2D()
  }

  calculateForces(p, dt) {
    if (!this.skip) {
      if (this.movingdown) {
        this.direction[1] = 0;
        if (this.pos[1] < 0) {
          this.v.mult(-0.5);
          this.movingdown = false;
        }
      } else {
        if (this.pos[1] > this.halfpos) {
          this.movingdown =true
          this.halfpos = this.halfpos/2;
        }
      }
      
      this.attractionForce = this.pos.getForceTowardsPoint(this.direction, .2, { falloff:1.5 } )
      this.f.add(this.attractionForce)
    }
    
    if (p.height - this.halfpos < 100) {
      console.log(p.height - this.halfpos);
      this.v.mult(0);
      this.pos[1] = p.height - 25;
      this.skip = true;
    }
  }


  draw(p, drawDebug = false) {
    const size = 25;
    p.image(this.flower, this.pos[0], this.pos[1], size, size);
    if (drawDebug) {
      this.pos.drawArrow(p, this.attractionForce, {m: 1})
    }
    
  }
}