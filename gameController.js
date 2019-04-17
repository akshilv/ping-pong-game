// Canvas related globals
const canvas = document.getElementById('gameCanvas');
const canvasContext = canvas.getContext('2d');
const canvasColor = 'blue';
// Paddle related globals
const paddleColor = 'white';
const paddleHeight = 100;
const paddleWidth = 10;
var yUserPaddle = canvas.height/2 - paddleHeight/2;
var yAIPaddle = canvas.height/2 - paddleHeight/2;
var yAIPaddleSpeed = 6;
const yAIPaddleIgnorableArea = paddleHeight*0.35;
// Ball related globals
const ballColor = 'white';
const ballRadius = 10;
var xBall = canvas.width/2 - ballRadius/2;
var yBall = canvas.height/2 - ballRadius/2;
var xBallSpeed = 5;
var yBallSpeed = 5;
// Net related globals
const netWidth = 5;
const netColor = 'white';
const netPattern = [35];
// Frames per second
const fps = 30;
// Points
var userPoints = 0;
var AIPoints = 0;

/**
 * Main function that executes when the window gets loaded
 */
window.onload = function () {
    canvas.addEventListener('mousemove', function (event) {
        var mousePos = getMousePos(event);
        // Set the user paddle based on mouse position
        yUserPaddle = mousePos.yMouse;
    });
    // Draw everything based on fps
    setInterval(function () {
        // Draw the canvas
        drawRect(0, 0, canvas.width, canvas.height, canvasColor);
        // Draw paddles
        drawRect(0, yUserPaddle - paddleHeight/2, paddleWidth, paddleHeight, paddleColor);        // Center the paddle around the mouse pointer
        drawRect(canvas.width - paddleWidth, yAIPaddle, paddleWidth, paddleHeight, paddleColor);
        // Draw the net
        drawDashedLine(canvas.width/2, 0, canvas.width/2, canvas.height, netPattern, netWidth, netColor);
        // Show score
        canvasContext.font = '30px Arial';
        canvasContext.fillText(userPoints, canvas.width/4, canvas.height/2);
        canvasContext.fillText(AIPoints, canvas.width*3/4, canvas.height/2);
        // Draw the ball
        drawCircle(ballRadius, ballColor);
        // Move the ball
        moveBall();
        // Move the AI Paddle
        moveAIPaddle();
    }, 1000/fps);
}

/**
 * Function to draw and fill a rectangle
 * @param {Number} xValue - Distance from x coordinate of canvas
 * @param {Number} yValue - Distance from y coordinate of canvas
 * @param {Number} width - Width of rectange
 * @param {Number} height - Height of rectangle
 * @param {String} color - Color of rectange
 */
function drawRect (xValue, yValue, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(xValue, yValue, width, height);
}

/**
 * Function to draw a fill a dashed line
 * @param {Number} xStart - Starting x coordinate of line
 * @param {Number} yStart - Starting y coordinate of line
 * @param {Number} xEnd - Ending x coordinate of line
 * @param {Number} yEnd - Ending x coordinate of line
 * @param {Array} pattern - Pattern of dashed line
 * @param {Number} width - Width of line
 * @param {String} color - Color of line
 */
function drawDashedLine(xStart, yStart, xEnd, yEnd, pattern, width, color) {
    canvasContext.beginPath();
    canvasContext.setLineDash(pattern);
    canvasContext.moveTo(xStart, yStart);
    canvasContext.lineTo(xEnd, yEnd);
    canvasContext.strokeStyle = color;
    canvasContext.lineWidth = width;
    canvasContext.stroke();
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
    if ((xBall + ballRadius/2) >= canvas.width) {
        if (yBall > (yAIPaddle - paddleWidth) && yBall < (yAIPaddle + paddleHeight + paddleWidth)) {
            xBallSpeed = -xBallSpeed;
            return;
        }
        userPoints++;
        reset();
    }
    if ((xBall - ballRadius/2) <= 0) {
        // If the ball hits the 
        if (yBall > (yUserPaddle - paddleHeight/2 - paddleWidth) && yBall < (yUserPaddle + paddleHeight/2 + paddleWidth)) {
            xBallSpeed = -xBallSpeed;
            return;
        }
        AIPoints++;
        reset();
    }
    if ((yBall + ballRadius/2) >= canvas.height || (yBall - ballRadius/2) <= 0) {
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
 * @param {Event} event - The triggered event 
 */
function getMousePos (event) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    return {
        xMouse: event.clientX - rect.left - root.scrollLeft,
        yMouse: event.clientY - rect.top - root.scrollTop,
    }
}

/**
 * Move the AI paddle based on the ball's y coordinate
 */
function moveAIPaddle () {
    var yAIPaddleCenter = yAIPaddle + paddleHeight/2;
    if (yAIPaddleCenter < (yBall - yAIPaddleIgnorableArea)) {
        if ((yAIPaddle + paddleHeight) >= canvas.height) {
            return;
        }
        yAIPaddle += yAIPaddleSpeed;
    }
    if (yAIPaddleCenter > (yBall + yAIPaddleIgnorableArea)) {
        if (yAIPaddle <= 0) {
            return;
        }
        yAIPaddle -= yAIPaddleSpeed;
    }
    return;
}