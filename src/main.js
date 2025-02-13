// Sofia Aminifard
// Cownado: The Calm Before the Storm
// 20 hours
// I am very proud of my art and I put in a lot of effort into the cohesion and fun game idea. I am also proud of how I did my collision system. 
// I had to do research to figure out how to code certian particle effects. I really like the endless runner being in the format of a tornado.

let config;

config = {
    type: Phaser.AUTO,
    width: 640 * 1.2,
    height: 480 * 1.2,
    scene: [Load, Menu, Credits, Play],
    pixelArt: true,
    input: {
        keyboard: true,
        capture: [
          Phaser.Input.Keyboard.KeyCodes.UP,
          Phaser.Input.Keyboard.KeyCodes.DOWN,
          Phaser.Input.Keyboard.KeyCodes.LEFT,
          Phaser.Input.Keyboard.KeyCodes.RIGHT
        ]
      },
}


let game = new Phaser.Game(config);
// set UI sizes
let borderUISize = game.config.height / 20;
let centerY = game.config.height /2;
let centerX = game.config.width /2;
let w = game.config.width;
let h = game.config.height;
let keyRESET, keyLEFT, keyUP, keySPACE; 

// window.addEventListener("keydown", function(e) {
//     if(["ArrowUp","ArrowDown","ArrowLeft","ArrowRight", "Space"].indexOf(e.code) > -1) {
//       e.preventDefault();
//       // Allow the event to continue propagating
//       return false;
//     }
//   }, { passive: false });
  
// // Force focus on the game element when the page loads
// window.addEventListener('load', function() {
//     const gameElement = document.querySelector('canvas');
//     gameElement.focus();
// });

  
  