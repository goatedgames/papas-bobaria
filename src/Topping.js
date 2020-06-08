export default class Topping {
  constructor(id, tex, scale) {
    this._id = id;
    this._tex = tex;
    this._x = 0;
    this._y = 0;
    this._rot = 0;
    this._bound = null;
    this._scale = scale;
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

  get tex() {
    return this._tex;
  }

  set x(x) {
    this._x = x;
  }

  get x() {
    return this._x;
  }

  set y(y) {
    this._y = y;
  }

  get y() {
    return this._y;
  }

  set rot(rot) {
    this._rot = rot;
  }

  get rot() {
    return this._rot;
  }

  set bound(bound) {
    this._bound = bound;
  }

  get bound() {
    return this._bound;
  }

  get scale() {
    return this._scale;
  }
}
