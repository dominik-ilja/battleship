class Ship {
  constructor(name, length) {
    this._name = name;
    this._length = length;
    this._width = 1;
    this._htmlEl = null;
    this._rotated = false;
    this._placed = false;

    this.init();
  }

  init() {
    // create elements for ship
    const ship = document.createElement('div');
    ship.classList.add('ship', `ship--${this._name}`);

    // adding additional attributes
    ship.setAttribute('draggable', true);
    ship.dataset.rowspan = this._width;
    ship.dataset.colspan = this._length;

    // add event listeners related to dragging
    ship.addEventListener('dragstart', (e) => {
      e.target.classList.add('dragging');
    });
    ship.addEventListener('dragend', (e) => {
      e.target.classList.remove('dragging');
    });


    for (let i = 0; i < this._length; i++) {
      const peg = document.createElement('div');
      peg.classList.add('ship__peg');

      ship.appendChild(peg);
    }

    this._htmlEl = ship;
  }
  rotate() {
    if (this._htmlEl === null) return;

    // switch rotated to opposite state
    this._rotated = !this._rotated;

    // toggle the html class 
    this._htmlEl.classList.toggle('rotate');

    // switch the values of the html element's rowspan and colspan data attributes
    // let temp = this._htmlEl.dataset.rowspan;
    // this._htmlEl.dataset.rowspan = this._htmlEl.dataset.colspan;
    // this._htmlEl.dataset.colspan = temp;

    let temp = this._width;
    this._width = this._length;
    this._length = temp;
    this._htmlEl.dataset.rowspan = this._width;
    this._htmlEl.dataset.colspan = this._length;


  }
  get length() {
    return this._length;
  }
  get width() {
    return this._width;
  }
  get htmlEl() {
    return this._htmlEl;
  }
  get placed() {
    return this._placed;
  }
  set placed(bool) {
    this._placed = bool;
  }
}

function createShips(boardEl) {
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
    result.push(new Ship(name, size, boardEl));
  }

  return result;
}

exports.Ship = Ship;
exports.createShips = createShips;
