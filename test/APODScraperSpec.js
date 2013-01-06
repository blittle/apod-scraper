var apod = require("../build/apod-scraper.js");

describe("APOD Scraper", function() {
    "use strict";

    it("Module should exist", function() {
        expect(apod).toBeDefined();
    });

    it("Should create a new scraper", function() {
        console.log(apod);
        var apodScraper = new apod.Scraper();

        expect(apodScraper.options).toBeDefined();
        expect(apodScraper.scrape).toBeDefined();
    });

});