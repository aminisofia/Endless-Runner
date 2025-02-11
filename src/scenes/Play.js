class Play extends Phaser.Scene {
    constructor() {
        super("playScene");

    }

    preload() {
    }

    create() {
        this.fireWoosh = this.sound.add('fireWoosh');
        this.fireWoosh.play();
        this.fireWoosh.setRate(0);

        this.select = this.sound.add('select');
        
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

    update(time, delta) {

        delta /= 16;

        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.select.play();
            this.bg.stop();
            this.fireWoosh.stop();
            this.scene.start('menuScene');
        }

        if (Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.select.play();
            this.bg.stop();
            this.fireWoosh.stop();
            this.scene.start('playScene');
        }

        if (this.backgroundSpeed < 60) {
            this.background.tilePositionX += this.backgroundSpeed * delta;
            this.noise.tilePositionX += this.backgroundSpeed * delta;
            this.backgroundSpeed += .005;
        }

        this.balloon.update(this, delta);

        if(this.gameOver >= 2) {
            this.end.alpha = 1;
            this.bg.stop();
            this.fireWoosh.setRate(1);

            this.balloon.setTexture('balloonDeath');     

            const emitter = this.add.particles(0, 0, 'fire', {
                lifespan: { min: 400, max: 600 },
                speed: { min: 40, max: 80 },
                scale: { start: 1.5, end: 0.5 },
                alpha: { start: 0.8, end: 0 },
                blendMode: 'ADD',
                frequency: 100,
                gravityY: -40,
                quantity: 1,
                rotate: { min: -90, max: 90 },
                tint: [ 0xff7f00, 0xff3300 ],
                emitZone: { type: 'edge', source: new Phaser.Geom.Circle(0, 0, 10), quantity: 32 }
            });
            
            emitter.startFollow(this.balloon, 0, -25);
            

        } else {
            // this.fireWoosh.stop();
        }

        for(let obstacle of this.obstacles) {
            obstacle.update(this, delta);

            if(this.balloon.x > obstacle.x && obstacle.canHurt === true && obstacle.canPoint === false && this. gameOver < 2) {
                this.p1Score += 1;
                this.scoreLeft.text = this.p1Score;    
                obstacle.canPoint = true;
            }
        

            if (obstacle.canHurt && this.checkCollision(this.balloon, obstacle) && this.gameOver < 2) {
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