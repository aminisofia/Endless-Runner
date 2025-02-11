class Balloon extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, 0);
  
      // add object to existing scene
      scene.add.existing(this);
      this.scene = scene;
      this.moveSpeed = 5;
      this.anims.play('sway');

    }

    update(scene, delta) {
        

        // Movement UP and DOWN
        if(keyUP.isDown && this.scene.gameOver < 2) {
            this.y -= this.moveSpeed * 1.2 * delta;
        } else {
            this.y += this.moveSpeed / 1.5 * delta;
        }

        // If you go up past
        if(this.y < -this.height * this.scale && this.scene.gameOver < 2) {
            this.y = this.scene.sys.game.canvas.height;
        }

        // If you go down past
        if(this.y > this.scene.sys.game.canvas.height && this.scene.gameOver < 2) {
            this.y = -this.height * this.scale;
        }
    }

}