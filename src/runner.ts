import scraper = module("Scraper");
import nodeRequest = module('request/NodeRequester');
import cheerioParse = module('parse/CheerioParser');
import parse = module('parse/Parser');

import Image = module('image/Image');
import db = module('db/MongoDatabase');

var mdb = new db.MongoDatabase();

var apodScraper = new scraper.Scraper(
    new nodeRequest.NodeRequester(),
    new cheerioParse.CheerioParser()
);

var date;

var saveImage = function(image: Image.APODImage) {
    if(image) {
        date = image.date;
        mdb.saveImage(image);
    } else {
        console.warn("cannot parse an image from the day after " + date);
    }
};

var cmd = process.argv[2],
    value : any = process.argv[3];

if( cmd === '-c' ) {
    // Continuous Mode
    value = (value ? value * 1 : 86400000);

    console.log("Scraping at an interval of: " + value + " milliseconds");

    setInterval(()=> {
        apodScraper.scrapeToday(saveImage);
    }, value);

} else if( cmd === '-d' ) {
    // Process specific date
    console.log("Scraping date " + (value || new Date()) );
    if(value) {
        apodScraper.scrapeDate(new Date(value), saveImage);
    } else {
        apodScraper.scrapeToday(saveImage);
    }

} else if( cmd === '-p' ) {
    // Process past amount of days
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