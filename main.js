/* The code first creates a canvas element with id "myCanvas" and gets its context 2D. Then it sets the width and height of the canvas equal to the inner width and height of the window, respectively. */
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

/* The program loads three image files: 'bugD.svg', 'netW.png', and 'plant.svg', using the Image() constructor and sets their sources. */
const bugImg = new Image();
bugImg.src = 'images/bugD.svg';

const netImg = new Image();
netImg.src = 'images/netW.png';

const plantImg = new Image();
plantImg.src = 'images/plant.svg';

/* The program then sets up a listener for when the images finish loading. When each image is loaded, the onload function increments the counter numImagesLoaded. Once all images have been loaded, the loop() function is called. */
let numImagesLoaded = 0;

bugImg.onload = netImg.onload = plantImg.onload = function() {
  
  numImagesLoaded++;

  if (numImagesLoaded === 3) {
   
    loop();
  }
};

/* The program defines a function random that takes two arguments min and max and returns a random integer between min and max. */
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* The program defines a class Plant that represents a plant on the canvas. The constructor takes two arguments x and y that represent the position of the plant on the canvas. The class has two properties: size, which is the size of the plant (set to 64), and exists, which is a boolean that determines if the plant should be drawn on the canvas. The class also has a method draw that draws the plant image on the canvas at the specified position. */
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
/* The Bug class is an extension of Plant, it takes x and y positions from a super constructor and adds velocity in the x and y directions. */
class Bug extends Plant {

  constructor(x, y, velX, velY) {
    super(x, y);
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
  
  // This method calculates if the Bugs are moving off screen and reverses the travel direction if so.
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
    if (Math.random() < .03) {
      this.velX = random(-4,4);
      this.velY = random(-4,4);
    }
  
    this.x += this.velX;
    this.y += this.velY;
  }

  /* This function calculates the distance between bugs and plants. If they overlap the plant's exists property is set to false */
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
/* The Net class extends Plant it passes in x and y positions from a super constructor and adds a set velocity in the x and y directions. */
class Net extends Plant {
  constructor(x, y, velX, velY) {
    super(x, y);
    this.velX = 20;
    this.velY = 20;
    this.size = -10;
    
/* This switch statement allows the net to be moved using WASD and the arrow keys */
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

  /* CheckBounds() is similar to the upodate() method in the Bug class, if the net exceeds the edges of the screen it is pushed back onto the screen by changing the x or y position as necessary.*/
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

// Create an instance of Net
const net = new Net(random(0 + 10,width - 10),
random(0 + 10,height - 10),);

// Initialize arrays to store bugs and plants
const bugs = [];
const plants =[];

// Generate five bugs and ten plants with random positions and sizes
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

// Define the loop function, which will be called repeatedly to update the game
function loop() {
  ctx.fillStyle = 'rgba(164, 204, 163, .9)'; 
  ctx.fillRect(0, 0,  width, height);

  // Draw the net and check for collisions with bugs and plants
  net.draw();
  net.checkBounds();
  net.collisionDetect();


  
// Count the number of bugs and plants that are still alive, and update them
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

  // If there are no plants left, display the game over message
  if (plantCount === 0) { 
    ctx.font = '48px sans-serif';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over', width/2 , height/2);
    ctx.font = '32px sans-serif';
    ctx.fillText('The bugs ruined your harvest', width / 2, height / 2 + 40);
    ctx.font = '24px sans-serif';
    ctx.fillText('Press ENTER to restart the game', width / 2, height / 2 + 80);
    return;
  }

  // Update the bug count display
  para.textContent = `Bug count: ${bugCount}`

  // If there are no bugs left, display the win message
  if (bugCount === 0) {
    ctx.font = '48px sans-serif';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText('You win!', width / 2, height / 2)
    ctx.font = '32px sans-serif';
    ctx.fillText(`${plantCount} plants remaining`, width / 2, height / 2 + 40);
    ctx.font = '24px sans-serif';
    ctx.fillText('Press ENTER to restart the game', width / 2, height / 2 + 80);
  }

  // Continue the game loop
  requestAnimationFrame(loop);

 
}

// Restart the game if the Enter key is pressed
window.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    console.log('PRESSED ENTER');
    location.reload();
  }
});

 
 const para = document.querySelector('p');
