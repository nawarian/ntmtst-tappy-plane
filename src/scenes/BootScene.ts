import spritesheet from '@assets/tappyplane/Spritesheet/sheet.png';
import atlas from '@assets/tappyplane/Spritesheet/sheet.xml';
import gameplayBgm from '@assets/bomberman-bgm/optimised/09 Black City.mp3';
import bubbleOpenSfx from '@assets/sfx/optimised/BUBBLE_OPEN.mp3';
import backSfx from '@assets/sfx/optimised/BACK.mp3';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload(): void {
    this.load.atlasXML('tappy-plane-sheet', spritesheet, atlas);
    this.load.audio('bgm-gameplay', gameplayBgm);
    this.load.audio('sfx-pause', bubbleOpenSfx);
    this.load.audio('sfx-resume', backSfx);
  }

  update(): void {
    this.scene.start('GameScene');
  }
}
