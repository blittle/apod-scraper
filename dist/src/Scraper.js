var DAY = 86400000;



var _ = require('underscore')
var Scraper = (function () {
    function Scraper(requester, parser, options) {
        if (typeof options === "undefined") { options = {
        }; }
        this.requester = requester;
        this.parser = parser;
        this.options = options;
        this.options = _.extend({
            cache: options && options.cache || true,
            url: options && options.url || "apod.nasa.gov",
            path: options && options.path || "/apod/ap"
        }, this.options);
    }
    Scraper.prototype.scrape = function (depth) {
        var scrapedImages = [];
        var date, dateString, parser = this.parser;
        while(depth--) {
            date = new Date();
            date = new Date(date.getTime() - (DAY * depth));
            dateString = this.getDateString(date);
            this.requester.getPage(this.options.url, this.options.path + dateString + '.html', function (data) {
                scrapedImages.push(parser.parse(data.body));
            });
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
