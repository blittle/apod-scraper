var parser = require("./Parser")
var image = require("../image/Image")
var jquery = require("jQuery")
var JQueryParser = (function () {
    function JQueryParser() {
    }
    JQueryParser.prototype.parse = function (data) {
        jquery.$("<div></div>");
        return new image.APODImage("", "", "", "");
    };
    return JQueryParser;
})();
exports.JQueryParser = JQueryParser;
