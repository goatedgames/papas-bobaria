import Phaser from 'phaser';

import { WIDTH, HEIGHT} from '../constants';

class Switcher extends Phaser.Scene {
  buttons = {};

  constructor() {
      super({ key: 'Switcher' });
  }

  preload() {
  }

  create() {
    // Ew. I don't know any better way to make a switcher in Phaser.
    this.buttons.orderButton = this.add.text(50, 550, 'Order\nStation')
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.bringToTop('OrderScene');
        this.scene.bringToTop('Switcher');
        this.scene.bringToTop('Tickets');
        this.clearAll();
        this.buttons.orderButton.setColor('black');
        this.scene.get('Tickets').hideServe();
      });
    this.buttons.orderButton.setColor('black');
    
    this.buttons.brewButton = this.add.text(150, 550, 'Brewing\nStation')
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.bringToTop('BrewScene');
        this.scene.bringToTop('Switcher');
        this.scene.bringToTop('Tickets');
        this.clearAll();
        this.buttons.brewButton.setColor('black');
        this.scene.get('Tickets').hideServe();
      })
    
    this.buttons.topButton = this.add.text(250, 550, 'Topping\nStation')
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.bringToTop('ToppingScene');
        this.scene.bringToTop('Switcher');
        this.scene.bringToTop('Tickets');
        this.clearAll();
        this.buttons.topButton.setColor('black');
        this.scene.get('Tickets').hideServe();
      });
    
    this.buttons.serveButton = this.add.text(350, 550, 'Serving\nStation')
      .setInteractive()
      .on('pointerdown', () => {
        this.scene.bringToTop('ServeScene');
        this.scene.bringToTop('Switcher');
        this.scene.bringToTop('Tickets');
        this.clearAll();
        this.buttons.serveButton.setColor('black');
        this.scene.get('Tickets').showServe();
      });
  }

  update() {
  }

  clearAll() {
    this.buttons.orderButton.setColor('white');
    this.buttons.brewButton.setColor('white');
    this.buttons.topButton.setColor('white');
    this.buttons.serveButton.setColor('white');
  }
}

export default Switcher;
