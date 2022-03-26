// const GRIDSIZE = 20;

// let xMax = 360;
// let yMax = 360;

// interface Coords {
//     x:number,
//     y:number,
// };

// // const gui = new dat.GUI();
// // const params = {
// //     right: true,
// //     Download_Image: () => save(),
// // };

// // gui.add(params, "right");
// // gui.add(params, "Download_Image");

// class Walker {
//     tab:Array<Coords>;
//     x:number;
//     y:number;
//     angle:number = TWO_PI / 4;
//     duration:number;
//     constructor() {
//         this.tab = new Array();
//         this.x = Math.round(random(-300, 300));
//         this.y = Math.round(random(-300, 300));
//     }
    
//     render() {
//         for (let i = 0; i < this.tab.length; i++) {
//             const el = this.tab[i];
//             if(this.tab[i+1]) {
//                 stroke(5);
//                 line(this.tab[i].x, this.tab[i].y, this.tab[i+1].x, this.tab[i+1].y)
//             }
//         }
//     }
    
//     step() {
        
//         this.duration = Math.round(random(1, 5));
//         // this.duration = 1;

//         let randAngle = Math.round(random(-3, 3)) * 45; //360deg
//         if(randAngle % 90 != 0) {
//             this.duration = this.duration * Math.sqrt(2);
//         }
//         randAngle = randAngle * TWO_PI / 360 ; //2pi
//         this.angle =+ randAngle;

//         const p = p5.Vector.fromAngle(this.angle).mult(GRIDSIZE * this.duration);
//         this.x = this.x + p.x;
//         this.y = this.y + p.y;
//         if(this.x > xMax || this.x < -xMax || this.y > yMax || this.y < -yMax){
//             this.y = 0;
//             this.x = 0;
//         }

//         this.tab.splice(0, 0, {'x': this.x, 'y' : this.y});
//     }


// }

// // -------------------
// //       Drawing
// // -------------------

// let w:Walker;

// function draw() {
//     background(255);
//     translate(width / 2, height / 2);

//     w.step();
//     w.render();

// }

// // -------------------
// //    Initialization
// // -------------------

// function setup() {
//     w = new Walker();
//     frameRate(30);
//     p6_CreateCanvas();
// }

// function windowResized() {
//     p6_ResizeCanvas()
// }