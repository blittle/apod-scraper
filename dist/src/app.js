var scraper = require("./Scraper")
var nodeRequest = require("./request/NodeRequester")
var cheerioParse = require("./parse/CheerioParser")


var db = require("./db/MongoDatabase")
var mdb = new db.MongoDatabase();
var apodScraper = new scraper.Scraper(new nodeRequest.NodeRequester(), new cheerioParse.CheerioParser());
var saveImage = function (image) {
    mdb.saveImage(image);
};
apodScraper.scrapeToday(saveImage);
