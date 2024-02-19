export class Obstacle extends Phaser.GameObjects.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number) {
        const frameName = y < scene.game.canvas.height / 2
            ? 'rockGrassDown.png'
            : 'rockGrass.png';
        super(scene, x, y, 'tappy-plane-sheet', frameName);

        scene.physics.add.existing(this);
        this.getBody().setGravity(0, 0);
        this.getBody().setVelocityX(-200);
    }

    getBody(): Phaser.Physics.Arcade.Body {
        return this.body as Phaser.Physics.Arcade.Body;
    }

    preUpdate(time: number, delta: number): void {
        if (this.x + this.width / 2 < 0) {
            this.destroy(true);
        }     
    }
}
