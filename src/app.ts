import scraper = module("Scraper");
import nodeRequest = module('request/NodeRequester');
import jqueryParse = module('parse/JQueryParser');
import parse = module('parse/Parser');

var apodScraper = new scraper.Scraper(
    new nodeRequest.NodeRequester(),
    new jqueryParse.JQueryParser()
);


apodScraper.scrape(10);