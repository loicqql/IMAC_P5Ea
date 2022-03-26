const GRIDSIZE = 30;
const MAXAREAX = 360;
const MAXAREAY = 360;

const DRAWING_FRAMERATE = 30;
const FRAMERATE = 120;
let count = 0;

let drawingMode = false;

let walker:Walker;
let button:Button;
let button2:Button;
let button3:Button;
// let button:Button;
// let button:Button;

let cursorCustom:Cursor;

// -------------------
//       Drawing
// -------------------

function draw() {
    translate(width / 2, height / 2);
    background(drawingMode ? 255 : 0);

    if(drawingMode) {
        walker.render();
        if(count > FRAMERATE / DRAWING_FRAMERATE) {
            walker.step();
            count = 0;
        }else {
            count++;
        }
    }else {
        button.step();
        button.render();

        button2.step();
        button2.render();

        button3.step();
        button3.render();
    }

    cursorCustom.step();
    cursorCustom.render(drawingMode ? false : true);
    

    //text
    select('canvas').elt.style.letterSpacing = "0px";
    fill(drawingMode ? 0 : 255);
    strokeWeight(0);
    textSize(15);
    textAlign(CENTER, CENTER);
    text('Project Recoding - Loic Q & Ben R - IMAC1', - 500 / 2, -(height/2 - 30) - 50 / 2, 500, 50);
}

// -------------------
//    Initialization
// -------------------

function setup() {

    walker = new Walker();

    button = new Button(0, -100, "Da Tweekaz - Jägermeister", "jagermeister.mp3", 30);
    button2 = new Button(0, 0, "Pegboard Nerds - Try This", "try-this.mp3", 23);
    button3 = new Button(0, 100, "Woodkid - Run Boy Run", 'woodkid_run_run.mp3', 18)

    cursorCustom = new Cursor();

    frameRate(FRAMERATE);
    
    p6_CreateCanvas();
}

function keyTyped() {
    if (key === ' ') {
        drawingMode = false;
        walker.reset();
    }
}

function mousePressed() {
    if(!drawingMode) {
        if(button.isHover()) {
            button.stop();
            walker.load('jagermeister.mp3');
            drawingMode = true;
        } else if(button2.isHover()) {
            button2.stop();
            walker.load('try-this.mp3');
            drawingMode = true;
        } else if(button3.isHover()) {
            button3.stop();
            walker.load('woodkid_run_run.mp3');
            drawingMode = true;
        }
    }
}

function windowResized() {
    p6_ResizeCanvas()
}