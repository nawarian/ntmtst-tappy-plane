import spritesheet from '@assets/tappyplane/Spritesheet/sheet.png';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload(): void {
    this.load.atlasXML('tappy-plane-sheet', spritesheet, '/assets/sheet.xml');
  }

  update(): void {
    this.scene.start('GameScene');
  }
}
