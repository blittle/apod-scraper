var parser = require("./Parser")
var image = require("../image/Image")
var cheerio = require("cheerio")

var PUBLIC_DOMAIN = [
    "esa", 
    "nasa", 
    "wikipedia", 
    "edu"
];
var CheerioParser = (function () {
    function CheerioParser() {
    }
    CheerioParser.prototype.parse = function (data) {
        var _this = this;
        var $ = cheerio.load(data);
        var title = $('center').eq(1).find('b').eq(0).text();
        var copyrights = [];
        $('center').eq(1).find('a').each(function (index, element) {
            var name = $(element).text();
            var url = $(element).attr('href');
            var publicDomain = _this.isPublicDomain(name, url);
            if(name !== "Copyright") {
                copyrights.push({
                    name: name,
                    url: url,
                    publicDomain: publicDomain
                });
                console.log(name, url, publicDomain);
            }
        });
        return new image.APODImage("", "", "", "");
    };
    CheerioParser.prototype.isPublicDomain = function (name, url) {
        name = name.toLowerCase();
        for(var i = 0; i < PUBLIC_DOMAIN.length; i++) {
            if(name.indexOf(PUBLIC_DOMAIN[i]) !== -1 || url.indexOf(PUBLIC_DOMAIN[i]) !== -1) {
                return true;
            }
        }
        return false;
    };
    return CheerioParser;
})();
exports.CheerioParser = CheerioParser;
