
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
let rows = 30;
let cols = 30;
let snake = [{
    x: 7,
    y: 3
}];

let food;
let playGame = true;

let cellWidth = canvas.width / cols;
let cellHeight = canvas.height / rows;
let direction = 'LEFT';
let foodCollected = false;

function stop() {
    playGame = false;
}

function start() {
    if (playGame) {
        placeFood();

        setInterval(gameLoop, 500);
        document.addEventListener('keydown', keyDown);
        draw();
    }else {
        setInterval(gameLoop, 0);
        console.log("stop");
    }
}




function draw() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    snake.forEach(part => add(part.x, part.y));

    feed(food.x, food.y);

    requestAnimationFrame(draw);


}

function placeFood() {
    let randomX = Math.floor(Math.random() * cols);
    let randomY = Math.floor(Math.random() * rows);

    food = { x: randomX, y: randomY };
}

function add(x, y) {
    ctx.fillStyle = 'white';
    ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth - 1, cellHeight - 1)
}

function feed(x, y) {
    ctx.fillStyle = 'green';
    ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth - 1, cellHeight - 1);
}

function gameLoop() {
    if (direction == 'LEFT') {
        snake[0].x--;
    }
    if (direction == 'RIGHT') {
        snake[0].x++;
    }
    if (direction == 'UP') {
        snake[0].y--;
    }
    if (direction == 'DOWN') {
        snake[0].y++;
    }

    if (snake[0].x == food.x && snake[0].y == food.y) {
        placeFood()
    }
}

function keyDown(e) {
    if (e.keyCode == 37) {
        direction = 'LEFT';
    }
    if (e.keyCode == 38) {
        direction = 'UP';
    }
    if (e.keyCode == 39) {
        direction = 'RIGHT';
    }
    if (e.keyCode == 40) {
        direction = 'DOWN';
    }
}



