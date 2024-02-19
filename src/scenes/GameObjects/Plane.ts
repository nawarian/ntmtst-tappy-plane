export class Plane extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, '');

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

    this.play('plane-red');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.getBody().setCollideWorldBounds(true);
    this.getBody().setGravityY(1000);
  }

  preUpdate(_: number, delta: number): void {
    if (this.angle < 30 && this.angle ) {
      this.angle += delta / 10;
    }
  }

  getBody(): Phaser.Physics.Arcade.Body {
    return this.body as Phaser.Physics.Arcade.Body;
  }

  tap(delta: number): void {
    this.getBody().setVelocityY(this.height * delta / -5);
    this.setAngle(-30);
  }
}
