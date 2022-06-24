/**
 * @param {number} [min = 0] lowest number to be returned
 * @param {number} [max = 10] highest number to be returned
 * @param {object} [options = {round: false, place: null}] if we want to round number and to what place
 * @returns {number} number generated between min and max
 * @desc Generates a number between min and max. Is inclusive of min and max.
 */

function generateRandomNumber(min = 0, max = 10, options = { round: false, place: null }) {
  if (min > max) throw new Error('min cannot be greater than max');

  let randomNum = Math.random() * (max - min) + min;
  const { round, place } = options;

  if (round && typeof place === 'number') {
    if (options.place > 20) throw new Error('Place must be between 0 & 20');
    randomNum = +randomNum.toFixed(options.place);
  }
  return randomNum;
}

function getRandomCoords(min, max) {
  const options = { round: true, place: 0 };
  const row = generateRandomNumber(min, max, options);
  const col = generateRandomNumber(min, max, options);

  return { row, col };
}

function removeAllChildren(parent) {
  // https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

// moved
function createStartButton() {
  const button = document.createElement('button');
  button.textContent = 'Start Game!';
  button.classList.add('start-button');
  return button;
}

// moved
function createRotateButton() {
  const button = document.createElement('button');
  button.textContent = 'Rotate';
  button.id = 'rotate-user-ships';
  button.classList.add('user-ships__rotate');

  return button;
}

//moved
function createRandomPlaceButton() {
  const button = document.createElement('button');
  button.textContent = 'Random';
  button.id = 'randomize-user-ships';
  button.classList.add('user-ships__randomize');
  return button;
}

//moved
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

exports.generateRandomNumber = generateRandomNumber;
exports.createStartButton = createStartButton;
exports.createUserShipsContainer = createUserShipsContainer;
exports.getRandomCoords = getRandomCoords;
exports.removeAllChildren = removeAllChildren;
