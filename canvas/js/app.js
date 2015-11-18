/* script file for the Canvas demo */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // Don't use angular for games
    // selects the canvas element with the id game-canvas
    var canvas = document.getElementById('game-canvas');
    // This renders the 2 dimensional context
    var ctx = canvas.getContext('2d');


    //creates a rectangle on the canvas with a left top width height
    // sets the fill style and aany time you use 'fill' in any type then it defaults it to that color
    //ctx.fillStyle = 'rgba(255, 0, 0, 0.6)';
    //// begins its left/right from 0,0, of the canvas
    //ctx.fillRect(20, 20, 50, 60);
    //
    //ctx.fillStyle = 'rgba(0,0,255,0.6)';
    //ctx.fillRect(40, 40, 50, 60);
    //
    //// resets fill color to be black
    //ctx.fillStyle = '#000';
    //// creates text within the canvas
    //var idx;
    ////fills the top side with numbers (left to right)
    //for (idx = 0; idx < canvas.width; idx+=20) {
    //    // text you want, x coord, y coord, and
    //    ctx.fillText(idx, idx, 10);
    //}
    ////fills the left side with numbers (up down)
    //for (idx = 0; idx < canvas.height; idx+=20) {
    //    ctx.fillText(idx, 0, idx);
    //}

    // allows us to restart our game on demand
    var gameState;

    // Creates a new game state object
    function newGameState() {
        return {
            ball: {
                left: 35,
                top: 10,
                width: 5,
                height: 5,

                //defines direction that ball will move in
                vectorX: 1,
                vectorY: 1,

                //how fast the ball will move
                velocity: 6
            },
            paddle: {
                left: 20,
                top: 0,
                width: 10,
                height: canvas.height/6
            },
            lastTimestamp: performance.now()
        };
    } // newGameState()

    // renders current game state to canvas element
    function render() {
        // clears the entire canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        var ball = gameState.ball;

        //begins to draw a circle
        ctx.beginPath();
        //takes x and y
        //draws arc
        ctx.arc(ball.left + (ball.width/2),
                ball.top + (ball.height/2),
                ball.width, 0, 2 * Math.PI);
        //fills in the circle
        ctx.fill();

        // creates the paddle
        var paddle = gameState.paddle;
        ctx.fillRect(paddle.left, paddle.top, paddle.width, paddle.height);
    } // render()

    //gets executed every time we want to advance the animation by 1 step
    function step() {
        var ball = gameState.ball;

        // moves the ball vertically
        ball.left += ball.vectorX * ball.velocity;
        ball.top += ball.vectorY * ball.velocity;

        // bounce if hit left or right wall
        if (ball.left <= 0 || ball.left + ball.width >= canvas.width) {
            ball.vectorX = -ball.vectorX;
        }

        // bounce if hit top or bottom wall
        if (ball.top <= 0  || ball.top + ball.height >= canvas.height) {
            ball.vectorY = -ball.vectorY;
        }

        var paddle = gameState.paddle;
        if (ball.left <= paddle.left + paddle.width) {
            //if the bottom of the ball is at or below the top of paddle
            if (ball.top + ball.height >= paddle.top && ball.top <= paddle.top + paddle.height) {
                ball.vectorX = -ball.vectorX;
            } else {
                // game over
                ctx.font = '20px Helvetica';
                var msg = 'Game Over';

                //gets the width of game over text
                var metrics = ctx.measureText(msg);



                ctx.fillText(msg, (canvas.width - metrics.width) / 2, (canvas.height - 20) / 2);
                return false;
            }
        }

        return true;
    }

    // advances the animation and redraws
    function animate(timestamp) {
        var keepGoing = true;
        render();

        //advance animation if 16 ms have passed
        if (timestamp - gameState.lastTimestamp > 16) {
            keepGoing = step();
            gameState.lastTimestamp = timestamp;
        }

        //if game is still going keep animating
        if (keepGoing) {
            requestAnimationFrame(animate);
        }
    }

    document.addEventListener('mousemove', function(evt) {
        var canvasY = evt.clientY - canvas.offsetTop;
        var paddle = gameState.paddle;
        paddle.top = canvasY - (paddle.height / 2);
        paddle.top = Math.max(0, paddle.top);
        paddle.top = Math.min(canvas.height - paddle.height, paddle.top);
    });

    // creates a new game state
    gameState = newGameState();

    // continuously sets the thing
    // 16 miliseconds,
    //window.setInterval(animate, 16);

    // ask browser to animate as quickly as possible
    requestAnimationFrame(animate);

});
