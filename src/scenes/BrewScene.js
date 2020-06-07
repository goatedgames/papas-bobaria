import Phaser from 'phaser';

import { WIDTH, HEIGHT} from '../constants';

class BrewScene extends Phaser.Scene {
  constructor() {
      super({ key: 'BrewScene' });
  }

  preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('star', 'assets/star.png');
  }

  create() {
    this.cameras.main.setBackgroundColor('#2889d4');

    const star = this.physics.add.sprite(WIDTH / 2, HEIGHT / 2, 'star');
    star.setVelocityX(20);
  }

  update() {
  }
}

export default BrewScene;