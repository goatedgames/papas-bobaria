import Phaser from 'phaser';

const WIDTH = 800;
const HEIGHT = 600;

let star;

class BaseScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BaseScene' });
  }

  preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('star', 'assets/star.png');
  }

  create() {
    this.cameras.main.setBackgroundColor('#2889d4');
    this.add.image(WIDTH / 2, HEIGHT / 2, 'sky');

    star = this.physics.add.sprite(WIDTH / 2, HEIGHT / 2, 'star');
    star.setVelocityX(-10);
  }

  update() {
  }
}

export default BaseScene;