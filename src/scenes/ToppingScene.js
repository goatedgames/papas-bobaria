import Phaser from 'phaser';

import { WIDTH, HEIGHT } from '../constants';
import Topping from '../Topping';

class ToppingScene extends Phaser.Scene {
  cup = null;
  shouldRefresh = false;
  dropping = false;
  timer;
  spoon;
  toppings = [];
  topId = 0;
  platform;
  // cupTester;

  constructor() {
    super({ key: 'ToppingScene' });
  }

  preload() {
  }

  create() {
    this.cameras.main.setBackgroundColor('#2889d4');
    // Hack to stop buttons in other scenes being pressed
    let bg = this.add.image(WIDTH / 2, HEIGHT / 2, 'sky')
      .setInteractive()
      .on('pointerdown', (pointer, x, y, event) => {
        event.stopPropagation();
      });

    // Invisible ground rect
    this.platform = this.physics.add.staticGroup();
    this.platform.add(this.add.rectangle(400, 540, 800, 100));

    // this.cupTester = this.physics.add.staticGroup()
    // this.cupTester.add(this.add.rectangle(400, 525, 100, 100));
    // this.cupTester.setY(1000);

    this.add.image(200, 100, 'ice-machine')
      .setScale(0.75)
      .setInteractive()
      .on('pointerdown', () => {
        this.dropType(0.5, 'ice-cube');
      });

    this.add.image(80, 100, 'pearl')
      .setScale(2.00)
      .setInteractive()
      .on('pointerdown', () => {
        this.dropType(0.5, 'pearl');
      });

    this.add.image(200, 200, 'mango')
      .setScale(0.08)
      .setInteractive()
      .on('pointerdown', () => {
        this.dropType(0.03, 'mango');
      });

    this.add.image(80, 200, 'lychee')
      .setScale(0.08)
      .setInteractive()
      .on('pointerdown', () => {
        this.dropType(0.03, 'lychee');
      });
    this.spoon = this.add.image(0, 0, 'spoon')
      .setVisible(false);
  }

  update() {
    if (this.dropping) {
      let pointer = this.input.activePointer.position;
      this.spoon.setPosition(pointer.x, pointer.y);
    }
  }

  addTopping(x, y, scale, tex) {
    let wrapper = new Topping(this.topId++, tex, scale);
    let rot = Math.PI * 2 * Math.random();
    let top = this.physics.add.image(x, y, tex)
      .setScale(scale)
      .setRotation(rot);
    top.body.setAllowGravity(true);
    top.body.setCollideWorldBounds(true, 0.1);

    // Hack for now, this seems to alleviate most of the shaking
    this.physics.add.collider(top, this.platform, (A, B) => {
      A.body.setAllowGravity(false);
    });
    for (let t of this.toppings) {
      if (t.tex !== tex) {
        this.physics.add.collider(top, t.pObj, (A, B) => {
          B.body.setAllowGravity(false);
        });
      }
    }

    if (this.cup !== null) {

    }
    wrapper.pObj = top;
    wrapper.rot = rot;
    this.toppings.push(wrapper);
  }

  dropType(scale, tex) {
    if (!this.dropping) {
      this.dropping = true;
      this.spoon.setVisible(true);
      this.timer = this.time.delayedCall(2000, () => {
        this.dropping = false;
        this.spoon.setVisible(false);
      });
      this.time.addEvent({
        delay: 200,
        repeat: 10,
        callback: () => {
          let pointer = this.input.activePointer.position;
          this.addTopping(pointer.x, pointer.y, scale, tex);
        }
      });
    }
  }

  changeCup(cup) {
    if (this.cup !== null) {
      this.cup.pObj.destroy();
    }
    let cupSprite = this.add.sprite(400, 400, 'cup-' + cup.tex)
      .setDepth(1)
      .setScale(1.0)
      .setAlpha(0.6);
    this.cup = cup;
    this.cup.pObj = cupSprite;

    this.destroyToppings();
  }

  prepareForReview() {
    if (this.cup === null) {
      return false;
    }
    for (let t of this.toppings) {
      t.x = t.pObj.x;
      t.y = t.pObj.y;
      t.bound = t.pObj.getBounds();
      // Rotation was set at spawn
    }
    return true;
  }

  destroyToppings() {
    for (let t of this.toppings) {
      t.pObj.destroy();
    }
    this.toppings = [];
  }

  clear() {
    this.cup.pObj.destroy();
    this.cup = null;
    this.destroyToppings();
    console.log(this.toppings);
  }
}

export default ToppingScene;