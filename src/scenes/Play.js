class Play extends Phaser.Scene {
    constructor() {
        super("playScene");

    }

    preload() {
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

    create() {
        
        this.select = this.sound.add('select');
        this.anims.create({
            key: 'sway',
            frames: this.anims.generateFrameNumbers('balloonSway', { start: 0, end: 1, first: 0}),
            frameRate: 2,
            repeat: -1,
            delay: 100
        })

        this.backgroundSpeed = 50;
        this.background = this.add.tileSprite(0, 0, this.sys.game.canvas.width, this.sys.game.canvas.height, 'background').setOrigin(0, 0);
        this.noise = this.add.tileSprite(0, 0, this.sys.game.canvas.width, this.sys.game.canvas.height, 'noise').setOrigin(0, 0).setAlpha(.5).setScale(5);
        this.end = this.add.tileSprite(0, 0, this.sys.game.canvas.width, this.sys.game.canvas.height, 'end').setOrigin(0, 0).setAlpha(0);
        // this.balloonDeath = new Balloon(this, 80, 50, null).setOrigin(0, 0).setScale(4).setAlpha(0);

        // bg music
        this.bg = this.sound.add('bg');
        this.bg.setLoop(true);
        this.bg.play();

        this.balloon = new Balloon(this, 80, 50, 'balloonSway').setOrigin(0.5, 0.5).setScale(4);
        this.obstacles = [
            new Obstacle(this, 640, 50, 'cow', 'moo', 10, 2).setOrigin(0.5, 0.5).setScale(4),
            new Obstacle(this, 640, 50, 'house', null, 3, 10).setOrigin(0.5, 0.5).setScale(6),
            new Obstacle(this, 640, 50, 'bra', null, 10, 15).setOrigin(0.5, 0.5).setScale(4),

        ]

        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        
        this.gameOver = 0;
        this.p1Score = 0;
        // display score
        let scoreConfig = {
            fontFamily: 'gamer',
            fontSize: '35px',
            backgroundColor: '#e8b9e5',
            color: '#45444f',
            align: 'center',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 55
        }
        this.scoreLeft = this.add.text(borderUISize, borderUISize, this.p1Score, scoreConfig)
        scoreConfig.fixedWidth = 0


        this.trail3 = this.add.particles(0, 0, 'smallLeaf', {
            lifespan: 3000,
            speed: { min: 400, max: 800},
            scale: { start: 4, end: 2},
            blendMode: 'COLOR_DODGE',
            angle: { min: 180 -5, max: 180 +5},
        });

        this.trail4 = this.add.particles(0, 0, 'bigLeaf', {
            lifespan: 3000,
            speed: { min: 400, max: 800},
            scale: { start: 4, end: 2},
            blendMode: 'COLOR_DODGE',
            angle: { min: 180 -5, max: 180 +5},
        }); 

      
       
    }

    update() {

        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.select.play();
            this.bg.stop();
            this.scene.start('menuScene');
        }

        if (Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.select.play();
            this.bg.stop();
            this.scene.start('playScene');
        }

        if (this.backgroundSpeed < 60) {
            this.background.tilePositionX += this.backgroundSpeed;
            this.noise.tilePositionX += this.backgroundSpeed;
            this.backgroundSpeed += .005;
        }

        this.balloon.update(this);

        if(this.gameOver >= 2) {
            this.end.alpha = 1;
            this.bg.stop();
            this.balloon.setTexture('balloonDeath');     

            // particle effect explode
            const emitter = this.add.particles(0, 0, 'fire', {
                lifespan: { min: 600, max: 800 },
                speed: { min: 50, max: 100 },
                // angle: { min: -30, max: 30 },
                scale: { start: 2, end: 1 },
                alpha: { start: 1, end: 0 },
                blendMode: 'ADD',
                frequency: 50,
                gravityY: -50,
                quantity: 2,
                rotate: { min: -180, max: 180 },
                tint: [ 0xff7f00, 0xff5500, 0xff3300, 0xff0000 ],
            });
            
            emitter.startFollow(this.balloon, 0, -25);
            
            
        } 

        for(let obstacle of this.obstacles) {
            obstacle.update(this);

            if(this.balloon.x > obstacle.x && obstacle.canHurt === true && obstacle.canPoint === false) {
                this.p1Score += 1;
                this.scoreLeft.text = this.p1Score;    
                obstacle.canPoint = true;
            }
        

            if (obstacle.canHurt && this.checkCollision(this.balloon, obstacle)) {
                this.p1Score -= 1;
                this.gameOver += 1;
                this.sound.play('crash')
                this.scoreLeft.text = this.p1Score;    
                obstacle.canHurt = false;
            }
        }

        // PARTICLES 
        if (Math.random() < 0.5) {
            const trail = this.add.particles(0, 0, 'particle', {
                lifespan: 3000,
                speed: { min: 400, max: 800},
                scale: { start: 3, end: 1},
                blendMode: 'COLOR_DODGE',
                angle: { min: 180 -5, max: 180 +5},
            });
            trail.explode(1, this.sys.game.canvas.width, Phaser.Math.Between(0, this.sys.game.canvas.height));
        }
        if (Math.random() < 0.1) {
            const trail5 = this.add.particles(0, 0, 'particleLight', {
                lifespan: 3000,
                speed: { min: 800, max: 1000},
                scale: { start: 3, end: 1},
                blendMode: 'COLOR_DODGE',
                angle: { min: -5, max: 5},
            });
            trail5.explode(1, 0, Phaser.Math.Between(0, this.sys.game.canvas.height));
        }

        if (Math.random() < 0.4) {
            const trail2 = this.add.particles(0, 0, 'particle2', {
                lifespan: 3000,
                speed: { min: 400, max: 800},
                scale: { start: 3, end: 1},
                blendMode: 'COLOR_DODGE',
                angle: { min: 180, max: 180},
            });
            trail2.explode(1, this.sys.game.canvas.width, Phaser.Math.Between(0, this.sys.game.canvas.height));
        }

        // Leaves and their rotation
        if (Math.random() < 0.02) {
            this.trail3.explode(1, this.sys.game.canvas.width, Phaser.Math.Between(0, this.sys.game.canvas.height));
        }
        if (Math.random() < 0.02) {
            this.trail4.explode(1, this.sys.game.canvas.width, Phaser.Math.Between(0, this.sys.game.canvas.height));
        }

        this.trail3.forEachAlive((particle) => {
            particle.angle += Math.PI / 5;
        });
        this.trail4.forEachAlive((particle) => {
            particle.angle += Math.PI / 5;
        });
    }

       

    checkCollision(balloon, obstacle) {
        // simple AABB checking
        const a = balloon.x - obstacle.x;
        const b = obstacle.y - balloon.y;
        const distance = Math.sqrt(a*a + b*b);
        if (distance <= (balloon.width/2 * balloon.scale + obstacle.width /2 * obstacle.scale)) {
            return true;    
        } else {
            return false;
        }
    } 
}