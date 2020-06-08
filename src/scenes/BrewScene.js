import Phaser from 'phaser';

import { WIDTH, HEIGHT} from '../constants';

class BrewScene extends Phaser.Scene {
  constructor() {
      super({ key: 'BrewScene' });
  }

  preload() {
  }

  create() {
    this.cameras.main.setBackgroundColor('#2889d4');

    this.add.sprite(100, 300, 'cup-0')
      .setScale(0.5);
    this.add.sprite(150, 300, 'cup-1')
      .setScale(0.5);
    this.add.sprite(200, 300, 'cup-2')
      .setScale(0.5);
    this.add.sprite(250, 300, 'cup-3')
      .setScale(0.5);
    this.add.sprite(300, 300, 'cup-4')
      .setScale(0.5);
    this.add.sprite(400, 500, 'dispenser')
      .setScale(0.5);
    this.add.sprite(700, 300, 'take-order')
      .setScale(0.5);
  }

  update() {
  }
}

export default BrewScene;