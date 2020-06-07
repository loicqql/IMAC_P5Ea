import { ColorHelper } from "./ColorHelper";
import * as p5 from "p5";
import Default from "./import-example";
import { log, logClass } from "./import-example";

// TEST IMPORTS
new Default().log();
log();
new logClass().log();

let sketch = (p: p5) => {
  // GLOBAL VARS & TYPES
  let numberOfShapes = 15;
  let speed: p5.Element;
  p.setup = () => {
    console.log("🚀 - Setup initialized - P5 is running");

    // FULLSCREEN CANVAS
    p.createCanvas(p.windowWidth, p.windowHeight);

    // SETUP SOME OPTIONS
    p.rectMode(p.CENTER).noFill().frameRate(30);

    // SPEED SLIDER
    speed = p.createSlider(0, 15, 3, 1);
    speed.position(10, 10);
    speed.style("width", "80px");
  };

  p.draw = () => {
    // CLEAR BACKGROUND
    p.background(0);
    // TRANSLATE TO CENTER OF SCREEN
    p.translate(p.width / 2, p.height / 2);

    const colorsArr = ColorHelper.getColorsArray(p, numberOfShapes);
    const baseSpeed = (p.frameCount / 500) * <number>speed.value();
    for (var i = 0; i < numberOfShapes; i++) {
      const npoints = 3 + i;
      const radius = 20 * i;
      const angle = p.TWO_PI / npoints;
      const spin = baseSpeed * (numberOfShapes - i);

      p.strokeWeight(3 + i).stroke(colorsArr[i]);

      p.push();
      p.rotate(spin);
      // DRAW
      p.beginShape();
      for (let a = 0; a < p.TWO_PI; a += angle) {
        let sx = p.cos(a) * radius;
        let sy = p.sin(a) * radius;
        p.vertex(sx, sy);
      }
      p.endShape(p.CLOSE);
      // END:DRAW
      p.pop();
    }
  };

  p.windowResized = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
  };
};

new p5(sketch);
