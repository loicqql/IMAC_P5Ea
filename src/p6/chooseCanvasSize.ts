// -------------------
// Choose how your canvas will fit in the window
// You can uncomment the option you want, and comment the others
// -------------------

// -------------------
// Option 1 : Canvas with a fixed aspect ratio
// -------------------
const ASPECT_RATIO = 1
const MARGIN_SIZE = 25 // in pixels

function desiredCanvasWidth(): number {
    const windowRatio = windowWidth / windowHeight
    if (ASPECT_RATIO > windowRatio) {
        return windowWidth - MARGIN_SIZE * 2
    }
    else {
        return desiredCanvasHeight() * ASPECT_RATIO
    }
}
function desiredCanvasHeight(): number {
    const windowRatio = windowWidth / windowHeight
    if (ASPECT_RATIO > windowRatio) {
        return desiredCanvasWidth() / ASPECT_RATIO
    }
    else {
        return windowHeight - MARGIN_SIZE * 2
    }
}

// -------------------
// Option 2 : Canvas that fills the window
// -------------------
// const MARGIN_SIZE = 0 // in pixels

// function desiredCanvasWidth(): number {
//     return windowWidth - MARGIN_SIZE * 2
// }
// function desiredCanvasHeight(): number {
//     return windowHeight - MARGIN_SIZE * 2
// }


// -------------------
// You don't need to touch the code bellow ;)
// -------------------
let canvas: p5.Renderer // Need to access this each time we resize the window, to center the canvas

function _centerCanvas() {
    canvas.position((windowWidth - width)/2, (windowHeight - height)/2)
}
function template_CreateCanvas() {
    canvas = createCanvas(desiredCanvasWidth(), desiredCanvasHeight())
    _centerCanvas()
}
function template_ResizeCanvas() {
    resizeCanvas(desiredCanvasWidth(), desiredCanvasHeight())
    _centerCanvas()
}