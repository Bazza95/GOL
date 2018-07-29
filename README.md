Origin Code Challenge - Game Of Life

Prerequisites:
Latest node version should be installed to run applications.
To install node modules, run: 'npm install' in the root directory of the project.

Run:
The server application must be running before the CLI application is run.
1. Run 'npm start' to start the server (in a separate terminal)
2. Run 'node commands.js' to run CLI application (in a separate terminal)

Tests:
Unit testing has been done across the express server.
This utilizes Mocha and supertest as it's main packages.
To run Mocha, you will need Node.js v4 or newer.
To run tests, run: 'npm test' from the root directory of the project.

Assumptions/Design:
It was requested the GET requests from the CLI application are in the form '/room/x/y'. I took the approach that the frontend doesn't need to store the current location.
The CLI application and associated api calls were designed with the approach that the backend server is the information expert.
Calls from the frontend send the minimal amount of data such that the backend can process requests.
Application data such as the player score, lives remaining and current position is stored in the backend.