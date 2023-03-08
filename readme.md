Bug Catcher Game

This is a simple game where the player tries to catch bugs with a net. The game is built using HTML canvas and JavaScript.

Getting Started

    Clone the repository to your local machine or download the code as a ZIP file.
    Open index.html in your web browser.
    Use the arrow keys or WASD to move the net and catch the bugs.

Code Overview

The game uses HTML canvas to draw the bugs and the net. The bugs and net are represented by classes, Bug and Net, respectively. The Bug class represents a bug and contains the logic to draw and update the bug's position. The Net class represents the net and contains the logic to draw, move and check for collisions between the net and the bugs.

The game starts by loading two images, one for the bug and another for the net. Once both images are loaded, the game loop starts. The game loop updates the position of the bugs and the net and checks for collisions. If a collision is detected between a bug and the net, the bug is removed from the canvas.

The game ends when all bugs are caught.
Credits

This game was created by Laurence Sgroi.