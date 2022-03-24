var basePath = "../assets/";
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
        textSize(18);
        textAlign(CENTER, CENTER);
        text(this.songTitle, this.x - rectWidth / 1.7, this.y - rectHeight / 2, rectWidth, rectHeight);
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
var def2PI = 6.28318530717958647693;
var defPI = def2PI / 2;
var analyzer;
;
var Walker = (function () {
    function Walker() {
        this.reset();
    }
    Walker.prototype.reset = function () {
        this.tab = new Array();
        this.x = 0;
        this.y = 0;
        this.angle = def2PI / 4;
        this.pattern = false;
        this.isPlaying = false;
        if (this.song) {
            this.song.pause();
        }
    };
    Walker.prototype.load = function (songName) {
        this.song = loadSound(basePath + songName);
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
        text('exit : space', 0 - 150 / 2, (height / 2 - 30) - 50 / 2, 150, 50);
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
        if (analyzer) {
            console.log(analyzer.getLevel());
        }
        var from360toPi = function (angle) {
            return angle * def2PI / 360;
        };
        this.duration = Math.round(random(1, 4));
        this.pattern = false;
        var randAngle = Math.round(random(-4, 4)) * 45;
        if (randAngle % 90 != 0) {
            this.duration = this.duration * Math.sqrt(2);
        }
        if (randAngle % 180 == 0) {
            this.pattern = Math.round(random(0, 3)) ? false : true;
        }
        randAngle = from360toPi(randAngle);
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
                var h = Math.round(random(1, 5)) * GRIDSIZE;
                var d = Math.round(random(1, 2)) * GRIDSIZE;
                var n = Math.round(random(1, 3));
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
var DRAWING_FRAMERATE = 20;
var FRAMERATE = 120;
var count = 0;
var drawingMode = false;
var walker;
var button;
var button2;
var button3;
var cursorCustom;
function draw() {
    translate(width / 2, height / 2);
    background(drawingMode ? 255 : 0);
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
    }
    cursorCustom.step();
    cursorCustom.render(drawingMode ? false : true);
}
function setup() {
    walker = new Walker();
    button = new Button(0, -100, "Da Tweekaz - Jägermeister", "jagermeister.mp3", 30);
    button2 = new Button(0, 0, "Pegboard Nerds - Try This", "try-this.mp3", 23);
    button3 = new Button(0, 100, "Woodkid - Run Boy Run", 'woodkid_run_run.mp3', 18);
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
    if (!drawingMode) {
        if (button.isHover()) {
            button.stop();
            walker.load('jagermeister.mp3');
            drawingMode = true;
        }
        else if (button2.isHover()) {
            button2.stop();
            walker.load('try-this.mp3');
            drawingMode = true;
        }
        if (button3.isHover()) {
            button3.stop();
            walker.load('woodkid_run_run.mp3');
            drawingMode = true;
        }
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