var parser = require("./Parser")
var image = require("../image/Image")
var JQueryParser = (function () {
    function JQueryParser() {
    }
    JQueryParser.prototype.parse = function (data) {
        return new image.APODImage("", "", "", "");
    };
    return JQueryParser;
})();
exports.JQueryParser = JQueryParser;
