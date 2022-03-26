let analyzer;

let fft = new p5.FFT();

interface Coords {
    x: number,
    y: number,
    dx: number,
    dy: number,
    pattern: boolean;
};

class Walker {
    tab:Array<Coords>
    x:number
    y:number
    angle:number
    duration:number
    pattern:boolean
    song:any;
    isPlaying;
    constructor() {
        this.reset();
    }

    reset() {
        this.tab = new Array();
        this.x = 0;
        this.y = 0;
        this.angle = TWO_PI / 4;
        this.pattern = false;
        this.isPlaying = false;
        if(this.song) {
            this.song.pause();
        }
    }

    load(songName:string) {
        //@ts-ignore
        this.song = loadSound(basePath + songName);
        this.reset();
    }

    render() {
        stroke(0);
        strokeWeight(1);
        for (let i = 0; i < this.tab.length; i++) {
            const el = this.tab[i];
            if (this.tab[i + 1]) {
                line(this.tab[i].x, this.tab[i].y, this.tab[i + 1].x, this.tab[i + 1].y);
                if (this.tab[i].pattern) {
                    for (let j = 0; j < 7; j++) {
                        line(this.tab[i].x, this.tab[i].y + j, this.tab[i + 1].x, this.tab[i + 1].y + j)
                    }
                }

            }
        }

        //text
        select('canvas').elt.style.letterSpacing = "0px";
        fill(0);
        strokeWeight(0);
        textSize(15);
        textAlign(CENTER, CENTER);
        text('exit : space', - 150 / 2, (height/2 - 30) - 50 / 2, 150, 50);
    }

    step() {

        if(!this.isPlaying) {
            if(this.song.isLoaded()) {
                this.song.loop();
                this.song.jump(0);
                this.song.setVolume(0.01);
                this.isPlaying = true;
            }
        }

        const from360toPi = (angle:number) => {
            return angle * TWO_PI / 360; //2pi
        }

        const mapFreq = (min:number, max:number, steps:number, number:number) => {
            let step = (max-min) / steps;
            let result = Math.ceil((number - min) / step);
            return result > steps ? steps : result <= 0 ? 1 : result; 
        }
        
        fft.analyze();

        if(fft.getEnergy('mid') < 2) { // 2 for noise
            return;
        }
        

        this.duration = mapFreq(25, 50, 4, fft.getEnergy('mid'));

        let randAngle = Math.round(random(-4, 4)) * 45; //360deg

        if (randAngle % 90 != 0) {
            this.duration = this.duration * Math.sqrt(2);
        }

        this.pattern = false;
        
        randAngle = from360toPi(randAngle);

        if(fft.getEnergy('bass') > 110) {
            this.pattern = true;
            this.angle = from360toPi(180);
        }

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
                let h = mapFreq(110, 130, 4, fft.getEnergy('bass')) * GRIDSIZE;
                let d = mapFreq(110, 130, 2, fft.getEnergy('bass')) * GRIDSIZE;
                let n = mapFreq(110, 130, 3, fft.getEnergy('bass'));
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