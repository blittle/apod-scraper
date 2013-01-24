var scraper = require("./Scraper")
var nodeRequest = require("./request/NodeRequester")
var cheerioParse = require("./parse/CheerioParser")

var apodScraper = new scraper.Scraper(new nodeRequest.NodeRequester(), new cheerioParse.CheerioParser());
apodScraper.scrape(20);
