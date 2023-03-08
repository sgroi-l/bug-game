const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// Set the source of the image
const bugImg = new Image();
bugImg.src = 'images/bugD.svg';

const netImg = new Image();
netImg.src = 'images/netW.png';

const plantImg = new Image();
plantImg.src = 'images/plant.svg';

let numImagesLoaded = 0;

bugImg.onload = netImg.onload = function() {
  // Increment the number of images loaded
  numImagesLoaded++;

  // Check if both images have been loaded
  if (numImagesLoaded === 2) {
    // Once both images are loaded, start the loop
    loop();
  }
};


function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Plant {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 64;
    this.exists = true;
}

draw() {
  ctx.drawImage(plantImg, this.x, this.y)
}
}

class Bug {

  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.size = 64;
    this.exists = true;
  }

  draw() {
    // Save the current context state
    ctx.save();

    // Translate to the center of the bug
    ctx.translate(this.x + this.size / 2, this.y + this.size / 2);

    // Calculate the angle of rotation based on velocity
    let angle = Math.atan2(this.velY, this.velX);
    ctx.rotate(angle);

    // Draw the bug image
    ctx.drawImage(bugImg, -this.size / 2, -this.size / 2, this.size, this.size);

    // Restore the context state
    ctx.restore();
  }
  

  update() {
    if ((this.x + this.size) >= width) {
       this.velX = -(Math.abs(this.velX));
    }
  
    if ((this.x - this.size/4) <= 0) {
       this.velX = Math.abs(this.velX);
    }
  
    if ((this.y + this.size) >= height) {
       this.velY = -(Math.abs(this.velY));
    }
  
    if ((this.y - this.size/4) <= 0) {
       this.velY = Math.abs(this.velY);
    }
  
    // randomly change velocity
    if (Math.random() < 0.03) {
      this.velX = random(-4,4);
      this.velY = random(-4,4);
    }
  
    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (const plant of plants) {
      if (plant.exists === true) {
        const dx = this.x - plant.x;
        const dy = this.y - plant.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
  
        if (distance < this.size) {
          plant.exists = false;
        }
      }
    }
  }
}

class Net {
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = 20;
    this.velY = 20;
    this.size = -30;
    

    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "a":
        case "ArrowLeft":
          this.x -= this.velX;
          break;
        case "d":
          case "ArrowRight":
          this.x += this.velX;
          break;
        case "w":
          case "ArrowUp":
          this.y -= this.velY;
          break;
        case "s":
          case "ArrowDown":
          this.y += this.velY;
          break;
      }
    });

  }

  draw() {
    ctx.drawImage(netImg, this.x, this.y)
  }

  checkBounds() {
    if ((this.x + 80) >= width) {
       this.x -= 15;
    }

    if ((this.x) <= 0) {
       this.x += 15;
    }

    if ((this.y + 70) >= height) {
       this.y -= 15;
    }

    if ((this.y + 10) <= 0) {
       this.y += 15;
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


const net = new Net(random(0 + 10,width - 10),
random(0 + 10,height - 10),);

const bugs = [];
const plants =[];

while (bugs.length < 5) {
  const size = 64;
   const bug = new Bug(
      // bug position always drawn at least one bug width
      // away from the edge of the canvas, to avoid drawing errors
      random(0 + size,width - size),
      random(0 + size,height - size),
      random(-7,7),
      random(-7,7),
      size
   );

  bugs.push(bug);
}

while (plants.length < 10) {
  const size = 64;
   const plant = new Plant(
      
      random(0 + size,width - size),
      random(0 + size,height - size),
      size
   );

  plants.push(plant);
}

function loop() {
  ctx.fillStyle = 'rgba(115, 118, 83, .9)'; 
  ctx.fillRect(0, 0,  width, height);

  net.draw();
  net.checkBounds();
  net.collisionDetect();
  

  let bugCount = bugs.length;
  let plantCount = plants.length;

  for (const bug of bugs) {
    if (bug.exists === true) {
      bug.draw();
      bug.update();
      bug.collisionDetect();
    } else {
      bugCount--;
    }
  }
  
  for (const plant of plants) {
    if (plant.exists === true) {
      plant.draw();
    } else {
      plantCount--;
    }
  }

  if (plantCount === 0) {

    window.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        // Reload the page to restart the game
        location.reload();
      }
    });
    ctx.font = '48px sans-serif';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over', width/2 , height/2);
    ctx.font = '32px sans-serif';
    ctx.fillText('The bugs ruined your harvest', width / 2, height / 2 + 40);
    return;
  }

  para.textContent = `Bug count: ${bugCount}`

  if (bugCount === 0) {

    window.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        location.reload();
      }
    });
    
    ctx.font = '48px sans-serif';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText('You win!', width / 2, height / 2)
    ctx.font = '32px sans-serif';
    ctx.fillText(`${plantCount} plants remaining`, width / 2, height / 2 + 40);
    ctx.font = '24px sans-serif';
    ctx.fillText('Press ENTER to restart the game', width / 2, height / 2 + 80);
  }

  requestAnimationFrame(loop);

 
}

 
 const para = document.querySelector('p');
