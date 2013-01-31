var parser = require("./Parser")


var cheerio = require("cheerio")

var _s = require("underscore.string")
var PUBLIC_DOMAIN = [
    "esa", 
    "nasa", 
    "wikipedia", 
    "edu", 
    "observatory", 
    "gov"
];
var CheerioParser = (function () {
    function CheerioParser() {
    }
    CheerioParser.prototype.parse = function (response) {
        var _this = this;
        var $ = cheerio.load(response.body), $center = $('center');
        var title = $center.eq(1).find('b').eq(0).text(), lores = $center.eq(0).find('a').eq(1).children().attr('SRC'), hires = $center.eq(0).find('a').eq(1).attr('href'), desc = $center.eq(1).next().html();
        if(!title || !desc) {
            console.warn('Cannot parse: ' + response.url);
            return null;
        }
        if(!hires) {
            hires = $center.eq(0).find('iframe').attr('src');
        }
        desc = desc.substring(0, desc.indexOf('<p>'));
        var copyrights = [];
        $('center').eq(1).find('a').each(function (index, element) {
            var name = $(element).text(), url = $(element).attr('href');
            if(!name || !url) {
                console.warn("Cannot parse copyrights of: " + response.url);
                return;
            }
            var publicDomain = _this.isPublicDomain(name, url);
            if(name !== "Copyright") {
                copyrights.push({
                    name: _s.trim(name),
                    url: url,
                    publicDomain: publicDomain
                });
            }
        });
        return {
            title: _s.capitalize(_s.trim(title)),
            description: _s.trim(_s.clean(desc)),
            copyrights: copyrights,
            url: response.url,
            image: {
                loRes: lores,
                hiRes: hires
            }
        };
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
