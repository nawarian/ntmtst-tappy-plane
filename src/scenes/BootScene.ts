import spritesheet from '@assets/tappyplane/Spritesheet/sheet.png';
import atlas from '@assets/tappyplane/Spritesheet/sheet.xml';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload(): void {
    this.load.atlasXML('tappy-plane-sheet', spritesheet, atlas);
  }

  update(): void {
    this.scene.start('GameScene');
  }
}
