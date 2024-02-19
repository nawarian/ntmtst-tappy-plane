import { Obstacle } from './GameObjects/Obstacle';
import { Plane } from './GameObjects/Plane';

export class GameScene extends Phaser.Scene {
  private plane: Plane;
  private obstacles: Phaser.GameObjects.Group;
  private keys: Map<string, Phaser.Input.Keyboard.Key>;

  constructor() {
    super({ key: 'GameScene' });
  }

  init(): void {}

  create(): void {
    this.plane = new Plane(this, 100, 100);
    this.obstacles = this.add.group({
      runChildUpdate: true,
      classType: Obstacle,
      maxSize: 6,
    });

    this.keys = new Map([
      [
        'KEY_ACTION',
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
      ],
    ]);

    this.physics.add.collider(this.plane, this.obstacles, () => {
      this.gameOver();
    });
  }

  preload(): void {}

  makePipes(): void {
    const posTopX = Phaser.Math.Between(
      this.game.canvas.width,
      this.game.canvas.width + 50,
    );
    const posTopY = Phaser.Math.Between(0, 239 / 2);

    const posBottomX = Phaser.Math.Between(
      this.game.canvas.width,
      this.game.canvas.width + 50,
    );
    const posBottomY = Phaser.Math.Between(
      this.game.canvas.height,
      this.game.canvas.height - 239 / 2,
    );

    this.obstacles.create(posTopX, posTopY);
    this.obstacles.create(posBottomX, posBottomY);
  }

  gameOver(): void {
    // TODO: implementar transição de cena para o GameOver
  }

  update(_time: number, delta: number): void {
    const actionKey = this.keys.get('KEY_ACTION');

    if (actionKey.isDown && actionKey.getDuration() < 100) {
      this.plane.tap(delta);
    }

    this.obstacles.children.iterate((obstacle: Obstacle) => {
      if (obstacle.x < -obstacle.width / 2) {
        obstacle.destroy();
      }

      return true;
    });

    if (this.obstacles.countActive() < 2) {
      this.makePipes();
    }
  }
}
