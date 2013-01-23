var DAY = 86400000;
var parse = require("./parse/Parser")
var nodeRequest = require("./request/NodeRequester")


var Scraper = (function () {
    function Scraper(options) {
        this.options = options;
        this.options = this.options || {
            cache: options && options.cache || true,
            url: options && options.url || "http://apod.nasa.gov",
            path: options && options.path || "/apod/ap"
        };
        this.webRequester = new nodeRequest.NodeRequester();
        this.parser = new parse.Parser();
    }
    Scraper.prototype.scrape = function (depth) {
        var scrapedImages = [];
        var date, dateString, requestResult;
        while(depth--) {
            date = new Date();
            date = new Date(date.getTime() - (DAY * depth));
            dateString = this.getDateString(date);
            requestResult = this.webRequester.getPage(this.options.url, this.options.path + dateString + '.html');
            scrapedImages.push(this.parser.parse(""));
        }
        return [];
    };
    Scraper.prototype.getDateString = function (date) {
        var dateString = (date.getFullYear() + "").substring(2);
        if(date.getMonth() < 9) {
            dateString += "0" + (date.getMonth() + 1);
        } else {
            dateString += (date.getMonth() + 1);
        }
        if(date.getDate() < 10) {
            dateString += "0" + date.getDate();
        } else {
            dateString += date.getDate();
        }
        return dateString;
    };
    return Scraper;
})();
exports.Scraper = Scraper;