class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }

    preload() {
        this.load.image('credits', './aesprite/credits.png')
        this.load.audio('select', './sfx/select.mp3')


    }

    create() {
        this.select = this.sound.add('select');

        this.credits = this.add.tileSprite(0, 0, this.sys.game.canvas.width, this.sys.game.canvas.height, 'credits').setOrigin(0, 0);


        this.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keySPACE)) {
            this.select.play();
            this.scene.start('menuScene');
        }
    }
}
