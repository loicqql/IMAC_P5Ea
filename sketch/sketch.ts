function setup() {
    createCanvas(windowWidth, windowHeight)
}

function draw() {
    ellipse(mouseX, mouseY, 30)
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight)
}