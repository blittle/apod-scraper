var CheerioParser = require("../../dist/src/parse/CheerioParser").CheerioParser;

var fs = require('fs');
var _s = require('underscore.string');

var testPage1 = fs.readFileSync("spec/parse/testPage1.html"); // vimeo video
var testPage2 = fs.readFileSync("spec/parse/testPage2.html"); // basic image
var testPage3 = fs.readFileSync("spec/parse/testPage3.html"); // youtube video

var parser = new CheerioParser();

var image = parser.parse({
    code: 200,
    url: "parse/testPage2.html",
    body: testPage2
});

var vimeo = parser.parse({
    code: 200,
    url: "parse/testPage1.html",
    body: testPage1
});

var youtube = parser.parse({
    code: 200,
    url: "parse/testPage3.html",
    body: testPage3
});

describe("APOD Scraper", function() {

    it("Should include a parse method", function() {
        expect(parser.parse).toBeDefined();
    });

    describe("VIMEO video scrape", function() {

        it("Should parse a title", function() {
            expect(vimeo.title).toEqual("Full Moon Silhouettes");
        });

        it("Should parse a description", function() {
            expect(_s.stripTags(vimeo.description)).toEqual(" Explanation:  Have you ever watched the Moon rise? The slow rise of a nearly full moon over a clear horizon can be an impressive sight. One impressive moonrise was imaged two nights ago over Mount Victoria Lookout in Wellington, New Zealand. With detailed planning, an industrious astrophotographer placed a camera about two kilometers away and pointed it across the lookout to where the Moon would surely soon be making its nightly debut. The above single shot sequence is unedited and shown in real time -- it is not a time lapse. People on Mount Victoria Lookout can be seen in silhouette themselves admiring the dawn of Earth's largest satellite. Seeing a moonrise yourself is not difficult: it happens every day, although only half the time at night. Each day the Moon rises about fifty minutes later than the previous day, with a full moon always rising at sunset.");
        });

        it("Should parse a url", function() {
            expect(vimeo.image.hiRes).toEqual("http://player.vimeo.com/video/58385453?portrait=0");
            expect(vimeo.image.loRes).not.toBeDefined();
        });

        it("Should parse copyright information", function() {
            var copyright1 = vimeo.copyrights[0];

            expect(vimeo.copyrights.length).toEqual(1);

            expect(copyright1.name).toEqual("Mark Gee");
            expect(copyright1.url).toEqual("http://markg.com.au/about/");
            expect(copyright1.publicDomain).toBeFalsy();
        });
    });

    describe("Basic image", function() {
        it("Should parse a title", function() {
            expect(image.title).toEqual("In the Center of the Trifid Nebula");
        });

        it("Should parse a description", function() {
            expect(_s.stripTags(image.description)).toEqual(" Explanation:  Clouds of glowing gas mingle with dust lanes in the Trifid Nebula, a star forming region toward the constellation of the Archer (Sagittarius). In the center, the three prominent dust lanes that give the Trifid its name all come together. Mountains of opaque dust appear on the right, while other dark filaments of dust are visible threaded throughout the nebula. A single massive star visible near the center causes much of the Trifid's glow. The Trifid, also known as M20, is only about 300,000 years old, making it among the youngest emission nebulae known. The nebula lies about 9,000 light years away and the part pictured here spans about 10 light years. The above image is a composite with luminance taken from an image by the 8.2-m ground-based Subaru Telescope, detail provided by the 2.4-m orbiting Hubble Space Telescope, color data provided by Martin Pugh and image assembly and processing provided by Robert Gendler.");
        });

        it("Should parse a url", function() {
            expect(image.image.hiRes).toEqual("image/1301/trifid_gendler_2400.jpg");
            expect(image.image.loRes).toEqual("image/1301/trifid_gendler_960.jpg");
        });

        it("Should parse copyright information", function() {
            var copyright1 = image.copyrights[0];
            var copyright2 = image.copyrights[1];
            var copyright3 = image.copyrights[2];
            var copyright4 = image.copyrights[3];
            var copyright5 = image.copyrights[4];

            expect(image.copyrights.length).toEqual(5);

            expect(copyright1.name).toEqual("Subaru Telescope");
            expect(copyright1.url).toEqual("http://www.naoj.org/Introduction/index.html");
            expect(copyright1.publicDomain).toBeFalsy();

            expect(copyright2.name).toEqual("NAOJ");
            expect(copyright2.url).toEqual("http://www.naoj.org/");
            expect(copyright2.publicDomain).toBeFalsy();

            expect(copyright3.name).toEqual("Hubble Space Telescope");
            expect(copyright3.url).toEqual("http://hla.stsci.edu/hla_welcome.html");
            expect(copyright3.publicDomain).toBeTruthy();

            expect(copyright4.name).toEqual("Martin Pugh");
            expect(copyright4.url).toEqual("http://www.martinpughastrophotography.id.au/");
            expect(copyright4.publicDomain).toBeFalsy();

            expect(copyright5.name).toEqual("Robert Gendler");
            expect(copyright5.url).toEqual("http://www.robgendlerastropics.com/");
            expect(copyright5.publicDomain).toBeFalsy();
        });
    });

    describe("Youtube video", function() {
        it("Should parse a title", function() {
            expect(youtube.title).toEqual("Apollo 16: Driving on the Moon");
        });

        it("Should parse a description", function() {
            expect(_s.stripTags(youtube.description)).toEqual(" Explanation:  What would it be like to drive on the Moon? You don't have to guess -- humans have actually done it. Pictured above, Apollo 16 astronauts John Young and Charles Duke recorded video during one such drive in 1972, with a digital version now available on the web. No matter which direction it headed, the Lunar Rover traveled a path literally covered with rocks and craters. The first half of the above video shows the rover zipping about a moonscape near 10 kilometers per hour, while the second half shows a dash-cam like view. The Lunar Rover was deployed on the later Apollo missions as a way for astronauts to reach and explore terrain further from the Lunar Module basecamp than was possible by walking in cumbersome spacesuits. Possible future lunar missions that might deploy robotic rovers capable of beaming back similar videos include those by China, Russia, India, and Google X-Prize contestants.");
        });

        it("Should parse a url", function() {
            expect(youtube.image.hiRes).toEqual("http://www.youtube.com/embed/7o3Oi9JWsyM?rel=0");
            expect(youtube.image.loRes).not.toBeDefined();
        });

        it("Should parse copyright information", function() {
            var copyright1 = youtube.copyrights[0];

            expect(youtube.copyrights.length).toEqual(1);

            expect(copyright1.name).toEqual("NASA");
            expect(copyright1.url).toEqual("http://www.nasa.gov/");
            expect(copyright1.publicDomain).toBeTruthy();
        });
    });
});