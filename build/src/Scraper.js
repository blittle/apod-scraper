var apod;
(function (apod) {
    (function (scraper) {
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
        scraper.Scraper = Scraper;        
    })(apod.scraper || (apod.scraper = {}));
    var scraper = apod.scraper;
})(apod || (apod = {}));
