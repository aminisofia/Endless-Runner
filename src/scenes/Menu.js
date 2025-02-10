class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.audio('select', './sfx/select.mp3')

        this.load.spritesheet('title', './aesprite/titleScreen-Sheet.png', {
            frameWidth: 381,
            frameHeight: 272,
            startFrame: 0,
            endFrame: 1
        });
    }

    create() {
        this.select = this.sound.add('select');

        this.anims.create({
            key: 'title',
            frames: this.anims.generateFrameNumbers('title', { start: 0, end: 1, first: 0}),
            frameRate: 1.5,
            repeat: -1
        });

        // Create a sprite and play the animation
        this.titleSprite = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, 'title').setScale(2.3);
        this.titleSprite.play('title');

        this.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(this.keySPACE)) {
            this.select.play();
            this.scene.start('playScene');
        }
        if (Phaser.Input.Keyboard.JustDown(this.keyLEFT)) {
            this.select.play();
            this.scene.start('creditsScene');
        }
    }
}
