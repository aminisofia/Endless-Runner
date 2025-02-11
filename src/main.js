// Sofia Aminifard
// Cownado: The Calm Before the Storm
// 14 hours
// I am very proud of my art and I put in a lot of effort into the cohesion and fun game idea. I am also proud of how I did my collision system. 
// I had to do research to figure out how to code certian particle effects. I really like the endless runner being in the format of a tornado.

let config;

config = {
    type: Phaser.AUTO,
    width: 640 * 1.2,
    height: 480 * 1.2,
    scene: [Menu, Credits, Play],
    pixelArt: true,
}


let game = new Phaser.Game(config);
// set UI sizes
let borderUISize = game.config.height / 20;

let keyRESET, keyLEFT, keyUP, keySPACE; 