# ReadmeFile: Game

## Overview
Bug Catching Game

In this project I built a `canvas` game using almost exclusively JavaScript. The objective is to catch the bugs before they eat the plants. 

### How to play

    Use arrow keys or WASD to move the net and catch the bugs.

    Touching the bugs with the net removes the bugs from the game.

    If the bugs touch the plants, they will eat them and the plants will disappear.

    The game ends when all plants have been eaten or all bugs have been caught.


## Building

This project consists of three classes:

Plant - A class that represents a plant on the screen.
Bug - A class that represents a bug on the screen, an extension of Plant.
Net - A class that represents the net used to catch bugs, an extension of Plant.


### Code Details

The code starts by getting the canvas element and its context. Three images (bug, net, and plant) are loaded into the game using the Image object. Two variables (width and height) are set to the width and height of the canvas. The random function is defined to generate random values within a range. The Plant class is defined to represent a plant on the screen. It has an x and y position, a size, and a exists property that indicates whether the plant is still on the screen. The Bug class is defined to represent a bug on the screen. It has an x and y position, a velX and velY velocity, a size, and an exists property that indicates whether the bug is still on the screen. The Net class is defined to represent the net used to catch bugs. It has an x and y position, a velX and velY velocity, a size, and methods for drawing and moving the net. A Net object is created and positioned randomly on the screen. A while loop is used to create the Bug objects with random positions and velocities. A loop function is defined to update the positions of the game objects, check for collisions, and redraw the canvas. An event listener is added to the window to handle user input and move the net accordingly. Collision detection is handled by the `collisionDetect` method of the Bug and Net classes. If a bug touches a plant, the plant disappears. If a bug touches the net, the bug disappears. The game loop runs continuously until all plants have been eaten or all bugs have been caught.

I decided to use constructors to build the objects in the game because they allow us to create multiple instances of specific properties and behaviours without having to repeat the code for each object. It also meant I could easily alter the number of bugs, plants and properties whilst testing the game to make sure it played well. 

I wanted the bugs to move randomly around the screen I did this by altering their velocity using a `random()` function with set min and max values. At first this made the bugs rotate rapidly and created a vibrating effect. I added a rule that made the velocity change only 3% of the time. This gave the bugs a chance to travel a meaningful distance, before changing directions.

In order to get the bugs to rotate and face the direction of travel, I needed to calculate the angle. I did this using the following line of code `let angle = Math.atan2(this.velY, this.velX);`. I then rotated the canvas through the centre of the bug image.

The `collisionDetect()` function is a method of the Bug and Net classes that detects if two objects are colliding. For the Bug class it loops through all the plants and checks if they still exist (i.e. they haven't been eaten by a bug yet). For each existing plant, it calculates the distance between the bug and the plant. If the distance is less than the sum of the sizes of the bug and the plant, then the bug is considered to be colliding with the plant, and the exists property of the plant is set to false to indicate that the plant has been eaten.



## Debugging

With so many moving complex parts there were many elements that need fixing and debugging. 

One problem was keeping the bugs on the screen once they started moving. I wrote a series of `if` statements that checked if the bugs position plus its size exceeds the height or width of the canvas. If it does then the corresponding X or y velocity is reversed, sending the bug away from the edge that it was approaching. 

