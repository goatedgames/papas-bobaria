import Phaser from 'phaser';

import { WIDTH, HEIGHT} from '../constants';

class ServeScene extends Phaser.Scene {
  constructor() {
      super({ key: 'ServeScene' });
  }

  preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('star', 'assets/star.png');
  }

  create() {
    this.cameras.main.setBackgroundColor('#2889d4');
    this.add.image(WIDTH / 2, HEIGHT / 2, 'sky');

    this.add.text(50, 50, 'Serving Station');

    this.add.text(500, 550, 'Order Station')
      .setInteractive()
      .on('pointerdown', () => {
        if (this.scene.isActive('OrderScene')) {
          this.scene.bringToTop('OrderScene');
        } else {
          this.scene.launch('OrderScene');
        }
      });
    
    this.add.text(300, 550, 'Brewing Station')
      .setInteractive()
      .on('pointerdown', () => {
        if (this.scene.isActive('BrewScene')) {
          this.scene.bringToTop('BrewScene');
        } else {
          this.scene.launch('BrewScene');
        }
      });
    
    this.add.text(100, 550, 'Topping Station')
      .setInteractive()
      .on('pointerdown', () => {
        if (this.scene.isActive('ToppingScene')) {
          this.scene.bringToTop('ToppingScene');
        } else {
          this.scene.launch('ToppingScene');
        }
      });

    const star = this.physics.add.sprite(WIDTH / 2, HEIGHT / 2, 'star');
    star.setVelocityX(20);
  }

  update() {
  }
}

export default ServeScene;
