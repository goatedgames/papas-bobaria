import Phaser from 'phaser';

import { WIDTH, HEIGHT} from '../constants';

class ServeScene extends Phaser.Scene {
  constructor() {
      super({ key: 'ServeScene' });
  }

  preload() {
  }

  create() {
    this.cameras.main.setBackgroundColor('#2889d4');
    this.add.image(WIDTH / 2, HEIGHT / 2, 'sky');

    const star = this.physics.add.sprite(WIDTH / 2, HEIGHT / 2, 'star');
    star.setVelocityX(20);
  }

  update() {
  }
}

export default ServeScene;
