let config;

config = {
    type: Phaser.AUTO,
    width: 640 * 1.2,
    height: 480 * 1.2,
    scene: [Play],
    pixelArt: true,
}


let game = new Phaser.Game(config);
// set UI sizes
let borderUISize = game.config.height / 15;
// let borderPadding = borderUISize / 3;
let keyRESET, keyUP, keyDOWN;