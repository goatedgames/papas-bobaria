import Phaser from 'phaser';

import { WIDTH, HEIGHT } from '../constants';
import { Order } from '../Order';

class OrderScene extends Phaser.Scene {
  customers = [];
  takeOrderButton;
  lastCustomer = 0;
  currentNum = 1;

  constructor() {
    super({ key: 'OrderScene' });
  }

  preload() {
  }

  create() {
    this.cameras.main.setBackgroundColor('#2889d4');
    this.add.image(WIDTH / 2, HEIGHT / 2, 'sky');

    this.addCustomer();
    
    // this.takeOrderButton = this.add.text(300, HEIGHT / 2, 'Take Order', { fill: '#0f0' })
    this.takeOrderButton = this.add.image(100, 400, 'take-order')
      .setScale(0.35)
      .setInteractive()
      .on('pointerdown', () => {
        this.dequeFirstCustomer();
      });
    this.takeOrderButton.visible = false;
    
    this.mytext = this.add.text(400, 300, '', { fill: '#0f0' })
  }

  update(time) {
    for (let i = 0; i < this.customers.length; i++) {
      this.customers[i].setY(400);
      let limit;
      if (i == 0) {
        limit = 300;
      } else {
        limit = this.customers[i - 1].x + 100;
      }
      if (this.customers[i].x < limit) {
        if (this.customers[i] !== null)
          this.customers[i].setVelocityX(0);
        if (i == 0) {
          this.takeOrderButton.visible = true;
          this.takeOrderButton.x = this.customers[i].x - 125;
        }
      } else {
        if (this.customers[i] !== null)
          this.customers[i].setVelocityX(-200);
      }
    }

    if (this.customers.length < 5 && Math.random() < 0.01 && (time - this.lastCustomer) > 5000) {
      this.addCustomer();
    }
  }

  addCustomer() {
    const cust = this.physics.add.image(900, 400, 'robot-side')
      .setScale(0.5)
      .setY(400);
    cust.body.setAllowGravity(false);
    cust.body.setCollideWorldBounds(false);
    cust.setVelocityX(-200);
    this.customers.push(cust);
    this.lastCustomer = this.time.now;
  }

  dequeFirstCustomer() {
    let o = this.createRandomOrder();
    this.scene.get('Tickets').addTicket(o);
    this.customers[0].visible = false;
    this.customers.shift();
    this.takeOrderButton.visible = false;
  }

  createRandomOrder() {
    let o = new Order(this.currentNum++, this.time.now);
    const possible = ['pearls', 'lychee jelly', 'mango jelly', 'ice'];
    for (let choice of possible) {
      if (Math.random() < 0.5) {
        o.addTopping(choice);
      }
    }
    o.tea = Math.round(Math.random() * 25 + 75);
    o.milk = Math.round(Math.random() * 50 + 50);
    o.syrup = Math.round(Math.random() * 100);
    return o;
  }
}

export default OrderScene;