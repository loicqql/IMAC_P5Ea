var GRIDSIZE = 15;
var MAXAREAX = 360;
var MAXAREAY = 360;
var def2PI = 6.28318530717958647693;
var defPI = def2PI / 2;
;
var Walker = (function () {
    function Walker() {
        this.angle = def2PI / 4;
        this.tab = new Array();
        this.x = 0;
        this.y = 0;
    }
    Walker.prototype.render = function () {
        for (var i = 0; i < this.tab.length; i++) {
            var el = this.tab[i];
            if (this.tab[i + 1]) {
                stroke(5);
                line(this.tab[i].x, this.tab[i].y, this.tab[i + 1].x, this.tab[i + 1].y);
            }
        }
    };
    Walker.prototype.step = function () {
        var from360toPi = function (angle) {
            return angle * def2PI / 360;
        };
        this.duration = Math.round(random(1, 3));
        var randAngle = Math.round(random(-4, 4)) * 45;
        if (randAngle % 90 != 0) {
            this.duration = this.duration * Math.sqrt(2);
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
        this.x = x + p.x;
        this.y = y + p.y;
        if (this.tab.length > 100) {
            this.tab.pop();
        }
        if (this.duration != 0) {
            this.tab.splice(0, 0, { 'x': this.x, 'y': this.y });
        }
        ellipse(-300, -300, 25, 25);
        ellipse(300, 300, 25, 25);
        ellipse(300, -300, 25, 25);
        ellipse(-300, 300, 25, 25);
    };
    return Walker;
}());
var w;
function draw() {
    background(255);
    translate(width / 2, height / 2);
    w.step();
    w.render();
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