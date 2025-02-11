class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // loading bar
        // see: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/loader/
        let loadingBar = this.add.graphics();
        this.load.on('progress', (value) => {
            loadingBar.clear();                                 // reset fill/line style
            loadingBar.fillStyle(0xFFFFFF, 1);                  // (color, alpha)
            loadingBar.fillRect(0, centerY, w * value, 5);  // (x, y, w, h)
        });
        this.load.on('complete', () => {
            loadingBar.destroy();
        });

        this.load.image('end', './aesprite/gameOver.png');
        this.load.image('balloonDeath', './aesprite/balloonDeath.png')
        this.load.image('fire', './aesprite/fire.png');

        this.load.image('noise', './aesprite/noisebg4.png');
        this.load.image('balloon', './aesprite/balloon.png');
        this.load.image('background', './aesprite/background.png')
        this.load.image('cow', './aesprite/cow.png')
        this.load.image('bra', './aesprite/bra.png')

        this.load.image('particle', './aesprite/particle.png')
        this.load.image('particle2', './aesprite/particle2.png')
        this.load.image('smallLeaf', './aesprite/smallLeaf.png')
        this.load.image('bigLeaf', './aesprite/bigLeaf.png')
        this.load.image('particleLight', './aesprite/particleLight.png')
        this.load.image('house', './aesprite/house.png');
        this.load.font('gamer', './fonts/Retro_Gaming.ttf');



        // SFXs
        this.load.audio('select', './sfx/select.mp3')
        this.load.audio('fireWoosh', './sfx/fireWoosh.mp3')
        this.load.audio('moo', './sfx/cow.wav')
        this.load.audio('crash', './sfx/crash.mp3')
        this.load.audio('bg', './sfx/bg.mp3')


         // load spritesheet
         this.load.spritesheet('balloonSway', './aesprite/balloon-Sheet.png', {
            frameWidth: 21,
            frameHeight: 34,
            startFrame: 0,
            endFrame: 1
        })

    }

    create(){
        this.scene.start('menuScene');

        this.anims.create({
            key: 'sway',
            frames: this.anims.generateFrameNumbers('balloonSway', { start: 0, end: 1, first: 0}),
            frameRate: 2,
            repeat: -1,
            delay: 100
        })
    }
}