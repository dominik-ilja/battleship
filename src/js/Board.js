const { Cell } = require('./Cell');
const { generateRandomNumber } = require('./helpers');


class Board {
  constructor(size, ships, root) {
    this._size = size;
    this._ships = ships;
    this._root = root;
    this._grid = [];
    this.init();
  }

  addShip(ship, row, rowSpan, col, colSpan, showShip = true) {
    // check row, rowSpan, col, colSpan if they're numbers
    const rowEnd = row + rowSpan;
    const colEnd = col + colSpan;
    let firstPass = true;

    // check to make sure we won't exceed the grid's dimensions
    if (rowEnd > this._size || colEnd > this._size) {
      return false;
    }
    /*
       make sure that only rowSpan or colSpan have a value of one
       ships cannot span more than 1 in multiple directions
    */
    if (rowSpan > 1 && colSpan > 1) {
      return false;
    }
    // make sure that we're only replacing empty cells
    else {
      const cellsEmpty = this.areCellsEmpty(row, rowSpan, col, colSpan);

      if (!cellsEmpty) {
        return false;
      }
    }

    /* 
      Ships span multiple columns or rows so we only need to replace
      the html at the first cell. Every other cell is going to be replaced
      within the grid array. Therefore we can just remove the previous cell's
      HTML.
    */
    this._loopCellRange(row, rowSpan, col, colSpan,
      (cell, currRow, currCol) => {
        if (showShip) {

          if (firstPass) {
            this.replaceCellWithShip(ship, currRow, currCol, true);
            firstPass = false;
          } else {
            this._removeCellHTML(currRow, currCol);
            this.replaceCellWithShip(ship, currRow, currCol);
          }
        }
        else {
          this.replaceCellWithShip(ship, currRow, currCol);
        }
      });

    this._shipWasPlaced(ship);

    return true;

  };
  areCellsEmpty(row, rowSpan, col, colSpan) {
    // check that each argument is a number
    [...arguments].forEach((arg, index) => {
      if (typeof arg !== 'number') {
        throw new Error(`arg: ${index} : ${arg} is a ${typeof arg}. Argument must be a number.`);
      }
    });

    // check that rowSpan & colSpan are at least one
    if (rowSpan < 1 || colSpan < 1) {
      throw new Error('rowSpan and colSpan must be at least one.');
    }

    let cellsAreEmpty = true;

    const rowEnd = row + rowSpan;
    const colEnd = col + colSpan;

    this._loopCellRange(row, rowSpan, col, colSpan,
      (cell, row, col) => {
        if (cell.state !== 'empty') {
          cellsAreEmpty = false;
        }
      });

    return cellsAreEmpty;

  }
  getCell(row, col) {
    return this._grid[row][col];
  }
  init() {
    if (this._grid.length !== 0) this._grid = [];

    for (let rowIndex = 0; rowIndex < this._size; rowIndex++) {
      const row = [];

      for (let colIndex = 0; colIndex < this._size; colIndex++) {
        const cell = new Cell(rowIndex, colIndex);
        cell.html.addEventListener('dragover', this._dragover);
        cell.html.addEventListener('drop', this._drop);
        row.push(cell);
        this._root.append(cell.html);
      }
      this._grid.push(row);
    }
  }
  randomlyAddShips = (showShips = true) => {
    // we go through each ship 
    this.ships.forEach(ship => {
      /* 
         1. we start counting at 0 so remove 1 to prevent accessing undefined array indexes
         2. coinToss is simulating a coin toss to decide if we should rotate the ship or not
         3. Use the width and length of the ship for the rowSpan and colSpan
      */
      let isPlaced = ship.placed;
      if (isPlaced) return;

      const max = this._size - 1; // 1.
      const coinToss = generateRandomNumber(0, 1, { round: true, place: 0 }); // 2.

      if (coinToss === 0) ship.rotate(); // 2.

      const rowSpan = ship.width;  // 3.
      const colSpan = ship.length; // 3.


      // skips any ship that has already been placed
      while (!isPlaced) {
        const row = generateRandomNumber(0, (max - rowSpan), { round: true, place: 0 });
        const col = generateRandomNumber(0, (max - colSpan), { round: true, place: 0 });
        isPlaced = this.addShip(ship, row, rowSpan, col, colSpan, showShips);
      }

      this._shipWasPlaced(ship);
    });


  };
  replaceCellWithShip(ship, row, col, replaceHTML = false) {
    const colSpan = ship.length,
      rowSpan = ship.width,
      { dataset } = ship.html;

    dataset.row = row;
    dataset.col = col;
    ship.addCoords(row, col);

    const ref = this._grid[row][col];
    this._grid[row][col] = ship;

    if (replaceHTML) {
      ref.html.replaceWith(ship.html);
    }

  }
  updateCell(row, col, userOptions) {
    const cell = this._grid[row][col];
    cell.updateCell(userOptions);
  }

  _allShipsPlaced() {
    return this.ships.every(ship => {
      return ship.placed === true;
    });
  };
  _dragover(e) {
    e.preventDefault();
  }
  _drop = (e) => {
    // check to see if the ship belongs to the board
    const shipEl = document.querySelector('.dragging');
    const ship = this.ships.find(ship => ship.html === shipEl);
    const { row, col } = e.target.dataset;

    if (ship) {
      this.addShip(ship, Number(row), ship.width, Number(col), ship.length);
    }
  };
  _loopCellRange(row, rowSpan, col, colSpan, cb) {
    const rowEnd = row + rowSpan, colEnd = col + colSpan;

    for (let currRow = row; currRow < rowEnd; currRow++) {
      for (let currCol = col; currCol < colEnd; currCol++) {
        cb(this._grid[currRow][currCol], currRow, currCol);
      }
    }
  }
  _removeCellHTML(row, col) {
    this._grid[row][col].html.remove();
  };
  _shipWasPlaced(ship) {
    ship.placed = true;
    ship.html.setAttribute('draggable', false);

    if (this._allShipsPlaced()) {
      ship.html.dispatchEvent(new CustomEvent('shipsPlaced', { bubbles: true }));
    }
  }

  get ships() {
    return this._ships;
  }
  get root() {
    return this._root;
  }
}

exports.Board = Board;
