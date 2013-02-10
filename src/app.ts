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

//mdb.getImagesRange(new Date(2012, 9, 1), (error: Error, image : Image.APODImage) => {
//   console.log(image);
//});

//apodScraper.scrapeToday(saveImage);
//
apodScraper.scrape(365, saveImage);

//setInterval(()=>{
//
//    mdb.getImage(new Date(), (error: Error, image : Image.APODImage) => {
//       console.log(image);
//    });
//
//}, 1000);