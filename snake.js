
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

let AUDIO_Fail = new Audio('wrong.mp3');

let cellWidth = canvas.width / cols;
let cellHeight = canvas.height / rows;
let direction = 'LEFT';
let foodCollected = false;

//function stop() {
//    playGame = false;
//}

function start() {

    placeFood();
    setInterval(gameLoop, 100);
    document.addEventListener('keydown', keyDown);
    draw();
}

function draw() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    snake.forEach(part => add(part.x, part.y));
    feed(food.x, food.y);

    requestAnimationFrame(draw);
}

function gameOver() {
    let firstPart = snake[0];
    let otherParts = snake.slice(1);
    let duplicatePart = otherParts.find(part => part.x == firstPart.x && part.y == firstPart.y); // Schlange frisst sich selber

    //Schlange läuft gegen die Wand
    if (snake[0].x < 0 ||
        snake[0].x > cols - 1 ||
        snake[0].y < 0 ||
        snake[0].y > rows - 1 ||
        duplicatePart
    ) {
        AUDIO_Fail.play();
        replay();

    }
}

function replay() {
    placeFood();
       
    snake = [{
        x: 7,
        y: 3
    }];
    direction = 'LEFT';
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

function shiftSnake() {
    for (let i = snake.length - 1; i > 0; i--) {         // das Wachsen der Schlange und eingliedern der Teile
        const part = snake[i];
        const lastPart = snake[i - 1];
        part.x = lastPart.x;
        part.y = lastPart.y;
    }
}

function gameLoop() {
    gameOver();
    if (foodCollected) {
        snake = [{
            x: snake[0].x,
            y: snake[0].y
        }, ...snake];

        foodCollected = false;
    }
    shiftSnake();

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
        foodCollected = true;
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



