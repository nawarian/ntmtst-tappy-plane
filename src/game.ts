import 'phaser';
import { BootScene } from '@scenes/BootScene';
import { GameScene } from '@scenes/GameScene';

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

window.addEventListener('load', () => {
  const cfg: Phaser.Types.Core.GameConfig = {
    width: 375,
    height: 812,
    type: Phaser.AUTO,
    parent: 'game',
    scene: [BootScene, GameScene],
    input: {
      keyboard: true,
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: {
          y: 0,
        },
        debug: true,
      },
    },
    backgroundColor: '#222',
    render: {
      pixelArt: false,
      antialias: false,
    },
  };

  const game = new Game(cfg);
});
