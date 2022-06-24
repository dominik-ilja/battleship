function createBoardRoots(els) {
  return els.map(el => {
    const board = document.createElement('div');
    board.id = `${el}`;
    board.classList.add('board');

    return board;
  });
}
function createPlayAgainButton() {
  const button = document.createElement('button');
  button.id = 'play-again';
  button.classList.add('play-again');
  button.textContent = 'Play Again?';

  return button;
}
function createScoreEls(els) {
  return els.map(el => {
    const score = document.createElement('h2');
    score.id = `${el}-score`;
    score.classList.add('score');

    return score;
  });
}
function createStartButton() {
  const button = document.createElement('button');
  button.textContent = 'Start Game!';
  button.classList.add('start-button');

  return button;
}
function createRotateButton() {
  const button = document.createElement('button');
  button.textContent = 'Rotate';
  button.id = 'rotate-user-ships';
  button.classList.add('user-ships__rotate');

  return button;
}
function createRandomPlaceButton() {
  const button = document.createElement('button');
  button.textContent = 'Random';
  button.id = 'randomize-user-ships';
  button.classList.add('user-ships__randomize');

  return button;
}
function createUserShipsContainer() {
  const container = document.createElement('div');
  const buttons = document.createElement('div');
  buttons.classList.add('user-ships__buttons');
  buttons.append(createRotateButton(), createRandomPlaceButton());
  container.id = 'user-ships';
  container.classList.add('user-ships');
  container.append(buttons);

  return container;
}



exports.createBoardRoots = createBoardRoots;
exports.createPlayAgainButton = createPlayAgainButton;
exports.createRandomPlaceButton = createRandomPlaceButton;
exports.createRotateButton = createRotateButton;
exports.createScoreEls = createScoreEls;
exports.createStartButton = createStartButton;
exports.createUserShipsContainer = createUserShipsContainer;
