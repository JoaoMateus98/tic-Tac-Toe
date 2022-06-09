const log = (...args) => console.log(...args);
let playerOne;
let playerTwo;
let gameBoard = [['top-left', 'top-mid', 'top-right'],
                 ['mid-left', 'mid-mid', 'mid-right'],
                 ['low-left', 'low-mid', 'low-right']];
let currentPlayer = 'x';

const DomGrabber = (() => {
    const startGameContainer = document.querySelector('.start-game-container');
    const gameContainer = document.querySelector('.game-container');
    const startButton = document.querySelector('.start-button');
    const boardCells = document.querySelectorAll('.board-cell');
    const form = document.querySelector('form');

    return {
        startButton,
        form,
        startGameContainer,
        gameContainer,
        boardCells
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
                        log(gameBoard)
                        currentPlayer = (currentPlayer === 'x') ? '0' : 'x';
                    }
                });
            });
        });
    });
})();

const DisplayController = (() => {
    DomGrabber.startButton.addEventListener('click', () => { // start game
        let formData = new FormData(DomGrabber.form);
        playerOne = Player(formData.get('player1'));
        playerTwo = Player(formData.get('player2'));
        DomGrabber.startGameContainer.classList.add('hidden');
        DomGrabber.gameContainer.classList.remove('hidden');
        DomGrabber.form.reset();
    });
})();

const Player = (name) => {
    return {
        name
    }
}