var GRIDSIZE = 20;
var def2PI = 6.28318530717958647693;
var defPI = def2PI / 2;
;
var Walker = (function () {
    function Walker() {
        this.angle = def2PI / 4;
        this.tab = new Array();
        this.x = Math.round(random(-300, 300));
        this.y = Math.round(random(-300, 300));
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
        this.duration = Math.round(random(1, 5));
        var randAngle = Math.round(random(-3, 3)) * 45;
        if (randAngle % 90 != 0) {
            this.duration = this.duration * Math.sqrt(2);
        }
        randAngle = randAngle * def2PI / 360;
        this.angle = +randAngle;
        var p = p5.Vector.fromAngle(this.angle).mult(GRIDSIZE * this.duration);
        this.x = this.x + p.x;
        this.y = this.y + p.y;
        this.tab.splice(0, 0, { 'x': this.x, 'y': this.y });
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
    frameRate(30);
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