class Ship {
  constructor(name, length) {
    this._damage = [];
    this._html = null;
    this._htmlEls = [];
    this._length = length;
    this._name = name;
    this._pegs = [];
    this._placed = false;
    this._rotated = false;
    this._sunk = false;
    this._width = 1;
    this._coords = [];

    this.init();
  }

  addHtmlEl(el) {
    this._htmlEls.push(el);
  }
  addCoords(row, col) {
    this._coords.push([row, col]);
  }
  isCoordDamaged(row, col) {
    const index = this.coordIndex(row, col);

    if (index !== null) {
      return this.damageIndex(index);
    } else {
      return null;
    }
  }
  coordIndex(row, col) {
    // find coor position
    // index and damages arrays match in their position
    const search = JSON.stringify([row, col]);
    let index = null;

    this._coords.forEach((coord, i) => {
      const stringCoord = JSON.stringify(coord);
      if (stringCoord === search) index = i;
    });

    return index;
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

    const hitboxes = document.createElement('div');
    hitboxes.classList.add('ship__hitboxes');

    for (let i = 0; i < this._length; i++) {
      // creating hitbox
      const hitbox = document.createElement('div');
      hitbox.classList.add('ship__hitbox');
      hitbox.dataset.hitbox = i;
      this._damage.push(false);

      // create peg
      const peg = document.createElement('div');
      peg.classList.add('ship__peg');
      this._pegs.push(peg);

      // append to appropriate parents
      hitboxes.appendChild(hitbox);
      ship.appendChild(peg);
    }
    ship.appendChild(hitboxes);

    this._html = ship;
  }
  rotate() {
    if (this._html === null) return;

    // switch rotated to opposite state
    this._rotated = !this._rotated;

    // toggle the html class 
    this._html.classList.toggle('rotate');

    // switch the values of the html element's rowspan and colspan data attributes
    let temp = this._width;
    this._width = this._length;
    this._length = temp;
    this._html.dataset.rowspan = this._width;
    this._html.dataset.colspan = this._length;


  }
  damageShip(index) {
    this._damage[index] = true;

    // update css
    this._updatePeg(index);

    // check if the ship is sunk
    if (this.isSunk()) {
      this._sinkShip();
    }
  }
  damageIndex(index) {
    return this._damage[index];
  }
  isSunk() {
    const bool = this._damage.every(d => d === true);
    if (bool && this._htmlEls.length > 1) {
      this._htmlEls.forEach(el => {
        el.classList.remove('hit');
        el.classList.add('sunk');
      });
    }
    return bool;
  }
  _sinkShip() {
    this._sunk = true;
  }
  _updatePeg(index) {
    this._pegs[index].classList.add('ship__peg--hit');
  }
  get coords() {
    return this._coords;
  }
  get length() {
    return this._length;
  }
  get width() {
    return this._width;
  }
  get html() {
    return this._html;
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
