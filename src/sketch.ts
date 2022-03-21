const GRIDSIZE = 30;
const MAXAREAX = 360;
const MAXAREAY = 360;

let walker:Walker;
let button:Button;
let button2:Button;
// let button:Button;
// let button:Button;

// -------------------
//       Drawing
// -------------------

function draw() {
    background(0);
    translate(width / 2, height / 2);

    // walker.step();
    // walker.render();

    button.step();
    button.render();

    button2.step();
    button2.render();

}

// -------------------
//    Initialization
// -------------------

function setup() {
    walker = new Walker();

    button = new Button(0, -50, "Da Tweekaz - Jägermeister", "jagermeister.mp3", 30);
    button2 = new Button(0, 50, "Pegboard Nerds - Try This", "try-this.mp3", 23);


    frameRate(10);
    p6_CreateCanvas();
}

// function mousePressed() {
//     if (!song.isPlaying) {s
//         song.setVolume(0.01);
//         song.loop();
//         analyzer = new p5.Amplitude();
//         analyzer.setInput(song);
//     }
// }

function windowResized() {
    p6_ResizeCanvas()
}