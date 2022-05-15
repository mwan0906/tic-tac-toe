# General Architecture
This is a single page application written in React, with Node.js on the backend, ran on localhost:3000.

# Work Process
Since the tic-tac-toe game itself is the most integral feature, I chose to work on that before regarding the login function. What made the most sense to me was to keep a Board component built out of nine Squares to minimize copy and paste. This way, each Square would be responsible for itself and nothing else. I'm also now using Redux in conjunction with React for easier upstream communication.

First commit - Set up the actions available for the store. Right now, I don't have the square's ability to write to the board. I think that making the API call to the computer and testing the loading screen will be the most difficult part, so I want to tackle that first.

Second commit - I see that the AI can't be tested without first developing the login section. As per the acceptance criteria, I store the auth token in session storage, and in Redux, I only determine whether the user is logged in or logged out. I think that I'll include a logout button in the final website, for ease of use. While taking a break from brainstorming on how to perform the API call for the AI's moves, I went ahead and finished implementing the command to have the user place one of their X tokens on the grid, and prettied up the login page. I then finished the API call for the computer's moves. Remaining work to be done: highlighting rows/columns, and determining a victory state.

I don't normally make such large commits, but I wanted to concentrate on what I could do to take advantage of the unexpected free time I had.

Third commit - Implemented the loading screen when the API is being called for logging in or for waiting for the opponent, added hover activity for squares, and more concise rendering.

Fourth commit - Moved the logic for changing the board state to board.js, because that makes more sense than square.js. From the beginning, I did not want squares to communicate with each other. Instead, interactions should go through the board itself.