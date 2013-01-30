var CheerioParser = require("../../dist/src/parse/CheerioParser").CheerioParser;

var fs = require('fs');
var _s = require('underscore.string');

var testPage1 = fs.readFileSync("spec/parse/testPage1.html");

describe("APOD Scraper", function() {

    var parser, image;

    beforeEach(function() {
        parser = new CheerioParser();

        image = parser.parse({
            code: 200,
            url: "parse/testPage1.html",
            body: testPage1
        });
    });

    afterEach(function() {

    });

    it("Should include a parse method", function() {
       expect(parser.parse).toBeDefined();
    });

    it("Should parse an image title", function() {
        expect(image.title).toEqual("Full Moon Silhouettes");
    });

    it("Should parse an image description", function() {
        expect(_s.stripTags(image.description)).toEqual(" Explanation:  Have you ever watched the Moon rise? The slow rise of a nearly full moon over a cle" +
            "ar horizon can be an impressive sight. One impressive moonrise was imaged two nights ago over Mount " +
            "Victoria Lookout in Wellington, New Zealand. With detailed planning, an industrious astrophotographe" +
            "r placed a camera about two kilometers away and pointed it across the lookout to where the Moon woul" +
            "d surely soon be making its nightly debut. The above single shot sequence is unedited and shown in r" +
            "eal time -- it is not a time lapse. People on Mount Victoria Lookout can be seen in silhouette thems" +
            "elves admiring the dawn of Earth's largest satellite. Seeing a moonrise yourself is not difficult: i" +
            "t happens every day, although only half the time at night. Each day the Moon rises about fifty minut" +
            "es later than the previous day, with a full moon always rising at sunset.");
    });

});