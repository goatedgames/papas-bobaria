import Phaser from 'phaser';

import { WIDTH, HEIGHT} from '../constants';

class Loader extends Phaser.Scene {
  constructor() {
      super({ key: 'Loader' });
  }

  preload() {
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

