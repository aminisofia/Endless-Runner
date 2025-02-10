class End extends Phaser.Scene {
    constructor() {
        super("endScene");
    }

    preload() {
        this.load.image('end', './aesprite/gameOver.png')
        this.load.audio('select', './sfx/select.mp3')


    }

    create() {
        this.select = this.sound.add('select');

        this.end = this.add.tileSprite(0, 0, this.sys.game.canvas.width, this.sys.game.canvas.height, 'end').setOrigin(0, 0);


        this.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keySPACE)) {
            this.select.play();
            this.scene.start('menuScene');
        }

        if (Phaser.Input.Keyboard.JustDown(this.R)) {
            this.select.play();
            this.scene.start('playScene');
        }
    }
}
