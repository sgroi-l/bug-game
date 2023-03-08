// set up canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

const image = new Image();

// Set the source of the image
image.src = 'images/bugW.svg';

// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random RGB color value

function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

class Shape {

  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }
}

class Bug extends Shape {
 
   constructor(x, y, velX, velY, color, size) {
      super(x, y, velX, velY);
      this.color = color;
      this.size = size;
      this.exists = true
   }

   draw() {
    image.onload = function() {
    ctx.drawImage(image, this.x, this.y);
  };
 }

   update() {
    if ((this.x + this.size) >= width) {
       this.velX = -(Math.abs(this.velX));
    }
  
    if ((this.x - this.size) <= 0) {
       this.velX = Math.abs(this.velX);
    }
  
    if ((this.y + this.size) >= height) {
       this.velY = -(Math.abs(this.velY));
    }
  
    if ((this.y - this.size) <= 0) {
       this.velY = Math.abs(this.velY);
    }
  
    // randomly change velocity
    if (Math.random() < 0.05) {
      this.velX = random(-7, 7);
      this.velY = random(-7, 7);
    }
  
    this.x += this.velX;
    this.y += this.velY;
  }

   collisionDetect() {
    for (const bug of bugs) {
      if (!(this === bug) && bug.exists) {
        const dx = this.x - bug.x;
        const dy = this.y - bug.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < this.size + bug.size) {
          bug.color = this.color = randomRGB();
        }
      }
    }
  }
  

}

class EvilCircle extends Shape {
  constructor(x, y) {
    super(x, y, 20, 20);
    this.color = "white";
    this.size = 10;

    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "a":
          this.x -= this.velX;
          break;
        case "d":
          this.x += this.velX;
          break;
        case "w":
          this.y -= this.velY;
          break;
        case "s":
          this.y += this.velY;
          break;
      }
    });

  }

  draw() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
 }

  checkBounds() {
    if ((this.x + this.size) >= width) {
       this.x -= this.size;
    }

    if ((this.x - this.size) <= 0) {
       this.x += this.size;
    }

    if ((this.y + this.size) >= height) {
       this.y -= this.size;
    }

    if ((this.y - this.size) <= 0) {
       this.y += this.size;
    }

   
 }

collisionDetect() {
  for (const bug of bugs) {
    if (bug.exists === true) {
      const dx = this.x - bug.x;
      const dy = this.y - bug.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + bug.size) {
        bug.exists = false;
      }
    }
  }
}
}

const evilCircle = new EvilCircle(random(0 + 10,width - 10),
random(0 + 10,height - 10),);

const bugs = [];

while (bugs.length < 10) {
   const size = random(10,20);
   const bug = new Bug(
      // bug position always drawn at least one bug width
      // away from the edge of the canvas, to avoid drawing errors
      random(0 + size,width - size),
      random(0 + size,height - size),
      random(-7,7),
      random(-7,7),
      randomRGB(),
      size
   );

  bugs.push(bug);
}

function loop() {
   ctx.fillStyle = 'rgba(55, 14, 14, 0.01)'; 
   ctx.fillRect(0, 0,  width, height);

   for (const bug of bugs) {
     if (bug.exists === true) {
      bug.draw();
      bug.update();
      bug.collisionDetect();
   }
  }
   evilCircle.draw();
   evilCircle.checkBounds();
   evilCircle.collisionDetect();
   requestAnimationFrame(loop);

   let count = 0;

 for (bug of bugs) {
    if (bug.exists === true) {
      count ++ ;
    
    }; 
    }

    para.textContent = `bug count: ${count}`
}

const para = document.querySelector('p');



    
 



loop();

