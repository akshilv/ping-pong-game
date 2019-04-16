// Get the canvas and context element
const canvas = document.getElementById('gameCanvas');
const canvasContext = canvas.getContext('2d');
// Paddle related globals
const paddleHeight = 100;
const paddleWidth = 10;
var yUserPaddle = canvas.height/2 - paddleHeight/2;
var yAIPaddle = canvas.height/2 - paddleHeight/2;
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
    // Draw everything based on fps
    setInterval(function () {
        // Draw the canvas
        drawRect(0, 0, canvas.width, canvas.height, 'blue');
        // Draw paddles
        drawRect(0, yUserPaddle, paddleWidth, paddleHeight, 'white');
        drawRect(canvas.width - paddleWidth, yAIPaddle, paddleWidth, paddleHeight, 'white');
        // Draw the ball
        drawCircle(ballRadius, 'white');
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