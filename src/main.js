const { Ship } = require('./js/Ship');
const { Board } = require('./js/Board');
const userBoardEl = document.querySelector('#user');
const computerBoardEl = document.querySelector('#computer');
const userShipsEl = document.querySelector('#user-ships');
const userBoard = new Board(9, userBoardEl);
const computerBoard = new Board(9, computerBoardEl);
const rotateShipsButton = document.querySelector('#rotate-user-ships');

console.log(userBoard);

function createShips() {
  const ships = [
    { name: 'patrol', size: 2 },
    { name: 'destroyer', size: 3 },
    { name: 'submarine', size: 3 },
    { name: 'battle', size: 4 },
    { name: 'carrier', size: 5 }
  ];
  const result = [];

  for (let i = 0; i < ships.length; i++) {
    const { name, size } = ships[i];
    result.push(new Ship(name, size));
  }

  return result;
}
const ships = createShips();
ships.forEach(ship => {
  userShipsEl.append(ship.htmlEl);
});

rotateShipsButton.addEventListener('click', () => {
  ships.forEach(ship => {
    console.log(ship);
    if (!ship.htmlEl.placed) {
      ship.rotate();
    }
  });
});


