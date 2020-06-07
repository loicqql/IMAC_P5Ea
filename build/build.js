define("ColorHelper", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ColorHelper = (function () {
        function ColorHelper() {
        }
        ColorHelper.getColorVector = function (c) {
            return createVector(red(c), green(c), blue(c));
        };
        ColorHelper.rainbowColorBase = function () {
            return [
                color("red"),
                color("orange"),
                color("yellow"),
                color("green"),
                color(38, 58, 150),
                color("indigo"),
                color("violet"),
            ];
        };
        ColorHelper.getColorsArray = function (total, baseColorArray) {
            var _this = this;
            if (baseColorArray === void 0) { baseColorArray = null; }
            if (baseColorArray == null) {
                baseColorArray = ColorHelper.rainbowColorBase();
            }
            var rainbowColors = baseColorArray.map(function (x) { return _this.getColorVector(x); });
            var colours = new Array();
            for (var i = 0; i < total; i++) {
                var colorPosition = i / total;
                var scaledColorPosition = colorPosition * (rainbowColors.length - 1);
                var colorIndex = Math.floor(scaledColorPosition);
                var colorPercentage = scaledColorPosition - colorIndex;
                var nameColor = this.getColorByPercentage(rainbowColors[colorIndex], rainbowColors[colorIndex + 1], colorPercentage);
                colours.push(color(nameColor.x, nameColor.y, nameColor.z));
            }
            return colours;
        };
        ColorHelper.getColorByPercentage = function (firstColor, secondColor, percentage) {
            var firstColorCopy = firstColor.copy();
            var secondColorCopy = secondColor.copy();
            var deltaColor = secondColorCopy.sub(firstColorCopy);
            var scaledDeltaColor = deltaColor.mult(percentage);
            return firstColorCopy.add(scaledDeltaColor);
        };
        return ColorHelper;
    }());
    exports.ColorHelper = ColorHelper;
});
define("import-example", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function log() {
        console.log("LOG FUNCTION");
    }
    exports.log = log;
    var logClass = (function () {
        function logClass() {
        }
        logClass.prototype.log = function () {
            console.log("LOG CLASS");
        };
        return logClass;
    }());
    exports.logClass = logClass;
    var defaultClass = (function () {
        function defaultClass() {
        }
        defaultClass.prototype.log = function () {
            console.log("DEFAULT CLASS");
        };
        return defaultClass;
    }());
    exports.default = defaultClass;
});
define("sketch", ["require", "exports", "import-example", "import-example", "ColorHelper"], function (require, exports, import_example_1, import_example_2, ColorHelper_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    new import_example_1.default().log();
    import_example_2.log();
    new import_example_2.logClass().log();
    var numberOfShapes = 15;
    var speed;
    function setup() {
        console.log("🚀 - Setup initialized - P5 is running");
        createCanvas(windowWidth, windowHeight);
        rectMode(CENTER).noFill().frameRate(30);
        speed = createSlider(0, 15, 3, 1);
        speed.position(10, 10);
        speed.style("width", "80px");
    }
    function draw() {
        background(0);
        translate(width / 2, height / 2);
        var colorsArr = ColorHelper_1.ColorHelper.getColorsArray(numberOfShapes);
        var baseSpeed = (frameCount / 500) * speed.value();
        for (var i = 0; i < numberOfShapes; i++) {
            var npoints = 3 + i;
            var radius = 20 * i;
            var angle = TWO_PI / npoints;
            var spin = baseSpeed * (numberOfShapes - i);
            strokeWeight(3 + i).stroke(colorsArr[i]);
            push();
            rotate(spin);
            beginShape();
            for (var a = 0; a < TWO_PI; a += angle) {
                var sx = cos(a) * radius;
                var sy = sin(a) * radius;
                vertex(sx, sy);
            }
            endShape(CLOSE);
            pop();
        }
    }
    function windowResized() {
        createCanvas(windowWidth, windowHeight);
    }
});
//# sourceMappingURL=build.js.map