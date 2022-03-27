var basePath = "https://loicquinquenel.fr/IMAC_P5Ea/assets/";
var rectWidth = 450;
var rectHeight = 70;
var maxProgess = 1000;
var Button = (function () {
    function Button(x, y, songTitle, songPath, startTime) {
        this.x = x;
        this.y = y;
        this.songTitle = songTitle;
        this.songPath = songPath;
        this.startTime = startTime;
        this.hover = false;
        this.progress = 0;
        this.isPlaying = false;
        this.song = loadSound(basePath + songPath);
    }
    Button.prototype.render = function () {
        fill(80, 80, 80);
        noStroke();
        rect(this.x - rectWidth / 2, this.y - rectHeight / 2, rectWidth * this.progress / maxProgess, rectHeight);
        stroke(this.hover ? '255' : GRAY);
        strokeWeight(2);
        noFill();
        rect(this.x - rectWidth / 2, this.y - rectHeight / 2, rectWidth, rectHeight);
        textFont('Inter');
        select('canvas').elt.style.letterSpacing = "3px";
        fill(this.hover ? '255' : GRAY);
        strokeWeight(0);
        textSize(15);
        textAlign(LEFT, CENTER);
        text(this.songTitle, this.x - rectWidth / 2 + 50, this.y - rectHeight / 2, rectWidth + 50, rectHeight);
    };
    Button.prototype.step = function () {
        if (this.isHover()) {
            this.hover = true;
            if (this.progress >= maxProgess) {
                this.song.pause();
            }
            else {
                this.progress++;
            }
            if (!this.isPlaying) {
                this.song.play();
                this.song.jump(this.startTime);
                this.song.setVolume(0.01);
                this.isPlaying = true;
            }
        }
        else {
            this.hover = false;
            this.progress = 0;
            if (this.isPlaying) {
                this.song.pause();
                this.isPlaying = false;
            }
        }
    };
    Button.prototype.isHover = function () {
        return (mouseX > this.x - rectWidth / 2 + width / 2) && (mouseX < this.x + rectWidth / 2 + width / 2) && (mouseY > this.y - rectHeight / 2 + height / 2) && (mouseY < this.y + rectHeight / 2 + height / 2);
    };
    Button.prototype.stop = function () {
        this.song.pause();
        this.hover = false;
        this.progress = 0;
        this.isPlaying = false;
    };
    return Button;
}());
var analyzer;
var fft = new p5.FFT();
;
var Walker = (function () {
    function Walker() {
        this.reset();
    }
    Walker.prototype.reset = function () {
        this.tab = new Array();
        this.x = 0;
        this.y = 0;
        this.angle = TWO_PI / 4;
        this.pattern = false;
        this.isPlaying = false;
        if (this.song) {
            this.song.pause();
        }
    };
    Walker.prototype.load = function (songName, params) {
        this.song = loadSound(basePath + songName);
        this.musicParams = params;
        this.reset();
    };
    Walker.prototype.render = function () {
        stroke(0);
        strokeWeight(1);
        for (var i = 0; i < this.tab.length; i++) {
            var el = this.tab[i];
            if (this.tab[i + 1]) {
                line(this.tab[i].x, this.tab[i].y, this.tab[i + 1].x, this.tab[i + 1].y);
                if (this.tab[i].pattern) {
                    for (var j = 0; j < 7; j++) {
                        line(this.tab[i].x, this.tab[i].y + j, this.tab[i + 1].x, this.tab[i + 1].y + j);
                    }
                }
            }
        }
        select('canvas').elt.style.letterSpacing = "0px";
        fill(0);
        strokeWeight(0);
        textSize(15);
        textAlign(CENTER, CENTER);
        text('exit : space', -150 / 2, (height / 2 - 30) - 50 / 2, 150, 50);
    };
    Walker.prototype.step = function () {
        if (!this.isPlaying) {
            if (this.song.isLoaded()) {
                this.song.loop();
                this.song.jump(0);
                this.song.setVolume(0.01);
                this.isPlaying = true;
            }
        }
        var from360toPi = function (angle) {
            return angle * TWO_PI / 360;
        };
        var mapFreq = function (min, max, steps, number) {
            var step = (max - min) / steps;
            var result = Math.ceil((number - min) / step);
            return result > steps ? steps : result <= 0 ? 1 : result;
        };
        fft.analyze();
        if (fft.getEnergy('mid') < 2) {
            return;
        }
        console.log(fft.getEnergy('bass'));
        this.duration = mapFreq(this.musicParams.midMin, this.musicParams.midMax, 4, fft.getEnergy('mid'));
        var randAngle = Math.round(random(-4, 4)) * 45;
        if (randAngle % 90 != 0) {
            this.duration = this.duration * Math.sqrt(2);
        }
        this.pattern = false;
        randAngle = from360toPi(randAngle);
        if (fft.getEnergy('bass') > this.musicParams.bassMin) {
            this.pattern = true;
            this.angle = from360toPi(180);
        }
        this.angle = +randAngle;
        var p, x, y;
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
                var h = mapFreq(this.musicParams.bassMin, this.musicParams.bassMax, 4, fft.getEnergy('bass')) * GRIDSIZE;
                var d = mapFreq(this.musicParams.bassMin, this.musicParams.bassMax, 2, fft.getEnergy('bass')) * GRIDSIZE;
                var n = mapFreq(this.musicParams.bassMin, this.musicParams.bassMax, 3, fft.getEnergy('bass'));
                if (this.x < 0 && (this.x + (n * d * 2) < MAXAREAX) && (this.y - h > -MAXAREAY)) {
                    for (var i = 0; i < n; i++) {
                        this.tab.splice(0, 0, { 'x': this.x, 'y': this.y + h, 'pattern': false, 'dx': x, 'dy': y });
                        this.tab.splice(0, 0, { 'x': this.x + d, 'y': this.y + h, 'pattern': true, 'dx': x, 'dy': y });
                        this.tab.splice(0, 0, { 'x': this.x + d, 'y': this.y, 'pattern': false, 'dx': x, 'dy': y });
                        this.tab.splice(0, 0, { 'x': this.x + d * 2, 'y': this.y, 'pattern': false, 'dx': x, 'dy': y });
                        this.x = this.x + d * 2;
                        for (var j = 0; j < 4; j++) {
                            this.tab.pop();
                        }
                    }
                }
                else if (this.x >= 0 && (this.x + (n * d * 2) > MAXAREAX) && (this.y - h > -MAXAREAY)) {
                    for (var i = 0; i < n; i++) {
                        this.tab.splice(0, 0, { 'x': this.x, 'y': this.y + h, 'pattern': false, 'dx': x, 'dy': y });
                        this.tab.splice(0, 0, { 'x': this.x - d, 'y': this.y + h, 'pattern': true, 'dx': x, 'dy': y });
                        this.tab.splice(0, 0, { 'x': this.x - d, 'y': this.y, 'pattern': false, 'dx': x, 'dy': y });
                        this.tab.splice(0, 0, { 'x': this.x - d * 2, 'y': this.y, 'pattern': false, 'dx': x, 'dy': y });
                        this.x = this.x - d * 2;
                        for (var j = 0; j < 4; j++) {
                            this.tab.pop();
                        }
                    }
                }
            }
        }
    };
    return Walker;
}());
;
var Cursor = (function () {
    function Cursor() {
        this.tab = new Array();
        this.x = -100;
        this.y = -100;
    }
    Cursor.prototype.render = function (white) {
        fill(white ? 0 : 255);
        stroke(white ? 255 : 0);
        strokeWeight(white ? 4 : 2);
        var size;
        for (var i = this.tab.length - 1; i >= 0; i--) {
            var el = this.tab[i];
            size = i / (this.tab.length - 1) * 25;
            square((el.x - size / 2), (el.y - size / 2), size, 2);
        }
    };
    Cursor.prototype.step = function () {
        this.tab.splice(0, 0, { 'x': mouseX - width / 2, 'y': mouseY - height / 2 });
        if (this.tab.length > 10) {
            this.tab.pop();
        }
    };
    return Cursor;
}());
var GRIDSIZE = 30;
var MAXAREAX = 360;
var MAXAREAY = 360;
var DRAWING_FRAMERATE = 60;
var FRAMERATE = 120;
var count = 0;
var drawingMode = false;
var intro = true;
var walker;
var button;
var button2;
var button3;
var button4;
var cursorCustom;
function draw() {
    translate(width / 2, height / 2);
    background(drawingMode ? 255 : 0);
    if (!intro) {
        if (drawingMode) {
            walker.render();
            if (count > FRAMERATE / DRAWING_FRAMERATE) {
                walker.step();
                count = 0;
            }
            else {
                count++;
            }
        }
        else {
            button.step();
            button.render();
            button2.step();
            button2.render();
            button3.step();
            button3.render();
            button4.step();
            button4.render();
        }
    }
    else {
        select('canvas').elt.style.letterSpacing = "0px";
        fill(drawingMode ? 0 : 255);
        strokeWeight(0);
        textSize(30);
        textAlign(CENTER, CENTER);
        text('Click to unlock', 0, 0);
    }
    cursorCustom.step();
    cursorCustom.render(drawingMode ? false : true);
    select('canvas').elt.style.letterSpacing = "0px";
    fill(drawingMode ? 0 : 255);
    strokeWeight(0);
    textSize(15);
    textAlign(CENTER, CENTER);
    text('Project Recoding - Loic Q & Ben R - IMAC1', -500 / 2, -(height / 2 - 30) - 50 / 2, 500, 50);
}
function setup() {
    walker = new Walker();
    button = new Button(0, -150, "Miles Davis - Walkin", "miles-davis-walkin.mp3", 30);
    button2 = new Button(0, -50, "Rocky Volcano - Comme un volcan", "comme-un-volcan.mp3", 23);
    button3 = new Button(0, 50, "Pegboard Nerds - Try This", "try-this.mp3", 23);
    button4 = new Button(0, 150, "Woodkid - Run Boy Run", 'woodkid_run_run.mp3', 18);
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
    if (!intro) {
        if (!drawingMode) {
            if (button.isHover()) {
                button.stop();
                walker.load('miles-davis-walkin.mp3', { midMin: 25, midMax: 50, bassMin: 100, bassMax: 130 });
                drawingMode = true;
            }
            else if (button2.isHover()) {
                button2.stop();
                walker.load('comme-un-volcan.mp3', { midMin: 25, midMax: 50, bassMin: 110, bassMax: 130 });
                drawingMode = true;
            }
            else if (button3.isHover()) {
                button3.stop();
                walker.load('try-this.mp3', { midMin: 25, midMax: 50, bassMin: 110, bassMax: 130 });
                drawingMode = true;
            }
            else if (button4.isHover()) {
                button4.stop();
                walker.load('woodkid_run_run.mp3', { midMin: 25, midMax: 50, bassMin: 95, bassMax: 120 });
                drawingMode = true;
            }
        }
    }
    else {
        intro = false;
    }
}
function windowResized() {
    p6_ResizeCanvas();
}
var __ASPECT_RATIO = 1;
var __MARGIN_SIZE = 25;
function __desiredCanvasWidth() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return windowWidth - __MARGIN_SIZE * 2;
    }
    else {
        return __desiredCanvasHeight() * __ASPECT_RATIO;
    }
}
function __desiredCanvasHeight() {
    var windowRatio = windowWidth / windowHeight;
    if (__ASPECT_RATIO > windowRatio) {
        return __desiredCanvasWidth() / __ASPECT_RATIO;
    }
    else {
        return windowHeight - __MARGIN_SIZE * 2;
    }
}
var __canvas;
function __centerCanvas() {
    __canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}
function p6_CreateCanvas() {
    __canvas = createCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
function p6_ResizeCanvas() {
    resizeCanvas(__desiredCanvasWidth(), __desiredCanvasHeight());
    __centerCanvas();
}
var p6_SaveImageSequence = function (durationInFrames, fileExtension) {
    if (frameCount <= durationInFrames) {
        noLoop();
        var filename_1 = nf(frameCount - 1, ceil(log(durationInFrames) / log(10)));
        var mimeType = (function () {
            switch (fileExtension) {
                case 'png':
                    return 'image/png';
                case 'jpeg':
                case 'jpg':
                    return 'image/jpeg';
            }
        })();
        __canvas.elt.toBlob(function (blob) {
            p5.prototype.downloadFile(blob, filename_1, fileExtension);
            setTimeout(function () { return loop(); }, 100);
        }, mimeType);
    }
};
//# sourceMappingURL=../src/src/build.js.map