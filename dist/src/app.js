var scraper = require("./Scraper")
var nodeRequest = require("./request/NodeRequester")
var jqueryParse = require("./parse/JQueryParser")

var apodScraper = new scraper.Scraper(new nodeRequest.NodeRequester(), new jqueryParse.JQueryParser());
apodScraper.scrape(10);
