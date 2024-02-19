export class GameScene extends Phaser.Scene {
  private plane: Phaser.GameObjects.Sprite;
  private keys: Map<string, Phaser.Input.Keyboard.Key>;

  constructor() {
    super({ key: 'GameScene' });
  }

  init(): void {}

  create(): void {
    this.anims.create({
      key: 'plane-red',
      frames: this.anims.generateFrameNames('tappy-plane-sheet', {
        prefix: 'planeRed',
        suffix: '.png',
        start: 1,
        end: 3,
        zeroPad: 0,
      }),
      repeat: -1,
    });

    this.plane = this.add.sprite(100, 200, '').play('plane-red')
    this.physics.add.existing(this.plane);
    (this.plane.body as Phaser.Physics.Arcade.Body).setCollideWorldBounds(true);

    this.keys = new Map([
      ['KEY_ACTION', this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)],
    ]);
  }

  preload(): void {}

  update(_time: number, delta: number): void {
    const actionKey = this.keys.get('KEY_ACTION');

    if (actionKey.isDown && actionKey.getDuration() < 200) {
      (this.plane.body as Phaser.Physics.Arcade.Body).setVelocityY(this.plane.height * delta / -4);
      this.plane.setAngle(-30);
    }

    if (this.plane.angle < 30 && this.plane.angle ) {
      this.plane.angle += delta / 14;
    }
  }
}
