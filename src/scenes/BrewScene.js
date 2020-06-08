import Phaser from 'phaser';

import { WIDTH, HEIGHT} from '../constants';
import Cup from '../Cup';

class BrewScene extends Phaser.Scene {
  platform;
  displayText;
  cupTester;
  occupied = null;
  cups = [];
  cupId = 0;
  teaButton;
  milkButton;
  syrupButton;
  nextZone;

  constructor() {
      super({ key: 'BrewScene' });
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

    // Dispenser machine container
    let dispenser = this.add.sprite(0, 0, 'dispenser')
      .setScale(0.75);
    let displayBg = this.add.rectangle(0, -10, 350, 30, '0x0f0f0f');
    this.cupTester = this.add.rectangle(0, 100, 10, 100);
    this.teaButton = this.add.rectangle(-185, -95, 150, 110)
    this.milkButton = this.add.rectangle(0, -95, 150, 110);
    this.syrupButton = this.add.rectangle(185, -95, 150, 110);
    let style = {
      fill: '#00ff00',
    };
    this.displayText = this.add.text(0, -10, 'Place cup below...', style)
      .setOrigin(0.5);

    this.add.container(400, 300, [dispenser, displayBg, this.cupTester, this.displayText, this.teaButton, this.milkButton, this.syrupButton]);
    
    // Physics stuff. This platform should probably go with the container.
    this.platform = this.physics.add.staticGroup();
    this.platform.create(400, 470, 'platform')
      .setScale(0.5)
      .refreshBody();
    // Invisible ground rect
    this.platform.add(this.add.rectangle(400, 600, 800, 100));

    this.add.text(20, 200, 'New Cup')
      .setInteractive()
      .on('pointerdown', () => {
        let c = this.addCup();
        this.cups.push(c);
      });

    this.nextZone = this.add.rectangle(725, 525, 100, 100)
      .setStrokeStyle(5, '#ff0000');
  }

  update() {
    // Figure out if there's a cup in the right spot with cupTester's geometry
    let found = null;
    for (let c of this.cups) {
      if (Phaser.Geom.Rectangle.Overlaps(
        c.pObj.getBounds(),
        this.cupTester.getBounds()
      )) {
        found = c;
      }
    }
    if (found === null) {
      this.occupied = null;
      this.displayText.setText('Place cup below...');
    } else {
      if (this.occupied === null) {
        this.occupied = found;
        this.refreshText(found);
      }
    }

    // Have to do this because there's no 'pointerheld' event
    let pointerPos = this.input.activePointer.position;
    if (this.input.activePointer.isDown && this.occupied !== null) { 
      if (Phaser.Geom.Rectangle.ContainsPoint(this.teaButton.getBounds(), pointerPos)) {
        this.occupied.addTea(1);
        this.refreshText(this.occupied);
      } else if (Phaser.Geom.Rectangle.ContainsPoint(this.milkButton.getBounds(), pointerPos)) {
        this.occupied.addMilk(1);
        this.refreshText(this.occupied);
      } else if (Phaser.Geom.Rectangle.ContainsPoint(this.syrupButton.getBounds(), pointerPos)) {
        this.occupied.addSyrup(1);
        this.refreshText(this.occupied);
      }
      this.occupied.updateTexture();
    }
  }

  addCup() {
    let cupData = new Cup(this.cupId++);
    let cup = this.physics.add.sprite(60, 300, 'cup-0')
      .setScale(0.5)
      .setInteractive({ draggable: true })
      .on('pointerdown', () => {
        cup.body.setAllowGravity(false);
      })
      .on('drag', (_, dragX, dragY) => {
        cup.setPosition(dragX, dragY);
      })
      .on('dragend', (pointer, dragX, dragY, dropped) => {
        if (Phaser.Geom.Rectangle.Overlaps(
          this.nextZone.getBounds(),
          cup.getBounds()
        )) {
          // Hacky again, but what can ya do
          this.scene.get('ToppingScene').cup = cupData;
          this.scene.get('ToppingScene').shouldRefresh = true;

          // Remove this cup from this scene
          cup.destroy();
          for (let i = 0; i < this.cups.length; i++) {
            if (this.cups[i].id === cupData.id) {
              this.cups.splice(i, 1);
              break;
            }
          }
        }
      })
      .on('pointerup', () => {
        cup.body.setAllowGravity(true);
      });
    cup.body.setCollideWorldBounds(true, 0.1);
    cup.body.setAllowGravity(true);
    this.physics.add.collider(cup, this.platform);
    cupData.pObj = cup;
    return cupData;
  }

  refreshText(cup) {
    this.displayText.setText('tea: ' + cup.tea + '%|milk: ' + cup.milk + '%|syrup: ' + cup.syrup + '%');
  }
}

export default BrewScene;