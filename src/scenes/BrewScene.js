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
    this.add.text(50, 50, 'Brewing Station');
    // MARK: Standard Navigation Buttons
    this.add.text(500, 550, 'Order Station')
      .setInteractive()
      .on('pointerdown', () => {
        if (this.scene.isActive('OrderScene')) {
          this.scene.bringToTop('OrderScene');
        } else {
          this.scene.launch('OrderScene');
        }
      });
    
    this.add.text(300, 550, 'Topping Station')
      .setInteractive()
      .on('pointerdown', () => {
        if (this.scene.isActive('ToppingScene')) {
          this.scene.bringToTop('ToppingScene');
        } else {
          this.scene.launch('ToppingScene');
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
    this.cameras.main.setBackgroundColor('#2889d4');

    const star = this.physics.add.sprite(WIDTH / 2, HEIGHT / 2, 'star');
    star.setVelocityX(20);
  }

  update() {
  }
}

export default BrewScene;