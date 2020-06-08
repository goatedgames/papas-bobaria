import Phaser from 'phaser';

import { WIDTH, HEIGHT} from '../constants';

class ReviewScene extends Phaser.Scene {
  order;

  constructor() {
      super({ key: 'ReviewScene' });
  }

  preload() {
  }

  create() {
    this.cameras.main.setBackgroundColor('#2889d4');
    this.add.image(WIDTH / 2, HEIGHT / 2, 'sky');
    console.log('Creating ReviewScene');

    const star = this.physics.add.sprite(WIDTH / 2, HEIGHT / 2, 'star');
    star.setVelocityY(50);

    let ret = this.add.text(150, 550, 'Return')
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.stop();
        this.scene.bringToTop('ToppingScene');
        this.scene.bringToTop('Switcher');
        this.scene.bringToTop('Tickets');
        this.scene.wake('Tickets');
        this.scene.get('ToppingScene').clear();
      });
    
    // console.log(this.data.get('gOrder'));
    console.log(this.scene.get('Tickets').selectedOrder);
  }

  update() {
  }
}

export default ReviewScene;

