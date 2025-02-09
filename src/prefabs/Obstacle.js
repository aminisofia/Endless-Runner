class Obstacle extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, sfx) {
      super(scene, x, y, texture);
  
      // add object to existing scene
      scene.add.existing(this);
      this.scene = scene;
      this.moveSpeed = 10;
      this.rotationSpeed = 0.02;
      this.canHurt = true;
      this.canPoint = false;
      this.sfx = sfx;


    }

    update(scene) {
        // this.z = 1;
        this.x -= this.moveSpeed;
        this.rotation += this.rotationSpeed;
        this.moveSpeed += .005;

        if(this.x < -this.height * this.scale) {
            this.x = this.scene.sys.game.canvas.width;
            this.y = Phaser.Math.Between(0, this.scene.sys.game.canvas.height - this.height * this.scale);
            this.rotationSpeed = Phaser.Math.FloatBetween(-0.05, 0.05);
            this.canHurt = true;
            this.canPoint = false;
        } 

        if(Phaser.Math.Between(1, 300) === 1) {
            this.scene.sound.play(this.sfx);
        }
        
    }

}