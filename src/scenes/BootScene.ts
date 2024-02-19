import spritesheet from '@assets/tappyplane/Spritesheet/sheet.png';
import atlas from '@assets/tappyplane/Spritesheet/sheet.xml';
import gameplayBgm from '@assets/bomberman-bgm/09 Black City.mp3';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload(): void {
    this.load.atlasXML('tappy-plane-sheet', spritesheet, atlas);
    this.load.audio('bgm-gameplay', gameplayBgm);
  }

  update(): void {
    this.scene.start('GameScene');
  }
}
