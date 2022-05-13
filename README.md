# General Architecture
This is a single page application written in React, with Node.js on the backend, ran on localhost:3000.

#Work Process
Since the tic-tac-toe game itself is the most integral feature, I chose to work on that before regarding the login function. What made the most sense to me was to keep a Board component built out of nine Squares to minimize copy and paste. This way, each Square would be responsible for itself and nothing else. I'm also now using Redux in conjunction with React for easier upstream communication.

First commit - Set up the actions available for the store. Right now, I don't have the square's ability to write to the board. I think that making the API call to the computer and testing the loading screen will be the most difficult part, so I want to tackle that first.