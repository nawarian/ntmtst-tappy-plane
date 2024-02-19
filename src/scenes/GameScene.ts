import { Plane } from "./GameObjects/Plane";

export class GameScene extends Phaser.Scene {
  private plane: Plane;
  private keys: Map<string, Phaser.Input.Keyboard.Key>;

  constructor() {
    super({ key: 'GameScene' });
  }

  init(): void {}

  create(): void {
    this.plane = new Plane(this, 100, 100);

    this.keys = new Map([
      ['KEY_ACTION', this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)],
    ]);
  }

  preload(): void {}

  update(_time: number, delta: number): void {
    const actionKey = this.keys.get('KEY_ACTION');

    if (actionKey.isDown && actionKey.getDuration() < 100) {
      this.plane.tap(delta);
    }
  }
}
