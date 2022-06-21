class Cell {
  constructor(row, col) {
    this._row = row;
    this._col = col;
    this._states = ['empty', 'ship', 'hit', 'miss', 'sunk'];
    this._state = null;
    this._html = null;
    this.init();
  }



  init() {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.row = this._row;
    cell.dataset.col = this._col;
    cell.dataset.state = this._states[0]; // state of empty
    this._state = this._states[0];
    this._html = cell;
  }

  updateCell(userOptions) {
    if (typeof userOptions.css !== 'string') {
      throw new Error('css option must be a string');
    }
    if (!this._states.includes(userOptions.state)) {
      throw new Error('state option must be a valid state');
    }

    const options = {
      css: null,
      state: null,
      // row: null,
      // col: null,
      ...userOptions
    };

    const { css, state } = options;

    if (this._state === 'empty') {
      if (css !== null) {
        this._html.classList.add(css);
        this._updateState(state);
      }
    }
  }

  _updateState(state) {
    this._html.dataset.state = state;
    this.state = state;
  }

  get html() {
    return this._html;
  }
  get state() {
    return this._state;
  }
  set state(cellState) {
    return this._state = cellState;
  }
}

exports.Cell = Cell;
