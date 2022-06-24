const { Ship, createShips } = require('./Ship');
const { Cell } = require('./Cell');
const {
  createBoardRoots,
  createRotateButton,
  createScoreEls,
  createStartButton,
  createUserShipsContainer,
  createPlayAgainButton,
} = require('./components');

const { getRandomCoords } = require('./helpers');
const { Board } = require('./Board');

class Game {
  constructor(gameRoot) {
    this._gameRoot = gameRoot;

    this._userRoot = null;
    this._userBoard = null;
    this._userShipsContainer = null;
    this._userScoreEl = null;
    this._userScore = 0;

    this._computerRoot = null;
    this._computerBoard = null;
    this._computerScoreEl = null;
    this._computerScore = 0;

    this._rotateShipsButton = null;
    this._randomizeShipsButton = null;
    this._startButton = null;

    this._init();
  }

  _init() {
    const els = ['user', 'computer'];

    // Create user & computer score elements and update properties
    const scoreEls = createScoreEls(els);
    const [userScoreEl, compScoreEl] = scoreEls;
    this._userScoreEl = userScoreEl;
    this._computerScoreEl = compScoreEl;
    this._userScoreEl.textContent = this._userScore;
    this._computerScoreEl.textContent = this._computerScore;

    // Create user & computer roots and update properties
    const boardRoots = createBoardRoots(els);
    const [userRoot, compRoot] = boardRoots;
    this._userRoot = userRoot;
    this._computerRoot = compRoot;

    // Create the user & computer boards and update properties
    this._userBoard = new Board(9, createShips(), this._userRoot);
    this._computerBoard = new Board(9, createShips(), this._computerRoot);

    // Create container for user's ships
    this._userShipsContainer = createUserShipsContainer();

    /* 
       Append the elements to the game root
       !NOTE : THE ORDER THAT THESE ARE APPENDED MATTERS
    */
    this._gameRoot.append(...scoreEls);
    this._gameRoot.append(...boardRoots);
    this._gameRoot.append(this._userShipsContainer);
    this._appendUserShips();

    /* 
       Get a handle on user buttons
       The buttons are created when the userShipsContainer is created
    */
    this._rotateShipsButton = document.querySelector('#rotate-user-ships');
    this._randomizeShipsButton = document.querySelector('#randomize-user-ships');

    // Add first set of event listeners
    this._rotateShipsButton.addEventListener('click', this._rotateUserShips);
    this._randomizeShipsButton.addEventListener('click', this._userBoard.randomlyAddShips);
    window.addEventListener('shipsPlaced', this._beginGame);
  }
  _reset() {
    this._userScoreEl.remove();
    this._computerScoreEl.remove();
    this._userRoot.remove();
    this._computerRoot.remove();
    this._init();
  }
  _allShipsSunk = (board) => {
    return board.ships.every(ship => ship.isSunk());
  };
  _appendUserShips() {
    this._userBoard.ships.forEach(ship => {
      this._userShipsContainer.append(ship.html);
    });
  }
  _beginGame = () => {
    console.log('All ships have been placed');
    this._removeUserButtons();
    this._userShipsContainer.classList.add('user-start');

    // create start button and listen for click to start game
    this._startButton = createStartButton();
    this._startButton.addEventListener('click', () => {
      console.log('player started game');
      this._userShipsContainer.remove();
      this.playGame();
    }, { once: true });

    /* 
       1. removing the event prevents an additional start button from being created
       once the computer places all of its ships.
       2. have the computer place its ships
       3. add the start button to the user's ship container
    */

    window.removeEventListener('shipsPlaced', this._beginGame); // 1
    this._computerBoard.randomlyAddShips(false);                     // 2
    this._userShipsContainer.append(this._startButton);         // 3
  };
  _computerTurn() {
    let correctChoice = false;

    // check if the cell is a cell or ship
    while (!correctChoice) {
      // get random cell
      const { row, col } = getRandomCoords(0, 8);
      const cell = this._userBoard.getCell(row, col);

      if (cell instanceof Cell) {
        if (cell.state === 'empty') {
          cell.updateCell({ css: 'miss', state: 'miss' });
          correctChoice = true;
        }
      }
      else if (cell instanceof Ship) {
        const ship = cell;
        const index = ship.coordIndex(row, col);
        const isDamaged = ship.damageIndex(index);

        if (!isDamaged && isDamaged !== null) {
          ship.damageShip(index);
          correctChoice = true;
        }
      }
    }
  }
  _checkUserChoice(e) {
    const cellInfo = this._getComputerCellInfoOnClick(e);
    const { cell, hitbox, row, col, htmlEl } = cellInfo;

    let isValidClick = false;

    // invalid click
    if (cell === null) {
      return isValidClick;
    }

    // item isn't a ship && the cell hasn't been selected before
    if (hitbox === null && cell.state === 'empty') {
      cell.updateCell({ css: 'miss', state: 'miss' });
      isValidClick = true;
    }
    // is a ship
    else if (cell instanceof Ship && hitbox !== null) {
      const ship = cell;

      if (ship.damageIndex(hitbox)) {
        // ship has taken damage in this spot before
        isValidClick = false;
      }
      else {
        // update the damage at the hitbox
        ship.damageShip(hitbox);
        isValidClick = true;
      }
    }
    //! because of the way I set this up we don't have a reference
    //! to the cell anymore which results in us having to update
    //! the css here
    //! would be good to deal with this at some point
    else if (cell instanceof Ship) {
      const ship = cell;
      const index = ship.coordIndex(row, col);
      const isDamaged = ship.damageIndex(index);

      if (!isDamaged && isDamaged !== null) {
        ship.damageShip(index);
        htmlEl.classList.add('hit');
        ship.addHtmlEl(htmlEl);
        ship.isSunk();
        isValidClick = true;
      }
    }

    return isValidClick;
  }
  _determineGameResult() {
    const { _userBoard: user, _computerBoard: comp } = this;

    if (this._allShipsSunk(comp)) {
      // USER WON
      this._userScore += 1;
      this._userScoreEl.textContent = this._userScore;
    }
    else if (this._allShipsSunk(user)) {
      // computer won
      this._computerScore += 1;
      this._computerScoreEl.textContent = this._computerScore;
    }
    else {
      throw new Error('Why are we here?');
    }
  };
  _generateStartOption() {
    this._removeUserButtons();
    this._userShipsContainer.classList.add('user-start');
    this._startButton = createStartButton();

    this._startButton.addEventListener('click', () => {
      this._userShipsContainer.remove();
      this._startButton.remove();
      this.playGame();
    });

  }
  _getComputerCellInfoOnClick(e) {
    let item = null, hitbox = null, cell = null, row = null, col = null;

    // determine if click is on ship or cell

    // ship hit box
    if (e.target.dataset.hitbox) {
      // ship__hitbox --> ship__hitboxes --> ship
      item = e.target.parentElement.parentElement;
      hitbox = e.target.dataset.hitbox;
    }
    // grid cell
    else if (e.target.dataset.row && e.target.dataset.col) {
      item = e.target;
    }

    if (item !== null) {
      row = Number(item.dataset.row);
      col = Number(item.dataset.col);
      cell = this._computerBoard.getCell(row, col);
    }

    return { cell, hitbox, row, col, htmlEl: item };
  }
  _removeUserButtons = () => {
    this._randomizeShipsButton.remove();
    this._randomizeShipsButton = null;
    this._rotateShipsButton.remove();
    this._rotateShipsButton = null;
  };
  _rotateUserShips = () => {
    this._userBoard.ships.forEach(ship => {
      if (!ship.placed) {
        ship.rotate();
      }
    });
  };
  _playAgain() {
    const button = createPlayAgainButton();
    button.addEventListener('click', () => {
      this._reset();
      button.remove();
    }, { once: true });

    this._gameRoot.append(button);
  }
  async _userTurn() {
    const userAction = resolve => {
      const userClick = async (e) => {
        this._computerBoard.root.removeEventListener('click', userClick);
        const isValidClick = this._checkUserChoice(e);

        resolve(isValidClick);

      };
      this._computerBoard.root.addEventListener('click', userClick, { once: true });
    };


    let isCorrectClick = await new Promise(userAction);
    while (!isCorrectClick) {
      isCorrectClick = await new Promise(userAction);
    }
  }
  async playGame() {
    const { _userBoard: user, _computerBoard: comp } = this;

    while (!this._allShipsSunk(user) && !this._allShipsSunk(comp)) {
      await this._userTurn();
      this._computerTurn();
    }
    this._determineGameResult();
    this._playAgain();
  }
}

exports.Game = Game;
