// Sofia Aminifard
// Cownado: The Calm Before the Storm
// 8 hours
// I had to do research to figure out how to code certian things.
// I am very proud of my art and I put in a lot of effort into the cohesion and fun game idea. 

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
let borderUISize = game.config.height / 20;

let keyRESET, keyUP, keyDOWN;