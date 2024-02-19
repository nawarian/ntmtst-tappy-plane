import { Ground } from './GameObjects/Ground';
import { Obstacle } from './GameObjects/Obstacle';
import { Plane } from './GameObjects/Plane';

export class GameScene extends Phaser.Scene {
  private plane: Plane;
  private obstacles: Phaser.GameObjects.Group;
  private ground: Phaser.GameObjects.Group;
  private background: Phaser.GameObjects.Sprite;

  private keys: Map<string, Phaser.Input.Keyboard.Key>;

  constructor() {
    super({ key: 'GameScene' });
  }

  init(): void {}

  create(): void {
    this.background = this.add
      .sprite(0, 0, 'tappy-plane-sheet', 'background.png')
      .setOrigin(0, 0)
      .setScale(2, 2);

    this.plane = new Plane(this, 100, 100);
    this.obstacles = this.add.group({
      runChildUpdate: true,
      classType: Obstacle,
      maxSize: 6,
    });
    this.ground = this.add.group({
      runChildUpdate: true,
      classType: Ground,
      maxSize: 3,
    });
    this.ground.create(0, this.game.canvas.height - 71 / 2);
    this.ground.create(808, this.game.canvas.height - 71 / 2);
    this.ground.create(808 * 2, this.game.canvas.height - 71 / 2);

    this.obstacles.setDepth(1);
    this.ground.setDepth(2);

    this.keys = new Map([
      [
        'KEY_ACTION',
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
      ],
    ]);

    this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC).on('down', () => {
      this.scene.pause('GameScene');
      this.scene.launch('PauseScene');
    });

    this.physics.add.collider(this.plane, this.obstacles, () => {
      this.gameOver();
    });

    this.physics.add.collider(this.plane, this.ground, () => {
      this.gameOver();
    });

    this.sound.add('bgm-gameplay', { loop: true }).play();
  }

  preload(): void {}

  makePipes(): void {
    const posTopX = Phaser.Math.Between(
      this.game.canvas.width - 50,
      this.game.canvas.width + 50,
    );
    const posTopY = Phaser.Math.Between(0, 239 / 2);

    const posBottomX = Phaser.Math.Between(
      this.game.canvas.width,
      this.game.canvas.width + 50,
    );
    const posBottomY = Phaser.Math.Between(
      this.game.canvas.height,
      this.game.canvas.height - 239 / 2 - 71 / 3,
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
      if (obstacle === undefined) {
        return;
      }

      if (obstacle.x < -obstacle.width / 2) {
        obstacle.destroy();
      }

      return true;
    });

    if (this.obstacles.countActive() < 2) {
      this.makePipes();
    }

    // Loop ground tiles
    const firstGroundSprite = this.ground.getFirst(true);
    if (firstGroundSprite.getBody().x < -1000) {
      const last = this.ground.getLast(true);

      const first = this.ground.getChildren().shift() as Ground;
      first.setPosition(last.x + last.width, this.game.canvas.height - 71 / 2);
      this.ground.getChildren().push(first);
    }
  }
}
