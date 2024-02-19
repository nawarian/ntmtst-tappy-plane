export class Ground extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'tappy-plane-sheet', 'groundDirt.png');

    scene.physics.add.existing(this);
    this.getBody().setGravity(0);
    this.getBody().setVelocityX(-200);
  }

  getBody(): Phaser.Physics.Arcade.Body {
    return this.body as Phaser.Physics.Arcade.Body;
  }
}