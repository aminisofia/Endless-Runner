class Play extends Phaser.Scene {
    constructor() {
        super("playScene");

    }

    preload() {

        this.load.image('balloon', './aesprite/balloon.png');
        this.load.image('background', './aesprite/background.png')
        this.load.image('cow', './aesprite/cow.png')
        this.load.image('particle', './aesprite/particle.png')
        this.load.image('particle2', './aesprite/particle2.png')
        this.load.image('smallLeaf', './aesprite/smallLeaf.png')
        this.load.image('bigLeaf', './aesprite/bigLeaf.png')
        this.load.image('particleLight', './aesprite/particleLight.png')



        this.load.audio('moo', './sfx/cow.wav')
        this.load.audio('crash', './sfx/crash.mp3')



    }

    create() {
        

        this.background = this.add.tileSprite(0, 0, this.sys.game.canvas.width, this.sys.game.canvas.height, 'background').setOrigin(0, 0);
        this.balloon = new Balloon(this, 80, 50, 'balloon').setOrigin(0, 0).setScale(4);
        
        this.obstacles = [
            new Obstacle(this, 640, 50, 'cow', 'moo').setOrigin(0.5, 0.5).setScale(4),
        ]


        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        
        
        this.p1Score = 0;
        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '35px',
            backgroundColor: '#ffdaf4',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize, borderUISize + 10, this.p1Score, scoreConfig)
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
        this.background.tilePositionX += 25;
        this.balloon.update(this);

        for(let obstacle of this.obstacles) {
            obstacle.update(this);

            if(this.balloon.x > obstacle.x && obstacle.canHurt === true && obstacle.canPoint === false) {
                this.p1Score += 1;
                this.scoreLeft.text = this.p1Score;    
                obstacle.canPoint = true;
            }
        

            if (obstacle.canHurt && this.checkCollision(this.balloon, obstacle)) {
                this.p1Score -= 1;
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
        if (balloon.x < obstacle.x + (obstacle.width * obstacle.scale)&& 
            balloon.x + (balloon.width * balloon.scale) > obstacle.x && 
            balloon.y < obstacle.y + (obstacle.height * obstacle.scale) &&
            (balloon.height * balloon.scale) + balloon.y > obstacle. y) {
            return true;
        } else {
            return false;
        }
    } 
}