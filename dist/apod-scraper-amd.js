
var apod;
(function (apod) {
    var APODImageImpl = (function () {
        function APODImageImpl(title, description, url, thum) {
            this.title = title;
            this.description = description;
            this.url = url;
            this.thum = thum;
        }
        return APODImageImpl;
    })();
    apod.APODImageImpl = APODImageImpl;    
})(apod || (apod = {}));
var apod;
(function (apod) {
    (function (webRequest) {
        var http = require('http')
        var NodeRequester = (function () {
            function NodeRequester() { }
            NodeRequester.prototype.getPage = function (host, path) {
                var options = {
                    hostname: host,
                    port: 80,
                    path: path,
                    method: 'GET'
                };
                var req = http.request(options, function (res) {
                    console.log('STATUS: ' + res.statusCode);
                    console.log('HEADERS: ' + JSON.stringify(res.headers));
                    res.setEncoding('utf8');
                    res.on('data', function (chunk) {
                        console.log('BODY: ' + chunk);
                    });
                });
                req.end();
                return {
                    url: host + path,
                    code: 400,
                    body: ""
                };
            };
            return NodeRequester;
        })();
        webRequest.NodeRequester = NodeRequester;        
    })(apod.webRequest || (apod.webRequest = {}));
    var webRequest = apod.webRequest;
})(apod || (apod = {}));
var apod;
(function (apod) {
    var Parser = (function () {
        function Parser() {
        }
        Parser.prototype.parse = function (data) {
            return new apod.APODImageImpl("", "", "", "");
        };
        return Parser;
    })();
    apod.Parser = Parser;    
})(apod || (apod = {}));
var apod;
(function (apod) {
    })(apod || (apod = {}));
var apod;
(function (apod) {
    var DAY = 86400000;
    var Scraper = (function () {
        function Scraper(options) {
            this.options = options;
            this.options = this.options || {
                cache: options && options.cache || true,
                url: options && options.url || "http://apod.nasa.gov",
                path: options && options.path || "/apod/ap"
            };
            this.webRequester = new apod.webRequest.NodeRequester();
            this.parser = new apod.Parser();
        }
        Scraper.prototype.scrape = function (depth) {
            if(!depth) {
                return null;
            }
            var scrapedImages = [];
            var date, dateString, requestResult;
            while(depth--) {
                date = new Date();
                date = new Date(date.getTime() - (DAY * depth));
                dateString = this.getDateString(date);
                requestResult = this.webRequester.getPage(this.options.url, this.options.path + dateString + '.html');
                scrapedImages.push(this.parser.parse(""));
            }
            return scrapedImages;
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
    apod.Scraper = Scraper;    
})(apod || (apod = {}));

define("apod-scraper", (function (global) {
    return function () {
        var ret, fn;
        return ret || global.apod;
    };
}(this)));
