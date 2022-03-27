const GRIDSIZE = 30;
const MAXAREAX = 360;
const MAXAREAY = 360;

const DRAWING_FRAMERATE = 60;
const FRAMERATE = 120;
let count = 0;

let drawingMode = false;
let intro = true;

let walker:Walker;
let button:Button;
let button2:Button;
let button3:Button;
let button4:Button;

let cursorCustom:Cursor;

interface musicParams {
    midMin:number,
    midMax:number,
    bassMin:number,
    bassMax:number,
}

// -------------------
//       Drawing
// -------------------

function draw() {
    translate(width / 2, height / 2);
    background(drawingMode ? 255 : 0);

    if(!intro) {
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
    
            button4.step();
            button4.render();
        }
    }else {
        //text
        select('canvas').elt.style.letterSpacing = "0px";
        fill(drawingMode ? 0 : 255);
        strokeWeight(0);
        textSize(30);
        textAlign(CENTER, CENTER);
        text('Click to unlock', 0, 0);
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

    button = new Button(0, -150, "Miles Davis - Walkin", "miles-davis-walkin.mp3", 30);
    button2 = new Button(0, -50, "Rocky Volcano - Comme un volcan", "comme-un-volcan.mp3", 23);
    button3 = new Button(0, 50, "Pegboard Nerds - Try This", "try-this.mp3", 23);
    button4 = new Button(0, 150, "Woodkid - Run Boy Run", 'woodkid_run_run.mp3', 18)

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
    if(!intro) {
        if(!drawingMode) {
            if(button.isHover()) {
                button.stop();
                walker.load('miles-davis-walkin.mp3', {midMin:25, midMax:50, bassMin:100, bassMax:130});
                drawingMode = true;
            } else if(button2.isHover()) {
                button2.stop();
                walker.load('comme-un-volcan.mp3', {midMin:25, midMax:50, bassMin:110, bassMax:130});
                drawingMode = true;
            } else if(button3.isHover()) {
                button3.stop();
                walker.load('try-this.mp3', {midMin:25, midMax:50, bassMin:110, bassMax:130});
                drawingMode = true;
            } else if(button4.isHover()) {
                button4.stop();
                walker.load('woodkid_run_run.mp3', {midMin:25, midMax:50, bassMin:95, bassMax:120});
                drawingMode = true;
            }
            
        }
    } else {
        intro = false;
    }
    
}

function windowResized() {
    p6_ResizeCanvas()
}