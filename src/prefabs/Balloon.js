class Balloon extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
      super(scene, x, y, texture, frame);
  
      // add object to existing scene
      scene.add.existing(this);
      this.scene = scene;
      this.moveSpeed = 5;

    }

    update(scene) {
        
        // Movement UP and DOWN
        if(keyUP.isDown) {
            this.y -= this.moveSpeed * 1.2;
        } else {
            this.y += this.moveSpeed / 1.5;
        }

        // If you go up past
        if(this.y < -this.height * this.scale) {
            this.y = this.scene.sys.game.canvas.height;
        }

        // If you go down past
        if(this.y > this.scene.sys.game.canvas.height) {
            this.y = -this.height * this.scale;
        }
    }

}