const sudokuContainer = document.getElementById('sudokuContainer');
let lives = 3; // Nombre de vies initiales

function createSudoku() {
    const sudoku = generateSudoku();
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.classList.add(`row-start-${i + 1}`, `col-start-${j + 1}`);
            const input = document.createElement('input');
            input.className = 'input';
            input.maxLength = 1;
            input.value = sudoku[i][j] !== 0 ? sudoku[i][j] : '';
            input.readOnly = sudoku[i][j] !== 0;
            cell.appendChild(input);
            sudokuContainer.appendChild(cell);
        }
    }

    // Affichage du nombre de vies restantes
    const livesDisplay = document.createElement('div');
    livesDisplay.textContent = `Vies restantes : ${lives}`;
    livesDisplay.className = 'lives-display';
    sudokuContainer.parentElement.insertBefore(livesDisplay, sudokuContainer);

    // Événement pour la saisie de nombres
    sudokuContainer.addEventListener('input', function(event) {
        const input = event.target;
        const row = parseInt(input.parentElement.classList[1].split('-')[2]) - 1;
        const col = parseInt(input.parentElement.classList[2].split('-')[2]) - 1;
        const value = parseInt(input.value);

        if (!isNaN(value)) {
            if (!isValidPlacement(sudoku, row, col, value)) {
                input.style.color = 'red';
                updateLives(-1); // Décrémente le nombre de vies en cas de saisie incorrecte
            } else {
                input.style.color = 'blue';
            }
        }
    });
}

function updateLives(change) {
    lives += change;
    const livesDisplay = document.querySelector('.lives-display');
    livesDisplay.textContent = `Vies restantes : ${lives}`;

    if (lives === 0) {
        // Game over
        alert('Game over! Vous avez épuisé toutes vos vies.');
    }
}


function generateSudoku() {
    const sudoku = [];
    for (let i = 0; i < 9; i++) {
        const row = [];
        for (let j = 0; j < 9; j++) {
            row.push(0);
        }
        sudoku.push(row);
    }
    fillDiagonals(sudoku);
    solveSudoku(sudoku);
    removeNumbers(sudoku, 40); 
    return sudoku;
}

function fillDiagonals(sudoku) {
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    shuffle(nums);
    for (let i = 0; i < 9; i += 3) {
        fillBox(sudoku, i, i, nums);
    }
}

function fillBox(sudoku, row, col, nums) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            sudoku[row + i][col + j] = nums[i * 3 + j];
        }
    }
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function solveSudoku(sudoku) {
    const emptyCell = findEmptyCell(sudoku);
    if (!emptyCell) {
        return true; 
    }
    const [row, col] = emptyCell;
    for (let num = 1; num <= 9; num++) {
        if (isValidPlacement(sudoku, row, col, num)) {
            sudoku[row][col] = num;
            if (solveSudoku(sudoku)) {
                return true;
            }
            sudoku[row][col] = 0; 
        }
    }
    return false; 
}

function isValidPlacement(sudoku, row, col, num) {
    return (
        isRowValid(sudoku, row, num) &&
        isColValid(sudoku, col, num) &&
        isBoxValid(sudoku, row - (row % 3), col - (col % 3), num)
    );
}

function isRowValid(sudoku, row, num) {
    return !sudoku[row].includes(num);
}

function isColValid(sudoku, col, num) {
    for (let i = 0; i < 9; i++) {
        if (sudoku[i][col] === num) {
            return false;
        }
    }
    return true;
}

function isBoxValid(sudoku, boxStartRow, boxStartCol, num) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (sudoku[boxStartRow + i][boxStartCol + j] === num) {
                return false;
            }
        }
    }
    return true;
}

function findEmptyCell(sudoku) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (sudoku[i][j] === 0) {
                return [i, j];
            }
        }
    }
    return null;
}

function removeNumbers(sudoku, count) {
    let cells = [];
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            cells.push([i, j]);
        }
    }
    shuffle(cells);
    for (let i = 0; i < count; i++) {
        const [row, col] = cells[i];
        sudoku[row][col] = 0;
    }
}

createSudoku();
