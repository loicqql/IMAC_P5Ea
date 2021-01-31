
let posX = 0
let saving = false

// Hello
const mySave = function(filename: string, extension: string) {
    noLoop()
    let mimeType;
    switch (extension) {
      default:
        //case 'png':
        mimeType = 'image/png';
        break;
      case 'jpeg':
      case 'jpg':
        mimeType = 'image/jpeg';
        break;
    }
    // @ts-ignore
    canvas.elt.toBlob((blob, err) => {
        // @ts-ignore
      p5.prototype.downloadFile(blob, filename, extension);
      loop();
    }, mimeType);
  };

function setup() {
    template_CreateCanvas()
}

function draw() {
    background(0)
    ellipse(posX, height/2, 30)
    posX += 1
    if (frameCount < 200)
        mySave(nf(frameCount, 3), "png")
}

function windowResized() {
    //template_ResizeCanvas()
}

function keyPressed() {
    if (key==' ') {
        saving = !saving
        loop()
    }
}