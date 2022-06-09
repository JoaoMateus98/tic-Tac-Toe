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
    const playerName = name;
    return {
        name: playerName
    }
}