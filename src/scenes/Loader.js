import Phaser from 'phaser';

import { WIDTH, HEIGHT} from '../constants';

// This is an invisible scene that loads the rest of the scenes in the correct order.
class Loader extends Phaser.Scene {
  constructor() {
      super({ key: 'Loader' });
  }

  preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('platform', 'assets/platform.png');
    this.load.image('dispenser', 'assets/dispenser.png');
    this.load.image('take-order', 'assets/take-order-button.png');
    this.load.image('cup-0', 'assets/cup-0.png');
    this.load.image('cup-1', 'assets/cup-1.png');
    this.load.image('cup-2', 'assets/cup-2.png');
    this.load.image('cup-3', 'assets/cup-3.png');
    this.load.image('cup-4', 'assets/cup-4.png');
    this.load.image('pearl', 'assets/pearl.png');
    this.load.image('spoon', 'assets/spoon.png');
    this.load.image('ice-cube', 'assets/ice-cube.png');
    this.load.image('ice-machine', 'assets/ice-machine.png');
    this.load.image('mango', 'assets/mango.png');
    this.load.image('lychee', 'assets/lychee.png');
  }

  create() {
    this.scene.launch('BrewScene');
    this.scene.launch('ToppingScene');
    this.scene.launch('ServeScene');
    this.scene.launch('OrderScene');
    this.scene.launch('Switcher');
    this.scene.launch('Tickets');
    this.scene.bringToTop('OrderScene');
    this.scene.bringToTop('Switcher');
    this.scene.bringToTop('Tickets');
    console.log("Loader done");
  }

  update() {
  }
}

export default Loader;

