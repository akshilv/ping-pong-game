// Canvas related globals
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const canvasColor = 'blue';
// Paddle related globals
const paddleColor = 'white';
const paddleHeight = 100;
const paddleWidth = 10;
var yUserPaddle = canvas.height/2 - paddleHeight/2;
var yAIPaddle = canvas.height/2 - paddleHeight/2;
var yAIPaddleSpeed = 7;
const yAIPaddleIgnorableArea = paddleHeight * 0.35;
// Ball related globals
const ballColor = 'white';
const ballRadius = 10;
const ballSpeedMultiplier = 0.25;
const xBallDefaultSpeed = 5;
const yBallDefaultSpeed = 5;
var xBall = canvas.width/2 - ballRadius/2;
var yBall = canvas.height/2 - ballRadius/2;
var xBallSpeed = xBallDefaultSpeed;
var yBallSpeed = yBallDefaultSpeed;
// Net related globals
const netWidth = 5;
const netColor = 'white';
const netPattern = [35];
// Frames per second
const fps = 60;
// Points
const winningPoints = 3;
var userPoints = 0;
var AIPoints = 0;
// Text related globals
const textFont = '30px Arial';
const textColor = 'white';
// End screen related globals
var showEndScreen = false;
var endMessage = '';

/**
 * Main function that executes when the window gets loaded
 */
window.onload = function () {
    canvas.addEventListener('mousemove', function (event) {
        var mousePos = getMousePos(event);
        // Set the user paddle based on mouse position
        yUserPaddle = mousePos.yMouse;
    });
    canvas.addEventListener('click', function () {
        if (showEndScreen == true) {
            showEndScreen = false;
            reset();
        }
    });
    // Draw everything based on fps
    setInterval(function () {
        // Draw the canvas
        drawRect(0, 0, canvas.width, canvas.height, canvasColor);
        // Show end screen
        if (showEndScreen == true) {
            ctx.font = textFont;
            ctx.fillStyle = textColor;
            ctx.fillText(endMessage, canvas.width/4, canvas.height/2);
            ctx.fillText('Click to restart.', canvas.width/4, canvas.height/2 + 60);
            return;
        }
        // Draw paddles
        drawRect(0, yUserPaddle - paddleHeight/2, paddleWidth, paddleHeight, paddleColor);        // Center the paddle around the mouse pointer
        drawRect(canvas.width - paddleWidth, yAIPaddle, paddleWidth, paddleHeight, paddleColor);
        // Draw the net
        drawDashedLine(canvas.width/2, 0, canvas.width/2, canvas.height, netPattern, netWidth, netColor);
        // Show score
        ctx.font = textFont;
        ctx.fillStyle = textColor;
        ctx.fillText(userPoints, canvas.width/4, canvas.height/2);
        ctx.fillText(AIPoints, canvas.width*3/4, canvas.height/2);
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
    ctx.fillStyle = color;
    ctx.fillRect(xValue, yValue, width, height);
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
    ctx.beginPath();
    ctx.setLineDash(pattern);
    ctx.moveTo(xStart, yStart);
    ctx.lineTo(xEnd, yEnd);
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.stroke();
}

/**
 * Function to draw and fill a circle
 * @param {Number} radius 
 * @param {String} color 
 */
function drawCircle (radius, color) {
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(xBall, yBall, radius, 0, Math.PI * 2, true);
    ctx.fill();
}

/**
 * Move the ball around the canvas
 */
function moveBall () {
    xBall += xBallSpeed;
    yBall += yBallSpeed;
    if ((xBall + ballRadius/2) >= canvas.width) {
        // If the ball hits the AI paddle, reverse the ball speed and change the ball's speed
        if (yBall > (yAIPaddle - paddleWidth) && yBall < (yAIPaddle + paddleHeight + paddleWidth)) {
            xBallSpeed = -xBallSpeed;
            if (yBallSpeed >= 0) {
                yBallSpeed = Math.abs(yBall - (yAIPaddle + paddleHeight/2)) * ballSpeedMultiplier;
            } else {
                yBallSpeed = Math.abs(yBall - (yAIPaddle + paddleHeight/2)) * ballSpeedMultiplier * -1;
            }
            return;
        }
        userPoints++;
        reset();
    }
    if ((xBall - ballRadius/2) <= 0) {
        // If the ball hits the user paddle, reverse the ball speed and change the ball's speed
        if (yBall > (yUserPaddle - paddleHeight/2 - paddleWidth) && yBall < (yUserPaddle + paddleHeight/2 + paddleWidth)) {
            xBallSpeed = -xBallSpeed;
            if (yBallSpeed >= 0) {
                yBallSpeed = Math.abs(yBall - (yUserPaddle + paddleHeight/2)) * ballSpeedMultiplier;
            } else {
                yBallSpeed = Math.abs(yBall - (yUserPaddle + paddleHeight/2)) * ballSpeedMultiplier * -1;
            }
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
    // Show end screen if either user or AI won
    if (userPoints >= winningPoints) {
        // Reset points
        userPoints = 0;
        AIPoints = 0;
        showEndScreen = true;
        endMessage = 'Congratulations! You won.';
        return;
    } else if (AIPoints >= winningPoints) {
        // Reset points
        userPoints = 0;
        AIPoints = 0;
        showEndScreen = true;
        endMessage = 'Sorry! Tumse na ho payega.';
        return;
    }
    // Reset ball's x and y coordinates
    xBall = canvas.width/2 - ballRadius/2;
    yBall = canvas.height/2 - ballRadius/2;
    // Reset both paddle's position
    yUserPaddle = canvas.height/2 - paddleHeight/2;
    yAIPaddle = canvas.height/2 - paddleHeight/2;
    // Reverse ball speed
    if (xBallSpeed > 0) {
        xBallSpeed = -xBallDefaultSpeed;
    } else {
        xBallSpeed = xBallDefaultSpeed;
    }
    if (yBallSpeed > 0) {
        yBallSpeed = - yBallDefaultSpeed;
    } else {
        yBallSpeed = yBallDefaultSpeed;
    }
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
