var DAY = 86400000;



var utils = require("./utils/APODUtils")
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
    Scraper.prototype.scrape = function (depth, callback) {
        var date, dateString, parser = this.parser;
        while(depth--) {
            date = new Date();
            date = new Date(date.getTime() - (DAY * depth));
            dateString = utils.APODUtils.getDateString(date);
            this.requester.getPage(this.options.url, this.options.path + dateString + '.html', utils.APODUtils.getNormalizedDate(date), function (data) {
                callback(parser.parse(data));
            });
        }
        return [];
    };
    Scraper.prototype.scrapeToday = function (callback) {
        this.scrapeDate(new Date(), callback);
    };
    Scraper.prototype.scrapeDate = function (date, callback) {
        var dateString = utils.APODUtils.getDateString(new Date()), parser = this.parser;
        this.requester.getPage(this.options.url, this.options.path + dateString + '.html', utils.APODUtils.getNormalizedDate(new Date()), function (data) {
            callback(parser.parse(data));
        });
    };
    return Scraper;
})();
exports.Scraper = Scraper;
