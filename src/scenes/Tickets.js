import Phaser from 'phaser';

import { WIDTH, HEIGHT} from '../constants';
import { Order } from '../Order';

class Tickets extends Phaser.Scene {
  tickets = [];
  serveArea;
  lastSelected;
  selectedOrder;

  constructor() {
      super({ key: 'Tickets' });
  }

  preload() {
  }

  create() {
    this.add.text(20, 20, 'Tickets');

    let components = [];
    let serveBox = this.add.rectangle(0, 0, 75, 150, '0xdddddd')
        .setStrokeStyle(2, '0f5f5f5');

    components.push(
      serveBox,
      this.add.text(-30, 0, 'Drag to\nServe')
    );

    // This is hacky, but I don't know any other way to move the gameObject between scenes
    this.serveArea = this.add.container(75, 150, components)
      .setPosition(400, 300);
    this.serveArea.setVisible(false);
  }

  update() {
  }

  // Finds an empty spot to place a new ticket by just stupidly taking the max x of any non-enlarged ticket.
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
    // Visual parts of the ticket
    const black = '0x050505';

    let components = [];
    let bg = this.add.rectangle(0, 0, 150, 300, '0xf5f5f5')
      .setStrokeStyle(2, black);
    components.push(bg);

    components.push(
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

    let cont = this.add.container(150, 300, components);
    cont.setSize(150, 300);
    cont.setInteractive();
    cont.setScale(0.3, 0.3);
    cont.setPosition(this.findEmptySpot(), 50);

    // Input parts of the ticket, although not sure if these should go in create()
    this.input.setDraggable(cont);
    this.input.on('drag', (pointer, t, dragX, dragY) => {
      t.x = dragX;
      t.y = dragY;
      if (t.x > 600) {
        t.setScale(1, 1);
      } else {
        t.setScale(0.3, 0.3);
      }
      this.lastSelected = t;
    });
    this.input.on('dragend', (pointer, dragX, dragY, dropped) => {
      // Sometimes there's a phantom event that errors because this ticket has already been removed.
      if (this.lastSelected === null) {
        return;
      }

      if (this.serveArea.visible && Phaser.Geom.Rectangle.ContainsRect(
        this.serveArea.getBounds(),
        this.lastSelected.getBounds()
      )) {
        this.scene.switch('ReviewScene');
        this.scene.bringToTop('ReviewScene');
        // Unfortunately, scene.start shuts down the current scene. We have to do this to pass the order data to ReviewScene.
        this.selectedOrder = this.lastSelected.getData('order');
        
        // Finally, destroy this ticket before the scene is switched.
        this.lastSelected = null;
        for (let i = 0; i < this.tickets.length; i++) {
          if (this.selectedOrder.num === this.tickets[i].getData('order').num) {
            this.tickets[i].destroy();
            this.tickets.splice(i, 1);
            break;
          }
        }
        console.log(this.tickets);
      }
    });

    cont.setData('order', order);
    this.tickets.push(cont);
  }

  // More hacky stuff
  showServe() {
    this.serveArea.setVisible(true);
  }

  hideServe() {
    this.serveArea.setVisible(false);
  }
}

export default Tickets;