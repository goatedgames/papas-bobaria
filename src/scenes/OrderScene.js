import Phaser from 'phaser';

import { WIDTH, HEIGHT } from '../constants';

class OrderScene extends Phaser.Scene {
  customers = [];
  takeOrderButton;

  constructor() {
    super({ key: 'OrderScene' });
  }

  preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('star', 'assets/star.png');
  }

  create() {
    this.cameras.main.setBackgroundColor('#2889d4');
    this.add.image(WIDTH / 2, HEIGHT / 2, 'sky');

    this.addCustomer();
    this.add.text(50, 50, 'Order Station');

    this.add.text(500, 550, 'Brewing Station')
      .setInteractive()
      .on('pointerdown', () => {
        if (this.scene.isActive('BrewScene')) {
          this.scene.bringToTop('BrewScene');
        } else {
          this.scene.launch('BrewScene');
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
    
    
    this.takeOrderButton = this.add.text(300, HEIGHT / 2, 'Take Order', { fill: '#0f0' })
      .setInteractive()
      .on('pointerdown', () => {
        this.dequeFirstCustomer();
      })
    this.takeOrderButton.visible = false;
    
    this.mytext = this.add.text(400, 300, '', { fill: '#0f0' })
  }

  update() {
    for (let i = 0; i < this.customers.length; i++) {
      let limit;
      if (i == 0) {
        limit = 300;
      } else {
        limit = this.customers[i - 1].x + 50;
      }
      if (this.customers[i].x < limit) {
        if (this.customers[i] !== null)
          this.customers[i].setVelocityX(0);
        if (i == 0) {
          this.takeOrderButton.visible = true;
        }
      } else {
        if (this.customers[i] !== null)
          this.customers[i].setVelocityX(-100);
      }
    }
  }

  addCustomer() {
    const cust = this.physics.add.sprite(WIDTH + 10, HEIGHT / 2, 'star');
    cust.setVelocityX(-100);
    this.customers.push(cust);
  }

  dequeFirstCustomer() {
    this.customers[0].visible = false;
    this.customers.shift();
    this.takeOrderButton.visible = false;
  }
}

export default OrderScene;