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

  _shipWasPlaced(shipEl) {
    ship.setAttribute('draggable', false);

    if (this._allShipsPlaced()) {

      // emit event to say the ships have been placed
      const event = new Event('shipsPlaced', { bubbles: true });
      ship.dispatchEvent(event);
    }
  }
  _dragover(e) {
    e.preventDefault();
  }
  _drop = (e) => {
    // check to see if the ship belongs to the board
    const ship = document.querySelector('.dragging');
    let shipGoesWithBoard = false;

    for (let i = 0; i < this.ships.length; i++) {
      const boardShip = this.ships[i].htmlEl;
      if (boardShip === ship) {
        shipGoesWithBoard = true;
        break;
      }
    }

    if (!shipGoesWithBoard) {
      return;
    }


    let { rowspan, colspan } = ship.dataset;
    let { row, col } = e.target.dataset;
    rowspan = Number(rowspan), colspan = Number(colspan), row = Number(row), col = Number(col);

    // addShip returns a boolean based on if the ship was added or not
    const cellsWereReplaced = this.addShip(ship, row, rowspan, col, colspan);

    // we use the above boolean to know if we're good to remove the draggable attribute
    if (cellsWereReplaced) {
      this._shipWasPlaced(shipEl);
    }

  };

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
  areCellsEmpty(row, rowSpan, col, colSpan) {
    // check that each argument is a number
    [...arguments].forEach(arg => {
      if (typeof arg !== 'number') {
        throw new Error(`${arg} is a ${typeof arg}. Argument must be a number.`);
      }
    });

    // check that rowSpan & colSpan are at least one
    if (rowSpan < 1 || colSpan < 1) {
      throw new Error('rowSpan and colSpan must be at least one.');
    }


    let cellsAreEmpty = true;

    const rowEnd = row + rowSpan;
    const colEnd = col + colSpan;

    for (let currRow = row; currRow < rowEnd; currRow++) {
      for (let currCol = col; currCol < colEnd; currCol++) {

        const cell = this._grid[currRow][currCol];

        if (cell.state !== 'empty') {
          cellsAreEmpty = false;
          break;
        }
      }
    }

    return cellsAreEmpty;

  }
  updateCell(row, col, userOptions) {
    const cell = this._grid[row][col];
    cell.updateCell(userOptions);
  }
  replaceCell(el, row, col, replaceHTML = false) {
    const { dataset } = el;
    let rowspan = Number(dataset.rowspan);
    let colspan = Number(dataset.colspan);
    console.log(`rowspan: ${rowspan} colspan: ${colspan}`);


    // if (dataset.row && dataset.col) {
    //   if (rowspan && colspan) {

    //     if (rowspan === 1) {
    //       dataset.row = row;
    //       dataset.col = `${dataset.col}/${col + colspan}`;
    //     }
    //     else if (colspan === 1) {
    //       dataset.col = col;
    //       dataset.row = `${dataset.row}/${row + rowspan}`;
    //     }
    //   }
    // }
    // else {
    //   dataset.row = row;
    //   dataset.col = col;
    // // }
    // dataset.row = row;
    // dataset.col = col;

    const ref = this._grid[row][col].html;
    this._grid[row][col] = el;
    // console.log(this._grid[row][col]);

    if (replaceHTML) {
      ref.replaceWith(el);
    }

  }
  addShip = (ship, row, rowSpan, col, colSpan) => {
    console.log(row, rowSpan, col, colSpan);
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
      console.log(cellsEmpty);

      if (!cellsEmpty) {
        return false;
      }
    }

    for (let currRow = row; currRow < rowEnd; currRow++) {
      for (let currCol = col; currCol < colEnd; currCol++) {

        /* 
           Ships span multiple columns or rows so we only need to replace
           the html at the first cell. Every other cell is going to be replaced
           within the grid array. Therefore we can just remove the previous cell's
           HTML.
        */
        if (firstPass) {
          this.replaceCell(ship, currRow, currCol, true);
          firstPass = false;
        } else {
          this._removeCellHTML(currRow, currCol);
          this.replaceCell(ship, currRow, currCol);
        }
      }
    }

    ship.placed = true;
    return true;

  };
  randomlyAddShips() {
    this.ships.forEach(ship => {
      const max = this._size - 1;
      const flip = generateRandomNumber(0, 1, { round: true, place: 0 });
      const rowSpan = ship.width;
      const colSpan = ship.length;

      if (flip === 0) {
        ship.rotate();
      }

      let isPlaced = false;
      let i = 0;

      while (!isPlaced) {
        const row = generateRandomNumber(0, (max - rowSpan), { round: true, place: 0 });
        const col = generateRandomNumber(0, (max - colSpan), { round: true, place: 0 });
        isPlaced = this.addShip(ship.htmlEl, row, rowSpan, col, colSpan);
        // console.log(isPlaced);;


        if (isPlaced) {
          break;
        }
        alert(isPlaced);
      }
    });

  }
  _removeCellHTML = (row, col) => {
    this._grid[row][col].html.remove();
  };
  _allShipsPlaced() {
    return this.ships.every(ship => {
      return ship.htmlEl.getAttribute('draggable') === 'false';
    });
  }

  get ships() {
    return this._ships;
  }
}

exports.Board = Board;
