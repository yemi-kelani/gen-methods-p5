const GENERATORS = {
  
  flowers: {
    description:
      "wildflowers go brr...",
    sliders: ["flower", "size", "rotation", "tint", "hue"],
    landmarks: {
    "bow of rain": [0.38,0.70,0.64,0.00,1.00],
    "bow of rain II": [0.48,0.70,0.64,0.00,1.00],
    "conform": [0.65,0.77,0.0],
    "content": [1.00,0.88,0.58,1.00,1.00],
    "melpomene": [0.12,0.72,0.65,0.65,0.77],
    "thalia": [0.70,0.62,0.00,1.00,1.00],
    },
    setup(p) {p.angleMode(p.DEGREES);},
    drawBackground(p) {
      p.background(53, 87, 73, 1)
      
    },

    draw(p, t, dna) {
      let x = 0;
      let y = 0;
      let flowers = [bflower,dflower,eflower,fflower,aflower,cflower,gflower,gflower];
      
      let flower = flowers[Math.floor(p.map(dna[0], 0, 1, 0, flowers.length-1))];
      let size = dna[1]*50 + 10;
      let rotation = p.map(dna[2], 0, 1, 9, 3);
      let angle = rotation == 9 ? 0 : (p.millis() * 10**-Math.floor(rotation) * 57) % 360
      let tint = dna[3] * 255;
      let hue = 50 + (dna[4] * 205);
      
      
      p.push();
      p.tint(tint, hue, hue, 100);
      
      p.rotate(angle);
      p.translate(-(size/2),-(size/2));
      p.image(flower, 0, 0, size, size);
      p.pop();
      
    }
  },
  practice: {
    description:
      "circle makes circles.",
    sliders: ["grey", "size", "rotation", "circle hue", "alpha"],
    landmarks: {
      invisible: [1.00,0.92,0.94,1.00,1.00],
      zen: [1.00,0.89,0.61,0.24,1],
      glass: [0.57,0.35,0.10,0.61,0.20],
      money: [0.37,0.86,0.52,0.21,1.00],
      bathezda: [0.06,0.22,0.16,0.93,0.93],
    },
    setup(p) {},
    
    drawBackground(p) {
      p.background(0, 50, 50)
    },

    draw(p, t, dna) {
      
      let x = 0;
      let y = 0;
      
      let grey = dna[0] * 100
      let size = dna[1]*25 + 10;
      let rotation = p.map(dna[2], 0, 1, 9, 3);
      let angle = rotation == 9 ? 0 : (p.millis() * 10**-Math.floor(rotation) * 57) % 360
      let ch = dna[3] * 255;
      let alpha = dna[4]*1.5;
      
      
      p.push();
      p.fill(grey, ch, ch, alpha)
      p.circle(0, 0, size)
      p.pop();
      
      p.push();
      p.rotate((angle+45)%360);
      p.fill(grey)
      p.square(-size/2, -size/2, size);
      p.pop();
      
      p.push();
      p.rotate((angle+45)%360);
      p.fill(grey, ch, ch, alpha)
      p.square(-size/4, -size/4, size/2);
      p.pop();
    }
  },
  
};
