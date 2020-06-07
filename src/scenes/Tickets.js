import Phaser from 'phaser';

import { WIDTH, HEIGHT} from '../constants';
import { Order } from '../Order';

class Tickets extends Phaser.Scene {
  tickets = [];
  currentNum = 1;

  constructor() {
      super({ key: 'Tickets' });
  }

  preload() {
  }

  create() {
  }

  update() {

  }

  findEmptySpot() {
    let best = 0;
    for (let t of this.tickets) {
      if (t.x < 600) {
        best = Math.max(best, t.x);
      }
    }
    return best + 50;
  }

  addTicket(order) {
    const black = '0x050505';

    let components = [];
    let bg = this.add.rectangle(0, 0, 150, 300, '0xf5f5f5')
      .setStrokeStyle(2, black);
    components.push(bg);

    components.push(
      this.add.text(-60, -135, 'Order #' + this.currentNum++)
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
        this.add.text(-40, -25 + offset, top)
          .setColor(black)
      );
      offset += 20;
    }

    let cont = this.add.container(150, 300, components);
    cont.setSize(150, 300);
    cont.setInteractive();
    cont.setScale(0.3, 0.3);
    cont.setPosition(this.findEmptySpot(), 50);

    this.input.setDraggable(cont);
    this.input.on('drag', (pointer, t, dragX, dragY) => {
      t.x = dragX;
      t.y = dragY;
      if (t.x > 600) {
        t.setScale(1, 1);
      } else {
        t.setScale(0.3, 0.3);
      }
    });

    this.tickets.push(cont);
  }
}

export default Tickets;