
// Author: Serhii Ivanchuk, 000818168, Assignment 5, 31.03.2022, pagescript.js
// Assignment 5, SVG, JavaScript DOM manipulations


let points = 0;
let isPlaying = false;
let playerName = "";


const svgNS = "http://www.w3.org/2000/svg";
const canvasWidth = 700;
const canvasHeight = 500;

const brickWidth = 80;
const brickHeight = 20;

const brickColors = { 0: "violet", 1: "red", 2: "green", 3: "blue", 4: "orange", 5: "white" };
const brickColumns = 7;
const brickRows = 4;
const brickGap = 2;
const offsetLeft = 63;



const playerWidthWide = 220;
const playerWidthNormal = 140;
let playerWidth = playerWidthWide;
const playerHeight = 20;


const ballRadius = 10;


let ballX = 0;
let ballY = 0;
let ballXStep = 5;
let ballYStep = 3;

let goingUp = true;
let goingRight = true;

let brickArray = null;




const level1 = [1, 1, 1, 1, 1, 1, 1,
    2, 2, 2, 2, 2, 2, 2,
    3, 3, 3, 3, 3, 3, 3,
    4, 4, 4, 4, 4, 4, 4,
    5, 5, 5, 5, 5, 5, 5]

const level2 = [1, 1, -1, -1, -1, 1, 1,
    -1, -1, 2, 2, 2, -1, -1,
    3, 3, 5, 5, 5, 3, 3,
    4, -1, -1, -1, -1, -1, 4,
    5, 5, 5, 5, 5, 5, 5]

let gameLevel = level1;




function startGame() {
    points = 0;

    document.querySelector("#svg-canvas").style.display = 'inline';
    document.querySelector("#svg-menu").style.display = 'none';


    let player = document.querySelector("#svg-menu");

    player.setAttribute("x", canvasWidth / 2 - playerWidth / 2);
    player.setAttribute("y", canvasHeight - playerHeight - 10);

    ballX = parseInt(player.getAttribute("x")) + playerWidth / 2;
    ballY = parseInt(player.getAttribute("y") - ballRadius);

    goingUp = true;
    goingRight = true;
    ballXStep = 0;
    ballYStep = 3;

    isPlaying = true;

}



function endGame() {

    isPlaying = false;
    document.querySelector("#svg-canvas").style.display = 'none';
    document.querySelector("#svg-menu").style.display = 'inline';


    if (points > 0) {
        document.querySelector("#score-text").textContent = "Score: " + points;
        document.querySelector("#score-text").display = 'block';
    } else {
        document.querySelector("#score-text").display = 'none';
    }
    document.querySelector('.score-label').textContent = "Score: 0";

}




