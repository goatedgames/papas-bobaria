import Phaser from 'phaser';

import { WIDTH, HEIGHT} from '../constants';

let averageScore = 0;
let served = 0;

class ReviewScene extends Phaser.Scene {
  order;

  constructor() {
      super({ 
        key: 'ReviewScene',
        physics: {
          default: 'arcarde',
          arcade: {
            gravity: { y: 200 }
          }
        }
      });
  }

  preload() {
  }

  create() {
    this.cameras.main.setBackgroundColor('#2889d4');
    this.add.image(WIDTH / 2, HEIGHT / 2, 'sky');
    console.log('Creating ReviewScene');

    this.add.image(400, 150, 'robot-front');

    let ret = this.add.text(400, 550, 'Return')
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.get('ToppingScene').clear();
        this.scene.stop();
        this.scene.bringToTop('ToppingScene');
        this.scene.bringToTop('Switcher');
        this.scene.bringToTop('Tickets');
        this.scene.wake('Tickets');
      });
    
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

    // MARK: Scoring
    let penaltyBrew = 0;
    penaltyBrew += this.dist((order.tea - cup.tea) / order.tea);
    penaltyBrew += this.dist((order.milk - cup.milk) / order.milk);
    penaltyBrew += this.dist((order.syrup - cup.syrup) / order.syrup);
    // range after: [0, 3]

    let penaltyTop = 0;
    // Check requested toppings
    for (let t of order.toppings) {
      let num = 0;
      if (topCount.has(t)) {
        num = topCount.get(t);
      }
      penaltyTop += Math.max(0, 1 - num / 5);
    }
    if (order.toppings.length > 0) {
      penaltyTop /= order.toppings.length;
    }

    // Check for extra toppings
    let extra = 0;
    for (let t of topCount.keys()) {
      let want = false;
      for (let s of order.toppings) {
        if (s === t) {
          want = true;
        }
      }
      if (!want) {
        extra += 1;
      }
    }

    let penaltyTime = Math.atan((30000 - (this.time.now - order.time)) / 120000) / (Math.PI / 2);
    let scoreTime;
    if (penaltyTime < 0) {
      scoreTime = 100 + penaltyTime * 80;
    } else {
      scoreTime = 100;
    }
    scoreTime = Math.round(Math.min(100, Math.max(0, scoreTime)));

    let scoreBrew = Math.round(Math.min(100, Math.max(0, 100 - 33 * penaltyBrew)));
    let scoreTop = Math.round(Math.min(100, Math.max(0, 100 - 100 * penaltyTop - 10 * extra)));
    let scoreText = this.add.text(125, 125, 'Brew Score: ' + scoreBrew + '%\nTopping Score: ' + scoreTop + '%\nTime Score: ' + scoreTime + '%')
      .setStyle({ align: 'right' });

    let avgScore = (0.25 * scoreTime + scoreBrew + scoreTop) / 2.25;
    let react;
    if (avgScore < 50) {
      react = 'This is terrible and\nyou should feel terrible.';
    } else if (avgScore < 75) {
      react = 'Meh.'
    } else if (avgScore < 90) {
      react = 'Thank you for this\nrefreshing beverage.'
    } else {
      react = 'This is goated.\nLet me help you dominate\nthe bubble tea industry\nwith robotic automation.'
    }
    this.add.text(500, 125, react); 

    averageScore = (averageScore * served + avgScore) / (served + 1);
    served += 1;

    this.add.text(400, 50, 'Average Score: ' + Math.round(averageScore) + '%\nDrinks Served: ' + served)
      .setOrigin(0.5);

    // MARK: Order details
    const black = '0x050505';

    let components = [];
    let bg = this.add.rectangle(0, 0, 150, 300, '0xf5f5f5')
      .setStrokeStyle(2, black);
    components.push(bg);

    components.push(
      this.add.text(-60, -180, 'What I ordered: '),
      this.add.text(-60, -135, 'Order #' + order.num)
        .setFontStyle('bold')
        .setColor(black),
      this.add.text(-60, -100, 'Tea: ' + order.tea + '%')
        .setColor(black),
      this.add.text(-60, -80, 'Milk: ' + order.milk + '%')
        .setColor(black),
      this.add.text(-60, -60, 'Syrup: ' + order.syrup + '%')
        .setColor(black)
    );

    components.push(
      this.add.text(-60, -25, 'Toppings: ')
        .setColor(black)
    );
    let offset = 20;
    for (let top of order.toppings) {
      components.push(
        this.add.text(-50, -25 + offset, top)
          .setColor(black)
      );
      offset += 20;
    }

    let cont = this.add.container(150, 300, components)
      .setPosition(650, 400);
    
    components = [];
    bg = this.add.rectangle(0, 0, 150, 300, '0xf5f5f5')
      .setStrokeStyle(2, black);
    components.push(bg);

    components.push(
      this.add.text(-60, -180, 'What I got: '),
      this.add.text(-60, -135, 'Order #' + order.num)
        .setFontStyle('bold')
        .setColor(black),
      this.add.text(-60, -100, 'Tea: ' + cup.tea + '%')
        .setColor(black),
      this.add.text(-60, -80, 'Milk: ' + cup.milk + '%')
        .setColor(black),
      this.add.text(-60, -60, 'Syrup: ' + cup.syrup + '%')
        .setColor(black)
    );

    components.push(
      this.add.text(-60, -25, 'Toppings: ')
        .setColor(black)
    );
    offset = 20;
    console.log(topCount.keys());
    for (let top of topCount.keys()) {
      components.push(
        this.add.text(-50, -25 + offset, top)
          .setColor(black)
      );
      offset += 20;
    }

    cont = this.add.container(150, 300, components)
      .setPosition(150, 400);

    if (avgScore < 33) {
      this.physics.add.sprite(WIDTH / 2, 400, 'star')
        .setVelocityY(-100);
    } else if (avgScore < 66) {
      this.physics.add.sprite(WIDTH / 2 - 20, 400, 'star')
        .setVelocity(-50, -100);
      this.physics.add.sprite(WIDTH / 2 + 20, 400, 'star')
        .setVelocity(50, -100);
    } else {
      this.physics.add.sprite(WIDTH / 2 - 30, 400, 'star')
        .setVelocity(-50, -100);
      this.physics.add.sprite(WIDTH / 2 - 0, 400, 'star')
        .setVelocityY(-100);
      this.physics.add.sprite(WIDTH / 2 + 30, 400, 'star')
        .setVelocity(50, -100);
    }
  }

  update() {
  }

  dist(x) {
    return x * x;
  }

  sq(x) {
    return x * x;
  }
}

export default ReviewScene;

