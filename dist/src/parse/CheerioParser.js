var parser = require("./Parser")
var image = require("../image/Image")
var cheerio = require("cheerio")
var CheerioParser = (function () {
    function CheerioParser() {
    }
    CheerioParser.prototype.parse = function (data) {
        cheerio.load(data);
        return new image.APODImage("", "", "", "");
    };
    return CheerioParser;
})();
exports.CheerioParser = CheerioParser;
