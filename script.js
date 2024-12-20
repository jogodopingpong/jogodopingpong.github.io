const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

const paddleWidth = 10, paddleHeight = 100;
let ballRadius = 10;

const player = {
    x: 0,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: "#00BFFF",
    score: 0
};

const robot = {
    x: canvas.width - paddleWidth,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: "#FF6347",
    score: 0
};

let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: ballRadius,
    speedX: 5,
    speedY: 5,
    color: "#FFF"
};

let playerSpeed = 0;

const playerScoreDisplay = document.getElementById("player-score");
const robotScoreDisplay = document.getElementById("robot-score");

function startGame() {
    document.querySelector('.start-screen').style.display = 'none';
    document.querySelector('.game-screen').style.display = 'flex';
    draw();
}

function showModal() {
    document.getElementById("how-to-modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("how-to-modal").style.display = "none";
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();

    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);

    ctx.fillStyle = robot.color;
    ctx.fillRect(robot.x, robot.y, robot.width, robot.height);

    ball.x += ball.speedX;
    ball.y += ball.speedY;

    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.speedY = -ball.speedY;
    }

    if (ball.x - ball.radius < player.x + player.width && ball.y > player.y && ball.y < player.y + player.height) {
        ball.speedX = -ball.speedX;
    }

    if (ball.x + ball.radius > robot.x && ball.y > robot.y && ball.y < robot.y + robot.height) {
        ball.speedX = -ball.speedX;
    }

    if (ball.y < robot.y + robot.height / 2) {
        robot.y -= 4;
    } else if (ball.y > robot.y + robot.height / 2) {
        robot.y += 4;
    }

    player.y += playerSpeed;

    if (player.y < 0) {
        player.y = 0;
    } else if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
    }

    if (ball.x - ball.radius < 0) {
        robot.score++;
        resetBall();
    } else if (ball.x + ball.radius > canvas.width) {
        player.score++;
        resetBall();
    }

    playerScoreDisplay.textContent = `Jogador: ${player.score}`;
    robotScoreDisplay.textContent = `Robô: ${robot.score}`;

    requestAnimationFrame(draw);
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.speedX = ball.speedX > 0 ? -5 : 5;
    ball.speedY = 5;
}

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
        playerSpeed = -6;
    } else if (event.key === "ArrowDown") {
        playerSpeed = 6;
    }
});

document.addEventListener("keyup", () => {
    playerSpeed = 0;
});

canvas.addEventListener("touchmove", (event) => {
    const touch = event.touches[0];
    const rect = canvas.getBoundingClientRect();
    player.y = touch.clientY - rect.top - player.height / 2;

    if (player.y < 0) player.y = 0;
    if (player.y + player.height > canvas.height) player.y = canvas.height - player.height;
});
