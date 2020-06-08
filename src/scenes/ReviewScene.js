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

    this.add.image(400, 300, 'robot-side');

    let ret = this.add.text(150, 550, 'Return')
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.get('ToppingScene').clear();
        this.scene.stop();
        this.scene.bringToTop('ToppingScene');
        this.scene.bringToTop('Switcher');
        this.scene.bringToTop('Tickets');
        this.scene.wake('Tickets');
      });
    
    // console.log(this.data.get('gOrder'));
    // Why is there no way of moving a gameObject between scenes?!?
    let order = this.scene.get('Tickets').selectedOrder;
    let topScene = this.scene.get('ToppingScene');
    let cup = topScene.cup;
    let toppings = topScene.toppings;

    let topCount = new Map();
    let texToName = {
      'mango': 'mango jelly',
      'lychee': 'lychee jelly',
      'ice-cube': 'ice',
      'pearl': 'pearls'
    };
    let cupSprite = this.add.sprite(400, 400, 'cup-' + cup.tex)
      .setScale(1.0)
      .setAlpha(0.75)
    for (let t of toppings) {
      if (Phaser.Geom.Rectangle.Overlaps(cupSprite.getBounds(), t.bound)) {
        this.add.image(t.x, t.y, t.tex)
          .setScale(t.scale)
          .setRotation(t.rot);
        let name = texToName[t.tex];
        if (topCount.has(name)) {
          topCount.set(name, topCount.get(name) + 1);
        } else {
          topCount.set(name, 1);
        }
      }
    }

    let penaltyBrew = 0;
    penaltyBrew += this.dist(order.tea - cup.tea);
    penaltyBrew += this.dist(order.milk - cup.milk);
    penaltyBrew += this.dist(order.syrup - cup.syrup);
    // range after: [0, 3]
    let penaltyTop = 0;
    for (let t of order.toppings) {
      let num = 0;
      if (topCount.has(t)) {
        num = topCount.get(t);
      }
      penaltyTop += Math.max(0, 1 - num / 10);
    }

    let scoreBrew = Math.round(Math.min(100, Math.max(0, 100 - 33 * penaltyBrew)));
    let scoreTop = Math.round(Math.min(Math.max(0, 100 - 33 * penaltyTop)));
    let scoreText = this.add.text(400, 300, 'Brew Score: ' + scoreBrew + '%\nTopping Score: ' + scoreTop + '%')
    
  }

  update() {
  }

  dist(x) {
    x = x / 100;
    return x * x;
  }

  sq(x) {
    return x * x;
  }
}

export default ReviewScene;

