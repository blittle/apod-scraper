var scraper = require("./Scraper")
var nodeRequest = require("./request/NodeRequester")
var cheerioParse = require("./parse/CheerioParser")


var db = require("./db/MongoDatabase")
var mdb = new db.MongoDatabase();
var apodScraper = new scraper.Scraper(new nodeRequest.NodeRequester(), new cheerioParse.CheerioParser());
var date;
var saveImage = function (image) {
    if(image) {
        date = image.date;
        mdb.saveImage(image);
    } else {
        console.warn("cannot parse an image from the day after " + date);
    }
};
apodScraper.scrape(365, saveImage);
