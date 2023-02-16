# PKD Project Plan
<table>
      <tr><td>Group number</td><td><code>3</code></td></tr>
      <tr><td>Group member names</td><td>Erik Junsved, Frithiof Georgii Hellberg and Martin Ek</td></tr>
      <tr><td>Supervisor name</td><td>Yang Yang</td></tr>
      <tr><td>Project title</td><td>Schackmatt</td></tr>
</table>

[Project plan in document form](https://docs.google.com/document/d/1F1HN1h77vxvq7jnnhM289_dnmRDybPXzWV-hL-gFJag/edit?usp=sharing)

## Description
The goal is to make a working [chess](https://en.wikipedia.org/wiki/Chess) game including all the rudimentary rules that apply in chess. The program is made for a web environment which means it can be executed in modern web browsers. We start by implementing essential features to build a working draft that can be played by two individuals on the same device. If additional time is available: multiplayer functionality will be implemented, using generated shareable session links.

## Milestones
1. Planning the entire project from start to finish (3 h).
2. Learning and getting comfortable with the required libraries (5-10 h).
3. Making the board and placing pieces on starting squares (5 h).
4. Implementing the rules and conditionals for piece movement and piece interaction and interconnecting the graphical user interface with it (5 h).
5. Refinement of the entire program (fixing eventual logic errors and polishing the graphical user interface) (5 h).
6. Moving business logic to server and implementing multiplayer functionality (10+ h).

Note that the anticipated timeframes for these milestones may overlap in actual execution of work.

## Communication
We will be using Discord and Snapchat as our means of communication for this project. Snapchat will most likely be used for scheduling meetups, and also for project management, and the usage of Discord will be for sharing shorter code parts, and providing useful information.
To show team members and test incremental changes to the program, a live version of it is hosted at [schackmatt.junsved.se](https://schackmatt.junsved.se) using an [Nginx](https://en.wikipedia.org/wiki/Nginx) reverse proxy on a public facing server that is connected to Erik’s development laptop through a [WireGuard](https://en.wikipedia.org/wiki/WireGuard) tunnel. This is useful when doing remote pair programming.
The actual codebase is stored on a [Git](https://en.wikipedia.org/wiki/Git) server.

## Libraries
* [Node.js](https://nodejs.org/) — Server environment (Delivering the program to web browsers, and game logic if multiplayer functionality is implemented)
* [TypeScript](https://www.typescriptlang.org/) — Programming language that adds additional features to [JavaScript](https://en.wikipedia.org/wiki/JavaScript) (Main language of implementation)
* [chessboard.js](https://chessboardjs.com/) — JavaScript chessboard component implemented using [jQuery](https://en.wikipedia.org/wiki/JQuery) (The only library not implemented in TypeScript)
* [chess.js](https://github.com/jhlywa/chess.js) — library used for chess game logic generation/validation (Providing the game logic)
* [Socket.IO](https://socket.io/) — Event-driven network communication (If multiplayer functionality is implemented)
