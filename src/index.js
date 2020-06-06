import Phaser from "phaser";
import OrderScene from './scenes/OrderScene';
import BrewScene from './scenes/BrewScene';
import ToppingScene from './scenes/ToppingScene';
import ServeScene from './scenes/ServeScene';

import { WIDTH, HEIGHT } from './constants';

const config = {
  type: Phaser.AUTO,
  width: WIDTH,
  height: HEIGHT,
  parent: "game-container",
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: [
    OrderScene,
    BrewScene,
    ToppingScene,
    ServeScene
  ]
};

let game = new Phaser.Game(config);
// game.scene.add('OrderScene', OrderScene);
// game.scene.add('BrewScene', BrewScene);
// game.scene.add('ToppingScene', ToppingScene);
// game.scene.add('ServeScene', ServeScene);
// game.scene.start('OrderScene');