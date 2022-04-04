var GRIDSIZE = 3;
var MAXAREAX = 50;
var MAXAREAY = 50;
var def2PI = 6.28318530717958647693;
var defPI = def2PI / 2;
;
var capturer = new CCapture({
    framerate: 5,
    format: "jpg",
    name: "exportHorizontalLines",
    quality: 100,
    verbose: true,
});
var Walker = (function () {
    function Walker() {
        this.angle = def2PI / 4;
        this.pattern = false;
        this.tab = new Array();
        this.x = 0;
        this.y = 0;
    }
    Walker.prototype.clear = function () {
        this.tab = new Array();
        this.x = 0;
        this.y = 0;
    };
    Walker.prototype.render = function () {
        for (var i = 0; i < this.tab.length; i++) {
            var el = this.tab[i];
            if (this.tab[i + 1]) {
                stroke(0.5);
                line(this.tab[i].x, this.tab[i].y, this.tab[i + 1].x, this.tab[i + 1].y);
                if (this.tab[i].pattern) {
                    for (var j = 0; j < 3; j++) {
                        line(this.tab[i].x, this.tab[i].y + j, this.tab[i + 1].x, this.tab[i + 1].y + j);
                    }
                }
            }
        }
    };
    Walker.prototype.step = function () {
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
var w;
function draw() {
    if (frameCount === 1)
        capturer.start();
    background(255);
    translate(width / 2, height / 2);
    for (var i = 0; i < 70; i++) {
        w.step();
    }
    w.render();
    w.clear();
    capturer.capture(canvas);
    if (frameCount === 10000) {
        noLoop();
        capturer.stop();
        capturer.save();
    }
}
function setup() {
    w = new Walker();
    frameRate(15);
    p6_CreateCanvas();
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
    __canvas = createCanvas(64, 64);
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