class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    preload() {
        this.load.image('credits', './aesprite/credits.png')

    }

    create() {
        this.credits = this.add.tileSprite(0, 0, this.sys.game.canvas.width, this.sys.game.canvas.height, 'credits').setOrigin(0, 0).setScale(2);


        this.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keySPACE)) {
            this.scene.start('menuScene');
        }
    }
}
