const log = (...args) => console.log(...args);
let playerOne;
let playerTwo;

const DomGrabber = (() => {
    const startGameContainer = document.querySelector('.start-game-container');
    const gameContainer = document.querySelector('.game-container');
    const startButton = document.querySelector('.start-button');
    const form = document.querySelector('form');

    return {
        startButton,
        form,
        startGameContainer,
        gameContainer
    }
})();

const GameBoard = (() => {
    DomGrabber.startButton.addEventListener('click', () => {
        let formData = new FormData(DomGrabber.form);
        playerOne = Player(formData.get('player1'));
        playerTwo = Player(formData.get('player2'));
        DomGrabber.startGameContainer.classList.add('hidden');
        DomGrabber.gameContainer.classList.remove('hidden');
    });
})();

const DisplayController = (() => {
    
})();

const Player = (name) => {
    let playerName = name;
    return {
        name: playerName
    }
}