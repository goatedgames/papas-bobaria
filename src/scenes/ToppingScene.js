import Phaser from 'phaser';

import { WIDTH, HEIGHT} from '../constants';

class ToppingScene extends Phaser.Scene {
  constructor() {
      super({ key: 'ToppingScene' });
  }

  preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('star', 'assets/star.png');
  }

  create() {
    this.cameras.main.setBackgroundColor('#2889d4');
    this.add.image(WIDTH / 2, HEIGHT / 2, 'sky');

    this.add.text(50, 50, 'Topping Station');

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
    
    this.add.text(100, 550, 'Serving Station')
      .setInteractive()
      .on('pointerdown', () => {
        if (this.scene.isActive('ServeScene')) {
          this.scene.bringToTop('ServeScene');
        } else {
          this.scene.launch('ServeScene');
        }
      });

    const star = this.physics.add.sprite(WIDTH / 2, HEIGHT / 2, 'star');
    star.setVelocityX(20);
  }

  update() {
  }
}

export default ToppingScene;