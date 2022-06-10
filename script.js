let playerOne;
let playerTwo;
let gameBoard = [['top-left', 'top-mid', 'top-right'],
                 ['mid-left', 'mid-mid', 'mid-right'],
                 ['low-left', 'low-mid', 'low-right']];
let currentPlayer = 'X';

const DomGrabber = (() => {
    const startGameContainer = document.querySelector('.start-game-container');
    const winnerMessage = document.querySelector('.winner-p');
    const winningPlayer = document.querySelector('.winning-player');
    const tie = document.querySelector('.tie');
    const gameContainer = document.querySelector('.game-container');
    const startButton = document.querySelector('.start-button');
    const boardCells = document.querySelectorAll('.board-cell');
    const form = document.querySelector('form');
    const endGameBlocker = document.querySelector('.end-game');
    const restartButton = document.querySelector('.restart-button');

    return {
        startButton,
        form,
        startGameContainer,
        gameContainer,
        boardCells,
        endGameBlocker,
        winnerMessage,
        winningPlayer,
        restartButton,
        tie
    }
})();

const GameBoard = (() => {
    DomGrabber.boardCells.forEach((cell) => { // adds Xs and Os to the gameboard array
        cell.addEventListener('click', () => {
            let currentRow = -1;
            let currentColumn = -1;
            gameBoard.forEach((row) => {
                currentRow++;
                currentColumn = -1;
                row.forEach((column) => {
                    currentColumn++;
                    if (cell.id === column) {
                        gameBoard[currentRow][currentColumn] = currentPlayer;
                        DisplayController.updateBoard(column);
                        if (checkWinner() === currentPlayer) {
                            if (currentPlayer === 'X') {
                                DomGrabber.winningPlayer.textContent = playerOne.getName;
                            } else {
                                DomGrabber.winningPlayer.textContent = playerTwo.getName;
                            }
                            DomGrabber.restartButton.classList.remove('hidden');
                            DomGrabber.winnerMessage.classList.remove('hidden');
                            DomGrabber.endGameBlocker.classList.remove('hidden');
                        } else {
                            currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
                        }
                    }
                });
            });
        });
    });
})();

const checkWinner = () => {
    if (gameBoard[0][0] === gameBoard[0][1] && gameBoard[0][1] === gameBoard[0][2] ||
        gameBoard[0][0] === gameBoard[1][0] && gameBoard[1][0] === gameBoard[2][0] ||
        gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2] ||
        gameBoard[2][2] === gameBoard[1][2] && gameBoard[1][2] === gameBoard[0][2] ||
        gameBoard[2][2] === gameBoard[2][0] && gameBoard[2][0] === gameBoard[2][1]){
        return currentPlayer;
    }
    if (gameBoard[1][1] === gameBoard[0][1] && gameBoard[1][1] === gameBoard[2][1] ||
        gameBoard[1][1] === gameBoard[1][0] && gameBoard[1][1] === gameBoard[1][2] ||
        gameBoard[1][1] === gameBoard[0][2] && gameBoard[1][1] === gameBoard[0][2]) {
        return currentPlayer;
    }

    function checkTie () {
        let counter = 0;
        gameBoard.forEach((row) => {
            row.forEach((column) => {
                if (column === 'X' || column === 'O' || column === '') {
                    counter ++;
                }
            })
        });
        if (counter === 9) {
            DomGrabber.tie.classList.remove('hidden');
            DomGrabber.restartButton.classList.remove('hidden');
            DomGrabber.endGameBlocker.classList.remove('hidden');
        }
    }

    checkTie();
    
    return ;
};

const DisplayController = (() => {
    const updateBoard = (currentCell) => {
        DomGrabber.boardCells.forEach((cell) => {
            if (cell.id === currentCell) {
                cell.innerHTML = currentPlayer;
            }
        });
    }

    DomGrabber.startButton.addEventListener('click', () => { // start game
        let formData = new FormData(DomGrabber.form);
        playerOne = Player(formData.get('player1'));
        playerTwo = Player(formData.get('player2'));
        DomGrabber.startGameContainer.classList.add('hidden');
        DomGrabber.endGameBlocker.classList.add('hidden');
        DomGrabber.winnerMessage.classList.add('hidden');
        DomGrabber.restartButton.classList.add('hidden');
        DomGrabber.gameContainer.classList.remove('hidden');
        DomGrabber.form.reset();
    });

    DomGrabber.restartButton.addEventListener('click', () => { // restart game
        DomGrabber.startGameContainer.classList.remove('hidden');
        DomGrabber.endGameBlocker.classList.add('hidden');
        DomGrabber.tie.classList.add('hidden');
        DomGrabber.winnerMessage.classList.remove('hidden');
        DomGrabber.restartButton.classList.remove('hidden');
        DomGrabber.gameContainer.classList.add('hidden');

        resetBoard();
    });

    function resetBoard() {
        gameBoard = [['top-left', 'top-mid', 'top-right'],
                     ['mid-left', 'mid-mid', 'mid-right'],
                     ['low-left', 'low-mid', 'low-right']];
        DomGrabber.boardCells.forEach((cell) => {
            cell.innerHTML = '';
       });
    }

    return {
        updateBoard
    }
})();

const Player = (name) => {
    const getName = name
    return {
        getName
    }
}