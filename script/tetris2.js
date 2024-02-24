const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

const shapes = [
    [[1, 1, 1, 1]], 
    [[1, 1, 0],
     [0, 1, 1]], 
    [[0, 1, 1],
     [1, 1, 0]], 
    [[1, 1],
     [1, 1]],
    [[1, 1, 1],
     [0, 1, 0]],
    [[1, 1, 1],
     [0, 0, 1]],
    [[1, 1, 1],
     [1, 0, 0]],
];

const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500'];

let score = 0;
let gameOver = false;
let currentShape;
let shapeX;
let shapeY;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawShape();
    drawBoard();
}

function drawShape() {
    const colorIndex = shapes.indexOf(currentShape) % colors.length;
    ctx.fillStyle = colors[colorIndex];
    currentShape.forEach((row, i) => {
        row.forEach((cell, j) => {
            if (cell) {
                ctx.fillRect((shapeX + j) * scale, (shapeY + i) * scale, scale, scale);
            }
        });
    });
}

function drawBoard() {
    ctx.strokeStyle = '#888';
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            ctx.strokeRect(j * scale, i * scale, scale, scale);
            if (board[i][j]) {
                ctx.fillStyle = '#000';
                ctx.fillRect(j * scale, i * scale, scale, scale);
            }
        }
    }
}

function moveShape() {
    if (gameOver) return;

    if (!collision(shapeX, shapeY + 1, currentShape)) {
        shapeY++;
    } else {
        freezeShape();
        clearLines();
        spawnShape();
        if (collision(shapeX, shapeY, currentShape)) {
            gameOver = true;
        }
    }
}

function collision(x, y, shape) {
    for (let i = 0; i < shape.length; i++) {
        for (let j = 0; j < shape[i].length; j++) {
            if (shape[i][j] && (board[y + i] && board[y + i][x + j]) !== 0) {
                return true;
            }
        }
    }
    return false;
}

function freezeShape() {
    currentShape.forEach((row, i) => {
        row.forEach((cell, j) => {
            if (cell) {
                board[shapeY + i][shapeX + j] = 1;
            }
        });
    });
}

function clearLines() {
    for (let i = rows - 1; i >= 0; i--) {
        if (board[i].every(cell => cell)) {
            board.splice(i, 1);
            board.unshift(Array(columns).fill(0));
            score += 10;
        }
    }
}

function spawnShape() {
    const randomIndex = Math.floor(Math.random() * shapes.length);
    currentShape = shapes[randomIndex];
    shapeX = Math.floor(columns / 2) - Math.floor(currentShape[0].length / 2);
    shapeY = 0;
    if (collision(shapeX, shapeY, currentShape)) {
        gameOver = true;
    }
}

document.addEventListener('keydown', evt => {
    if (gameOver) return;

    switch (evt.key) {
        case 'ArrowLeft':
            if (!collision(shapeX - 1, shapeY, currentShape)) {
                shapeX--;
            }
            break;
        case 'ArrowRight':
            if (!collision(shapeX + 1, shapeY, currentShape)) {
                shapeX++;
            }
            break;
        case 'ArrowDown':
            while (!collision(shapeX, shapeY + 1, currentShape)) {
                shapeY++;
            }
            break;
        case 'ArrowUp':
            rotateShape();
            break;
    }
});

function rotateShape() {
    const rotatedShape = [];
    for (let i = 0; i < currentShape[0].length; i++) {
        const newRow = currentShape.map(row => row[i]).reverse();
        rotatedShape.push(newRow);
    }
    if (!collision(shapeX, shapeY, rotatedShape)) {
        currentShape = rotatedShape;
    }
}

let board = Array(rows).fill().map(() => Array(columns).fill(0));

spawnShape();

setInterval(() => {
    if (!gameOver) {
        moveShape();
        draw();
    } else {
        ctx.fillStyle = '#E90000';
        ctx.font = '37px Arial';
        ctx.fillText('Game Over', canvas.width / 2 - 80, canvas.height / 2);
    }
}, 500);
