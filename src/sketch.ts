const GRIDSIZE = 15;
const MAXAREAX = 360;
const MAXAREAY = 360;

let def2PI = 6.28318530717958647693;
let defPI = def2PI / 2;

interface Coords {
    x:number,
    y:number,
};

// const gui = new dat.GUI();
// const params = {
//     right: true,
//     Download_Image: () => save(),
// };

// gui.add(params, "right");
// gui.add(params, "Download_Image");

class Walker {
    tab:Array<Coords>;
    x:number;
    y:number;
    angle:number = def2PI / 4;
    duration:number;
    constructor() {
        this.tab = new Array();
        // this.x = Math.round(random(-300, 300));
        // this.y = Math.round(random(-300, 300));
        this.x = 0;
        this.y = 0;
    }
    
    render() {
        for (let i = 0; i < this.tab.length; i++) {
            const el = this.tab[i];
            if(this.tab[i+1]) {
                stroke(5);
                line(this.tab[i].x, this.tab[i].y, this.tab[i+1].x, this.tab[i+1].y)
            }
        }
    }
    
    step() {

        const from360toPi = (angle) => {
            return angle * def2PI / 360 ; //2pi
        }
        
        this.duration = Math.round(random(1, 3));
        // this.duration = 1;

        let randAngle = Math.round(random(-4, 4)) * 45; //360deg
        if(randAngle % 90 != 0) {
            this.duration = this.duration * Math.sqrt(2);
        }
        randAngle = from360toPi(randAngle);
        this.angle =+ randAngle;

        let p:any, x:any, y:any;

        p = p5.Vector.fromAngle(this.angle).mult(GRIDSIZE * this.duration);
        x = this.x + p.x;
        y = this.y + p.y;

        if(x > MAXAREAX || y > MAXAREAY || x < (MAXAREAX*-1) || y < (MAXAREAY*-1)) {
            this.duration = 0;
            p = p5.Vector.fromAngle(this.angle).mult(GRIDSIZE * this.duration);
            x = this.x + p.x;
            y = this.y + p.y;
        }

        this.x = x + p.x;
        this.y = y + p.y;


        if(this.tab.length > 100) {
            this.tab.pop();
        }

        if(this.duration != 0) {
            this.tab.splice(0, 0, {'x': this.x, 'y' : this.y});
        }

        ellipse(-300, -300, 25, 25);
        ellipse(300, 300, 25, 25);
        ellipse(300, -300, 25, 25);
        ellipse(-300, 300, 25, 25);
    }

}

// -------------------
//       Drawing
// -------------------

let w:Walker;

function draw() {
    background(255);
    translate(width / 2, height / 2);

    w.step();
    w.render();

}

// -------------------
//    Initialization
// -------------------

function setup() {
    w = new Walker();
    frameRate(15);
    p6_CreateCanvas();
}

function windowResized() {
    p6_ResizeCanvas()
}