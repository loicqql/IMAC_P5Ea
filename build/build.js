var template_SaveImageSequence = function (durationInFrames, fileExtension) {
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
        canvas.elt.toBlob(function (blob) {
            p5.prototype.downloadFile(blob, filename_1, fileExtension);
            setTimeout(function () { return loop(); }, 100);
        }, mimeType);
    }
};
var ASPECT_RATIO = 1;
var MARGIN_SIZE = 25;
function desiredCanvasWidth() {
    var windowRatio = windowWidth / windowHeight;
    if (ASPECT_RATIO > windowRatio) {
        return windowWidth - MARGIN_SIZE * 2;
    }
    else {
        return desiredCanvasHeight() * ASPECT_RATIO;
    }
}
function desiredCanvasHeight() {
    var windowRatio = windowWidth / windowHeight;
    if (ASPECT_RATIO > windowRatio) {
        return desiredCanvasWidth() / ASPECT_RATIO;
    }
    else {
        return windowHeight - MARGIN_SIZE * 2;
    }
}
var canvas;
function _centerCanvas() {
    canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}
function template_CreateCanvas() {
    canvas = createCanvas(desiredCanvasWidth(), desiredCanvasHeight());
    _centerCanvas();
}
function template_ResizeCanvas() {
    resizeCanvas(desiredCanvasWidth(), desiredCanvasHeight());
    _centerCanvas();
}
var gui = new dat.GUI();
var params = {
    Ellipse_Size: 30,
    Download_Image: function () { return save(); },
};
gui.add(params, "Ellipse_Size", 0, 100, 1);
gui.add(params, "Download_Image");
function draw() {
    background(0);
    ellipse(mouseX, mouseY, params.Ellipse_Size);
}
function setup() {
    template_CreateCanvas();
}
function windowResized() {
    template_ResizeCanvas();
}
//# sourceMappingURL=../src/src/build.js.map