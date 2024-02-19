export class MainMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'MainMenu' });
  }

  create(): void {
    const background = this.add
      .sprite(0, 0, 'tappy-plane-sheet', 'background.png')
      .setOrigin(0, 0)
      .setScale(2, 2);

    const getStarted = this.add
      .sprite(
        this.cameras.main.centerX,
        this.cameras.main.centerY,
        'tappy-plane-sheet',
        'textGetReady.png',
      )
      .setScale(1);
    this.tweens.add({
      targets: getStarted,
      scaleX: 0.7,
      scaleY: 0.7,
      duration: 1000,
      ease: 'Sine',
      yoyo: true,
      repeat: -1,
    });

    const tapLeft = this.add.sprite(
      this.cameras.main.centerX - 50,
      this.cameras.main.centerY + 80,
      'tappy-plane-sheet',
      'tapLeft.png',
    );
    const tapRight = this.add.sprite(
      this.cameras.main.centerX + 50,
      this.cameras.main.centerY + 80,
      'tappy-plane-sheet',
      'tapRight.png',
    );
    const tapTick = this.add.sprite(
      this.cameras.main.centerX + 60,
      this.cameras.main.centerY + 100,
      'tappy-plane-sheet',
      'tapTick.png',
    );
    this.tweens.add({
      targets: tapTick,
      scaleX: 0.7,
      scaleY: 0.7,
      duration: 1000,
      ease: 'Sine',
      yoyo: true,
      repeat: -1,
    });

    const bgm = this.sound.add('bgm-menu', { loop: true });
    bgm.play();

    const startGameCallback = () => {
      this.sound.play('sfx-pause');
      this.tweens.add({
        targets: bgm,
        volume: 0,
        duration: 1000,
        onComplete: () => {
          bgm.stop();
          this.scene.launch('GameScene');
          this.scene.stop('MainMenu');
        },
      });
    };
    this.input.keyboard
      .addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
      .on('down', startGameCallback);
    this.input.on('pointerdown', startGameCallback);
    this.input.gamepad.on('down', startGameCallback);
  }

  update(): void {}
}
