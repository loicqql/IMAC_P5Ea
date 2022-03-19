/*

const GRIDSIZE = 25;

let def2PI = 6.28318530717958647693;
let defPI = def2PI / 2;

interface Coords {
    x:number,
    y:number
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
        
        // this.duration = Math.round(random(1, 5));
        this.duration = 1;

        let reel = Math.round(random(1)) ? -1 : 1 // -1 or 1
        let randAngle = Math.round(random(1, 3)) * reel * 45; //360deg
        console.log(randAngle);
        randAngle = randAngle * def2PI / 360 ; //2pi
        this.angle =+ randAngle;


        console.log(this.duration, this.angle);

        const p = p5.Vector.fromAngle(this.angle).mult(GRIDSIZE * this.duration);
        this.x = this.x - p.x;
        this.y = this.y - p.y;

        // this.angle += d;

        // if(params.right) {
        //     if(this.angle % def2PI < defPI) {
        //         this.angle += 0.05;
        //     }
    
        //     if(this.angle % def2PI > defPI) {
        //         this.angle -= 0.05;
        //     }
        // }

        this.tab.splice(0, 0, {'x': this.x, 'y' : this.y});
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
    frameRate(30);
    p6_CreateCanvas();
}

function windowResized() {
    p6_ResizeCanvas()
}

*/