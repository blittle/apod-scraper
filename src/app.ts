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

var saveImage = function(image: Image.APODImage) {
    mdb.saveImage(image);
};

apodScraper.scrapeToday(saveImage);