# General Architecture
This is a single page application written in React, with Node.js on the backend, ran on localhost:3000.

# Work Process
Since the tic-tac-toe game itself is the most integral feature, I chose to work on that before regarding the login function. What made the most sense to me was to keep a Board component built out of nine Squares to minimize copy and paste. This way, each Square would be responsible for itself and nothing else. I'm also now using Redux in conjunction with React for easier upstream communication.

First commit - Set up the actions available for the store. Right now, I don't have the square's ability to write to the board. I think that making the API call to the computer and testing the loading screen will be the most difficult part, so I want to tackle that first.

Second commit - I see that the AI can't be tested without first developing the login section. As per the acceptance criteria, I store the auth token in session storage, and in Redux, I only determine whether the user is logged in or logged out. I think that I'll include a logout button in the final website, for ease of use. While taking a break from brainstorming on how to perform the API call for the AI's moves, I went ahead and finished implementing the command to have the user place one of their X tokens on the grid, and prettied up the login page. I then finished the API call for the computer's moves. Remaining work to be done: highlighting rows/columns, and determining a victory state.

I don't normally make such large commits, but I wanted to concentrate on what I could do to take advantage of the unexpected free time I had.

Third commit - Implemented the loading screen when the API is being called for logging in or for waiting for the opponent, added hover activity for squares, and more concise rendering.

Fourth commit - Moved the logic for changing the board state to board.js, because that makes more sense than square.js. From the beginning, I did not want squares to communicate with each other. Instead, interactions should go through the board itself.

Fifth commit - Adjacent squares are now highlighted when hovering over a square. This comes from setting the board state and checking as each square is rendered if it matches the row or column.

Sixth commit - Calculates win conditions. When the API returns a new board state, it checks all eight possible win states for the computer. When the user makes a move, however, we only need to check the corresponding row and column of the newest move, along with the diagonals if the move is on a corner or the center. Nothing is done yet when either side wins, though. Right now, the loading screen comes up as soon as the user makes their move, and comes down after the AI has made theirs. This makes no sense, so I'll be moving things so loading only occurs IF the AI is making a move.

Seventh commit - Moved loading logic so that it's also entirely controlled by the store, and added condition such that once victory is recognized, the player can no longer make a move. Remaining work to be done: Display victory state, add reset and logout functions.

Eighth commit - Displays victory state and reset button once a game is complete, and logout button along with turn counter at the front! A tic-tac-toe game will never last longer than five turns, and it checks if there's a draw if five turns have passed without a victor. I've also put the Board component onto a larger component labeled Gamepage now instead of directly onto the app. The Gamepage displays the board, the header (turn counter + logout button, which should be available at all times) and the message and button after a game has completed, titled "postgame."

This is now the minimum viable product.

# Further changes that I would like to make
- Since I'm not much of a graphic designer, the page looks very simple. I've experimented with Material-UI before, so I think that the project would have greatly benefitted by fitting that framework in. I was most focused on functionality, but, given more time, I would have made the navbar more exciting to look at.
- Much of the game's logic is in the Board component, which makes sense since it's the user's main area of play, but for greater legibility, I think that it would be best to move it to the redux store. The checkWin function in particular, I think could be spruced up.
- I think that it would be helpful for, after a game's victor is decided, if it's not a draw, then highlight the winning row, column, or diagonal. The method I would use to do that would be to store in the board state the coordinates of the grid spaces that form the winning line, and then as I render the board, add an additional class, such as "winner." However, the checkWin function is already in need of optimization, so I wouldn't feel comfortable adding this feature unprompted at the cost of performance.

On the idea of a "suggest move" button: I'm going to be tackling this right now, but may not have finished by the time you read this. I know that tic-tac-toe is a solved game, and that the ideal first move is to take the center, but I don't know what the optimal moves would be afterwards, with all the possible boardstates. However, the AI does. So, my thought is to make another API call using the current board state, but with the X's replaced with O's and vice versa. I would compare the returned board state with the current board state to see the coordinates of which value has changed from '' to 'O', and then highlight that square. Upon the user's next move, I would remove that highlight. Another API call may be pricey in terms of time, and if we were in production and couldn't afford too many calls, then it would probably best to develop an algorithm in-house. But, right now, that seems like the simplest way to suggest the best possible move to the user.