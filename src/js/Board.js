class Board {
  constructor(size, root) {
    this._size = size;
    this._grid = [];
    this._root = root;

    this.init();
  }

  _createCell(rowIndex, colIndex) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.row = rowIndex;
    cell.dataset.col = colIndex;
    cell.dataset.code = 'empty';
    cell.empty = true; // will probably be removed
    cell.addEventListener('dragover', this._dragover);
    cell.addEventListener('drop', this._drop);
    return cell;
  }
  _dragover(e) {
    e.preventDefault();
  }
  _drop = (e) => {
    const draggable = document.querySelector('.dragging');
    const { rowspan, colspan } = draggable.dataset;
    const { row, col } = e.target.dataset;

    const cellsWereReplaced = this.replaceCells(draggable, {
      row: Number(row),
      col: Number(col),
      rowSpan: Number(rowspan),
      colSpan: Number(colspan)
    });

    if (cellsWereReplaced) {
      draggable.setAttribute('draggable', false);
    }

  };
  init() {
    if (this._grid.length !== 0) this._grid = [];

    for (let rowIndex = 0; rowIndex < this._size; rowIndex++) {
      const row = [];

      for (let colIndex = 0; colIndex < this._size; colIndex++) {
        const cell = this._createCell(rowIndex, colIndex);
        row.push(cell);
        this._root.append(cell);
      }
      this._grid.push(row);
    }
  }

  // starts at 0
  areCellsEmpty(row, rowSpan, col, colSpan) {
    let bool = null;

    const rowEnd = row + rowSpan;
    const colEnd = col + colSpan;

    for (let currRow = row; currRow < rowEnd; currRow++) {
      for (let currCol = col; currCol < colEnd; currCol++) {

        const cell = this._grid[currRow][currCol];

        // console.log(this._grid[currRow][currCol].empty);
        // const cell = this._grid[currRow][currCol];
        // if (cell.empty) {
        //   console.log(result);
        //   result.emptyCells.push({
        //     cell,
        //     location: {
        //       row,
        //       col
        //     }
        //   });
        // } else {
        //   result.areAllCellsEmpty = false;
        // }

      }
    }

    // if (result.areAllCellsEmpty === null) {
    //   result.areAllCellsEmpty = true;
    // }

    return result;

  }
  updateCell(row, col, cssClass) {
    const cell = this._grid[row][col];
    // get cell
    if (cell.empty) {
      cell.classList.add(cssClass);
      cell.empty = false;
    }
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
