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
    p6_CreateCanvas();
}
function windowResized() {
    p6_ResizeCanvas();
}
var p6_ASPECT_RATIO = 1;
var p6_MARGIN_SIZE = 25;
function p6_desiredCanvasWidth() {
    var windowRatio = windowWidth / windowHeight;
    if (p6_ASPECT_RATIO > windowRatio) {
        return windowWidth - p6_MARGIN_SIZE * 2;
    }
    else {
        return p6_desiredCanvasHeight() * p6_ASPECT_RATIO;
    }
}
function p6_desiredCanvasHeight() {
    var windowRatio = windowWidth / windowHeight;
    if (p6_ASPECT_RATIO > windowRatio) {
        return p6_desiredCanvasWidth() / p6_ASPECT_RATIO;
    }
    else {
        return windowHeight - p6_MARGIN_SIZE * 2;
    }
}
var p6_canvas;
function p6_centerCanvas() {
    p6_canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
}
function p6_CreateCanvas() {
    p6_canvas = createCanvas(p6_desiredCanvasWidth(), p6_desiredCanvasHeight());
    p6_centerCanvas();
}
function p6_ResizeCanvas() {
    resizeCanvas(p6_desiredCanvasWidth(), p6_desiredCanvasHeight());
    p6_centerCanvas();
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
        canvas.elt.toBlob(function (blob) {
            p5.prototype.downloadFile(blob, filename_1, fileExtension);
            setTimeout(function () { return loop(); }, 100);
        }, mimeType);
    }
};
//# sourceMappingURL=../src/src/build.js.map