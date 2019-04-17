# Ping Pong Game
This is my first attempt at writing a browser based game using `html canvas` and `javascript`.

## Run the game
- Clone the repo
    ```bash
    git clone https://github.com/akshilv/ping-pong-game.git
    ```

- Open `index.html` in any browser

Note: To change any of the default settings, change the global variables in `gameController.js`.

## How to play

- Hover the mouse to move the left paddle.
- Position the paddle properly to hit the ball.
- Increase or decrease the speed of the ball based on the part of the paddle that hits the ball.
- First to reach 3 points wins.
- Left click to restart the game after the game gets over.

## Under the hood

This game uses HTML5 `<canvas>` element as the drawing surface and plain `javascript` for adding functionality to the game.

- The `window.onload` function is where everything is executed, and is the equivalent of a `main` function.
- All the graphics are rendered using the `CanvasRenderingContext2D` interface (aliased as `ctx` in the code).
- The rendering speed, or fps, is set to 60 by default. This is achieved by calling the `setInterval` function once every 1/60 seconds.
- The game relies on the event `mousemove` event to move the user's paddle.
- To move the ball around, the X and Y coordinates of the ball are updated with the `xBallSpeed` and `yBallSpeed` respectively.
- If the ball hits the horizontal boundary, a point is awarded to the other player. If the ball is hit by the paddle before the ball hits the horizontal boundary, the ball's speed (Y coordinate based only) changes based on from where the paddle strikes the ball (higher on the edges, lower around the center).
- Every time the a point is awarded, all of the changed values, ie., the ball's X and Y coordinate, the ball's speed and the position of the paddles are reset.
- The non-human paddle's position changes based on the position of the ball's Y coordinate.
- Once the game ends, the game ending screen is shown. To show the screen, only the canvas is redrawn.
- Using the `click` event, the user can restart the game once the game ends.

## Future Enhancements

- Take user input to change some static components, such as, the canvas, ball or paddle cover.
- Add difficulty level.
- Increase or decrease the `xBallSpeed` whenever the ball is hit.