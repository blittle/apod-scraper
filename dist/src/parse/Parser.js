var image = require("../image/Image")
var Parser = (function () {
    function Parser() {
    }
    Parser.prototype.parse = function (data) {
        return new image.APODImageImpl("", "", "", "");
    };
    return Parser;
})();
exports.Parser = Parser;
