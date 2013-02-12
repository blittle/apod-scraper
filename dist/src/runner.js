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
var cmd = process.argv[2], value = process.argv[3];
if(cmd === '-c') {
    value = (value ? value * 1 : 86400000);
    console.log("Scraping at an interval of: " + value + " milliseconds");
    setInterval(function () {
        apodScraper.scrapeToday(saveImage);
    }, value);
} else {
    if(cmd === '-d') {
        console.log("Scraping date " + (value || new Date()));
        if(value) {
            apodScraper.scrapeDate(new Date(value), saveImage);
        } else {
            apodScraper.scrapeToday(saveImage);
        }
    } else {
        if(cmd === '-p') {
            value = value ? value * 1 : 1;
            console.log("Scraping past " + value + " days");
            apodScraper.scrape(value, saveImage);
        } else {
            console.log("APOD Scraper - Author Bret Little");
            console.log("======================================================================================");
            console.log("-c milliseconds - Scrape continuously every specified milliseconds - defaults to a day");
            console.log("-d date - Scrape a specificc date - defaults to today");
            console.log("-p count - Scrape the past days, given a count - defaults to 1");
        }
    }
}
