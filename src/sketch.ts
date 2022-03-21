let walker:Walker;
let button:Button;

// -------------------
//       Drawing
// -------------------

function draw() {
    background(255);
    translate(width / 2, height / 2);

    walker.step();
    walker.render();

    button.step();
    button.render();

}

function mousePressed() {
    if (!song._playing) {
        song.setVolume(0.01);
        song.loop();
        analyzer = new p5.Amplitude();
        analyzer.setInput(song);
    }
}

// -------------------
//    Initialization
// -------------------

function setup() {
    walker = new Walker();
    button = new Button();
    frameRate(15);
    p6_CreateCanvas();
}

function windowResized() {
    p6_ResizeCanvas()
}