document.addEventListener("DOMContentLoaded", event => {
    const svgCanvas = document.querySelector("#svg-canvas");
    svgCanvas.setAttribute("width", canvasWidth);
    svgCanvas.setAttribute("height", canvasHeight);

    const player = createPlayer();
    svgCanvas.appendChild(player);


    const ball = createBall();
    svgCanvas.appendChild(ball);




    function createBrick(xPos, yPos, shield) {
        let brick = document.createElementNS(svgNS, "rect");
        brick.setAttribute("class", "brick");
        brick.classList.add("bounceable");
        brick.setAttribute("canBounce", true);
        brick.setAttribute("shield", shield);
        brick.setAttribute("fill", brickColors[shield]);
        brick.setAttribute("x", xPos);
        brick.setAttribute("y", yPos);
        brick.setAttribute("width", brickWidth);
        brick.setAttribute("height", brickHeight);

        brick.addEventListener("animationend", function () {
            this.classList.remove("brick-animate");
            void this.offsetWidth;
        });
        return brick;
    }




    function createPlayer() {
        let player = document.createElementNS(svgNS, "rect");
        player.setAttribute("class", "player");
        player.classList.add("bounceable");
        player.setAttribute("canBounce", true);
        player.setAttribute("fill", "yellow");
        player.setAttribute("x", canvasWidth / 2 - playerWidth / 2);
        player.setAttribute("y", canvasHeight - playerHeight - 10);
        player.setAttribute("rx", "5");
        player.setAttribute("width", playerWidth);
        player.setAttribute("height", playerHeight);
        return player;
    }



    function createBall() {
        let ball = document.createElementNS(svgNS, "circle");
        ball.setAttribute("class", "ball");
        ball.setAttribute("fill", "red");
        ball.setAttribute("r", 10);
        ballX = parseInt(player.getAttribute("x")) + playerWidth / 2;
        ballY = parseInt(player.getAttribute("y") - ballRadius);
        ball.setAttribute("cx", ballX);
        ball.setAttribute("cy", ballY);
        return ball;
    }





    function togglePlayerWidth() {
        if (isPlaying) {

            if (playerWidth == playerWidthNormal) {
                playerWidth = playerWidthWide
            } else {
                playerWidth = playerWidthNormal;
            }

            player.setAttribute('width', playerWidth)
        }

    }




    function stupBricks() {
        let cnt = 0;
        let row = 0;
        document.querySelectorAll(".brick.bounceable").forEach(el => el.remove());

        for (let i = 0; i < gameLevel.length; i++) {
            if (gameLevel[i] > -1) {
                svgCanvas.appendChild(createBrick(offsetLeft + cnt * (brickWidth + brickGap), offsetLeft + row * (brickHeight + brickGap), gameLevel[i]));

            }
            cnt++;
            if (cnt >= 7) {
                cnt = 0;
                row++;
            }
        }

        brickArray = document.querySelectorAll('.bounceable');
    }


    document.addEventListener('mousemove', function (event) {
        if (isPlaying) {
            let newX = event.offsetX - playerWidth / 2;

            if (newX < 0) {
                newX = 0;
            }
            if (newX + playerWidth >= canvasWidth) {
                newX = canvasWidth - playerWidth;
            }

            player.setAttribute("x", newX);
        }


    });

    document.addEventListener('click', function (event) {
        if (isPlaying) {
            togglePlayerWidth();
        }


    });


    document.querySelector('#exit-btn').addEventListener('click', function (event) {
        endGame();
    });

    document.querySelector('#exit-btn').addEventListener('mouseenter', function (event) {
        this.classList.add('start-hover');
        this.style.cursor = 'hand';
    });



    document.querySelector('#start-one').addEventListener('click', function (event) {
        gameLevel = level1;
        stupBricks();
        startGame();
    });
    document.querySelector('#start-two').addEventListener('click', function (event) {
        gameLevel = level2;
        stupBricks();
        startGame();

    });



    document.querySelector('#start-one').addEventListener('mouseenter', function (event) {
        this.classList.add('start-hover');
        this.style.cursor = 'hand';
    });
    document.querySelector('#start-one').addEventListener('mouseleave', function (event) {
        this.classList.remove('start-hover');
        this.style.cursor = 'hand';
    });


    document.querySelector('#start-two').addEventListener('mouseenter', function (event) {
        this.classList.add('start-hover');
    });
    document.querySelector('#start-two').addEventListener('mouseleave', function (event) {
        this.classList.remove('start-hover');
    });






    let ballTmer = setInterval(moveBall, 1000 / 60);  //1000 / 60




    function hitBrick(someBrick) {
        let shield = parseInt(someBrick.getAttribute("shield"));
        shield--;
        someBrick.setAttribute("shield", shield);

        if (shield < 0) {
            someBrick.remove();
            brickArray = document.querySelectorAll('.bounceable');
        } else {

            someBrick.setAttribute("fill", brickColors[shield]);

            void someBrick.offsetWidth;
            someBrick.classList.add("brick-animate");
        }


        points += 5;
        document.querySelector('.score-label').textContent = "Score: " + points;

    }



    function moveBall() {

        if (isPlaying) {

            ballX -= ballXStep;
            ballY -= ballYStep;
            if (ballX + ballRadius >= canvasWidth || ballX - ballRadius <= 0) {
                ballXStep *= -1;
                goingRight = !goingRight;
            }

            if (ballY - ballRadius <= 0) {
                ballYStep *= -1;
                goingUp = !goingUp;
            }

            if (ballY >= canvasHeight) {
                endGame();
                return;
            }



            for (let i = 0; i < brickArray.length; i++) {

                let arrayBrick = brickArray[i];
                let arrayBrickX = parseInt(arrayBrick.getAttribute('x'));
                let arrayBrickY = parseInt(arrayBrick.getAttribute('y'));
                let isPlayer = arrayBrick == player;

                let compareWidth = brickWidth;
                if (isPlayer) {
                    compareWidth = playerWidth;
                }

                let isInFront = (ballX >= arrayBrickX) && (ballX <= arrayBrickX + compareWidth);
                let isOnSide = (ballY >= arrayBrickY) && (ballY <= arrayBrickY + brickHeight);



                if ((ballY - ballRadius <= arrayBrickY + brickHeight) && (ballY - ballRadius >= arrayBrickY) && isInFront && goingUp) {
                    ballYStep *= -1;
                    goingUp = !goingUp;
                    if (!isPlayer) {
                        hitBrick(arrayBrick);
                    }


                }

                if ((ballY + ballRadius >= arrayBrickY) && (ballY + ballRadius <= arrayBrickY + brickHeight) && isInFront && goingUp == false) {
                    ballYStep *= -1;
                    goingUp = !goingUp;

                    if (isPlayer) {
                        let playerX = parseInt(player.getAttribute("x"));
                        let playerCenter = playerX + playerWidth / 2;
                        if (ballX < playerCenter) {
                            ballXStep = (playerCenter - ballX) * 0.2;

                        } else {
                            ballXStep = (ballX - playerCenter) * 0.2;

                        }


                        if (ballXStep <= 0) {
                            ballXStep = 0;
                        }
                        console.log("Ball Step: " + ballXStep);

                    } else {
                        hitBrick(arrayBrick);
                    }


                }


                if ((ballX - ballRadius <= arrayBrickX + compareWidth) && (ballX - ballRadius >= arrayBrickX) && isOnSide && goingRight) {
                    ballXStep *= -1;
                    goingRight = !goingRight;



                }

                if ((ballX + ballRadius >= arrayBrickX) && (ballX + ballRadius <= arrayBrickX + compareWidth) && isOnSide && goingRight == false) {
                    ballXStep *= -1;
                    goingRight = !goingRight;

                }




            }


            ball.setAttribute("cx", ballX);
            ball.setAttribute("cy", ballY);

        }




    }

})