const { Cell } = require('./Cell');

class Board {
  constructor(size, root) {
    this._size = size;
    this._grid = [];
    this._root = root;
    this.init();
  }

  _dragover(e) {
    e.preventDefault();
  }
  // _drop = (e) => {
  //   console.log(e.target);
  //   const draggable = document.querySelector('.dragging');
  //   const { rowspan, colspan } = draggable.dataset;
  //   const { row, col } = e.target.dataset;

  //   const cellsWereReplaced = this.replaceCells(draggable, {
  //     row: Number(row),
  //     col: Number(col),
  //     rowSpan: Number(rowspan),
  //     colSpan: Number(colspan)
  //   });

  //   if (cellsWereReplaced) {
  //     draggable.setAttribute('draggable', false);
  //   }

  // };
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
        console.log(cell);

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



  replaceCell(row, col, el, replaceHTML = false) {

    if (el.dataset.row && el.dataset.col) {
      el.dataset.row += `/${row}`;
    } else {
      el.dataset.row = row;
      el.dataset.col = col;
    }

    const ref = this._grid[row][col];
    el.placed = true;
    this._grid[row][col] = el;

    if (replaceHTML) ref.replaceWith(el);

  }
  replaceCells = (el, { row, rowSpan, col, colSpan }) => {
    const rowEnd = row + rowSpan;
    const colEnd = col + colSpan;
    let firstPass = true;
    let cellsEmpty = true;

    console.log('colEnd: ', colEnd);
    console.log(row, rowSpan, col, colSpan);

    if (rowEnd > this._size || colEnd > this._size) return false;
    if (rowSpan === 1 || colSpan === 1) {
      cellsEmpty = this.areCellsEmpty(row, rowSpan, col, colSpan).areAllCellsEmpty;
    }
    else {
      return false;
    }
    if (!cellsEmpty) return false;

    for (let currRow = row; currRow < rowEnd; currRow++) {
      for (let currCol = col; currCol < colEnd; currCol++) {

        if (firstPass) {
          this.replaceCell(currRow, currCol, el, true);
          firstPass = false;
        } else {
          // console.log('replaceCells');
          this.removeCellHTML(currRow, currCol);
          this.replaceCell(currRow, currCol, el);
        }
      }
    }

    return true;

  };
  removeCellHTML = (row, col) => {
    this._grid[row][col].remove();
  };

}

exports.Board = Board;
