// Get the canvas and context element
const canvas = document.getElementById('gameCanvas');
const canvasContext = canvas.getContext('2d');
// Paddle related globals
const paddleHeight = 100;
const paddleWidth = 10;
var yUserPaddle = canvas.height/2 - paddleHeight/2;
var yAIPaddle = canvas.height/2 - paddleHeight/2;
var xBallSpeed = 5;
var yBallSpeed = 5;
var yAIPaddleSpeed = 6;
// Ball related globals
const ballRadius = 10;
var xBall = canvas.width/2 - ballRadius/2;
var yBall = canvas.height/2 - ballRadius/2;
// Frames per second
const fps = 30;

/**
 * Main function that executes when the window gets loaded
 */
window.onload = function () {
    canvas.addEventListener('mousemove', function (event) {
        var mousePos = getMousePos(event);
        // Set the user paddle based on mouse position
        yUserPaddle = mousePos.yPaddle;
    });
    // Draw everything based on fps
    setInterval(function () {
        // Draw the canvas
        drawRect(0, 0, canvas.width, canvas.height, 'blue');
        // Draw paddles
        drawRect(0, yUserPaddle - paddleHeight/2, paddleWidth, paddleHeight, 'white');        // Center the paddle around the mouse pointer
        drawRect(canvas.width - paddleWidth, yAIPaddle, paddleWidth, paddleHeight, 'white');
        // Draw the ball
        drawCircle(ballRadius, 'white');
        // Move the ball
        moveBall();
        // Move the AI Paddle
        moveAIPaddle();
    }, 1000/fps);
}

/**
 * Function to draw and fill a rectangle
 * @param {Number} xValue 
 * @param {Number} yValue 
 * @param {Number} width 
 * @param {Number} height 
 * @param {String} color 
 */
function drawRect (xValue, yValue, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(xValue, yValue, width, height);
}

/**
 * Function to draw and fill a circle
 * @param {Number} radius 
 * @param {String} color 
 */
function drawCircle (radius, color) {
    canvasContext.beginPath();
    canvasContext.fillStyle = color;
    canvasContext.arc(xBall, yBall, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
}

/**
 * Move the ball around the canvas
 */
function moveBall () {
    xBall += xBallSpeed;
    yBall += yBallSpeed;
    if (xBall >= canvas.width || xBall <= 0) {
        reset();
    }
    if (yBall >= canvas.height || yBall <= 0) {
        yBallSpeed = -yBallSpeed;
    }
}

/**
 * Reset cooridnate of ball when a player scores
 */
function reset () {
    // Reset ball's x and y coordinates
    xBall = canvas.width/2 - ballRadius/2;
    yBall = canvas.height/2 - ballRadius/2;
    // Reset both paddle's position
    yUserPaddle = canvas.height/2 - paddleHeight/2;
    yAIPaddle = canvas.height/2 - paddleHeight/2;
    // Reverse ball speed
    xBallSpeed = -xBallSpeed;
    yBallSpeed = -yBallSpeed;
}

/**
 * Returns the mouse position on canvas
 * @param {Event} event 
 */
function getMousePos (event) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    return {
        xPaddle: event.clientX - rect.left - root.scrollLeft,
        yPaddle: event.clientY - rect.top - root.scrollTop,
    }
}

/**
 * Move the AI paddle based on the ball's y coordinate
 */
function moveAIPaddle () {
    if (yAIPaddle + paddleHeight/2 < yBall) {
        if (yAIPaddle + paddleHeight >= canvas.height) {
            return;
        }
        yAIPaddle += yAIPaddleSpeed;
    }
    if (yAIPaddle + paddleHeight/2 > yBall) {
        if (yAIPaddle <= 0) {
            return;
        }
        yAIPaddle -= yAIPaddleSpeed;
    }
}