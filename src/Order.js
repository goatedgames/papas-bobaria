export class Order {
  constructor(num, time) {
    this._tea = 100;
    this._milk = 25;
    this._syrup = 25;
    this._toppings = [];
    this._num = num;
    this._time = time;
  }

  get num() {
    return this._num;
  }

  set tea(tea) {
    this._tea = tea;
  }

  get tea() {
    return this._tea;
  }

  set milk(milk) {
    this._milk = milk;
  }

  get milk() {
    return this._milk;
  }

  set syrup(syrup) {
    this._syrup = syrup;
  }

  get syrup() {
    return this._syrup;
  }

  addTopping(top) {
    this._toppings.push(top);
  }

  get toppings() {
    return this._toppings;
  }

  get time() {
    return this._time;
  }
}