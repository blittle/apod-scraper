var image = require("../image/Image")
var GenericParser = (function () {
    function GenericParser() {
    }
    GenericParser.prototype.parse = function (data) {
        return new image.APODImage("", "", "", "");
    };
    return GenericParser;
})();
exports.GenericParser = GenericParser;
