Bug Catching Game

This is a simple game where the objective is to catch the bugs before they eat the plants.

How to play

    Use arrow keys or WASD to move the net and catch the bugs.

    Touching the bugs with the net removes the bugs from the game.

    If the bugs touch the plants, they will eat them and the plants will disappear.

    The game ends when all plants have been eaten or all bugs have been caught.

Technologies Used

    JavaScript
    HTML5 Canvas

Code Overview

This project consists of three classes:

    Plant: A class that represents a plant on the screen.
    Bug: A class that represents a bug on the screen.
    Net: A class that represents the net used to catch bugs.



Code Details

    The code starts by getting the canvas element and its context.
    Three images (bug, net, and plant) are loaded into the game using the Image object.
    Two variables (width and height) are set to the width and height of the canvas.
    The random function is defined to generate random values within a range.
    The Plant class is defined to represent a plant on the screen. It has an x and y position, a size, and a exists property that indicates whether the plant is still on the screen.
    The Bug class is defined to represent a bug on the screen. It has an x and y position, a velX and velY velocity, a size, and an exists property that indicates whether the bug is still on the screen.
    The Net class is defined to represent the net used to catch bugs. It has an x and y position, a velX and velY velocity, a size, and methods for drawing and moving the net.
    A Net object is created and positioned randomly on the screen.
    A while loop is used to create 5 Bug objects with random positions and velocities.
    A loop function is defined to update the positions of the game objects, check for collisions, and redraw the canvas.
    An event listener is added to the window to handle user input and move the net accordingly.
    Collision detection is handled by the collisionDetect method of the Bug and Net classes. If a bug touches a plant, the plant disappears. If a bug touches the net, the bug disappears.
    The game loop runs continuously until all plants have been eaten or all bugs have been caught.

This game was created by Laurence Sgroi.