export default class Topping {
  constructor(id, tex) {
    this._id = id;
    this._tex = tex;
  }

  get pObj() {
    return this._pObj;
  }

  set pObj(pObj) {
    this._pObj = pObj;
  }
  
  get id() {
    return this._id;
  }

  get tea() {
    return this._tea;
  }

  get milk() {
    return this._milk;
  }

  get syrup() {
    return this._syrup;
  }

  addTea(delta) {
    this._tea = Math.min(100, this._tea + delta);
  }

  addMilk(delta) {
    this._milk = Math.min(100, this._milk + delta);
  }

  addSyrup(delta) {
    this._syrup = Math.min(100, this._syrup + delta);
  }

  get tex() {
    return this._tex;
  }

  updateTexture() {
    // Weight the tea more than milk/syrup
    let per = 4.0 * (3 * this._tea + 2 * this._milk + this._syrup) / 600.0;
    per = Math.round(per);
    if (per > this._tex) {
      this._tex = Math.min(4, this._tex + 1);
      this._pObj.setTexture('cup-' + this._tex);
    }
  }
}
