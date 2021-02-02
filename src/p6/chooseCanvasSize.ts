// -------------------
// Choose how your canvas will fit in the window
// You can uncomment the option you want, and comment the others
// -------------------

// -------------------
// Option 1 : Canvas with a fixed aspect ratio
// -------------------
const p6_ASPECT_RATIO = 1
const p6_MARGIN_SIZE = 25 // in pixels

function p6_desiredCanvasWidth(): number {
    const windowRatio = windowWidth / windowHeight
    if (p6_ASPECT_RATIO > windowRatio) {
        return windowWidth - p6_MARGIN_SIZE * 2
    }
    else {
        return p6_desiredCanvasHeight() * p6_ASPECT_RATIO
    }
}
function p6_desiredCanvasHeight(): number {
    const windowRatio = windowWidth / windowHeight
    if (p6_ASPECT_RATIO > windowRatio) {
        return p6_desiredCanvasWidth() / p6_ASPECT_RATIO
    }
    else {
        return windowHeight - p6_MARGIN_SIZE * 2
    }
}

// -------------------
// Option 2 : Canvas that fills the window
// -------------------
// const p6_MARGIN_SIZE = 0 // in pixels

// function p6_desiredCanvasWidth(): number {
//     return windowWidth - p6_MARGIN_SIZE * 2
// }
// function p6_desiredCanvasHeight(): number {
//     return windowHeight - p6_MARGIN_SIZE * 2
// }


// -------------------
// You don't need to touch the code bellow ;)
// -------------------
let p6_canvas: p5.Renderer // Need to access this each time we resize the window, to center the canvas

function p6_centerCanvas() {
    p6_canvas.position((windowWidth - width)/2, (windowHeight - height)/2)
}
function p6_CreateCanvas() {
    p6_canvas = createCanvas(p6_desiredCanvasWidth(), p6_desiredCanvasHeight())
    p6_centerCanvas()
}
function p6_ResizeCanvas() {
    resizeCanvas(p6_desiredCanvasWidth(), p6_desiredCanvasHeight())
    p6_centerCanvas()
}