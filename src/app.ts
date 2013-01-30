import scraper = module("Scraper");
import nodeRequest = module('request/NodeRequester');
import cheerioParse = module('parse/CheerioParser');
import parse = module('parse/Parser');

var apodScraper = new scraper.Scraper(
    new nodeRequest.NodeRequester(),
    new cheerioParse.CheerioParser()
);

apodScraper.scrape(1);