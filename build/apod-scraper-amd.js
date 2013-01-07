
var apod;
(function (apod) {
    (function (FileStream) {
        function test() {
        }
        FileStream.test = test;
    })(apod.FileStream || (apod.FileStream = {}));
    var FileStream = apod.FileStream;
})(apod || (apod = {}));
var apod;
(function (apod) {
    (function (image) {
        var APODImageImpl = (function () {
            function APODImageImpl(title, description, url, thum) {
                this.title = title;
                this.description = description;
                this.url = url;
                this.thum = thum;
            }
            return APODImageImpl;
        })();
        image.APODImageImpl = APODImageImpl;        
    })(apod.image || (apod.image = {}));
    var image = apod.image;
})(apod || (apod = {}));
var apod;
(function (apod) {
    (function (parser) {
        var Parser = (function () {
            function Parser() { }
            Parser.prototype.parse = function () {
                return null;
            };
            return Parser;
        })();
        parser.Parser = Parser;        
    })(apod.parser || (apod.parser = {}));
    var parser = apod.parser;
})(apod || (apod = {}));
var apod;
(function (apod) {
    var DAY = 86400000;
    var Scraper = (function () {
        function Scraper(options) {
            this.options = options;
        }
        Scraper.prototype.scrape = function (depth) {
            var scrapedImages = [];
            var date;
            while(depth--) {
                date = new Date();
                date = new Date(date.getTime() - (DAY * depth));
                console.log(date.getYear() + "" + (date.getMonth() + 1) + "" + date.getDate());
            }
            return scrapedImages;
        };
        return Scraper;
    })();
    apod.Scraper = Scraper;    
})(apod || (apod = {}));

define("apod-scraper", (function (global) {
    return function () {
        var ret, fn;
        return ret || global.apod;
    };
}(this)));
