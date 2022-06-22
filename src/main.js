const { Ship, createShips } = require('./js/Ship');
const { Board } = require('./js/Board');
const userBoardEl = document.querySelector('#user');
const computerBoardEl = document.querySelector('#computer');
const userShipsEl = document.querySelector('#user-ships');
const userBoard = new Board(3, createShips(), userBoardEl);
// const computerBoard = new Board(9, createShips(), computerBoardEl);
const rotateShipsButton = document.querySelector('#rotate-user-ships');

function createStartButton() {
  const button = document.createElement('button');
  button.textContent = 'Start Game!';
  button.classList.add('start-button');
  return button;
}

userBoard.ships.forEach(ship => {
  userShipsEl.append(ship.htmlEl);
});
userBoard.randomlyAddShips();
console.log(userBoard);

window.addEventListener('shipsPlaced', () => {
  rotateShipsButton.remove();
  userShipsEl.classList.add('user-start');
  userShipsEl.append(createStartButton());
});


rotateShipsButton.addEventListener('click', () => {
  userBoard.ships.forEach(ship => {
    if (!ship.htmlEl.placed) {
      ship.rotate();
    }
  });
});
