const GRIDSIZE = 30;
const MAXAREAX = 360;
const MAXAREAY = 360;

let def2PI = 6.28318530717958647693;
let defPI = def2PI / 2;

let song, analyzer;

interface Coords {
    x: number,
    y: number,
    dx: number,
    dy: number,
    pattern: boolean;
};

class Walker {
    tab: Array<Coords>;
    x: number;
    y: number;
    angle: number = def2PI / 4;
    duration: number;
    pattern: boolean = false;
    constructor() {
        this.tab = new Array();
        this.x = 0;
        this.y = 0;
        //@ts-ignore
        song = loadSound('../assets/jagermeister.mp3');
    }

    render() {
        for (let i = 0; i < this.tab.length; i++) {
            const el = this.tab[i];
            if (this.tab[i + 1]) {
                stroke(5);
                line(this.tab[i].x, this.tab[i].y, this.tab[i + 1].x, this.tab[i + 1].y);
                if (this.tab[i].pattern) {
                    for (let j = 0; j < 7; j++) {
                        line(this.tab[i].x, this.tab[i].y + j, this.tab[i + 1].x, this.tab[i + 1].y + j)
                    }
                }

            }
        }
    }

    step() {

        if (analyzer) {
            console.log(analyzer.getLevel());
        }

        const from360toPi = (angle) => {
            return angle * def2PI / 360; //2pi
        }

        this.duration = Math.round(random(1, 4));
        // this.duration = 1;

        this.pattern = false;



        let randAngle = Math.round(random(-4, 4)) * 45; //360deg
        if (randAngle % 90 != 0) {
            this.duration = this.duration * Math.sqrt(2);
        }
        if (randAngle % 180 == 0) {
            this.pattern = Math.round(random(0, 3)) ? false : true;
        }
        randAngle = from360toPi(randAngle);
        this.angle = + randAngle;

        let p: any, x: any, y: any;

        p = p5.Vector.fromAngle(this.angle).mult(GRIDSIZE * this.duration);
        x = this.x + p.x;
        y = this.y + p.y;

        if (x > MAXAREAX || y > MAXAREAY || x < (MAXAREAX * -1) || y < (MAXAREAY * -1)) {
            this.duration = 0;
            p = p5.Vector.fromAngle(this.angle).mult(GRIDSIZE * this.duration);
            x = this.x + p.x;
            y = this.y + p.y;
        }

        this.x = x;
        this.y = y;

        if (this.tab.length > 100) {
            this.tab.pop();
        }

        if (this.duration != 0) {
            this.tab.splice(0, 0, { 'x': this.x, 'y': this.y, 'pattern': false, 'dx': x, 'dy': y });

            if (this.pattern) {
                let h = Math.round(random(1, 5)) * GRIDSIZE;
                let d = Math.round(random(1, 2)) * GRIDSIZE;
                let n = Math.round(random(1, 3));
                if (this.x < 0 && (this.x + (n * d * 2) < MAXAREAX) && (this.y - h > -MAXAREAY)) {
                    for (let i = 0; i < n; i++) {
                        this.tab.splice(0, 0, { 'x': this.x, 'y': this.y + h, 'pattern': false, 'dx': x, 'dy': y });
                        this.tab.splice(0, 0, { 'x': this.x + d, 'y': this.y + h, 'pattern': true, 'dx': x, 'dy': y });
                        this.tab.splice(0, 0, { 'x': this.x + d, 'y': this.y, 'pattern': false, 'dx': x, 'dy': y });
                        this.tab.splice(0, 0, { 'x': this.x + d * 2, 'y': this.y, 'pattern': false, 'dx': x, 'dy': y });
                        this.x = this.x + d * 2;
                        for (let j = 0; j < 4; j++) {
                            this.tab.pop();
                        }
                    }
                } else if (this.x >= 0 && (this.x + (n * d * 2) > MAXAREAX) && (this.y - h > -MAXAREAY)) {
                    for (let i = 0; i < n; i++) {
                        this.tab.splice(0, 0, { 'x': this.x, 'y': this.y + h, 'pattern': false, 'dx': x, 'dy': y });
                        this.tab.splice(0, 0, { 'x': this.x - d, 'y': this.y + h, 'pattern': true, 'dx': x, 'dy': y });
                        this.tab.splice(0, 0, { 'x': this.x - d, 'y': this.y, 'pattern': false, 'dx': x, 'dy': y });
                        this.tab.splice(0, 0, { 'x': this.x - d * 2, 'y': this.y, 'pattern': false, 'dx': x, 'dy': y });
                        this.x = this.x - d * 2;
                        for (let j = 0; j < 4; j++) {
                            this.tab.pop();
                        }
                    }

                }

            }

        }

        // ellipse(-300, -300, 25, 25);
        // ellipse(300, 300, 25, 25);
        // ellipse(300, -300, 25, 25);
        // ellipse(-300, 300, 25, 25);
    }

}