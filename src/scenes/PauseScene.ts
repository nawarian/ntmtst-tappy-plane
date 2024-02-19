export class PauseScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PauseScene' });
  }

  create(): void {
    const text = this.add.group({});

    text.create(0, 0, 'tappy-plane-sheet', 'letterP.png');
    text.create(48, 0, 'tappy-plane-sheet', 'letterA.png');
    text.create(105, 0, 'tappy-plane-sheet', 'letterU.png');
    text.create(158, 0, 'tappy-plane-sheet', 'letterS.png');
    text.create(206, 0, 'tappy-plane-sheet', 'letterE.png');

    const totalWidth = text
      .getChildren()
      .map((l: Phaser.GameObjects.Sprite) => l.width)
      .reduce((acc, curr) => curr + acc);

    text.incXY(
      this.cameras.main.centerX - totalWidth / 2 + 20,
      this.cameras.main.centerY,
    );

    this.input.keyboard
      .addKey(Phaser.Input.Keyboard.KeyCodes.ESC)
      .on('down', () => {
        this.resumeGame();
      });
    this.input.keyboard
      .addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
      .on('down', () => {
        this.resumeGame();
      });
    this.input.gamepad.on('down', (pad: any, btn: any, val: number) => {
      // If pause button
      if (btn.index === 9) {
        this.resumeGame();
      }
    });
    this.input.on('pointerdown', (pad: any, btn: any, val: number) => {
      this.resumeGame();
    });
  }

  resumeGame(): void {
    this.sound.play('sfx-resume');
    this.sound.get<Phaser.Sound.HTML5AudioSound>('bgm-gameplay').setVolume(1);
    this.scene.stop('PauseScene');
    this.scene.resume('GameScene');
  }
}
