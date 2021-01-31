
function setup() {
    template_CreateCanvas()
}

function draw() {
    background(0)
    ellipse(mouseX, mouseY, 30)
}

function windowResized() {
    template_ResizeCanvas()
}