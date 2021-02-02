
// You simply have to call this function at the end of your draw() function
// It will automatically stop after exporting the desired number of frames (a.k.a. durationInFrames)

const p6_SaveImageSequence = function(durationInFrames: number, fileExtension: "png" | "jpg" | "jpeg") {
    if (frameCount <= durationInFrames) {
        noLoop()
        const filename = nf(frameCount-1, ceil(log(durationInFrames) / log(10)))
        const mimeType = (() => {
            switch (fileExtension) {
                case 'png':
                    return 'image/png'
                case 'jpeg':
                case 'jpg':
                    return 'image/jpeg'
            }
        })()
        // @ts-ignore
        canvas.elt.toBlob(blob => {
            p5.prototype.downloadFile(blob, filename, fileExtension)
            setTimeout(() => loop(), 100)
        }, mimeType)
    }
}