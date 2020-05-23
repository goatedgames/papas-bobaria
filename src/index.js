import Phaser from "phaser";
import BaseScene from './scenes/BaseScene';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "game-container",
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: [ BaseScene ]
};

const game = new Phaser.Game(config);