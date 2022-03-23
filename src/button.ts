const basePath = "../assets/";
const rectWidth = 450;
const rectHeight = 70;

const maxProgess = 1000;

class Button {
    x:number
    y:number
    song:any
    isPlaying:boolean
    songTitle:string
    songPath:string
    hover:boolean
    progress:number
    startTime:number
    constructor(x:number, y:number, songTitle:string, songPath:string, startTime:number) {
        this.x = x;
        this.y = y;
        this.songTitle = songTitle;
        this.songPath = songPath;
        this.startTime = startTime;
        this.hover = false;
        this.progress = 0;
        this.isPlaying = false;

        //@ts-ignore
        this.song = loadSound(basePath + songPath);

    }

    render() {

        //progess
        fill(80,80,80);
        noStroke();
        rect(this.x - rectWidth / 2, this.y - rectHeight / 2, rectWidth * this.progress / maxProgess, rectHeight);
        
        //rect
        stroke(this.hover ? '255' : GRAY);
        strokeWeight(2);
        noFill();
        rect(this.x - rectWidth / 2, this.y - rectHeight / 2, rectWidth, rectHeight);
        textFont('Inter');

        //text
        select('canvas').elt.style.letterSpacing = "3px";
        fill(this.hover ? '255' : GRAY);
        strokeWeight(0);
        textSize(18);
        textAlign(CENTER, CENTER);
        text(this.songTitle, this.x - rectWidth / 1.7, this.y - rectHeight / 2, rectWidth, rectHeight);
    }

    step() {
        if(this.isHover()) {
            this.hover = true;
            if(this.progress >= maxProgess) {
                this.song.pause();
            }else {
                this.progress++;
            }
            if(!this.isPlaying) {
                this.song.play();
                this.song.jump(this.startTime);
                this.song.setVolume(0.01);
                this.isPlaying = true;
            }            
        }else {
            this.hover = false;
            this.progress = 0;
            if(this.isPlaying) {
                this.song.pause();
                this.isPlaying = false;
            }
        }
    }

    isHover() {
        return (mouseX > this.x - rectWidth / 2 + width / 2) && (mouseX < this.x + rectWidth / 2 + width / 2) && (mouseY > this.y - rectHeight / 2 + height / 2) && (mouseY < this.y + rectHeight / 2 + height / 2);
    }

    stop() {
        this.song.pause();
        this.hover = false;
        this.progress = 0;
        this.isPlaying = false;
    }
}