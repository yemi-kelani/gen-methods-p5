animations = [
    {
        t: null,
        pp: null,
        pct: null,
        angle: 0,
        flower: null,
        radius: null,
        loopTime: null,
        preload(p) {
            this.flower = p.loadImage('flower.png');
        },
        setup(p) {
            const fWIDTH = 60
            const cWIDTH = 400;
            const cCENTER = (cWIDTH/2,cWIDTH/2);
            p.createCanvas(cWIDTH,cWIDTH);
            p.background(255, 255, 255);

        
            p.angleMode(p.DEGREES);
            this.loopTime = 4;
        },
        
        draw(p) {
            const fWIDTH = 60;
            const cWIDTH = 400;
            const cCENTER = (cWIDTH/2,cWIDTH/2);
        
            // circle
            this.t = p.millis() * 0.001;
            this.pp = (this.t % this.loopTime) / this.loopTime;
            this.pct = Math.PI * 2 * this.pp;
            
            p.push()
            p.translate(cCENTER-(fWIDTH/2),cCENTER-(fWIDTH/2));
            this.radius = this.pct * 600;
            p.fill(0, 0, 0)
            p.circle(fWIDTH/2, fWIDTH/2, this.radius);
            
            p.fill(255, 255, 255)
            p.circle(fWIDTH/2, fWIDTH/2, (5*this.radius)/6);
        
            p.fill(0, 0, 0)
            p.circle(fWIDTH/2, fWIDTH/2, (2*this.radius)/3);
        
            p.fill(255, 255, 255)
            p.circle(fWIDTH/2, fWIDTH/2, this.radius/2);
        
            p.fill(0, 0, 0)
            p.circle(fWIDTH/2, fWIDTH/2, this.radius/3);
        
            p.fill(255, 255, 255)
            p.circle(fWIDTH/2, fWIDTH/2, this.radius/6);
            p.pop()
        
            // image
            p.push();
            p.translate(cCENTER,cCENTER);
            p.rotate(this.angle);
            p.imageMode(p.CENTER);
            p.image(this.flower, 0, 0, fWIDTH, fWIDTH);
            p.pop();
        
            this.angle = (this.pct * 57) % 360
        }
    },
    {
        t: null,
        pp: null,
        pct: null,
        band: 1,
        angle: 0,
        flower: null,
        radius: 0,
        loopTime: null,
        preload(p) {
            this.flower = p.loadImage('b-flower.png');
        },
        setup(p) {
            const fWIDTH = 60
            const cWIDTH = 400;
            const cCENTER = (cWIDTH/2,cWIDTH/2);
            p.createCanvas(cWIDTH,cWIDTH);
            p.background(0, 0, 0);

            p.push();
            p.translate(cCENTER,cCENTER);
            p.imageMode(p.CENTER);
            p.image(this.flower, 0, 0, fWIDTH, fWIDTH);
            p.pop();

            p.textSize(fWIDTH / 2);
            // p.textAlign(cCENTER, 300);
    
            p.angleMode(p.DEGREES);
            this.loopTime = 2;
        },
        
        draw(p) {
            const fWIDTH = 60;
            const cWIDTH = 400;
            const cCENTER = (cWIDTH/2,cWIDTH/2);
        
            // circle
            this.t = p.millis() * 0.001;
            this.pp = (this.t % this.loopTime) / this.loopTime;
            this.pct = Math.PI * 2 * this.pp;
            p.background(0,0,0)
            
            const band = (step) => {
                p.push()
                p.translate(cCENTER-(fWIDTH/2),cCENTER-(fWIDTH/2));
                this.radius = (141.42 * this.pct)
                this.bg = p.map(this.pct, 0, 2*Math.PI, 0, 255);
                p.fill(this.bg, 0, 0)
                p.circle(fWIDTH/2, fWIDTH/2, this.radius - (step * 50));
                
                p.fill(0, 0, 0)
                p.circle(fWIDTH/2, fWIDTH/2, this.radius - ((step + 1) * 50));
                p.pop()
            }

            band(this.band);

            // image
            p.push();
            p.translate(cCENTER,cCENTER);
            p.rotate(this.angle);
            p.imageMode(p.CENTER);
            p.image(this.flower, 0, 0, fWIDTH, fWIDTH);
            p.pop();
        
            this.angle = (this.pct * 57) % 360
            p.fill(255, 255, 255, this.bg);
            p.text("S.O.S.", 160, 350);
        }
    },
    {
        t: null,
        pp: null,
        pct: null,
        band: 1,
        angle: 0,
        noise: 0,
        flower: null,
        radius: 0,
        loopTime: null,
        preload(p) {
            this.flower = p.loadImage('b-flower.png');
        },
        setup(p) {
            const fWIDTH = 60
            const cWIDTH = 400;
            const cCENTER = (cWIDTH/2,cWIDTH/2);
            p.createCanvas(cWIDTH,cWIDTH);
            p.background(0, 0, 0);

            p.push();
            p.translate(cCENTER,cCENTER);
            p.imageMode(p.CENTER);
            p.image(this.flower, 0, 0, fWIDTH, fWIDTH);
            p.pop();
    
            p.angleMode(p.DEGREES);
            this.loopTime = 2;
        },
        
        draw(p) {
            const fWIDTH = 60;
            const cWIDTH = 400;
            const cCENTER = (cWIDTH/2,cWIDTH/2);
        
            // time
            this.t = p.millis() * 0.0008;
            this.pp = (this.t % this.loopTime) / this.loopTime;
            this.pct = Math.PI * 2 * this.pp;

            this.x = cWIDTH * p.noise(this.t);
            this.y = cWIDTH * p.noise(this.t + 100);
            
            // image
            p.push();
            p.translate(this.x,this.y);
            p.rotate(this.angle);
            p.imageMode(p.CENTER);
            this.bg = p.map(this.pct, 0, 2*Math.PI, 0, 255);
            p.tint((p.frameCount*this.pct), 200, (p.frameCount*(this.pct-Math.PI)), this.bg)
            p.image(this.flower, 0, 0, fWIDTH, fWIDTH);
            // p.tint(this.bg, this.bg, this.bg);
            p.tint((p.frameCount*10)%255, 80, 100, 80)
            p.pop();
        
            this.angle = (this.pct * 57) % 360
        }
    },
    {
        t: null,
        pp: null,
        pct: null,
        trans: null,
        flower1: null,
        flower2: null,
        preload(p) {
            this.flower1 = p.loadImage('flower.png');
            this.flower2 = p.loadImage('b-flower.png');
        },
        setup(p) {
            const fWIDTH = 60
            const cWIDTH = 400;
            const cCENTER = (cWIDTH/2,cWIDTH/2);
            p.createCanvas(cWIDTH,cWIDTH);
            p.background(253, 240, 110);
            this.loopTime = 4;
        },
        draw(p) {
            const fWIDTH = 60;
            const cWIDTH = 400;
            const cCENTER = (cWIDTH/2,cWIDTH/2);
        
            // circle
            this.t = p.millis() * 0.001;
            this.pp = (this.t % this.loopTime) / this.loopTime;
            this.pct = Math.PI * 2 * this.pp;
            p.background(253, 240, 110);

            const flowers = (flr, x, dir) => {
                p.push();
                const y = dir * (this.trans + (this.pct * 48));
                p.translate(x, cCENTER);
                for (let i = 0; i < 5; i++) {
                    p.imageMode(p.CENTER);
                    p.image(flr, 0, y + ((i + 1) * 100), fWIDTH, fWIDTH);
                    p.image(flr, 0, y, fWIDTH, fWIDTH);
                    p.image(flr, 0, y - ((i + 1) * 100), fWIDTH, fWIDTH);
                }
                p.pop();
            }

            flowers(this.flower1, cCENTER, -1);
            flowers(this.flower1, cCENTER - 145, -1);
            flowers(this.flower1, cCENTER + 145, -1);

            flowers(this.flower2, cCENTER - 75, 1);
            flowers(this.flower2, cCENTER + 75, 1);

            flowers(this.flower2, cCENTER - 220, 1);
            flowers(this.flower2, cCENTER + 220, 1);
        }
    },
    {
        t: null,
        pp: null,
        pct: null,
        trans: null,
        flower1: null,
        flower2: null,
        preload(p) {
            this.flower1 = p.loadImage('flower.png');
            this.flower2 = p.loadImage('b-flower.png');
        },
        setup(p) {
            const fWIDTH = 60
            const cWIDTH = 400;
            const cCENTER = (cWIDTH/2,cWIDTH/2);
            p.createCanvas(cWIDTH,cWIDTH);
            p.background(253, 240, 110);
            this.loopTime = 4;
        },
        draw(p) {
            const fWIDTH = 60;
            const cWIDTH = 400;
            const cCENTER = (cWIDTH/2,cWIDTH/2);
        
            // circle
            this.t = p.millis() * 0.001;
            this.pp = (this.t % this.loopTime) / this.loopTime;
            this.pct = Math.PI * 2 * this.pp;
            p.background(253, 240, 110);
            

            const flowers = (flr, x, dir) => {
                p.push();
                const y = dir * (this.trans + (this.pct * 48));
                p.translate(x, cCENTER);
                for (let i = 0; i < 5; i++) {
                    p.imageMode(p.CENTER);
                    p.image(flr, 0, y + ((i + 1) * 100), fWIDTH, fWIDTH);
                    p.image(flr, 0, y, fWIDTH, fWIDTH);
                    p.image(flr, 0, y - ((i + 1) * 100), fWIDTH, fWIDTH);
                }
                p.pop();
            }

            flowers(this.flower2, cCENTER, -1);
            flowers(this.flower2, cCENTER - 145, -1);
            flowers(this.flower2, cCENTER + 145, -1);

            flowers(this.flower1, cCENTER - 75, 1);
            flowers(this.flower1, cCENTER + 75, 1);

            flowers(this.flower1, cCENTER - 220, 1);
            flowers(this.flower1, cCENTER + 220, 1);
        }
    }
];

const createElement = (type, classList, parentEl, innerHTML) => {
    const el = document.createElement(type);
    el.classList.add(classList);
    parentEl.appendChild(el);
    // Add inner HTML
    if (innerHTML) el.innerHTML = innerHTML;
    return el;
}

const getLoopingNoise = (theta, radius, p, offset = 0) => {
  // Place to sample the noise from
  let x = radius * Math.cos(theta)
  let y = radius * Math.sin(theta)

  let noiseVal = p.noise(x + 100, y + 30, offset)

  return noiseVal
}

const swatchHolderEl = document.getElementById("swatch-holder");
animations.map((animation) => {
    const swatchEl = createElement("div", "swatch", swatchHolderEl);
    const anim = (p) => {
        p.setup = function () {
            animation.preload(p);
            animation.setup(p);
        };
        p.draw = function () {
            animation.draw(p);
        };
    };
    new p5(anim, swatchEl);
});

