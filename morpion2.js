document.addEventListener("DOMContentLoaded", function () {
    const currentPlayerSymbol = 'X';
    const opponentPlayerSymbol = 'O';
    let currentPlayer = currentPlayerSymbol;
    let moves = 0;
    let gameEnded = false;

    function placeMarker(cell) {
        if (cell.innerHTML !== '' || gameEnded) return;

        cell.innerHTML = currentPlayer;
        moves++;

        if (checkWinner()) {
            document.getElementById('result').innerHTML = `Player ${currentPlayer} wins!`;
            gameEnded = true;
            return;
        }

        if (moves === 9) {
            document.getElementById('result').innerHTML = 'It\'s a draw!';
            gameEnded = true;
            return;
        }

        currentPlayer = currentPlayer === currentPlayerSymbol ? opponentPlayerSymbol : currentPlayerSymbol;
    }

    function checkWinner() {
        const cells = document.getElementsByClassName('cell');
        const winConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (let condition of winConditions) {
            if (cells[condition[0]].innerHTML !== '' &&
                cells[condition[0]].innerHTML === cells[condition[1]].innerHTML &&
                cells[condition[1]].innerHTML === cells[condition[2]].innerHTML) {
                return true;
            }
        }

        return false;
    }

    // Réinitialise le jeu
    function replay() {
        const cells = document.getElementsByClassName('cell');
        for (let cell of cells) {
            cell.innerHTML = '';
        }
        document.getElementById('result').innerHTML = '';
        currentPlayer = currentPlayerSymbol;
        moves = 0;
        gameEnded = false;
    }

    const cells = document.getElementsByClassName('cell');
    for (let cell of cells) {
        cell.addEventListener('click', function () {
            placeMarker(cell);
        });
    }

    document.getElementById('replay-button').addEventListener('click', function () {
        replay();
    });
});
