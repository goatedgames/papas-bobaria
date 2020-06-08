import Phaser from "phaser";
import Loader from './scenes/Loader';
import Switcher from './scenes/Switcher';
import Tickets from './scenes/Tickets';
import OrderScene from './scenes/OrderScene';
import BrewScene from './scenes/BrewScene';
import ToppingScene from './scenes/ToppingScene';
import ServeScene from './scenes/ServeScene';
import ReviewScene from './scenes/ReviewScene';

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
    Loader,
    Switcher,
    Tickets,
    OrderScene,
    BrewScene,
    ToppingScene,
    ServeScene,
    ReviewScene
  ]
};

let game = new Phaser.Game(config);