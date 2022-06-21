class Ship {
  constructor(name, size) {
    this._name = name;
    this._size = size;
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
    ship.dataset.rowspan = 1;
    ship.dataset.colspan = this._size;

    // add event listeners related to dragging
    ship.addEventListener('dragstart', (e) => {
      e.target.classList.add('dragging');
    });
    ship.addEventListener('dragend', (e) => {
      e.target.classList.remove('dragging');
    });


    for (let i = 0; i < this._size; i++) {
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
    let temp = this._htmlEl.dataset.rowspan;
    this._htmlEl.dataset.rowspan = this._htmlEl.dataset.colspan;
    this._htmlEl.dataset.colspan = temp;

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

exports.Ship = Ship;
